import { useState } from "react";
import { Button } from "@/components/ui/button";

export type LeadField = "vorname" | "email" | "phone";
export type LeadFormData = Partial<Record<LeadField, string>>;

interface LeadFormProps {
  fields: LeadField[];
  submitLabel: string;
  onSubmit: (data: LeadFormData) => void | Promise<void>;
  helper?: string;
}

const labels: Record<LeadField, string> = { vorname: "Vorname", email: "E-Mail", phone: "Telefonnummer" };

function normalizePhone(value: string) {
  const compact = value.replace(/[\s()./-]/g, "");
  if (compact.startsWith("00")) return `+${compact.slice(2)}`;
  if (compact.startsWith("0")) return `+49${compact.slice(1)}`;
  if (!compact.startsWith("+")) return `+49${compact}`;
  return compact;
}

function validPhone(value: string) {
  return /^\+(?:49|43|41)\d{7,13}$/.test(normalizePhone(value));
}

export function LeadForm({ fields, submitLabel, onSubmit, helper }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormData>({});
  const [errors, setErrors] = useState<LeadFormData>({});
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const nextErrors: LeadFormData = {};
    fields.forEach((field) => {
      const value = values[field]?.trim() ?? "";
      if (!value) nextErrors[field] = "Bitte ausfüllen.";
      else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) nextErrors[field] = "Bitte eine gültige E-Mail eingeben.";
      else if (field === "phone" && !validPhone(value)) nextErrors[field] = "Bitte eine gültige Nummer aus DE, AT oder CH eingeben.";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true);
    try {
      const payload = { ...values };
      if (payload.phone) payload.phone = normalizePhone(payload.phone);
      await onSubmit(payload);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={`lead-${field}`} className="mb-2 block text-caption font-medium text-iron">{labels[field]}</label>
          <input
            id={`lead-${field}`}
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            inputMode={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            autoComplete={field === "vorname" ? "given-name" : field === "email" ? "email" : "tel"}
            value={values[field] ?? ""}
            onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
            placeholder={field === "phone" ? "+49 170 1234567" : undefined}
            aria-invalid={Boolean(errors[field])}
            aria-describedby={errors[field] ? `lead-${field}-error` : undefined}
            className="min-h-14 w-full rounded-input border border-fog bg-pure-white px-4 text-body text-near-black outline-none placeholder:text-stone focus:border-pressed-graphite"
          />
          {errors[field] ? <p id={`lead-${field}-error`} className="mt-2 text-caption text-iron">{errors[field]}</p> : null}
        </div>
      ))}
      <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Einen Moment …" : submitLabel}
      </Button>
      {helper ? <p className="text-caption leading-relaxed text-slate">{helper}</p> : null}
    </form>
  );
}