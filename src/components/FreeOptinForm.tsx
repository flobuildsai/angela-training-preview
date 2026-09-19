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
      await navigate({ to: "/free/willkommen" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Das hat gerade nicht geklappt. Versuch es noch einmal.");
      setBusy(false);
    }
  };

  const text = light ? "text-pure-white" : "text-near-black";
  const muted = light ? "text-pure-white/70" : "text-slate";
  const line = light ? "border-pure-white/40 focus:border-pure-white bg-pure-white/10" : "border-fog focus:border-pressed-graphite bg-pure-white";
  const input = `min-h-14 w-full rounded-input border px-4 text-body ${text} placeholder:text-stone focus:outline-none transition ${line}`;

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${placement}-name`} className={`mb-2 block text-caption font-medium ${muted}`}>
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
          <label htmlFor={`${placement}-email`} className={`mb-2 block text-caption font-medium ${muted}`}>
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
      {error && <p className={`text-caption ${light ? "text-pure-white" : "text-iron"}`}>{error}</p>}
      <div className="space-y-3">
        <PrimaryButton
          type="submit"
          disabled={busy}
          className={light ? "!bg-pure-white !text-pressed-graphite" : ""}
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
