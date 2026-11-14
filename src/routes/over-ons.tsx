import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/over-ons")({
  staticData: { sitemap: true },
  head: () => meta("Over ADHD Punt: persoonlijke ADHD-zorg", "Maak kennis met ADHD Punt en onze aanpak voor volwassenen met ADHD: persoonlijke aandacht, zorgvuldig onderzoek en duidelijke uitleg.", "/over-ons"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Over ADHD Punt" intro="Wij zijn een gespecialiseerde praktijk voor volwassenen met (een vermoeden van) ADHD." />
      <Section title="Onze manier van werken">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Persoonlijk">Je hebt een vast aanspreekpunt tijdens je traject.</Card>
          <Card title="Zorgvuldig">We werken volgens de geldende richtlijnen.</Card>
          <Card title="Helder">Duidelijke uitleg, zonder vakjargon.</Card>
        </div>
      </Section>
      <Section title="Ons team">
        <p className="text-muted-foreground">
          Ons team bestaat uit psychiaters, GZ-psychologen en ADHD-coaches met ruime ervaring in de zorg voor volwassenen.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
