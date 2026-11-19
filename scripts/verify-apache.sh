#!/usr/bin/env bash
# Serves transip-deploy/ with a local Apache (same .htaccess as TransIP) and checks
# status codes and redirects. Used in CI; needs: apache2 with mod_rewrite + mod_headers.
# Usage: sudo scripts/verify-apache.sh /absolute/path/to/transip-deploy
set -uo pipefail

SRC="${1:?path to transip-deploy}"
# Copy to a folder Apache can always read (CI home folders are not world-readable).
ROOT=/var/www/adhdpunt-test
rm -rf "$ROOT" && mkdir -p "$ROOT" && cp -a "$SRC"/. "$ROOT"/
PORT=8088
CONF=/etc/apache2/sites-available/adhdpunt-test.conf

cat > "$CONF" <<EOF
Listen $PORT
<VirtualHost *:$PORT>
  ServerName adhdpunt.nl
  ServerAlias www.adhdpunt.nl
  DocumentRoot $ROOT
  <Directory $ROOT>
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
EOF
a2enmod rewrite headers deflate >/dev/null
a2ensite adhdpunt-test >/dev/null
chmod -R a+rX "$ROOT"
apache2ctl configtest || exit 1
service apache2 restart >/dev/null || apache2ctl start

BASE="http://127.0.0.1:$PORT"
fails=0

# check <description> <expected status> <expected Location or -> <path> [host] [proto]
check() {
  local desc="$1" want="$2" loc="$3" path="$4" host="${5:-adhdpunt.nl}" proto="${6:-https}"
  local out status location
  out=$(curl -s -o /dev/null -D - -H "Host: $host" -H "X-Forwarded-Proto: $proto" "$BASE$path")
  status=$(printf '%s' "$out" | head -1 | awk '{print $2}')
  location=$(printf '%s' "$out" | grep -i '^location:' | awk '{print $2}' | tr -d '\r')
  if [[ "$status" == "$want" && ( "$loc" == "-" || "$location" == "$loc" ) ]]; then
    echo "PASS  $desc  ($status ${location})"
  else
    echo "FAIL  $desc  expected $want ${loc}, got $status ${location}"
    fails=$((fails + 1))
  fi
}

# body_has <description> <path> <text>
body_has() {
  if curl -s -H "Host: adhdpunt.nl" -H "X-Forwarded-Proto: https" "$BASE$2" | grep -aqF "$3"; then
    echo "PASS  $1"
  else
    echo "FAIL  $1  (\"$3\" not found)"
    fails=$((fails + 1))
  fi
}

for p in / /adhd-diagnostiek /adhd-behandeling /kosten-en-vergoeding /over-ons /voor-verwijzers \
         /veelgestelde-vragen /contact /aanmelden /bedankt /sitemap.xml /robots.txt /favicon.svg; do
  check "page $p" 200 - "$p"
done

check "http -> https" 301 "https://adhdpunt.nl/contact" /contact adhdpunt.nl http
check "www -> apex" 301 "https://adhdpunt.nl/contact" /contact www.adhdpunt.nl
check "trailing slash removed" 301 "https://adhdpunt.nl/contact" /contact/
check ".html removed" 301 "https://adhdpunt.nl/contact" /contact.html
check "/index.html -> /" 301 "https://adhdpunt.nl/" /index.html
check "unknown page is 404" 404 - /bestaat-niet
check "unknown nested page is 404" 404 - /a/b/c
check "Let's Encrypt path not redirected" 404 - /.well-known/acme-challenge/test adhdpunt.nl http

body_has "homepage is prerendered" / "Duidelijkheid over ADHD, in jouw tempo."
body_has "contact canonical" /contact 'href="https://adhdpunt.nl/contact"'
body_has "contact title" /contact "<title>Contact met ADHDPunt | ADHDPunt</title>"
body_has "bedankt is noindex" /bedankt 'content="noindex"'
body_has "404 serves app shell" /bestaat-niet "<script"
body_has "sitemap lists contact" /sitemap.xml "<loc>https://adhdpunt.nl/contact</loc>"

# Unlisted questionnaires: reachable, never indexed, not in the sitemap, not linked from any page.
for q in "$ROOT"/vragenlijst-*.html; do
  [[ -e "$q" ]] || continue
  name=$(basename "$q" .html)
  check "questionnaire /$name" 200 - "/$name"
  check "questionnaire font" 200 - "/fonts/manrope-latin.woff"
  if curl -sI -H "Host: adhdpunt.nl" -H "X-Forwarded-Proto: https" "$BASE/$name" | grep -qi '^x-robots-tag: noindex'; then
    echo "PASS  questionnaire has X-Robots-Tag noindex"
  else
    echo "FAIL  questionnaire X-Robots-Tag missing"; fails=$((fails + 1))
  fi
  if LC_ALL=C grep -alq "$name" "$ROOT"/sitemap.xml "$ROOT"/robots.txt $(ls "$ROOT"/*.html | grep -v vragenlijst-) "$ROOT"/assets/*; then
    echo "FAIL  questionnaire address appears in sitemap, robots.txt or another page"; fails=$((fails + 1))
  else
    echo "PASS  questionnaire address is not linked or listed anywhere"
  fi
done

# Every asset referenced by the pages must exist.
assets=$(LC_ALL=C grep -aohE '/assets/[A-Za-z0-9._-]+' "$ROOT"/*.html | sort -u)
echo "Assets referenced by pages: $(echo "$assets" | grep -c .)"
if [[ -z "$assets" ]]; then
  echo "FAIL  no /assets/ references found in pages"; fails=$((fails + 1))
  echo "DEBUG files:"; (cd "$ROOT" && find . -type f | sort | head -60)
  echo "DEBUG index.html head:"; head -c 2500 "$ROOT/index.html"; echo
fi
for asset in $assets; do
  check "asset $asset" 200 - "$asset"
done
check "hashed asset is cached 1 year" 200 - "$(echo "$assets" | grep '\.js$' | head -1)"
if curl -sI -H "Host: adhdpunt.nl" -H "X-Forwarded-Proto: https" "$BASE$(echo "$assets" | grep '\.js$' | head -1)" | grep -qi 'immutable'; then
  echo "PASS  asset Cache-Control immutable"
else
  echo "FAIL  asset Cache-Control immutable missing"; fails=$((fails + 1))
fi

echo
if (( fails > 0 )); then echo "$fails check(s) FAILED"; exit 1; fi
echo "All Apache checks passed"
