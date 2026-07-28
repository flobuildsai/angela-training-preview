import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/laura-call.jpg";
import lauraImg from "@/assets/mentor.jpg";
import proofA from "@/assets/opportunity.jpg";
import proofB from "@/assets/hero.jpg";
import proofC from "@/assets/avatar.jpg";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creating Society — Aus Content wird ein Unternehmen" },
      {
        name: "description",
        content:
          "Creating Society hilft Frauen dabei, mit Content Aufmerksamkeit aufzubauen – und daraus eine eigene Marke, ein starkes Angebot und ein profitables Business zu entwickeln.",
      },
      {
        property: "og:title",
        content: "Creating Society — Aus Content wird ein Unternehmen",
      },
      {
        property: "og:description",
        content:
          "Für Frauen, die nicht nur posten, sondern etwas Eigenes aufbauen wollen. Kostenloses Strategiegespräch buchen.",
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

const ownership = [
  "Deine Positionierung.",
  "Deine Community.",
  "Dein Angebot.",
  "Deine Kunden.",
  "Dein Unternehmen.",
];

// Austauschbare Proof-Slots — echte Assets später hier ersetzen.
const proofSlots = [
  { label: "Property Circle — Landingpage", img: proofA, span: "sm:col-span-7", ratio: "4 / 3" },
  { label: "Organischer Content", img: proofB, span: "sm:col-span-5", ratio: "3 / 4" },
  { label: "Kampagne / Paid Marketing", img: proofC, span: "sm:col-span-5", ratio: "1 / 1" },
  { label: "Anfragen & Leads", img: null, span: "sm:col-span-7", ratio: "16 / 10" },
];

const build = [
  {
    index: "01",
    title: "Wofür du stehen willst.",
    body: "Wir entwickeln eine klare Positionierung, die zu dir passt und die andere Menschen sofort verstehen.",
  },
  {
    index: "02",
    title: "Content, der etwas für dich aufbaut.",
    body: "Du entwickelst Formate und Botschaften, die Aufmerksamkeit erzeugen, Vertrauen schaffen und Nachfrage aufbauen.",
  },
  {
    index: "03",
    title: "Ein Angebot, das Menschen wirklich kaufen wollen.",
    body: "Wir finden heraus, was du sinnvoll verkaufen kannst – basierend auf deinen Fähigkeiten, deiner Erfahrung und dem Bedarf deiner Zielgruppe.",
  },
  {
    index: "04",
    title: "Einen Weg vom Zuschauer zum Kunden.",
    body: "Du lernst, wie Content, Angebot und Vertrieb zusammenspielen – organisch und, wenn es für dein Geschäftsmodell sinnvoll ist, zusätzlich über Paid Marketing.",
  },
];

const future = [
  "… wofür du bekannt werden willst.",
  "… welchen Content du produzieren musst.",
  "… welche Menschen du erreichen möchtest.",
  "… was du ihnen anbieten kannst.",
  "… wie aus Zuschauern Interessenten werden.",
  "… und wie daraus ein Unternehmen entsteht, das wirklich dir gehört.",
];

const qualify = [
  "du bereits Content machst, aber daraus kaum oder unregelmäßig Geld entsteht.",
  "du starten möchtest, aber noch nicht weißt, wofür du stehen oder was du anbieten kannst.",
  "du nicht dauerhaft von Kooperationen und Marken abhängig sein willst.",
  "du bereit bist, sichtbar zu werden und konsequent umzusetzen.",
  "du nicht nur einen Account, sondern ein echtes Business aufbauen möchtest.",
];

const callAgenda = [
  "wo du aktuell stehst",
  "welche Positionierung zu dir passen könnte",
  "welches Angebot du entwickeln kannst",
  "wie Content für dich Aufmerksamkeit und Kunden gewinnen kann",
  "ob Creating Society der richtige nächste Schritt für dich ist",
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
  tone?: "wine" | "cream";
  className?: string;
}) {
  const tones = {
    wine: "bg-[color:var(--wine)] text-[color:var(--cream)] hover:opacity-90",
    cream: "bg-[color:var(--cream)] text-[color:var(--wine)] hover:opacity-90",
  } as const;

  return (
    <button
      type="button"
      onClick={() => scrollToCall(source)}
      className={
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition sm:px-9 sm:py-4 " +
        tones[tone] +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

// ── Seite ─────────────────────────────────────────────────────
function HomePage() {
  useReveal();
  const past = useScrolled();
  const bookingVisible = useBookingVisible();

  return (
    <>
      {/* Header */}
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
            "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 " +
            (past ? "py-3.5" : "py-5 sm:py-7")
          }
        >
          <a href="#top" className="font-serif text-xl tracking-tight text-[color:var(--ink)] sm:text-2xl">
            Creating <span className="serif-italic">Society</span>
          </a>
          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 md:flex">
              {[
                { href: "#society", label: "Creating Society" },
                { href: "#laura", label: "Laura" },
                { href: "#call", label: "Gespräch" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[0.78rem] tracking-wide text-[color:var(--muted-fg)] transition hover:text-[color:var(--ink)]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => scrollToCall("header")}
              className="rounded-full border border-[color:var(--ink)]/20 px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)] transition hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] sm:px-6"
            >
              Strategiegespräch buchen
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="bg-[color:var(--background)]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 md:pt-48 md:pb-32">
          <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-10">
              <div className="rv md:col-span-7">
                <p className="eyebrow text-[color:var(--rose)]">Creating Society</p>
                <h1 className="mt-7 font-serif text-[3rem] leading-[0.94] tracking-tight text-[color:var(--ink)] sm:text-7xl lg:text-[5.75rem]">
                  Aus Content wird
                  <br />
                  <span className="serif-italic">ein Unternehmen.</span>
                </h1>
                <p className="mt-8 max-w-xl text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
                  Creating Society hilft Frauen dabei, mit Content Aufmerksamkeit aufzubauen – und
                  daraus eine eigene Marke, ein starkes Angebot und ein profitables Business zu
                  entwickeln.
                </p>
                <div className="mt-9">
                  <CtaButton source="hero">Strategiegespräch buchen</CtaButton>
                </div>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--muted-fg)]">
                  Wir schauen gemeinsam, wo du heute stehst, was du aufbauen kannst und ob Creating
                  Society der richtige Weg für dich ist.
                </p>
              </div>

              <div className="rv d2 md:col-span-5">
                <div className="grain relative overflow-hidden rounded-[2px]">
                  <img
                    src={heroImg}
                    alt="Laura, Gründerin von Creating Society"
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "4 / 5" }}
                  />
                </div>
                <p className="mt-5 max-w-xs text-[0.8rem] leading-relaxed text-[color:var(--muted-fg)]">
                  Für Frauen, die nicht nur posten, sondern etwas Eigenes aufbauen wollen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Identifikation ───────────────────────────────── */}
        <section className="border-t border-[color:var(--border)] py-24 md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="rv md:col-span-7 md:col-start-2">
                <p className="font-serif text-[2rem] leading-[1.12] text-[color:var(--ink)] sm:text-[2.75rem]">
                  Vielleicht weißt du längst,
                  <br />
                  wie Content funktioniert.
                </p>
                <div className="mt-10 space-y-5 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
                  <p>
                    Du kennst Reels. Du kennst Trends. Du weißt, wie man ein Video aufnimmt,
                    schneidet und veröffentlicht.
                  </p>
                  <p>Vielleicht hattest du sogar schon Reichweite.</p>
                  <p className="text-[color:var(--ink)]">
                    Aber du weißt nicht, wie daraus ein echtes Business entstehen soll.
                  </p>
                  <p>Oder du stehst noch ganz am Anfang.</p>
                  <p>
                    Du siehst jeden Tag Frauen, die mit Content Marken, Produkte und Unternehmen
                    aufbauen. Und du fragst dich:
                  </p>
                </div>
              </div>
            </div>
            <p className="rv d2 mt-16 font-serif text-[2.6rem] leading-[0.98] tracking-tight text-[color:var(--ink)] sm:text-7xl lg:text-[6rem]">
              „Warum eigentlich <span className="serif-italic">nicht ich?</span>“
            </p>
          </div>
        </section>

        {/* ── VSL ──────────────────────────────────────────── */}
        <section
          aria-labelledby="vsl-title"
          className="border-t border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-32"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="rv max-w-3xl">
              <h2
                id="vsl-title"
                className="font-serif text-[2.1rem] leading-[1.08] text-[color:var(--ink)] sm:text-[3.25rem]"
              >
                Was wäre möglich, wenn hinter deinem Content endlich ein Business stehen würde?
              </h2>
              <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
                Laura zeigt dir, warum Reichweite allein nicht reicht – und wie aus Content,
                Vertrauen und einem eigenen Angebot ein echtes Unternehmen entstehen kann.
              </p>
            </div>

            {/* TODO: Video hier ersetzen (Vimeo / YouTube / Wistia / eigenes <video>) */}
            <div
              className="rv d2 group relative mt-12 grid place-items-center overflow-hidden rounded-[2px] bg-[color:var(--wine)]"
              style={{ aspectRatio: "16 / 9" }}
            >
              <div className="grain absolute inset-0 opacity-90" aria-hidden="true" />
              <div className="relative flex flex-col items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-[color:var(--cream)]/40 transition group-hover:border-[color:var(--cream)] sm:h-20 sm:w-20">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[color:var(--cream)]" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="mt-5 eyebrow text-[color:var(--cream)]/70">Video ansehen</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Belief Shift ─────────────────────────────────── */}
        <section className="bg-[color:var(--wine)] py-28 text-[color:var(--cream)] md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rv max-w-4xl">
              <p className="font-serif text-[2.4rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Content ist nicht dein Business.
              </p>
              <div className="mt-14 space-y-6 font-serif text-[1.6rem] leading-snug text-[color:var(--cream)]/85 sm:text-4xl">
                <p>Content erzeugt Aufmerksamkeit.</p>
                <p>Deine Personal Brand schafft Vertrauen.</p>
                <p>Dein Angebot macht daraus Umsatz.</p>
                <p className="text-[color:var(--cream)]">
                  Creating Society <span className="serif-italic">verbindet alle drei.</span>
                </p>
              </div>
              <p className="mt-14 text-sm tracking-wide text-[color:var(--cream)]/55">
                Nicht mehr posten, ohne zu wissen, wofür.
              </p>
            </div>
          </div>
        </section>

        {/* ── Problemvertiefung ────────────────────────────── */}
        <section className="py-24 md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-14 md:grid-cols-12 md:gap-16">
              <div className="rv md:col-span-6">
                <p className="font-serif text-[2rem] leading-[1.1] text-[color:var(--ink)] sm:text-[2.9rem]">
                  Views bezahlen keine Rechnungen.
                  <br />
                  Follower sind noch keine Kunden.
                </p>
                <p className="mt-8 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
                  Und eine Kooperation bedeutet meistens, dass du deine Reichweite nutzt, um das
                  Unternehmen eines anderen aufzubauen.
                </p>
              </div>
              <div className="rv d2 space-y-5 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)] md:col-span-5 md:col-start-8">
                <p>Vielleicht bekommst du Produkte zugeschickt.</p>
                <p>Vielleicht wird ein Video gut ausgespielt.</p>
                <p>Vielleicht verdienst du sogar gelegentlich Geld mit einer Zusammenarbeit.</p>
                <p className="text-[color:var(--ink)]">
                  Aber sobald die Kampagne vorbei ist, beginnt alles wieder von vorne.
                </p>
                <p>
                  Neuer Content. Neue Reichweite. Neue Hoffnung auf die nächste Anfrage.
                </p>
              </div>
            </div>

            <p className="rv mt-20 max-w-3xl font-serif text-[1.7rem] leading-snug text-[color:var(--ink)] sm:text-[2.4rem]">
              Das Problem ist nicht, dass Content nicht funktioniert. Das Problem ist, dass hinter
              deinem Content noch nichts steht,{" "}
              <span className="serif-italic">das dir gehört.</span>
            </p>

            <ul className="rv d2 mt-16 border-t border-[color:var(--border)]">
              {ownership.map((item) => (
                <li
                  key={item}
                  className="border-b border-[color:var(--border)] py-5 font-serif text-2xl text-[color:var(--ink)] sm:py-6 sm:text-3xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Proof ────────────────────────────────────────── */}
        <section
          aria-labelledby="proof-title"
          className="border-t border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rv max-w-3xl">
              <h2
                id="proof-title"
                className="font-serif text-[2.1rem] leading-[1.08] text-[color:var(--ink)] sm:text-[3.25rem]"
              >
                Laura hat nicht nur Reichweite aufgebaut.
              </h2>
              <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
                <p>
                  Sie hat Content genutzt, um Nachfrage für ein eigenes Angebot und ein echtes
                  Geschäftsmodell zu erzeugen.
                </p>
                <p>
                  Mit Property Circle hat Laura Expertise, organischen Content, Paid Marketing und
                  ein klares Angebot miteinander verbunden.
                </p>
                <p className="text-[color:var(--ink)]">
                  Nicht posten, um einfach nur sichtbar zu sein. Posten, um etwas aufzubauen.
                </p>
              </div>
            </div>

            {/* Austauschbare Proof-Slots */}
            <div className="rv d2 mt-14 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
              {proofSlots.map((slot) => (
                <figure key={slot.label} className={"min-w-0 " + slot.span}>
                  <div
                    className="grain relative overflow-hidden rounded-[2px] bg-[color:var(--cream)] ring-1 ring-[color:var(--border)]"
                    style={{ aspectRatio: slot.ratio }}
                  >
                    {slot.img ? (
                      <img src={slot.img} alt={slot.label} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center px-6 text-center">
                        <span className="eyebrow text-[color:var(--muted-fg)]">Proof-Slot</span>
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
                    {slot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Was wir gemeinsam aufbauen ───────────────────── */}
        <section id="society" aria-labelledby="build-title" className="py-24 md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2
              id="build-title"
              className="rv max-w-2xl font-serif text-[2.4rem] leading-[1.04] tracking-tight text-[color:var(--ink)] sm:text-6xl"
            >
              Was wir gemeinsam <span className="serif-italic">aufbauen.</span>
            </h2>

            <div className="mt-16 border-t border-[color:var(--border)]">
              {build.map((b, i) => (
                <div
                  key={b.index}
                  className={
                    "rv grid gap-4 border-b border-[color:var(--border)] py-10 md:grid-cols-12 md:gap-10 md:py-14 " +
                    (i === 1 ? "d1" : i === 2 ? "d2" : i === 3 ? "d3" : "")
                  }
                >
                  <div className="md:col-span-2">
                    <span className="font-serif text-3xl text-[color:var(--rose)] sm:text-4xl">
                      {b.index}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-snug text-[color:var(--ink)] sm:text-[2rem] md:col-span-5">
                    {b.title}
                  </h3>
                  <p className="text-[0.98rem] leading-relaxed text-[color:var(--muted-fg)] md:col-span-5">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="rv mt-14 max-w-2xl font-serif text-[1.7rem] leading-snug text-[color:var(--ink)] sm:text-[2.2rem]">
              Kein Content um des Contents willen.
              <br />
              <span className="serif-italic">Ein Business hinter deiner Sichtbarkeit.</span>
            </p>
          </div>
        </section>

        {/* ── Zukunft ──────────────────────────────────────── */}
        <section className="bg-[color:var(--wine)] py-28 text-[color:var(--cream)] md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="rv font-serif text-[2.4rem] leading-[1.04] tracking-tight sm:text-6xl">
              Stell dir vor, du wüsstest <span className="serif-italic">genau …</span>
            </h2>
            <ul className="rv d2 mt-14 max-w-3xl space-y-5 font-serif text-[1.35rem] leading-snug text-[color:var(--cream)]/85 sm:text-[2rem]">
              {future.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="rv d3 mt-14 max-w-xl text-[color:var(--cream)]/60">
              Nicht irgendwann. Sondern mit einem klaren Plan, den du tatsächlich umsetzen kannst.
            </p>
          </div>
        </section>

        {/* ── Qualifizierung ───────────────────────────────── */}
        <section aria-labelledby="fit-title" className="py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <h2
                id="fit-title"
                className="rv font-serif text-[2.1rem] leading-[1.06] text-[color:var(--ink)] sm:text-[3rem] md:col-span-5"
              >
                Creating Society ist für dich, <span className="serif-italic">wenn …</span>
              </h2>
              <div className="rv d2 md:col-span-6 md:col-start-7">
                <ul className="border-t border-[color:var(--border)]">
                  {qualify.map((q) => (
                    <li
                      key={q}
                      className="border-b border-[color:var(--border)] py-5 text-[1.02rem] leading-relaxed text-[color:var(--ink)]"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <CtaButton source="qualify">Herausfinden, was ich aufbauen kann</CtaButton>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--muted-fg)]">
                    Im Gespräch schauen wir auf deine Ausgangslage und prüfen, ob Creating Society
                    zu deinem Ziel passt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Laura ────────────────────────────────────────── */}
        <section
          id="laura"
          aria-labelledby="laura-title"
          className="border-t border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 md:grid-cols-12 md:items-start md:gap-16">
              <div className="rv md:col-span-5">
                <div className="grain relative overflow-hidden rounded-[2px]">
                  <img
                    src={lauraImg}
                    alt="Laura, Gründerin von Creating Society, im Porträt"
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "4 / 5" }}
                  />
                </div>
              </div>
              <div className="rv d2 md:col-span-6 md:col-start-7">
                <h2
                  id="laura-title"
                  className="font-serif text-[2rem] leading-[1.08] text-[color:var(--ink)] sm:text-[2.9rem]"
                >
                  Ich glaube nicht, dass du einfach mehr posten musst.
                </h2>
                <blockquote className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
                  <p>Ich glaube, du musst wissen, was dein Content für dich aufbauen soll.</p>
                  <p>
                    Ich habe selbst erlebt, wie aus Expertise, organischer Reichweite, einem klaren
                    Angebot und gezieltem Marketing ein profitables Geschäftsmodell entstehen kann.
                  </p>
                  <p>Genau deshalb habe ich Creating Society gegründet.</p>
                  <p className="text-[color:var(--ink)]">
                    Nicht, damit Frauen einfach bessere Creatorinnen werden. Sondern damit sie
                    lernen, mit Content etwas Eigenes aufzubauen.
                  </p>
                </blockquote>
                <div className="mt-8">
                  <p className="font-serif text-2xl text-[color:var(--ink)]">Laura</p>
                  <p className="mt-1 text-sm text-[color:var(--muted-fg)]">
                    Gründerin von Creating Society
                  </p>
                </div>
                <p className="mt-10 text-sm tracking-wide text-[color:var(--muted-fg)]">
                  Content ist der Anfang. Nicht das Geschäftsmodell.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Call ─────────────────────────────────────────── */}
        <section
          id="call"
          aria-labelledby="call-title"
          className="scroll-mt-20 bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="rv md:col-span-6">
                <h2
                  id="call-title"
                  className="font-serif text-[2.1rem] leading-[1.06] sm:text-[3rem]"
                >
                  Du brauchst nicht noch mehr gespeicherte Content-Tipps.
                </h2>
                <p className="mt-7 text-[1.02rem] leading-relaxed text-[color:var(--cream)]/70">
                  Du brauchst Klarheit darüber, was du aufbauen kannst – und einen Plan, wie du es
                  umsetzt.
                </p>
                <p className="mt-10 text-sm uppercase tracking-[0.16em] text-[color:var(--cream)]/50">
                  Im Strategiegespräch schauen wir uns gemeinsam an:
                </p>
                <ul className="mt-6 border-t border-[color:var(--cream)]/15">
                  {callAgenda.map((a) => (
                    <li
                      key={a}
                      className="border-b border-[color:var(--cream)]/15 py-4 text-[1.02rem] text-[color:var(--cream)]/85"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <CtaButton source="call_section" tone="cream">
                    Kostenloses Strategiegespräch buchen
                  </CtaButton>
                </div>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--cream)]/55">
                  Das Gespräch dauert ungefähr 30 bis 45 Minuten. Die Zusammenarbeit ist nicht für
                  jede Person geeignet. Im Gespräch prüfen wir gemeinsam, ob deine Ziele und
                  Creating Society zueinander passen.
                </p>
              </div>

              <div className="rv d2 md:col-span-6">
                <CalendlyEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────── */}
        <section className="py-24 text-center md:py-32">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="rv font-serif text-[2.4rem] leading-[1.02] tracking-tight text-[color:var(--ink)] sm:text-6xl">
              Mach nicht nur Content.
              <br />
              <span className="serif-italic">Bau etwas Eigenes.</span>
            </p>
            <p className="rv d2 mt-8 eyebrow text-[color:var(--muted-fg)]">Creating Society</p>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="border-t border-[color:var(--border)] py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-[color:var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="font-serif text-base text-[color:var(--ink)]">Creating Society</p>
            <nav className="flex flex-wrap items-center gap-6">
              <a href="/impressum" className="transition hover:text-[color:var(--ink)]">
                Impressum
              </a>
              <a href="/datenschutz" className="transition hover:text-[color:var(--ink)]">
                Datenschutz
              </a>
            </nav>
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
        <button
          type="button"
          onClick={() => scrollToCall("mobile_bar")}
          className="w-full rounded-full bg-[color:var(--wine)] px-6 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)]"
        >
          Meine Möglichkeiten besprechen
        </button>
      </div>
    </>
  );
}
