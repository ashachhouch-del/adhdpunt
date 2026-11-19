import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/bedankt")({
  staticData: { sitemap: false },
  head: () => {
    const metadata = meta(
      "Bedankt voor je aanmelding",
      "Je aanmelding bij ADHDPunt is ontvangen.",
      "/bedankt",
    );
    return { ...metadata, meta: [...metadata.meta, { name: "robots", content: "noindex" }] };
  },
  component: Page,
});

function Page() {
  return (
    <PageHero
      title="Bedankt voor je aanmelding"
      intro="We hebben je gegevens ontvangen en nemen binnen enkele werkdagen contact met je op."
    >
      <Link
        to="/"
        className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Terug naar home
      </Link>
    </PageHero>
  );
}
