import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portraitImg from "@/assets/laura-call.jpg";
import mentorImg from "@/assets/mentor.jpg";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creating Society — Kostenloses Strategiegespräch" },
      {
        name: "description",
        content:
          "In 30 Minuten zeigen wir dir, wie du aus deiner Reichweite ein digitales Business machst. Kostenloses Strategiegespräch mit dem Creating-Society-Team.",
      },
      { property: "og:title", content: "Creating Society — Kostenloses Strategiegespräch" },
      {
        property: "og:description",
        content: "Aus Aufmerksamkeit wird Einkommen. Buch dir dein kostenloses 30-Minuten-Gespräch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CallLandingPage,
});

// ─────────────────────────────────────────────────────────────
// ZAHLEN — TODO: durch echte, belegbare Zahlen ersetzen.
// Platzhalter, klar als solche markiert.
// ─────────────────────────────────────────────────────────────
const stats = [
  { value: "3M+", label: "Monatliche Views" },
  { value: "39K", label: "Community" },
  { value: "120+", label: "Begleitete Creator" },
  { value: "Marbella / Dubai", label: "Von überall gebaut" },
];

// Bleibt leer, bis echte, verifizierte Stimmen vorliegen.
type Testimonial = { quote: string; name: string; handle: string };
const testimonials: Testimonial[] = [];

const painPoints = [
  {
    title: "Du postest — aber es passiert nichts.",
    body: "Die Views kommen, manchmal sogar richtig gut. Nur zahlt dir davon niemand etwas. Aufmerksamkeit ohne Angebot ist ein teures Hobby.",
  },
  {
    title: "Du weißt nicht, wofür du stehst.",
    body: "Mal Lifestyle, mal Business, mal Persönliches. Die Leute mögen dich — aber sie wissen nicht, warum sie dir Geld geben sollten.",
  },
  {
    title: "Du hast ein Angebot, das keiner kauft.",
    body: "Du hast etwas gebaut. Es liegt in deiner Bio. Und es verkauft sich alle paar Wochen mal. Das ist kein Angebot-Problem, das ist ein Positionierungs-Problem.",
  },
  {
    title: "Du wartest auf die Zahl, die nie reicht.",
    body: "10K. 50K. 100K. Es gibt immer eine nächste Schwelle. Menschen mit 4.000 echten Followern verdienen mehr als welche mit 400.000.",
  },
];

const steps = [
  {
    index: "01",
    title: "Positionierung",
    body: "Wir schärfen, wofür du stehst — so klar, dass jemand nach drei Sekunden weiß, warum er dir folgt und was er von dir kaufen würde.",
  },
  {
    index: "02",
    title: "Reichweite",
    body: "Content, der nicht auf Zufall wartet. Formate, die planbar Aufmerksamkeit erzeugen und die richtigen Leute anziehen statt irgendwelche.",
  },
  {
    index: "03",
    title: "Angebot & Verkauf",
    body: "Ein Angebot, das zu dir und deiner Community passt — plus der Weg vom Reel bis zum Kauf, der ohne Dauer-Launch funktioniert.",
  },
];

const forYou = [
  "Du bist bereits sichtbar oder postest regelmäßig",
  "Du willst dein eigenes Angebot statt Kooperationen hinterherzulaufen",
  "Du hast Skills, Erfahrung oder ein Thema, das anderen weiterhilft",
  "Du bist bereit, 6–10 Stunden pro Woche investiert zu arbeiten",
];

const notForYou = [
  "Du suchst passives Einkommen ohne Aufwand",
  "Du willst fertige Produkte weiterverkaufen",
  "Du willst Follower-Zahlen, aber kein Business",
  "Du willst, dass jemand anderes es für dich macht",
];

const callAgenda = [
  {
    index: "01",
    title: "Bestandsaufnahme",
    body: "Wir schauen uns deinen Account, dein Thema und dein aktuelles Angebot an — ehrlich, ohne Schönreden.",
  },
  {
    index: "02",
    title: "Der Engpass",
    body: "Wir benennen die eine Sache, die dich gerade wirklich aufhält. Meistens ist es nicht die, die du vermutest.",
  },
  {
    index: "03",
    title: "Dein nächster Schritt",
    body: "Du gehst mit einem konkreten Plan für die nächsten 90 Tage raus. Ob du danach mit uns arbeitest, entscheidest du.",
  },
];

