import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { VideoBlock } from "@/components/VideoBlock";
import logoDark from "@/assets/logo-dark.png";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import lauraWalk from "@/assets/laura-walk.jpg.asset.json";
import lauraVilla from "@/assets/laura-villa.jpg.asset.json";
import { trackEvent } from "@/lib/track";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/masterclass")({
  head: () => ({
    meta: [
      { title: "Masterclass | Creating Society" },
      {
        name: "description",
        content:
          "Die Masterclass von Laura: wie du aus Content ein eigenes Angebot machst, ohne große Reichweite und ohne fertige Idee. Danach kannst du ein Strategiegespräch buchen.",
      },
      { property: "og:title", content: "Masterclass | Creating Society" },
      {
        property: "og:description",
        content:
          "Wie du aus Content ein eigenes Angebot machst, ohne große Reichweite und ohne fertige Idee.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MasterclassPage,
});

// ── Inhalte ───────────────────────────────────────────────────

const method = [
  {
    index: "01",
    title: "Positionierung",
    body: "Wofür du stehst und wofür jemand bezahlt. Du brauchst keine zehn Jahre Erfahrung, sondern einen klaren Vorsprung vor der Frau, der du hilfst.",
  },
  {
    index: "02",
    title: "Aufmerksamkeit",
    body: "Nicht möglichst viele Menschen, sondern die richtigen. Content-Formate, die Vertrauen aufbauen und Nachfrage erzeugen, auch bei kleiner Reichweite.",
  },
  {
    index: "03",
    title: "Angebot",
    body: "Ein Angebot, das jemand wirklich kaufen will, entwickelt aus deinen Fähigkeiten und dem Bedarf deiner Zielgruppe. Verkauft, bevor es fertig produziert ist.",
  },
  {
    index: "04",
    title: "Verkauf",
    body: "Der Weg vom Zuschauer zur Kundin. Content, Angebot und Vertrieb greifen ineinander, statt nebeneinander zu existieren.",
  },
];

const forYou = [
  "Du machst bereits Content, aber daraus entsteht kaum oder unregelmäßig Geld.",
  "Du willst starten, weißt aber noch nicht, wofür du stehen oder was du anbieten kannst.",
  "Du willst nicht dauerhaft von Kooperationen und Marken abhängig sein.",
  "Du kannst 5 bis 10 Stunden pro Woche konsequent investieren.",
];

const notForYou = [
  "Du suchst ein fertiges Produkt, das du nur weiterverkaufst.",
  "Du willst Reichweite, aber kein Unternehmen aufbauen.",
  "Du erwartest Ergebnisse, ohne selbst umzusetzen.",
];

const faqs = [
  {
    q: "Ich habe kaum Reichweite. Funktioniert das trotzdem?",
    a: "Ja. Reichweite entsteht heute über Interessen, nicht über Followerzahlen. Entscheidend ist, dass du weißt, wem du wobei hilfst und was du anbietest. Reichweite bauen wir gezielt mit auf.",
  },
  {
    q: "Ich möchte mein Gesicht nicht zeigen.",
    a: "Das geht. Viele Konzepte funktionieren komplett faceless. Wir entwickeln ein Format, das zu dir passt, mit oder ohne Gesicht.",
  },
  {
    q: "Ich weiß noch nicht, was ich verkaufen soll.",
    a: "Das ist der häufigste Startpunkt. Genau dafür ist Schritt eins da: herausfinden, was du sinnvoll anbieten kannst, bevor du ein weiteres Video produzierst.",
  },
  {
    q: "Wie viel Zeit brauche ich?",
    a: "Plane 5 bis 10 Stunden pro Woche ein. Das ist neben Job oder Studium machbar. Weniger Zeit heißt nicht, dass es nicht geht, es dauert dann nur länger.",
  },
  {
    q: "Was kostet die Zusammenarbeit?",
    a: "Das besprechen wir im Strategiegespräch. Zuerst schauen wir, ob dein Ziel und das Programm zueinander passen. Das Gespräch selbst ist kostenlos und unverbindlich.",
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
    wine: "bg-[color:var(--wine-accent)] text-[color:var(--cream)] hover:opacity-90",
    cream: "bg-[color:var(--cream)] text-[color:var(--ink)] hover:opacity-90",
  } as const;

  return (
    <Link
      to="/call"
      onClick={() => trackEvent("call_cta_click", { source })}
      className={
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition sm:px-9 sm:py-4 " +
        tones[tone] +
        " " +
        className
      }
    >
      {children}
    </Link>
  );
}

// ── Seite ─────────────────────────────────────────────────────

function MasterclassPage() {
  useReveal();
  const past = useScrolled();

  return (
    <>
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
          <Link to="/" className="flex items-center">
            <img
              src={logoDark}
              alt="thecreatingsociety"
              className="h-4 w-auto shrink-0 self-start object-contain sm:h-5"
            />
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {[
              { href: "#methode", label: "Methode" },
              { href: "#fuer-wen", label: "Für wen" },
              { href: "#laura", label: "Laura" },
              { href: "#faq", label: "Fragen" },
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
      </header>

      <main id="top" className="bg-[color:var(--background)]">
        {/* Hero */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rv max-w-3xl">
              <p className="eyebrow mb-8 text-[color:var(--wine-accent)]">Masterclass</p>
              <h1 className="font-serif text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.02em] text-[color:var(--ink)] sm:text-[4rem] lg:text-[4.6rem]">
                Wie du aus Content ein eigenes Angebot machst.
              </h1>
              <p className="serif-italic mt-6 text-[1.3rem] leading-[1.25] text-[color:var(--ink)] sm:mt-8 sm:text-[1.8rem]">
                Ohne große Reichweite. Ohne fertige Idee.
              </p>
              <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.75] text-[color:var(--muted-fg)]">
                In diesem Video zeige ich dir, warum Sichtbarkeit allein kein Einkommen erzeugt und
                wie der Weg aussieht, den ich mit unseren Kundinnen in 12 Wochen gehe.
              </p>
            </div>
          </div>

          <div className="rv d2 mx-auto mt-12 max-w-4xl px-5 sm:mt-16 sm:px-8">
            <VideoBlock videoId="masterclass-1" label="Teil 1 · Der Überblick" />
          </div>

          <div className="rv d3 mt-10 flex flex-col items-center gap-4 px-5">
            <CtaButton source="masterclass_hero" className="w-full sm:w-auto">
              Strategiegespräch buchen
            </CtaButton>
            <p className="text-sm text-[color:var(--muted-fg)]">
              Kostenlos und unverbindlich. 30 bis 45 Minuten.
            </p>
          </div>
        </section>

        {/* Reframe */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rv grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-[2px] border border-[color:var(--border)] bg-[color:var(--cream2)] p-6 sm:p-8">
                <p className="eyebrow text-[color:var(--muted-fg)]">Was alle denken</p>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-[color:var(--muted-fg)] line-through">
                  Erst Reichweite aufbauen. Dann irgendwann etwas verkaufen.
                </p>
              </div>
              <div className="rounded-[2px] border border-[color:var(--ink)] bg-[color:var(--ink)] p-6 text-[color:var(--cream)] sm:p-8">
                <p className="eyebrow text-[color:var(--cream)]/60">Was tatsächlich funktioniert</p>
                <p className="mt-4 text-[1.05rem] leading-relaxed">
                  Erst wissen, was du verkaufst. Dann Content machen, der genau diese Menschen
                  anzieht.
                </p>
              </div>
            </div>
            <p className="rv d2 mt-14 max-w-2xl text-[1.02rem] leading-[1.8] text-[color:var(--muted-fg)]">
              Aufrufe sind kein Umsatz. Sie sind Aufmerksamkeit. Ob daraus Einkommen wird,
              entscheidet sich daran, ob es etwas gibt, das die Menschen kaufen können.
            </p>
          </div>
        </section>

        {/* Methode */}
        <section id="methode" className="scroll-mt-20 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Die TCS-Methode</p>
            <h2 className="rv mt-6 max-w-2xl font-serif text-[2.3rem] leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-[3.4rem]">
              Vier Schritte, <span className="serif-italic">ein Ergebnis.</span>
            </h2>

            <div className="mt-14 border-t border-[color:var(--border)]">
              {method.map((m) => (
                <div
                  key={m.index}
                  className="rv grid gap-4 border-b border-[color:var(--border)] py-10 md:grid-cols-[6rem_1fr_1.2fr] md:items-start md:gap-10"
                >
                  <span className="font-serif text-2xl text-[color:var(--rose)]">{m.index}</span>
                  <h3 className="font-serif text-2xl leading-snug text-[color:var(--ink)] sm:text-[1.8rem]">
                    {m.title}
                  </h3>
                  <p className="text-[1rem] leading-[1.75] text-[color:var(--muted-fg)]">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video 2 */}
        <section className="bg-[color:var(--cream2)] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="rv max-w-2xl">
              <p className="eyebrow text-[color:var(--rose)]">Teil 2</p>
              <h2 className="mt-5 font-serif text-[2rem] leading-[1.06] tracking-tight text-[color:var(--ink)] sm:text-[2.8rem]">
                Wie die 12 Wochen konkret ablaufen.
              </h2>
            </div>
            <div className="rv d2 mt-12">
              <VideoBlock videoId="masterclass-2" label="Teil 2 · Der Ablauf" />
            </div>
          </div>
        </section>

        {/* Für wen */}
        <section id="fuer-wen" className="scroll-mt-20 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="rv max-w-2xl font-serif text-[2.3rem] leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-[3.2rem]">
              Für wen das gedacht ist.
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="rv">
                <p className="eyebrow text-[color:var(--wine-accent)]">Passt, wenn</p>
                <ul className="mt-6 space-y-4">
                  {forYou.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[color:var(--border)] pb-4 text-[1rem] leading-relaxed text-[color:var(--ink)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rv d1">
                <p className="eyebrow text-[color:var(--muted-fg)]">Passt nicht, wenn</p>
                <ul className="mt-6 space-y-4">
                  {notForYou.map((t) => (
                    <li
                      key={t}
                      className="border-b border-[color:var(--border)] pb-4 text-[1rem] leading-relaxed text-[color:var(--muted-fg)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Laura */}
        <section id="laura" className="scroll-mt-20 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-20">
              <div className="rv">
                <img
                  src={lauraPortrait.url}
                  alt="Laura, Gründerin von Creating Society"
                  className="w-full rounded-[2px] object-cover"
                  style={{ aspectRatio: "4 / 5" }}
                  loading="lazy"
                />
              </div>
              <div className="rv d1">
                <p className="eyebrow text-[color:var(--rose)]">Hinter Creating Society</p>
                <h2 className="mt-6 font-serif text-[2.2rem] leading-[1.06] tracking-tight text-[color:var(--ink)] sm:text-[3rem]">
                  Ich bin <span className="serif-italic">Laura.</span>
                </h2>
                <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-[color:var(--muted-fg)]">
                  <p>
                    Ich habe lange Content gemacht, der gut lief, und trotzdem kaum Geld damit
                    verdient. Die Reichweite war da, das Business nicht.
                  </p>
                  <p>
                    Irgendwann habe ich aufgehört, auf Aufrufe zu optimieren, und angefangen, das
                    aufzubauen, was dahinter liegt: eine klare Positionierung und ein eigenes
                    Angebot.
                  </p>
                  <p className="text-[color:var(--ink)]">
                    Genau diesen Weg gehe ich heute mit Frauen, die aus ihrer Sichtbarkeit etwas
                    Eigenes machen wollen.
                  </p>
                </div>
              </div>
            </div>

            <div className="rv d2 mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {[
                { src: lauraWork.url, alt: "Laura beim Arbeiten" },
                { src: lauraWalk.url, alt: "Laura unterwegs" },
                { src: lauraVilla.url, alt: "Laura in der Villa" },
              ].map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-[2px] object-cover"
                  style={{ aspectRatio: "3 / 4" }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Video 3 */}
        <section className="bg-[color:var(--cream2)] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Teil 3</p>
            <h2 className="rv d1 mt-5 font-serif text-[2rem] leading-[1.06] tracking-tight text-[color:var(--ink)] sm:text-[2.8rem]">
              Was der nächste Schritt für dich ist.
            </h2>
            <div className="rv d2 mt-12">
              <VideoBlock videoId="masterclass-3" label="Teil 3 · Dein nächster Schritt" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="rv eyebrow text-[color:var(--rose)]">Häufige Fragen</p>
            <h2 className="rv mt-6 max-w-3xl font-serif text-[2.3rem] leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-[3.2rem]">
              Alles, was du vor dem Gespräch{" "}
              <span className="serif-italic">wissen willst.</span>
            </h2>
            <Accordion
              type="single"
              collapsible
              className="rv d2 mt-14 border-t border-[color:var(--border)]"
            >
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

        {/* Call */}
        <section
          id="call"
          className="scroll-mt-20 bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-36"
        >
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <h2 className="rv font-serif text-[2.1rem] leading-[1.06] sm:text-[3rem]">
              Lass uns über deinen nächsten Schritt sprechen.
            </h2>
            <p className="rv d2 mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed text-[color:var(--cream)]/70">
              Im Gespräch schauen wir uns deine Ausgangslage an und klären, welches Angebot für dich
              realistisch ist.
            </p>
            <div className="rv d3 mt-10">
              <CtaButton source="masterclass_call" tone="cream" className="w-full sm:w-auto">
                Kostenloses Strategiegespräch buchen
              </CtaButton>
            </div>
          </div>
        </section>

        <footer className="border-t border-[color:var(--border)] py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-[color:var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <img
              src={logoDark}
              alt="thecreatingsociety"
              className="h-4 w-auto shrink-0 self-start object-contain"
            />
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
