import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { VideoBlock } from "@/components/VideoBlock";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import lauraWalk from "@/assets/laura-walk.jpg.asset.json";
import logoDark from "@/assets/logo-dark.png";
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
          "Die Masterclass von Laura: Wie du aus deinem Content ein eigenes Angebot baust, ohne große Reichweite und ohne fertige Idee. Strategiegespräch für den Early Access buchen.",
      },
      { property: "og:title", content: "Masterclass | Creating Society" },
      {
        property: "og:description",
        content:
          "Content, Positionierung und ein Angebot, das Menschen wirklich kaufen wollen. Jetzt Masterclass ansehen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MasterclassPage,
});

const lauraImg = lauraPortrait.url;
const workImg = lauraWork.url;
const walkImg = lauraWalk.url;

// ─────────────────────────────────────────────────────────────
// SOCIAL PROOF
// Bleibt leer, bis echte, verifizierte Ergebnisse vorliegen.
// ─────────────────────────────────────────────────────────────
type Result = { metric: string; label: string; name: string; handle: string };
type Testimonial = { quote: string; name: string; handle: string };

const results: Result[] = [];
const testimonials: Testimonial[] = [];

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

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
      setPastHero(y > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, pastHero };
}

function Marquee() {
  const items = [
    "CREATING SOCIETY",
    "SICHTBARKEIT MIT SYSTEM",
    "DEIN EIGENES ANGEBOT",
    "CREATING SOCIETY",
  ];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="bg-[color:var(--wine)] py-4 overflow-hidden border-y border-white/5">
      <div className="flex w-max whitespace-nowrap animate-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="mx-8 text-[color:var(--cream)]/70 text-xs tracking-[0.35em] font-medium">
            {t} <span className="mx-8 text-[color:var(--rose)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StickyHeader({ solid }: { solid: boolean }) {
  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-40 transition-all duration-300 " +
        (solid
          ? "bg-[color:var(--cream)]/90 backdrop-blur-md border-b border-[color:var(--border)] text-[color:var(--ink)]"
          : "bg-transparent text-[color:var(--cream)]")
      }
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-tight">
          Creating <span className="serif-italic">Society</span>
        </Link>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
          <a href="#methode" className="hidden md:inline opacity-80 hover:opacity-100">Methode</a>
          <a href="#programm" className="hidden md:inline opacity-80 hover:opacity-100">Programm</a>
          <a href="#faq" className="hidden md:inline opacity-80 hover:opacity-100">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-[color:var(--rose)] transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function SectionIndex({ index, label, tone = "rose" }: { index: string; label: string; tone?: "rose" | "cream" }) {
  return (
    <p className={"eyebrow flex items-center gap-3 " + (tone === "cream" ? "text-[color:var(--cream)]/60" : "text-[color:var(--rose)]")}>
      <span className="opacity-70">{index}</span>
      <span className="h-px w-6 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}

function CallButton({ children, tone = "wine" }: { children: React.ReactNode; tone?: "wine" | "cream" }) {
  const tones = {
    wine: "bg-[color:var(--wine-accent)] text-[color:var(--cream)]",
    cream: "bg-[color:var(--cream)] text-[color:var(--ink)]",
  } as const;
  return (
    <Link
      to="/call"
      className={
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition hover:opacity-90 " +
        tones[tone]
      }
    >
      {children}
    </Link>
  );
}

function StoryImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="rv my-12">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover rounded-2xl"
      />
      <figcaption className="mt-3 serif-italic text-[15px] text-[color:var(--muted-fg)]">
        {caption}
      </figcaption>
    </figure>
  );
}

