import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Du bist dabei | Creating Society" },
      {
        name: "description",
        content: "Deine Zahlung ist eingegangen. So startest du mit Creating Society.",
      },
      { property: "og:title", content: "Du bist dabei | Creating Society" },
      { property: "og:description", content: "Deine nächsten Schritte bei Creating Society." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search["session_id"] === "string" ? search["session_id"] : undefined,
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const { session_id: sessionId } = Route.useSearch();

  const steps = [
    {
      n: "01",
      t: "Konto anlegen",
      d: "Registriere dich mit genau der E-Mail, mit der du bezahlt hast. Dein Zugang wird dann automatisch freigeschaltet.",
    },
    {
      n: "02",
      t: "E-Mails prüfen",
      d: "Beleg und Zugangsdaten sind unterwegs. Trage uns ins Adressbuch ein, damit nichts im Spam landet.",
    },
    {
      n: "03",
      t: "Mit Phase 1 starten",
      d: "Positionierung zuerst. Alles andere baut darauf auf.",
    },
  ];

  return (
    <main className="min-h-screen bg-[color:var(--cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow text-[color:var(--rose)]">Willkommen</p>
        <h1 className="mt-5 font-serif text-5xl sm:text-6xl tracking-tight text-[color:var(--wine)]">
          Du bist <span className="serif-italic text-[color:var(--rose)]">dabei.</span>
        </h1>
        <p className="mt-5 text-[color:var(--muted-fg)] leading-relaxed max-w-xl mx-auto">
          {sessionId
            ? "Deine Zahlung ist eingegangen. Drei Dinge als Nächstes."
            : "Schön, dass du da bist. Drei Dinge als Nächstes."}
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 text-left">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white p-7 border border-[color:var(--border)]">
              <div className="font-serif text-3xl text-[color:var(--rose)]">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl text-[color:var(--wine)]">{s.t}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-fg)] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-14 inline-flex items-center px-8 py-4 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
