# ADHDPunt – migration away from Lovable

Date: 17 November 2026 · Branch: `migration/remove-lovable-transip`

| | |
| --- | --- |
| Pre-migration commit | `87ad6c3` "Pre-migration snapshot of Lovable export (adhdpunt-main.zip)" |
| Backup branch | `backup/pre-migration-lovable` (points to `87ad6c3`, never modify) |
| Migration branch | `migration/remove-lovable-transip` |
| Target | Claude Code → GitHub → TransIP webhosting (Apache, static files) → adhdpunt.nl |

The ZIP export had no Git history, so `87ad6c3` is a fresh snapshot of the exported files exactly as received.

---

## 1. Inventory (before migration)

**Architecture:** TanStack Start 1.168 (React 19, SSR) with TanStack Router file-based routes, Vite 8, Tailwind CSS 4, shadcn/ui. Built through `@lovable.dev/vite-tanstack-config`, which added Nitro with a **Cloudflare** server target. This needs a server runtime, so it cannot run on TransIP webhosting as-is.

**Routes** (all top-level, no nested or dynamic routes):

| Route | Page | Sitemap |
| --- | --- | --- |
| `/` | Home (hero, wait-time counter, services, steps, CTA) | yes |
| `/adhd-diagnostiek` | Diagnostics | yes |
| `/adhd-behandeling` | Treatment | yes |
| `/kosten-en-vergoeding` | Costs & reimbursement | yes |
| `/over-ons` | About | yes |
| `/voor-verwijzers` | For referrers | yes |
| `/veelgestelde-vragen` | FAQ | yes |
| `/contact` | Contact | yes |
| `/aanmelden` | Registration info + form | yes |
| `/bedankt` | Thank-you page (`noindex`) | no |
| `/sitemap.xml` | Server route generated from the router | – |
| *(any other URL)* | 404 component ("Page not found") | – |

**Assets:** `public/favicon.svg`, `public/robots.txt`. The logo is an inline SVG. There are no images or other media files. The font is **Manrope** from Google Fonts.

**Forms:** one form on `/aanmelden` (naam, e-mail, telefoon, type, verwijzing, toelichting, akkoord). It validates in the browser, then navigates to `/bedankt`. **It does not send the data anywhere**: there is no API call, e-mail or database.

**APIs / server functions:** none (`createServerFn` is not used). The only server code is the `/sitemap.xml` handler and the SSR error wrappers (`src/server.ts`, `src/start.ts`).

**Environment variables:** none used (`import.meta.env` / `process.env` are not referenced).

**External services:**

| Service | Use | Status |
| --- | --- | --- |
| Google Fonts (fonts.googleapis.com / fonts.gstatic.com) | Manrope font | **kept** (unchanged) |
| Supabase | – | not used, nothing to keep |
| Lovable (`@lovable.dev/vite-tanstack-config`, `window.__lovableEvents` error reporting, `.lovable/`) | build tooling, editor telemetry | **removed** |
| Nitro → Cloudflare | server build target | **removed** (not needed for static hosting) |
| Infomedics, ZorgDomein | mentioned in page text only | text unchanged |

**SEO:** each page has a unique title and description, canonical URL, Open Graph and Twitter tags, WebPage JSON-LD, a WebSite JSON-LD on the root, `robots.txt`, and a router-derived `sitemap.xml`. All of it is preserved.

## 2. Pre-migration run and errors found

- **The build and dev server could not be run in this session.** The sandbox and the linked computer both block the npm/bun package registry (HTTP 403 / DNS failure), so dependencies could not be installed. *No build, lint, typecheck or test result was obtained before or after the migration.*
- **Lint would fail before migration:** `eslint .` treats Prettier differences as errors, and Prettier 3 reports **14 files** with formatting issues (all route files, `site.tsx`, `sitemap.ts`, `__root.tsx`, the test). Fixed, see §3.
- **Content and functional issues found (not changed: business decisions):**
  - The sign-up form sends nothing, but `/bedankt` tells visitors "We hebben je gegevens ontvangen".
  - Phone number `020 – 000 00 00` looks like a placeholder.
  - "Privacyverklaring · Cookiebeleid · Klachtenregeling" in the footer is plain text, not links. Those pages do not exist. The form's consent checkbox refers to the privacyverklaring.
  - The 404 and error screens are in English while the site is Dutch.
  - The old `README.md` contained a leftover prompt ("Implement exactly the screenshot and nothing else").

## 3. Changes

