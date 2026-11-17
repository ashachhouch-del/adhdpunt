# ADHDPunt

Website of ADHDPunt – specialist ADHD diagnostics and treatment for adults – served at **https://adhdpunt.nl**.

Workflow: **Claude Code → GitHub → TransIP webhosting → adhdpunt.nl**. The project has no dependency on Lovable.

## Tech stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (file-based routes in `src/routes/`)
- Tailwind CSS 4, shadcn/ui components (`src/components/ui/`)
- Vite 8 (build), Vitest (tests), ESLint + Prettier

At build time every page is **prerendered to static HTML**, including all SEO tags (title, description, canonical, Open Graph, Twitter, JSON-LD). The result is plain static files that run on any Apache host. No Node.js, PHP or database is needed on the server.

## Pages

| URL | Source file | In sitemap |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | yes |
| `/adhd-diagnostiek` | `src/routes/adhd-diagnostiek.tsx` | yes |
| `/adhd-behandeling` | `src/routes/adhd-behandeling.tsx` | yes |
| `/kosten-en-vergoeding` | `src/routes/kosten-en-vergoeding.tsx` | yes |
| `/over-ons` | `src/routes/over-ons.tsx` | yes |
| `/voor-verwijzers` | `src/routes/voor-verwijzers.tsx` | yes |
| `/veelgestelde-vragen` | `src/routes/veelgestelde-vragen.tsx` | yes |
| `/contact` | `src/routes/contact.tsx` | yes |
| `/aanmelden` | `src/routes/aanmelden.tsx` | yes |
| `/bedankt` | `src/routes/bedankt.tsx` | no (`noindex`) |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.ts` | – |

## Requirements

- Node.js 22 or newer
- [Bun](https://bun.sh) (recommended: `bun.lock` pins the exact dependency versions) or npm

## Commands

```sh
bun install                # install dependencies (or: npm install)
bun run dev                # dev server on http://localhost:8080
bun run lint               # ESLint + Prettier check
bun run typecheck          # TypeScript
bun run test               # Vitest
bun run build              # production build → dist/client
bun run build:transip      # build + verify + copy to transip-deploy/ (upload this folder)
bun run preview            # preview the production build locally
```

With npm, use the same script names: `npm run build:transip`, and so on.

## Environment variables

None are needed. See `.env.example`. Never commit `.env` files or credentials.

## Deployment

See **[TRANSIP_DEPLOYMENT.md](TRANSIP_DEPLOYMENT.md)** for upload, SSL, domain, testing and rollback.
See **[MIGRATION.md](MIGRATION.md)** for what changed in the move away from Lovable.

## Brand

The brand name is always written exactly as **ADHDPunt**.
