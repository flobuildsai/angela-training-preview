import type { ReactNode } from "react";

export function StepLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
      {children}
    </p>
  );
}

export function Head({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight text-[color:var(--wine)]">
      {children}
    </h1>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] sm:text-base leading-relaxed text-[color:var(--muted-fg)]">
      {children}
    </p>
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
      className={`rounded-2xl border border-[color:var(--border)] bg-white p-5 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function Choice({
  label,
  selected = false,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left px-5 sm:px-6 py-4 min-h-[60px] rounded-2xl border transition flex items-center justify-between gap-4 ${
        selected
          ? "border-[color:var(--rose)] bg-[color:var(--rose)]/8"
          : "border-[color:var(--border)] bg-white hover:border-[color:var(--rose)] hover:bg-[color:var(--rose)]/5"
      }`}
    >
      <span className="text-[color:var(--ink)] text-[15px] sm:text-base">{label}</span>
      <span className="text-[color:var(--muted-fg)] group-hover:text-[color:var(--rose)] transition">
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
      className="w-full inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-[13px] font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export function Micro({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs text-[color:var(--muted-fg)]">{children}</p>
  );
}