| File | Change |
| --- | --- |
| `vite.config.ts` | Replaced the Lovable config wrapper with a standard Vite config: `tanstackStart` (prerender all crawled pages + `/bedankt` + `/sitemap.xml`, SPA shell `_shell.html`, `page.html` output), `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`, React dedupe, dev port 8080. |
| `package.json` | Name `adhdpunt`. Removed devDependencies `@lovable.dev/vite-tanstack-config` and `nitro`. Added scripts `build:transip` and `typecheck`. |
| `bun.lock` | Removed the Lovable and Nitro entries. The other pinned versions are unchanged. |
| `bunfig.toml` | Removed the Lovable package exceptions. The 24-hour supply-chain guard is kept. |
| `src/lib/lovable-error-reporting.ts` | Deleted (Lovable editor telemetry). |
| `src/routes/__root.tsx` | Removed the Lovable error-reporting call. `console.error` logging stays. |
| `.lovable/` | Deleted. The "north star" it contained is preserved below. |
| `AGENTS.md` | Lovable sync block replaced with project notes. The SEO notes are kept. |
| `README.md` | Rewritten (no Lovable). |
| Brand | Every "ADHD Punt" → **"ADHDPunt"** (titles, meta, JSON-LD, body text, `aria-label`). The header/footer logo now reads `ADHD`+`Punt` without a space. The bold/semibold styling is kept. **This is the only visible change.** |
| All `src/**/*.ts(x)` | Prettier formatting only. Verified: esbuild output of every file is byte-identical before and after, except one JSX space now written as `{" "}`, which renders the same text. |
| `public/.htaccess` | New: HTTPS, www→apex, clean URLs, trailing-slash removal, prerendered-page serving, 404 → app shell, caching, compression, basic security headers, Let's Encrypt exception. |
| `scripts/prepare-transip.mjs` | New: copies `dist/client` → `transip-deploy/` and fails if any page, the sitemap, `.htaccess`, a canonical tag or a prerendered `<h1>` is missing, or if "lovable" or "ADHD Punt" appears in the output. |
| `src/test/seo-brand.test.ts` | New test: brand spelling and canonical URL in page metadata. |
| `.github/workflows/deploy-transip.yml` | New: CI (install, lint, typecheck, test, build) and an optional manual SFTP deploy to TransIP using GitHub secrets. |
| `.env.example` | New, placeholders and comments only (no variables are needed). |
| `.gitignore` / `.prettierignore` / `eslint.config.js` | Ignore `.env*` (except the example) and `transip-deploy/`. |
| `TRANSIP_DEPLOYMENT.md`, `MIGRATION.md` | New. |

**Not changed:** page text (apart from the brand spelling), layout, styles, components, routes, SEO fields, the form's behaviour, `src/server.ts`, `src/start.ts`, `src/lib/sitemap.ts`, `src/routes/sitemap[.]xml.ts`, `routeTree.gen.ts`, and the shadcn/ui components. There are no database or backend changes.

## 4. How the site is served on TransIP

`vite build` prerenders every page to HTML. `.htaccess` maps clean URLs to those files: `/contact` serves `contact.html`, and a direct visit or a refresh on any route returns the complete page with HTTP 200. Unknown URLs return **HTTP 404** with `_shell.html`; the app then loads and shows its 404 screen. After loading, navigation is client-side, as before.

## 5. Verification done in this session

| Check | Result |
| --- | --- |
| Syntax of all `src` TS/TSX files and `vite.config.ts` (esbuild parse) | pass |
| Prettier check on `src/**/*.{ts,tsx}` | pass (was failing on 14 files) |
| Compiled output identical before/after formatting | pass |
| `scripts/prepare-transip.mjs` against a mock build: success, missing page, missing canonical, "lovable" string, "ADHD Punt" string | all behave as intended |
| Workflow YAML parses | pass |
| `bun.lock` still parses | pass |
| No "lovable" left in code or config (only in docs and the guard script) | pass |
| **`vite build`, `eslint`, `tsc`, `vitest`, dev server, browser checks of routes, links, form, mobile, console** | **NOT RUN.** Package registry blocked. Must be run once with network access (see TRANSIP_DEPLOYMENT.md §1 and §6). |
| `.htaccess` on Apache | **NOT RUN** (no Apache available). Test on TransIP with the checklist in TRANSIP_DEPLOYMENT.md §6. |

### First build: what to check

The prerender settings (`spa`, `prerender`, `pages`) follow the TanStack Start documentation, but this exact configuration has not been executed. `bun run build:transip` stops with a clear `FAILED:` message if the output is incomplete. If the build fails:

1. **"missing in build output: _shell.html"**: TanStack Start may name the shell differently in this version. Look for the generated shell in `dist/client` and update `requiredFiles` and the `ErrorDocument` line in `.htaccess` to match.
2. **"sitemap.xml missing"**: the server route was not prerendered. Check that `pages` in `vite.config.ts` contains `/sitemap.xml`.
3. **Output in `.output/public` instead of `dist/client`**: a Nitro plugin is still active. Make sure `nitro` is no longer installed (`bun install` after pulling this branch).

## 6. Product goal (preserved from `.lovable/north-star`)

> **Leidster:** Mensen met ADHD-klachten krijgen een diagnose en de behandeling die ze nodig hebben.
> **Maatstaf:** Mensen die het aanmeldformulier versturen, per week.

Note: because the form does not send data (§2), this measure cannot currently be tracked.