const faqs = [
  {
    q: "Was kostet das Gespräch?",
    a: "Nichts. Es ist ein 30-minütiges Strategiegespräch per Zoom. Du zahlst nichts und musst nichts kaufen. Wenn es passt, sprechen wir über eine Zusammenarbeit — wenn nicht, hast du trotzdem einen klaren Plan.",
  },
  {
    q: "Ich habe zu wenig Follower. Lohnt sich das?",
    a: "Wir arbeiten regelmäßig mit Accounts unter 10.000 Followern. Entscheidend ist nicht die Größe, sondern wie klar dein Thema ist und wie sehr dir die Menschen zuhören.",
  },
  {
    q: "Ich habe kaum Zeit.",
    a: "Realistisch brauchst du 6–10 Stunden pro Woche. Wenn du die nicht hast, ist der Zeitpunkt gerade falsch — und das sagen wir dir im Call auch ehrlich.",
  },
  {
    q: "Meine Nische ist zu speziell.",
    a: "Spezifisch ist ein Vorteil, kein Problem. Je enger dein Thema, desto einfacher die Positionierung und desto teurer darf dein Angebot sein.",
  },
  {
    q: "Was passiert nach dem Gespräch?",
    a: "Du bekommst eine Zusammenfassung mit deinen nächsten Schritten. Wenn wir beide das Gefühl haben, dass eine Zusammenarbeit Sinn ergibt, zeigen wir dir, wie sie aussehen würde. Kein Druck, kein Nachtelefonieren.",
  },
];

// ── Reveal-on-scroll ──────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      setPast(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, past };
}

function useBookingVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("call");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) trackEvent("call_section_view");
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return visible;
}

