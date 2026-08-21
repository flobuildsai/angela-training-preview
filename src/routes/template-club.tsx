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
          "350+ Canva-Vorlagen und 350+ Bilder für deinen Instagram-Feed. Fertig gestaltet, in Minuten anpassbar, einmalig 47 €.",
      },
      { property: "og:title", content: "Templates | Creating Society" },
      {
        property: "og:description",
        content:
          "Fertige Canva-Carousels, Bildbibliothek und Hook-Vorlagen. Einmalig 47 €.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateClubPage,
});

const PRICE = "47 €";

const collections = [
  { name: "Wellness", img: colWellness, count: "45" },
  { name: "Pink Digital", img: colPink, count: "45" },
  { name: "Old Money", img: colOldmoney, count: "45" },
  { name: "Lifestyle", img: colLifestyle, count: "45" },
  { name: "iOS Core", img: colIos, count: "40" },
  { name: "Beauty & Skin", img: colBeauty, count: "45" },
  { name: "Pilates", img: colPilates, count: "45" },
  { name: "Business", img: colBusiness, count: "45" },
];

const included = [
  ["350+", "Canva-Vorlagen in 8 Kollektionen"],
  ["350+", "Bilder für Feed, Story und Pinterest"],
  ["200", "Hook-Vorlagen für Carousels"],
  ["∞", "Neue Drops während deiner Laufzeit"],
];

