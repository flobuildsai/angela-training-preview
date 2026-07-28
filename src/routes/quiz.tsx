import { createFileRoute, Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Dein Plan — Creating Society" },
      { name: "description", content: "In 2 Minuten dein persönlicher Plan: eigenes Produkt, planbare Verkäufe, ohne eine Million Follower." },
      { property: "og:title", content: "Your plan — Creating Society" },
      { property: "og:description", content: "2 minutes. Your numbers. Your 12-week path." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

// ─────────────────────────────── i18n ───────────────────────────────
type Lang = "de" | "en";

const t = {
  wordmark: { de: "Creating Society", en: "Creating Society" },
  back: { de: "← Zurück", en: "← Back" },

  start: {
    trust: { de: "von Laura · 3 Mio. monatliche Views", en: "by Laura · 3M monthly views" },
    h1: { de: "Wie viel könntest du mit deinem Content verdienen?", en: "How much could you earn with your content?" },
    sub: {
      de: "Beantworte 6 kurze Fragen und du bekommst deine persönliche Rechnung – und deinen 12-Wochen-Plan.",
      en: "Answer 6 quick questions and get your personal numbers — plus your 12-week plan.",
    },
    cta: { de: "Los geht's →", en: "Let's go →" },
    micro: { de: "2 Minuten · kostenlos · keine Anmeldung", en: "2 minutes · free · no signup" },
  },

  qlabel: {
    de: (n: number) => `Frage ${n} von 6`,
    en: (n: number) => `Question ${n} of 6`,
  },

  hero: {
    diary: {
      de: "Ich hatte irgendwann 3 Millionen Views im Monat – und habe damit fast nichts verdient. Brand Deals, die Wochen dauerten und einmal zahlten. Eine wachsende Community und ein leeres Konto. Was alles verändert hat: ein eigenes Produkt statt mehr Reichweite.",
      en: "At some point I had 3 million views a month — and made almost nothing from it. Brand deals that took weeks and paid once. A growing audience and an empty bank account. What changed everything: my own product instead of more reach.",
    },
    signature: { de: "— Laura", en: "— Laura" },
    reframeLeft: {
      de: "Was die meisten denken: Mehr Follower → Brand Deals → hoffen",
      en: "What most people think: More followers → brand deals → hope",
    },
    reframeRight: {
      de: "Was funktioniert: Kleine Audience → eigenes Produkt → planbare Verkäufe",
      en: "What works: Small audience → your own product → predictable sales",
    },
    followersLabel: { de: "Wie viele Follower hast du gerade?", en: "How many followers do you have right now?" },
    followersHint: {
      de: "Ehrliche Zahl reicht – wir rechnen gleich damit. 0 ist auch okay.",
      en: "An honest number is fine — we'll calculate with it in a second. 0 is okay too.",
    },
    followersPh: { de: "z.B. 1200", en: "e.g. 1200" },
    cta: { de: "Weiter →", en: "Continue →" },
  },


  step1: {
    q: { de: "Wo stehst du gerade?", en: "Where are you right now?" },
    a: [
      { key: "zero", de: "Ich fange komplett bei null an", en: "I'm starting completely from zero" },
      { key: "posting", de: "Ich poste schon, verdiene aber nichts damit", en: "I'm already posting but not earning from it" },
      { key: "selling", de: "Ich verkaufe schon etwas, aber es läuft nicht", en: "I already sell something but it's not working" },
    ],
  },
  step2: {
    q: { de: "Willst du mit deinem Gesicht arbeiten?", en: "Do you want to show your face?" },
    a: [
      { key: "yes", de: "Ja, kein Problem", en: "Yes, no problem" },
      { key: "faceless", de: "Lieber nicht – faceless wäre ideal", en: "Rather not — faceless would be ideal" },
      { key: "unsure", de: "Bin mir noch unsicher", en: "Not sure yet" },
    ],
  },
  step3: {
    q: { de: "Worin bist du gut – oder worüber könntest du stundenlang reden?", en: "What are you good at — or what could you talk about for hours?" },
    a: [
      { key: "fitness", de: "Fitness & Health", en: "Fitness & Health" },
      { key: "beauty", de: "Beauty & Style", en: "Beauty & Style" },
      { key: "money", de: "Money & Career", en: "Money & Career" },
      { key: "mindset", de: "Mindset & Growth", en: "Mindset & Growth" },
      { key: "food", de: "Food & Home", en: "Food & Home" },
      { key: "unknown", de: "Weiß ich noch nicht", en: "I don't know yet" },
    ],
    reassurance: { de: "Perfekt – genau dafür gibt es Phase 1.", en: "Perfect — that's exactly what Phase One is for." },
  },
  step4: {
    q: { de: "Wie viel Zeit hast du pro Woche wirklich?", en: "How much time do you really have per week?" },
    a: [
      { key: "2-5", de: "2–5 h", en: "2–5 h" },
      { key: "5-10", de: "5–10 h", en: "5–10 h" },
      { key: "10+", de: "10+ h", en: "10+ h" },
    ],
  },
  step5: {
    q: { de: "Wie ernst ist es dir gerade?", en: "How serious are you right now?" },
    a: [
      { key: "looking", de: "Ich schaue mich erstmal um", en: "Just looking around" },
      { key: "weeks", de: "Ich will in den nächsten Wochen starten", en: "I want to start in the next few weeks" },
      { key: "ready", de: "Ich bin bereit, Zeit UND Geld zu investieren", en: "I'm ready to invest time AND money" },
    ],
  },

  analysis: {
    start: { de: "Startpunkt", en: "Starting point" },
    model: { de: "Modell", en: "Model" },
    time: { de: "Zeitbudget", en: "Time budget" },
    face_yes: { de: "mit Gesicht", en: "on camera" },
    face_faceless: { de: "faceless", en: "faceless" },
    face_unsure: { de: "offen", en: "open" },
  },

  belief: {
    h: { de: "Du brauchst keine 100.000 Follower.", en: "You don't need 100,000 followers." },
    body: {
      de: (f: number) => `Reichweite ist heute interessenbasiert – Reels laufen vor allem bei Leuten, die dir NICHT folgen. Auch mit ${f.toLocaleString("de-DE")} Followern kann dein Content morgen 50.000 Fremde erreichen. Das Problem ist nicht Reichweite, sondern dass am anderen Ende nichts zum Kaufen steht.`,
      en: (f: number) => `Reach is interest-based now — Reels are shown mostly to people who DON'T follow you. Even at ${f.toLocaleString("en-US")} followers, your content can reach 50,000 strangers tomorrow. The problem isn't reach, it's that there's nothing to buy on the other end.`,
    },

    cta: { de: "Okay – zeig mir meine Rechnung →", en: "Okay — show me my numbers →" },
  },

  calc: {
    h: { de: "Deine Rechnung.", en: "Your numbers." },
    explainer: {
      de: "So funktioniert die Rechnung: dein Produktpreis × Käuferinnen pro Monat. Spiel mit den Reglern.",
      en: "The math is simple: your product price × buyers per month. Play with the sliders.",
    },

    price: { de: "Preis deines Produkts", en: "Your product price" },
    buyers: { de: "Käuferinnen pro Monat", en: "Buyers per month" },
    perMonth: { de: "/Monat", en: "/month" },
    context: {
      de: (f: number, b: number, x: string) => `Bei ${f.toLocaleString("de-DE")} Followern sind ${b} Käuferinnen ${x}% deiner Audience – pro Monat.`,
      en: (f: number, b: number, x: string) => `At ${f.toLocaleString("en-US")} followers, ${b} buyers is ${x}% of your audience — per month.`,
    },
    contextZero: {
      de: "Und diese Audience bauen wir in Phase 2 gezielt auf.",
      en: "And we build that audience deliberately in Phase Two.",
    },
    honesty: {
      de: "Keine Garantie, keine Versprechen – nur Mathematik. Aber genau diese Mathematik ignorieren die meisten.",
      en: "No guarantees, no promises — just math. But it's exactly the math most people ignore.",
    },
    cta: { de: "Wie komme ich dahin? →", en: "How do I get there? →" },
  },

  roadmap: {
    h: { de: "Dein Weg in 12 Wochen.", en: "Your 12-week path." },
    intro: {
      zero: {
        de: "Du startest bei null – perfekt, du startest ohne Altlasten.",
        en: "You're starting from zero — perfect, you start clean.",
      },
      posting: {
        de: "Du hast schon Content-Routine – wir bauen den fehlenden Teil: das Business dahinter.",
        en: "You already have a content habit — we build the missing part: the business behind it.",
      },
      selling: {
        de: "Du hast schon ein Angebot – wir bauen es so um, dass es sich verkauft.",
        en: "You already have an offer — we rebuild it so it actually sells.",
      },
    },
    rows: [
      {
        w: { de: "Woche 1–2 · Position", en: "Week 1–2 · Position" },
        d: { de: "Du weißt genau, wem du hilfst und was du verkaufst.", en: "You know exactly who you help and what you sell." },
      },
      {
        w: { de: "Woche 3–6 · Attention", en: "Week 3–6 · Attention" },
        d: { de: "Ein Content-Rhythmus, der die richtigen Leute bringt.", en: "A content rhythm that brings the right people." },
      },
      {
        w: { de: "Woche 7–9 · Offer", en: "Week 7–9 · Offer" },
        d: { de: "Dein Produkt existiert: bepreist, positioniert, vorverkauft.", en: "Your product exists: priced, positioned, presold." },
      },
      {
        w: { de: "Woche 10–12 · Convert", en: "Week 10–12 · Convert" },
        d: { de: "Deine ersten Verkäufe. Dann ein System.", en: "Your first sales. Then a system." },
      },
    ],
    facelessNote: {
      de: "Komplett ohne Gesicht machbar – der Faceless-Track läuft parallel durch alle Phasen.",
      en: "Fully doable without showing your face — the Faceless Track runs through every phase.",
    },
    cta: { de: "Zeig mir mein Ergebnis →", en: "Show me my result →" },
  },

  lead: {
    h: { de: "Fast fertig.", en: "Almost there." },
    sub: { de: "Wohin sollen wir deinen persönlichen Plan schicken?", en: "Where should we send your personal plan?" },
    name: { de: "Vorname", en: "First name" },
    email: { de: "E-Mail", en: "Email" },
    handle: { de: "Instagram Handle", en: "Instagram handle" },
    handleHint: { de: "optional, hilft uns dich einzuordnen", en: "optional, helps us understand where you're at" },
    submit: { de: "Meinen Plan zeigen →", en: "Show my plan →" },
    small: { de: "Kein Spam. Austragen jederzeit.", en: "No spam. Unsubscribe anytime." },
  },

  result: {
    greet: { de: (n: string) => `„${n}, hier ist dein Plan."`, en: (n: string) => `"${n}, here's your plan."` },
    summary: {
      followers: { de: "Follower", en: "Followers" },
      status: { de: "Status", en: "Status" },
      face: { de: "Modell", en: "Model" },
      time: { de: "Zeit / Woche", en: "Time / week" },
      goal: { de: "Ziel", en: "Goal" },
    },
    ctaH: { de: "Der schnellste Weg: die Founding Cohort.", en: "The fastest way: the Founding Cohort." },
    ctaBody: {
      de: "Ich nehme gerade 10 Frauen, mit denen ich die nächsten 12 Wochen genau diesen Plan umsetze – eigenes Produkt, erste Verkäufe, persönliche Begleitung. Founding-Preis: 1.997 € statt später 3.997 €. Der einzige Schritt: ein kurzes Gespräch, in dem wir ehrlich klären, ob es passt.",
      en: "I'm taking 10 women right now to execute exactly this plan over the next 12 weeks — own product, first sales, personal guidance. Founding price: €1,997 instead of €3,997 later. The only step: a short call where we honestly figure out if it's a fit.",
    },
    ctaBtn: { de: "Kostenloses Gespräch buchen", en: "Book your free call" },
    fallback: {
      de: "Noch nicht bereit für ein Gespräch? Hol dir den One-Page-Blueprint per E-Mail – er ist bereits auf dem Weg zu dir.",
      en: "Not ready for a call? The one-page blueprint is already on its way to your inbox.",
    },
    disclaimer: {
      de: "Individuelle Ergebnisse unterscheiden sich. Keine Einkommensgarantie. Die genannten Zahlen sind Beispiele.",
      en: "Individual results vary. No income guarantee. Figures shown are illustrative examples.",
    },
  },
} as const;

// ────────────────────────── Context ──────────────────────────
type FaceMode = "yes" | "faceless" | "unsure";
type PostingStatus = "zero" | "posting" | "selling";

interface FunnelState {
  language: Lang;
  followers: number;
  postingStatus: PostingStatus | null;
  faceMode: FaceMode | null;
  skillArea: string | null;
  hoursPerWeek: string | null;
  readiness: string | null;
  name: string;
  email: string;
  instagramHandle: string;
  currentStep: number;
  price: number;
  buyers: number;
}

interface FunnelCtx extends FunnelState {
  set: <K extends keyof FunnelState>(k: K, v: FunnelState[K]) => void;
  next: () => void;
  back: () => void;
  goto: (n: number) => void;
  L: Lang;
  setLang: (l: Lang) => void;
}

const TOTAL_STEPS = 13; // 0..12

const Ctx = createContext<FunnelCtx | null>(null);
const useFunnel = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("FunnelContext missing");
  return c;
};

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
}

