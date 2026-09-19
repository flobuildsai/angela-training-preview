import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface FAQItem { question: string; answer: string }

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-fog border-y border-fog">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.question}>
            <Button variant="ghost" onClick={() => setOpen(active ? null : index)} aria-expanded={active} className="h-auto w-full justify-between rounded-none px-0 py-5 text-left text-subheading hover:bg-transparent">
              <span className="whitespace-normal">{item.question}</span><span aria-hidden="true">{active ? "−" : "+"}</span>
            </Button>
            {active ? <p className="max-w-[700px] pb-6 text-body leading-[1.5] text-slate">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}