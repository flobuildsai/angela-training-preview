import type { ReactNode } from "react";

export function HonestBox({ heading, children }: { heading: string; children: ReactNode }) {
  return <aside className="rounded-card border border-fog bg-cream-paper p-8"><h2 className="text-heading font-medium">{heading}</h2><div className="mt-4 max-w-[700px] text-body leading-[1.5] text-slate">{children}</div></aside>;
}