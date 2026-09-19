export type CookieConsent = "accepted" | "necessary";

export const COOKIE_CONSENT_KEY = "tcs-cookie-consent";

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "necessary" ? value : null;
}

export function hasMarketingConsent() {
  return readCookieConsent() === "accepted";
}