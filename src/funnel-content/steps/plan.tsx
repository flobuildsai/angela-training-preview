import { SKILL_OPTIONS, formatEur, useFunnel } from "../FunnelContext";
import { Head, PrimaryCTA, StepLabel, Sub } from "../ui";

const OFFER_LABEL = [
  "dein Wissen als Kurs",
  "deine 1:1 Begleitung",
  "deine Community",
  "dein digitales Produkt",
  "dein erstes Angebot",
];

/** Step 11 — 12-Wochen-Roadmap */
export function StepRoadmap() {
  const { next, data, profile } = useFunnel();
  const offer = OFFER_LABEL[Math.max(data.skill, 0)] ?? OFFER_LABEL[4];
  const niche = data.niche || profile.label;

  const phases = [
    {
      n: "01",
      weeks: "Woche 1 – 4",
      title: "Fundament",
      lead: `Positionierung in ${niche} und ein Content-Format, das jede Woche funktioniert.`,
      tasks: [
        `Klare Positionierung: ${profile.angle}`,
        `Drei Formate testen: ${profile.formats.join(", ")}`,
        "Profil, Bio und Hook-Struktur überarbeiten",
        "Feste Posting-Routine statt Zufall",
      ],
    },
    {
      n: "02",
      weeks: "Woche 5 – 8",
      title: "Produkt",
      lead: `Wir bauen ${offer}, klein genug zum Starten, gut genug zum Bezahlen.`,
      tasks: [
        `Angebot definieren mit klarem Ergebnis (${formatEur(data.price)})`,
        "Inhalte und Ablauf strukturieren",
        "Verkaufsseite und Zahlungsabwicklung aufsetzen",
        "Erste Interessenten sammeln, bevor alles fertig ist",
      ],
    },
    {
      n: "03",
      weeks: "Woche 9 – 12",
      title: "Verkauf",
      lead: "Aus Reichweite werden Verkäufe, die sich wiederholen lassen.",
      tasks: [
        "Launch-Content und Story-Sequenz",
        "Verkaufsgespräche oder Direktverkauf über die Seite",
        `Ziel: die ersten ${data.buyers} Käufer`,
        "System dokumentieren und wiederholen",
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <StepLabel>Dein Plan</StepLabel>
        <Head>Deine nächsten 12 Wochen.</Head>
        <Sub>
          Basierend auf {niche}, deiner Reichweite und{" "}
          {SKILL_OPTIONS[Math.max(data.skill, 0)]?.toLowerCase() ??
            "deinem Startpunkt"}
          .
        </Sub>
      </div>

      <div className="divide-y divide-[color:var(--ink)]/10 border-y border-[color:var(--ink)]/10">
        {phases.map((p) => (
          <section
            key={p.n}
            className="grid gap-5 py-9 sm:grid-cols-[7rem_1fr] sm:gap-10"
          >
            <div>
              <p className="font-serif text-[3rem] leading-none tabular-nums text-[color:var(--ink)]/15 sm:text-[4rem]">
                {p.n}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
                {p.weeks}
              </p>
            </div>
            <div>
              <h2 className="font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-[color:var(--ink)] sm:text-[2.15rem]">
                {p.title}
              </h2>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
                {p.lead}
              </p>
              <ul className="mt-5 divide-y divide-[color:var(--ink)]/8 border-t border-[color:var(--ink)]/8">
                {p.tasks.map((t) => (
                  <li
                    key={t}
                    className="py-3 text-[15px] leading-relaxed text-[color:var(--ink)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <PrimaryCTA onClick={next}>Plan freischalten</PrimaryCTA>
    </div>
  );
}
