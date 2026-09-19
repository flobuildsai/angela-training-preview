import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY, readCookieConsent, type CookieConsent as ConsentChoice } from "@/lib/cookieConsent";

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { setChoice(readCookieConsent()); setReady(true); }, []);

  function choose(value: ConsentChoice) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setChoice(value);
    window.dispatchEvent(new CustomEvent("tcs:cookie-consent", { detail: value }));
  }

  if (!ready || choice) return null;
  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[720px] rounded-card border border-fog bg-pure-white p-5 shadow-xl sm:p-6" aria-label="Cookie-Einstellungen">
      <p className="text-heading-sm font-medium">Deine Privatsphäre</p>
      <p className="mt-2 text-caption leading-relaxed text-slate">Notwendige Cookies halten die Seite funktionsfähig. Marketing-Technologien wie Meta Pixel werden erst nach deiner Zustimmung geladen.</p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={() => choose("necessary")}>Nur notwendige</Button>
        <Button onClick={() => choose("accepted")}>Akzeptieren</Button>
      </div>
    </aside>
  );
}