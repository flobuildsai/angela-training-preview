import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portraitImg from "@/assets/laura-call.jpg";
import mentorImg from "@/assets/mentor.jpg";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creating Society — Dein digitales Business in 12 Wochen" },
      {
        name: "description",
        content:
          "12-Wochen Done-with-you Coaching für Frauen: aus Wissen und Erfahrung ein digitales Angebot entwickeln, testen und verkaufen. Kostenloses Strategiegespräch buchen.",
      },
      { property: "og:title", content: "Creating Society — Dein digitales Business in 12 Wochen" },
      {
        property: "og:description",
        content:
          "Positionierung, Angebot, Messaging und Verkaufsprozess — gemeinsam aufgebaut. Buche dein kostenloses Strategiegespräch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

// ─────────────────────────────────────────────────────────────
// Inhalte
// ─────────────────────────────────────────────────────────────

const problemPoints = [
  "welches Problem sie konkret lösen sollen",
  "für wen ihr Angebot gedacht ist",
  "was sie zuerst verkaufen sollen",
  "wie sie einen Preis festlegen",
  "wie sie ohne große Reichweite Kunden gewinnen",
  "wie sie aus einer Idee ein echtes Angebot machen",
];

const beliefs = [
  {
    old: "Ich brauche erst eine große Reichweite.",
    now: "Du brauchst zuerst ein relevantes Angebot. Reichweite verstärkt nur, was bereits existiert.",
  },
  {
    old: "Ich bin noch keine Expertin.",
    now: "Du musst nicht die Beste der Welt sein. Du musst einer bestimmten Person bei einem klaren nächsten Schritt helfen können.",
  },
  {
    old: "Ich muss erst einen kompletten Kurs produzieren.",
    now: "Du solltest dein Angebot zuerst testen und verkaufen, bevor du monatelang Inhalte baust.",
  },
  {
    old: "Ich brauche komplizierte Funnel und Technik.",
    now: "Am Anfang brauchst du einen klaren Weg vom Interesse zum Gespräch und vom Gespräch zum Kauf.",
  },
];

const phases = [
  {
    index: "01",
    name: "Position",
    title: "Finde heraus, wofür Menschen dich bezahlen würden.",
    items: [
      "Fähigkeiten und Erfahrungen analysieren",
      "passende Zielgruppe definieren",
      "relevantes Problem auswählen",
      "klares Ergebnisversprechen formulieren",
      "Positionierung entwickeln",
    ],
    result:
      "Du weißt, wem du hilfst, welches Problem du löst und warum dein Angebot relevant ist.",
  },
  {
    index: "02",
    name: "Package",
    title: "Verwandle dein Wissen in ein kaufbares Angebot.",
    items: [
      "Angebotsformat auswählen",
      "eigene Methode strukturieren",
      "Umfang und Delivery festlegen",
      "Preisstrategie entwickeln",
      "Angebotsname und Messaging erstellen",
      "Angebot vor vollständiger Produktion validieren",
    ],
    result: "Du besitzt ein strukturiertes, verständliches und verkaufbares Angebot.",
  },
  {
    index: "03",
    name: "Attract",
    title: "Ziehe die richtigen Menschen an – nicht einfach möglichst viele.",
    items: [
      "Positionierungscontent",
      "problemorientierter Content",
      "Authority Content",
      "persönliche Storys",
      "bestehendes Netzwerk",
      "direkte Kontakte",
      "strategische Sichtbarkeit",
    ],
    result:
      "Du hast einen realistischen Weg, relevante Interessentinnen auf dein Angebot aufmerksam zu machen.",
  },
  {
    index: "04",
    name: "Convert",
    title: "Mache aus Interesse einen klaren Verkaufsprozess.",
    items: [
      "Salespage oder Bewerbungsseite",
      "DM-Qualifizierung",
      "Verkaufsgespräch",
      "Einwandbehandlung",
      "Follow-up",
      "Onboarding",
    ],
    result: "Du verfügst über einen einfachen Prozess vom ersten Kontakt bis zur Kundin.",
  },
];

const deliverables = [
  "deine Positionierung",
  "dein Zielkundenprofil",
  "dein Angebotsversprechen",
  "deine eigene Methode",
  "deine Angebotsstruktur",
  "deine Preisstrategie",
  "dein Messaging",
  "deine Salespage oder Bewerbungsstrecke",
  "dein Content-System",
  "dein Verkaufsprozess",
  "dein persönlicher 90-Tage-Plan",
];

const support = [
  {
    title: "Persönliches Strategie-Onboarding",
    lead: "Analyse von:",
    items: [
      "Erfahrungen",
      "Fähigkeiten",
      "Zielgruppen",
      "Geschäftsideen",
      "zeitlichen Ressourcen",
      "passenden Angebotsmodellen",
    ],
    result: "Individueller Umsetzungsplan.",
  },
  {
    title: "Wöchentliche Implementation Calls",
    lead: "Fokus auf:",
    items: [
      "konkrete Entscheidungen",
      "Feedback",
      "Blockaden",
      "Angebot",
      "Positionierung",
      "Content",
      "Verkauf",
      "nächste Schritte",
    ],
  },
  {
    title: "Done-with-you Offer Build",
    lead: "Gemeinsame Entwicklung von:",
    items: [
      "Positionierung",
      "Angebot",
      "Methode",
      "Preis",
      "Messaging",
      "Salespage",
      "Verkaufsprozess",
    ],
  },
  {
    title: "Persönliches Feedback",
    lead: "Feedback auf:",
    items: [
      "Angebotsversprechen",
      "Positionierung",
      "Sales Copy",
      "Content",
      "Profil",
      "Verkaufsgespräche",
      "Follow-ups",
    ],
  },
  {
    title: "Implementation Hub",
    lead: "",
    items: [],
    body: "Kurze, klare Lektionen in sinnvoller Reihenfolge. Keine endlose Kursbibliothek.",
  },
  {
    title: "Template Vault",
    lead: "Vorlagen für:",
    items: [
      "Positionierung",
      "Zielgruppenanalyse",
      "Offer Stack",
      "Salespage",
      "Content",
      "DMs",
      "Verkaufsgespräche",
      "Follow-up",
      "Onboarding",
    ],
  },
  {
    title: "Private Community",
    lead: "Fokus auf:",
    items: ["Accountability", "Feedback", "Umsetzung", "Austausch mit Frauen in derselben Phase"],
  },
  {
    title: "Society AI",
    lead: "Unterstützung bei:",
    items: [
      "Positionierung",
      "Angeboten",
      "Headlines",
      "Content",
      "Sales Copy",
      "Einwänden",
      "Wochenplanung",
    ],
  },
];

const forYou = [
  "du Wissen, Erfahrung oder Fähigkeiten besitzt",
  "du ein eigenes digitales Business aufbauen willst",
  "du noch keine klare Geschäftsidee hast",
  "du bereits Content machst, aber kaum Umsatz erzielst",
  "du keine fremden Produkte weiterverkaufen willst",
  "du fünf bis zehn fokussierte Stunden pro Woche investieren kannst",
  "du Feedback annehmen und tatsächlich umsetzen willst",
];

const notForYou = [
  "du schnelles Geld ohne Arbeit suchst",
  "du ein vollständig fertiges Done-for-you-Business erwartest",
  "du keine Gespräche mit potenziellen Kunden führen willst",
  "du nur Follower statt Kunden möchtest",
  "du nicht bereit bist, dein Angebot am echten Markt zu testen",
  "du garantierte Umsätze erwartest",
];

const timeline = [
  { weeks: "Woche 1–2", title: "Positionierung und Zielgruppe" },
  { weeks: "Woche 3–4", title: "Angebot und eigene Methode" },
  { weeks: "Woche 5–6", title: "Preis, Messaging und Angebotsstruktur" },
  { weeks: "Woche 7–8", title: "Salespage, Bewerbung und Verkaufsprozess" },
  { weeks: "Woche 9–10", title: "Content, Outreach und erste Gespräche" },
  { weeks: "Woche 11–12", title: "Markttest, Feedback und Optimierung" },
];

const callAgenda = [
  {
    index: "01",
    title: "Ausgangssituation",
    lead: "Wir schauen auf:",
    items: [
      "deine Erfahrung",
      "deine Fähigkeiten",
      "bestehende Ideen",
      "Reichweite oder Netzwerk",
      "verfügbare Zeit",
      "aktuelle Blockaden",
    ],
  },
  {
    index: "02",
    title: "Potenzial",
    lead: "Wir identifizieren:",
    items: [
      "mögliche Zielgruppen",
      "relevante Probleme",
      "passende Angebotsmodelle",
      "sinnvolle nächste Schritte",
    ],
  },
  {
    index: "03",
    title: "Entscheidung",
    lead: "",
    items: [],
    body: "Wenn Creating Society zu deiner Situation passt, erklären wir dir, wie eine Zusammenarbeit aussehen könnte. Wenn nicht, sagen wir das offen.",
  },
];

const faqs = [
  {
    q: "Brauche ich bereits eine Geschäftsidee?",
    a: "Nein. Im Strategiegespräch prüfen wir, welche deiner Erfahrungen oder Fähigkeiten sich für ein konkretes Angebot eignen könnten. Das Programm hilft dir anschließend dabei, daraus eine klare Positionierung und ein Angebot zu entwickeln.",
  },
  {
    q: "Brauche ich eine große Reichweite?",
    a: "Nein. Reichweite kann helfen, ist aber keine Voraussetzung. Gerade am Anfang können bestehende Kontakte, direkte Gespräche, kleine Communities und fokussierter Content effektiver sein als eine große, unklare Followerschaft.",
  },
  {
    q: "Muss ich bereits selbstständig sein?",
    a: "Nein. Creating Society richtet sich ausdrücklich auch an Frauen, die aktuell angestellt sind und ihr Business strukturiert nebenberuflich aufbauen möchten.",
  },
  {
    q: "Wie viel Zeit sollte ich einplanen?",
    a: "Plane realistisch fünf bis zehn fokussierte Stunden pro Woche ein. Mit weniger Zeit ist Fortschritt möglich, aber entsprechend langsamer.",
  },
  {
    q: "Ist das ein Selbstlernkurs?",
    a: "Nein. Creating Society ist ein betreutes Done-with-you-Programm. Die Lerninhalte geben dir die Struktur. Die Calls, Reviews und Feedbackprozesse sorgen dafür, dass du konkrete Entscheidungen triffst und umsetzt.",
  },
  {
    q: "Baut ihr das Business vollständig für mich?",
    a: "Nein. Wir entwickeln die Strategie und zentrale Elemente gemeinsam mit dir. Die Umsetzung bleibt deine Verantwortung. Dadurch entsteht ein Business, das du selbst verstehst und langfristig führen kannst.",
  },
  {
    q: "Kann ich auch ohne mein Gesicht zu zeigen starten?",
    a: "Je nach Thema und Geschäftsmodell ist ein faceless oder personal-brand-unabhängiger Ansatz möglich. Im Strategiegespräch prüfen wir, was für dein Angebot sinnvoll ist.",
  },
  {
    q: "Garantiert ihr bestimmte Umsätze?",
    a: "Nein. Umsatz hängt von Angebot, Markt, Umsetzung, Verkauf und individuellen Voraussetzungen ab. Wir versprechen keine bestimmten Einnahmen. Wir helfen dir, die strategische und operative Grundlage für ein reales Angebot aufzubauen.",
  },
  {
    q: "Was passiert nach dem Strategiegespräch?",
    a: "Wenn beide Seiten glauben, dass Creating Society zu deiner Situation passt, erklären wir dir das Programm und die nächsten Schritte. Es gibt keinen direkten Checkout auf der Website und keinen künstlichen Entscheidungsdruck.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrolled() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return past;
}

function useBookingVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("call");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) trackEvent("call_section_view");
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return visible;
}

