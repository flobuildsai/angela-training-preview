/**
 * Das kostenlose Creating-Society-System — Inhalt und Copy des Free-Funnels.
 *
 * Build-with-me-Programm: 6 Module + Start, 22 Videos, 30-Tage-Plan.
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
  /** Ein Satz: Was hat sie danach? */
  outcome: string;
  duration: string;
  video: LessonVideo;
  /** Stunden nach Anmeldung, ab denen die Lektion offen ist. */
  unlockAfterHours: number;
  /** Die konkrete Aufgabe nach dem Video — das Ergebnis-Gate. */
  task: string;
  /** Optionales Arbeitsblatt / Template. */
  resource?: { label: string; url: string };
}

export interface CourseModule {
  n: number;
  title: string;
  italic: string;
  body: string;
  /** Das Ergebnis, mit dem das Modul endet. */
  result: string;
  /** Anteil am Programmwert in Euro — für den Value Stack. */
  worth: number;
}

export const COURSE_NAME = "Das Creating Society System";
/** Preis des begleiteten Programms — Anker auf /free. Muss zum Angebot im Call passen. */
export const PROGRAM_PRICE = 1500;

export const FREE_PAGE = {
  nav: [
    { label: "Vorteile", href: "#vorteile" },
    { label: "Kurs", href: "#kurs" },
    { label: "Ergebnisse", href: "#ergebnisse" },
    { label: "FAQ", href: "#faq" },
  ],
  trust: ["22 Videos", "6 Module", "Keine Kreditkarte"],
  modelBenefits: [
    { title: "Kein Lager", body: "Du verkaufst Wissen und Ergebnisse statt physischer Produkte." },
    { title: "Von überall", body: "Content, Produkt und Store funktionieren remote — in deinem Tempo." },
    { title: "Kleine Reichweite reicht", body: "Ein klares Problem und die richtigen Menschen schlagen leere Views." },
    { title: "Nebenbei startbar", body: "Der 30-Tage-Plan ist für fünf konzentrierte Stunden pro Woche gebaut." },
    { title: "Dein eigenes Angebot", body: "Du wartest nicht auf Marken, Deals oder die nächste Algorithmus-Laune." },
    { title: "Ein System", body: "Positionierung, Content, Produkt, Store und Verkauf greifen ineinander." },
  ],
  included: [
    { title: "Positionierung", body: "Ein verständlicher Satz, der zeigt, wem du wobei hilfst." },
    { title: "Personal Brand", body: "Profil, Content-Pillars, Hooks und 30 konkrete Content-Ideen." },
    { title: "Digitales Produkt", body: "Von der validierten Idee bis zur fertigen Datei und ihrem Preis." },
    { title: "Creator Store", body: "Produktseite, Checkout und Link in der Bio — gemeinsam aufgebaut." },
    { title: "Verkaufssystem", body: "Erste Kundinnen, 7-Tage-Launch und Stories ohne Verkaufsdruck." },
    { title: "Vorlagen", body: "Gameplan, Worksheets, Content-Plan, Produkt-Blueprint und Launch-Sequenz." },
  ],
  support: [
    { title: "Build-with-me", body: "Du baust parallel zu Laura und beendest jedes Modul mit einem sichtbaren Ergebnis." },
    { title: "30-Tage-Gameplan", body: "Vier Wochen, klare Meilensteine und ein Launch-Datum statt offener Tabs." },
    { title: "Optionaler Support", body: "Nach Modul 3 entscheidest du selbst, ob du persönliche Begleitung möchtest." },
    { title: "Dauerhafter Zugang", body: "Du kannst Lektionen und Vorlagen in deinem eigenen Tempo wiederholen." },
  ],
} as const;

