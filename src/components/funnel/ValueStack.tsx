import type { ReactNode } from "react";

export interface ValueItem { item: string; value: string }

export function ValueStack({ items, total, price, footnote }: { items: ValueItem[]; total: string; price: string; footnote?: ReactNode }) {
  return (
    <div className="rounded-card bg-pure-white p-6 shadow-xl sm:p-8">
      <dl className="divide-y divide-fog">
        {items.map((entry) => (
          <div key={entry.item} className="flex items-start justify-between gap-6 py-4 first:pt-0">
            <dt>{entry.item}</dt><dd className="shrink-0 text-slate">{entry.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-6 py-4 text-slate">
          <dt>Gesamtwert</dt><dd className="line-through">{total}</dd>
        </div>
        <div className="flex items-center justify-between gap-6 pt-5 text-heading-sm font-medium">
          <dt>Dein Preis</dt><dd>{price}</dd>
        </div>
      </dl>
      {footnote ? <div className="mt-6 text-caption leading-relaxed text-slate">{footnote}</div> : null}
    </div>
  );
}