// ─────────────────────────── Root ───────────────────────────
function QuizPage() {
  const [state, setState] = useState<FunnelState>({
    language: "en",
    followers: 0,
    postingStatus: null,
    faceMode: null,
    skillArea: null,
    hoursPerWeek: null,
    readiness: null,
    name: "",
    email: "",
    instagramHandle: "",
    currentStep: 0,
    price: 197,
    buyers: 20,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState((s) => ({ ...s, language: detectLang() }));
    setMounted(true);
    trackEvent("quiz_start");
  }, []);

  const ctx: FunnelCtx = useMemo(() => ({
    ...state,
    L: state.language,
    setLang: (l) => setState((s) => ({ ...s, language: l })),
    set: (k, v) => setState((s) => ({ ...s, [k]: v })),
    next: () => setState((s) => {
      trackEvent("step_completed", { step: s.currentStep });
      return { ...s, currentStep: Math.min(TOTAL_STEPS - 1, s.currentStep + 1) };
    }),
    back: () => setState((s) => ({ ...s, currentStep: Math.max(0, s.currentStep - 1) })),
    goto: (n) => setState((s) => ({ ...s, currentStep: n })),
  }), [state]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.currentStep]);

  if (!mounted) return <div className="min-h-screen bg-[color:var(--cream)]" />;

  return (
    <Ctx.Provider value={ctx}>
      <FunnelLayout>
        <StepRouter />
      </FunnelLayout>
    </Ctx.Provider>
  );
}

