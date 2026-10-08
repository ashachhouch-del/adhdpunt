import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/voor-verwijzers")({
  head: () => meta("Voor verwijzers", "Informatie voor huisartsen en POH-GGZ over verwijzen naar ADHD Care."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Voor verwijzers" intro="Informatie voor huisartsen en POH-GGZ die een patiënt willen verwijzen voor ADHD-diagnostiek of behandeling." />
      <Section title="Verwijzen">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Verwijsbrief">Verwijs naar de specialistische GGZ met vermoeden van ADHD. Via Zorgdomein of per beveiligde e-mail.</Card>
          <Card title="Terugkoppeling">Na diagnostiek en bij afronding ontvang je een verslag, met toestemming van de patiënt.</Card>
          <Card title="Doelgroep">Volwassenen vanaf 18 jaar.</Card>
          <Card title="Overleg">Vragen over een verwijzing? Mail naar verwijzers@adhdpunt.nl.</Card>
        </div>
      </Section>
    </>
  );
}