/** Start + sechs Module — als zusammenhängendes Build-with-me-Programm. */
export const MODULES: CourseModule[] = [
  {
    n: 0,
    title: "Start here",
    italic: "Dein 30-Tage-Plan.",
    body: "Was du in vier Wochen aufbaust, warum Personal Brand + digitales Produkt gerade der stärkste Hebel ist — und die Regel: bauen, nicht anschauen.",
    result: "Der Plan steht im Kalender, mit Launch-Datum in Woche 4.",
    worth: 0,
  },
  {
    n: 1,
    title: "Build your Foundation",
    italic: "Modell, Nische, Positionierung.",
    body: "Content → Attention → Trust → Product → Sales. Welche Nische wirklich zu dir passt (nicht „finde deine Leidenschaft“) und der eine Satz, der sagt, für wen du was löst.",
    result: "Dein Positionierungssatz, ausgefüllt.",
    worth: 297,
  },
  {
    n: 2,
    title: "Build your Personal Brand",
    italic: "Profil, Pillars, Content.",
    body: "Warum du keine Influencerin sein musst. Dein Profil Feld für Feld, 3–4 Content-Pillars, Hooks, Storytelling, Reels, Carousels — und 30 konkrete Post-Ideen.",
    result: "Fertiges Profil und ein 30-Tage-Content-Plan.",
    worth: 397,
  },
  {
    n: 3,
    title: "Create something people want to buy",
    italic: "Vom Problem zum Produkt.",
    body: "Was du verkaufen solltest, wie du es validierst, bevor du es baust — und dann bauen wir dein erstes Produkt gemeinsam von null. Inklusive Preis.",
    result: "Dein erstes Produkt als Datei, mit Preis.",
    worth: 397,
  },
  {
    n: 4,
    title: "Build your Store",
    italic: "Ein Ort, an dem gekauft wird.",
    body: "Warum Instagram allein kein Business ist. Dein Creator Store von null bis live — Account, Produkt, Checkout, Link in der Bio. Und eine Produktseite, die verkauft.",
    result: "Store live, Produkt drin, Link in der Bio.",
    worth: 197,
  },
  {
    n: 5,
    title: "Get your first Sales",
    italic: "Ohne Ads, ohne Druck.",
    body: "Deine ersten 10 Kundinnen, Content der verkauft ohne salesy zu sein, der 7-Tage-Launch und echte Story-Sequenzen, die gekauft haben.",
    result: "Launch geplant, erste Kundinnen angesprochen.",
    worth: 297,
  },
  {
    n: 6,
    title: "Turn it into a Business",
    italic: "Von 1K zu 10K.",
    body: "Audience × Conversion × Product Value. Wie sich das Modell entwickelt — Low Ticket, Core Offer, High Ticket — und was Laura an deiner Stelle als Nächstes tun würde.",
    result: "Dein nächster Hebel und ein 90-Tage-Ziel in Zahlen.",
    worth: 97,
  },
];

const H = (days: number) => days * 24;

/**
 * Lektionen — Start + Modul 1 sofort offen. Danach Drip: wer schnell ist, kann
 * schnell; der 30-Tage-Plan ist das Tempo, nicht die Sperre.
 */
