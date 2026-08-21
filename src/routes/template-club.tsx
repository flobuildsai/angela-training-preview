import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import logoDark from "@/assets/logo-dark.png";
import colWellness from "@/assets/col-wellness.jpg";
import colPink from "@/assets/col-pink.jpg";
import colOldmoney from "@/assets/col-oldmoney.jpg";
import colLifestyle from "@/assets/col-lifestyle.jpg";
import colIos from "@/assets/col-ios.jpg";
import colBeauty from "@/assets/col-beauty.jpg";
import colPilates from "@/assets/col-pilates.jpg";
import colBusiness from "@/assets/col-business.jpg";
import lib1 from "@/assets/lib-1.jpg";
import lib2 from "@/assets/lib-2.jpg";
import lib3 from "@/assets/lib-3.jpg";
import lib4 from "@/assets/lib-4.jpg";

export const Route = createFileRoute("/template-club")({
  head: () => ({
    meta: [
      { title: "Templates | Creating Society" },
      {
        name: "description",
        content:
          "350+ Canva-Vorlagen und 350+ Bilder für deinen Instagram-Feed. Fertig gestaltet, in Minuten anpassbar, einmalig zahlen.",
      },
      { property: "og:title", content: "Templates | Creating Society" },
      {
        property: "og:description",
        content:
          "Der Content-Shortcut für Creator: fertige Canva-Carousels, Bildbibliothek und Hook-Vorlagen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateClubPage,
});

const PRICE = "47 €";

const benefits = [
  { n: "01", top: "Sieht sofort", head: "professioneller aus" },
  { n: "02", top: "Spart dir", head: "Stunden in Canva" },
  { n: "03", top: "Bringt Menschen dazu,", head: "dir zu folgen" },
];

const collections = [
  { name: "Wellness", img: colWellness, count: "45 Vorlagen", body: "Ruhige, erklärende Layouts für Coaches und Lifestyle-Brands." },
  { name: "Pink Digital", img: colPink, count: "45 Vorlagen", body: "Laute, scrollstoppende Designs für Tipps, Zitate und Tutorials." },
  { name: "Old Money", img: colOldmoney, count: "45 Vorlagen", body: "Editorial und elegant, mit ruhigem Luxus-Gefühl." },
  { name: "Lifestyle", img: colLifestyle, count: "45 Vorlagen", body: "Ästhetische Vorlagen für Alltag und persönliches Storytelling." },
  { name: "iOS Core", img: colIos, count: "40 Vorlagen", body: "Moderne iPhone-Optik für nahbaren, social-first Content." },
  { name: "Beauty & Skin", img: colBeauty, count: "45 Vorlagen", body: "Hochwertige Layouts für Kosmetik, Studios und Beauty-Profis." },
  { name: "Pilates & Movement", img: colPilates, count: "45 Vorlagen", body: "Weiche, feminine Vorlagen für Studios und Bewegungs-Creator." },
  { name: "Business Coach", img: colBusiness, count: "45 Vorlagen", body: "Klare, strategische Designs für Coaching und Online-Bildung." },
];

const libraryImages = [
  { src: lib1, alt: "Eiskaffee und Notizbuch auf Marmortisch" },
  { src: lib2, alt: "Frau am Laptop in hellem Apartment" },
  { src: lib3, alt: "Flatlay mit Skincare-Produkten" },
  { src: lib4, alt: "Detailaufnahme im Pilates-Studio" },
];

const libraryTags = ["Lifestyle", "Beauty", "Coaching", "Wellness", "Business", "Faceless", "Pilates", "Studio"];

const imageFeatures = [
  { n: "01", head: "Kuratierte Bildbibliothek", body: "Ruhige, markentaugliche Bilder, die direkt in deine Vorlagen passen." },
  { n: "02", head: "Für viele Nischen gemacht", body: "Lifestyle, Wellness, Beauty, Coaching, Dienstleistung und mehr." },
  { n: "03", head: "Schneller fertig", body: "Für Carousels, Stories, Launch-Posts, Pinterest und E-Mails." },
];

const included = [
  { icon: "★", head: "350+ Canva-Vorlagen in 8 Kollektionen", body: "Verschiedene Stile und Nischen. In Minuten angepasst." },
  { icon: "◎", head: "350+ Bilder für deinen Content", body: "Editoriale Aufnahmen für die Tage, an denen du nicht vor die Kamera willst." },
  { icon: "✎", head: "200 Hook-Vorlagen für Carousels", body: "Lückentext-Hooks, damit aus deiner Idee schnell ein Post wird." },
  { icon: "↻", head: "Regelmäßig neue Drops", body: "Die Bibliothek wächst. Neue Vorlagen kommen laufend dazu." },
];

const steps = [
  { n: "01", head: "Sofort-Zugang", body: "Direkt nach dem Kauf öffnet sich die komplette Bibliothek." },
  { n: "02", head: "Kollektion wählen", body: "Nimm den Stil, der zu deiner Marke passt." },
  { n: "03", head: "In Canva anpassen", body: "Farben, Schriften, Texte und Bilder tauschen, fertig." },
  { n: "04", head: "Posten", body: "Exportieren und dort veröffentlichen, wo du Content machst." },
];

const faqs = [
  {
    q: "Brauche ich Canva Pro?",
    a: "Nein. Alle Vorlagen funktionieren mit der kostenlosen Canva-Version und sind vollständig bearbeitbar.",
  },
  {
    q: "Was ist alles enthalten?",
    a: "8 Kollektionen mit über 350 Carousel-Vorlagen, über 350 Bilder, 200 Hook-Vorlagen und alle neuen Drops während deiner Laufzeit.",
  },
  {
    q: "Wie lange habe ich Zugang?",
    a: "Die einmalige Zahlung gibt dir zwölf Monate Zugang. Es verlängert sich nichts automatisch.",
  },
  {
    q: "Brauche ich Design-Erfahrung?",
    a: "Nein. Genau darum geht es: Vorlage öffnen, Text ändern, Farben anpassen, posten.",
  },
  {
    q: "Darf ich die Vorlagen für Kundinnen nutzen?",
    a: "Ja, für fertige Designs deiner Kundinnen. Weiterverkaufen oder Weitergeben der bearbeitbaren Dateien ist nicht erlaubt.",
  },
  {
    q: "Gibt es eine Rückerstattung?",
    a: "Da es sich um digitale Produkte handelt, ist der Kauf final.",
  },
];

const marqueeItems = [
  "Lifestyle",
  "Beauty",
  "Business",
  "Wellness",
  "Creator",
  "Faceless",
  "Coaching",
  "Pilates",
  "Dienstleistung",
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
  children = `Jetzt für ${PRICE} sichern`,
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
    <Link to="/checkout" search={{ produkt: "templates" as const }} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function TemplateClubPage() {
  useReveal();

  return (
    <main className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--cream)]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoDark} alt="Creating Society" className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
              Templates
            </span>
            <Link
              to="/checkout"
              search={{ produkt: "templates" as const }}
              className="inline-flex items-center rounded-full bg-[color:var(--wine)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)] transition hover:opacity-90"
            >
              {PRICE} · Zugang
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-0 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="rv pb-16 sm:pb-24">
            <p className="text-[11px] uppercase tracking-[0.24em] opacity-60">
              Done-for-you Instagram-Kit
            </p>
            <h1 className="mt-6 font-serif text-[2.6rem] sm:text-6xl lg:text-[4.2rem] leading-[0.98] tracking-tight">
              Dein Feed sieht endlich so gut aus{" "}
              <span className="serif-italic">wie deine Ideen.</span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl leading-relaxed opacity-75 max-w-xl">
              350+ Canva-Vorlagen und 350+ Bilder. Fertig gestaltet, in Minuten
              auf deine Marke angepasst.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Cta variant="light">Sofort-Zugang sichern</Cta>
              <span className="text-sm opacity-60">
                Einmalig {PRICE} · 12 Monate Zugang
              </span>
            </div>
            <ul className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 max-w-lg">
              {[
                ["350+", "Vorlagen"],
                ["350+", "Bilder"],
                ["8", "Kollektionen"],
              ].map(([n, l]) => (
                <li key={l}>
                  <p className="font-serif text-3xl">{n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] opacity-55">
                    {l}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Collage */}
          <div className="rv relative h-[380px] sm:h-[520px] lg:h-[640px] -mb-16 sm:-mb-20">
            <div className="absolute inset-0 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4 translate-y-6">
                <img src={colLifestyle} alt="Lifestyle-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colBeauty} alt="Beauty-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
              <div className="space-y-3 sm:space-y-4 -translate-y-6">
                <img src={colPink} alt="Pink-Digital-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colWellness} alt="Wellness-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
              <div className="space-y-3 sm:space-y-4 translate-y-10">
                <img src={colOldmoney} alt="Old-Money-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colBusiness} alt="Business-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--wine)] to-transparent" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 border-b border-[color:var(--border)] overflow-hidden bg-[color:var(--cream)]">
        <div className="flex gap-10 whitespace-nowrap animate-[tcSlide_28s_linear_infinite] text-[11px] uppercase tracking-[0.25em] text-[color:var(--muted-fg)]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
        <style>{`@keyframes tcSlide { from { transform: none } to { transform: translateX(-33.333%) } }`}</style>
      </div>

      {/* Why it matters */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="eyebrow rv">Warum es zählt</p>
              <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight text-[color:var(--wine)]">
                Deine Inhalte sind gut.{" "}
                <span className="serif-italic">Sie sollten auch so aussehen.</span>
              </h2>
            </div>
            <p className="rv text-[color:var(--muted-fg)] leading-relaxed lg:pb-2">
              Neue Besucher entscheiden in Sekunden, ob sie dir folgen. Die
              Templates sind die Abkürzung zu einem Feed, der ruhig, stimmig und
              professionell wirkt, ohne dass du Stunden in Canva verlierst.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.n}
                className="rv rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream2)] p-7 transition hover:-translate-y-1"
              >
                <span className="text-[11px] tracking-[0.2em] text-[color:var(--rose)]">{b.n}</span>
                <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
                  {b.top}
                </p>
                <h3 className="mt-1 font-serif text-2xl sm:text-[1.7rem] text-[color:var(--wine)]">
                  {b.head}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow rv opacity-70">Was drin ist</p>
              <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight">
                8 Kollektionen.{" "}
                <span className="serif-italic">Ein Stil für jede Marke.</span>
              </h2>
            </div>
            <p className="rv max-w-sm text-sm leading-relaxed opacity-65">
              Jede Kollektion ist ein komplettes Set aus Carousels, Single-Posts
              und Story-Vorlagen. Farben und Schriften tauschst du in Canva in
              wenigen Minuten.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {collections.map((c) => (
              <article key={c.name} className="rv group">
                <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <img
                    src={c.img}
                    alt={`${c.name} Vorlagen-Kollektion`}
                    width={768}
                    height={1024}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl sm:text-2xl">{c.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] opacity-55 whitespace-nowrap">
                    {c.count}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed opacity-65">{c.body}</p>
              </article>
            ))}
          </div>

          <div className="rv mt-14">
            <Cta variant="light">{`Alle 8 Kollektionen für ${PRICE}`}</Cta>
          </div>
        </div>
      </section>

      {/* Image library */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="eyebrow rv">Ebenfalls enthalten · 350+ Bilder</p>
              <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight text-[color:var(--wine)]">
                Vorlagen sind nur die halbe Arbeit.{" "}
                <span className="serif-italic">Die Bilder liegen schon bereit.</span>
              </h2>
            </div>
            <p className="rv text-[color:var(--muted-fg)] leading-relaxed lg:pb-2">
              Kuratierte, markentaugliche Aufnahmen für die Tage, an denen du
              nicht vor die Kamera willst. Passend zu jeder Kollektion, sortiert
              nach Nische.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {libraryImages.map((img, i) => (
              <img
                key={img.alt}
                src={img.src}
                alt={img.alt}
                width={768}
                height={960}
                loading="lazy"
                className={`rv w-full object-cover rounded-2xl ${
                  i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/5] lg:aspect-[4/6] lg:-translate-y-6"
                }`}
              />
            ))}
          </div>

          <div className="rv mt-8 flex flex-wrap gap-2">
            {libraryTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-fg)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-4">
            {imageFeatures.map((f) => (
              <div
                key={f.n}
                className="rv rounded-2xl border border-[color:var(--border)] p-7"
              >
                <span className="text-[11px] tracking-[0.2em] text-[color:var(--rose)]">{f.n}</span>
                <h3 className="mt-5 font-serif text-2xl text-[color:var(--wine)]">{f.head}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the library */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rv grid grid-cols-2 gap-4">
              <img src={colPilates} alt="Pilates-Vorlagen" width={768} height={1024} loading="lazy" className="w-full rounded-2xl object-cover aspect-[3/4] translate-y-6" />
              <img src={colIos} alt="iOS-Core-Vorlagen" width={768} height={1024} loading="lazy" className="w-full rounded-2xl object-cover aspect-[3/4]" />
              <img src={lib2} alt="Frau am Laptop" width={768} height={960} loading="lazy" className="w-full rounded-2xl object-cover aspect-[4/5] translate-y-6" />
              <img src={lib1} alt="Eiskaffee und Notizbuch" width={768} height={960} loading="lazy" className="w-full rounded-2xl object-cover aspect-[4/5]" />
            </div>

            <div>
              <p className="eyebrow rv">In der Bibliothek</p>
              <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight text-[color:var(--wine)]">
                Alles, was du zum Posten brauchst.
              </h2>
              <div className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
                {included.map((i) => (
                  <div key={i.head} className="rv flex gap-5 py-6">
                    <span className="mt-1 text-base text-[color:var(--rose)]">{i.icon}</span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[color:var(--wine)]">{i.head}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-fg)]">{i.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rv mt-9">
                <Cta>{`Alles für ${PRICE}`}</Cta>
                <p className="mt-4 text-xs text-[color:var(--muted-fg)]">
                  Einmalzahlung · zwölf Monate Zugang · kostenloses Canva reicht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="eyebrow rv">So läuft es</p>
          <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight text-[color:var(--wine)] max-w-2xl">
            Dein nächster Post ist schon halb fertig.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rv rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream2)] p-7"
              >
                <span className="font-serif text-3xl text-[color:var(--rose)]">{s.n}</span>
                <h3 className="mt-4 font-serif text-2xl text-[color:var(--wine)]">{s.head}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="rv font-serif text-3xl sm:text-4xl tracking-tight text-[color:var(--wine)]">
            Häufige Fragen
          </h2>
          <div className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[color:var(--wine)]">
                  <span className="font-medium">{f.q}</span>
                  <span className="text-[color:var(--muted-fg)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] pt-20 sm:pt-28 pb-0 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h2 className="rv font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight">
            Hör auf, vor der leeren Canva-Seite zu sitzen.
          </h2>
          <p className="rv mt-5 opacity-70">
            Einmal zahlen, zwölf Monate Zugang, jede Woche schneller posten.
          </p>
          <div className="rv mt-9">
            <Cta variant="light">{`Zugang für ${PRICE}`}</Cta>
          </div>
        </div>
        <div className="mt-16 flex gap-4 px-5 sm:px-8 opacity-90">
          {[colWellness, colPink, colOldmoney, colLifestyle, colBeauty, colBusiness].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              width={768}
              height={1024}
              loading="lazy"
              className="hidden sm:block w-1/6 rounded-t-2xl object-cover object-top aspect-[3/4]"
            />
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-[color:var(--muted-fg)]">
        <div className="flex justify-center gap-6">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} Creating Society</p>
      </footer>
    </main>
  );
}

