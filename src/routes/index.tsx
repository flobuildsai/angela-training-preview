import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import proofAAsset from "@/assets/laura-work.jpg.asset.json";
import proofBAsset from "@/assets/laura-walk.jpg.asset.json";
import proofCAsset from "@/assets/laura-mykonos.jpg.asset.json";
import proofDAsset from "@/assets/laura-villa.jpg.asset.json";
import proofGridAsset from "@/assets/proof-grid.jpeg.asset.json";
import proofViews7mAsset from "@/assets/proof-views-7m.jpeg.asset.json";
import proofViews15mAsset from "@/assets/proof-views-15m.jpeg.asset.json";
import proofStripeAsset from "@/assets/proof-stripe.png.asset.json";

const lauraImg = lauraPortrait.url;
const lifestyleShots = [
  { src: proofAAsset.url, alt: "Laura beim Arbeiten" },
  { src: proofBAsset.url, alt: "Laura unterwegs" },
  { src: proofCAsset.url, alt: "Laura auf Mykonos" },
  { src: proofDAsset.url, alt: "Blick von der Villa" },
];


import logoDark from "@/assets/logo-dark.png";
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
      { title: "Creating Society | Verdiene mit Content und deinem eigenen Offer" },
      {
        name: "description",
        content:
          "Creating Society hilft Frauen, ein eigenes Offer aus ihrem Content zu bauen – ohne große Reichweite und ohne fertige Idee. Buche ein Strategiegespräch.",
      },
      {
        property: "og:title",
        content: "Creating Society | Verdiene mit Content und deinem eigenen Offer",
      },
      {
        property: "og:description",
        content:
          "Für Frauen, die aus ihrer Sichtbarkeit ein eigenes Business aufbauen wollen. Kostenloses Strategiegespräch buchen.",
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

const faqs = [
  {
    q: "Ich habe noch keine oder kaum Reichweite. Ist das ein Problem?",
    a: "Nein. Creating Society ist genau dafür gemacht. Du brauchst kein großes Publikum, um zu starten. Du brauchst eine klare Positionierung und ein Angebot. Reichweite bauen wir gezielt mit auf, aber sie ist der Weg, nicht die Voraussetzung.",
  },
  {
    q: "Ich möchte mein Gesicht nicht zeigen. Geht das trotzdem?",
    a: "Ja. Viele unserer Konzepte funktionieren komplett faceless. Wir entwickeln gemeinsam ein Content-Format, das zu dir passt, mit oder ohne Gesicht.",
  },
  {
    q: "Ich habe noch keine Idee, was ich verkaufen könnte.",
    a: "Das ist der häufigste Startpunkt. In den ersten Wochen finden wir gemeinsam heraus, welches Angebot zu deinen Fähigkeiten, deiner Erfahrung und dem Bedarf deiner Zielgruppe passt, bevor du auch nur ein Video mehr produzierst.",
  },
  {
    q: "Wie viel Zeit brauche ich pro Woche?",
    a: "Plane realistisch 5 bis 10 Stunden pro Woche ein. Das Programm ist neben Job oder Studium machbar. Entscheidend ist nicht die Menge an Zeit, sondern dass du konsequent umsetzt.",
  },
  {
    q: "Was kostet Creating Society?",
    a: "Das besprechen wir im Strategiegespräch, denn zuerst prüfen wir, ob das Programm überhaupt zu deiner Ausgangslage und deinem Ziel passt. Das Gespräch ist der erste Schritt, um zu schauen, ob wir zueinander passen.",
  },
  {
    q: "Wie läuft das Strategiegespräch ab?",
    a: "Wir sprechen über deine Ausgangslage, deine Positionierung und dein mögliches Angebot. Du gehst mit Klarheit über deinen nächsten Schritt raus, unabhängig davon, ob wir zusammenarbeiten.",
  },
];


// Chronologischer Beweis: Reichweite → Skalierung → Umsatz.
const proofSteps: {
  step: string;
  when: string;
  claim: string;
  body: string;
  img: string;
  ratio: string;
  fit: "cover" | "contain";
  gallery?: { img: string; ratio: string; fit: "cover" | "contain"; alt: string }[];
}[] = [
  {
    step: "01",
    when: "Monat 1",
    claim: "1,5 Mio. Views",
    body: "Neuer Account, null Startpublikum. Im ersten Monat die ersten Millionen Views und die ersten echten Follower.",
    img: proofViews15mAsset.url,
    ratio: "1 / 1",
    fit: "contain",
  },
  {
    step: "02",
    when: "Monat 2",
    claim: "6,9 Mio. Views",
    body: "Kein Zufallstreffer. Das Format wiederholt sich, die Reichweite wächst weiter, weit über die Follower hinaus.",
    img: proofViews7mAsset.url,
    ratio: "1 / 1",
    fit: "contain",
    gallery: [
      { img: proofGridAsset.url, ratio: "3 / 4", fit: "cover", alt: "Reels-Reichweite im zweiten Monat" },
    ],
  },
  {
    step: "03",
    when: "Danach",
    claim: "Die ersten Sales",
    body: "Sobald ein eigenes Angebot dahinter steht, wird aus Aufmerksamkeit Umsatz. Dieser Screenshot ist von einem Morgen nach dem Aufstehen.",
    img: proofStripeAsset.url,
    ratio: "4 / 5",
    fit: "contain",
  },
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


// VSL-Sektion: auf true setzen, sobald das Video verfügbar ist.
const VSL_VISIBLE = false;

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
    wine:
      "bg-[color:var(--ink)] text-[color:var(--cream)] shadow-[0_14px_30px_-18px_rgba(16,16,16,0.9)] hover:shadow-[0_18px_38px_-16px_rgba(16,16,16,0.9)]",
    cream:
      "bg-[color:var(--cream)] text-[color:var(--ink)] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_38px_-18px_rgba(0,0,0,0.55)]",
  } as const;

  return (
    <Link
      to="/call"
      onClick={() => trackEvent("call_cta_click", { source })}
      className={
        "group inline-flex max-w-full items-center justify-center gap-3 whitespace-normal text-center rounded-full px-6 py-4 text-[0.68rem] font-medium uppercase leading-snug tracking-[0.14em] transition-all duration-300 ease-out hover:-translate-y-[1px] active:translate-y-0 sm:whitespace-nowrap sm:px-10 sm:py-[1.05rem] sm:text-[0.7rem] sm:tracking-[0.18em] " +
        tones[tone] +
        " " +
        className
      }
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[0.85rem] w-[0.85rem] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
      </svg>
    </Link>
  );
}



