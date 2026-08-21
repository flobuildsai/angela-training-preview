import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useFunnel, TOTAL_STEPS } from "./FunnelContext";

export function FunnelLayout({ children }: { children: ReactNode }) {
  const { step, back } = useFunnel();
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="relative min-h-[100dvh] bg-[color:var(--cream)] pb-24">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5] [background:radial-gradient(60rem_40rem_at_75%_-10%,rgba(148,137,122,0.10),transparent_65%)]"
      />

      <header className="sticky top-0 z-40 bg-[color:var(--cream)]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="font-serif text-[17px] tracking-[-0.01em] text-[color:var(--ink)]"
          >
            Creating Society
          </Link>
          <span className="font-sans text-[11px] tabular-nums tracking-[0.22em] text-[color:var(--muted-fg)]">
            {String(step + 1).padStart(2, "0")}
            <span className="opacity-40"> / </span>
            {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-px bg-[color:var(--ink)]/10">
          <div
            className="h-full bg-[color:var(--ink)] transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="relative z-10 mx-auto mt-5 min-h-[22px] max-w-3xl px-5 sm:px-8">
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <button
            onClick={back}
            className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)] transition hover:text-[color:var(--ink)]"
          >
            ← Zurück
          </button>
        )}
      </div>

      <div
        key={step}
        className="relative z-10 mx-auto mt-8 max-w-3xl px-5 sm:px-8 animate-[stepIn_.55s_cubic-bezier(.16,1,.3,1)_both]"
      >
        {children}
      </div>

      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[stepIn"] { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
