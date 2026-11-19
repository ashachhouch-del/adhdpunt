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
        <Link to="/" aria-label="ADHDPunt home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
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
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block py-2 font-medium"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CtaButton({
  small,
  inverse,
  label = "Direct aanmelden",
}: {
  small?: boolean;
  inverse?: boolean;
  label?: string;
}) {
  return (
    <Link
      to="/aanmelden"
      className={`inline-flex items-center justify-center rounded-lg font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 ${inverse ? "bg-background text-primary hover:bg-muted focus-visible:outline-background" : "bg-primary text-primary-foreground hover:bg-secondary focus-visible:outline-primary"} ${small ? "px-4 py-2 text-sm" : "px-6 py-3"}`}
    >
      {label}
    </Link>
  );
}

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-3 md:hidden">
      <Link
        to="/aanmelden"
        className="block rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground"
      >
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
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
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

export function PageHero({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-muted">
      <BrandArc />
      <div className="relative mx-auto max-w-4xl px-4 py-16 md:py-20">
        <h1 className="text-3xl font-semibold leading-tight text-primary md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Decorative brand device: deep-green quarter circle with a single coral endpoint dot. */
export function BrandArc() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-72 xl:block"
    >
      <span className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary" />
      {/* coral endpoint dot sits on the circle edge, like the dot in the logo */}
      <span className="absolute top-[138px] right-[138px] h-6 w-6 rounded-full bg-accent" />
    </span>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16">
      {title && <h2 className="mb-6 text-2xl font-semibold text-primary md:text-3xl">{title}</h2>}
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
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-muted/10"
        />
        <h2 className="text-2xl font-semibold">Klaar om de eerste stap te zetten?</h2>
        <p className="mt-2 opacity-90">
          Aanmelden duurt een paar minuten. Wij nemen daarna contact met je op.
        </p>
        <div className="mt-6">
          <CtaButton inverse />
        </div>
      </div>
    </Section>
  );
}

export function meta(title: string, description: string, path: string) {
  const t = `${title} | ADHDPunt`;
  const url = new URL(path, "https://adhdpunt.nl").href;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "nl_NL" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: t },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: t,
          description,
          inLanguage: "nl-NL",
          isPartOf: { "@id": "https://adhdpunt.nl/#website" },
        }),
      },
    ],
  };
}

export function Logo({ inverse }: { inverse?: boolean }) {
  const ink = inverse ? "var(--primary-foreground)" : "var(--primary)";
  return (
    <svg
      viewBox="0 0 430 120"
      className="h-10 w-auto md:h-12"
      role="img"
      aria-label="ADHDPunt"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 7) scale(.82)">
        <g fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M45 58 L62 28 L98 28 L116 58 L98 88 L62 88 Z" />
          <path d="M45 58 H24 M62 28 L52 10 M116 58 L142 76 L170 58 L190 70" />
          <path d="M72 45 L66 58 M90 74 H78 M96 44 L104 58" />
        </g>
        <circle cx="202" cy="76" r="13" fill="#F39B83" />
      </g>
      <text x="185" y="76" fill={ink} fontFamily="Inter, Aptos, Arial, sans-serif" fontSize="48">
        <tspan fontWeight="700">ADHD</tspan>
        <tspan fontWeight="400">Punt</tspan>
      </text>
    </svg>
  );
}
