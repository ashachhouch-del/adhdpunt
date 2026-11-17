import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/veelgestelde-vragen")({
  staticData: { sitemap: true },
  head: () =>
    meta(
      "Veelgestelde vragen over ADHD-zorg",
      "Antwoorden op vragen over ADHD-zorg bij ADHDPunt: aanmelden, verwijzingen, diagnostiek, behandeling, kosten en vergoeding voor volwassenen.",
      "/veelgestelde-vragen",
    ),
  component: Page,
});

const faqs = [
  {
    c: "Aanmelden",
    q: "Heb ik een verwijzing nodig?",
    a: "Ja, een verwijsbrief van je huisarts is nodig voor vergoeding.",
  },
  {
    c: "Aanmelden",
    q: "Hoe lang is de wachttijd?",
    a: "Dat verschilt per periode. Na je aanmelding laten we je weten wat je kunt verwachten.",
  },
  {
    c: "Diagnostiek",
    q: "Hoe lang duurt het onderzoek?",
    a: "Meestal een paar afspraken verspreid over enkele weken.",
  },
  {
    c: "Diagnostiek",
    q: "Mag ik iemand meenemen?",
    a: "Ja, een naaste kan juist waardevolle informatie geven.",
  },
  {
    c: "Behandeling",
    q: "Krijg ik altijd medicatie?",
    a: "Nee. Medicatie is één van de mogelijkheden en wordt samen met jou afgewogen.",
  },
  {
    c: "Kosten",
    q: "Wordt het vergoed?",
    a: "ADHD-zorg valt onder de basisverzekering. Je eigen risico is van toepassing.",
  },
];
const cats = ["Alle", ...Array.from(new Set(faqs.map((f) => f.c)))];

function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Alle");
  const list = faqs.filter(
    (f) => (cat === "Alle" || f.c === cat) && (f.q + f.a).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHero
        title="Veelgestelde vragen"
        intro="Staat je vraag er niet bij? Neem gerust contact met ons op."
      />
      <Section>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Zoek een vraag..."
          className="w-full rounded-lg border border-input px-4 py-3"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6 divide-y rounded-xl border">
          {list.map((f) => (
            <details key={f.q} className="p-5">
              <summary className="cursor-pointer font-bold text-primary">{f.q}</summary>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </details>
          ))}
          {list.length === 0 && <p className="p-5 text-muted-foreground">Geen vragen gevonden.</p>}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