export const LESSONS: CourseLesson[] = [
  // ── Start here ──
  {
    slug: "welcome",
    module: 0,
    title: "Welcome to The Creating Society",
    outcome: "Du weißt, was du in 30 Tagen hast — und dass du es baust, nicht anschaust.",
    duration: "7 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Schreib auf, was du am Tag 30 haben willst — in einem Satz. Das ist dein Vertrag mit dir selbst.",
  },
  {
    slug: "gameplan",
    module: 0,
    title: "Your 30-Day Gameplan",
    outcome: "Der Plan steht im Kalender: vier Wochen, vier Ergebnisse, ein Launch-Datum.",
    duration: "5 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Trag dir vier Termine ein — je einer pro Woche, 5 Stunden. Und das Launch-Datum in Woche 4.",
    resource: { label: "30-Tage-Gameplan (Notion)", url: "#" },
  },
  // ── Modul 1 ──
  {
    slug: "business-model",
    module: 1,
    title: "The Online Business Model",
    outcome: "Du kannst das Modell in einem Satz erklären und weißt, an welchem Schritt du gerade hängst.",
    duration: "12 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Schreib das Modell in deinen Worten auf: Content → Attention → Trust → Product → Sales. Markiere den Pfeil, an dem du stehst.",
  },
  {
    slug: "nische",
    module: 1,
    title: "Find your Niche",
    outcome: "Ein Satz: „Meine Nische ist ___.“ Nicht weiter, bevor der steht.",
    duration: "18 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Beantworte die vier Fragen schriftlich: Was weiß ich? Was hab ich geschafft? Welche Probleme kann ich lösen? Wofür würden Leute mich bezahlen? Dann: „Meine Nische ist ___.“",
    resource: { label: "Nischen-Worksheet (Notion)", url: "#" },
  },
  {
    slug: "positionierung",
    module: 1,
    title: "Your Positioning",
    outcome: "Dein Positionierungssatz steht: I help [WHO] achieve [RESULT] through [METHOD].",
    duration: "14 Min",
    video: null,
    unlockAfterHours: 0,
    task: "Fülle das Positionierungs-Template aus. Geh erst zu Modul 2, wenn der Satz fertig ist.",
    resource: { label: "Positionierungs-Template (Notion)", url: "#" },
  },
  // ── Modul 2 ──
  {
    slug: "personal-brand-101",
    module: 2,
    title: "Personal Brand 101",
    outcome: "Du weißt, welches der drei Vertrauens-Signale dir am meisten fehlt.",
    duration: "9 Min",
    video: null,
    unlockAfterHours: H(1),
    task: "Bewerte dein Profil: Klarheit, Beweis, Nähe — je 0, 1 oder 2. Das Niedrigste ist dein Fokus für diese Woche.",
  },
  {
    slug: "profil",
    module: 2,
    title: "Build your Profile",
    outcome: "Dein Profil ist fertig: Username, Bild, Name Field, Bio, CTA, Highlights, Link.",
    duration: "14 Min",
    video: null,
    unlockAfterHours: H(1),
    task: "Pausier das Video und bau dein Profil Feld für Feld mit. Screenshot vorher, Screenshot nachher.",
  },
  {
    slug: "content-pillars",
    module: 2,
    title: "Your Content Pillars",
    outcome: "Deine 3–4 Pillars mit je einem Satz, was darunter fällt.",
    duration: "9 Min",
    video: null,
    unlockAfterHours: H(1),
    task: "Schreib deine Pillars auf. Prüfe deine letzten 9 Posts: Passt jeder in eine Säule? Wenn nicht — was fliegt raus?",
  },
  {
    slug: "content-handwerk",
    module: 2,
    title: "How to create Content people actually care about",
    outcome: "Du hast ein Hook-Muster und ein Format, mit dem du diese Woche anfängst.",
    duration: "22 Min",
    video: null,
    unlockAfterHours: H(1),
    task: "Schreib 5 Hooks für dein Thema nach den fünf Mustern. Poste heute den besten als Reel oder Carousel.",
  },
  {
    slug: "content-plan",
    module: 2,
    title: "Your 30-Day Content Plan",
    outcome: "30 Ideen im Plan, die ersten 7 mit Datum. Woche 2 fertig.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: H(1),
    task: "Fülle den 30-Tage-Plan aus: 4 Pillars × 5 Fragen = 20 Ideen, plus 10 aus deinen DMs. Die ersten 7 bekommen ein Datum.",
    resource: { label: "30-Tage-Content-Plan (Notion)", url: "#" },
  },
  // ── Modul 3 ──
  {
    slug: "was-verkaufen",
    module: 3,
    title: "What should you sell?",
    outcome: "Du hast eine Produktart und ein Problem, das es löst.",
    duration: "13 Min",
    video: null,
    unlockAfterHours: H(3),
    task: "Entscheide: Guide, Template oder Mini-Kurs. Schreib in einem Satz, welches Problem es für wen löst.",
  },
  {
    slug: "validieren",
    module: 3,
    title: "Validate before you build",
    outcome: "Umfrage gepostet, mindestens 10 Antworten, Produkt-Idee bestätigt oder angepasst.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: H(3),
    task: "Poste heute eine Story-Umfrage: „Womit kämpfst du gerade bei [dein Thema]?“ Antworte jeder einzeln. Die Antworten sind dein Outline.",
  },
  {
    slug: "produkt-bauen",
    module: 3,
    title: "Create your first Digital Product",
    outcome: "Dein erstes Produkt existiert als Datei. Nicht weiter ohne Datei.",
    duration: "25 Min",
    video: null,
    unlockAfterHours: H(3),
    task: "Bau mit: Problem → Promise → Outline (5–7 Schritte) → Content → Design → Datei. Fertig schlägt schön.",
    resource: { label: "Produkt-Blueprint (Notion)", url: "#" },
  },
  {
    slug: "preis",
    module: 3,
    title: "Pricing your Product",
    outcome: "Preis steht. Modul 3 fertig: Produkt + Preis.",
    duration: "9 Min",
    video: null,
    unlockAfterHours: H(3),
    task: "Leg deinen Preis fest (27–79 € fürs erste Produkt) und schreib in einem Satz, warum er das wert ist.",
  },
  // ── Modul 4 ──
  {
    slug: "creator-store",
    module: 4,
    title: "Your Creator Store",
    outcome: "Du weißt, was dein Store können muss — und dass es 20 Minuten dauert, nicht zwei Wochen.",
    duration: "9 Min",
    video: null,
    unlockAfterHours: H(5),
    task: "Schreib die Kette auf: Audience → Store → Product → Checkout → Customer. Welches Glied fehlt dir heute?",
  },
  {
    slug: "store-bauen",
    module: 4,
    title: "Build your Store with milou",
    outcome: "Store live, Produkt drin, Checkout getestet, Link in der Bio.",
    duration: "25 Min",
    video: null,
    unlockAfterHours: H(5),
    task: "Pausier das Video und bau deinen Store mit: Account, Profil, Produkt, Preis, Zahlung, Testkauf, Link in die Bio.",
    resource: { label: "milou.bio — Store anlegen", url: "https://milou.bio" },
  },
  {
    slug: "produktseite",
    module: 4,
    title: "Create a Product Page that converts",
    outcome: "Produktseite überarbeitet: Headline, Problem, Promise, Benefits, Proof, CTA. Woche 3 fertig.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: H(5),
    task: "Überarbeite deine Produktseite Abschnitt für Abschnitt. Lies sie auf dem Handy — da kaufen sie.",
  },
  // ── Modul 5 ──
  {
    slug: "erste-kundinnen",
    module: 5,
    title: "Your first 10 Customers",
    outcome: "Liste mit 30 Namen, die du in den nächsten 7 Tagen ansprichst.",
    duration: "13 Min",
    video: null,
    unlockAfterHours: H(7),
    task: "Schreib 30 Namen auf: aus DMs, Umfrage-Antworten, Netzwerk, Communities. Schreib heute den ersten fünf — eine Frage, kein Pitch.",
  },
  {
    slug: "content-der-verkauft",
    module: 5,
    title: "Content that sells without feeling salesy",
    outcome: "Vier Posts geplant: Attention, Education, Belief, Conversion.",
    duration: "13 Min",
    video: null,
    unlockAfterHours: H(7),
    task: "Plane je einen Post pro Stufe der Journey. Der Conversion-Post nennt Produkt und Link.",
  },
  {
    slug: "launch",
    module: 5,
    title: "Your Launch Strategy",
    outcome: "Launch-Datum gesetzt, 7 Tage geplant.",
    duration: "13 Min",
    video: null,
    unlockAfterHours: H(7),
    task: "Setz das Datum. Fülle die 7-Tage-Sequenz aus: Problem, Story, Education, Tease, Reveal, Proof, CTA.",
    resource: { label: "7-Tage-Launch-Sequenz (Notion)", url: "#" },
  },
  {
    slug: "stories",
    module: 5,
    title: "Selling through Stories",
    outcome: "Erste Story-Sequenz gepostet. Woche 4 läuft.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: H(7),
    task: "Poste heute die erste Sequenz (3 Frames): Problem → dein Weg → Frage an sie.",
  },
  // ── Modul 6 ──
  {
    slug: "1k-5k-10k",
    module: 6,
    title: "Your first €1K → €5K → €10K",
    outcome: "Du kennst deinen nächsten Hebel und hast ein 90-Tage-Ziel in Zahlen.",
    duration: "11 Min",
    video: null,
    unlockAfterHours: H(10),
    task: "Rechne: Preis × Verkäufe = Ziel. Welcher Hebel bringt dich dahin — Reichweite, Conversion oder Preis?",
  },
  {
    slug: "what-i-would-do",
    module: 6,
    title: "What I would do from here",
    outcome: "Klare Entscheidung: allein weiter — oder Gespräch buchen.",
    duration: "9 Min",
    video: null,
    unlockAfterHours: H(10),
    task: "Entscheide dich. Beides ist richtig. Schick mir deinen Store — so oder so.",
  },
];

