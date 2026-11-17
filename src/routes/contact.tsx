import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => meta("Contact met ADHDPunt", "Neem contact op met ADHDPunt voor vragen over ADHD-diagnostiek, behandeling of aanmelden. Bekijk onze contactgegevens en bereikbaarheid.", "/contact"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Contact" intro="Heb je een vraag? We helpen je graag verder." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="E-mail">info@adhdpunt.nl</Card>
          <Card title="Telefoon">020 – 000 00 00</Card>
          <Card title="Bereikbaar">Maandag t/m vrijdag, 9:00 – 17:00</Card>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          In geval van crisis: neem contact op met je huisarts of de huisartsenpost.
        </p>
      </Section>
    </>
  );
}