const faqs = [
  {
    q: "Brauche ich Canva Pro?",
    a: "Nein. Alles funktioniert mit der kostenlosen Canva-Version.",
  },
  {
    q: "Wie lange habe ich Zugang?",
    a: "Zwölf Monate. Einmalzahlung, keine automatische Verlängerung.",
  },
  {
    q: "Brauche ich Design-Erfahrung?",
    a: "Nein. Vorlage öffnen, Text ändern, Farben anpassen, posten.",
  },
  {
    q: "Darf ich die Vorlagen für Kundinnen nutzen?",
    a: "Ja, für fertige Designs. Weitergabe der bearbeitbaren Dateien nicht.",
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
  children = `Zugang für ${PRICE}`,
  variant = "dark",
}: {
  children?: string;
  variant?: "dark" | "light";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-9 py-4 min-h-[56px] text-[12px] font-semibold tracking-[0.18em] uppercase transition duration-300 hover:opacity-90 active:scale-[0.98]";
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
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--cream)]/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoDark} alt="Creating Society" className="h-6 w-auto" />
          </Link>
          <Link
            to="/checkout"
            search={{ produkt: "templates" as const }}
            className="inline-flex items-center rounded-full bg-[color:var(--wine)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)] transition hover:opacity-90 active:scale-[0.98]"
          >
            {PRICE} · Zugang
          </Link>
        </div>
      </header>

      {/* Hero — asymmetric, minimal copy */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-20 items-end">
          <div className="rv pb-16 sm:pb-24">
            <p className="text-[11px] uppercase tracking-[0.24em] opacity-55">
              Templates · Creating Society
            </p>
            <h1 className="mt-6 font-serif text-[2.7rem] sm:text-6xl lg:text-[4.4rem] leading-[0.95] tracking-tight">
              Ein Feed, der{" "}
              <span className="serif-italic">teuer aussieht.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed opacity-70 max-w-sm">
              350+ Canva-Vorlagen. 350+ Bilder. In Minuten deine.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Cta variant="light">{`Sofort-Zugang · ${PRICE}`}</Cta>
              <span className="text-xs uppercase tracking-[0.16em] opacity-50">
                12 Monate Zugang
              </span>
            </div>
          </div>

          {/* Collage bleeding into the fold */}
          <div className="rv relative h-[360px] sm:h-[520px] lg:h-[660px]">
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 sm:gap-4 items-end">
              <div className="space-y-3 sm:space-y-4 translate-y-8">
                <img src={colLifestyle} alt="Lifestyle-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colBeauty} alt="Beauty-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
              <div className="space-y-3 sm:space-y-4 -translate-y-4">
                <img src={colPink} alt="Pink-Digital-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colWellness} alt="Wellness-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
              <div className="space-y-3 sm:space-y-4 translate-y-12">
                <img src={colOldmoney} alt="Old-Money-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
                <img src={colBusiness} alt="Business-Vorlagen" width={768} height={1024} className="w-full rounded-2xl object-cover aspect-[3/4]" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[color:var(--wine)] to-transparent" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 border-b border-[color:var(--border)] overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[tcSlide_28s_linear_infinite] text-[11px] uppercase tracking-[0.25em] text-[color:var(--muted-fg)]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
        <style>{`@keyframes tcSlide { from { transform: none } to { transform: translateX(-33.333%) } }`}</style>
      </div>

      {/* Statement + inhalt als Zeilen statt Karten */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-24 items-start">
          <div>
            <h2 className="rv font-serif text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.02] tracking-tight text-[color:var(--wine)]">
              Neue Besucher entscheiden in drei Sekunden.{" "}
              <span className="serif-italic">Gib ihnen etwas Schönes.</span>
            </h2>
            <div className="rv mt-10 lg:pl-[10%]">
              <Cta>{`Alles für ${PRICE}`}</Cta>
            </div>
          </div>

          <ul className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {included.map(([n, label]) => (
              <li key={label} className="rv flex items-baseline gap-6 py-6">
                <span className="font-serif text-3xl sm:text-4xl text-[color:var(--rose)] w-24 shrink-0">
                  {n}
                </span>
                <span className="text-[color:var(--wine)] leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kollektionen — Bilder sprechen, kaum Text */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="rv font-serif text-3xl sm:text-5xl leading-[1.05] tracking-tight max-w-md">
              Acht Kollektionen.{" "}
              <span className="serif-italic">Ein Stil für dich dabei.</span>
            </h2>
            <span className="rv text-[11px] uppercase tracking-[0.2em] opacity-55">
              350+ Vorlagen
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((c, i) => (
              <article
                key={c.name}
                className={`rv group ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}
              >
                <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <img
                    src={c.img}
                    alt={`${c.name} Vorlagen`}
                    width={768}
                    height={1024}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl">{c.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.16em] opacity-50">
                    {c.count}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="rv mt-24 lg:mt-28">
            <Cta variant="light">{`Alle Kollektionen · ${PRICE}`}</Cta>
          </div>
        </div>
      </section>

      {/* Bildbibliothek — asymmetrisches Raster */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-end">
            <h2 className="rv font-serif text-3xl sm:text-5xl leading-[1.03] tracking-tight text-[color:var(--wine)]">
              Plus 350+ Bilder.
            </h2>
            <p className="rv text-[color:var(--muted-fg)] leading-relaxed max-w-md lg:pb-3">
              Für die Tage, an denen du nicht vor die Kamera willst.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
            <img src={lib1} alt="Eiskaffee und Notizbuch auf Marmortisch" width={768} height={960} loading="lazy" className="rv w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-5" />
            <img src={lib2} alt="Frau am Laptop in hellem Apartment" width={768} height={960} loading="lazy" className="rv w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-3 lg:translate-y-8" />
            <img src={lib3} alt="Flatlay mit Skincare-Produkten" width={768} height={960} loading="lazy" className="rv w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-4" />
            <img src={lib4} alt="Detailaufnahme im Pilates-Studio" width={768} height={960} loading="lazy" className="rv w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-4 lg:col-start-3 lg:translate-y-2" />
            <img src={colPilates} alt="Pilates-Vorlagen" width={768} height={1024} loading="lazy" className="rv hidden lg:block w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-3 lg:translate-y-10" />
            <img src={colIos} alt="iOS-Core-Vorlagen" width={768} height={1024} loading="lazy" className="rv hidden lg:block w-full object-cover rounded-2xl aspect-[4/5] lg:col-span-3" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="rv font-serif text-3xl sm:text-4xl tracking-tight text-[color:var(--wine)]">
            Kurz geklärt
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
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] pt-20 sm:pt-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="rv font-serif text-4xl sm:text-6xl lg:text-[4rem] leading-[0.98] tracking-tight max-w-2xl">
            Dein nächster Post ist{" "}
            <span className="serif-italic">schon halb fertig.</span>
          </h2>
          <div className="rv mt-9 flex flex-wrap items-center gap-5">
            <Cta variant="light">{`Zugang für ${PRICE}`}</Cta>
            <span className="text-xs uppercase tracking-[0.16em] opacity-50">
              Einmalzahlung · 12 Monate
            </span>
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