// ─────────────────────────── Layout ───────────────────────────
function FunnelLayout({ children }: { children: ReactNode }) {
  const { currentStep, back, L, setLang } = useFunnel();
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="min-h-screen bg-[color:var(--cream)] pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[color:var(--cream2)] z-40">
        <div
          className="h-full bg-[color:var(--rose)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-6 flex items-center justify-between">
        <Link to="/" className="eyebrow text-[color:var(--wine)] tracking-[0.2em]">
          Creating Society
        </Link>
        <div className="flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase">
          <button
            onClick={() => setLang("de")}
            className={`px-2 py-1 rounded ${L === "de" ? "text-[color:var(--wine)] font-semibold" : "text-[color:var(--muted-fg)] hover:text-[color:var(--wine)]"}`}
          >DE</button>
          <span className="text-[color:var(--muted-fg)]/40">|</span>
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-1 rounded ${L === "en" ? "text-[color:var(--wine)] font-semibold" : "text-[color:var(--muted-fg)] hover:text-[color:var(--wine)]"}`}
          >EN</button>
        </div>
      </div>

      {/* Back */}
      <div className="max-w-2xl mx-auto px-5 sm:px-6 mt-6 min-h-[24px]">
        {currentStep > 0 && currentStep !== 11 && (
          <button
            onClick={back}
            className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted-fg)] hover:text-[color:var(--wine)] transition"
          >
            {t.back[L]}
          </button>
        )}
      </div>

      <div key={currentStep} className="max-w-2xl mx-auto px-5 sm:px-6 mt-6 animate-[fadeIn_.4s_ease-out]">
        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}

// ─────────────────────────── Step router ───────────────────────────
function StepRouter() {
  const { currentStep } = useFunnel();
  switch (currentStep) {
    case 0: return <StepStart />;
    case 1: return <StepFollowers />;
    case 2: return <StepPosting />;
    case 3: return <StepFace />;
    case 4: return <StepSkill />;
    case 5: return <StepTime />;
    case 6: return <StepReadiness />;
    case 7: return <StepAnalysis />;
    case 8: return <StepBelief />;
    case 9: return <StepCalculator />;
    case 10: return <StepRoadmap />;
    case 11: return <StepLead />;
    case 12: return <StepResult />;
    default: return null;

  }
}

// ─────────────────────────── Shared ui ───────────────────────────
function BigChoice({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-6 py-5 min-h-[64px] rounded-2xl border border-[color:var(--border)] bg-white hover:border-[color:var(--rose)] hover:bg-[color:var(--rose)]/5 transition group"
    >
      <span className="text-[color:var(--ink)] text-base sm:text-lg">{label}</span>
      <span className="float-right text-[color:var(--muted-fg)] group-hover:text-[color:var(--rose)] transition">→</span>
    </button>
  );
}

function QuestionHead({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[color:var(--wine)] leading-tight">
      {children}
    </h2>
  );
}

function PrimaryCTA({ children, onClick, full = true }: { children: ReactNode; onClick: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${full ? "w-full" : ""} inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────── Steps ───────────────────────────
function StepLabel({ n }: { n: number }) {
  const { L } = useFunnel();
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
      {t.qlabel[L](n)}
    </p>
  );
}

function FounderCard({ compact = false }: { compact?: boolean }) {
  const { L } = useFunnel();
  return (
    <div className={`rounded-2xl bg-[color:var(--cream2)] ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] grid place-items-center font-serif text-xl">L</div>
        <div>
          <p className="font-serif text-lg text-[color:var(--wine)]">Laura</p>
          <p className="text-xs tracking-[0.15em] uppercase text-[color:var(--muted-fg)]">Creating Society</p>
        </div>
      </div>
      <p className="mt-4 text-[color:var(--ink)] leading-relaxed serif-italic text-base sm:text-lg">
        {t.hero.diary[L]}
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted-fg)]">{t.hero.signature[L]}</p>
    </div>
  );
}

