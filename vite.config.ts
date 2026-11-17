// Standalone Vite configuration for ADHDPunt (no Lovable tooling).
//
// The site is built as fully static files for Apache webhosting (TransIP):
//   - every public route is prerendered to its own HTML file (SEO tags included),
//   - /sitemap.xml is prerendered from the router,
//   - /_shell.html is the client-side fallback used for unknown URLs (404).
// Output: dist/client  →  copied to transip-deploy/ by scripts/prepare-transip.mjs
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 8080 },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // src/server.ts wraps the TanStack Start server entry (used during prerendering).
      server: { entry: "server" },
      // Client-side shell for URLs that have no prerendered page (served with HTTP 404 by .htaccess).
      // maskPath gets a query string so the shell does not replace the real "/" page
      // (TanStack prerender de-duplicates pages by path). Output: /_shell.html
      spa: { enabled: true, maskPath: "/?spa-shell" },
      prerender: {
        enabled: true,
        crawlLinks: true,
        // /contact -> contact.html (served at /contact without trailing slash by .htaccess)
        autoSubfolderIndex: false,
        failOnError: true,
      },
      pages: [
        { path: "/", prerender: { enabled: true } },
        // Not linked from any page (reached after submitting the form), so list it explicitly.
        { path: "/bedankt", prerender: { enabled: true } },
        { path: "/sitemap.xml", prerender: { enabled: true, crawlLinks: false } },
      ],
    }),
    viteReact(),
  ],
});
