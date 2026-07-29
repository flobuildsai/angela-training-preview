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
          "Buche ein kostenloses Strategiegespräch mit Laura: Positionierung, Angebot und der nächste konkrete Schritt für dein eigenes Business.",
      },
      { property: "og:title", content: "Strategiegespräch buchen — Creating Society" },
      {
        property: "og:description",
        content:
          "30 bis 45 Minuten Klarheit: wo du stehst, was du anbieten kannst und ob Creating Society der richtige nächste Schritt ist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CallPage,
});

const callAgenda = [
  "wo du aktuell stehst",
  "welche Positionierung zu dir passen könnte",
  "welches Angebot du entwickeln kannst",
  "wie Content für dich Aufmerksamkeit und Kunden gewinnen kann",
  "ob Creating Society der richtige nächste Schritt für dich ist",
];

const prep = [
  {
    index: "01",
    title: "Termin wählen",
    body: "Such dir unten einen Zeitpunkt aus, der wirklich in deinen Kalender passt.",
  },
  {
    index: "02",
    title: "Kurz vorbereiten",
    body: "Überleg dir vorab, wo du stehst und was du in den nächsten zwölf Wochen erreichen möchtest.",
  },
  {
    index: "03",
    title: "Gemeinsam schauen",
    body: "Im Gespräch entwickeln wir eine klare Richtung – und du weißt danach, was dein nächster Schritt ist.",
  },
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
      <section className="bg-[color:var(--wine)] py-20 text-[color:var(--cream)] md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <p className="eyebrow text-[color:var(--cream)]/60">Kostenloses Strategiegespräch</p>
              <h1 className="mt-7 font-serif text-[2.4rem] leading-[1.02] sm:text-[3.4rem]">
                Du brauchst nicht noch mehr gespeicherte Content-Tipps.
              </h1>
              <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-[color:var(--cream)]/70">
                Du brauchst Klarheit darüber, was du aufbauen kannst – und einen Plan, wie du es
                umsetzt.
              </p>
              <p className="mt-10 text-sm uppercase tracking-[0.16em] text-[color:var(--cream)]/50">
                Im Gespräch schauen wir uns gemeinsam an:
              </p>
              <ul className="mt-6 border-t border-[color:var(--cream)]/15">
                {callAgenda.map((a) => (
                  <li
                    key={a}
                    className="border-b border-[color:var(--cream)]/15 py-4 text-[1.02rem] text-[color:var(--cream)]/85"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-[color:var(--cream)]/55">
                Das Gespräch dauert ungefähr 30 bis 45 Minuten. Die Zusammenarbeit ist nicht für
                jede Person geeignet. Im Gespräch prüfen wir gemeinsam, ob deine Ziele und Creating
                Society zueinander passen.
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="space-y-8">
                {prep.map((p) => (
                  <div key={p.index} className="border-t border-[color:var(--cream)]/15 pt-6">
                    <p className="font-serif text-2xl text-[color:var(--cream)]/40">{p.index}</p>
                    <h2 className="mt-3 font-serif text-xl text-[color:var(--cream)] sm:text-2xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-[color:var(--cream)]/65">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section id="booking" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="eyebrow text-[color:var(--rose)]">Termin wählen</p>
          <h2 className="mt-5 font-serif text-[2rem] leading-[1.06] text-[color:var(--ink)] sm:text-[2.6rem]">
            Wähle einen Zeitpunkt, der zu dir passt.
          </h2>
          <div className="mt-10">
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
