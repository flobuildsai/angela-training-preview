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
      { title: "Creating Society — Aus deinem Wissen ein Angebot machen" },
      {
        name: "description",
        content:
          "Für Frauen, die aus Wissen, Erfahrung oder einer Idee ein digitales Angebot entwickeln, testen und verkaufen wollen. Kostenloses Strategiegespräch, 30 Minuten.",
      },
      {
        property: "og:title",
        content: "Creating Society — Aus deinem Wissen ein Angebot machen",
      },
      {
        property: "og:description",
        content:
          "Du brauchst keine perfekte Idee. Du brauchst ein Angebot, das jemand wirklich kaufen will. Kostenloses Strategiegespräch buchen.",
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

const problemStatements = [
  "Du weißt, dass du mehr kannst – aber nicht, welches Angebot daraus werden soll.",
  "Du konsumierst Business-Content – aber triffst keine klare Entscheidung.",
  "Du willst unabhängig werden – aber dein Plan bleibt in Notizen, Tabs und offenen Gedanken.",
];

const beliefs = [
  "Du brauchst zuerst ein Problem, das wichtig genug ist.",
  "Du brauchst ein Angebot, das klar genug ist.",
  "Du brauchst einen Weg, Menschen darauf aufmerksam zu machen.",
  "Und du brauchst den Mut, es zu verkaufen, bevor es perfekt ist.",
];

const phases = [
  {
    index: "01",
    name: "Position",
    body: "Wir finden heraus, wem du helfen kannst, welches Problem relevant ist und warum Menschen dir zuhören sollten.",
    result: "Eine klare Positionierung, die nicht austauschbar ist.",
  },
  {
    index: "02",
    name: "Package",
    body: "Wir verwandeln dein Wissen in ein Angebot, das verständlich, relevant und kaufbar ist.",
    result: "Ein Angebot, das du erklären und verkaufen kannst.",
  },
  {
    index: "03",
    name: "Attract",
    body: "Wir entwickeln einen realistischen Weg, die richtigen Menschen zu erreichen – auch ohne große Community.",
    result: "Ein klares System für Sichtbarkeit und Nachfrage.",
  },
  {
    index: "04",
    name: "Convert",
    body: "Wir bauen deinen Weg vom Interesse zum Gespräch und vom Gespräch zur Kundin.",
    result: "Ein einfacher Verkaufsprozess ohne komplizierten Funnel.",
  },
];

const program = [
  {
    index: "01",
    title: "Persönliche Strategie",
    body: "Wir starten bei deiner Situation: Erfahrung, Fähigkeiten, Zeit. Daraus entsteht ein Plan, der zu dir passt.",
  },
  {
    index: "02",
    title: "Wöchentliche Umsetzung",
    body: "Jede Woche eine Entscheidung, ein Schritt, ein sichtbares Ergebnis. Kein Aufschieben in „irgendwann“.",
  },
  {
    index: "03",
    title: "Direktes Feedback",
    body: "Auf dein Angebot, deine Worte, deine Verkaufsgespräche. Ehrlich statt nett.",
  },
  {
    index: "04",
    title: "Klare Vorlagen und Systeme",
    body: "Struktur für Positionierung, Angebot, Content und Verkauf – damit du nicht bei null anfängst.",
  },
];

const forYou = [
  "du Wissen, Erfahrung oder Fähigkeiten mitbringst",
  "du ein eigenes digitales Business aufbauen willst",
  "du noch keine fertige Geschäftsidee hast",
  "du fünf bis zehn fokussierte Stunden pro Woche investieren kannst",
  "du Feedback annimmst und wirklich umsetzt",
];

const notForYou = [
  "du schnelles Geld ohne Arbeit suchst",
  "du ein fertiges Done-for-you-Business erwartest",
  "du keine Gespräche mit potenziellen Kundinnen führen willst",
  "du nur Follower statt Kunden willst",
  "du garantierte Umsätze erwartest",
];

const timeline = [
  { weeks: "Woche 1–2", title: "Positionierung und Zielgruppe" },
  { weeks: "Woche 3–4", title: "Angebot und eigene Methode" },
  { weeks: "Woche 5–6", title: "Preis, Messaging und Struktur" },
  { weeks: "Woche 7–8", title: "Salespage und Verkaufsprozess" },
  { weeks: "Woche 9–10", title: "Content, Outreach, erste Gespräche" },
  { weeks: "Woche 11–12", title: "Markttest, Feedback, Optimierung" },
];

const callAgenda = [
  {
    index: "01",
    title: "Ausgangssituation",
    body: "Erfahrung, Fähigkeiten, bestehende Ideen, verfügbare Zeit – und woran es aktuell hakt.",
  },
  {
    index: "02",
    title: "Potenzial",
    body: "Mögliche Zielgruppen, relevante Probleme und Angebotsmodelle, die zu dir passen könnten.",
  },
  {
    index: "03",
    title: "Entscheidung",
    body: "Wenn Creating Society passt, erklären wir dir, wie eine Zusammenarbeit aussieht. Wenn nicht, sagen wir das offen.",
  },
];

const faqs = [
  {
    q: "Brauche ich bereits eine Geschäftsidee?",
    a: "Nein. Im Strategiegespräch prüfen wir, welche deiner Erfahrungen oder Fähigkeiten sich für ein konkretes Angebot eignen könnten.",
  },
  {
    q: "Brauche ich eine große Reichweite?",
    a: "Nein. Reichweite verstärkt ein gutes Angebot, sie ersetzt es nicht. Am Anfang sind Kontakte, Gespräche und fokussierter Content oft wirksamer als große Zahlen.",
  },
  {
    q: "Muss ich bereits selbstständig sein?",
    a: "Nein. Viele starten angestellt und bauen ihr Business strukturiert nebenberuflich auf.",
  },
  {
    q: "Wie viel Zeit sollte ich einplanen?",
    a: "Fünf bis zehn fokussierte Stunden pro Woche. Mit weniger ist Fortschritt möglich, aber langsamer.",
  },
  {
    q: "Ist das ein Selbstlernkurs?",
    a: "Nein. Wir arbeiten mit dir: Calls, Feedback und gemeinsame Entscheidungen. Die Inhalte geben nur die Struktur.",
  },
  {
    q: "Garantiert ihr bestimmte Umsätze?",
    a: "Nein. Umsatz hängt von Angebot, Markt und Umsetzung ab. Wir versprechen keine Zahlen, sondern eine belastbare Grundlage.",
  },
  {
    q: "Was passiert nach dem Strategiegespräch?",
    a: "Wenn es passt, erklären wir dir die nächsten Schritte. Es gibt keinen Checkout auf dieser Seite und keinen künstlichen Entscheidungsdruck.",
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

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
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
    wine: "bg-[color:var(--wine)] text-[color:var(--cream)] hover:opacity-90",
    cream: "bg-[color:var(--cream)] text-[color:var(--wine)] hover:opacity-90",
    outline:
      "border border-current text-current hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] hover:border-transparent",
  } as const;

  return (
    <button
      type="button"
      onClick={() => scrollToCall(source)}
      className={
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition " +
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
    <p className={"eyebrow " + (muted ? "text-[color:var(--cream)]/55" : "text-[color:var(--rose)]")}>
      {children}
    </p>
  );
}

// ── Seite ─────────────────────────────────────────────────────
function HomePage() {
  useReveal();
  const past = useScrolled();
  const progress = useScrollProgress();
  const bookingVisible = useBookingVisible();

  return (
    <>
      {/* Sticky Header */}
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 " +
          (past
            ? "border-b border-[color:var(--border)] bg-[color:var(--cream)]/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent")
        }
      >
        <div
          className={
            "mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-6 " +
            (past ? "py-3.5" : "py-5 sm:py-7")
          }
        >
          <Link
            to="/"
            className="min-w-0 truncate font-serif text-xl tracking-tight text-[color:var(--ink)] sm:text-2xl"
          >
            Creating <span className="serif-italic">Society</span>
          </Link>
          <nav className="flex shrink-0 items-center gap-7">
            {[
              { href: "#method", label: "Die Methode" },
              { href: "#program", label: "Das Programm" },
              { href: "#about", label: "Über Laura" },
              { href: "#faq", label: "FAQ" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hidden text-[0.82rem] font-medium text-[color:var(--ink)]/70 transition hover:text-[color:var(--ink)] lg:inline"
              >
                {l.label}
              </a>
            ))}
            <CtaButton source="header" className="px-6 py-3 text-[0.62rem]">
              Strategiegespräch
            </CtaButton>
          </nav>
        </div>
        <div
          className="h-[2px] origin-left bg-[color:var(--rose)] transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      <main className="overflow-x-hidden bg-[color:var(--cream)] text-[color:var(--ink)]">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 sm:pt-40 md:pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(70%_60%_at_20%_10%,color-mix(in_oklab,var(--rose)_16%,transparent),transparent_70%)]"
          />
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv">
              <Eyebrow>Für Frauen, die aus ihrem Wissen ein eigenes Business machen wollen</Eyebrow>
            </div>

            <h1 className="rv d1 mt-7 max-w-[16ch] font-serif text-[2.6rem] leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
              Du brauchst keine perfekte Idee.
            </h1>

            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-start md:gap-10">
              <div className="md:col-span-7 lg:col-span-6">
                <p className="rv d1 font-serif text-[2rem] leading-[1.06] tracking-[-0.02em] text-[color:var(--wine)] sm:text-5xl md:text-[3.4rem]">
                  Du brauchst{" "}
                  <span className="serif-italic text-[color:var(--rose)]">
                    ein Angebot, das jemand wirklich kaufen will.
                  </span>
                </p>

                <p className="rv d2 mt-8 max-w-xl text-[0.98rem] leading-[1.75] text-[color:var(--muted-fg)] sm:text-base">
                  Creating Society hilft dir, aus deinen Fähigkeiten, Erfahrungen oder Interessen
                  ein digitales Angebot zu entwickeln, es am Markt zu testen und daraus ein echtes
                  Business aufzubauen – auch ohne große Reichweite oder fertigen Plan.
                </p>

                <div className="rv d3 mt-10 flex flex-col items-start gap-4">
                  <CtaButton source="hero" className="w-full sm:w-auto">
                    Meine Business-Idee prüfen lassen
                  </CtaButton>
                  <p className="text-[0.72rem] tracking-[0.08em] text-[color:var(--muted-fg)]">
                    Kostenloses Strategiegespräch · 30 Minuten · Persönliche Potenzialanalyse
                  </p>
                </div>

                <p className="rv d4 mt-10 max-w-md border-l border-[color:var(--rose)]/50 pl-5 font-serif text-lg italic leading-snug text-[color:var(--ink)]/80 sm:text-xl">
                  Für Frauen mit Wissen, Erfahrung oder einer Idee, die endlich konkret werden soll.
                </p>
              </div>

              <div className="relative md:col-span-5 md:-mb-16 lg:col-span-6 lg:-mr-10">
                <div className="grain relative overflow-hidden rounded-[2px] soft-shadow">
                  <img
                    src={portraitImg}
                    alt="Laura, Gründerin von Creating Society"
                    className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
                    loading="eager"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--wine)_45%,transparent),transparent_55%)]"
                  />
                  <p className="absolute bottom-6 left-6 right-6 font-serif text-xl leading-tight text-[color:var(--cream)] sm:text-2xl">
                    Laura — <span className="serif-italic">Gründerin</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ────────────────────────────────────────── */}
        <section
          aria-labelledby="problem-title"
          className="border-t border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="max-w-3xl">
              <h2
                id="problem-title"
                className="rv font-serif text-[2.2rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              >
                Du hast wahrscheinlich schon mehr als genug Ideen.
              </h2>
              <p className="rv d1 mt-6 text-base leading-[1.75] text-[color:var(--muted-fg)]">
                Was dir fehlt, ist nicht Motivation. Es ist Klarheit darüber, welches Problem du
                lösen, was du verkaufen und wie du damit starten sollst.
              </p>
            </div>

            <div className="mt-16 md:mt-24">
              {problemStatements.map((s, i) => (
                <div
                  key={s}
                  className={
                    "rv d" +
                    (i + 1) +
                    " border-t border-[color:var(--border)] py-9 md:grid md:grid-cols-12 md:gap-8 md:py-12"
                  }
                >
                  <span className="font-serif text-2xl text-[color:var(--rose)] md:col-span-2 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-serif text-[1.55rem] leading-[1.2] tracking-[-0.01em] md:col-span-10 md:mt-0 md:text-[2.3rem]">
                    {s}
                  </p>
                </div>
              ))}
              <div className="border-t border-[color:var(--border)]" />
            </div>

            <p className="rv mt-14 max-w-2xl font-serif text-2xl italic leading-snug text-[color:var(--wine)] md:text-3xl">
              Creating Society bringt deine Idee aus dem Kopf in den Markt.
            </p>
          </div>
        </section>

        {/* ── BELIEF SHIFT (dunkel) ──────────────────────────── */}
        <section
          aria-labelledby="belief-title"
          className="grain relative bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv">
              <Eyebrow muted>Perspektivwechsel</Eyebrow>
            </div>
            <h2
              id="belief-title"
              className="rv d1 mt-6 max-w-[18ch] font-serif text-[2.4rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-7xl"
            >
              Du brauchst nicht zuerst Reichweite.
            </h2>

            <div className="mt-14 grid gap-px border-t border-[color:var(--cream)]/15 sm:grid-cols-2 md:mt-20">
              {beliefs.map((b, i) => (
                <p
                  key={b}
                  className={
                    "rv d" +
                    (i + 1) +
                    " border-b border-[color:var(--cream)]/15 py-8 pr-6 font-serif text-[1.4rem] leading-[1.25] sm:text-[1.7rem] md:py-12 md:text-[2rem]"
                  }
                >
                  <span className="mr-4 align-super text-xs tracking-widest text-[color:var(--rose)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {b}
                </p>
              ))}
            </div>

            <p className="rv mt-16 max-w-3xl font-serif text-[1.8rem] italic leading-[1.15] text-[color:var(--cream)] sm:text-4xl md:mt-24 md:text-5xl">
              Ein Business entsteht nicht durch Nachdenken. Es entsteht durch Entscheidungen.
            </p>
          </div>
        </section>

        {/* ── METHODE ────────────────────────────────────────── */}
        <section
          id="method"
          aria-labelledby="method-title"
          className="scroll-mt-24 py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv max-w-2xl">
              <Eyebrow>Die Society Method</Eyebrow>
              <h2
                id="method-title"
                className="mt-6 font-serif text-[2.2rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              >
                Vier Phasen. Ein Angebot, das trägt.
              </h2>
            </div>

            <div className="mt-16 md:mt-24">
              {phases.map((p, i) => (
                <article
                  key={p.index}
                  className={
                    "rv d" +
                    ((i % 4) + 1) +
                    " grid gap-6 border-t border-[color:var(--border)] py-10 md:grid-cols-12 md:gap-10 md:py-14"
                  }
                >
                  <div className="md:col-span-4">
                    <span className="eyebrow text-[color:var(--rose)]">{p.index}</span>
                    <h3 className="mt-3 font-serif text-3xl tracking-[-0.02em] md:text-[2.6rem]">
                      {p.name}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="max-w-2xl text-[1.05rem] leading-[1.7] text-[color:var(--ink)]/85 md:text-xl">
                      {p.body}
                    </p>
                    <p className="mt-6 border-l border-[color:var(--rose)] pl-5 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      <span className="eyebrow mr-2 text-[color:var(--rose)]">Ergebnis</span>
                      <span className="font-serif text-lg italic text-[color:var(--ink)]">
                        {p.result}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
              <div className="border-t border-[color:var(--border)]" />
            </div>

            <div className="rv mt-14">
              <CtaButton source="method" tone="outline">
                Herausfinden, was ich verkaufen könnte
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── PROGRAMM ───────────────────────────────────────── */}
        <section
          id="program"
          aria-labelledby="program-title"
          className="scroll-mt-24 border-y border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv max-w-3xl">
              <h2
                id="program-title"
                className="font-serif text-[2.2rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              >
                Kein Kurs, den du irgendwann fertig ansehen sollst.
              </h2>
              <p className="mt-6 text-base leading-[1.75] text-[color:var(--muted-fg)]">
                Wir arbeiten mit dir an deinem echten Angebot, deiner Positionierung und deinem
                Verkaufsprozess.
              </p>
            </div>

            <div className="mt-16 grid gap-px sm:grid-cols-2 md:mt-24">
              {program.map((b, i) => (
                <div
                  key={b.index}
                  className={
                    "rv d" +
                    (i + 1) +
                    " border-t border-[color:var(--border)] py-9 pr-0 sm:pr-10 md:py-12"
                  }
                >
                  <span className="eyebrow text-[color:var(--rose)]">{b.index}</span>
                  <h3 className="mt-3 font-serif text-[1.7rem] leading-tight tracking-[-0.01em] md:text-[2.1rem]">
                    {b.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-[1.7] text-[color:var(--muted-fg)]">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="rv mt-16 max-w-3xl border-t border-[color:var(--border)] pt-10 font-serif text-2xl italic leading-snug text-[color:var(--wine)] md:text-[2.2rem]">
              Du sollst nach zwölf Wochen nicht nur mehr wissen. Du sollst etwas besitzen, das du
              tatsächlich anbieten kannst.
            </p>
          </div>
        </section>

        {/* ── ABLAUF ─────────────────────────────────────────── */}
        <section aria-labelledby="timeline-title" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv max-w-xl">
              <Eyebrow>Der Ablauf</Eyebrow>
              <h2
                id="timeline-title"
                className="mt-6 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
              >
                Zwölf Wochen, klar getaktet.
              </h2>
            </div>
            <ol className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {timeline.map((t) => (
                <li
                  key={t.weeks}
                  className="rv border-t border-[color:var(--border)] py-7 pr-6"
                >
                  <span className="eyebrow text-[color:var(--rose)]">{t.weeks}</span>
                  <p className="mt-3 font-serif text-xl leading-snug md:text-2xl">{t.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FÜR WEN ────────────────────────────────────────── */}
        <section
          aria-labelledby="fit-title"
          className="grain bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-32"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <h2
              id="fit-title"
              className="rv max-w-[20ch] font-serif text-[2.2rem] leading-[1.03] tracking-[-0.02em] sm:text-5xl md:text-6xl"
            >
              Passt das zu dir?
            </h2>
            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
              <div className="rv d1">
                <p className="eyebrow text-[color:var(--rose)]">Richtig für dich, wenn</p>
                <ul className="mt-7 space-y-5">
                  {forYou.map((f) => (
                    <li
                      key={f}
                      className="border-b border-[color:var(--cream)]/12 pb-5 font-serif text-xl leading-snug md:text-2xl"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rv d2">
                <p className="eyebrow text-[color:var(--cream)]/45">Nicht richtig, wenn</p>
                <ul className="mt-7 space-y-5">
                  {notForYou.map((f) => (
                    <li
                      key={f}
                      className="border-b border-[color:var(--cream)]/12 pb-5 text-[0.98rem] leading-relaxed text-[color:var(--cream)]/55"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rv mt-14">
              <CtaButton source="fit" tone="cream">
                Prüfen, ob Creating Society zu mir passt
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── LAURA ──────────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="scroll-mt-24 py-24 md:py-36"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-12 md:items-center md:gap-16">
            <div className="rv relative md:col-span-5">
              <div className="grain overflow-hidden rounded-[2px] soft-shadow">
                <img
                  src={mentorImg}
                  alt="Laura im Gespräch"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="rv d1 md:col-span-7">
              <Eyebrow>Über Laura</Eyebrow>
              <h2
                id="about-title"
                className="mt-6 font-serif text-[2.3rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-[4rem]"
              >
                Ich wollte nie nur <span className="serif-italic">Reichweite</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-[color:var(--ink)]/85">
                <p>Ich wollte etwas Eigenes.</p>
                <p>
                  Etwas, das nicht davon abhängt, ob eine Marke zusagt, ein Algorithmus mich
                  ausspielt oder eine Plattform ihre Regeln ändert.
                </p>
                <p className="font-serif text-2xl italic leading-snug text-[color:var(--wine)]">
                  Genau deshalb gibt es Creating Society.
                </p>
                <p>
                  Ich helfe Frauen dabei, aus dem, was sie bereits wissen, können oder erlebt haben,
                  ein klares Angebot und ein echtes Business zu entwickeln.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── GESPRÄCH ───────────────────────────────────────── */}
        <section
          aria-labelledby="agenda-title"
          className="border-y border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="rv max-w-2xl">
              <Eyebrow>Das Strategiegespräch</Eyebrow>
              <h2
                id="agenda-title"
                className="mt-6 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
              >
                Dreißig Minuten, in denen es konkret wird.
              </h2>
            </div>
            <div className="mt-14 grid gap-px md:grid-cols-3">
              {callAgenda.map((c, i) => (
                <div
                  key={c.index}
                  className={
                    "rv d" + (i + 1) + " border-t border-[color:var(--border)] py-8 pr-8"
                  }
                >
                  <span className="eyebrow text-[color:var(--rose)]">{c.index}</span>
                  <h3 className="mt-3 font-serif text-2xl md:text-[1.8rem]">{c.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.7] text-[color:var(--muted-fg)]">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2
                id="faq-title"
                className="rv font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
              >
                Häufige <span className="serif-italic">Fragen</span>
              </h2>
            </div>
            <div className="rv d1 md:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={"faq-" + i}>
                    <AccordionTrigger className="text-left font-serif text-xl leading-snug hover:no-underline md:text-2xl">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl text-[0.95rem] leading-[1.75] text-[color:var(--muted-fg)]">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── CALENDLY ───────────────────────────────────────── */}
        <section
          id="call"
          aria-labelledby="call-title"
          className="grain scroll-mt-20 bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-32"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="rv max-w-3xl">
              <Eyebrow muted>Kostenloses Strategiegespräch</Eyebrow>
              <h2
                id="call-title"
                className="mt-6 font-serif text-[2.2rem] leading-[1.03] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              >
                Vielleicht fehlt dir nicht die Idee.{" "}
                <span className="serif-italic text-[color:var(--rose)]">
                  Vielleicht fehlt dir nur die richtige Struktur.
                </span>
              </h2>
              <p className="mt-7 text-base leading-[1.75] text-[color:var(--cream)]/70">
                Im kostenlosen Strategiegespräch schauen wir uns an, welche Fähigkeiten, Erfahrungen
                oder Themen sich bei dir in ein klares Angebot übersetzen lassen könnten.
              </p>
              <p className="mt-8 font-serif text-xl italic md:text-2xl">
                Wähle einen Termin und lass uns deine Idee konkret machen.
              </p>
            </div>

            <div className="rv d1 mt-12">
              <CalendlyEmbed />
            </div>

            <p className="rv mt-8 text-[0.72rem] tracking-[0.08em] text-[color:var(--cream)]/55">
              Kostenlos · 30 Minuten · Persönlich · Kein künstlicher Verkaufsdruck
            </p>
            <p className="rv mt-4 text-sm text-[color:var(--cream)]/50">
              Lieber schriftlich?{" "}
              <Link to="/apply" className="underline underline-offset-4 hover:opacity-80">
                Bewerbung ausfüllen
              </Link>
            </p>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer className="border-t border-[color:var(--border)] py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="font-serif text-lg">
              Creating <span className="serif-italic">Society</span>
            </p>
            <p className="text-xs text-[color:var(--muted-fg)]">
              © {new Date().getFullYear()} Creating Society
            </p>
          </div>
        </footer>
      </main>

      {/* Mobile Sticky CTA */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-[color:var(--cream)]/95 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden " +
          (bookingVisible ? "translate-y-full" : "translate-y-0")
        }
      >
        <CtaButton source="sticky_mobile" className="w-full">
          Strategiegespräch sichern
        </CtaButton>
      </div>
    </>
  );
}
