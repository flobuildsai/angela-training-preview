import { useMemo } from "react";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import { formatEur, useFunnel } from "../FunnelContext";
import { Head, PrimaryCTA, Stat, StepLabel, Sub } from "../ui";

/** Step 8 — Opportunity Score + Nischen-Profil */
export function StepScore() {
  const { next, score, profile, monthlyViews, data } = useFunnel();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <StepLabel>Deine Auswertung</StepLabel>
        <Head>So steht dein Ausgangspunkt.</Head>
        <Sub>{profile.demand}</Sub>
      </div>

      {/* Score — großes Zahlenstatement statt Karte */}
      <section className="border-y border-[color:var(--ink)]/12 py-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
              Startpotenzial
            </p>
            <p className="mt-3 font-serif text-[4.5rem] leading-none tabular-nums tracking-[-0.03em] text-[color:var(--ink)] sm:text-[6rem]">
              {score}
              <span className="text-[1.75rem] text-[color:var(--muted-fg)]">
                /100
              </span>
            </p>
          </div>
          <p className="max-w-[30ch] text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
            {score >= 75
              ? "Du bringst fast alles mit. Dir fehlt nur das Angebot."
              : score >= 60
                ? "Gute Basis. Struktur und ein klares Angebot fehlen noch."
                : "Ehrlich: Du startest früh. Genau da ist der Aufbau am saubersten."}
          </p>
        </div>
        <div className="mt-8 h-[2px] overflow-hidden bg-[color:var(--ink)]/10">
          <div
            className="h-full bg-[color:var(--ink)] transition-[width] duration-1000 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ width: `${score}%` }}
          />
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <Stat
          label="Deine Nische"
          value={
            <span className="text-[1.75rem] sm:text-[2rem]">
              {data.niche || profile.label}
            </span>
          }
          note={profile.angle}
        />
        <Stat
          label="Realistische Reichweite pro Monat"
          value={`${monthlyViews.toLocaleString("de-DE")}`}
          note="Views bei konstanten Formaten in den nächsten Wochen."
        />
      </section>

      <section className="border-t border-[color:var(--ink)]/12 pt-7">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
          Was in deiner Nische gekauft wird
        </p>
        <ul className="mt-5 divide-y divide-[color:var(--ink)]/8">
          {profile.offers.map((o) => (
            <li
              key={o}
              className="py-4 text-[15px] leading-relaxed text-[color:var(--ink)] sm:text-base"
            >
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[14px] text-[color:var(--muted-fg)]">
          Übliche Preisspanne für ein erstes eigenes Angebot:{" "}
          <span className="text-[color:var(--ink)] tabular-nums">
            {formatEur(profile.priceMin)} – {formatEur(profile.priceMax)}
          </span>
        </p>
      </section>

      <PrimaryCTA onClick={next}>Weiter</PrimaryCTA>
    </div>
  );
}

const MYTHS = [
  {
    myth: "Ich brauche erst eine Million Follower.",
    truth:
      "Ein Angebot für 297 € braucht 34 Käufer im Monat für 10.000 €. Das geht mit einer kleinen, echten Community.",
  },
  {
    myth: "Ich brauche ein fertiges Produkt, bevor ich starte.",
    truth:
      "Du verkaufst zuerst das Ergebnis. Gebaut wird erst, wenn Menschen dafür bezahlt haben.",
  },
  {
    myth: "Ich brauche eine Agentur oder ein Team.",
    truth: "Du brauchst ein Format, ein Angebot und einen Verkaufsweg. Alles allein machbar.",
  },
  {
    myth: "Ich muss erst besser werden.",
    truth:
      "Menschen kaufen von Menschen, die zwei Schritte weiter sind. Nicht von Perfekten.",
  },
];

/** Step 9 — Belief-Shift */
export function StepBelief() {
  const { next } = useFunnel();
  return (
    <div className="space-y-12">
      <div className="overflow-hidden rounded-[1.75rem]">
        <img
          src={lauraWork.url}
          alt="Laura beim Arbeiten"
          className="h-52 w-full object-cover sm:h-72"
          loading="lazy"
          width={1200}
          height={800}
        />
      </div>

      <div className="space-y-4">
        <StepLabel>Bevor wir rechnen</StepLabel>
        <Head>Was du nicht brauchst, um zu starten.</Head>
      </div>

      <ul className="divide-y divide-[color:var(--ink)]/10 border-y border-[color:var(--ink)]/10">
        {MYTHS.map((m, i) => (
          <li key={m.myth} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
            <span className="font-serif text-2xl leading-none tabular-nums text-[color:var(--ink)]/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[15px] text-[color:var(--muted-fg)] line-through decoration-[color:var(--muted-fg)]/40">
                {m.myth}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--ink)] sm:text-[16.5px]">
                {m.truth}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <PrimaryCTA onClick={next}>Meine Zahlen berechnen</PrimaryCTA>
    </div>
  );
}

/** Step 10 — Einkommens-Rechner */
export function StepCalculator() {
  const { next, data, update, profile, monthlyViews } = useFunnel();

  const presets = useMemo(() => {
    const base = [97, 297, 697, 1997, 3997];
    return base.filter((p) => p >= profile.priceMin / 2);
  }, [profile.priceMin]);

  const monthly = data.price * data.buyers;
  const yearly = monthly * 12;
  const buyersFor10k = Math.max(1, Math.ceil(10000 / Math.max(data.price, 1)));
  const neededConversion = (buyersFor10k / Math.max(monthlyViews, 1)) * 100;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <StepLabel>Dein Rechner</StepLabel>
        <Head>Was ein eigenes Angebot bei dir bedeutet.</Head>
        <Sub>Verschieb die Werte, bis es sich für dich realistisch anfühlt.</Sub>
      </div>

      <section className="space-y-10 border-y border-[color:var(--ink)]/12 py-8">
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <label className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
              Preis deines Angebots
            </label>
            <span className="font-serif text-[2.5rem] leading-none tabular-nums text-[color:var(--ink)]">
              {formatEur(data.price)}
            </span>
          </div>
          <input
            type="range"
            min={47}
            max={4997}
            step={50}
            value={data.price}
            onChange={(e) => update({ price: Number(e.target.value) })}
            aria-label="Preis deines Angebots"
            className="w-full accent-[color:var(--ink)]"
          />
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update({ price: p })}
                className={`rounded-full border px-4 py-2 text-xs tabular-nums transition active:scale-[0.97] ${
                  data.price === p
                    ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                    : "border-[color:var(--ink)]/12 text-[color:var(--muted-fg)] hover:border-[color:var(--ink)]/40"
                }`}
              >
                {formatEur(p)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <label className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
              Käufer pro Monat
            </label>
            <span className="font-serif text-[2.5rem] leading-none tabular-nums text-[color:var(--ink)]">
              {data.buyers}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={data.buyers}
            onChange={(e) => update({ buyers: Number(e.target.value) })}
            aria-label="Käufer pro Monat"
            className="w-full accent-[color:var(--ink)]"
          />
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-[1.5rem] bg-[color:var(--ink)]/10 sm:grid-cols-2">
        <div className="bg-[color:var(--cream2)] p-7 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
            Pro Monat
          </p>
          <p className="mt-3 font-serif text-[2.75rem] leading-none tabular-nums text-[color:var(--ink)]">
            {formatEur(monthly)}
          </p>
        </div>
        <div className="bg-[color:var(--ink)] p-7 text-white sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">
            Pro Jahr
          </p>
          <p className="mt-3 font-serif text-[2.75rem] leading-none tabular-nums">
            {formatEur(yearly)}
          </p>
        </div>
      </section>

      <p className="border-l-2 border-[color:var(--ink)] pl-5 text-[15px] leading-[1.8] text-[color:var(--ink)] sm:text-[16.5px]">
        Für <span className="font-serif text-xl">10.000 €</span> im Monat
        brauchst du bei diesem Preis{" "}
        <span className="font-serif text-xl tabular-nums">
          {buyersFor10k} Käufer
        </span>
        . Bei deiner Reichweite von {monthlyViews.toLocaleString("de-DE")} Views
        entspricht das{" "}
        {neededConversion < 0.01
          ? "unter 0,01 %"
          : `${neededConversion.toFixed(2).replace(".", ",")} %`}{" "}
        der Menschen, die dich sehen.
      </p>

      <PrimaryCTA onClick={next}>Meinen 12-Wochen-Plan sehen</PrimaryCTA>
    </div>
  );
}
