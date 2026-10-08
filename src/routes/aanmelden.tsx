import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/aanmelden")({
  head: () => meta("Direct aanmelden", "Meld je direct aan bij ADHD Care voor diagnostiek of behandeling van ADHD."),
  component: Page,
});

const field = "mt-1 w-full rounded-lg border border-input px-4 py-3";

function Page() {
  const navigate = useNavigate();
  const [err, setErr] = useState<{ naam?: string; email?: string; akkoord?: string }>({});

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const n: { naam?: string; email?: string; akkoord?: string } = {};
    if (!String(d.get("naam") || "").trim()) n.naam = "Vul je naam in.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || ""))) n.email = "Vul een geldig e-mailadres in.";
    if (!d.get("akkoord")) n.akkoord = "Geef toestemming om verder te gaan.";
    setErr(n);
    if (Object.keys(n).length === 0) navigate({ to: "/bedankt" });
  }

  return (
    <>
      <PageHero title="Direct aanmelden" intro="ADHD Care is gespecialiseerd in diagnostiek en behandeling van ADHD bij volwassenen. Hieronder lees je hoe aanmelden werkt, voor jezelf of als verwijzer." />
      <Section title="Zo meld je je aan">
        <ol className="space-y-3">
          {[
            "Bespreek je klachten met je huisarts.",
            "Vindt je huisarts een verwijzing passend? Dan stuurt hij of zij een verwijsbrief naar ADHD Care.",
            "Na ontvangst van de verwijzing nemen we contact met je op om een intakegesprek te plannen.",
          ].map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">{i + 1}</span>
              <span className="pt-1 text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-xl bg-muted p-5 text-sm">
          <strong>Let op:</strong> zonder verwijsbrief van je huisarts of medisch specialist kunnen we je aanmelding helaas niet in behandeling nemen.
        </p>
      </Section>
      <Section title="Voor huisartsen en zorgverleners">
        <p className="text-muted-foreground">
          We accepteren verwijzingen van huisartsen en medisch specialisten. Stel een verwijsbrief op met de klachten en
          voorgeschiedenis, en verwijs via ZorgDomein of stuur de brief rechtstreeks naar ons. Wij nemen daarna contact op
          met je patiënt om de intake te starten.
        </p>
      </Section>
      <Section title="Voor wie is onze zorg?">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6">
            <h3 className="font-bold text-primary">Wel passend</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Je bent 18 jaar of ouder</li>
              <li>Je hebt een geldige verwijsbrief</li>
              <li>Je hebt klachten die op ADHD wijzen, zoals concentratieproblemen, impulsiviteit of onrust</li>
              <li>Je kunt je uitdrukken in het Nederlands of Engels</li>
            </ul>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-bold text-primary">Mogelijk niet passend</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Een actieve, niet-stabiele verslaving</li>
              <li>Een ernstige andere psychische aandoening die op de voorgrond staat, zoals een psychose</li>
              <li>Een crisissituatie of een hoog risico op suïcide</li>
              <li>Een ernstige verstandelijke beperking</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">In die gevallen denken we mee over een passende andere plek.</p>
          </div>
        </div>
      </Section>
      <Section title="Afspraak niet nagekomen">
        <p className="text-muted-foreground">
          Voor elke afspraak reserveren we tijd en een behandelaar speciaal voor jou. Kun je niet komen? Meld je dan
          minimaal 24 uur van tevoren af. Bij een afspraak zonder tijdige afmelding kunnen we kosten in rekening
          brengen. Kom je herhaaldelijk niet, dan kunnen we het traject beëindigen.
        </p>
      </Section>
      <Section title="Meld je interesse aan">
        <p className="mb-6 text-muted-foreground">Laat alvast je gegevens achter. We nemen contact met je op zodra je verwijsbrief binnen is.</p>
        <form onSubmit={submit} noValidate className="space-y-5 rounded-xl border p-6 md:p-8">
          <label className="block font-medium">Naam
            <input name="naam" className={field} />
            {err.naam && <span className="text-sm text-destructive">{err.naam}</span>}
          </label>
          <label className="block font-medium">E-mailadres
            <input name="email" type="email" className={field} />
            {err.email && <span className="text-sm text-destructive">{err.email}</span>}
          </label>
          <label className="block font-medium">Telefoonnummer
            <input name="telefoon" type="tel" className={field} />
          </label>
          <label className="block font-medium">Waarvoor meld je je aan?
            <select name="type" className={field}>
              <option>Diagnostiek</option>
              <option>Behandeling</option>
              <option>Weet ik nog niet</option>
            </select>
          </label>
          <label className="block font-medium">Heb je een verwijzing van je huisarts?
            <select name="verwijzing" className={field}>
              <option>Ja</option>
              <option>Nog niet</option>
            </select>
          </label>
          <label className="block font-medium">Toelichting (optioneel)
            <textarea name="toelichting" rows={4} className={field} />
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input name="akkoord" type="checkbox" className="mt-1" />
            <span>Ik ga akkoord met de verwerking van mijn gegevens volgens de privacyverklaring.</span>
          </label>
          {err.akkoord && <p className="text-sm text-destructive">{err.akkoord}</p>}
          <button className="rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">Aanmelding versturen</button>
        </form>
      </Section>
    </>
  );
}
