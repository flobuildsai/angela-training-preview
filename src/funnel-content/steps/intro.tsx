import { useEffect, useState } from "react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import { useFunnel } from "../FunnelContext";
import { NICHE_SUGGESTIONS } from "../niches";
import { Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";
import { trackEvent } from "@/lib/track";

/** Step 1 — Hero + Nischen-Einstieg */
export function StepHero() {
  const { data, update, next } = useFunnel();
  const [niche, setNiche] = useState(data.niche);

  const start = () => {
    if (!niche.trim()) return;
    update({ niche: niche.trim() });
    trackEvent("content_funnel_start", { niche: niche.trim() });
    next();
  };

  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      {/* 1. Hero — links gesetzt, asymmetrisch */}
      <header className="space-y-6">
        <StepLabel>Ein neuer Weg mit Content</StepLabel>
        <h1 className="font-serif text-[2.6rem] sm:text-[4.25rem] leading-[0.98] tracking-[-0.03em] text-[color:var(--ink)]">
          Verdiene 10.000&nbsp;€ pro Monat
          <span className="block serif-italic text-[color:var(--muted-fg)]">
            mit Content.
          </span>
        </h1>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-[46ch] text-[15px] sm:text-[17px] leading-[1.7] text-[color:var(--muted-fg)]">
            Ohne große Reichweite und ohne Brand Deals. Ich zeige dir das
            Modell, mit dem ich mein eigenes Angebot aufgebaut habe, und wie du
            in 12 Wochen startest.
          </p>
          <div className="flex gap-6 border-t border-[color:var(--ink)]/12 pt-4 sm:border-t-0 sm:pt-0">
            {[
              ["2", "Minuten"],
              ["6", "Fragen"],
              ["12", "Wochen"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-2xl leading-none tabular-nums text-[color:var(--ink)]">
                  {n}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Story */}
      <section className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
        <div className="sm:sticky sm:top-28 sm:self-start">
          <img
            src={lauraNew.url}
            alt="Laura, Gründerin von Creating Society"
            className="h-24 w-24 rounded-full border border-[color:var(--ink)]/10 object-cover object-[50%_30%] sm:h-32 sm:w-32"
            loading="eager"
            width={240}
            height={240}
          />
          <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
            Laura, Gründerin
          </p>
        </div>

        <div className="space-y-5 text-[15px] sm:text-[16.5px] leading-[1.8] text-[color:var(--ink)]/90">
          <p className="font-serif text-2xl leading-snug text-[color:var(--ink)] sm:text-[1.9rem]">
            Ganz ehrlich gesagt: das sagt dir sonst niemand.
          </p>
          <p>
            Ich habe nicht davon geträumt, Creatorin zu werden. Ich habe einfach
            angefangen zu posten, weil ich etwas zu sagen hatte. Und irgendwann
            ging es los: Millionen Views im Monat, Reels, die weit über meine
            Follower hinaus liefen, Nachrichten von Menschen, die ich nie
            getroffen habe.
          </p>
          <p>
            Lange dachte ich, das sei der Plan. Reichweite aufbauen, dann kommen
            die Marken, dann kommt das Geld. Also habe ich genau das gemacht.
            Kooperationen verhandelt, Briefings umgesetzt, Freigaben abgewartet.
            Und ehrlich? Es funktioniert. Langsam. Anstrengend. Aber es
            funktioniert.
          </p>
          <p>
            Was alles verändert hat, war etwas, das ich nebenbei gemerkt habe.
            Die Leute, die wirklich frei waren, die reisen, entspannt arbeiten
            und sich keine Gedanken über die nächste Kooperation machen, waren
            nicht die mit den meisten Followern.
          </p>
          <p className="border-l-2 border-[color:var(--ink)] pl-5 font-serif text-xl leading-snug text-[color:var(--ink)] sm:text-2xl">
            Es waren die mit einem eigenen Angebot.
          </p>
          <p>
            Kein Warten auf Brand Deals. Kein Algorithmus, der über den Monat
            entscheidet. Einfach etwas Eigenes, das Menschen kaufen können. Das
            hat mich härter getroffen, als ich zugeben will. Weil ich Jahre
            damit verbracht hatte, Reichweite zu bauen, während der schnellere
            Weg die ganze Zeit direkt daneben lag.
          </p>
          <p>
            Ich tue nicht so, als wäre das ein Knopf, den man drückt. Das ist
            ein echtes Business. Aber es ist eins, das du wirklich starten
            kannst, in deiner Nische, in den nächsten 12 Wochen, ohne 100.000
            Follower. Du brauchst nur jemanden, der dir zeigt, wie es von innen
            funktioniert.
          </p>
          <p className="serif-italic pt-2 text-xl text-[color:var(--ink)]">
            Laura
          </p>
        </div>
      </section>

      {/* 3. Reframe */}
      <section className="grid gap-px overflow-hidden rounded-[1.5rem] bg-[color:var(--ink)]/10 sm:grid-cols-2">
        <div className="bg-[color:var(--cream2)] p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
            Was die meisten denken
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted-fg)] line-through decoration-[color:var(--muted-fg)]/40">
            Mehr Follower, dann Brand Deals, dann irgendwann davon leben
          </p>
        </div>
        <div className="bg-[color:var(--ink)] p-6 text-white sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">
            Was wirklich funktioniert
          </p>
          <p className="mt-4 text-[15px] font-medium leading-relaxed">
            Eigenes Angebot, Content der verkauft, Umsatz ab der ersten Woche
          </p>
        </div>
      </section>

      {/* 4. Nischen-Eingabe */}
      <section className="space-y-6 border-t border-[color:var(--ink)]/12 pt-10">
        <div className="space-y-3">
          <StepLabel>Dein Start</StepLabel>
          <h2 className="font-serif text-[1.9rem] leading-tight tracking-[-0.02em] text-[color:var(--ink)] sm:text-[2.4rem]">
            Schauen wir, wie das in deiner Nische aussieht.
          </h2>
          <Sub>
            Schreib einfach rein, worüber du postest. Ich zeige dir die echten
            Zahlen für diesen Bereich.
          </Sub>
        </div>

        <div>
          <label htmlFor="niche" className="sr-only">
            Deine Nische
          </label>
          <input
            id="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            placeholder="Fitness, Mindset, Beauty …"
            className="w-full border-0 border-b border-[color:var(--ink)]/15 bg-transparent px-1 py-4 font-serif text-2xl text-[color:var(--ink)] transition placeholder:text-[color:var(--muted-fg)]/40 focus:border-[color:var(--ink)] focus:outline-none sm:text-3xl"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {NICHE_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setNiche(s)}
              className={`rounded-full border px-4 py-2 text-xs transition active:scale-[0.97] ${
                niche === s
                  ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                  : "border-[color:var(--ink)]/12 text-[color:var(--muted-fg)] hover:border-[color:var(--ink)]/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <PrimaryCTA onClick={start} disabled={!niche.trim()}>
          Zeig mir, was möglich ist
        </PrimaryCTA>

        <Micro>
          2 Minuten <span className="opacity-40">·</span> keine Anmeldung{" "}
          <span className="opacity-40">·</span> auf deine Nische zugeschnitten
        </Micro>
      </section>
    </div>
  );
}

const STATUS = [
  "Nachfrage in deiner Nische prüfen",
  "Typische Angebote und Preise vergleichen",
  "Formate analysieren, die dort funktionieren",
  "Deine persönliche Auswertung vorbereiten",
];

/** Step 2 — Analyse-Animation */
export function StepAnalysis() {
  const { next, profile, data } = useFunnel();
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const timers = STATUS.map((_, i) =>
      setTimeout(() => setDone((d) => [...d, i]), 650 * (i + 1)),
    );
    const finish = setTimeout(() => next(), 650 * STATUS.length + 900);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [next]);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <StepLabel>Analyse</StepLabel>
        <Head>Ich schaue mir „{data.niche || profile.label}“ kurz an.</Head>
      </div>

      <ul className="divide-y divide-[color:var(--ink)]/10 border-y border-[color:var(--ink)]/10">
        {STATUS.map((s, i) => {
          const isDone = done.includes(i);
          return (
            <li key={s} className="flex items-center gap-4 py-5">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] transition-all duration-500 ${
                  isDone
                    ? "scale-100 bg-[color:var(--ink)] text-white"
                    : "scale-90 border border-[color:var(--ink)]/15 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={`text-[15px] transition-colors duration-500 sm:text-base ${
                  isDone
                    ? "text-[color:var(--ink)]"
                    : "text-[color:var(--muted-fg)]/50"
                }`}
              >
                {s}
              </span>
              {!isDone && (
                <span
                  aria-hidden
                  className="ml-auto h-px w-10 animate-pulse bg-[color:var(--ink)]/20"
                />
              )}
            </li>
          );
        })}
      </ul>

      <Micro>Einen Moment, das dauert nur wenige Sekunden.</Micro>
    </div>
  );
}
