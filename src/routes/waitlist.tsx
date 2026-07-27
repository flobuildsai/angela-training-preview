import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Warteliste — Creating Society" },
      { name: "description", content: "Creating Society kommt bald auf Deutsch. Trag dich in die Warteliste ein." },
      { property: "og:title", content: "Warteliste — Creating Society" },
      { property: "og:description", content: "Creating Society kommt bald auf Deutsch." },
    ],
  }),
  component: WaitlistPage,
});

function WaitlistPage() {
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // TODO: POST to real waitlist endpoint
    console.log("waitlist", Object.fromEntries(fd));
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-[color:var(--wine)] text-[color:var(--cream)] grid place-items-center py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <Link to="/" className="text-xs tracking-[0.2em] uppercase text-[color:var(--cream)]/60 hover:text-[color:var(--cream)]">
          ← Zurück
        </Link>
        <p className="mt-10 eyebrow text-[color:var(--rose)]">DACH Launch</p>
        <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
          Creating Society kommt bald <span className="serif-italic text-[color:var(--rose)]">auf Deutsch.</span>
        </h1>
        <p className="mt-6 text-[color:var(--cream)]/75 leading-relaxed">
          Das komplette System — Positionierung, Reichweite, Angebot, Verkauf — in deiner Sprache. Trag dich ein, dann bekommst du als Erste Bescheid, wenn wir öffnen.
        </p>

        {done ? (
          <p className="mt-10 serif-italic text-xl text-[color:var(--rose)]">Danke — du bist auf der Liste.</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              required
              type="email"
              name="email"
              placeholder="deine@email.de"
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40 focus:outline-none focus:border-[color:var(--rose)]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[color:var(--rose)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
            >
              Auf die Warteliste
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
