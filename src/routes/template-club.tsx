import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import logoDark from "@/assets/logo-dark.png";
import tcHero from "@/assets/tc-hero.jpg";
import tcLaptop from "@/assets/tc-laptop.jpg";
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
    <Link to="/checkout" className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function TemplateClubPage() {
  useReveal();

  return (
    <main className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      {/* Header */}
      <header className="border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoDark} alt="Creating Society" className="h-6 w-auto" />
          </Link>
          <span className="pill hidden sm:inline-flex">Template Club</span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="rv">
          <p className="eyebrow">Done-for-you Instagram-Kit</p>
          <h1 className="mt-5 font-serif text-4xl sm:text-6xl leading-[1.02] tracking-tight text-[color:var(--wine)]">
            Dein Feed sieht endlich so gut aus wie deine Ideen.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[color:var(--muted-fg)] leading-relaxed">
            350+ Canva-Vorlagen und Bilder, fertig gestaltet und in Minuten auf
            deine Marke angepasst.{" "}
            <span className="serif-italic text-[color:var(--wine)]">
              Carousels, die aussehen, als hätte sie jemand für dich designt.
            </span>
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--muted-fg)]">
            <li>Keine Design-Kenntnisse nötig</li>
            <li>Funktioniert mit kostenlosem Canva</li>
            <li>Einmalzahlung</li>
          </ul>
          <div className="mt-9">
            <Cta>Sofort-Zugang sichern</Cta>
          </div>
        </div>
        <div className="rv">
          <img
            src={tcHero}
            alt="Instagram-Vorlage auf einem Smartphone"
            width={1200}
            height={1200}
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <p className="eyebrow rv">Warum es zählt</p>
          <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight text-[color:var(--wine)]">
            Deine Inhalte sind gut.{" "}
            <span className="serif-italic">Sie sollten auch so aussehen.</span>
          </h2>
          <p className="rv mt-5 max-w-2xl text-[color:var(--muted-fg)] leading-relaxed">
            Neue Besucher entscheiden in Sekunden, ob sie dir folgen. Der
            Template Club ist die Abkürzung zu einem Feed, der ruhig, stimmig
            und professionell wirkt.
          </p>

          <div className="mt-14 grid sm:grid-cols-3 gap-8 sm:gap-6">
            {benefits.map((b) => (
              <div key={b.n} className="rv border-t border-[color:var(--border)] pt-5">
                <span className="text-xs tracking-[0.2em] text-[color:var(--muted-fg)]">{b.n}</span>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                  {b.top}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[color:var(--wine)]">{b.head}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introducing */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src={tcGrid}
          alt="Vorschau der Vorlagen-Kollektionen"
          width={1200}
          height={1200}
          loading="lazy"
          className="rv w-full rounded-3xl object-cover"
        />
        <div className="rv">
          <p className="eyebrow">Das ist der Template Club</p>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight text-[color:var(--wine)]">
            Eine private Bibliothek für deinen Content.
          </h2>
          <p className="mt-6 text-[color:var(--muted-fg)] leading-relaxed">
            Fertige Canva-Carousels und Bilder, die dir helfen, klar zu
            kommunizieren, besser zu erzählen und regelmäßig sichtbar zu sein,
            ohne Stunden im Design zu verlieren.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="eyebrow rv opacity-70">Was drin ist</p>
          <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight">
            8 Kollektionen. <span className="serif-italic">350+ Vorlagen.</span>{" "}
            350+ Bilder.
          </h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {collections.map((c) => (
              <div key={c.name} className="rv border-t border-white/20 pt-5">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-70">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 border-y border-[color:var(--border)] overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[tcSlide_28s_linear_infinite] text-[11px] uppercase tracking-[0.25em] text-[color:var(--muted-fg)]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
        <style>{`@keyframes tcSlide { from { transform: none } to { transform: translateX(-33.333%) } }`}</style>
      </div>

      {/* Image library */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <p className="eyebrow rv">Ebenfalls enthalten · 350+ Bilder</p>
        <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight text-[color:var(--wine)] max-w-3xl">
          Vorlagen sind nur die halbe Arbeit.{" "}
          <span className="serif-italic">Die Bilder liegen schon bereit.</span>
        </h2>
        <div className="mt-14 grid sm:grid-cols-3 gap-8">
          {imageFeatures.map((f) => (
            <div key={f.n} className="rv border-t border-[color:var(--border)] pt-5">
              <span className="text-xs tracking-[0.2em] text-[color:var(--muted-fg)]">{f.n}</span>
              <h3 className="mt-3 font-serif text-2xl text-[color:var(--wine)]">{f.head}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inside the library */}
      <section className="bg-[color:var(--cream2)] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="eyebrow rv">In der Bibliothek</p>
          <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight text-[color:var(--wine)]">
            Alles, was du zum Posten brauchst.
          </h2>

          <div className="mt-14 grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={tcLaptop}
              alt="Vorlagen-Bibliothek auf einem Laptop"
              width={1400}
              height={1000}
              loading="lazy"
              className="rv w-full rounded-3xl object-cover"
            />
            <div className="grid gap-8">
              {included.map((i) => (
                <div key={i.head} className="rv flex gap-5">
                  <span className="text-lg text-[color:var(--rose)]">{i.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-[color:var(--wine)]">{i.head}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-fg)]">{i.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv mt-16 text-center">
            <p className="max-w-xl mx-auto text-[color:var(--muted-fg)]">
              Alle Vorlagen sind mit der kostenlosen Canva-Version bearbeitbar.
              Deine Einmalzahlung gibt dir zwölf Monate Zugang.
            </p>
            <div className="mt-8">
              <Cta>{`Alles für ${PRICE}`}</Cta>
            </div>
            <p className="mt-4 text-xs text-[color:var(--muted-fg)]">
              Sichere dir den Preis, solange er noch so niedrig ist.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <p className="eyebrow rv">So läuft es</p>
        <h2 className="rv mt-5 font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight text-[color:var(--wine)] max-w-2xl">
          Dein nächster Post ist schon halb fertig.
        </h2>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="rv border-t border-[color:var(--border)] pt-5">
              <span className="text-xs tracking-[0.2em] text-[color:var(--muted-fg)]">{s.n}</span>
              <h3 className="mt-3 font-serif text-2xl text-[color:var(--wine)]">{s.head}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="rv mt-12">
          <Cta />
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
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-20 sm:py-28 text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h2 className="rv font-serif text-3xl sm:text-5xl leading-[1.08] tracking-tight">
            Hör auf, vor der leeren Canva-Seite zu sitzen.
          </h2>
          <p className="rv mt-5 opacity-70">
            Einmal zahlen, zwölf Monate Zugang, jede Woche schneller posten.
          </p>
          <div className="rv mt-9">
            <Cta variant="light">{`Zugang für ${PRICE}`}</Cta>
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
