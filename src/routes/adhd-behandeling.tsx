import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/adhd-behandeling")({
  staticData: { sitemap: true },
  head: () =>
    meta(
      "ADHD-behandeling voor volwassenen",
      "Ontdek de mogelijkheden voor ADHD-behandeling bij ADHDPunt: psycho-educatie, coaching, therapie en waar passend medicatiebegeleiding.",
      "/adhd-behandeling",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="ADHD-behandeling"
        intro="Samen kijken we wat jou helpt. Een behandeling die past bij je leven, je doelen en je tempo."
      />
      <Section title="Mogelijkheden">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Psycho-educatie">
            Begrijpen wat ADHD is en hoe het bij jou werkt. Ook voor naasten.
          </Card>
          <Card title="Coaching">Praktische handvatten voor planning, structuur en focus.</Card>
          <Card title="Therapie">
            Bijvoorbeeld cognitieve gedragstherapie bij uitstelgedrag of somberheid.
          </Card>
          <Card title="Medicatie">
            Waar passend, met zorgvuldige begeleiding door onze psychiater.
          </Card>
        </div>
      </Section>
      <Section>
        <p className="text-muted-foreground">
          Iedereen reageert anders op behandeling. We evalueren regelmatig samen of de aanpak nog
          bij je past.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
