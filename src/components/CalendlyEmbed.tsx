import { useEffect, useRef } from "react";
import { CALENDLY_URL } from "@/config/calendly";

/**
 * Inline Cal.com booking embed.
 * Renders the scheduler in an iframe with Cal.com's embed mode enabled.
 */
export function CalendlyEmbed({ url = CALENDLY_URL }: { url?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cal.com iframe embed prefers the ?embed=true flag for a chrome-free layout.
    const embedUrl = new URL(url);
    embedUrl.searchParams.set("embed", "true");
    if (!embedUrl.searchParams.has("theme")) {
      embedUrl.searchParams.set("theme", "light");
    }

    const iframe = document.createElement("iframe");
    iframe.src = embedUrl.toString();
    iframe.title = "Termin buchen";
    iframe.className = "w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)]";
    iframe.style.minHeight = "620px";
    iframe.style.height = "100%";
    iframe.allow = "camera; microphone; fullscreen; autoplay; clipboard-write";

    const container = ref.current;
    if (container) {
      container.innerHTML = "";
      container.appendChild(iframe);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [url]);

  return (
    <div
      ref={ref}
      className="w-full min-h-[620px] rounded-2xl bg-[color:var(--cream)]"
    />
  );
}
