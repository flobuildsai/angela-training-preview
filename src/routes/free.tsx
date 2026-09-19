import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import proofViews15m from "@/assets/proof-views-15m.jpeg.asset.json";
import proofViews7m from "@/assets/proof-views-7m.jpeg.asset.json";
import proofStripe from "@/assets/proof-stripe.png.asset.json";
import { CourseMockup } from "@/components/CourseMockup";
import { FreeFooter, FreeHeader, useReveal } from "@/components/FreeShell";
import { FreeOptinModal } from "@/components/funnel/FreeOptinModal";
import { Button } from "@/components/ui/button";
import {
  COURSE_NAME,
  FAQ,
  FOR_WHOM,
  MODULES,
  NOT_FOR_WHOM,
  PROGRAM_PRICE,
  PROOF,
  VALUE_STACK,
} from "@/config/freeCourse";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/free")({
  head: () => ({
    meta: [
      { title: "Das Creating Society System — kostenlos | Creating Society" },
      {
        name: "description",
        content:
          "Das komplette System, mit dem Frauen aus Social Media ein eigenes digitales Business aufbauen. Teil unseres 1.500-€-Programms. Jetzt kostenlos — nur E-Mail, keine Kreditkarte.",
      },
      { property: "og:title", content: "Das Creating Society System — kostenlos" },
      {
        property: "og:description",
        content: "6 Module, Build-with-me: in 30 Tagen von nichts zu Positionierung, Produkt und Store. Ohne große Reichweite, ohne Brand Deals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreePage,
});

const PROOF_IMAGES: Record<(typeof PROOF)[number]["key"], string> = {
  views15m: proofViews15m.url,
  views7m: proofViews7m.url,
  stripe: proofStripe.url,
};

const totalWorth = VALUE_STACK.reduce((sum, v) => sum + Number(v.worth.replace(/[^\d]/g, "")), 0);
const eur = (n: number) => `${n.toLocaleString("de-DE")} €`;

function FreePage() {
  useReveal();
  const [optinOpen, setOptinOpen] = useState(false);
  useEffect(() => {
    trackEvent("free_page_view");
  }, []);

  return (
    <main className="bg-[color:var(--background)] text-[color:var(--ink)]">
      <FreeHeader
        right={
          <Button
            type="button"
            onClick={() => setOptinOpen(true)}
            size="sm"
          >
            Kostenlos starten
          </Button>
        }
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative mx-4 min-h-[88vh] overflow-hidden rounded-card text-pure-white lg:min-h-screen">
        <img src={lauraNew.url} alt="Laura Mercedes bei der Arbeit" className="absolute inset-0 h-full w-full object-cover object-[center_25%]" />
        <div className="website-photo-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1120px] items-end px-5 pb-14 sm:px-8 sm:pb-20 lg:min-h-screen">
          <div className="max-w-[850px] rv">
          <p className="funnel-eyebrow text-pure-white/80">
            Teil unseres {eur(PROGRAM_PRICE)}-Programms · jetzt kostenlos
          </p>
          <h1 className="mt-5 max-w-[13ch] font-display text-[38px] font-medium leading-[1.02] tracking-[-0.02em] sm:text-[52px] lg:text-[64px]">
            Das komplette System, mit dem Frauen aus Social Media{" "}
            <span>ein Business machen</span><span className="ember-dot">.</span>
          </h1>
          <p className="mt-6 max-w-[680px] text-[19px] leading-[1.5] text-pure-white/90">
            Du kommst mit nichts rein. Nach 30 Tagen hast du Positionierung, Personal Brand, Content-System,
            dein erstes Produkt und einen Store, der verkauft. Sechs Module, Build-with-me — bisher nur für
            unsere Programm-Teilnehmerinnen. Ohne große Reichweite. Ohne Brand Deals. Ohne Haken, den wir verstecken.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Button id="zugang" type="button" onClick={() => setOptinOpen(true)} size="lg" className="bg-pure-white px-[18px] py-3 text-near-black hover:bg-pure-white/90">Kostenlosen Zugang holen</Button>
            <a href="#warum-kostenlos" className="text-sm font-medium text-pure-white underline-offset-4 hover:underline">Warum ist das kostenlos? ↓</a>
          </div>
          </div>
        </div>
      </section>

      {/* ── Warum kostenlos ────────────────────────────────── */}
      <section id="warum-kostenlos" className="scroll-mt-8">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="rv">
            <div className="flex items-center gap-4">
              <img src={lauraPortrait.url} alt="Laura" className="h-16 w-16 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-serif text-xl">Ganz ehrlich gesagt:</p>
                <p className="text-sm text-[color:var(--muted-fg)]">Lies das, bevor du dich einträgst.</p>
              </div>
            </div>
            <h2 className="mt-8 font-serif text-3xl leading-[1.08] sm:text-5xl">
              Warum wir verschenken, wofür andere{" "}
               <span>{eur(PROGRAM_PRICE)} bezahlt haben</span><span className="ember-dot">.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-[color:var(--muted-fg)] sm:text-[17px] rv d1">
            <p>
              Jeder wittert bei „kostenlos" einen Haken. Deshalb nenne ich ihn selbst: Ein Teil der
              Frauen, die dieses System durcharbeiten, will danach mit uns weitermachen — im
              12-Wochen-Programm, mit persönlicher Begleitung. Das ist unser Geschäft.
            </p>
            <p>
              Aber ich habe keine Lust mehr auf Webinare, die 45 Minuten lang nichts sagen und dann
              verkaufen. Ich zeige lieber, wie wir arbeiten. Wenn du das System allein umsetzt, hast du
              alles, was du brauchst. Wenn du es schneller willst, reden wir. Nach Modul 3, einmal,
              ohne Countdown.
            </p>
            <p className="font-medium text-[color:var(--ink)]">
              Keine Anrufe. Keine Kreditkarte. Kein „nur noch heute". Nur das System — und die
              Entscheidung, es zu benutzen.
            </p>
            <p className="pt-2 font-serif text-2xl">— Laura</p>
          </div>
        </div>
      </section>

      {/* ── Belief Shift ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rv">
            <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Was die meisten denken</p>
            <ol className="mt-6 space-y-3 font-serif text-2xl text-[color:var(--muted-fg)] line-through decoration-[color:var(--rose)]/60 sm:text-3xl">
              <li>Follower sammeln</li>
              <li>Auf Brand Deals warten</li>
              <li>Irgendwann davon leben</li>
            </ol>
          </div>
          <div className="rv d1">
            <p className="eyebrow rule-label text-[color:var(--rose)]">Was wirklich funktioniert</p>
            <ol className="mt-6 space-y-3 font-serif text-2xl sm:text-3xl">
              <li>Positionierung, die man versteht</li>
              <li>Ein eigenes Produkt, das gekauft wird</li>
              <li>Ein Verkaufssystem, das ohne dich läuft</li>
            </ol>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
              2.000 richtige Follower sind mehr wert als 200.000 falsche. Der Gegner ist nicht der
              Algorithmus. Der Gegner ist fehlende Strategie.
            </p>
          </div>
        </div>
      </section>

      {/* ── Die 6 Module ───────────────────────────────────── */}
      <section className="bg-pressed-graphite text-pure-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div className="rv">
              <p className="eyebrow opacity-70">Was drin ist</p>
              <h2 className="mt-6 font-serif text-3xl leading-[1.06] sm:text-5xl">
                {COURSE_NAME}. <span className="serif-italic">Sechs Module, ein Ergebnis.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed opacity-75 sm:text-[17px]">
                Kein Kurs zum Anschauen. Jedes Modul endet mit einem Ergebnis — und du gehst erst
                weiter, wenn du es hast. Du baust, während du schaust. Laura baut mit.
              </p>
              <CourseMockup className="mt-12 hidden lg:block" />
            </div>
            <ol className="divide-y divide-white/15 border-y border-white/15 rv d1">
              {MODULES.filter((m) => m.n > 0).map((m) => (
                <li key={m.n} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr]">
                   <span className="text-2xl text-pure-white/60">0{m.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug sm:text-[1.75rem]">
                      {m.title} <span className="serif-italic opacity-70">{m.italic}</span>
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed opacity-70 sm:text-[15px]">{m.body}</p>
                     <p className="mt-3 text-caption font-medium text-pure-white/70">Ergebnis: <span className="text-pure-white/85">{m.result}</span></p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Value Stack ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl rv">
          <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Was du bekommst</p>
          <h2 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-5xl">
            Alles zusammen: <span className="serif-italic text-[color:var(--rose)]">{eur(totalWorth)}.</span>{" "}
             Heute: 0 €<span className="ember-dot">.</span>
          </h2>
          <div className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {VALUE_STACK.map((v) => (
              <div key={v.label} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                <div>
                  <p className="text-[15px] leading-snug sm:text-[17px]">{v.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">{v.note}</p>
                </div>
                <p className="font-serif text-xl text-[color:var(--muted-fg)] line-through decoration-[color:var(--rose)]/60 sm:text-2xl">
                  {v.worth}
                </p>
              </div>
            ))}
            <div className="grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
              <p className="font-serif text-2xl">Dein Preis</p>
                 <p className="font-display text-4xl font-medium">0 €</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[color:var(--muted-fg)]">
            Die Werte entsprechen dem Anteil am Programmpreis von {eur(PROGRAM_PRICE)} und unseren
            Einzelpreisen für Vorlagen und Gespräche. Kein erfundener Streichpreis.
          </p>
          <div className="mt-10 flex justify-center">
             <Button
              type="button"
              onClick={() => setOptinOpen(true)}
               size="lg"
            >
              Kostenlosen Zugang holen
             </Button>
          </div>
        </div>
      </section>

      {/* ── So läuft es ────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl rv">
            <p className="eyebrow rule-label text-[color:var(--muted-fg)]">So läuft es</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-5xl">
              Drei Schritte. <span className="serif-italic text-[color:var(--rose)]">Der erste dauert 20 Sekunden.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              ["01", "E-Mail eintragen", "Vorname, E-Mail, fertig. Keine Karte, keine Telefonnummer."],
              ["02", "Sofort anfangen zu bauen", "Start und Modul 1 sind direkt offen. Die weiteren Module folgen im Takt deines 30-Tage-Plans."],
              ["03", "Mit Store rausgehen — mit oder ohne uns", "Nach 30 Tagen: Positionierung, Profil, Produkt, Store. Nach Modul 3 fragen wir einmal, ob du ein Gespräch willst."],
            ].map(([n, t, b], i) => (
               <div key={n} className={`rv d${i + 1} rounded-card bg-pure-white p-8 shadow-xl`}>
                 <span className="text-caption font-medium text-slate">{n}</span>
                <h3 className="mt-3 font-serif text-2xl">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--muted-fg)]">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beweis ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="rv">
            <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Ein Account, bei null gestartet</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-5xl">
              Das ist kein Kurs über Theorie. <span className="serif-italic text-[color:var(--rose)]">Das ist der Weg.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[color:var(--muted-fg)] sm:text-[17px]">
              Laura hat monatelang Content gemacht, Millionen Views gesammelt und trotzdem kaum
              verdient. Bis sie ein eigenes Angebot hatte. Dann kamen die ersten Verkäufe innerhalb
              weniger Wochen. Genau dieser Weg ist das System.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 rv d1">
            {PROOF.map((p) => (
              <figure key={p.key} className="min-w-0">
                 <div className="aspect-[4/5] overflow-hidden rounded-card bg-pure-white shadow-xl">
                  <img src={PROOF_IMAGES[p.key]} alt={p.claim} loading="lazy" className="h-full w-full object-contain p-2" />
                </div>
                <figcaption className="mt-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">{p.when}</p>
                  <p className="font-serif text-base sm:text-lg">{p.claim}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Für wen / nicht ────────────────────────────────── */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div className="rv">
            <p className="eyebrow rule-label text-[color:var(--rose)]">Für dich, wenn</p>
            <ul className="mt-6 space-y-4">
              {FOR_WHOM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] leading-relaxed sm:text-[17px]">
                   <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rv d1">
            <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Nicht für dich, wenn</p>
            <ul className="mt-6 space-y-4 text-[color:var(--muted-fg)]">
              {NOT_FOR_WHOM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] leading-relaxed sm:text-[17px]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--muted-fg)]/50" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-[color:var(--muted-fg)]">
              Wir würden lieber, dass du dich nicht einträgst, als dass du dich einträgst und nichts
              damit machst. Das System funktioniert nur für die, die es benutzen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Laura ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="rv">
             <div className="mx-auto max-w-sm overflow-hidden rounded-card soft-shadow">
              <img src={lauraNew.url} alt="Laura, Gründerin von Creating Society" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="space-y-6 rv d1">
            <p className="pill">Wer das gebaut hat</p>
            <h2 className="font-serif text-4xl leading-[1.02] sm:text-6xl">
               Hi, ich bin Laura<span className="ember-dot">.</span>
            </h2>
            <div className="space-y-5 text-[15px] leading-relaxed text-[color:var(--muted-fg)] sm:text-[17px]">
              <p>
                Ich habe nicht davon geträumt, Creatorin zu werden. Ich habe angefangen zu posten,
                weil ich etwas zu sagen hatte. Irgendwann liefen Reels weit über meine Follower hinaus —
                und trotzdem blieb am Monatsende nichts hängen.
              </p>
              <p>
                Was alles verändert hat, war kein Trick. Es war ein eigenes Angebot. Seitdem zeige ich
                Frauen genau diesen Weg — Schritt für Schritt, ohne Hype, ohne „10k in 30 Tagen".
              </p>
              <p className="font-medium text-[color:var(--ink)]">
                Das System hier ist derselbe Weg. Nur dass du ihn jetzt vor dir hast, statt ihn selbst
                suchen zu müssen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="rv">
            <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Bevor du dich einträgst</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-5xl">
              Die Fragen, die alle stellen.
            </h2>
          </div>
          <div className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)] rv d1">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl sm:text-2xl">
                  <span>{f.q}</span>
                  <span className="text-[color:var(--muted-fg)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted-fg)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Abschluss ──────────────────────────────────────── */}
      <section className="relative grain">
        <img src={lauraWork.url} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[color:var(--wine)]/88" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center text-[color:var(--cream)] sm:px-8 sm:py-32">
          <div className="rv">
            <p className="eyebrow opacity-70">Jetzt starten</p>
            <h2 className="mt-6 font-serif text-3xl leading-[1.05] sm:text-6xl">
              Dein Content ist schon da.{" "}
              <span className="serif-italic">Jetzt kommt das System.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed opacity-80 sm:text-lg">
              Sechs Module, alle Vorlagen, Start sofort. In 30 Tagen hast du einen Store, der verkauft.
              Trag dich ein und fang heute an — nicht nächsten Monat.
            </p>
          </div>
          <div className="mt-10 flex justify-center rv d1">
             <Button type="button" size="lg" className="bg-pure-white text-pressed-graphite hover:bg-pure-white/90" onClick={() => setOptinOpen(true)}>Kostenlosen Zugang holen</Button>
          </div>
          <p className="mt-10 text-sm opacity-60">
            Du bist schon dabei?{" "}
            <Link to="/kurs" className="underline underline-offset-4 transition hover:opacity-100">
              Zum Kurs
            </Link>
          </p>
        </div>
      </section>

      <FreeFooter />

      {/* Mobile: fester CTA */}
       <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fog bg-cream-paper/95 p-3 backdrop-blur sm:hidden">
         <Button
          type="button"
          onClick={() => setOptinOpen(true)}
           className="w-full"
        >
          Kostenlosen Zugang holen
         </Button>
      </div>
       <FreeOptinModal open={optinOpen} onOpenChange={setOptinOpen} />
    </main>
  );
}
