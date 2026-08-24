import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logoDark from "@/assets/logo-dark.png";
import { useFunnel, TOTAL_STEPS } from "./FunnelContext";

export function FunnelLayout({ children }: { children: ReactNode }) {
  const { step, back } = useFunnel();
  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const showBack = step > 0 && step < TOTAL_STEPS - 1;

  return (
    <main className="min-h-screen bg-[color:var(--cream)] pb-32">
      <div className="sticky top-0 z-40 bg-[color:var(--cream)]/85 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/" className="flex min-w-0 items-center">
            <img src={logoDark} alt="Creating Society" className="h-5 w-auto shrink-0" />
          </Link>
          <span className="font-serif text-sm text-[color:var(--muted-fg)] tabular-nums">
            {step + 1}<span className="opacity-40"> / {TOTAL_STEPS}</span>
          </span>
        </div>
        <div className="h-px bg-[color:var(--border)]">
          <div
            className="h-full bg-[color:var(--rose)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        key={step}
        className="max-w-2xl mx-auto px-5 sm:px-6 mt-10 sm:mt-14 animate-[stepIn_.45s_cubic-bezier(.16,1,.3,1)]"
      >
        {children}
      </div>

      {showBack && (
        <button
          onClick={back}
          className="fixed bottom-6 left-5 sm:left-8 z-40 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--cream)]/90 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)] backdrop-blur transition hover:text-[color:var(--wine)] active:scale-[0.98]"
        >
          <span aria-hidden="true">←</span> Zurück
        </button>
      )}


      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
