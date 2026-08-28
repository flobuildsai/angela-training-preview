import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { freeOptin } from "@/utils/freeCourse.functions";
import { readUtm, writeAccess } from "@/lib/freeAccess";
import { trackEvent } from "@/lib/track";
import { PrimaryButton } from "./FreeShell";

interface FreeOptinFormProps {
  /** Wo im Funnel das Formular steht — für das Tracking. */
  placement: "hero" | "bottom";
  light?: boolean;
  cta?: string;
}

/**
 * Das Opt-in: Vorname + E-Mail. Keine Telefonnummer an dieser Stelle —
 * die kommt auf der Willkommensseite, wenn sie den Kurs schon hat.
 */
export function FreeOptinForm({ placement, light = false, cta = "Kostenlosen Zugang holen" }: FreeOptinFormProps) {
  const navigate = useNavigate();
  const optin = useServerFn(freeOptin);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim()) return setError("Wie heißt du?");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Bitte eine gültige E-Mail-Adresse.");
    setBusy(true);
    try {
      const access = await optin({ data: { firstName: firstName.trim(), email: email.trim(), utm: readUtm() } });
      writeAccess(access);
      trackEvent("free_optin", { placement });
      await navigate({ to: "/free/willkommen" as "/apply" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Das hat gerade nicht geklappt. Versuch es noch einmal.");
      setBusy(false);
    }
  };

  const text = light ? "text-[color:var(--cream)]" : "text-[color:var(--ink)]";
  const muted = light ? "text-[color:var(--cream)]/60" : "text-[color:var(--muted-fg)]";
  const line = light ? "border-[color:var(--cream)]/30 focus:border-[color:var(--cream)]" : "border-[color:var(--border)] focus:border-[color:var(--rose)]";
  const input = `w-full bg-transparent border-0 border-b px-0 py-3 text-lg ${text} placeholder:opacity-40 focus:outline-none transition ${line}`;

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${placement}-name`} className={`block text-[11px] uppercase tracking-[0.22em] ${muted}`}>
            Vorname
          </label>
          <input
            id={`${placement}-name`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            placeholder="Laura"
            className={input}
          />
        </div>
        <div>
          <label htmlFor={`${placement}-email`} className={`block text-[11px] uppercase tracking-[0.22em] ${muted}`}>
            E-Mail
          </label>
          <input
            id={`${placement}-email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="du@beispiel.de"
            className={input}
          />
        </div>
      </div>
      {error && <p className={`text-sm ${light ? "text-[color:var(--cream)]" : "text-[color:var(--rose)]"}`}>{error}</p>}
      <div className="space-y-3">
        <PrimaryButton
          type="submit"
          disabled={busy}
          className={light ? "!bg-[color:var(--cream)] !text-[color:var(--wine)]" : ""}
        >
          {busy ? "Einen Moment …" : cta}
        </PrimaryButton>
        <p className={`text-[12px] leading-relaxed ${muted}`}>
          Keine Kreditkarte. Kein Abo. Modul 1 ist sofort offen. Abmelden jederzeit mit einem Klick.
        </p>
      </div>
    </form>
  );
}
