import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/adhd-diagnostiek", label: "Diagnostiek" },
  { to: "/adhd-behandeling", label: "Behandeling" },
  { to: "/kosten-en-vergoeding", label: "Kosten" },
  { to: "/over-ons", label: "Over ons" },
  { to: "/voor-verwijzers", label: "Verwijzers" },
  { to: "/veelgestelde-vragen", label: "Vragen" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" aria-label="ADHD Punt home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CtaButton small />
          <button
            className="rounded-md border px-3 py-2 text-sm lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 font-medium">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CtaButton({ small, label = "Direct aanmelden" }: { small?: boolean; label?: string }) {
  return (
    <Link
      to="/aanmelden"
      className={`inline-flex items-center justify-center rounded-full bg-accent font-bold text-accent-foreground shadow-sm transition hover:brightness-95 ${small ? "px-4 py-2 text-sm" : "px-6 py-3"}`}
    >
      {label}
    </Link>
  );
}

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-3 md:hidden">
      <Link to="/aanmelden" className="block rounded-full bg-accent py-3 text-center font-bold text-accent-foreground">
        Direct aanmelden
      </Link>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-primary pb-24 text-primary-foreground md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <Logo inverse />
          <p className="mt-2 text-sm opacity-80">Specialistische ADHD-zorg voor volwassenen.</p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Pagina's</p>
          <ul className="mt-2 space-y-1 opacity-90">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm opacity-90">
          <p className="font-bold">Contact</p>
          <p className="mt-2">info@adhdpunt.nl</p>
          <p>Ma t/m vr, 9:00 – 17:00</p>
          <p className="mt-4 opacity-70">Privacyverklaring · Cookiebeleid · Klachtenregeling</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h1 className="text-3xl font-extrabold leading-tight text-primary md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16">
      {title && <h2 className="mb-6 text-2xl font-extrabold text-primary md:text-3xl">{title}</h2>}
      {children}
    </section>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-bold text-primary">{title}</h3>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </div>
  );
}

export function CtaBand() {
  return (
    <Section>
      <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
        <h2 className="text-2xl font-extrabold">Klaar om de eerste stap te zetten?</h2>
        <p className="mt-2 opacity-90">Aanmelden duurt een paar minuten. Wij nemen daarna contact met je op.</p>
        <div className="mt-6"><CtaButton /></div>
      </div>
    </Section>
  );
}

export function meta(title: string, description: string) {
  const t = `${title} | ADHD Punt`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

export function Logo({ inverse }: { inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${inverse ? "text-primary-foreground" : "text-primary"}`}>
      <svg viewBox="0 0 64 34" className="h-9 w-auto" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13.5 9 L22.5 9 L27 17 L22.5 25 L13.5 25 L9 17 Z" />
        <path d="M15.5 13 L20.5 13 M15.5 21 L20.5 21" strokeWidth="2.5" />
        <path d="M13.5 9 L10 2 M9 17 L2 17 M27 17 L35 23 L43 18 L50 22" />
        <circle cx="55" cy="25" r="5" fill="var(--accent)" stroke="none" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        ADHD <span className="font-semibold">Punt</span>
      </span>
    </span>
  );
}