function scrollToCall(source: string) {
  trackEvent("call_cta_click", { source });
  document.getElementById("call")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Bausteine ─────────────────────────────────────────────────
function CtaButton({
  source,
  children,
  tone = "rose",
  className = "",
}: {
  source: string;
  children: React.ReactNode;
  tone?: "rose" | "wine" | "cream";
  className?: string;
}) {
  const tones = {
    rose: "bg-[color:var(--rose)] text-[color:var(--cream)]",
    wine: "bg-[color:var(--wine)] text-[color:var(--cream)]",
    cream: "bg-[color:var(--cream)] text-[color:var(--wine)]",
  } as const;

  return (
    <button
      type="button"
      onClick={() => scrollToCall(source)}
      className={
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:opacity-90 " +
        tones[tone] +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

function SectionIndex({ index, title }: { index: string; title: string }) {
  return (
    <p className="eyebrow text-[color:var(--rose)]">
      {index} — {title}
    </p>
  );
}

// ── Seite ─────────────────────────────────────────────────────
function CallLandingPage() {
  useReveal();
  const { progress, past } = useScrollState();
  const bookingVisible = useBookingVisible();

  return (
    <>
      {/* Fortschrittsbalken */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-[color:var(--rose)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Sticky Header */}
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 " +
          (past
            ? "bg-[color:var(--cream)]/90 backdrop-blur-md border-b border-[color:var(--border)] text-[color:var(--ink)]"
            : "bg-transparent text-[color:var(--cream)]")
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-xl tracking-tight">
            Creating <span className="serif-italic">Society</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#weg" className="hidden text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 md:inline">
              Der Weg
            </a>
            <a href="#gespraech" className="hidden text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 md:inline">
              Der Call
            </a>
            <a href="#faq" className="hidden text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100 md:inline">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => scrollToCall("header")}
              className={
                "hidden rounded-full px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90 sm:inline-flex " +
                (past
                  ? "bg-[color:var(--wine)] text-[color:var(--cream)]"
                  : "bg-[color:var(--rose)] text-[color:var(--cream)]")
              }
            >
              Call buchen
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-title"
          className="grain relative overflow-hidden bg-[color:var(--wine)] text-[color:var(--cream)]"
        >
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="rv">
              <p className="eyebrow text-[color:var(--rose)]">Kostenloses Strategiegespräch</p>
              <h1
                id="hero-title"
                className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
              >
                Deine Reichweite ist Geld wert.{" "}
                <span className="serif-italic text-[color:var(--rose)]">Nur nicht so, wie du sie gerade nutzt.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[color:var(--cream)]/75 sm:text-lg">
                In 30 Minuten schauen wir uns deinen Account an, finden den einen Engpass, der dich aufhält,
                und du gehst mit einem konkreten Plan für die nächsten 90 Tage raus. Kostenlos, ohne Verkaufsdruck.
              </p>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CtaButton source="hero" className="w-full sm:w-auto">
                  Kostenloses Gespräch buchen
                </CtaButton>
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--cream)]/55">
                  Kostenlos · 30 Minuten · Zoom
                </p>
              </div>
            </div>

            <div className="rv d2 relative">
              <div
                className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-70"
                style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.14), transparent 65%)" }}
                aria-hidden="true"
              />
              <img
                src={portraitImg}
                alt="Laura, Gründerin von Creating Society, an ihrem Schreibtisch"
                width={1024}
                height={1280}
                className="relative w-full rounded-[1.75rem] object-cover shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* Zahlen-Leiste */}
          <div className="relative border-t border-[color:var(--cream)]/12">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-2 divide-[color:var(--cream)]/12 md:grid-cols-4 md:divide-x">
                {stats.map((s) => (
                  <div key={s.label} className="border-t border-[color:var(--cream)]/12 px-2 py-8 text-center md:border-t-0">
                    <p className="font-serif text-2xl text-[color:var(--cream)] sm:text-3xl">{s.value}</p>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.18em] text-[color:var(--cream)]/55">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────── */}
        <section aria-labelledby="problem-title" className="bg-[color:var(--background)] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-2xl">
              <SectionIndex index="01" title="Der Status quo" />
              <h2 id="problem-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Kommt dir das <span className="serif-italic text-[color:var(--rose)]">bekannt vor?</span>
              </h2>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--border)] md:grid-cols-2">
              {painPoints.map((p, i) => (
                <article
                  key={p.title}
                  className={"rv bg-[color:var(--background)] p-8 sm:p-10 " + (i % 2 === 1 ? "d1" : "")}
                >
                  <span className="font-serif text-3xl text-[color:var(--rose)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl leading-snug">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-fg)]">{p.body}</p>
                </article>
              ))}
            </div>

            <p className="rv d2 mt-14 max-w-3xl serif-italic text-2xl leading-relaxed text-[color:var(--wine)] sm:text-3xl">
              Das Problem ist nie die Reichweite. Es ist der fehlende Weg von der Aufmerksamkeit zum Einkommen.
            </p>
          </div>
        </section>

        {/* ── DER WEG ──────────────────────────────────────── */}
        <section id="weg" aria-labelledby="weg-title" className="bg-[color:var(--cream2)] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-2xl md:ml-auto md:text-right">
              <SectionIndex index="02" title="Der Weg" />
              <h2 id="weg-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Drei Schritte, <span className="serif-italic text-[color:var(--rose)]">nicht dreißig.</span>
              </h2>
            </div>

            <div className="mt-16 space-y-0">
              {steps.map((s, i) => (
                <div
                  key={s.index}
                  className={
                    "rv grid gap-6 border-t border-[color:var(--border)] py-10 md:grid-cols-[auto_1fr_1.2fr] md:gap-12 md:py-14 " +
                    (i === 1 ? "d1" : i === 2 ? "d2" : "")
                  }
                >
                  <span className="font-serif text-4xl text-[color:var(--rose)]/50 md:text-5xl">{s.index}</span>
                  <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{s.title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-[color:var(--muted-fg)] sm:text-base">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUALIFIKATION ────────────────────────────────── */}
        <section aria-labelledby="fit-title" className="bg-[color:var(--background)] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-2xl">
              <SectionIndex index="03" title="Passt das?" />
              <h2 id="fit-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Für wen dieses Gespräch <span className="serif-italic text-[color:var(--rose)]">gemacht ist.</span>
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              <div className="rv rounded-2xl bg-[color:var(--wine)] p-8 text-[color:var(--cream)] sm:p-10">
                <p className="eyebrow text-[color:var(--rose)]">Passt</p>
                <ul className="mt-6 space-y-4">
                  {forYou.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[color:var(--cream)]/85">
                      <span aria-hidden="true" className="mt-[2px] text-[color:var(--rose)]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rv d1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream2)] p-8 sm:p-10">
                <p className="eyebrow text-[color:var(--muted-fg)]">Passt nicht</p>
                <ul className="mt-6 space-y-4">
                  {notForYou.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      <span aria-hidden="true" className="mt-[2px]">
                        ✕
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS IM CALL PASSIERT ─────────────────────────── */}
        <section
          id="gespraech"
          aria-labelledby="call-title"
          className="grain relative bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-32"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rv max-w-2xl">
              <SectionIndex index="04" title="Das Gespräch" />
              <h2 id="call-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                30 Minuten, die deine <span className="serif-italic text-[color:var(--rose)]">nächsten 90 Tage</span> sortieren.
              </h2>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {callAgenda.map((a, i) => (
                <div key={a.index} className={"rv " + (i === 1 ? "d1" : i === 2 ? "d2" : "")}>
                  <span className="font-serif text-4xl text-[color:var(--rose)]/60">{a.index}</span>
                  <h3 className="mt-4 font-serif text-2xl">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--cream)]/70">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="rv d2 mt-14 border-t border-[color:var(--cream)]/12 pt-10">
              <p className="max-w-2xl serif-italic text-xl text-[color:var(--cream)]/85 sm:text-2xl">
                Kein Pitch-Marathon, kein künstlicher Druck. Wenn eine Zusammenarbeit keinen Sinn ergibt, sagen wir das.
              </p>
              <CtaButton source="agenda" className="mt-8">
                Termin sichern
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── PROOF (nur wenn echte Stimmen vorliegen) ─────── */}
        {testimonials.length > 0 && (
          <section aria-labelledby="proof-title" className="bg-[color:var(--cream2)] py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
              <div className="rv max-w-2xl">
                <SectionIndex index="05" title="Stimmen" />
                <h2 id="proof-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                  Was andere <span className="serif-italic text-[color:var(--rose)]">sagen.</span>
                </h2>
              </div>
              <div className="mt-14 grid gap-8 md:grid-cols-3">
                {testimonials.map((t) => (
                  <figure key={t.handle} className="rv rounded-2xl bg-[color:var(--background)] p-8">
                    <blockquote className="serif-italic text-lg leading-relaxed">„{t.quote}“</blockquote>
                    <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
                      {t.name} · {t.handle}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ÜBER LAURA ───────────────────────────────────── */}
        <section aria-labelledby="laura-title" className="bg-[color:var(--background)] py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="rv">
              <img
                src={mentorImg}
                alt="Laura im Gespräch mit einer Creatorin"
                loading="lazy"
                className="w-full rounded-[1.75rem] object-cover shadow-[0_30px_80px_-40px_rgba(26,18,9,0.45)]"
              />
            </div>
            <div className="rv d1">
              <SectionIndex index={testimonials.length > 0 ? "06" : "05"} title="Hinter Creating Society" />
              <h2 id="laura-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Ich bin <span className="serif-italic text-[color:var(--rose)]">Laura.</span>
              </h2>
              <div className="mt-7 space-y-5 text-sm leading-relaxed text-[color:var(--muted-fg)] sm:text-base">
                <p>
                  Ich habe bei null angefangen: kein Netzwerk, kein Publikum, kein Produkt. Nur ein Handy und die
                  Entscheidung, jeden Tag etwas zu veröffentlichen, das jemandem hilft.
                </p>
                <p>
                  Was ich dabei gelernt habe: Reichweite ist der einfache Teil. Der schwierige Teil ist, sie in etwas
                  zu übersetzen, das dir gehört — ein Angebot, eine Positionierung, ein Business, das nicht davon
                  abhängt, ob eine Marke dich diesen Monat bucht.
                </p>
                <p>
                  Genau das machen wir bei Creating Society. Kein Hype, kein Rezept von der Stange. Sondern die
                  Struktur, mit der aus Aufmerksamkeit ein Einkommen wird.
                </p>
              </div>
              <CtaButton source="story" tone="wine" className="mt-9">
                Mit dem Team sprechen
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section id="faq" aria-labelledby="faq-title" className="bg-[color:var(--cream2)] py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="rv">
              <SectionIndex index={testimonials.length > 0 ? "07" : "06"} title="Fragen" />
              <h2 id="faq-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Bevor du <span className="serif-italic text-[color:var(--rose)]">buchst.</span>
              </h2>
            </div>
            <div className="rv d1">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-[color:var(--border)]">
                    <AccordionTrigger className="py-6 text-left font-serif text-xl hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── BUCHUNG ──────────────────────────────────────── */}
        <section
          id="call"
          aria-labelledby="booking-title"
          className="grain relative bg-[color:var(--wine)] py-24 text-[color:var(--cream)] md:py-32"
        >
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <p className="eyebrow text-[color:var(--rose)]">Termin wählen</p>
            <h2 id="booking-title" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Such dir einen Slot, <span className="serif-italic text-[color:var(--rose)]">der dir passt.</span>
            </h2>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--cream)]/60">
              <li>100 % kostenlos</li>
              <li>30 Minuten per Zoom</li>
              <li>Kein Verkaufsdruck</li>
              <li>Konkreter 90-Tage-Plan</li>
            </ul>

            <div className="mt-12 text-left">
              <CalendlyEmbed />
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[color:var(--background)] py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left">
          <p className="font-serif text-lg">
            Creating <span className="serif-italic">Society</span>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
            <Link to="/masterclass" className="hover:text-[color:var(--wine)]">
              Masterclass
            </Link>
            <Link to="/quiz" className="hover:text-[color:var(--wine)]">
              Quiz
            </Link>
            <a href="#call" className="hover:text-[color:var(--wine)]">
              Call buchen
            </a>
          </nav>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA ──────────────────────────────── */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--cream)]/12 bg-[color:var(--wine)]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden " +
          (bookingVisible ? "translate-y-full" : "translate-y-0")
        }
      >
        <button
          type="button"
          onClick={() => scrollToCall("mobile_bar")}
          className="w-full rounded-full bg-[color:var(--rose)] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--cream)]"
        >
          Kostenloses Gespräch buchen
        </button>
      </div>
    </>
  );
}
