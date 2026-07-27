// Lightweight analytics stub. TODO: wire to Meta Pixel / GA4 / Plausible.
export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-console
  console.log("[track]", name, data ?? {});
}
