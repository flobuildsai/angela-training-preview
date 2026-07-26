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
    <main className="min-h-screen bg-background text-foreground grid place-items-center py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <Link to="/" className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground transition">
          ← Zurück
        </Link>
        <p className="mt-10 text-[10px] uppercase tracking-[0.38em] text-muted-foreground">DACH Launch</p>
        <h1 className="mt-5 font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
          Creating Society kommt bald
          <span className="font-serif-italic block text-muted-foreground mt-2">auf Deutsch.</span>
        </h1>
        <p className="mt-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Das komplette System — Positionierung, Reichweite, Angebot, Verkauf — in deiner Sprache. Trag dich ein, dann bekommst du als Erste Bescheid, wenn wir öffnen.
        </p>

        {done ? (
          <p className="mt-10 font-serif-italic text-2xl text-foreground">Danke — du bist auf der Liste.</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              required
              type="email"
              name="email"
              placeholder="deine@email.de"
              className="flex-1 rounded-full bg-card border border-border px-5 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/60 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-90 transition"
            >
              Auf die Warteliste
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