function ReframeCards() {
  const { L } = useFunnel();
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-xl bg-[color:var(--cream2)] p-4 border border-[color:var(--border)]">
        <p className="text-sm text-[color:var(--muted-fg)] line-through leading-relaxed">{t.hero.reframeLeft[L]}</p>
      </div>
      <div className="rounded-xl bg-white p-4 border border-[color:var(--border)] border-l-4 border-l-[color:var(--rose)]">
        <p className="text-sm text-[color:var(--ink)] leading-relaxed">{t.hero.reframeRight[L]}</p>
      </div>
    </div>
  );
}

// ─────────────────────────── Steps ───────────────────────────
function StepStart() {
  const { L, next } = useFunnel();
  const S = t.start;
  return (
    <div className="pt-10 sm:pt-16 text-center max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] grid place-items-center font-serif text-base">L</div>
        <p className="text-xs sm:text-sm text-[color:var(--muted-fg)]">{S.trust[L]}</p>
      </div>

      <h1 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[color:var(--wine)] leading-[1.05]">
        {S.h1[L]}
      </h1>
      <p className="mt-6 text-base sm:text-lg text-[color:var(--muted-fg)] leading-relaxed">{S.sub[L]}</p>

      <div className="mt-10">
        <PrimaryCTA onClick={next}>{S.cta[L]}</PrimaryCTA>
        <p className="mt-3 text-xs text-[color:var(--muted-fg)] tracking-wider">{S.micro[L]}</p>
      </div>
    </div>
  );
}

