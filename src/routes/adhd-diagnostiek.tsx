import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/adhd-diagnostiek")({
  staticData: { sitemap: true },
  head: () => meta("ADHD-diagnostiek", "Hoe het ADHD-onderzoek voor volwassenen bij ADHD Punt verloopt: intake, onderzoek en adviesgesprek."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="ADHD-diagnostiek" intro="Een zorgvuldig onderzoek geeft je inzicht in hoe jij functioneert, of het nu ADHD is of iets anders." />
      <Section title="Het onderzoek">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Intakegesprek">We brengen je klachten, levensloop en hulpvraag in kaart.</Card>
          <Card title="Vragenlijsten">Gevalideerde vragenlijsten, soms ook ingevuld door iemand die je goed kent.</Card>
          <Card title="Diagnostisch interview">Een gestructureerd gesprek over je klachten nu en in je jeugd.</Card>
          <Card title="Adviesgesprek">We bespreken de uitkomst en wat een passende vervolgstap is.</Card>
        </div>
      </Section>
      <Section title="Wat heb je nodig?">
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Een verwijsbrief van je huisarts</li>
          <li>Je zorgpas en een geldig identiteitsbewijs</li>
          <li>Eventueel oude schoolrapporten of eerdere onderzoeksverslagen</li>
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
