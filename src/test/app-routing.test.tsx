import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("lists all nine public content pages without the confirmation or sitemap endpoint", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual([
      "/",
      "/aanmelden",
      "/adhd-behandeling",
      "/adhd-diagnostiek",
      "/contact",
      "/kosten-en-vergoeding",
      "/over-ons",
      "/veelgestelde-vragen",
      "/voor-verwijzers",
    ]);
  });

  it("uses the public domain and omits timestamps without a page-specific source", () => {
    const xml = sitemapXML("https://adhdpunt.nl", [{ path: "/" }, { path: "/contact" }]);
    expect(xml).toContain("<loc>https://adhdpunt.nl/contact</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});
