import { useEffect, useState } from "react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import { useFunnel } from "../FunnelContext";
import { NICHE_SUGGESTIONS } from "../niches";
import { Card, Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";
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

  const nicheCTA = (
    <section className="relative">
      <div
        aria-hidden
        className="absolute inset-0 -mx-4 sm:-mx-8 rounded-[2rem] bg-gradient-to-b from-[color:var(--cream2)] to-transparent blur-2xl opacity-80"
      />
      <div className="relative space-y-5 max-w-lg mx-auto px-1 py-2">
        <div className="space-y-2">
          <p className="serif-italic text-[13px] text-[color:var(--muted-fg)]">
            eine Sache noch, bevor ich dir etwas zeige …
          </p>
          <h2 className="serif-italic text-2xl sm:text-[1.75rem] leading-snug text-[color:var(--ink)]">
            Schauen wir, wie das in deiner Nische aussehen könnte.
          </h2>
          <p className="text-[14px] leading-relaxed text-[color:var(--muted-fg)]">
            Schreib einfach rein, worüber du postest. Ich zeige dir die echten
            Zahlen für diesen Bereich.
          </p>
        </div>

        <div className="relative">
          <label htmlFor="niche" className="sr-only">
            Deine Nische
          </label>
          <input
            id="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            placeholder="Fitness, Mindset, Beauty …"
            className="w-full bg-transparent border-0 border-b border-[color:var(--border)] px-1 py-3 text-lg sm:text-xl text-[color:var(--ink)] placeholder:text-[color:var(--muted-fg)]/50 focus:outline-none focus:border-[color:var(--rose)] transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {NICHE_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setNiche(s)}
              className={`px-3.5 py-2 rounded-full text-xs border transition ${
                niche === s
                  ? "border-[color:var(--rose)] bg-[color:var(--rose)]/10 text-[color:var(--wine)]"
                  : "border-[color:var(--border)] text-[color:var(--muted-fg)] hover:border-[color:var(--rose)]"
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
          2 Minuten <span className="opacity-50">·</span> keine Anmeldung{" "}
          <span className="opacity-50">·</span> auf deine Nische zugeschnitten
        </Micro>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {/* 1. Reframe-Headline */}
      <header className="text-center space-y-4 px-1 pt-2">
        <StepLabel>Ein neuer Weg mit Content</StepLabel>
        <Head>
          Verdiene 10.000&nbsp;€ pro Monat mit Content.
          <span className="block text-[color:var(--muted-fg)] mt-1">
            Ohne große Reichweite und ohne Brand Deals.
          </span>
        </Head>
        <Sub>
          Die meisten glauben, sie brauchen erst Hunderttausende Follower, damit
          Content Geld bringt. Stimmt nicht. Ich zeige dir das Modell, mit dem
          ich mein eigenes Angebot aufgebaut habe, und wie du in 12 Wochen
          startest.
        </Sub>
      </header>

      {/* 2. Story im Tagebuch-Stil */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={lauraNew.url}
            alt="Laura, Gründerin von Creating Society"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-[50%_30%] border border-[color:var(--border)] shrink-0"
            loading="eager"
            width={200}
            height={200}
          />
          <div>
            <p className="text-lg sm:text-xl font-semibold text-[color:var(--ink)]">
              Ganz ehrlich gesagt:
            </p>
            <p className="text-[13px] text-[color:var(--muted-fg)] mt-0.5">
              Lies das kurz, bevor du weiterscrollst. Das sagt dir sonst niemand.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-[15px] sm:text-base leading-[1.75] text-[color:var(--ink)]/90 max-w-2xl">
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
            nicht die mit den meisten Followern.{" "}
            <span className="font-semibold text-[color:var(--ink)]">
              Es waren die mit einem eigenen Angebot.
            </span>{" "}
            Kein Warten auf Brand Deals. Kein Algorithmus, der über den Monat
            entscheidet. Einfach etwas Eigenes, das Menschen kaufen können.
          </p>
          <p>
            Das hat mich härter getroffen, als ich zugeben will. Weil ich Jahre
            damit verbracht hatte, Reichweite zu bauen, während der schnellere
            Weg die ganze Zeit direkt daneben lag.
          </p>
          <p>
            Ich tue nicht so, als wäre das ein Knopf, den man drückt. Das ist ein
            echtes Business. Aber es ist eins, das du wirklich starten kannst,
            in deiner Nische, in den nächsten 12 Wochen, ohne 100.000 Follower.
            Und du musst dafür nicht die Lauteste sein. Du brauchst nur jemanden,
            der dir zeigt, wie es von innen funktioniert.
          </p>
          <p>
            Genau deshalb gibt es das hier. Ich habe es für die Version von mir
            gebaut, die wusste, dass da mehr geht, aber niemanden hatte, der
            erklärt, wie man anfängt. In den nächsten zwei Minuten zeige ich dir,
            wie das für dich aussehen könnte.
          </p>

          <div className="pt-3">
            <p className="serif-italic text-xl text-[color:var(--ink)]">Laura</p>
            <div className="h-px w-20 bg-[color:var(--ink)]/30 mt-3" />
          </div>
        </div>
      </section>

      {/* 3. Reframe-Block */}
      <section className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--cream2)] p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-wider text-[color:var(--muted-fg)] font-medium mb-2">
            Was die meisten denken
          </p>
          <p className="text-[14px] text-[color:var(--muted-fg)] line-through decoration-[color:var(--muted-fg)]/50">
            Mehr Follower → Brand Deals → irgendwann davon leben
          </p>
        </div>
        <div className="rounded-xl border-2 border-[color:var(--ink)]/15 bg-white p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-wider text-[color:var(--ink)]/70 font-semibold mb-2">
            Was wirklich funktioniert
          </p>
          <p className="text-[14px] text-[color:var(--ink)] font-medium">
            Eigenes Angebot → Content, der verkauft → Umsatz ab der ersten
            Woche
          </p>
        </div>
      </section>

      {/* Haarlinie */}
      <div className="h-px w-16 bg-[color:var(--ink)]/10 mx-auto" />

      {/* 4. Nischen-Eingabe + CTA */}
      {nicheCTA}
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
    <div className="space-y-8">
      <div className="space-y-3">
        <StepLabel>Analyse</StepLabel>
        <Head>Ich schaue mir „{data.niche || profile.label}“ kurz an.</Head>
      </div>

      <Card>
        <ul className="space-y-4">
          {STATUS.map((s, i) => {
            const isDone = done.includes(i);
            return (
              <li key={s} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full grid place-items-center text-[11px] transition ${
                    isDone
                      ? "bg-[color:var(--wine)] text-[color:var(--cream)]"
                      : "border border-[color:var(--border)] text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={`text-[15px] transition ${
                    isDone
                      ? "text-[color:var(--ink)]"
                      : "text-[color:var(--muted-fg)]/60"
                  }`}
                >
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
      <Micro>Einen Moment, das dauert nur wenige Sekunden.</Micro>
    </div>
  );
}
