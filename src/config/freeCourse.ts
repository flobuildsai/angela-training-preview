/**
 * Das kostenlose Creating-Society-System — Inhalt und Copy des Free-Funnels.
 *
 * Eine Quelle für /free, /free/willkommen und /kurs. Videos werden über
 * `video` eingehängt (Vimeo-ID, YouTube-ID oder MP4-URL); bis dahin zeigt
 * der Player ein „folgt"-Cover. `unlockAfterHours` steuert das Drip:
 * 0 = sofort nach Anmeldung verfügbar.
 */

export type LessonVideo =
  | { kind: "vimeo"; id: string }
  | { kind: "youtube"; id: string }
  | { kind: "mp4"; url: string; poster?: string }
  | null;

export interface CourseLesson {
  slug: string;
  module: number;
  title: string;
  /** Ein Satz: Was kann sie danach? */
  outcome: string;
  duration: string;
  video: LessonVideo;
  /** Stunden nach Anmeldung, ab denen die Lektion offen ist. */
  unlockAfterHours: number;
  /** Die konkrete Aufgabe nach dem Video. */
  task: string;
  /** Optionales Arbeitsblatt / Template. */
  resource?: { label: string; url: string };
}

export interface CourseModule {
  n: number;
  title: string;
  italic: string;
  body: string;
  /** Anteil am Programmwert in Euro — für den Value Stack. */
  worth: number;
}

export const COURSE_NAME = "Das Creating Society System";
export const PROGRAM_PRICE = 1500;

/** Die sieben Module — in dieser Reihenfolge, als zusammenhängendes System. */
export const MODULES: CourseModule[] = [
  {
    n: 1,
    title: "Positionierung",
    italic: "Wofür du stehst.",
    body: "Warum 2.000 richtige Follower mehr wert sind als 200.000 falsche — und wie du in einer Stunde findest, wofür Leute dich bezahlen würden.",
    worth: 297,
  },
  {
    n: 2,
    title: "Personal Brand",
    italic: "Vertrauen statt Reichweite.",
    body: "Die drei Signale, an denen Menschen entscheiden, ob sie dir glauben. Ohne Hochglanz, ohne Persona.",
    worth: 197,
  },
  {
    n: 3,
    title: "Content-System",
    italic: "Formate, die tragen.",
    body: "Die drei Formate, die Aufmerksamkeit in Vertrauen verwandeln — und ein Wochenplan, der neben dem Job funktioniert.",
    worth: 297,
  },
  {
    n: 4,
    title: "Community",
    italic: "Aus Zuschauern werden Menschen.",
    body: "Wie du DMs, Kommentare und Stories so nutzt, dass Nachfrage entsteht, bevor du ein Produkt hast.",
    worth: 147,
  },
  {
    n: 5,
    title: "Dein digitales Produkt",
    italic: "Vom Können zum Angebot.",
    body: "Welche Produktart zu dir passt, wie du sie in sieben Tagen baust — und warum dein erstes Produkt klein sein muss.",
    worth: 297,
  },
  {
    n: 6,
    title: "Verkaufen",
    italic: "Ohne Druck, ohne Rabatte.",
    body: "Der Launch-Ablauf für deine ersten Kundinnen: Story-Sequenz, Preis-Begründung, Verkaufen im Gespräch.",
    worth: 197,
  },
  {
    n: 7,
    title: "Skalierung",
    italic: "Vom Produkt zum Business.",
    body: "Zweites Angebot, höherer Preis, Systeme statt Motivation. Was nach dem ersten Verkauf kommt.",
    worth: 68,
  },
];

/**
 * Lektionen — Modul 1 ist sofort offen. Die weiteren Module werden im Drip
 * freigeschaltet: Wer schnell ist, hat nach 72 Stunden alles; wer langsam
 * ist, bekommt jeden Tag einen Grund zurückzukommen.
 */
export const LESSONS: CourseLesson[] = [
  {
    slug: "start",
    module: 1,
    title: "Warum Reichweite dich nicht frei macht",
    outcome: "Du verstehst das Modell, mit dem Creator ohne Brand Deals verdienen — und wo du gerade stehst.",
    duration: "12 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Schreib in einem Satz auf: Wofür würden Leute dich heute schon bezahlen? Wenn du es nicht weißt — schau in deine letzten 20 DMs.",
  },
  {
    slug: "positionierung",
    module: 1,
    title: "Positionierung in 60 Minuten",
    outcome: "Du hast einen Satz, der sagt, für wen du was löst — und den du in deine Bio schreiben kannst.",
    duration: "18 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Fülle das Positionierungs-Template aus und tausch deine Bio aus. Heute, nicht morgen.",
    resource: { label: "Positionierungs-Template (Notion)", url: "#" },
  },
  {
    slug: "personal-brand",
    module: 2,
    title: "Die drei Vertrauens-Signale",
    outcome: "Du weißt, welche drei Dinge auf deinem Profil entscheiden, ob jemand dir glaubt.",
    duration: "14 Min",
    video: null,
    unlockAfterHours: 24,
    task: "Prüfe dein Profil gegen die drei Signale. Ändere das eine, das am meisten fehlt.",
  },
  {
    slug: "content-formate",
    module: 3,
    title: "Die drei Formate, die tragen",
    outcome: "Du hast einen Wochenplan mit drei Formaten, der neben dem Job funktioniert.",
    duration: "21 Min",
    video: null,
    unlockAfterHours: 24,
    task: "Plane deine nächsten sieben Posts nach dem 3-Formate-Plan. Poste den ersten heute.",
    resource: { label: "7-Tage-Content-Plan (Notion)", url: "#" },
  },
  {
    slug: "community",
    module: 4,
    title: "Nachfrage vor dem Produkt",
    outcome: "Du hast eine Story-Umfrage gepostet und weißt, was deine Leute wirklich wollen.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: 48,
    task: "Poste heute eine Story mit Umfrage: „Womit kämpfst du gerade bei [dein Thema]?“ Antworte jeder einzeln.",
  },
  {
    slug: "produkt",
    module: 5,
    title: "Dein erstes Produkt in sieben Tagen",
    outcome: "Du hast Produktart, Titel und Preis für dein erstes Angebot.",
    duration: "24 Min",
    video: null,
    unlockAfterHours: 48,
    task: "Entscheide dich für eine Produktart. Schreib Titel und Preis auf. Kein Perfektionismus — klein und konkret.",
    resource: { label: "Produkt-Blueprint (PDF)", url: "#" },
  },
  {
    slug: "verkaufen",
    module: 6,
    title: "Der Launch für deine ersten Kundinnen",
    outcome: "Du hast einen 5-Tage-Launch-Plan, den du an deine bestehende Reichweite fahren kannst.",
    duration: "19 Min",
    video: null,
    unlockAfterHours: 72,
    task: "Setz das Launch-Datum. Schreib die erste Story der Sequenz.",
    resource: { label: "5-Tage-Launch-Sequenz (Notion)", url: "#" },
  },
  {
    slug: "skalierung",
    module: 7,
    title: "Was nach dem ersten Verkauf kommt",
    outcome: "Du weißt, wie aus einem Produkt ein Business wird — und was der nächste Schritt für dich ist.",
    duration: "15 Min",
    video: null,
    unlockAfterHours: 72,
    task: "Entscheide: Zweites Angebot oder höherer Preis? Schreib auf, warum.",
  },
];

