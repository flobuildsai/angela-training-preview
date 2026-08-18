export interface NicheProfile {
  key: string;
  label: string;
  /** Demand headline shown in the analysis step */
  demand: string;
  /** Typical offer types people buy in this niche */
  offers: string[];
  /** Realistic price range for a first own offer, in EUR */
  priceMin: number;
  priceMax: number;
  /** Suggested starting price for the calculator */
  priceDefault: number;
  /** Content formats that convert in this niche */
  formats: string[];
  /** Short positioning line used in the roadmap */
  angle: string;
}

const NICHES: NicheProfile[] = [
  {
    key: "fitness",
    label: "Fitness & Gesundheit",
    demand: "Sehr hohe Nachfrage. Menschen zahlen hier für Ergebnisse, nicht für Follower.",
    offers: ["12-Wochen-Programm", "1:1 Coaching", "Trainings- & Ernährungsplan"],
    priceMin: 149,
    priceMax: 1997,
    priceDefault: 297,
    formats: ["Vorher/Nachher-Story", "Mythos aufklären", "Ein Tag in meinem Training"],
    angle: "Ergebnis in einem klaren Zeitraum",
  },
  {
    key: "beauty",
    label: "Beauty & Skincare",
    demand: "Große Zielgruppe, viel Vertrauen über das Gesicht. Produkte und Guides verkaufen sich schnell.",
    offers: ["Routine-Guide", "Skin-Coaching", "Membership mit Updates"],
    priceMin: 47,
    priceMax: 697,
    priceDefault: 97,
    formats: ["Routine in 30 Sekunden", "Fehler, die alle machen", "Ehrliche Produkt-Reviews"],
    angle: "Eine Routine, die wirklich funktioniert",
  },
  {
    key: "mindset",
    label: "Mindset & Persönlichkeit",
    demand: "Extrem hohe emotionale Nachfrage. Menschen kaufen Klarheit und Begleitung.",
    offers: ["Selbstwert-Programm", "1:1 Begleitung", "Community & Journaling"],
    priceMin: 97,
    priceMax: 2997,
    priceDefault: 497,
    formats: ["Persönliche Geschichte", "Reframe in 20 Sekunden", "Q&A aus der Community"],
    angle: "Eine innere Veränderung mit klarem Weg",
  },
  {
    key: "business",
    label: "Business & Online verdienen",
    demand: "Höchste Zahlungsbereitschaft überhaupt, weil dein Angebot direkt Geld zurückbringt.",
    offers: ["Done-with-you-Coaching", "Kurs mit Templates", "Mastermind"],
    priceMin: 297,
    priceMax: 4997,
    priceDefault: 697,
    formats: ["Zahlen offenlegen", "Schritt-für-Schritt-Breakdown", "Vorher/Nachher eines Kunden"],
    angle: "Ein messbares Ergebnis in Euro",
  },
  {
    key: "travel",
    label: "Reisen & Lifestyle",
    demand: "Riesige Reichweite, aber nur mit eigenem Angebot planbar. Guides und Retreats funktionieren.",
    offers: ["Reise-Guides", "Retreat", "Creator-Kurs für Reise-Content"],
    priceMin: 39,
    priceMax: 1997,
    priceDefault: 197,
    formats: ["Ortsvorstellung mit Kosten", "Packliste", "Hinter den Kulissen"],
    angle: "Ein konkretes Erlebnis, das man nachmachen kann",
  },
  {
    key: "fashion",
    label: "Mode & Style",
    demand: "Starke Community, wenn du einen klaren Stil vertrittst. Beratung verkauft sich besser als Deals.",
    offers: ["Stil-Analyse", "Capsule-Wardrobe-Guide", "Shopping-Begleitung"],
    priceMin: 47,
    priceMax: 997,
    priceDefault: 149,
    formats: ["Outfit-Formel", "Ein Teil, fünf Looks", "Fehlkäufe vermeiden"],
    angle: "Ein Stil, der zu dir passt",
  },
  {
    key: "food",
    label: "Food & Ernährung",
    demand: "Sehr teilbar, dadurch schnelle Reichweite. Pläne und Rezeptsysteme verkaufen sich gut.",
    offers: ["Rezept-System", "Ernährungsumstellung", "Meal-Prep-Membership"],
    priceMin: 29,
    priceMax: 697,
    priceDefault: 97,
    formats: ["Rezept in 15 Sekunden", "Einkaufsliste", "Ehrlicher Vergleich"],
    angle: "Alltagstauglich statt kompliziert",
  },
  {
    key: "relationship",
    label: "Beziehung & Dating",
    demand: "Sehr emotionale Nische mit hoher Kaufbereitschaft für Begleitung.",
    offers: ["Kurs zu Bindung & Kommunikation", "1:1 Beratung", "Anonyme Community"],
    priceMin: 79,
    priceMax: 1997,
    priceDefault: 297,
    formats: ["Situation nachstellen", "Zuschauerfrage beantworten", "Rote Flaggen erklären"],
    angle: "Klarheit in einer belastenden Situation",
  },
  {
    key: "finance",
    label: "Finanzen & Sparen",
    demand: "Hohe Nachfrage, weil das Ergebnis direkt in Euro messbar ist.",
    offers: ["Budget-System", "Investment-Basiskurs", "1:1 Finanz-Check"],
    priceMin: 97,
    priceMax: 1997,
    priceDefault: 297,
    formats: ["Zahlen transparent zeigen", "Ein Fehler, viel Geld", "Schritt-für-Schritt-Setup"],
    angle: "Mehr Überblick und mehr Geld am Monatsende",
  },
  {
    key: "creative",
    label: "Kreatives & Handwerk",
    demand: "Kleinere, aber sehr loyale Zielgruppe. Kurse und Vorlagen laufen konstant.",
    offers: ["Online-Kurs", "Vorlagen & Presets", "Kleine Gruppen-Workshops"],
    priceMin: 29,
    priceMax: 997,
    priceDefault: 147,
    formats: ["Prozess im Zeitraffer", "Anfängerfehler", "Vorher/Nachher"],
    angle: "Eine Fähigkeit, die man sichtbar lernt",
  },
];