function MasterclassPage() {
  useReveal();
  const { progress, pastHero } = useScrollState();

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <ScrollProgress progress={progress} />
      <StickyHeader solid={pastHero} />

      {/* HERO + VIDEO 1 */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-[color:var(--wine)] text-[color:var(--cream)] pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden grain"
      >
        <div className="relative mx-auto max-w-[780px] px-5 sm:px-8 text-center">
          <p className="rv eyebrow text-[color:var(--cream)]/60">Die Masterclass</p>
          <h1
            id="hero-heading"
            className="rv d1 mt-6 font-serif text-[2.4rem] sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
          >
            Mach aus deinem Content ein eigenes Angebot.
          </h1>
          <p className="rv d2 mt-5 serif-italic text-lg sm:text-xl text-[color:var(--cream)]/75 max-w-[520px] mx-auto leading-relaxed">
            Auch ohne große Reichweite, ohne fertige Idee und ohne dein Gesicht zu zeigen.
          </p>
        </div>

        <div className="rv d3 relative mx-auto max-w-4xl px-5 sm:px-8 mt-10">
          <VideoBlock videoId="hero-1" label="Video 1 · Starte hier" />
        </div>

        <div className="rv d4 mt-9 flex flex-col items-center gap-3 px-5">
          <CallButton tone="cream">Strategiegespräch buchen</CallButton>
          <p className="text-xs text-[color:var(--cream)]/60 tracking-wide">
            Early Access, begrenzte Plätze in der ersten Gruppe.
          </p>
        </div>
      </section>

      <Marquee />

      {/* 01 — PROBLEM */}
      <section aria-labelledby="problem-heading" className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="rv md:col-span-5">
            <SectionIndex index="01" label="Das Problem" />
            <h2
              id="problem-heading"
              className="mt-6 font-serif text-[2.2rem] sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight"
            >
              Du brauchst nicht mehr Content-Tipps.{" "}
              <span className="serif-italic text-[color:var(--rose)]">Du brauchst einen Plan.</span>
            </h2>
          </div>
          <div className="rv d1 md:col-span-7 md:pl-4 space-y-5 text-[color:var(--muted-fg)] leading-relaxed text-[15px] sm:text-base">
            <p>
              Vielleicht postest du schon und fragst dich, warum daraus kein Einkommen wird.
              Vielleicht willst du starten und weißt nicht, wofür du überhaupt stehen sollst.
              Beides ist derselbe Punkt: Es fehlt nicht an Ideen, es fehlt an einem Plan.
            </p>
            <p>
              Views sind kein Geschäft. Erst wenn hinter der Aufmerksamkeit ein klares Angebot
              steht, wird aus Arbeit ein Business.
            </p>
            <blockquote className="mt-8 border-l-2 border-[color:var(--rose)] pl-6 py-2 serif-italic text-[color:var(--ink)] text-xl leading-snug">
              Ich hatte Millionen Views im Monat und kaum Einkommen daraus. Verändert hat sich erst
              etwas, als ich angefangen habe, etwas Eigenes dahinter zu bauen.
            </blockquote>
          </div>
        </div>
      </section>

      {/* 02 — WAS DU BEKOMMST */}
      <section aria-labelledby="inside-heading" className="bg-[color:var(--bg)] py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rv max-w-3xl">
            <SectionIndex index="02" label="Was du bekommst" />
            <h2 id="inside-heading" className="mt-6 font-serif text-[2.1rem] sm:text-5xl leading-[1.05] tracking-tight">
              Struktur, Begleitung{" "}
              <span className="serif-italic text-[color:var(--rose)]">und Werkzeuge.</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              { label: "Das System", items: [
                ["Die TCS-Methode", "Positionierung, Content, Angebot, Verkauf, in der Reihenfolge, die funktioniert"],
                ["Faceless möglich", "der komplette Weg, ohne dass du dein Gesicht zeigen musst"],
                ["12-Wochen-Fahrplan", "du weißt jede Woche, was zu tun ist"],
              ]},
              { label: "Die Begleitung", items: [
                ["Direktes Feedback von mir", "zu deiner Positionierung, deinem Content und deinem Angebot"],
                ["Die Community", "Frauen, die im selben Zeitraum dasselbe aufbauen"],
                ["Live Calls", "bring die Stelle mit, an der du feststeckst"],
              ]},
              { label: "Die Werkzeuge", items: [
                ["Vorlagen", "Hooks, Reel-Skripte, Verkaufsseite, E-Mail-Sequenzen, Preisrechner"],
                ["Prozesse", "damit Content, Angebot und Verkauf ineinandergreifen"],
                ["Updates", "alles, was wir weiterentwickeln, bekommst du mit"],
              ]},
            ].map((cluster) => (
              <div key={cluster.label} className="rv">
                <p className="eyebrow text-[color:var(--rose)]">{cluster.label}</p>
                <ul className="mt-6 border-t border-[color:var(--border)]">
                  {cluster.items.map(([title, desc]) => (
                    <li key={title} className="py-5 border-b border-[color:var(--border)]">
                      <h3 className="font-serif text-xl text-[color:var(--ink)]">{title}</h3>
                      <p className="mt-1 text-[14px] text-[color:var(--muted-fg)] leading-relaxed">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="rv d2 mt-12 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
            Es gibt keinen Warenkorb. Der Zugang läuft über ein Gespräch, weil ich vorher wissen
            will, ob das zu deiner Situation passt.
          </p>
        </div>
      </section>

      {/* VIDEO 2 */}
      <section aria-labelledby="breakdown-heading" className="bg-[color:var(--cream)] py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <p className="rv eyebrow text-[color:var(--rose)]">Die Methode im Detail</p>
          <h2 id="breakdown-heading" className="rv d1 mt-5 font-serif text-3xl sm:text-4xl tracking-tight">
            So funktioniert das konkret
          </h2>
          <p className="rv d2 mt-5 text-[color:var(--muted-fg)] max-w-xl mx-auto leading-relaxed">
            Die vier Schritte und was du in jedem davon aufbaust.
          </p>
          <div className="rv d3 mt-12">
            <VideoBlock videoId="breakdown-2" label="Video 2 · Die Methode" />
          </div>
        </div>
      </section>

      {/* 03 — TCS-METHODE */}
      <section id="methode" aria-labelledby="system-heading" className="scroll-mt-20 bg-[color:var(--wine)] text-[color:var(--cream)] py-28 md:py-36 grain">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <SectionIndex index="03" label="Die TCS-Methode" tone="cream" />
            <h2
              id="system-heading"
              className="rv d1 mt-6 font-serif text-[2.4rem] sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight"
            >
              Vier Schritte. <span className="serif-italic">Ein Ergebnis.</span>
            </h2>
            <p className="rv d2 mt-6 text-[color:var(--cream)]/70 leading-relaxed max-w-xl">
              Content, Vertrauen und ein Angebot, das Menschen wirklich kaufen wollen. Einzeln
              bringt davon nichts etwas, zusammen wird daraus ein Business.
            </p>
          </div>

          <div className="mt-16 border-t border-white/10">
            {[
              {
                n: "01",
                name: "Positionierung",
                tag: "Wofür du stehen willst.",
                body: "Du musst keine Expertin sein, du musst nur ein Stück weiter sein als die Frau, der du hilfst. Wir finden deine Nische, ohne dich einzusperren, mit Gesicht oder komplett faceless.",
                out: "Du kannst in einem Satz sagen, wem du wobei hilfst.",
              },
              {
                n: "02",
                name: "Content",
                tag: "Content, der etwas für dich aufbaut.",
                body: "Formate, Hooks und Serien, die Aufmerksamkeit erzeugen und Vertrauen schaffen. Produziert in Blöcken, damit es neben Job oder Studium machbar bleibt.",
                out: "Du hast einen Rhythmus, der die richtigen Menschen anzieht.",
              },
              {
                n: "03",
                name: "Angebot",
                tag: "Etwas, das Menschen wirklich kaufen wollen.",
                body: "Wir klären, was du sinnvoll verkaufen kannst, was du zuerst baust und was auf keinen Fall. Verkauft wird, bevor alles fertig ist, statt monatelang zu basteln.",
                out: "Du hast ein fertiges, bepreistes Angebot.",
              },
              {
                n: "04",
                name: "Verkauf",
                tag: "Von der Zuschauerin zur Kundin.",
                body: "Verkaufen im Content, ohne dass es sich wie Werbung anfühlt. Storys, DMs, Kommentare und ein schlanker Weg über E-Mail zum Angebot.",
                out: "Du hast Verkäufe, die sich wiederholen lassen.",
              },
            ].map((p, i) => (
              <div
                key={p.n}
                className={"rv border-b border-white/10 py-10 " + (i === 1 ? "d1" : i >= 2 ? "d2" : "")}
              >
                <div className="grid gap-5 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10">
                  <div className="min-w-0">
                    <div className="font-serif text-4xl text-[color:var(--rose)] leading-none">{p.n}</div>
                    <div className="mt-3 eyebrow text-[color:var(--cream)]/50">{p.name}</div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-[1.6rem] sm:text-[2rem] leading-snug text-[color:var(--cream)]">
                      {p.tag}
                    </p>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[color:var(--cream)]/70">
                      {p.body}
                    </p>
                    <p className="mt-5 serif-italic text-[color:var(--rose)]">{p.out}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FÜR WEN */}
      <section aria-labelledby="forwho-heading" className="bg-[color:var(--cream)] py-24 md:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 id="forwho-heading" className="rv font-serif text-3xl sm:text-5xl tracking-tight max-w-2xl leading-[1.06]">
            Für wen das <span className="serif-italic text-[color:var(--rose)]">gemacht ist.</span>
          </h2>
          <div className="mt-14 grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="rv">
              <p className="eyebrow text-[color:var(--rose)]">Das passt zu dir, wenn</p>
              <ul className="mt-6 border-t border-[color:var(--border)] text-[15px] leading-relaxed text-[color:var(--ink)]/85">
                {[
                  "du bereits Content machst, aber daraus kaum Geld entsteht.",
                  "du starten willst und noch nicht weißt, wofür du stehst.",
                  "du nicht dauerhaft von Kooperationen abhängig sein möchtest.",
                  "du lieber ein starkes Angebot baust, als fünfmal täglich zu posten.",
                  "du 5 bis 10 fokussierte Stunden pro Woche investieren kannst.",
                ].map((t) => (
                  <li key={t} className="py-4 border-b border-[color:var(--border)]">{t}</li>
                ))}
              </ul>
            </div>
            <div className="rv d1">
              <p className="eyebrow text-[color:var(--muted-fg)]">Das passt nicht, wenn</p>
              <ul className="mt-6 border-t border-[color:var(--border)] text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
                {[
                  "du Geld willst, ohne etwas aufzubauen.",
                  "du ein fertiges Produkt suchst, das du nur weiterverkaufst.",
                  "dir Bekanntheit wichtiger ist als ein tragfähiges Business.",
                  "du jemanden brauchst, der dich jeden Morgen motiviert.",
                  "du erwartest, dass das in zwei Wochen läuft.",
                ].map((t) => (
                  <li key={t} className="py-4 border-b border-[color:var(--border)]">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — 12 WOCHEN */}
      <section id="programm" aria-labelledby="weeks-heading" className="scroll-mt-20 bg-[color:var(--bg)] py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rv max-w-3xl">
            <SectionIndex index="04" label="Der Ablauf" />
            <h2 id="weeks-heading" className="mt-6 font-serif text-[2.2rem] sm:text-5xl leading-[1.05] tracking-tight">
              In 12 Wochen von der Idee zum eigenen Angebot,{" "}
              <span className="serif-italic text-[color:var(--rose)]">mit deinen ersten zahlenden Kundinnen.</span>
            </h2>
          </div>

          <div className="mt-14 relative">
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-[color:var(--border)]" aria-hidden="true" />
            <ol className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
              {[
                { w: "Woche 1 bis 4", name: "Positionierung & Angebot", body: "Du weißt, wofür du stehst und was du verkaufst. Die meisten kommen nie bis hierher." },
                { w: "Woche 5 bis 8", name: "Content & Nachfrage", body: "Dein Content erzeugt gezielt Anfragen statt nur Views. Getestet, nicht geraten." },
                { w: "Woche 9 bis 12", name: "Verkauf & erste Kundinnen", body: "Du gewinnst deine ersten zahlenden Kundinnen und weißt, wie du das wiederholst." },
              ].map((n, i) => (
                <li key={n.w} className="rv relative" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--bg)] border border-[color:var(--rose)] text-[color:var(--rose)] font-serif text-lg relative z-10">
                    {i + 1}
                  </div>
                  <p className="mt-4 eyebrow text-[color:var(--muted-fg)]">{n.w}</p>
                  <h3 className="mt-1 font-serif text-2xl">{n.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted-fg)]">{n.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="rv d2 mt-12 max-w-2xl text-[color:var(--muted-fg)] leading-relaxed text-[15px]">
            12 Wochen ist das Tempo bei 5 bis 10 fokussierten Stunden pro Woche. Weniger Zeit heißt
            einfach, es dauert länger. Funktioniert ohne große Reichweite und auf Wunsch komplett
            faceless.
          </p>
        </div>
      </section>

      {/* PROOF (nur mit echten Einträgen) */}
      {results.length > 0 && (
        <section aria-labelledby="proof-heading" className="bg-[color:var(--cream2)] py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rv max-w-3xl">
              <SectionIndex index="05" label="Ergebnisse" />
              <h2 id="proof-heading" className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight">
                Zahlen, <span className="serif-italic text-[color:var(--rose)]">keine Versprechen.</span>
              </h2>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((r) => (
                <div key={r.name + r.metric} className="rv rounded-2xl bg-white p-8 border border-[color:var(--border)]">
                  <div className="font-serif text-5xl text-[color:var(--wine)] leading-none">{r.metric}</div>
                  <div className="mt-3 eyebrow text-[color:var(--rose)]">{r.label}</div>
                  <div className="mt-6 pt-5 border-t border-[color:var(--border)] text-sm text-[color:var(--ink)]/85">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-[color:var(--muted-fg)] text-xs">{r.handle}</div>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length > 0 && (
              <div className="mt-10 grid md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <figure key={t.name} className="rv rounded-2xl bg-white p-8 border border-[color:var(--border)]">
                    <blockquote className="serif-italic text-lg text-[color:var(--ink)]/90 leading-snug">{t.quote}</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-[color:var(--border)] text-sm">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-[color:var(--muted-fg)] text-xs">{t.handle}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 05 — VIDEO 3 + CALL */}
      <section id="call" aria-labelledby="offer-heading" className="scroll-mt-20 bg-[color:var(--cream2)] py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <SectionIndex index="05" label="Der nächste Schritt" />
            <h2
              id="offer-heading"
              className="rv d1 mt-6 font-serif text-[2.3rem] sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight"
            >
              Schau dir das an, dann{" "}
              <span className="serif-italic text-[color:var(--rose)]">sprechen wir.</span>
            </h2>
            <p className="rv d2 mt-6 text-[color:var(--muted-fg)] max-w-xl leading-relaxed">
              Creating Society startet mit einer ersten, bewusst kleinen Gruppe. Wer dabei sein
              möchte, geht durch ein Gespräch. Wir schauen uns deine Ausgangslage an, klären deine
              Positionierung und dein mögliches Angebot.
            </p>
          </div>

          <div className="rv d3 mt-12">
            <VideoBlock videoId="offer-3" label="Video 3 · Bevor du buchst" />
          </div>

          <div className="rv d4 mt-14 border-t border-[color:var(--border)] pt-12 text-center">
            <p className="eyebrow text-[color:var(--rose)]">Early Access</p>
            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">Strategiegespräch</h3>
            <p className="mt-4 text-[color:var(--muted-fg)] max-w-xl mx-auto leading-relaxed text-[15px]">
              Persönlich, ohne Verkaufsdruck. Du gehst mit einem klaren nächsten Schritt raus,
              unabhängig davon, ob wir zusammenarbeiten.
            </p>
            <div className="mt-8">
              <CallButton>Strategiegespräch buchen</CallButton>
            </div>
          </div>
        </div>
      </section>

      {/* LAURAS STORY */}
      <section aria-labelledby="story-heading" className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="mx-auto max-w-[680px] px-5 sm:px-8">
          <div className="rv">
            <p className="eyebrow text-[color:var(--rose)]">Hinter Creating Society</p>
            <h2 id="story-heading" className="mt-5 font-serif text-[2.2rem] sm:text-5xl tracking-tight leading-[1.06]">
              Hey, ich bin <span className="serif-italic text-[color:var(--rose)]">Laura.</span>
            </h2>
          </div>

          <div className="rv d1 mt-8 space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[16px]">
            <p>Ich erzähle dir kurz, wie das hier entstanden ist. Es dauert zwei Minuten und erklärt vermutlich mehr als jede Auflistung von Modulen.</p>
            <p>Vor ein paar Jahren habe ich angefangen, Content zu machen, ohne Plan, einfach weil es mir Spaß gemacht hat. Irgendwann kam Reichweite dazu. Von außen sah das nach genau dem aus, was viele online aufbauen wollen.</p>
          </div>

          <StoryImage
            src={workImg}
            alt="Laura bei der Arbeit an ihrem Laptop"
            caption="Damals: viel Arbeit, viele Views, wenig Struktur dahinter."
          />

          <div className="rv space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[16px]">
            <p className="serif-italic text-xl text-[color:var(--wine)]">Nur hat sich das lange nicht auf meinem Konto gezeigt.</p>
            <p>Ich hatte ein Publikum, aber kein Business. Das sind zwei verschiedene Dinge. Kooperationen zahlten einmal, kosteten Wochen Abstimmung und waren im nächsten Monat wieder weg. Jedes Mal fing ich bei null an.</p>
            <p>Irgendwann war der Punkt erreicht, an dem ich gemerkt habe: Ich optimiere seit Jahren auf die falsche Zahl. Nicht Views entscheiden, sondern was hinter den Views steht.</p>
            <p>Also habe ich aufgehört, mehr Content zu produzieren, und angefangen, etwas Eigenes zu bauen. Ich habe geklärt, wobei ich Menschen wirklich helfen kann, daraus ein Angebot entwickelt und es verkauft, bevor es fertig war.</p>
          </div>

          <StoryImage
            src={walkImg}
            alt="Laura unterwegs"
            caption="Heute arbeite ich von dort, wo ich gerade bin."
          />

          <div className="rv space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[16px]">
            <p>An meinem Content hat sich dabei erstaunlich wenig geändert. Verändert hat sich, dass hinter der Aufmerksamkeit endlich etwas stand, das mir gehört.</p>
            <p>Und ehrlich: Das Beste daran ist nicht das Geld. Es ist, dass ich nicht mehr für jeden Euro neu verhandeln muss. Ich baue einmal etwas auf und arbeite dann daran, es besser zu machen, statt jeden Monat wieder von vorne anzufangen.</p>
            <p>Genau das gebe ich jetzt weiter. Ich habe Creating Society gebaut, weil ich glaube, dass fast jede Frau etwas hat, wofür andere zahlen würden. Du musst dafür nicht die Beste in deinem Feld sein. Du musst nur ein Stück weiter sein als die, der du hilfst.</p>
            <p>Egal ob Fotografie, Finanzen, Fitness, Sprachen, Design, Organisation oder etwas, das du bisher gar nicht als Wissen betrachtet hast. Für fast alles gibt es Menschen, die es lernen wollen.</p>
            <p className="serif-italic text-lg text-[color:var(--wine)]">Ich verspreche dir nicht, dass es leicht oder passiv ist. Es ist Arbeit. Aber es ist Arbeit, die sich aufbaut.</p>
            <p>Laura</p>
          </div>

          <div className="rv mt-10">
            <img
              src={lauraImg}
              alt="Porträt von Laura"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-2xl"
            />
          </div>

          <div className="rv mt-10 text-center">
            <CallButton>Strategiegespräch buchen</CallButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-[color:var(--cream2)] py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 id="faq-heading" className="rv font-serif text-3xl sm:text-4xl tracking-tight text-center">
            Häufige <span className="serif-italic text-[color:var(--rose)]">Fragen.</span>
          </h2>
          <div className="rv d1 mt-12">
            <Accordion type="single" collapsible className="w-full">
              {[
                ["Ich habe noch keine oder kaum Reichweite. Ist das ein Problem?", "Nein. Creating Society ist genau dafür gemacht. Du brauchst kein großes Publikum, um zu starten. Reichweite bauen wir gezielt mit auf, sie ist der Weg, nicht die Voraussetzung."],
                ["Ich möchte mein Gesicht nicht zeigen. Geht das trotzdem?", "Ja. Viele Konzepte funktionieren komplett faceless. Wir entwickeln gemeinsam ein Format, das zu dir passt."],
                ["Ich habe noch keine Idee, was ich verkaufen könnte.", "Das ist der häufigste Startpunkt. In den ersten Wochen finden wir heraus, welches Angebot zu deinen Fähigkeiten und dem Bedarf deiner Zielgruppe passt."],
                ["Wie viel Zeit brauche ich pro Woche?", "Plane 5 bis 10 Stunden ein. Das Programm ist neben Job oder Studium machbar."],
                ["Was kostet Creating Society?", "Das besprechen wir im Gespräch, weil wir zuerst prüfen, ob das Programm zu deiner Ausgangslage passt."],
                ["Was ist mit Early Access gemeint?", "Wir starten mit einer bewusst kleinen ersten Gruppe, die enger begleitet wird. Die Plätze dafür sind begrenzt und werden über das Gespräch vergeben."],
              ].map(([q, a], i) => (
                <AccordionItem key={q} value={`item-${i}`} className="border-b border-[color:var(--border)]">
                  <AccordionTrigger className="text-left font-serif text-lg sm:text-xl hover:no-underline py-6">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[color:var(--muted-fg)] leading-relaxed text-[15px] pb-6">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* PS */}
      <section aria-labelledby="ps-heading" className="bg-[color:var(--wine)] text-[color:var(--cream)] py-24 md:py-28 grain">
        <div className="mx-auto max-w-[640px] px-5 sm:px-8">
          <h2 id="ps-heading" className="sr-only">Ein letzter Gedanke von Laura</h2>
          <div className="rv space-y-5 leading-relaxed text-[color:var(--cream)]/85 text-[15px] sm:text-base">
            <p className="serif-italic text-2xl text-[color:var(--rose)]">PS.</p>
            <p>Wenn du bis hierher gescrollt hast, denkst du dir vielleicht: Warum gibst du das überhaupt weiter, wenn es so gut funktioniert?</p>
            <p>Faire Frage. Die ehrliche Antwort ist: Mein eigenes Business läuft weiter, unabhängig davon. Das hier nimmt mir nichts weg.</p>
            <p>Was ich aber jeden Tag in meinen Nachrichten sehe, sind Frauen, die etwas können und es verschenken, weil ihnen niemand gezeigt hat, wie man daraus ein Angebot macht. Genau da will ich ansetzen.</p>
            <p>Deshalb starten wir klein. Die erste Gruppe wird eng begleitet, und dafür gibt es nur eine begrenzte Anzahl Plätze.</p>
            <p className="serif-italic text-[color:var(--cream)]">Wenn du wissen willst, ob du dazugehörst, buch dir ein Gespräch.</p>
            <p className="serif-italic">Bis gleich, Laura</p>
          </div>
          <div className="rv d1 mt-10 text-center">
            <CallButton tone="cream">Strategiegespräch buchen</CallButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[color:var(--ink)] text-[color:var(--cream)]/70 py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-6 sm:grid-cols-[1fr_auto] items-center">
          <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto shrink-0 self-start object-contain" />
          <div className="flex gap-6 text-xs tracking-[0.15em] uppercase">
            <Link to="/impressum" className="hover:text-[color:var(--cream)]">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-[color:var(--cream)]">Datenschutz</Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-[color:var(--cream)]/40 leading-relaxed max-w-3xl">
            Ergebnisse sind nicht garantiert und hängen von Einsatz, Erfahrung und Marktbedingungen ab.
            Genannte Zahlen sind Beispiele, keine Zusage.
          </p>
        </div>
      </footer>
    </main>
  );
}
