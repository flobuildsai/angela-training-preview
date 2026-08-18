import { SKILL_OPTIONS, formatEur, useFunnel } from "../FunnelContext";
import { Card, Head, PrimaryCTA, StepLabel, Sub } from "../ui";

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
      phase: "Phase 01",
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
      phase: "Phase 02",
      weeks: "Woche 5 – 8",
      title: "Produkt",
      lead: `Wir bauen ${offer} — klein genug zum Starten, gut genug zum Bezahlen.`,
      tasks: [
        `Angebot definieren mit klarem Ergebnis (${formatEur(data.price)})`,
        "Inhalte und Ablauf strukturieren",
        "Verkaufsseite und Zahlungsabwicklung aufsetzen",
        "Erste Interessenten sammeln, bevor alles fertig ist",
      ],
    },
    {
      phase: "Phase 03",
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
    <div className="space-y-8">
      <div className="space-y-3">
        <StepLabel>Dein Plan</StepLabel>
        <Head>Deine nächsten 12 Wochen.</Head>
        <Sub>
          Basierend auf {niche}, deiner Reichweite und{" "}
          {SKILL_OPTIONS[Math.max(data.skill, 0)]?.toLowerCase() ??
            "deinem Startpunkt"}
          .
        </Sub>
      </div>

      <div className="space-y-4">
        {phases.map((p) => (
          <Card key={p.phase}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                {p.phase}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                {p.weeks}
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl text-[color:var(--wine)]">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted-fg)]">{p.lead}</p>
            <ul className="mt-4 space-y-3">
              {p.tasks.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <PrimaryCTA onClick={next}>Plan freischalten</PrimaryCTA>
    </div>
  );
}
