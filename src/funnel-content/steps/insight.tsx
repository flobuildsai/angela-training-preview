import { useMemo } from "react";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import { formatEur, useFunnel } from "../FunnelContext";
import { Card, Head, PrimaryCTA, StepLabel, Sub } from "../ui";

/** Step 8 — Opportunity Score + Nischen-Profil */
export function StepScore() {
  const { next, score, profile, monthlyViews, data } = useFunnel();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <StepLabel>Deine Auswertung</StepLabel>
        <Head>So steht dein Ausgangspunkt.</Head>
        <Sub>{profile.demand}</Sub>
      </div>

      <Card>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
              Startpotenzial
            </p>
            <p className="mt-2 font-serif text-5xl text-[color:var(--wine)]">
              {score}
              <span className="text-2xl text-[color:var(--muted-fg)]">/100</span>
            </p>
          </div>
          <p className="text-right text-sm text-[color:var(--muted-fg)] max-w-[45%]">
            {score >= 75
              ? "Du bringst fast alles mit. Dir fehlt nur das Angebot."
              : score >= 60
                ? "Gute Basis. Struktur und ein klares Angebot fehlen noch."
                : "Ehrlich: Du startest früh. Genau da ist der Aufbau am saubersten."}
          </p>
        </div>
        <div className="mt-5 h-[3px] bg-[color:var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[color:var(--rose)] transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
            Deine Nische
          </p>
          <p className="mt-2 font-serif text-2xl text-[color:var(--wine)]">
            {data.niche || profile.label}
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted-fg)]">{profile.angle}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
            Realistische Reichweite pro Monat
          </p>
          <p className="mt-2 font-serif text-2xl text-[color:var(--wine)]">
            {monthlyViews.toLocaleString("de-DE")} Views
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted-fg)]">
            Bei konstanten Formaten in den nächsten Wochen.
          </p>
        </Card>
      </div>

      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
          Was in deiner Nische gekauft wird
        </p>
        <ul className="mt-4 space-y-3">
          {profile.offers.map((o) => (
            <li key={o} className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-[color:var(--muted-fg)]">
          Übliche Preisspanne für ein erstes eigenes Angebot:{" "}
          <span className="text-[color:var(--ink)]">
            {formatEur(profile.priceMin)} – {formatEur(profile.priceMax)}
          </span>
        </p>
      </Card>

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
    <div className="space-y-8">
      <div className="rounded-2xl overflow-hidden">
        <img
          src={lauraWork.url}
          alt="Laura beim Arbeiten"
          className="w-full h-44 sm:h-56 object-cover"
          loading="lazy"
          width={1200}
          height={800}
        />
      </div>

      <div className="space-y-3">
        <StepLabel>Bevor wir rechnen</StepLabel>
        <Head>Was du nicht brauchst, um zu starten.</Head>
      </div>

      <div className="space-y-4">
        {MYTHS.map((m) => (
          <Card key={m.myth}>
            <p className="text-[15px] text-[color:var(--muted-fg)] line-through">
              {m.myth}
            </p>
            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[color:var(--ink)]">
              {m.truth}
            </p>
          </Card>
        ))}
      </div>

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
    <div className="space-y-8">
      <div className="space-y-3">
        <StepLabel>Dein Rechner</StepLabel>
        <Head>Was ein eigenes Angebot bei dir bedeutet.</Head>
        <Sub>Verschieb die Werte, bis es sich für dich realistisch anfühlt.</Sub>
      </div>

      <Card>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                Preis deines Angebots
              </label>
              <span className="font-serif text-3xl text-[color:var(--wine)]">
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
              className="w-full accent-[color:var(--rose)]"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update({ price: p })}
                  className={`px-3.5 py-2 rounded-full text-xs border transition ${
                    data.price === p
                      ? "border-[color:var(--rose)] bg-[color:var(--rose)]/10 text-[color:var(--wine)]"
                      : "border-[color:var(--border)] text-[color:var(--muted-fg)] hover:border-[color:var(--rose)]"
                  }`}
                >
                  {formatEur(p)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                Käufer pro Monat
              </label>
              <span className="font-serif text-3xl text-[color:var(--wine)]">
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
              className="w-full accent-[color:var(--rose)]"
            />
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-[color:var(--cream2)] border-transparent">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
            Pro Monat
          </p>
          <p className="mt-2 font-serif text-4xl text-[color:var(--wine)]">
            {formatEur(monthly)}
          </p>
        </Card>
        <Card className="bg-[color:var(--cream2)] border-transparent">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
            Pro Jahr
          </p>
          <p className="mt-2 font-serif text-4xl text-[color:var(--wine)]">
            {formatEur(yearly)}
          </p>
        </Card>
      </div>

      <Card>
        <p className="text-[15px] sm:text-base leading-relaxed text-[color:var(--ink)]">
          Für <span className="font-serif text-xl">10.000 €</span> im Monat brauchst
          du bei diesem Preis{" "}
          <span className="font-serif text-xl">{buyersFor10k} Käufer</span>. Bei
          deiner Reichweite von {monthlyViews.toLocaleString("de-DE")} Views
          entspricht das{" "}
          {neededConversion < 0.01
            ? "unter 0,01 %"
            : `${neededConversion.toFixed(2).replace(".", ",")} %`}{" "}
          der Menschen, die dich sehen.
        </p>
      </Card>

      <PrimaryCTA onClick={next}>Meinen 12-Wochen-Plan sehen</PrimaryCTA>
    </div>
  );
}
