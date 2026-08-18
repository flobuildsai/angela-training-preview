import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";
import { formatEur, useFunnel } from "../FunnelContext";
import { Card, Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";

/** Step 12 — Lead-Capture */
export function StepLead() {
  const { next, data, update } = useFunnel();
  const [firstName, setFirstName] = useState(data.firstName);
  const [email, setEmail] = useState(data.email);
  const [instagram, setInstagram] = useState(data.instagram);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Bitte trag deinen Vornamen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = "Bitte eine gültige E-Mail-Adresse.";
    if (instagram.trim().replace(/^@/, "").length < 2)
      e.instagram = "Bitte dein Instagram-Handle.";
    setErrors(e);
    if (Object.keys(e).length) return;

    const clean = {
      firstName: firstName.trim(),
      email: email.trim(),
      instagram: instagram.trim().replace(/^@/, ""),
    };
    update(clean);
    // TODO: Lead an CRM / E-Mail-Tool übergeben, sobald das Backend steht.
    trackEvent("content_funnel_lead", { niche: data.niche, price: data.price });
    next();
  };

  const field = (
    id: keyof typeof errors,
    label: string,
    value: string,
    onChange: (v: string) => void,
    type = "text",
    placeholder = "",
  ) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-[color:var(--border)] px-1 py-3 text-lg text-[color:var(--ink)] placeholder:text-[color:var(--muted-fg)]/50 focus:outline-none focus:border-[color:var(--rose)] transition"
      />
      {errors[id] && (
        <p className="text-xs text-[color:var(--rose)]">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <StepLabel>Letzter Schritt</StepLabel>
        <Head>Wohin soll ich deinen Plan schicken?</Head>
        <Sub>
          Danach siehst du dein Ergebnis und kannst direkt ein kostenloses
          Strategiegespräch buchen.
        </Sub>
      </div>

      <Card>
        <div className="space-y-6">
          {field("firstName", "Vorname", firstName, setFirstName)}
          {field("email", "E-Mail", email, setEmail, "email", "du@beispiel.de")}
          {field("instagram", "Instagram", instagram, setInstagram, "text", "@deinhandle")}
        </div>
      </Card>

      <PrimaryCTA onClick={submit}>Ergebnis ansehen</PrimaryCTA>
      <Micro>Kein Spam. Du kannst dich jederzeit abmelden.</Micro>
    </div>
  );
}

/** Step 13 — Ergebnis + Call-Buchung */
export function StepResult() {
  const { data, profile, score, monthlyViews } = useFunnel();
  const monthly = data.price * data.buyers;

  useEffect(() => {
    trackEvent("content_funnel_result_view", { niche: data.niche });
  }, [data.niche]);

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-3">
        <StepLabel>Dein Ergebnis</StepLabel>
        <Head>
          {data.firstName ? `${data.firstName}, ` : ""}das ist dein Startpunkt.
        </Head>
        <Sub>
          Deine Zahlen im Überblick. Im Gespräch gehen wir sie gemeinsam durch und
          schauen, ob wir zusammenpassen.
        </Sub>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ["Nische", data.niche || profile.label],
          ["Startpotenzial", `${score}/100`],
          ["Reichweite pro Monat", `${monthlyViews.toLocaleString("de-DE")} Views`],
          ["Potenzial pro Monat", formatEur(monthly)],
        ].map(([k, v]) => (
          <Card key={k} className="bg-[color:var(--cream2)] border-transparent">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
              {k}
            </p>
            <p className="mt-2 font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
              {v}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <img
            src={lauraPortrait.url}
            alt="Laura"
            className="w-14 h-14 rounded-full object-cover shrink-0"
            loading="lazy"
            width={200}
            height={200}
          />
          <div>
            <p className="font-serif text-xl text-[color:var(--wine)]">
              Was im Gespräch passiert
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Wir schauen uns deinen Content und deine Nische ehrlich an.",
                "Wir definieren dein konkretes Angebot und den Preis.",
                "Du bekommst deinen 12-Wochen-Weg, unabhängig davon ob wir zusammenarbeiten.",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Termin auswählen
        </h2>
        <p className="text-sm text-[color:var(--muted-fg)]">
          30 Minuten, kostenlos, per Video. Kein Verkaufsdruck.
        </p>
        <CalendlyEmbed />
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-[color:var(--muted-fg)]">
          Lieber erst schriftlich bewerben?
        </p>
        <Link
          to="/apply"
          className="inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full border border-[color:var(--wine)] text-[color:var(--wine)] text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition"
        >
          Zur Bewerbung
        </Link>
      </div>
    </div>
  );
}