function StepFollowers() {
  const { L, set, next, followers } = useFunnel();
  const [val, setVal] = useState<string>(followers ? String(followers) : "");
  const H = t.hero;

  return (
    <div className="space-y-6">
      <StepLabel n={1} />
      <QuestionHead>{H.followersLabel[L]}</QuestionHead>
      <p className="text-[color:var(--muted-fg)] leading-relaxed">{H.followersHint[L]}</p>

      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={H.followersPh[L]}
        className="w-full bg-transparent border-b-2 border-[color:var(--wine)]/30 font-serif text-[color:var(--wine)] py-3 focus:outline-none focus:border-[color:var(--rose)] placeholder:text-[color:var(--wine)]/25"
        style={{ fontSize: "clamp(1.75rem, 6vw, 2.5rem)" }}
      />

      <PrimaryCTA onClick={() => {
        set("followers", Math.max(0, parseInt(val || "0", 10) || 0));
        next();
      }}>
        {H.cta[L]}
      </PrimaryCTA>
    </div>
  );
}


function ChoiceStep<T extends string>({
  q, options, onPick, extra,
}: {
  q: string;
  options: { key: string; label: string }[];
  onPick: (k: T) => void;
  extra?: ReactNode;
}) {
  return (
    <div className="space-y-8">
      <QuestionHead>{q}</QuestionHead>
      <div className="space-y-3">
        {options.map((o) => (
          <BigChoice key={o.key} label={o.label} onClick={() => onPick(o.key as T)} />
        ))}
      </div>
      {extra}
    </div>
  );
}

