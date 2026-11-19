# ADHDPunt – deployment to TransIP webhosting

The website is a set of **static files**. TransIP webhosting (Apache) serves them directly from the `www` folder of the hosting package. No Node.js, PHP version, database or cron job is required.

---

## 1. Get the upload folder

**Easiest way (no installation needed):** GitHub builds the website automatically after every change. The finished files are on the branch **`transip-deploy`**:

1. Open https://github.com/ashachhouch-del/adhdpunt/tree/transip-deploy
2. Click the green **Code** button → **Download ZIP**.
3. Unzip it. The files inside are exactly what goes into `www/` on TransIP.

The branch's latest commit message says which code version it was built from. A build only appears there if lint, typecheck, tests, the build and the Apache checks all passed.

**Or build it yourself**, on a computer with Node.js 22+:

```sh
git checkout main
bun install            # or: npm install
bun run build:transip  # or: npm run build:transip
```

`build:transip` builds the site, checks that every page, the sitemap and `.htaccess` are present, and copies everything to **`transip-deploy/`**. If any check fails, the command stops with `FAILED:` and nothing is copied.

### Exact contents to upload

Upload the **contents** of `transip-deploy/` (not the folder itself) into `www/`:

```
www/
├── .htaccess                  ← hidden file, must be uploaded
├── index.html                 → https://adhdpunt.nl/
├── adhd-diagnostiek.html      → /adhd-diagnostiek
├── adhd-behandeling.html      → /adhd-behandeling
├── kosten-en-vergoeding.html  → /kosten-en-vergoeding
├── over-ons.html              → /over-ons
├── voor-verwijzers.html       → /voor-verwijzers
├── veelgestelde-vragen.html   → /veelgestelde-vragen
├── contact.html               → /contact
├── aanmelden.html             → /aanmelden
├── bedankt.html               → /bedankt
├── _shell.html                → app shell, shown with HTTP 404 for unknown URLs
├── sitemap.xml
├── robots.txt
├── favicon.svg
└── assets/                    ← JS/CSS bundles (hashed file names)
```

Do **not** upload `src/`, `node_modules/`, `dist/`, `.git/`, `.env` or any other project file.

---

## 2. Prepare TransIP (one time)

1. Log in at **transip.nl → Controlepaneel**.
2. **Shared Hosting** → under *Products* select **adhdpunt.nl**.
3. **Site → SFTP/SSH**: note *Host*, *Username*, *Port* (22, or 2222 if 22 does not work). Set or reset the SFTP password here if needed. Optionally add an SSH public key with **+ Add key**.
4. **Site → Domains & SSL → Manage**: check that the website path of `adhdpunt.nl` and `www.adhdpunt.nl` is **`www`** (the default DocumentRoot).

---

## 3. Upload

### Option A – FileZilla (manual)

1. FileZilla → **Server → Force showing hidden files** (otherwise `.htaccess` is not visible).
2. Quickconnect: Host = *SFTP host*, Username, Password, Port = 22 (or 2222). Accept the host key.
3. Remote side: open **`www`**.
4. **First deploy only:** download the current contents of `www/` to your computer as a backup, then delete the old files in `www/` (keep `.well-known/` if it exists).
5. Local side: open `transip-deploy/`, select **all** files and folders including `.htaccess`, drag them into `www/`. Choose **Overwrite** when asked.

### Option B – TransIP File Manager

Control panel → Shared Hosting → adhdpunt.nl → **File Manager** → open `www` → **upload**. Upload all files, recreate the `assets` folder and upload its files into it. Check that `.htaccess` is present after uploading.

### Option C – GitHub Actions (automatic, after you add secrets)

The repository contains `.github/workflows/deploy-transip.yml`.

1. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `TRANSIP_SFTP_HOST`, `TRANSIP_SFTP_PORT` (22), `TRANSIP_SFTP_USER`, `TRANSIP_SFTP_PASSWORD`, `TRANSIP_SFTP_PATH` (`www`)
2. Optional: **Settings → Environments → production → Required reviewers** to require approval for each deploy.
3. **Actions → Build and deploy (TransIP) → Run workflow** on `main`, tick **deploy**.

The workflow builds, lints, typechecks and tests, then mirrors `transip-deploy/` to `www/`. It **deletes files in `www/` that are not in the build** (except `.well-known/`). If you keep other files in `www/` (for example a Google verification file), add them to `public/` in the repository so they become part of every build.

