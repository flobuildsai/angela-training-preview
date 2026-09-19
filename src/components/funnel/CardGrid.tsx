import type { ReactNode } from "react";

export interface CardGridItem { icon?: ReactNode; title: string; body: ReactNode }

export function CardGrid({ items, columns = 3 }: { items: CardGridItem[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-card bg-pure-white p-8 shadow-xl transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5">
          {item.icon ? <div className="mb-8 grid h-10 w-10 place-items-center rounded-icon border border-fog text-iron">{item.icon}</div> : null}
          <h3 className="text-heading-sm font-medium leading-[1.4]">{item.title}</h3>
          <div className="mt-3 text-body leading-[1.5] text-slate">{item.body}</div>
        </article>
      ))}
    </div>
  );
}