function StepPosting() {
  const { L, set, next } = useFunnel();
  return (
    <ChoiceStep
      q={t.step1.q[L]}
      options={t.step1.a.map((o) => ({ key: o.key, label: o[L] }))}
      onPick={(k: string) => { set("postingStatus", k as PostingStatus); setTimeout(next, 150); }}
    />
  );
}
function StepFace() {
  const { L, set, next } = useFunnel();
  return (
    <ChoiceStep
      q={t.step2.q[L]}
      options={t.step2.a.map((o) => ({ key: o.key, label: o[L] }))}
      onPick={(k: string) => { set("faceMode", k as FaceMode); setTimeout(next, 150); }}
    />
  );
}
function StepSkill() {
  const { L, set, next } = useFunnel();
  const [reassure, setReassure] = useState(false);
  return (
    <ChoiceStep
      q={t.step3.q[L]}
      options={t.step3.a.map((o) => ({ key: o.key, label: o[L] }))}
      onPick={(k: string) => {
        set("skillArea", k);
        if (k === "unknown") {
          setReassure(true);
          setTimeout(next, 1100);
        } else {
          setTimeout(next, 150);
        }
      }}
      extra={reassure ? (
        <p className="serif-italic text-lg text-[color:var(--rose)] text-center">{t.step3.reassurance[L]}</p>
      ) : null}
    />
  );
}
function StepTime() {
  const { L, set, next } = useFunnel();
  return (
    <ChoiceStep
      q={t.step4.q[L]}
      options={t.step4.a.map((o) => ({ key: o.key, label: o[L] }))}
      onPick={(k: string) => { set("hoursPerWeek", k); setTimeout(next, 150); }}
    />
  );
}
function StepReadiness() {
  const { L, set, next } = useFunnel();
  return (
    <ChoiceStep
      q={t.step5.q[L]}
      options={t.step5.a.map((o) => ({ key: o.key, label: o[L] }))}
      onPick={(k: string) => { set("readiness", k); setTimeout(next, 150); }}
    />
  );
}

function StepAnalysis() {
  const { L, next, postingStatus, faceMode, hoursPerWeek } = useFunnel();
  const [visible, setVisible] = useState(0);
  const timers = useRef<number[]>([]);

  const statusLabel = t.step1.a.find((a) => a.key === postingStatus)?.[L] ?? "—";
  const timeLabel = t.step4.a.find((a) => a.key === hoursPerWeek)?.[L] ?? "—";
  const faceLabel =
    faceMode === "yes" ? t.analysis.face_yes[L] :
    faceMode === "faceless" ? t.analysis.face_faceless[L] :
    t.analysis.face_unsure[L];

  const lines = [
    `${t.analysis.start[L]}: ${statusLabel}`,
    `${t.analysis.model[L]}: ${faceLabel}`,
    `${t.analysis.time[L]}: ${timeLabel}`,
  ];

  useEffect(() => {
    timers.current.push(window.setTimeout(() => setVisible(1), 400));
    timers.current.push(window.setTimeout(() => setVisible(2), 900));
    timers.current.push(window.setTimeout(() => setVisible(3), 1400));
    timers.current.push(window.setTimeout(() => next(), 2500));
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 pt-10">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[color:var(--rose)] animate-pulse" />
        <p className="eyebrow text-[color:var(--muted-fg)]">
          {L === "de" ? "Analysiere deine Antworten…" : "Analyzing your answers…"}
        </p>
      </div>
      <div className="space-y-4 pt-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 transition-all duration-500 ${visible > i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <span className="text-[color:var(--rose)] text-xl leading-none mt-1">✓</span>
            <span className="text-lg text-[color:var(--ink)]">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBelief() {
  const { L, next, followers } = useFunnel();
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)] leading-[1.05]">
        {t.belief.h[L]}
      </h2>
      <p className="text-lg text-[color:var(--ink)] leading-relaxed">
        {t.belief.body[L](followers)}
      </p>
      <PrimaryCTA onClick={next}>{t.belief.cta[L]}</PrimaryCTA>
    </div>
  );
}