/** Ab welcher Lektion die Application eingeblendet wird (0-basiert). */
export const APPLICATION_AFTER_LESSON_INDEX = 3;

export const VALUE_STACK = [
  { label: "Die 7 Module des Creating Society Systems", worth: "1.500 €", note: "Teil des Programms" },
  { label: "Positionierungs-Template, Content-Plan, Produkt-Blueprint, Launch-Sequenz", worth: "97 €", note: "Vorlagen" },
  { label: "Begleitung per WhatsApp durch die Module", worth: "197 €", note: "Optional" },
  { label: "Strategiegespräch mit Laura", worth: "250 €", note: "Nach Modul 3, wenn du willst" },
] as const;

export const FOR_WHOM = [
  "Du bist angestellt oder studierst und willst dir nebenbei etwas Eigenes aufbauen.",
  "Du hast zwischen 0 und 10.000 Follower und keine Lust, auf Brand Deals zu warten.",
  "Du kannst etwas, das andere fragen — auch wenn du es noch nicht als Produkt siehst.",
  "Du bist bereit, 5 Stunden pro Woche zu investieren und Dinge zu veröffentlichen, bevor sie perfekt sind.",
] as const;

export const NOT_FOR_WHOM = [
  "Du suchst schnelles Geld oder einen Trick gegen den Algorithmus.",
  "Du willst viral gehen, aber nichts verkaufen.",
  "Du willst konsumieren, aber nicht umsetzen.",
] as const;

export const FAQ = [
  {
    q: "Warum ist das kostenlos?",
    a: "Weil ein Teil der Frauen, die das System durcharbeiten, danach mit uns weitermachen will — im 12-Wochen-Programm mit persönlicher Begleitung. Wir zeigen lieber, wie wir arbeiten, statt es zu versprechen. Wer das System allein umsetzt, hat trotzdem alles, was sie braucht.",
  },
  {
    q: "Was ist der Haken?",
    a: "Keiner, den wir verstecken. Nach Modul 3 fragen wir dich einmal, ob du ein Strategiegespräch willst. Wenn nicht, arbeitest du einfach weiter. Keine Anrufe, keine Countdown-Mails.",
  },
  {
    q: "Ich habe kaum Reichweite. Bringt mir das was?",
    a: "Genau dafür ist es gebaut. Das System beginnt mit Positionierung und Angebot, nicht mit Reichweite. Laura hat ihren Account bei null gestartet.",
  },
  {
    q: "Wie viel Zeit brauche ich?",
    a: "Die Videos dauern zusammen etwa zwei Stunden. Die Aufgaben dazu 5 Stunden pro Woche. Das ist neben Job oder Studium machbar.",
  },
  {
    q: "Brauche ich eine Kreditkarte oder ein Abo?",
    a: "Nein. E-Mail eintragen, Zugang bekommen. Du kannst dich jederzeit mit einem Klick abmelden.",
  },
  {
    q: "Ist das nur für Frauen?",
    a: "Creating Society ist eine Community von Frauen, die sich mit Social Media ein eigenes Business aufbauen. Das System selbst funktioniert für alle.",
  },
] as const;

/** Beweis-Bilder liegen als Asset-Pointer im Projekt (proof-views-7m, proof-views-15m, proof-stripe). */
export const PROOF = [
  { key: "views15m", when: "Monat 1", claim: "1,5 Mio. Views" },
  { key: "views7m", when: "Monat 2", claim: "6,9 Mio. Views" },
  { key: "stripe", when: "Danach", claim: "Die ersten Verkäufe" },
] as const;

export function lessonsForModule(n: number): CourseLesson[] {
  return LESSONS.filter((l) => l.module === n);
}

export function lessonBySlug(slug: string): CourseLesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function isUnlocked(lesson: CourseLesson, signedUpAt: number, now = Date.now()): boolean {
  return now - signedUpAt >= lesson.unlockAfterHours * 36e5;
}

export function unlocksAt(lesson: CourseLesson, signedUpAt: number): Date {
  return new Date(signedUpAt + lesson.unlockAfterHours * 36e5);
}
