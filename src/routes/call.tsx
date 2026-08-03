import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import logoDark from "@/assets/logo-dark.png";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Strategiegespräch buchen — Creating Society" },
      {
        name: "description",
        content:
          "Buche ein Strategiegespräch mit Laura: Positionierung, Angebot und der nächste konkrete Schritt für dein eigenes Business.",
      },
      { property: "og:title", content: "Strategiegespräch buchen — Creating Society" },
      {
        property: "og:description",
        content:
          "Klarheit: wo du stehst, was du anbieten kannst und ob Creating Society der richtige nächste Schritt ist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CallPage,
});

const callAgenda = [
  "wo du stehst und welche Positionierung zu dir passt",
  "welches Angebot du entwickeln kannst",
  "ob Creating Society der richtige nächste Schritt für dich ist",
];

function CallPage() {
  useEffect(() => {
    trackEvent("call_page_view");
  }, []);

  return (
    <main className="bg-[color:var(--background)]">
      {/* Header */}
      <header className="border-b border-[color:var(--border)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center">
            <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto sm:h-5" />
          </Link>

          <Link
            to="/"
            className="text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--muted-fg)] transition hover:text-[color:var(--ink)]"
          >
            Zurück
          </Link>
        </div>
      </header>

      {/* Intro */}
      <section className="bg-[color:var(--wine)] py-14 text-[color:var(--cream)] md:py-18">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="eyebrow text-[color:var(--cream)]/60">Kostenloses Strategiegespräch</p>
          <h1 className="mt-6 font-serif text-[2.2rem] leading-[1.05] sm:text-[3rem]">
            Du brauchst nicht noch mehr gespeicherte Content-Tipps.
          </h1>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[color:var(--cream)]/70">
            Du brauchst Klarheit darüber, was du aufbauen kannst – und einen Plan, wie du es umsetzt.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.16em] text-[color:var(--cream)]/50">
            Im Gespräch klären wir:
          </p>
          <ul className="mt-5 border-t border-[color:var(--cream)]/15 text-left">
            {callAgenda.map((a) => (
              <li
                key={a}
                className="border-b border-[color:var(--cream)]/15 py-3.5 text-[0.98rem] text-[color:var(--cream)]/85"
              >
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[color:var(--cream)]/55">
            30 bis 45 Minuten. Ehrlich, ohne Druck – und nicht für jede geeignet.
          </p>
        </div>
      </section>

      {/* Calendly */}
      <section id="booking" className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mt-2">
            <CalendlyEmbed />
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--border)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-[color:var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto shrink-0 self-start object-contain" />
          <nav className="flex flex-wrap items-center gap-6">
            <Link to="/impressum" className="transition hover:text-[color:var(--ink)]">
              Impressum
            </Link>
            <Link to="/datenschutz" className="transition hover:text-[color:var(--ink)]">
              Datenschutz
            </Link>

          </nav>
        </div>
      </footer>
    </main>
  );
}
