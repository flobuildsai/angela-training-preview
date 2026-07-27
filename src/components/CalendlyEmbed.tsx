import { useEffect, useRef } from "react";
import { CALENDLY_URL } from "@/config/calendly";

/**
 * Inline Calendly widget placeholder.
 * TODO: load https://assets.calendly.com/assets/external/widget.js and let
 * Calendly.initInlineWidget populate the container. For now we render a
 * styled placeholder so the layout is production-shaped.
 */
export function CalendlyEmbed({ url = CALENDLY_URL }: { url?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: dynamic-inject widget.js and call window.Calendly.initInlineWidget({ url, parentElement: ref.current })
  }, [url]);

  return (
    <div
      ref={ref}
      className="w-full min-h-[520px] rounded-2xl bg-[color:var(--cream)] border border-[color:var(--border)] grid place-items-center text-center p-8"
    >
      <div>
        <p className="eyebrow text-[color:var(--rose)]">Calendly</p>
        <p className="mt-4 font-serif text-2xl text-[color:var(--wine)]">
          Booking widget mounts here
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted-fg)] max-w-sm mx-auto">
          The inline scheduler will render at this position once the Calendly URL in{" "}
          <code className="font-mono">src/config/calendly.ts</code> is set.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-xs font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
        >
          Open scheduler
        </a>
      </div>
    </div>
  );
}
