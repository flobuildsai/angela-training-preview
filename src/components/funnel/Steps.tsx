import type { ReactNode } from "react";

export interface StepItem { title: string; body: ReactNode; image?: ReactNode }

export function Steps({ items }: { items: StepItem[] }) {
  return (
    <ol className="space-y-24">
      {items.slice(0, 3).map((step, index) => (
        <li key={step.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className={index % 2 ? "md:order-2" : undefined}>
            <p className="text-caption font-medium text-slate">0{index + 1}</p>
            <h3 className="mt-3 text-heading font-medium">{step.title}</h3>
            <div className="mt-4 max-w-[520px] text-body leading-[1.5] text-slate">{step.body}</div>
          </div>
          {step.image ? <div className={`overflow-hidden rounded-card ${index % 2 ? "md:order-1" : ""}`}>{step.image}</div> : <div />}
        </li>
      ))}
    </ol>
  );
}