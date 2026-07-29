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
                [Name]
                <br />
                [Anschrift]
                <br />
                E-Mail: [E-Mail-Adresse]
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                2. Erhebung und Speicherung personenbezogener Daten beim Besuch der Website
              </h2>
              <p className="mt-4">
                Beim Aufruf dieser Website werden durch den Browser automatisch Informationen an
                den Server übermittelt und vorübergehend in sogenannten Server-Logfiles
                gespeichert. Erfasst werden dabei insbesondere IP-Adresse, Datum und Uhrzeit des
                Zugriffs, aufgerufene Seite, übertragene Datenmenge, Referrer-URL sowie Browsertyp
                und Betriebssystem.
              </p>
              <p className="mt-4">
                Diese Daten dienen der technischen Bereitstellung, Stabilität und Sicherheit der
                Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse
                liegt in einem sicheren und störungsfreien Betrieb der Website. Die Logfiles werden
                nach [Speicherdauer] gelöscht.
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
              </p>
              <p className="mt-4">
                Dabei kann es zu einer Übermittlung personenbezogener Daten in die USA kommen. Die
                Übermittlung wird auf die von der Europäischen Kommission erlassenen
                Standardvertragsklauseln gestützt. Weitere Informationen findest du in der
                Datenschutzerklärung von Calendly.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                4. Kontaktaufnahme per E-Mail
              </h2>
              <p className="mt-4">
                Wenn du uns per E-Mail kontaktierst, werden deine Angaben zur Bearbeitung der
                Anfrage und für mögliche Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6
                Abs. 1 lit. b DSGVO, sofern die Anfrage mit einem Vertrag oder dessen Anbahnung
                zusammenhängt, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht,
                sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                5. Deine Rechte als betroffene Person
              </h2>
              <p className="mt-4">Dir stehen gegenüber uns folgende Rechte zu:</p>
              <ul className="mt-6 border-t border-[color:var(--border)]">
                {[
                  "Recht auf Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)",
                  "Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
                  "Recht auf Löschung (Art. 17 DSGVO)",
                  "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                  "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
                  "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
                  "Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)",
                ].map((r) => (
                  <li key={r} className="border-b border-[color:var(--border)] py-4">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                Zur Ausübung deiner Rechte genügt eine Nachricht an [E-Mail-Adresse].
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] pt-8">
              <h2 className="font-serif text-xl text-[color:var(--ink)] sm:text-2xl">
                6. Aktualität dieser Datenschutzerklärung
              </h2>
              <p className="mt-4">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand [Monat Jahr]. Durch
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