/** Ab welcher Lektion die Application eingeblendet wird (0-basiert): nach „Pricing your Product". */
export const APPLICATION_AFTER_LESSON_INDEX = LESSONS.findIndex((l) => l.slug === "preis");

export const VALUE_STACK = [
  { label: "Das Creating Society System — 6 Module, 22 Videos, Build-with-me", worth: "1.500 €", note: "Kern des Programms" },
  { label: "Alle Vorlagen: Gameplan, Nische, Positionierung, Content-Plan, Produkt-Blueprint, Launch-Sequenz", worth: "97 €", note: "Notion-Templates" },
  { label: "Dein Creator Store auf milou.bio", worth: "0 €", note: "Free-Plan, für immer" },
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
    a: "Weil ein Teil der Frauen, die das System durcharbeiten, danach mit uns weitermachen will — im Programm mit persönlicher Begleitung. Wir zeigen lieber, wie wir arbeiten, statt es zu versprechen. Wer das System allein umsetzt, hat trotzdem alles, was sie braucht.",
  },
  {
    q: "Was ist der Haken?",
    a: "Keiner, den wir verstecken. Nach Modul 3 fragen wir dich einmal, ob du ein Strategiegespräch willst. Wenn nicht, arbeitest du einfach weiter. Keine Anrufe, keine Countdown-Mails.",
  },
  {
    q: "Ist das ein Kurs zum Anschauen?",
    a: "Nein. Jedes Modul endet mit einem Ergebnis — Positionierungssatz, fertiges Profil, Produkt-Datei, Store live. Wer das Ergebnis überspringt, kommt am Ende mit nichts raus. Deshalb: bauen, während du schaust.",
  },
  {
    q: "Ich habe kaum Reichweite. Bringt mir das was?",
    a: "Genau dafür ist es gebaut. Das System beginnt mit Positionierung und Produkt, nicht mit Reichweite. Laura hat ihren Account bei null gestartet.",
  },
  {
    q: "Wie viel Zeit brauche ich?",
    a: "Die Videos dauern zusammen etwa vier Stunden. Mit den Aufgaben: 5 Stunden pro Woche, vier Wochen. Das ist neben Job oder Studium machbar.",
  },
  {
    q: "Brauche ich eine Kreditkarte, ein Abo oder Software?",
    a: "Nein. E-Mail eintragen, Zugang bekommen. In Modul 4 baust du deinen Store — auf milou.bio ist das kostenlos, du kannst aber auch etwas anderes nehmen.",
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
