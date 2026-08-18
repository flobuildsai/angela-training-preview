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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <StepLabel>2 Minuten · keine Anmeldung</StepLabel>
        <Head>
          Wie viel könntest du mit dem verdienen, was du sowieso postest?
        </Head>
        <Sub>
          Beantworte ein paar kurze Fragen. Am Ende siehst du deine Zahlen, deinen
          12-Wochen-Plan und kannst direkt ein Strategiegespräch buchen.
        </Sub>
      </div>

      <div className="rounded-2xl overflow-hidden">
        <img
          src={lauraNew.url}
          alt="Laura, Gründerin von Creating Society"
          className="w-full h-52 sm:h-64 object-cover object-[50%_35%]"
          loading="eager"
          width={1200}
          height={800}
        />
      </div>

      <Card className="bg-[color:var(--cream2)] border-transparent">
        <p className="serif-italic text-lg sm:text-xl leading-relaxed text-[color:var(--ink)]">
          Ich hatte irgendwann Millionen Views im Monat und habe damit fast nichts
          verdient. Brand Deals, die wochenlang gedauert und einmal gezahlt haben.
          Was alles verändert hat: ein eigenes Angebot statt noch mehr Reichweite.
        </p>
        <p className="mt-4 text-sm text-[color:var(--muted-fg)]">— Laura</p>
      </Card>

      <div className="space-y-4">
        <label
          htmlFor="niche"
          className="block font-serif text-2xl text-[color:var(--wine)]"
        >
          Worüber postest du oder würdest du gerne posten?
        </label>
        <input
          id="niche"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && start()}
          placeholder="z. B. Fitness, Mindset, Beauty …"
          className="w-full bg-transparent border-0 border-b border-[color:var(--border)] px-1 py-3 text-lg sm:text-xl text-[color:var(--ink)] placeholder:text-[color:var(--muted-fg)]/60 focus:outline-none focus:border-[color:var(--rose)] transition"
        />
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
        <Micro>Kostenlos · du bekommst sofort dein Ergebnis</Micro>
      </div>
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
