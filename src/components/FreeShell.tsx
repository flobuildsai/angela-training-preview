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

export function FreeHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-fog/70 bg-cream-paper/90 backdrop-blur">
      <div className="mx-auto flex min-h-[74px] max-w-[1120px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center">
          <img src={logoDark} alt="thecreatingsociety" className="h-4 w-auto sm:h-5" />
        </Link>
        {right}
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
