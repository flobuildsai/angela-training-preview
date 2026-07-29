import { createFileRoute, Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-dark.png";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Creating Society" },
      {
        name: "description",
        content: "Impressum und Anbieterkennzeichnung gemäß § 5 DDG für Creating Society.",
      },
      { property: "og:title", content: "Impressum — Creating Society" },
      {
        property: "og:description",
        content: "Anbieterkennzeichnung und Kontaktangaben von Creating Society.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <main className="bg-[color:var(--background)]">
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

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="eyebrow text-[color:var(--rose)]">Rechtliches</p>
          <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.04] text-[color:var(--ink)] sm:text-[3.2rem]">
            Impressum
          </h1>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
            Angaben gemäß § 5 DDG (ehemals § 5 TMG).
          </p>

          <div className="mt-14 space-y-12 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">Anbieter</h2>
              <p className="mt-4">
                WYLD Society GmbH
                <br />
                Marktplatz 16
                <br />
                93167 Falkenstein
                <br />
                Deutschland
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">Kontakt</h2>
              <p className="mt-4">
                E-Mail:{" "}
                <a
                  href="mailto:info@wyldsociety.io"
                  className="text-[color:var(--ink)] underline underline-offset-4"
                >
                  info@wyldsociety.io
                </a>
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p className="mt-4">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [USt-IdNr.]
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-4">
                WYLD Society GmbH
                <br />
                Marktplatz 16
                <br />
                93167 Falkenstein
                <br />
                Deutschland
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                EU-Streitschlichtung
              </h2>
              <p className="mt-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[color:var(--ink)] underline underline-offset-4"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                .
              </p>
              <p className="mt-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                Haftung für Inhalte
              </h2>
              <p className="mt-4">
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">Urheberrecht</h2>
              <p className="mt-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung
                und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Platzhalter ersetzen und rechtlich prüfen lassen vor Livegang. */}

      <footer className="border-t border-[color:var(--border)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-[color:var(--muted-fg)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <img
            src={logoDark}
            alt="thecreatingsociety"
            className="h-4 w-auto shrink-0 self-start object-contain"
          />
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
