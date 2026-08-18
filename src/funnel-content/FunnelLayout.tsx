import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useFunnel, TOTAL_STEPS } from "./FunnelContext";

export function FunnelLayout({ children }: { children: ReactNode }) {
  const { step, back } = useFunnel();
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="min-h-screen bg-[color:var(--cream)] pb-20">
      <div className="sticky top-0 z-40 bg-[color:var(--cream)]/90 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="eyebrow text-[color:var(--wine)]">
            Creating Society
          </Link>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--muted-fg)]">
            {step + 1} / {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-[2px] bg-[color:var(--border)]">
          <div
            className="h-full bg-[color:var(--rose)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-6 mt-6 min-h-[24px]">
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <button
            onClick={back}
            className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted-fg)] hover:text-[color:var(--wine)] transition"
          >
            ← Zurück
          </button>
        )}
      </div>

      <div
        key={step}
        className="max-w-2xl mx-auto px-5 sm:px-6 mt-6 animate-[stepIn_.45s_cubic-bezier(.16,1,.3,1)]"
      >
        {children}
      </div>

      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
