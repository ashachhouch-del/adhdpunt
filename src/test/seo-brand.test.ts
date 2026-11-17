import { describe, expect, it } from "vitest";

import { meta } from "@/components/site";

describe("Page metadata", () => {
  it("writes the brand as ADHDPunt and builds a leaf canonical URL", () => {
    const head = meta("Contact met ADHDPunt", "Omschrijving", "/contact");
    const title = head.meta.find((m) => "title" in m) as { title: string } | undefined;

    expect(title?.title).toBe("Contact met ADHDPunt | ADHDPunt");
    expect(head.links).toEqual([{ rel: "canonical", href: "https://adhdpunt.nl/contact" }]);
    expect(JSON.stringify(head)).not.toContain("ADHD Punt");
  });
});
