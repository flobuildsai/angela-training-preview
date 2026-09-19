import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { WEBSITE_COPY } from "@/config/funnel/website";
import { readUtm } from "@/lib/freeAccess";
import { trackEvent } from "@/lib/track";
import { claimWebsite } from "@/utils/website.functions";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+(?:49|43|41)\d{7,13}$/;

export function WebsiteClaimModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const submitClaim = useServerFn(claimWebsite);
  const [step, setStep] = useState<1 | 2>(1);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+49");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!open) { setStep(1); setErrors({}); } }, [open]);

  const next = () => {
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = "Bitte gib deinen Vornamen ein.";
    if (!EMAIL.test(email.trim())) nextErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) { setStep(2); trackEvent("website_claim_step2"); }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    const normalizedPhone = phone.replace(/[\s()/-]/g, "");
    const nextErrors: Record<string, string> = {};
    if (!PHONE.test(normalizedPhone)) nextErrors.phone = "Bitte nutze eine gültige Nummer aus DE, AT oder CH.";
    if (!consent) nextErrors.consent = "Bitte bestätige, dass wir dich kontaktieren dürfen.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setBusy(true);
    try {
      await submitClaim({ data: { firstName: firstName.trim(), email: email.trim(), phone: normalizedPhone, consent, utm: readUtm() } });
      trackEvent("website_claim");
      onOpenChange(false);
      await navigate({ to: "/website/danke" });
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal." });
      setBusy(false);
    }
  };

  const inputClass = "min-h-14 w-full rounded-input border border-fog bg-pure-white px-4 text-body text-near-black outline-none transition focus:border-pressed-graphite";
  return (
    <Dialog open={open} onOpenChange={busy ? undefined : onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[440px] gap-0 rounded-[24px] border-0 bg-pure-white p-8 shadow-xl data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2 [&_[data-radix-dialog-close]]:rounded-icon">
        <DialogTitle className="pr-8 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.02em]">
          {step === 1 ? WEBSITE_COPY.modal.step1 : WEBSITE_COPY.modal.step2}
        </DialogTitle>
        <DialogDescription className="sr-only">Schritt {step} von 2 zur kostenlosen Website.</DialogDescription>
        <div className="mt-6 grid grid-cols-2 gap-2" aria-label={`Schritt ${step} von 2`}>
          <span className="h-1 rounded-pill bg-pressed-graphite" />
          <span className={`h-1 rounded-pill ${step === 2 ? "bg-pressed-graphite" : "bg-fog"}`} />
        </div>
        {step === 1 ? (
          <div className="mt-7 space-y-5">
            <Field label="Vorname" id="website-first-name" error={errors.firstName}>
              <input id="website-first-name" autoFocus autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className={inputClass} placeholder="Laura" />
            </Field>
            <Field label="E-Mail" id="website-email" error={errors.email}>
              <input id="website-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="du@beispiel.de" />
            </Field>
            <Button type="button" size="lg" className="w-full" onClick={next}>{WEBSITE_COPY.modal.next}</Button>
          </div>
        ) : (
          <form className="mt-7 space-y-5" onSubmit={submit} noValidate>
            <Field label="Telefonnummer" id="website-phone" error={errors.phone}>
              <input id="website-phone" autoFocus type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} />
            </Field>
            <p className="text-caption leading-relaxed text-slate">{WEBSITE_COPY.modal.helper}</p>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-caption leading-relaxed text-iron">
                <Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5 h-5 w-5 rounded-icon" />
                <span>{WEBSITE_COPY.modal.consent}</span>
              </label>
              {errors.consent ? <p className="mt-2 text-caption text-iron">{errors.consent}</p> : null}
            </div>
            {errors.submit ? <p className="text-caption text-iron">{errors.submit}</p> : null}
            <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Einen Moment …" : WEBSITE_COPY.modal.submit}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="mb-2 block text-caption font-medium text-iron">{label}</label>{children}{error ? <p className="mt-2 text-caption text-iron">{error}</p> : null}</div>;
}
