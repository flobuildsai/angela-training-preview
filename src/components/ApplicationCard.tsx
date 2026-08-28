import { Link } from "@tanstack/react-router";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import { trackEvent } from "@/lib/track";

/** Die eine Frage nach Modul 3 — Application zum Strategiegespräch. */
export function ApplicationCard({ name }: { name?: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream2)] p-7 sm:p-9 rv d2">
      <div className="flex items-start gap-5">
        <img src={lauraPortrait.url} alt="Laura" className="h-12 w-12 shrink-0 rounded-full object-cover" loading="lazy" />
        <div>
          <p className="eyebrow text-[color:var(--muted-fg)]">Einmalige Frage</p>
          <p className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">
            {name ? `${name}, du` : "Du"} bist weiter als 80 % hier.
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
            Du hast ein Produkt mit Preis. Das schaffen die wenigsten. Wenn du den Rest schneller und mit
            Begleitung willst — Feedback auf Offer und Content, jemand, der beim Verkaufen daneben sitzt:
            30 Minuten Gespräch mit Laura, kostenlos, ehrlich. Wenn nicht: einfach weiterbauen, wir fragen
            nur noch einmal am Ende.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/call"
              onClick={() => trackEvent("free_application_click", { from: "course" })}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[color:var(--wine)] px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cream)] transition hover:opacity-90"
            >
              Gespräch ansehen
            </Link>
            <Link
              to="/apply"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[color:var(--wine)] px-8 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)]"
            >
              Lieber schriftlich
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
