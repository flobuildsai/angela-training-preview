import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import logoDark from "@/assets/logo-dark.png";
import phone from "@/assets/tc-phone.jpg";
import colWellness from "@/assets/col-wellness.jpg";
import colPink from "@/assets/col-pink.jpg";
import colOldmoney from "@/assets/col-oldmoney.jpg";
import colLifestyle from "@/assets/col-lifestyle.jpg";
import colIos from "@/assets/col-ios.jpg";
import colBeauty from "@/assets/col-beauty.jpg";
import colPilates from "@/assets/col-pilates.jpg";
import colBusiness from "@/assets/col-business.jpg";
import tcGrid from "@/assets/tc-grid.jpg";
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
          "Fertige Canva-Carousels, Bildbibliothek und neue Drops. Einmalig 47 €, zwölf Monate Zugang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplateClubPage,
});

const PRICE = "47 €";

const collections = [
  {
    name: "Wellness",
    img: colWellness,
    text: "Ruhige, erklärende Vorlagen für Coaches und Wellness-Marken.",
  },
  {
    name: "Pink Digital",
    img: colPink,
    text: "Auffällige Carousels für Tipps, Zitate und Tutorials.",
  },
  {
    name: "Old Money",
    img: colOldmoney,
    text: "Editorial und zurückhaltend, mit leiser Luxus-Anmutung.",
  },
  {
    name: "Lifestyle",
    img: colLifestyle,
    text: "Ästhetische Vorlagen für Alltag, Storytelling und Personal Brand.",
  },
  {
    name: "iOS Core",
    img: colIos,
    text: "iPhone-Optik für nahbaren, social-first Content.",
  },
  {
    name: "Beauty & Skin",
    img: colBeauty,
    text: "Klare Skincare-Vorlagen für Studios und Beauty-Profis.",
  },
  {
    name: "Pilates",
    img: colPilates,
    text: "Weiche, feminine Layouts für Studios und Bewegungs-Creator.",
  },
  {
    name: "Business",
    img: colBusiness,
    text: "Strukturierte Vorlagen für Coaches und Dienstleisterinnen.",
  },
];

const whyItems = [
  ["01", "Sieht sofort", "professioneller aus"],
  ["02", "Spart dir Stunden", "in Canva"],
  ["03", "Macht Lust", "dir zu folgen"],
];

const libraryPoints = [
  ["01", "Kuratierte Bilder", "Ruhige, markentaugliche Fotos, die direkt in die Vorlagen passen."],
  ["02", "Für viele Nischen", "Lifestyle, Wellness, Beauty, Coaching, Dienstleistung und mehr."],
  ["03", "Schneller fertig", "Für Carousels, Stories, Launches, Pinterest und E-Mails."],
];

