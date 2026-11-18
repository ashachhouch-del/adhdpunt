#!/usr/bin/env bash
# Checks the LIVE website after a deploy. Usage: scripts/verify-live.sh [expected-build-dir]
# If a build dir is given, also checks that the live homepage is that exact build.
set -uo pipefail
SITE="https://adhdpunt.nl"
BUILD="${1:-}"
fails=0

echo "== DNS"
echo "nameservers: $(dig +short NS adhdpunt.nl | tr '\n' ' ')"
whois adhdpunt.nl 2>/dev/null | grep -iE -A3 "registrar|reseller" | head -12 || true
for h in adhdpunt.nl www.adhdpunt.nl; do
  echo "$h -> A: $(dig +short A "$h" | tr '\n' ' ') CNAME: $(dig +short CNAME "$h" | tr '\n' ' ')"
done
echo

# check <description> <expected status> <expected Location or -> <url>
check() {
  local out status location
  out=$(curl -s -o /dev/null -D - --max-time 20 "$4")
  status=$(printf '%s' "$out" | head -1 | awk '{print $2}')
  location=$(printf '%s' "$out" | grep -i '^location:' | awk '{print $2}' | tr -d '\r')
  if [[ "$status" == "$2" && ( "$3" == "-" || "$location" == "$3" ) ]]; then
    echo "PASS  $1  ($status ${location})"
  else
    echo "FAIL  $1  expected $2 $3, got ${status:-no response} ${location}"
    fails=$((fails + 1))
  fi
}

for p in / /adhd-diagnostiek /adhd-behandeling /kosten-en-vergoeding /over-ons /voor-verwijzers \
         /veelgestelde-vragen /contact /aanmelden /bedankt /sitemap.xml /robots.txt /favicon.svg; do
  check "page $p" 200 - "$SITE$p"
done
check "http -> https" 301 "https://adhdpunt.nl/contact" "http://adhdpunt.nl/contact"
check "www -> apex" 301 "https://adhdpunt.nl/contact" "https://www.adhdpunt.nl/contact"
check "trailing slash removed" 301 "https://adhdpunt.nl/contact" "$SITE/contact/"
check "unknown page is 404" 404 - "$SITE/bestaat-niet"

home=$(curl -s --max-time 20 "$SITE/")
if grep -aq "Duidelijkheid over ADHD" <<<"$home"; then echo "PASS  homepage text"; else echo "FAIL  homepage text"; fails=$((fails + 1)); fi
if grep -aqi "lovable" <<<"$home"; then echo "FAIL  live homepage still mentions lovable"; fails=$((fails + 1)); else echo "PASS  no lovable on live homepage"; fi
if [[ -n "$BUILD" ]]; then
  js=$(LC_ALL=C grep -aoE '/assets/index-[A-Za-z0-9_-]+\.js' "$BUILD/index.html" | head -1)
  if grep -aqF "$js" <<<"$home"; then
    echo "PASS  live site is this build ($js) – served by TransIP"
  else
    echo "FAIL  live site is NOT this build (expected $js) – domain probably still points elsewhere"
    fails=$((fails + 1))
  fi
fi
cert=$(echo | openssl s_client -connect adhdpunt.nl:443 -servername adhdpunt.nl 2>/dev/null | openssl x509 -noout -issuer -enddate 2>/dev/null | tr '\n' ' ')
echo "INFO  SSL certificate: ${cert:-none}"

echo
if (( fails > 0 )); then echo "$fails live check(s) FAILED"; exit 1; fi
echo "All live checks passed"