> TransIP's own *AutoGit* (Pro/Max packages) deploys from a Git repository hosted on TransIP, not from GitHub. It does not run `npm run build`, so it is not used here.

---

## 4. Domain and DNS

- **Domain and hosting both at TransIP:** nothing to change. DNS already points to the hosting package.
- **Domain registered elsewhere:** at that registrar, point the DNS records to the values shown in TransIP under *Shared Hosting → adhdpunt.nl → DNS settings* (A/AAAA records for `@` and `www`, or use TransIP's nameservers).

DNS changes can take up to 24 hours to propagate. Check with `nslookup adhdpunt.nl` and `nslookup www.adhdpunt.nl`.

---

## 5. SSL (HTTPS)

1. Control panel → Shared Hosting → adhdpunt.nl → **Site → Domains & SSL**.
2. Under *SSL settings*, set **HTTPS / Let's Encrypt** to **on** for `adhdpunt.nl` and `www.adhdpunt.nl`.
3. Wait until the status says active. This only works after DNS points to TransIP.
4. Then upload the site. `.htaccess` forces HTTPS and redirects `www.adhdpunt.nl` to `https://adhdpunt.nl`.
5. Optional, after everything works for a week: enable HSTS (TransIP article "Activating HSTS on a webhosting package").

If the site shows **"too many redirects"** after enabling SSL, the HTTPS rule in `.htaccess` is looping behind TransIP's proxy. Temporarily remove block **1** ("Force HTTPS") from `www/.htaccess`, enable TransIP's own HTTPS redirect in the control panel instead, and report it.

---

## 6. Test after every deploy

Open each URL in a private window. Each must return the right page **directly** (also after pressing F5):

```
https://adhdpunt.nl/
https://adhdpunt.nl/adhd-diagnostiek
https://adhdpunt.nl/adhd-behandeling
https://adhdpunt.nl/kosten-en-vergoeding
https://adhdpunt.nl/over-ons
https://adhdpunt.nl/voor-verwijzers
https://adhdpunt.nl/veelgestelde-vragen
https://adhdpunt.nl/contact
https://adhdpunt.nl/aanmelden
https://adhdpunt.nl/bedankt
https://adhdpunt.nl/sitemap.xml
https://adhdpunt.nl/robots.txt
```

Redirect and 404 checks (terminal):

```sh
curl -sI http://adhdpunt.nl/contact          # 301 → https://adhdpunt.nl/contact
curl -sI https://www.adhdpunt.nl/contact     # 301 → https://adhdpunt.nl/contact
curl -sI https://adhdpunt.nl/contact/        # 301 → https://adhdpunt.nl/contact
curl -sI https://adhdpunt.nl/contact.html    # 301 → https://adhdpunt.nl/contact
curl -sI https://adhdpunt.nl/contact         # 200
curl -sI https://adhdpunt.nl/bestaat-niet    # 404 (page shows the "404" screen)
```

In the browser:

- Click every menu and footer link, and the **Direct aanmelden** buttons.
- On `/aanmelden`, submit the form empty: the error messages must appear. Fill in name, e-mail and the checkbox, then submit: you land on `/bedankt`. **The form does not send data anywhere** (see MIGRATION.md, known limitations).
- Resize to mobile width (or use a phone): the menu button and the sticky **Direct aanmelden** bar must appear.
- DevTools → Console: no red errors. Network: no 404s.
- View page source of `/contact`: it contains the full text, `<title>Contact met ADHDPunt | ADHDPunt</title>` and `<link rel="canonical" href="https://adhdpunt.nl/contact">`.
- Google Search Console: submit `https://adhdpunt.nl/sitemap.xml`.

---

## 7. Rollback

- **Previous build:** keep each uploaded `transip-deploy/` as a zip (for example `adhdpunt-deploy-2026-11-17.zip`). To roll back, upload the previous zip's contents to `www/` again, the same way as in step 3.
- **TransIP backups:** control panel → Shared Hosting → adhdpunt.nl → **Back-ups**: restore the `www` folder to an earlier date.
- **Code:** every change is a commit on `main`. To undo one, revert that commit on `main` and deploy again (commit message with `[deploy]`). The original pre-migration code is kept on branch `backup/pre-migration-lovable` for reference.