function StepCalculator() {
  const { L, next, followers, price, buyers, set } = useFunnel();
  const result = price * buyers;
  const pct = followers > 0 ? ((buyers / followers) * 100).toFixed(1) : "0.0";
  const currency = L === "de" ? "de-DE" : "en-US";

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">
        {t.calc.h[L]}
      </h2>

      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-[color:var(--border)] space-y-8">
        {/* Price */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-[color:var(--wine)]">{t.calc.price[L]}</span>
            <span className="font-serif text-2xl text-[color:var(--wine)]">€{price}</span>
          </div>
          <input
            type="range" min={47} max={497} step={10} value={price}
            onChange={(e) => { set("price", parseInt(e.target.value)); trackEvent("calculator_interacted", { field: "price" }); }}
            className="mt-3 w-full accent-[color:var(--rose)] h-2"
          />
        </div>
        {/* Buyers */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-[color:var(--wine)]">{t.calc.buyers[L]}</span>
            <span className="font-serif text-2xl text-[color:var(--wine)]">{buyers}</span>
          </div>
          <input
            type="range" min={5} max={100} step={1} value={buyers}
            onChange={(e) => { set("buyers", parseInt(e.target.value)); trackEvent("calculator_interacted", { field: "buyers" }); }}
            className="mt-3 w-full accent-[color:var(--rose)] h-2"
          />
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-[color:var(--border)] text-center">
          <p className="eyebrow text-[color:var(--muted-fg)]">= </p>
          <p className="mt-2 font-serif text-5xl sm:text-6xl tracking-tight text-[color:var(--rose)]">
            €{result.toLocaleString(currency)}<span className="text-2xl text-[color:var(--muted-fg)] ml-2">{t.calc.perMonth[L]}</span>
          </p>
          <p className="mt-4 text-sm text-[color:var(--muted-fg)]">
            {followers > 0 ? t.calc.context[L](followers, buyers, pct) : t.calc.contextZero[L]}
          </p>
        </div>
      </div>

      <p className="serif-italic text-[color:var(--muted-fg)] text-center">{t.calc.honesty[L]}</p>

      <PrimaryCTA onClick={next}>{t.calc.cta[L]}</PrimaryCTA>
    </div>
  );
}

function StepRoadmap() {
  const { L, next, postingStatus, faceMode } = useFunnel();
  const intro = postingStatus ? t.roadmap.intro[postingStatus][L] : "";

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">
        {t.roadmap.h[L]}
      </h2>
      {intro && <p className="text-lg text-[color:var(--ink)] leading-relaxed">{intro}</p>}

      <div className="relative pl-8 space-y-8 border-l-2 border-[color:var(--rose)]/25">
        {t.roadmap.rows.map((r, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] grid place-items-center font-serif text-sm">
              {i + 1}
            </span>
            <p className="font-serif text-xl text-[color:var(--wine)]">{r.w[L]}</p>
            <p className="mt-1 text-[color:var(--muted-fg)] leading-relaxed">{r.d[L]}</p>
          </div>
        ))}
      </div>

      {faceMode === "faceless" && (
        <p className="serif-italic text-[color:var(--rose)]">{t.roadmap.facelessNote[L]}</p>
      )}

      <PrimaryCTA onClick={next}>{t.roadmap.cta[L]}</PrimaryCTA>
    </div>
  );
}

