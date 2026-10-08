import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CtaBand, CtaButton, Section, meta } from "@/components/site";

export const WACHTTIJD_DAGEN = 30;

export const Route = createFileRoute("/")({
  head: () => meta("ADHD-zorg voor volwassenen", "ADHD Care biedt zorgvuldige ADHD-diagnostiek en behandeling voor volwassenen. Meld je direct aan."),
  component: Index,
});

const steps = [
  ["Aanmelden", "Vul het korte aanmeldformulier in. Een verwijzing van je huisarts is nodig."],
  ["Intake", "We bespreken je klachten, je achtergrond en wat je zoekt."],
  ["Diagnostiek", "Een zorgvuldig onderzoek met gesprekken en vragenlijsten."],
  ["Advies & behandeling", "Je krijgt een helder advies en, als het past, een behandeling op maat."],
];

function WaitTimeCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDays(Math.round(eased * WACHTTIJD_DAGEN));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center md:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/80">Onze wachttijd</p>
        <div className="mt-4 flex items-baseline justify-center gap-3">
          <span className="text-7xl font-extrabold leading-none tabular-nums md:text-8xl" aria-label={`${WACHTTIJD_DAGEN} dagen`}>
            {days}
          </span>
          <span className="text-2xl font-bold md:text-3xl">dagen</span>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
          Dat is nu de wachttijd tussen je aanmelding en je intakegesprek. We werken hard om deze zo kort mogelijk te houden.
        </p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="bg-muted">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-28">
          <p className="font-bold text-secondary">ADHD-zorg voor volwassenen</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-primary md:text-6xl">
            Duidelijkheid over ADHD, in jouw tempo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Loop je vast met concentratie, planning of onrust? Bij ADHD Care krijg je een zorgvuldig onderzoek en
            persoonlijke begeleiding door ervaren specialisten.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton />
            <Link to="/adhd-diagnostiek" className="rounded-full border border-primary px-6 py-3 font-bold text-primary">
              Hoe werkt diagnostiek?
            </Link>
          </div>
        </div>
      </section>

      <WaitTimeCounter />

      <Section title="Wat we voor je doen">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Diagnostiek">Een grondig onderzoek naar ADHD, met aandacht voor wat er nog meer kan spelen.</Card>
          <Card title="Behandeling">Psycho-educatie, coaching en waar passend medicatie, afgestemd op jou.</Card>
          <Card title="Vergoed">ADHD-zorg valt onder de basisverzekering. Wel geldt je eigen risico.</Card>
        </div>
      </Section>

      <Section title="Zo werkt het">
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-xl border p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-primary">{t}</p>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
