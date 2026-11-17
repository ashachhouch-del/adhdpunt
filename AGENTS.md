# Notes for coding agents

- The brand name is always written exactly as "ADHDPunt".
- The site is deployed as static files to TransIP webhosting (see TRANSIP_DEPLOYMENT.md). Do not add server-only features (server functions, API routes) without a hosting plan: TransIP webhosting serves only static files here.
- Never commit `.env` files or credentials.

- Derive sitemap URLs from the router with required `staticData.sitemap` decisions; this keeps public page discovery current while excluding confirmation pages.
- Every content route passes its own path to the shared metadata helper; leaf-only canonicals, share URLs and WebPage data prevent pages being attributed to the homepage.
