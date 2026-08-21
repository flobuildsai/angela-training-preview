import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import logoDark from "@/assets/logo-dark.png";

export const Route = createFileRoute("/masterclass")({
  head: () => ({
    meta: [
      { title: "Kostenloses Training | Creating Society" },
      {
        name: "description",
        content:
          "Kostenloses 30-Minuten-Training: Wie du aus deinem Content eine Personal Brand und ein eigenes digitales Angebot baust. Von Laura, Gründerin von Creating Society.",
      },
      { property: "og:title", content: "Kostenloses Training | Creating Society" },
      {
        property: "og:description",
        content:
          "In 30 Minuten: Nische, Short-Form-Content, digitales Produkt und mehrere Einnahmequellen. Jetzt kostenlos anmelden.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainingPage,
});

const heroImg = lauraNew.url;
const portraitImg = lauraPortrait.url;
const workImg = lauraWork.url;

const lessons = [
  {
    n: "01",
    title: "Werde selbst zur Nische",
    body: "Verbinde das, was dich wirklich interessiert, mit einer klaren Strategie, damit du dich weiterentwickeln kannst, ohne dein Profil jedes halbe Jahr neu zu erfinden.",
  },
  {
    n: "02",
    title: "Short-Form, das läuft",
    body: "Hooks, Aufbau, Schnitt und Qualität: die Stellschrauben, mit denen Reels aus der Follower-Blase herauskommen und neue Menschen erreichen.",
  },
  {
    n: "03",
    title: "Dein digitales Angebot",
    body: "Wie aus deinem Wissen ein Produkt wird, das Menschen kaufen wollen, ohne dass du deine Zeit gegen Geld tauschen musst.",
  },
  {
    n: "04",
    title: "Mehrere Einnahmequellen",
    body: "Dein Creator-Ökosystem: eigenes Produkt, Kooperationen, UGC und Affiliate, sauber aufeinander abgestimmt.",
  },
];

const stats = [
  { value: "6,9 Mio.", label: "Views in einem Monat" },
  { value: "12", label: "Wochen bis zum Angebot" },
  { value: "0", label: "Follower nötig zum Start" },
];

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Cta({
  children = "Kostenlos anmelden",
  variant = "dark",
}: {
  children?: string;
  variant?: "dark" | "light";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-9 py-4 min-h-[56px] text-[12px] font-semibold tracking-[0.18em] uppercase transition hover:opacity-90";
  const styles =
    variant === "dark"
      ? "bg-[color:var(--wine)] text-[color:var(--cream)]"
      : "bg-[color:var(--cream)] text-[color:var(--wine)]";
  return (
    <Link to="/call" className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function TrainingPage() {
  useReveal();

  return (
    <main className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoDark} alt="Creating Society" className="h-6 w-auto invert brightness-0 opacity-90" />
          </Link>
          <span className="pill bg-white/15 text-[color:var(--cream)]">Kostenloses Training</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[92vh] grain flex items-end">
        <img
          src={heroImg}
          alt="Laura, Gründerin von Creating Society"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--wine)]/90 via-[color:var(--wine)]/45 to-[color:var(--wine)]/35" />
        <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 text-[color:var(--cream)]">
          <div className="max-w-3xl space-y-6 rv">
            <p className="eyebrow opacity-80">Kostenloses Training</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Bau dir eine Personal Brand{" "}
              <span className="serif-italic">und mach aus deinem Content Einkommen.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--cream)]/85 max-w-xl">
              In 30 Minuten zeige ich dir den Weg, den ich selbst gegangen bin: von Reels
              ohne Einnahmen zu einer Marke mit eigenem digitalen Angebot, das jeden Tag
              verkauft.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Cta variant="light" />
              <span className="text-xs tracking-[0.18em] uppercase text-[color:var(--cream)]/70">
                30 Minuten · kostenlos · sofort verfügbar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Die Chance */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Post-Karte */}
          <div className="rv">
            <div className="mx-auto max-w-sm rounded-[26px] bg-white p-3 soft-shadow rotate-[-2.5deg] transition-transform duration-500 hover:rotate-0">
              <div className="flex items-center gap-3 px-2 py-3">
                <img
                  src={portraitImg}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="text-sm font-medium text-[color:var(--ink)]">Laura</span>
              </div>
              <img
                src={workImg}
                alt="Laura beim Content-Erstellen"
                className="w-full rounded-[18px] object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rv">
            <p className="pill">Die Chance</p>
            <h2 className="mt-6 font-serif text-3xl sm:text-5xl leading-[1.05] text-[color:var(--wine)]">
              Der neue Karriereweg beginnt{" "}
              <span className="serif-italic">online.</span>
            </h2>
            <div className="mt-7 space-y-5 text-[15px] sm:text-[17px] leading-relaxed text-[color:var(--muted-fg)]">
              <p>
                Deine Erfahrung, dein Blick auf die Dinge und das, was du kannst, sind
                heute genug, um daraus ein echtes Business zu bauen. Nicht irgendwann,
                sondern mit dem, was du jetzt schon hast.
              </p>
              <p>
                Creator posten längst nicht mehr nur. Sie bauen Marken, starten eigene
                Angebote, arbeiten mit Unternehmen zusammen und verkaufen digitale
                Produkte.
              </p>
              <p>
                Der Unterschied liegt nicht darin, gesehen zu werden.{" "}
                <strong className="font-semibold text-[color:var(--wine)]">
                  Er liegt darin, dass man dir vertraut.
                </strong>
              </p>
              <p>
                Genau das zeige ich dir im Training: wie du eine Marke aufbaust, die
                wächst, Türen öffnet und Einnahmen bringt.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Marquee */}
      <div className="border-y border-[color:var(--border)] bg-[color:var(--wine)] text-[color:var(--cream)] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="eyebrow px-6 opacity-90">
              Kostenloses Training <span className="px-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Was du lernst */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-32">
        <div className="max-w-2xl rv">
          <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Was du lernst</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl leading-[1.08] text-[color:var(--wine)]">
            In 30 Minuten weißt du, <span className="serif-italic">wie es geht.</span>
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-x-14 gap-y-12">
          {lessons.map((l) => (
            <article key={l.n} className="rv border-t border-[color:var(--border)] pt-6">
              <span className="serif-italic text-2xl text-[color:var(--rose)]">{l.n}</span>
              <h3 className="mt-3 font-serif text-2xl sm:text-[1.9rem] leading-snug text-[color:var(--wine)]">
                {l.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
                {l.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Mentorin */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Polaroid */}
          <div className="rv">
            <div className="relative mx-auto max-w-sm rotate-[-3deg] bg-[color:var(--cream)] p-4 pb-14 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0">
              <span className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-[-2deg] bg-[color:var(--rose)]/35" />
              <img
                src={portraitImg}
                alt="Laura"
                className="w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6 rv">
            <p className="pill bg-white/10 text-[color:var(--cream)] border-white/20">
              Deine Mentorin
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl leading-[1.02]">
              Hi, ich bin <span className="serif-italic">Laura.</span>
            </h2>
            <p className="text-lg sm:text-xl opacity-80">Ich habe das hier für dich gebaut.</p>
            <div className="space-y-5 text-[15px] sm:text-[17px] leading-relaxed opacity-75">
              <p>
                Ich bin Gründerin von Creating Society. Ich habe monatelang Content
                gemacht, Millionen Views gesammelt und trotzdem kaum etwas verdient, weil
                mir eine Sache gefehlt hat: ein eigenes Angebot.
              </p>
              <p>
                Als ich das geändert habe, kamen die ersten Verkäufe innerhalb weniger
                Wochen, teilweise über Nacht. Heute zeige ich Frauen genau diesen Weg,
                Schritt für Schritt.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-6 py-6 border-y border-white/20">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-serif text-3xl sm:text-4xl">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] opacity-60">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-lg sm:text-xl">
              Jetzt zeige ich dir, wie du denselben Weg gehst.
            </p>
            <div className="pt-2">
              <Cta variant="light" />
            </div>
          </div>
        </div>

      </section>

      {/* Abschluss-CTA */}
      <section className="relative grain">
        <img src={workImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[color:var(--wine)]/85" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center text-[color:var(--cream)] space-y-7 rv">
          <p className="eyebrow opacity-80">Jetzt starten</p>
          <h2 className="font-serif text-3xl sm:text-6xl leading-[1.05]">
            Dein Content ist schon da.{" "}
            <span className="serif-italic">Jetzt kommt das Angebot.</span>
          </h2>
          <p className="text-[15px] sm:text-lg leading-relaxed text-[color:var(--cream)]/85 max-w-xl mx-auto">
            Sichere dir das kostenlose Training und danach ein persönliches
            Strategiegespräch, in dem wir uns deine Ausgangslage konkret ansehen.
          </p>
          <div className="pt-2">
            <Cta variant="light" />
          </div>
        </div>
      </section>

      <footer className="bg-[color:var(--cream)] py-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-[color:var(--muted-fg)]">
          <p>© {new Date().getFullYear()} Creating Society</p>
          <nav className="flex gap-6">
            <Link to="/impressum" className="hover:text-[color:var(--wine)] transition">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-[color:var(--wine)] transition">
              Datenschutz
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
