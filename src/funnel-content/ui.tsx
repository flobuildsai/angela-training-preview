import type { ReactNode } from "react";

export function StepLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted-fg)]">
      <span aria-hidden className="h-px w-6 bg-[color:var(--ink)]/25" />
      {children}
    </p>
  );
}

export function Head({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[2.15rem] sm:text-[3.25rem] leading-[1.02] tracking-[-0.02em] text-[color:var(--ink)] text-balance">
      {children}
    </h1>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[58ch] text-[15px] sm:text-[17px] leading-[1.7] text-[color:var(--muted-fg)]">
      {children}
    </p>
  );
}

/** Ruled block — used instead of boxed cards wherever a box adds nothing. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-t border-[color:var(--ink)]/12 pt-6 sm:pt-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[color:var(--ink)]/10 bg-white p-6 sm:p-8 shadow-[0_24px_60px_-40px_rgba(16,16,16,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Big numeric readout, mono digits, no box. */
export function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="border-t border-[color:var(--ink)]/12 pt-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
        {label}
      </p>
      <p className="mt-2 font-serif text-[2rem] sm:text-[2.5rem] leading-none tracking-[-0.02em] text-[color:var(--ink)] tabular-nums">
        {value}
      </p>
      {note && (
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--muted-fg)]">
          {note}
        </p>
      )}
    </div>
  );
}

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function Choice({
  label,
  index,
  selected = false,
  onClick,
}: {
  label: string;
  index?: number;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative w-full text-left px-5 sm:px-6 py-4 min-h-[62px] rounded-2xl border flex items-center gap-4
        transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(.16,1,.3,1)]
        active:scale-[0.985] active:translate-y-[1px]
        ${
          selected
            ? "border-[color:var(--ink)]/35 bg-[color:var(--cream2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
            : "border-[color:var(--ink)]/10 bg-white hover:border-[color:var(--ink)]/30 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-32px_rgba(16,16,16,0.6)]"
        }`}
    >
      {typeof index === "number" && (
        <span
          aria-hidden
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] tracking-[0.1em] transition-colors ${
            selected
              ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
              : "border-[color:var(--ink)]/15 text-[color:var(--muted-fg)] group-hover:border-[color:var(--ink)]/40"
          }`}
        >
          {LETTERS[index] ?? index + 1}
        </span>
      )}
      <span className="flex-1 text-[15px] sm:text-[16px] leading-snug text-[color:var(--ink)]">
        {label}
      </span>
      <span
        aria-hidden
        className="text-[color:var(--muted-fg)] transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

export function PrimaryCTA({
  children,
  onClick,
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[58px] rounded-full
        bg-[color:var(--ink)] text-white text-[12px] font-semibold tracking-[0.18em] uppercase
        transition-[transform,opacity] duration-300 ease-[cubic-bezier(.16,1,.3,1)]
        hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]
        disabled:opacity-25 disabled:cursor-not-allowed disabled:translate-y-0
        shadow-[0_20px_45px_-25px_rgba(16,16,16,0.9)]"
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  );
}

export function SecondaryCTA({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center px-8 py-4 min-h-[58px] rounded-full border border-[color:var(--ink)]/20 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition hover:border-[color:var(--ink)] active:scale-[0.99]"
    >
      {children}
    </button>
  );
}

export function Micro({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-[12px] leading-relaxed text-[color:var(--muted-fg)]">
      {children}
    </p>
  );
}
