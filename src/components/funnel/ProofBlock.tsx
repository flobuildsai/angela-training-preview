import type { ReactNode } from "react";

export function ProofBlock({ photo, heading, quote, stats = [] }: { photo: ReactNode; heading: string; quote: ReactNode; stats?: string[] }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className="overflow-hidden rounded-card">{photo}</div>
      <div>
        <h2 className="text-heading font-medium">{heading}</h2>
        <blockquote className="mt-5 text-subheading leading-[1.4] text-slate">{quote}</blockquote>
        {stats.length ? <div className="mt-7 flex flex-wrap gap-2">{stats.map((stat) => <span key={stat} className="rounded-pill border border-fog bg-pure-white px-4 py-2.5 text-caption font-medium">{stat}</span>)}</div> : null}
      </div>
    </div>
  );
}