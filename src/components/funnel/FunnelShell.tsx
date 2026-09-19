import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FunnelShellProps {
  children: ReactNode;
  cta?: { label: string; href: string };
  partnerNotice?: ReactNode;
}

export function FunnelShell({ children, cta, partnerNotice }: FunnelShellProps) {
  return (
    <div className="min-h-screen bg-cream-paper text-near-black">
      <header className="border-b border-fog/70">
        <div className="mx-auto flex min-h-[74px] max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-display text-[28px] font-medium tracking-[-0.02em]">
            Creating Society
          </Link>
          {cta ? (
            <Button asChild>
              <a href={cta.href}>{cta.label}</a>
            </Button>
          ) : null}
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-fog/70 py-10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 text-caption text-slate sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Creating Society</p>
          <nav className="flex flex-wrap items-center gap-6" aria-label="Rechtliche Hinweise">
            <Link to="/impressum" className="transition-colors hover:text-near-black">Impressum</Link>
            <Link to="/datenschutz" className="transition-colors hover:text-near-black">Datenschutz</Link>
          </nav>
        </div>
        {partnerNotice ? (
          <div className="mx-auto mt-6 max-w-[1120px] px-5 text-caption leading-relaxed text-stone sm:px-8">
            {partnerNotice}
          </div>
        ) : null}
      </footer>
    </div>
  );
}