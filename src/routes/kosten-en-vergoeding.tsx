import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaBand, PageHero, Section, meta } from "@/components/site";

export const Route = createFileRoute("/kosten-en-vergoeding")({
  staticData: { sitemap: true },
  head: () =>
    meta(
      "Kosten en vergoeding van ADHD-zorg",
      "Lees hoe de kosten van ADHD-diagnostiek en behandeling bij ADHDPunt zijn opgebouwd: vergoeding vanuit de basisverzekering, onze coulanceregeling, de eenmalige persoonlijke bijdrage van € 250 en het eigen risico.",
      "/kosten-en-vergoeding",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Kosten & vergoeding"
        intro="We vinden het belangrijk dat je vooraf zo goed mogelijk weet waar je financieel aan toe bent. Op deze pagina leggen we uit hoe de kosten bij ADHDPunt zijn opgebouwd, welke rol je zorgverzekering speelt en welke bedragen mogelijk voor je eigen rekening komen."
      />

      <Section title="Snel weten wat dit voor jou betekent?">
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <p className="font-bold text-primary">Je betaalt zelf alleen:</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-muted p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Persoonlijke bijdrage
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">€ 250</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Eenmalig voor het hele traject, ongeacht de duur.
              </p>
            </div>
            <div className="rounded-xl bg-muted p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Eigen risico
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">Wettelijk bedrag</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Alleen als je dit in dat kalenderjaar nog niet hebt verbruikt.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Diagnostiek
              </p>
              <p className="mt-1 text-2xl font-extrabold text-primary">± € 2.000</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Intake, onderzoek en adviesgesprek samen.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Behandeling (gemiddeld 6 maanden)
              </p>
              <p className="mt-1 text-2xl font-extrabold text-primary">± € 4.000</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Afhankelijk van het aantal consulten en de gekozen behandeling.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            De bedragen zijn een indicatie en gebaseerd op de NZa-tarieven. De exacte vergoeding
            hangt af van je polis en zorgverzekeraar. Aan deze informatie kunnen geen rechten worden
            ontleend.
          </p>
        </div>
      </Section>

      <Section title="De belangrijkste punten op een rij">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Je behandeling kan onder de basisverzekering vallen">
            Wanneer aan de voorwaarden voor verzekerde ggz wordt voldaan en je beschikt over een
            geldige verwijzing, kan je zorg vanuit de basisverzekering worden vergoed. Hoe hoog de
            vergoeding is, hangt onder andere af van je zorgverzekeraar, polis en eventuele
            afspraken tussen ADHDPunt en je verzekeraar.
          </Card>
          <Card title="ADHDPunt levert ongecontracteerde zorg">
            Omdat ADHDPunt geen overeenkomst heeft met je zorgverzekeraar, kan je behandeling toch
            voor vergoeding in aanmerking komen. De hoogte van die vergoeding is afhankelijk van je
            polisvoorwaarden.{" "}
            <strong className="text-foreground">
              Op dit moment nemen wij de kosten van niet-vergoede zorg op ons.
            </strong>{" "}
            Wanneer je aan de voorwaarden van onze coulanceregeling voldoet, nemen wij het deel dat
            je verzekeraar niet vergoedt voor eigen rekening.
          </Card>
          <Card title="Een eenmalige persoonlijke bijdrage van € 250">
            Voor het gecombineerde diagnostiek- en behandeltraject brengen wij eenmaal een
            persoonlijke bijdrage van € 250 in rekening. Deze bijdrage staat los van het eigen
            risico en van de vergoeding door je zorgverzekeraar.
          </Card>
          <Card title="De kosten worden opgebouwd per zorgprestatie">
            Binnen de ggz wordt gewerkt met het Zorgprestatiemodel. De verschillende consulten en
            andere zorgprestaties binnen je traject worden afzonderlijk geregistreerd. Daardoor
            bestaat er niet één vaste prijs voor een volledig ADHD-traject.
          </Card>
          <Card title="Het eigen risico blijft altijd voor jezelf">
            Zorg vanuit de basisverzekering valt onder het eigen risico. Heb je je eigen risico nog
            niet volledig gebruikt, dan kan je zorgverzekeraar dit verrekenen. Loopt je behandeling
            door in een volgend kalenderjaar, dan kan opnieuw eigen risico van toepassing zijn.
          </Card>
        </div>
      </Section>

      <Section title="Een voorbeeld">
        <p className="text-muted-foreground">
          Om inzichtelijk te maken hoe de verschillende bedragen zich tot elkaar kunnen verhouden,
          gebruiken we een fictief traject met totale zorgkosten van ongeveer € 6.000. Stel dat je
          verzekeraar in jouw situatie ongeveer 60% van de verzekerde zorgkosten vergoedt:
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between gap-4 border-b pb-2">
            <span>Totale geregistreerde zorgkosten</span>
            <strong className="text-primary">± € 6.000</strong>
          </li>
          <li className="flex justify-between gap-4 border-b pb-2">
            <span>Vergoeding zorgverzekeraar bij 60%</span>
            <strong className="text-primary">± € 3.600</strong>
          </li>
          <li className="flex justify-between gap-4 border-b pb-2">
            <span>Niet-vergoed gedeelte</span>
            <strong className="text-primary">± € 2.400</strong>
          </li>
          <li className="flex justify-between gap-4 border-b pb-2">
            <span>Persoonlijke bijdrage aan ADHDPunt</span>
            <strong className="text-primary">€ 250</strong>
          </li>
          <li className="flex justify-between gap-4 border-b pb-2">
            <span>Eventueel nog openstaand eigen risico</span>
            <strong className="text-primary">voor je eigen rekening</strong>
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          Wanneer je voldoet aan de voorwaarden van onze coulanceregeling, wordt het niet-vergoede
          gedeelte van circa € 2.400 niet bij jou in rekening gebracht. In dit voorbeeld betaal je
          daardoor zelf:{" "}
          <strong className="text-foreground">
            € 250 persoonlijke bijdrage + het eventueel nog openstaande eigen risico.
          </strong>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Dit voorbeeld is uitsluitend bedoeld om de systematiek uit te leggen. Je daadwerkelijke
          zorgkosten en vergoeding kunnen anders zijn.
        </p>
      </Section>

      <Section title="Hoe ontstaat het tarief van je zorg?">
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">Zorg wordt geregistreerd per prestatie.</strong> De
            ggz werkt met het Zorgprestatiemodel. Dat betekent dat de kosten tijdens je traject
            ontstaan op basis van de zorg die daadwerkelijk wordt geregistreerd. Een ADHD-traject
            bestaat meestal uit meerdere onderdelen, zoals diagnostische gesprekken, medische
            beoordeling, behandeling, evaluaties en eventueel overleg tussen behandelaren. Het
            totaal van deze afzonderlijke prestaties vormt uiteindelijk de totale zorgkosten van je
            traject.
          </p>
          <p>
            <strong className="text-foreground">
              Daarom heeft een traject geen vaste totaalprijs.
            </strong>{" "}
            Niet iedereen heeft dezelfde zorgvraag. De ene persoon heeft bijvoorbeeld meer
            diagnostische gesprekken nodig, terwijl bij een ander meer behandel- of
            medicatieconsulten nodig zijn. De uiteindelijke kosten kunnen daarom van persoon tot
            persoon verschillen. Voor zorgprestaties binnen de ggz gelden landelijke regels en
            tarieven vanuit de Nederlandse Zorgautoriteit (NZa).
          </p>
        </div>
      </Section>

      <Section title="Hoe verloopt de betaling?">
        <p className="text-muted-foreground">
          Voor de facturatie werkt ADHDPunt samen met Infomedics. Je ontvangt een factuur voor de
          geleverde zorg, die je eerst declareert bij je eigen zorgverzekeraar. Belangrijk om te
          weten: de factuur is niet hetzelfde als het bedrag dat je zelf betaalt. Op de factuur
          staat het volledige bedrag van de geleverde zorg. Dat bedrag kan aanzienlijk hoger zijn
          dan de vergoeding die je uiteindelijk van je zorgverzekeraar ontvangt. Dit verschil hoef
          je niet zelf te betalen wanneer onze coulanceregeling van toepassing is. Je eventuele
          eigen risico en persoonlijke bijdrage blijven wel voor je eigen rekening.
        </p>
        <ol className="mt-6 space-y-4">
          {[
            [
              "Je ontvangt de factuur",
              "Infomedics stuurt namens ADHDPunt de factuur voor de geleverde zorg.",
            ],
            [
              "Je declareert bij je zorgverzekeraar",
              "Je dient de volledige factuur zelf in bij je zorgverzekeraar, bijvoorbeeld via de app of het online portaal van je verzekeraar.",
            ],
            [
              "Je zorgverzekeraar bepaalt de vergoeding",
              "Je zorgverzekeraar beoordeelt de declaratie. De vergoeding is afhankelijk van je polis en kan lager zijn dan het bedrag op de factuur.",
            ],
            [
              "Je ontvangt de vergoeding",
              "Je zorgverzekeraar betaalt het bedrag waarop je volgens je polis recht hebt aan je uit. Stuur het vergoedingenoverzicht vervolgens door volgens de instructies van ADHDPunt en Infomedics.",
            ],
            [
              "Het verschil nemen wij voor onze rekening",
              "Is de vergoeding van je zorgverzekeraar lager dan de factuur? Dan hoef je dat verschil niet zelf bij te betalen wanneer de coulanceregeling op jouw situatie van toepassing is. ADHDPunt neemt dat gedeelte voor eigen rekening.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-primary">{t}</p>
                <p className="text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Het eigen risico uitgelegd">
        <div className="space-y-4 text-muted-foreground">
          <p>
            Voor verzekerden van 18 jaar en ouder geldt een wettelijk verplicht eigen risico voor
            zorg uit de basisverzekering. Dit bedrag wordt door je zorgverzekeraar met je verrekend
            en staat los van de coulanceregeling van ADHDPunt.
          </p>
          <p>
            <strong className="text-foreground">Verplicht eigen risico.</strong> De overheid bepaalt
            jaarlijks de hoogte van het verplichte eigen risico. Hoeveel hiervan voor jou nog
            resteert, hangt af van de zorgkosten die je eerder in hetzelfde kalenderjaar hebt
            gemaakt. Heb je het volledige eigen risico al gebruikt, dan is er voor dat kalenderjaar
            geen resterend verplicht eigen risico meer om te verrekenen.
          </p>
          <p>
            <strong className="text-foreground">Vrijwillig verhoogd eigen risico.</strong> Sommige
            verzekerden kiezen naast het verplichte eigen risico voor een vrijwillig hoger eigen
            risico. Heb je daarvoor gekozen? Dan kan het bedrag dat je zelf moet dragen hoger zijn.
            In je polis of de online omgeving van je zorgverzekeraar zie je welk eigen risico voor
            jou geldt.
          </p>
          <p>
            <strong className="text-foreground">Een nieuw kalenderjaar.</strong> Het eigen risico
            geldt per kalenderjaar. Wanneer je behandeling over de jaargrens heen loopt, kunnen
            zorgprestaties in het nieuwe kalenderjaar opnieuw ten laste komen van het eigen risico
            dat voor dat jaar geldt.
          </p>
        </div>
      </Section>

      <Section title="Vooraf duidelijkheid">
        <p className="text-muted-foreground">
          Wij adviseren om vóór de start van je traject drie zaken te controleren:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-6 font-medium text-primary">
          <li>Welke vergoeding geldt binnen mijn polis voor gespecialiseerde ggz bij ADHDPunt?</li>
          <li>Hoeveel eigen risico heb ik dit kalenderjaar nog openstaan?</li>
          <li>Is vooraf toestemming of een machtiging van mijn zorgverzekeraar nodig?</li>
        </ol>
        <p className="mt-4 text-muted-foreground">
          Deze informatie vind je meestal in de app of online omgeving van je zorgverzekeraar. Voor
          polis-specifieke vragen kun je ook rechtstreeks contact opnemen met je verzekeraar. Zo
          weet je voordat je start zo goed mogelijk waar je financieel aan toe bent.
        </p>
      </Section>

      <Section>
        <div className="rounded-xl border bg-muted p-6 text-sm text-muted-foreground">
          <p className="font-bold text-primary">Belangrijk</p>
          <p className="mt-2">
            De bedragen op deze pagina zijn indicatief. De uiteindelijke zorgkosten worden bepaald
            door de zorgprestaties die binnen je individuele traject worden geregistreerd. De
            vergoeding is afhankelijk van je verzekeraar, polisvoorwaarden, contractering en
            persoonlijke situatie. Aan rekenvoorbeelden of indicatieve bedragen op deze pagina
            kunnen daarom geen rechten worden ontleend.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
