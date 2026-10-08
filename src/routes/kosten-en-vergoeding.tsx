import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/kosten-en-vergoeding")({
  head: () => meta("Kosten & vergoeding", "ADHD-zorg bij ADHD Care valt onder de basisverzekering. Lees wat je eigen risico betekent."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Kosten & vergoeding" intro="ADHD-zorg voor volwassenen valt onder de basisverzekering. Je hebt een verwijzing van je huisarts nodig." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Basisverzekering">Diagnostiek en behandeling worden vergoed vanuit je basispakket.</Card>
          <Card title="Eigen risico">Je betaalt je wettelijke eigen risico, als dat nog niet is verbruikt.</Card>
          <Card title="Verwijzing">Zonder verwijsbrief van de huisarts is vergoeding niet mogelijk.</Card>
        </div>
        <p className="mt-6 text-muted-foreground">
          Twijfel je over je polis? Neem contact op met je zorgverzekeraar of met ons.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