export const NICHE_SUGGESTIONS = NICHES.map((n) => n.label);

const DEFAULT_PROFILE: NicheProfile = {
  key: "default",
  label: "Deine Nische",
  demand:
    "Auch in kleineren Nischen funktioniert das Prinzip: ein klares Angebot für ein klares Problem.",
  offers: ["Digitales Produkt", "1:1 Begleitung", "Community"],
  priceMin: 97,
  priceMax: 1997,
  priceDefault: 297,
  formats: ["Persönliche Geschichte", "Ein Problem, eine Lösung", "Hinter den Kulissen"],
  angle: "Ein klares Ergebnis für einen klaren Menschen",
};

const KEYWORDS: Record<string, string[]> = {
  fitness: ["fitness", "sport", "gym", "training", "gesund", "yoga", "pilates", "abnehm"],
  beauty: ["beauty", "skin", "haut", "make", "kosmetik", "haare", "nails"],
  mindset: ["mindset", "selbst", "persönlich", "spirit", "therapie", "achtsam", "journal"],
  business: ["business", "geld", "marketing", "agentur", "verkauf", "sales", "unternehm", "freelanc", "ki", "ai"],
  travel: ["reise", "travel", "trip", "urlaub", "van", "auswander"],
  fashion: ["mode", "fashion", "style", "outfit", "kleid"],
  food: ["food", "koch", "rezept", "ernähr", "backen", "meal"],
  relationship: ["beziehung", "dating", "liebe", "partner", "familie", "eltern"],
  finance: ["finanz", "sparen", "invest", "aktien", "etf", "steuer", "immobil"],
  creative: ["kunst", "kreativ", "foto", "design", "musik", "basteln", "nähen", "schreib"],
};

export function resolveNiche(input: string): NicheProfile {
  const value = input.trim().toLowerCase();
  if (!value) return DEFAULT_PROFILE;

  const direct = NICHES.find((n) => n.label.toLowerCase() === value);
  if (direct) return direct;

  for (const [key, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => value.includes(w))) {
      const profile = NICHES.find((n) => n.key === key);
      if (profile) return profile;
    }
  }
  return { ...DEFAULT_PROFILE, label: input.trim() };
}
