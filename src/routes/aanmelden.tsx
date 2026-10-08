import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/aanmelden")({
  head: () => meta("Direct aanmelden", "Meld je direct aan bij ADHD Punt voor diagnostiek of behandeling van ADHD."),
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
      <PageHero title="Direct aanmelden" intro="Vul het formulier in. We nemen binnen enkele werkdagen contact met je op." />
      <Section>
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
