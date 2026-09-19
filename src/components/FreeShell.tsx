import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import logoDark from "@/assets/logo-dark.png";
import { Button } from "@/components/ui/button";

/** Scroll-Reveal für `.rv`-Elemente — wie auf den bestehenden Seiten. */
export function useReveal() {
  // Ohne Dependency-Array: läuft nach jedem Render, damit auch .rv-Elemente
  // erfasst werden, die erst nach async geladenem Zugang mounten.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.on)"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export function FreeHeader({ right, nav }: { right?: ReactNode; nav?: ReactNode }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex min-h-[64px] max-w-[1160px] items-center justify-between gap-5 rounded-[16px] border border-pure-white/15 bg-pressed-graphite/90 px-4 text-pure-white shadow-xl backdrop-blur sm:px-5">
        <Link to="/" className="flex items-center">
          <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto invert sm:h-5" />
        </Link>
        <div className="hidden items-center gap-7 lg:flex">{nav}</div>
        <div className="ml-auto">{right}</div>
      </div>
    </header>
  );
}

export function FreeFooter() {
  return (
    <footer className="border-t border-fog/70 py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 text-caption text-slate sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Creating Society</p>
        <nav className="flex flex-wrap items-center gap-6">
          <Link to="/impressum" className="transition hover:text-[color:var(--ink)]">Impressum</Link>
          <Link to="/datenschutz" className="transition hover:text-[color:var(--ink)]">Datenschutz</Link>
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-3xl px-5 text-center text-caption leading-relaxed text-stone sm:px-8">
        Die gezeigten Zahlen sind Lauras eigene Ergebnisse und keine Zusage für deine. Was du erreichst, hängt von
        deinem Thema, deiner Umsetzung und deiner Zeit ab. Creating Society ist keine Plattform von Meta.
      </p>
    </footer>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      size="lg"
      className={`w-full sm:w-auto ${className}`}
    >
      {children}
    </Button>
  );
}
