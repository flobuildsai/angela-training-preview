import { createFileRoute, Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-dark.png";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Creating Society" },
      {
        name: "description",
        content:
          "Informationen zur Verarbeitung personenbezogener Daten auf der Website von Creating Society nach DSGVO.",
      },
      { property: "og:title", content: "Datenschutzerklärung — Creating Society" },
      {
        property: "og:description",
        content:
          "Wie Creating Society personenbezogene Daten verarbeitet: Logfiles, Terminbuchung, Kontakt und deine Rechte.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DatenschutzPage,
});

const rights = [
  "Recht auf Auskunft (Art. 15 DSGVO)",
  "Recht auf Berichtigung (Art. 16 DSGVO)",
  "Recht auf Löschung (Art. 17 DSGVO)",
  "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
  "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
  "Recht auf Widerspruch (Art. 21 DSGVO)",
  "Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)",
];

function DatenschutzPage() {
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
            Datenschutzerklärung
          </h1>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
            Stand: Juli 2026
          </p>

          <div className="mt-14 space-y-12 text-[1.02rem] leading-relaxed text-[color:var(--muted-fg)]">
            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                1. Verantwortlicher
              </h2>
              <p className="mt-4">
                Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
                Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p className="mt-4">
                WYLD Society GmbH
                <br />
                Marktplatz 16
                <br />
                93167 Falkenstein
                <br />
                Deutschland
                <br />
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
                2. Hosting und technische Bereitstellung
              </h2>
              <p className="mt-4">
                Diese Website wird über Lovable Cloud bereitgestellt. Beim Aufruf der Seite werden
                technisch notwendige Daten (insbesondere IP-Adresse, Datum und Uhrzeit des
                Zugriffs, aufgerufene Seite, Browsertyp und Betriebssystem) automatisch in
                Server-Logfiles verarbeitet, um die Auslieferung der Seite sowie einen sicheren und
                störungsfreien Betrieb zu ermöglichen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                DSGVO.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                3. Terminbuchung über Calendly
              </h2>
              <p className="mt-4">
                Für die Buchung von Strategiegesprächen nutzen wir den Dienst Calendly der Calendly
                LLC, 271 17th St NW, Atlanta, GA 30363, USA. Wenn du einen Termin buchst, werden
                die von dir eingegebenen Daten (insbesondere Name, E-Mail-Adresse, Terminwunsch
                sowie freiwillige Angaben) an Calendly übermittelt und dort verarbeitet.
              </p>
              <p className="mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da die Verarbeitung zur
                Durchführung vorvertraglicher Maßnahmen auf deine Anfrage hin erforderlich ist.
                Dabei kann es zu einer Übermittlung personenbezogener Daten in die USA kommen; die
                Übermittlung wird auf die Standardvertragsklauseln der Europäischen Kommission
                gestützt.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                4. Bewerbung und Kontaktaufnahme
              </h2>
              <p className="mt-4">
                Wenn du dich über ein Formular auf dieser Website bewirbst oder uns per E-Mail
                kontaktierst, verarbeiten wir die von dir angegebenen Daten (z. B. Name,
                E-Mail-Adresse, Instagram-Handle, Angaben zu deinem Vorhaben) ausschließlich, um
                deine Anfrage zu bearbeiten und dich gegebenenfalls in das Programm aufzunehmen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO sowie unser berechtigtes Interesse
                an der Bearbeitung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                5. Speicherdauer
              </h2>
              <p className="mt-4">
                Wir speichern deine Daten so lange, wie es für die Bearbeitung deiner Anfrage und
                für die Dauer der Zusammenarbeit erforderlich ist. Auf Wunsch löschen wir deine
                Daten jederzeit, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                6. Deine Rechte als betroffene Person
              </h2>
              <p className="mt-4">Dir stehen gegenüber uns folgende Rechte zu:</p>
              <ul className="mt-6 border-t border-[color:var(--border)]">
                {rights.map((r) => (
                  <li key={r} className="border-b border-[color:var(--border)] py-4">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                Zur Ausübung deiner Rechte genügt eine Nachricht an{" "}
                <a
                  href="mailto:info@wyldsociety.io"
                  className="text-[color:var(--ink)] underline underline-offset-4"
                >
                  info@wyldsociety.io
                </a>
                .
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                7. Aktualität dieser Datenschutzerklärung
              </h2>
              <p className="mt-4">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Juli 2026. Durch
                die Weiterentwicklung der Website oder geänderte gesetzliche Vorgaben kann eine
                Anpassung erforderlich werden.
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