function scrollToCall(source: string) {
  trackEvent("call_cta_click", { source });
  document.getElementById("call")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Bausteine ─────────────────────────────────────────────────
function CtaButton({
  source,
  children,
  tone = "wine",
  className = "",
}: {
  source: string;
  children: React.ReactNode;
  tone?: "wine" | "cream" | "outline";
  className?: string;
}) {
  const tones = {
    wine: "bg-[color:var(--wine)] text-[color:var(--cream)]",
    cream: "bg-[color:var(--cream)] text-[color:var(--wine)]",
    outline:
      "border border-current text-current hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] hover:border-transparent",
  } as const;

  return (
    <button
      type="button"
      onClick={() => scrollToCall(source)}
      className={
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90 " +
        tones[tone] +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p
      className={
        "eyebrow " + (muted ? "text-[color:var(--cream)]/55" : "text-[color:var(--rose)]")
      }
    >
      {children}
    </p>
  );
}

// ── Seite ─────────────────────────────────────────────────────
function HomePage() {
  useReveal();
  const past = useScrolled();
  const bookingVisible = useBookingVisible();

  return (
    <>
      {/* Sticky Header */}
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 " +
          (past
            ? "border-b border-[color:var(--border)] bg-[color:var(--cream)]/90 text-[color:var(--ink)] backdrop-blur-md"
            : "bg-transparent text-[color:var(--ink)]")
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-xl tracking-tight">
            Creating <span className="serif-italic">Society</span>
          </Link>
          <nav className="flex items-center gap-7">
            <a href="#method" className="hidden text-[0.68rem] uppercase tracking-[0.2em] opacity-70 hover:opacity-100 lg:inline">
              Die Methode
            </a>
            <a href="#program" className="hidden text-[0.68rem] uppercase tracking-[0.2em] opacity-70 hover:opacity-100 lg:inline">
              Das Programm
            </a>
            <a href="#about" className="hidden text-[0.68rem] uppercase tracking-[0.2em] opacity-70 hover:opacity-100 lg:inline">
              Über Laura
            </a>
            <a href="#faq" className="hidden text-[0.68rem] uppercase tracking-[0.2em] opacity-70 hover:opacity-100 lg:inline">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => scrollToCall("header")}
              className="hidden rounded-full bg-[color:var(--wine)] px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)] transition hover:opacity-90 sm:inline-flex"
            >
              Strategiegespräch buchen
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-[color:var(--cream)]"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="rv">
              <Eyebrow>12-Wochen Done-with-you Coaching</Eyebrow>
              <h1
                id="hero-title"
                className="mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-[color:var(--wine)] sm:text-6xl lg:text-7xl"
              >
                Baue ein digitales Business, das wirklich dir gehört.
                <span className="mt-4 block serif-italic text-[1.5rem] leading-snug text-[color:var(--rose)] sm:text-3xl lg:text-4xl">
                  Nicht nur eine weitere Idee, die in deinen Notizen bleibt.
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
                Creating Society hilft dir, aus deiner Erfahrung oder deinen Fähigkeiten ein klares
                digitales Angebot zu entwickeln, es am Markt zu testen und deine ersten Kundinnen zu
                gewinnen – auch ohne große Reichweite oder fertige Geschäftsidee.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4">
                <CtaButton source="hero" className="w-full sm:w-auto">
                  Kostenloses Strategiegespräch buchen
                </CtaButton>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
                  Kostenlos · 30 Minuten · Persönliche Potenzialanalyse
                </p>
                <p className="mt-2 max-w-md border-l border-[color:var(--border)] pl-4 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                  Für Frauen, die bereit sind, aus ihrem Wissen ein echtes Business aufzubauen.
                </p>
              </div>
            </div>

            <div className="rv d1 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <img
                  src={portraitImg}
                  alt="Laura, Gründerin von Creating Society"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. PROBLEM ──────────────────────────────────── */}
        <section
          aria-labelledby="problem-title"
          className="border-t border-[color:var(--border)] bg-[color:var(--cream)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Warum so viele gute Ideen nie zu einem Business werden</Eyebrow>
              <h2
                id="problem-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Dir fehlt wahrscheinlich nicht das Potenzial.{" "}
                <span className="serif-italic text-[color:var(--rose)]">
                  Dir fehlt ein klarer Weg.
                </span>
              </h2>
            </div>

            <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              <div className="rv space-y-6 text-base leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
                <p>
                  Viele Frauen haben Fähigkeiten, Erfahrungen und Wissen, für das andere Menschen
                  bezahlen würden. Trotzdem entsteht daraus kein Business.
                </p>
                <p>
                  Nicht weil ihnen etwas Entscheidendes fehlt. Sondern weil sie nicht wissen:
                </p>
              </div>

              <ul className="rv d1 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
                {problemPoints.map((p) => (
                  <li
                    key={p}
                    className="py-5 font-serif text-xl leading-snug text-[color:var(--wine)] sm:text-2xl"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <p className="rv mt-16 max-w-3xl font-serif text-2xl leading-snug text-[color:var(--wine)] sm:text-3xl">
              Mehr Informationen lösen dieses Problem nicht.{" "}
              <span className="serif-italic text-[color:var(--rose)]">
                Klare Entscheidungen und konsequente Umsetzung schon.
              </span>
            </p>
          </div>
        </section>

        {/* ── 3. BELIEF SHIFT ─────────────────────────────── */}
        <section
          aria-labelledby="belief-title"
          className="bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-2xl">
              <Eyebrow muted>Perspektivwechsel</Eyebrow>
              <h2
                id="belief-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Du brauchst nicht zuerst mehr Follower.
              </h2>
            </div>

            <div className="mt-16 divide-y divide-[color:var(--cream)]/12 border-y border-[color:var(--cream)]/12">
              {beliefs.map((b, i) => (
                <div
                  key={b.old}
                  className={"rv grid gap-4 py-9 md:grid-cols-[0.85fr_1.15fr] md:gap-14 d" + ((i % 3) + 1)}
                >
                  <p className="text-base leading-relaxed text-[color:var(--cream)]/45 line-through decoration-[color:var(--rose)]/50">
                    {b.old}
                  </p>
                  <p className="font-serif text-xl leading-snug sm:text-2xl">{b.now}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. SOCIETY METHOD ───────────────────────────── */}
        <section
          id="method"
          aria-labelledby="method-title"
          className="scroll-mt-24 bg-[color:var(--cream)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Die Society Method</Eyebrow>
              <h2
                id="method-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Vier Phasen.{" "}
                <span className="serif-italic text-[color:var(--rose)]">Ein klares Ergebnis.</span>
              </h2>
              <p className="mt-7 text-base leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
                Wir bauen nicht zuerst Reichweite und hoffen anschließend, dass daraus irgendwann
                Umsatz entsteht. Wir beginnen mit dem Problem, dem Angebot und dem Markt.
              </p>
            </div>

            <div className="mt-20 space-y-0 border-t border-[color:var(--border)]">
              {phases.map((p) => (
                <article
                  key={p.index}
                  className="rv grid gap-8 border-b border-[color:var(--border)] py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:py-20"
                >
                  <div>
                    <p className="font-serif text-6xl leading-none text-[color:var(--rose)]/35 lg:text-7xl">
                      {p.index}
                    </p>
                    <p className="mt-4 eyebrow text-[color:var(--wine)]">{p.name}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug text-[color:var(--wine)] sm:text-3xl lg:text-4xl">
                      {p.title}
                    </h3>
                    <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                      {p.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-3 text-sm leading-relaxed text-[color:var(--muted-fg)]"
                        >
                          <span className="mt-2 h-px w-4 shrink-0 bg-[color:var(--rose)]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 border-l-2 border-[color:var(--rose)] pl-5 text-base leading-relaxed text-[color:var(--wine)]">
                      {p.result}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. TRANSFORMATION ───────────────────────────── */}
        <section
          aria-labelledby="result-title"
          className="bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Was nach zwölf Wochen steht</Eyebrow>
              <h2
                id="result-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Kein Ordner voller Lektionen.{" "}
                <span className="serif-italic text-[color:var(--rose)]">
                  Ein Business-Fundament, das du einsetzen kannst.
                </span>
              </h2>
            </div>

            <ul className="rv d1 mt-16 grid gap-x-14 border-t border-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, i) => (
                <li
                  key={d}
                  className="flex items-baseline gap-4 border-b border-[color:var(--border)] py-5"
                >
                  <span className="font-mono text-xs text-[color:var(--rose)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg text-[color:var(--wine)] sm:text-xl">{d}</span>
                </li>
              ))}
            </ul>

            <p className="rv mt-14 max-w-2xl text-base leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
              Das Ziel ist nicht, dass du nach zwölf Wochen mehr weißt. Das Ziel ist, dass etwas
              Reales existiert, das du anbieten, testen und verkaufen kannst.
            </p>
          </div>
        </section>

        {/* ── 6. PROGRAMM & BETREUUNG ─────────────────────── */}
        <section
          id="program"
          aria-labelledby="program-title"
          className="scroll-mt-24 bg-[color:var(--cream)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Done with you</Eyebrow>
              <h2
                id="program-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Du bekommst keinen Kurs und wirst dann{" "}
                <span className="serif-italic text-[color:var(--rose)]">allein gelassen.</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-x-14 gap-y-0 border-t border-[color:var(--border)] md:grid-cols-2">
              {support.map((s) => (
                <div key={s.title} className="rv border-b border-[color:var(--border)] py-10">
                  <h3 className="font-serif text-2xl text-[color:var(--wine)]">{s.title}</h3>
                  {s.body && (
                    <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      {s.body}
                    </p>
                  )}
                  {s.lead && (
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
                      {s.lead}
                    </p>
                  )}
                  {s.items.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs text-[color:var(--muted-fg)]"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.result && (
                    <p className="mt-5 border-l-2 border-[color:var(--rose)] pl-4 text-sm text-[color:var(--wine)]">
                      {s.result}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rv mt-14">
              <CtaButton source="program" className="w-full sm:w-auto">
                Prüfen, ob Creating Society zu mir passt
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── 7. FÜR WEN ──────────────────────────────────── */}
        <section
          aria-labelledby="fit-title"
          className="bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <h2
              id="fit-title"
              className="rv max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Creating Society ist für dich, wenn du nicht länger{" "}
              <span className="serif-italic text-[color:var(--rose)]">
                nur darüber nachdenken willst.
              </span>
            </h2>

            <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
              <div className="rv">
                <p className="eyebrow text-[color:var(--rose)]">Das passt zu dir, wenn …</p>
                <ul className="mt-7 space-y-4 border-t border-[color:var(--cream)]/12 pt-7">
                  {forYou.map((f) => (
                    <li key={f} className="flex gap-4 text-base leading-relaxed">
                      <span className="mt-3 h-px w-5 shrink-0 bg-[color:var(--rose)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rv d1">
                <p className="eyebrow text-[color:var(--cream)]/45">Es passt nicht zu dir, wenn …</p>
                <ul className="mt-7 space-y-4 border-t border-[color:var(--cream)]/12 pt-7 text-[color:var(--cream)]/55">
                  {notForYou.map((f) => (
                    <li key={f} className="flex gap-4 text-base leading-relaxed">
                      <span className="mt-3 h-px w-5 shrink-0 bg-[color:var(--cream)]/25" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. FAHRPLAN ─────────────────────────────────── */}
        <section
          aria-labelledby="roadmap-title"
          className="bg-[color:var(--cream)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Der Fahrplan</Eyebrow>
              <h2
                id="roadmap-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Von der losen Idee zum{" "}
                <span className="serif-italic text-[color:var(--rose)]">getesteten Angebot.</span>
              </h2>
            </div>

            <ol className="mt-16 grid gap-0 border-t border-[color:var(--border)] md:grid-cols-3">
              {timeline.map((t) => (
                <li
                  key={t.weeks}
                  className="rv border-b border-[color:var(--border)] py-8 md:border-r md:pr-8 md:last:border-r-0"
                >
                  <p className="eyebrow text-[color:var(--rose)]">{t.weeks}</p>
                  <p className="mt-3 font-serif text-xl leading-snug text-[color:var(--wine)] sm:text-2xl">
                    {t.title}
                  </p>
                </li>
              ))}
            </ol>

            <p className="rv mt-12 max-w-2xl text-sm leading-relaxed text-[color:var(--muted-fg)] sm:text-base">
              Der genaue Ablauf wird an deine Ausgangssituation angepasst. Das Programm gibt die
              Struktur vor, aber dein Angebot wird nicht nach einer starren Vorlage gebaut.
            </p>
          </div>
        </section>

        {/* ── 9. LAURA ────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="scroll-mt-24 bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="rv">
              <div className="aspect-[4/5] overflow-hidden rounded-[2px]">
                <img
                  src={mentorImg}
                  alt="Laura, Gründerin von Creating Society"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="rv d1">
              <Eyebrow>Warum Creating Society existiert</Eyebrow>
              <h2
                id="about-title"
                className="mt-6 font-serif text-3xl leading-[1.12] tracking-tight text-[color:var(--wine)] sm:text-4xl lg:text-5xl"
              >
                Ich habe gelernt, dass Aufmerksamkeit allein{" "}
                <span className="serif-italic text-[color:var(--rose)]">kein Business ist.</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-[color:var(--muted-fg)]">
                <p>Ich bin Laura.</p>
                <p>
                  Ich habe selbst erlebt, wie leicht es ist, Reichweite aufzubauen und trotzdem kein
                  stabiles Geschäftsmodell dahinter zu besitzen.
                </p>
                <p>
                  Views fühlen sich wie Fortschritt an. Follower fühlen sich wie Fortschritt an.
                  Kooperationen fühlen sich wie Fortschritt an.
                </p>
                <p className="font-serif text-xl leading-snug text-[color:var(--wine)] sm:text-2xl">
                  Aber solange du kein eigenes Angebot besitzt, entscheidet immer jemand anderes über
                  dein Einkommen. Eine Plattform. Eine Marke. Ein Algorithmus.
                </p>
                <p>
                  Creating Society ist entstanden, weil ich Frauen zeigen möchte, wie sie aus dem, was
                  sie bereits wissen oder erlebt haben, etwas Eigenes aufbauen können.
                </p>
                <p>
                  Nicht einfach einen weiteren Onlinekurs. Sondern ein klares Angebot, echte Kunden und
                  ein Business, das ihnen gehört.
                </p>
              </div>
              <CtaButton source="about" className="mt-10 w-full sm:w-auto">
                Mit uns über deine Idee sprechen
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── 10. DER CALL ────────────────────────────────── */}
        <section
          aria-labelledby="agenda-title"
          className="bg-[color:var(--cream)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-3xl">
              <Eyebrow>Das kostenlose Strategiegespräch</Eyebrow>
              <h2
                id="agenda-title"
                className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl lg:text-6xl"
              >
                Finde heraus, was aus deiner Idee{" "}
                <span className="serif-italic text-[color:var(--rose)]">werden könnte.</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-10 border-t border-[color:var(--border)] pt-10 md:grid-cols-3 md:gap-14">
              {callAgenda.map((c) => (
                <div key={c.index} className="rv">
                  <p className="font-serif text-5xl leading-none text-[color:var(--rose)]/35">
                    {c.index}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-[color:var(--wine)]">{c.title}</h3>
                  {c.lead && (
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
                      {c.lead}
                    </p>
                  )}
                  {c.items.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {c.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-3 text-sm leading-relaxed text-[color:var(--muted-fg)]"
                        >
                          <span className="mt-2 h-px w-4 shrink-0 bg-[color:var(--rose)]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {c.body && (
                    <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      {c.body}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="rv mt-14 max-w-2xl font-serif text-xl leading-snug text-[color:var(--wine)] sm:text-2xl">
              Du gehst mit mehr Klarheit über dein Potenzial, deinen Engpass und den sinnvollsten
              nächsten Schritt aus dem Gespräch.
            </p>
          </div>
        </section>

        {/* ── 11. FAQ ─────────────────────────────────────── */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="scroll-mt-24 bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <h2
              id="faq-title"
              className="rv font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--wine)] sm:text-5xl"
            >
              Bevor du dich <span className="serif-italic text-[color:var(--rose)]">bewirbst.</span>
            </h2>
            <div className="rv d1">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`} className="border-[color:var(--border)]">
                    <AccordionTrigger className="text-left font-serif text-lg text-[color:var(--wine)] sm:text-xl">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-[color:var(--muted-fg)] sm:text-base">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── 12. CALENDLY ────────────────────────────────── */}
        <section
          id="call"
          aria-labelledby="call-title"
          className="scroll-mt-20 bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Eyebrow>Dein nächster Schritt</Eyebrow>
            <h2
              id="call-title"
              className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Lass uns herausfinden, was du{" "}
              <span className="serif-italic text-[color:var(--rose)]">aufbauen könntest.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[color:var(--cream)]/70 sm:text-lg">
              Buche ein kostenloses Strategiegespräch und sprich mit uns über deine Erfahrungen,
              deine Idee und den sinnvollsten Weg zu einem eigenen digitalen Angebot.
            </p>

            <ul className="mx-auto mt-9 flex max-w-2xl flex-wrap justify-center gap-x-3 gap-y-2 text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--cream)]/60">
              {[
                "kostenlos",
                "30 Minuten",
                "per Zoom",
                "persönliche Potenzialanalyse",
                "kein künstlicher Verkaufsdruck",
              ].map((t) => (
                <li key={t} className="rounded-full border border-[color:var(--cream)]/20 px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-4xl px-6">
            <CalendlyEmbed />
            <p className="mt-6 text-center text-sm text-[color:var(--cream)]/60">
              Lieber schriftlich starten?{" "}
              <Link to="/apply" className="underline underline-offset-4 hover:opacity-80">
                Bewerbung ausfüllen
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-[color:var(--border)] bg-[color:var(--cream)] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg text-[color:var(--wine)]">
            Creating <span className="serif-italic">Society</span>
          </p>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
            <a href="/datenschutz" className="hover:text-[color:var(--wine)]">
              Datenschutz
            </a>
            <a href="/impressum" className="hover:text-[color:var(--wine)]">
              Impressum
            </a>
            <a href="mailto:hello@creatingsociety.com" className="hover:text-[color:var(--wine)]">
              Kontakt
            </a>
            <button
              type="button"
              onClick={() => scrollToCall("footer")}
              className="uppercase tracking-[0.16em] text-[color:var(--wine)] hover:opacity-70"
            >
              Strategiegespräch buchen
            </button>
          </nav>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ──────────────────────────────── */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[color:var(--cream)]/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden " +
          (bookingVisible ? "translate-y-full" : "translate-y-0")
        }
      >
        <button
          type="button"
          onClick={() => scrollToCall("mobile_bar")}
          className="w-full rounded-full bg-[color:var(--wine)] px-6 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)]"
        >
          Kostenloses Strategiegespräch
        </button>
      </div>
    </>
  );
}