function StepLead() {
  const { L, set, next, name, email, instagramHandle } = useFunnel();
  const [n, setN] = useState(name);
  const [e, setE] = useState(email);
  const [h, setH] = useState(instagramHandle);
  const [pending, setPending] = useState(false);

  const field = "mt-2 w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-4 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--rose)] min-h-[52px]";

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setPending(true);
    set("name", n.trim());
    set("email", e.trim());
    set("instagramHandle", h.trim());
    trackEvent("lead_captured", { email: e.trim(), followers: undefined });
    // TODO: POST { name, email, instagramHandle, ...quizAnswers } to Supabase / backend
    await new Promise((r) => setTimeout(r, 400));
    setPending(false);
    next();
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <div>
        <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">{t.lead.h[L]}</h2>
        <p className="mt-3 text-[color:var(--muted-fg)] leading-relaxed">{t.lead.sub[L]}</p>
      </div>

      <label className="block text-sm">
        <span className="eyebrow text-[color:var(--wine)]">{t.lead.name[L]}</span>
        <input required value={n} onChange={(ev) => setN(ev.target.value)} className={field} autoComplete="given-name" />
      </label>
      <label className="block text-sm">
        <span className="eyebrow text-[color:var(--wine)]">{t.lead.email[L]}</span>
        <input required type="email" value={e} onChange={(ev) => setE(ev.target.value)} className={field} autoComplete="email" />
      </label>
      <label className="block text-sm">
        <span className="eyebrow text-[color:var(--wine)]">{t.lead.handle[L]}</span>
        <div className="mt-2 flex items-center rounded-xl border border-[color:var(--border)] bg-white focus-within:border-[color:var(--rose)]">
          <span className="pl-4 pr-1 text-[color:var(--muted-fg)] text-base">@</span>
          <input
            value={h}
            onChange={(ev) => setH(ev.target.value.replace(/^@/, ""))}
            placeholder="yourhandle"
            className="flex-1 bg-transparent py-4 pr-4 text-base text-[color:var(--ink)] focus:outline-none min-h-[52px]"
          />
        </div>
        <span className="mt-1 block text-xs text-[color:var(--muted-fg)]">{t.lead.handleHint[L]}</span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition disabled:opacity-60"
      >
        {pending ? "…" : t.lead.submit[L]}
      </button>
      <p className="text-center text-xs text-[color:var(--muted-fg)] tracking-wider">{t.lead.small[L]}</p>
    </form>
  );
}

function StepResult() {
  const { L, name, followers, postingStatus, faceMode, hoursPerWeek, price, buyers } = useFunnel();
  const currency = L === "de" ? "de-DE" : "en-US";
  const goal = price * buyers;

  const statusLabel = t.step1.a.find((a) => a.key === postingStatus)?.[L] ?? "—";
  const timeLabel = t.step4.a.find((a) => a.key === hoursPerWeek)?.[L] ?? "—";
  const faceLabel =
    faceMode === "yes" ? t.analysis.face_yes[L] :
    faceMode === "faceless" ? t.analysis.face_faceless[L] :
    t.analysis.face_unsure[L];

  return (
    <div className="space-y-10">
      <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)] leading-tight serif-italic">
        {t.result.greet[L](name || (L === "de" ? "du" : "you"))}
      </h2>

      {/* Summary */}
      <div className="rounded-2xl bg-white border border-[color:var(--border)] divide-y divide-[color:var(--border)]">
        {[
          [t.result.summary.followers[L], followers.toLocaleString(currency)],
          [t.result.summary.status[L], statusLabel],
          [t.result.summary.face[L], faceLabel],
          [t.result.summary.time[L], timeLabel],
          [t.result.summary.goal[L], `€${goal.toLocaleString(currency)} ${t.calc.perMonth[L]}`],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between px-5 py-4">
            <span className="text-xs tracking-[0.15em] uppercase text-[color:var(--muted-fg)]">{k}</span>
            <span className="font-serif text-lg text-[color:var(--wine)] text-right">{v}</span>
          </div>
        ))}
      </div>

      {/* Primary CTA */}
      <div className="rounded-2xl bg-[color:var(--wine)] text-[color:var(--cream)] p-6 sm:p-8">
        <h3 className="font-serif text-3xl sm:text-4xl tracking-tight leading-tight">
          {t.result.ctaH[L]}
        </h3>
        <p className="mt-4 text-[color:var(--cream)]/80 leading-relaxed">{t.result.ctaBody[L]}</p>
        <a
          href="#book"
          onClick={() => trackEvent("call_click")}
          className="mt-6 inline-flex items-center justify-center w-full px-8 py-4 min-h-[56px] rounded-full bg-[color:var(--rose)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
        >
          {t.result.ctaBtn[L]}
        </a>
      </div>

      <div id="book">
        <CalendlyEmbed />
      </div>

      <p className="text-center serif-italic text-[color:var(--muted-fg)]">{t.result.fallback[L]}</p>

      <p className="text-center text-[11px] text-[color:var(--muted-fg)]/70 leading-relaxed">
        {t.result.disclaimer[L]}
      </p>
    </div>
  );
}