const faqs = [
  {
    q: "Was genau bekomme ich?",
    a: "Acht Kollektionen mit über 350 Canva-Vorlagen, dazu 350+ Bilder und alle neuen Drops während deiner Laufzeit.",
  },
  {
    q: "Wie lange habe ich Zugang?",
    a: "Zwölf Monate ab Kauf. Einmalzahlung, keine automatische Verlängerung.",
  },
  {
    q: "Brauche ich Canva Pro oder Design-Erfahrung?",
    a: "Nein. Alles läuft mit der kostenlosen Canva-Version: Vorlage öffnen, Text ändern, Farben anpassen, posten.",
  },
  {
    q: "Darf ich die Vorlagen für Kundinnen nutzen?",
    a: "Ja, für fertige Designs. Die bearbeitbaren Dateien darfst du nicht weitergeben oder weiterverkaufen.",
  },
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
  children = `Sofort-Zugang für ${PRICE}`,
  variant = "dark",
}: {
  children?: string;
  variant?: "dark" | "light";
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-9 py-4 min-h-[56px] text-[12px] font-semibold tracking-[0.18em] uppercase transition duration-300 hover:opacity-90 active:scale-[0.98]";
  const styles =
    variant === "dark"
      ? "bg-[color:var(--wine)] text-[color:var(--cream)]"
      : "bg-[color:var(--cream)] text-[color:var(--wine)]";
  return (
    <Link to="/checkout" search={{ produkt: "templates" as const }} className={`${base} ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
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

      {/* Hero */}
      <section className="bg-[color:var(--cream2)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="rv">
            <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)]/[0.06] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--wine)]">
              ✦ Fertiges Instagram-Feed-Kit
            </span>
            <h1 className="mt-7 font-serif text-[3rem] sm:text-6xl lg:text-[4.6rem] leading-[0.94] tracking-tight text-[color:var(--wine)]">
              Bring deinen Feed auf Niveau.
            </h1>
            <p className="mt-6 font-serif text-2xl sm:text-3xl leading-snug text-[color:var(--wine)]">
              350+ Canva-Vorlagen und Bilder.{" "}
              <span className="serif-italic">Anpassen, posten, fertig.</span>
            </p>
            <p className="mt-5 text-[color:var(--muted-fg)] leading-relaxed max-w-md">
              Carousels, die aussehen, als hätte sie jemand für dich designt.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {["Keine Design-Kenntnisse", "Gratis-Canva reicht", "Einmalzahlung"].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-2 text-[13px] text-[color:var(--muted-fg)]"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Cta>Sofort-Zugang sichern</Cta>
            </div>
          </div>

          <div className="rv relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-[color:var(--rose)]/10 blur-2xl" aria-hidden="true" />
            <img
              src={phone}
              alt="Instagram-Feed mit Vorlagen auf dem Smartphone"
              width={1280}
              height={1280}
              className="relative w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Why it matters — dark */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="rv rule-label text-[10px] uppercase tracking-[0.22em] opacity-60">
            Warum es zählt
          </p>
          <h2 className="rv mt-6 font-serif text-3xl sm:text-5xl lg:text-[3.6rem] leading-[1.02] tracking-tight max-w-3xl">
            Deine Ideen sind gut.{" "}
            <span className="serif-italic opacity-80">Dein Content sollte so aussehen.</span>
          </h2>
          <p className="rv mt-6 max-w-xl leading-relaxed opacity-65">
            Neue Besucher entscheiden in Sekunden, ob sie dir folgen. Die Vorlagen sind die
            Abkürzung zu einem Feed, der zusammenpasst.
          </p>

          <div className="mt-14 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {whyItems.map(([n, top, bottom]) => (
              <div key={n} className="rv bg-[color:var(--wine)] p-8 sm:p-10">
                <span className="text-[11px] tracking-[0.2em] opacity-45">{n}</span>
                <p className="mt-6 text-[11px] uppercase tracking-[0.2em] opacity-55">{top}</p>
                <h3 className="mt-2 font-serif text-3xl">{bottom}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introducing */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-16 items-center">
          <img
            src={tcGrid}
            alt="Übersicht der Canva-Vorlagen"
            width={1024}
            height={1024}
            loading="lazy"
            className="rv w-full rounded-2xl object-cover"
          />
          <div>
            <h2 className="rv font-serif text-3xl sm:text-5xl leading-[1.03] tracking-tight text-[color:var(--wine)]">
              Das ist die Vorlagen-Bibliothek.
            </h2>
            <p className="rv mt-6 text-lg leading-relaxed text-[color:var(--wine)]">
              Eine private Sammlung fertiger Canva-Carousels und passender Bilder.
            </p>
            <p className="rv mt-4 leading-relaxed text-[color:var(--muted-fg)]">
              Gemacht dafür, dass du klarer erzählst, öfter postest und keine Stunden mehr im
              leeren Canva-Dokument verlierst.
            </p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="rv rule-label text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
            Was enthalten ist
          </p>
          <h2 className="rv mt-6 font-serif text-3xl sm:text-5xl leading-[1.03] tracking-tight text-[color:var(--wine)] max-w-3xl">
            8 Kollektionen. <span className="serif-italic">350+ Vorlagen.</span> 350+ Bilder.
          </h2>
          <p className="rv mt-5 max-w-xl leading-relaxed text-[color:var(--muted-fg)]">
            Fertig gestaltete Canva-Vorlagen plus Bildbibliothek in jeder Kollektion.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {collections.map((c) => (
              <article key={c.name} className="rv group">
                <div className="overflow-hidden rounded-2xl bg-[color:var(--cream)]">
                  <img
                    src={c.img}
                    alt={`${c.name} Vorlagen`}
                    width={768}
                    height={1024}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-[color:var(--wine)]">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-fg)]">{c.text}</p>
              </article>
            ))}
          </div>

          <div className="rv mt-16">
            <Cta>{`Alle Kollektionen · ${PRICE}`}</Cta>
          </div>
        </div>
      </section>

      {/* Image library */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="rv rule-label text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
            Ebenfalls dabei · 350+ Bilder
          </p>
          <h2 className="rv mt-6 font-serif text-3xl sm:text-5xl leading-[1.03] tracking-tight text-[color:var(--wine)] max-w-3xl">
            Vorlagen sind die halbe Arbeit.{" "}
            <span className="serif-italic">Die Bilder gibt es dazu.</span>
          </h2>

          <div className="mt-12 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            <ul className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              {libraryPoints.map(([n, title, text]) => (
                <li key={n} className="rv py-6 flex gap-6">
                  <span className="font-serif text-2xl text-[color:var(--rose)]">{n}</span>
                  <div>
                    <h3 className="font-medium text-[color:var(--wine)]">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {[lib1, lib2, lib3, lib4, colLifestyle, colBeauty].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Bild aus der Bildbibliothek"
                  width={768}
                  height={960}
                  loading="lazy"
                  className={`rv w-full object-cover rounded-2xl aspect-[4/5] ${
                    i % 2 === 1 ? "sm:translate-y-6" : ""
                  }`}
                />
              ))}
            </div>
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
                  <span className="text-[color:var(--muted-fg)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="rv font-serif text-4xl sm:text-6xl leading-[0.98] tracking-tight">
            Dein nächster Post ist{" "}
            <span className="serif-italic">schon halb fertig.</span>
          </h2>
          <p className="rv mt-6 opacity-65">Einmalig {PRICE} · 12 Monate Zugang · sofort verfügbar</p>
          <div className="rv mt-9 flex justify-center">
            <Cta variant="light">{`Sofort-Zugang für ${PRICE}`}</Cta>
          </div>
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
