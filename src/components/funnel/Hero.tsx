import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  media?: ReactNode;
  form?: ReactNode;
  trustLine?: ReactNode;
}

export function Hero({ eyebrow, title, sub, media, form, trustLine }: HeroProps) {
  return (
    <section className="funnel-section">
      <div className="funnel-container">
        <div className="max-w-[880px]">
          {eyebrow ? <p className="text-caption font-medium text-iron">{eyebrow}</p> : null}
          <h1 className="mt-5 max-w-[15ch] font-display text-[36px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[56px]">
            {title}<span className="ember-dot" aria-hidden="true">.</span>
          </h1>
          {sub ? <p className="mt-6 max-w-[620px] text-subheading leading-[1.4] text-slate">{sub}</p> : null}
        </div>
        {media ? <div className="mt-10">{media}</div> : null}
        {form ? <div className="mt-10 max-w-[560px]">{form}</div> : null}
        {trustLine ? <div className="mt-5 text-caption text-slate">{trustLine}</div> : null}
      </div>
    </section>
  );
}