// ── Seite ─────────────────────────────────────────────────────
function HomePage() {
  useReveal();
  const past = useScrolled();

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
          <a href="#top" className="flex items-center">
            <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto sm:h-5" />
          </a>
          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 md:flex">
              {[
                { href: "#methode", label: "Methode" },
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
          </div>

        </div>
      </header>

      <main id="top" className="bg-[color:var(--background)]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="rv">
                <span className="eyebrow rule-label text-[color:var(--muted-fg)]">
                  Creating Society
                </span>
                <h1 className="mt-6 font-serif text-[2.9rem] font-normal leading-[1.02] tracking-[-0.02em] text-[color:var(--ink)] sm:text-[4rem] lg:text-[4.6rem]">
                  Verdiene{" "}
                  <span className="whitespace-nowrap">10.000 €</span>{" "}
                  <span className="block">pro Monat mit</span>
                  <span className="serif-italic">Content.</span>
                </h1>
                <p className="mt-6 max-w-md text-[1rem] leading-[1.75] text-[color:var(--muted-fg)] sm:mt-7 sm:text-[1.05rem]">
                  Ohne große Reichweite. Ohne fertige Idee. Ich zeige dir, wie du aus deiner
                  Aufmerksamkeit ein eigenes Angebot baust, das dir wirklich gehört.
                </p>
                <div className="mt-9 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center">
                  <CtaButton source="hero" className="w-full sm:w-auto">
                    Strategiegespräch buchen
                  </CtaButton>
                </div>
              </div>

              <div className="rv d2 relative">
                <div className="relative overflow-hidden rounded-[2rem] soft-shadow">
                  <img
                    src={lauraImg}
                    alt="Laura, Gründerin von Creating Society"
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                </div>
                <p className="serif-italic mt-4 text-center text-[0.95rem] text-[color:var(--muted-fg)] lg:text-left">
                  Laura, Gründerin von Creating Society
                </p>
              </div>
            </div>
          </div>
        </section>





        {VSL_VISIBLE && (
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
        )}

        {/* ── Belief Shift ─────────────────────────────────── */}
        <section
          id="belief-shift"
          className="bg-[color:var(--wine)] py-28 text-[color:var(--cream)] md:py-40"
        >

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
                  Die TCS-Methode <span className="serif-italic">verbindet alle drei.</span>
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
              <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Der Beweis</p>
              <h2
                id="proof-title"
                className="mt-6 font-serif text-[2.1rem] leading-[1.08] text-[color:var(--ink)] sm:text-[3.25rem]"
              >
                Von null Followern zu den ersten Sales.
              </h2>
              <p className="mt-7 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
                Ein Account, bei null gestartet. Hier ist, was in den ersten Monaten passiert ist,
                Schritt für Schritt und mit echten Screenshots.
              </p>
            </div>

            {/* Chronologie: Reichweite → Skalierung → Umsatz */}
            <ol className="mt-14 space-y-14 sm:space-y-20">
              {proofSteps.map((s, i) => (
                <li
                  key={s.step}
                  className={
                    "rv grid items-start gap-8 sm:gap-12 lg:grid-cols-2 " + (i === 1 ? "d1" : i === 2 ? "d2" : "")
                  }
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-[1.6rem] leading-none text-[color:var(--rose)]">
                        {s.step}
                      </span>
                      <span className="eyebrow text-[color:var(--muted-fg)]">{s.when}</span>
                    </div>
                    <p className="mt-5 font-serif text-[2.2rem] leading-[1.05] text-[color:var(--ink)] sm:text-[2.9rem]">
                      {s.claim}
                    </p>
                    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-[color:var(--muted-fg)]">
                      {s.body}
                    </p>
                  </div>
                  <div className={"min-w-0 space-y-4 " + (i % 2 === 1 ? "lg:order-1" : "")}>
                    <figure>
                      <div
                        className="grain relative overflow-hidden rounded-[2px] bg-[color:var(--cream)] ring-1 ring-[color:var(--border)]"
                        style={{ aspectRatio: s.ratio }}
                      >
                        <img
                          src={s.img}
                          alt={s.claim}
                          loading="lazy"
                          className={
                            "h-full w-full " +
                            (s.fit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover")
                          }
                        />
                      </div>
                    </figure>
                    {s.gallery && s.gallery.length > 0 && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {s.gallery.map((g) => (
                          <figure key={g.alt} className="min-w-0">
                            <div
                              className="grain relative overflow-hidden rounded-[2px] bg-[color:var(--cream)] ring-1 ring-[color:var(--border)]"
                              style={{ aspectRatio: g.ratio }}
                            >
                              <img
                                src={g.img}
                                alt={g.alt}
                                loading="lazy"
                                className={
                                  "h-full w-full " +
                                  (g.fit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover")
                                }
                              />
                            </div>
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <p className="rv d3 mt-12 max-w-2xl font-serif text-[1.35rem] leading-snug text-[color:var(--ink)] sm:text-[1.7rem]">
              Reichweite allein zahlt nichts aus. Erst ein eigenes Angebot macht daraus Umsatz.
            </p>
          </div>
        </section>


        {/* ── TCS-Methode ──────────────────────────────────── */}
        <section id="methode" aria-labelledby="build-title" className="scroll-mt-20 py-24 md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Die TCS-Methode</p>
            <h2
              id="build-title"
              className="rv mt-6 max-w-3xl font-serif text-[2.4rem] leading-[1.04] tracking-tight text-[color:var(--ink)] sm:text-6xl"
            >
              Die TCS-Methode: <span className="serif-italic">So bauen wir dein Business auf.</span>
            </h2>
            <p className="rv d1 mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
              Unsere Methode verbindet drei Dinge, die einzeln nichts wert sind: Content, Vertrauen
              und ein Angebot, das Menschen wirklich kaufen wollen.
            </p>


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

        {/* ── Offer / Programm ─────────────────────────────── */}
        <section
          id="society"
          aria-labelledby="offer-title"
          className="scroll-mt-20 border-t border-[color:var(--border)] bg-[color:var(--cream2)] py-24 md:py-40"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Das Programm</p>
            <h2
              id="offer-title"
              className="rv mt-6 max-w-4xl font-serif text-[2.4rem] leading-[1.04] tracking-tight text-[color:var(--ink)] sm:text-6xl"
            >
              Von der Idee zum eigenen Angebot,{" "}
              <span className="serif-italic">mit deinen ersten zahlenden Kundinnen.</span>
            </h2>
            <p className="rv d1 mt-8 max-w-2xl text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
              Creating Society ist ein strukturiertes Programm, in dem du dein Wissen in ein eigenes
              digitales Produkt verwandelst und lernst, es über deinen Content zu verkaufen.
            </p>

            <div className="rv d2 mt-16 grid gap-12 border-t border-[color:var(--border)] pt-12 md:grid-cols-3 md:gap-0">
              {[
                {
                  no: "01",
                  weeks: "Woche 1–4",
                  title: "Fundament",
                  modules: [
                    "Mindset und Unternehmer 1x1",
                    "Nische und perfekte Kundin finden",
                    "Ziele und eigene Roadmap",
                  ],
                  result: "Du weißt, was du verkaufst und an wen.",
                },
                {
                  no: "02",
                  weeks: "Woche 5–8",
                  title: "Produkt",
                  modules: [
                    "Produktform wählen: Kurs, Guide, Masterclass, Templates, Membership",
                    "Branding: Name, Logo, Farben",
                    "Produkt aufbauen und fertigstellen",
                  ],
                  result: "Dein Angebot existiert und ist verkaufbar.",
                },
                {
                  no: "03",
                  weeks: "Woche 9–12",
                  title: "Verkauf",
                  modules: [
                    "Social Media Bootcamp",
                    "Storytelling und Vertrauen aufbauen",
                    "Pre-Launch und Testphase",
                    "Passiv verkaufen und Affiliate",
                  ],
                  result: "Deine ersten zahlenden Kundinnen.",
                },
              ].map((phase, i) => (
                <div
                  key={phase.no}
                  className={`md:px-8 ${
                    i > 0 ? "md:border-l md:border-[color:var(--border)]" : "md:pl-0"
                  } ${i === 2 ? "md:pr-0" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[2.6rem] leading-none text-[color:var(--rose)]">
                      {phase.no}
                    </span>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
                        {phase.weeks}
                      </p>
                      <h3 className="font-serif text-2xl leading-tight text-[color:var(--ink)]">
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-6 border-t border-[color:var(--border)]">
                    {phase.modules.map((m) => (
                      <li
                        key={m}
                        className="border-b border-[color:var(--border)] py-3 text-[0.95rem] leading-relaxed text-[color:var(--muted-fg)]"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 font-serif text-lg leading-snug text-[color:var(--ink)]">
                    <span className="serif-italic">{phase.result}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="rv d3 mt-14 max-w-xl text-sm leading-relaxed text-[color:var(--muted-fg)]">
              Funktioniert auch ohne große Reichweite, und auf Wunsch komplett faceless.
            </p>


            <div className="rv d4 mt-10">
              <CtaButton source="offer">Strategiegespräch buchen</CtaButton>
            </div>
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

            {/* Editorial-Bildleiste */}
            <div className="rv d3 mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {lifestyleShots.map((s) => (
                <div
                  key={s.src}
                  className="grain relative overflow-hidden rounded-[2px] ring-1 ring-[color:var(--border)]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
                </div>
              ))}
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
              „Warum eigentlich <span className="serif-italic">nicht ich?“</span>
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section aria-labelledby="faq-title" className="py-24 md:py-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Häufige Fragen</p>
            <h2
              id="faq-title"
              className="rv mt-6 max-w-3xl font-serif text-[2.4rem] leading-[1.04] tracking-tight text-[color:var(--ink)] sm:text-6xl"
            >
              Alles, was du vor dem Gespräch{" "}
              <span className="serif-italic">wissen willst.</span>
            </h2>

            <Accordion type="single" collapsible className="rv d2 mt-14 border-t border-[color:var(--border)]">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={"faq-" + i}
                  className="border-b border-[color:var(--border)]"
                >
                  <AccordionTrigger className="py-6 text-left font-serif text-xl leading-snug text-[color:var(--ink)] hover:no-underline sm:text-2xl">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-8 text-[0.98rem] leading-relaxed text-[color:var(--muted-fg)]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Call CTA ─────────────────────────────────────── */}

        <section
          id="call"
          aria-labelledby="call-title"
          className="scroll-mt-20 bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <h2
              id="call-title"
              className="rv font-serif text-[2.1rem] leading-[1.06] sm:text-[3rem]"
            >
              Du brauchst nicht noch mehr gespeicherte Content-Tipps.
            </h2>
            <p className="rv d2 mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed text-[color:var(--cream)]/70">
              Du brauchst Klarheit darüber, was du aufbauen kannst – und einen Plan, wie du es
              umsetzt.
            </p>
            <div className="rv d3 mt-10">
              <CtaButton source="call_section" tone="cream">
                Strategiegespräch buchen
              </CtaButton>
            </div>
            <p className="rv d4 mx-auto mt-6 max-w-md text-sm leading-relaxed text-[color:var(--cream)]/55">
              Im Gespräch schauen wir gemeinsam, ob deine Ziele und Creating Society zueinander
              passen.
            </p>
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
        <footer className="border-t border-[color:var(--border)] pb-24 pt-10 md:pb-10 md:pt-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-[color:var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto shrink-0 self-start object-contain" />
            <nav className="flex flex-wrap items-center gap-6">
              <Link to="/impressum" className="transition hover:text-[color:var(--ink)]">
                Impressum
              </Link>
              <Link to="/datenschutz" className="transition hover:text-[color:var(--ink)]">
                Datenschutz
              </Link>

            </nav>
          </div>
        </footer>
      </main>
    </>

  );
}
