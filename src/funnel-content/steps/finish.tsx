import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";
import { formatEur, useFunnel } from "../FunnelContext";
import { Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";

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

    update({
      firstName: firstName.trim(),
      email: email.trim(),
      instagram: instagram.trim().replace(/^@/, ""),
    });
    // TODO: Lead an CRM / E-Mail-Tool übergeben, sobald das Backend steht.
    trackEvent("content_funnel_lead", { niche: data.niche, price: data.price });
    next();
  };

  const field = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    type = "text",
    placeholder = "",
  ) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 border-b border-[color:var(--ink)]/15 bg-transparent px-1 py-3 text-lg text-[color:var(--ink)] transition placeholder:text-[color:var(--muted-fg)]/40 focus:border-[color:var(--ink)] focus:outline-none"
      />
      {errors[id] && (
        <p className="text-xs text-[color:var(--ink)]/70">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <StepLabel>Letzter Schritt</StepLabel>
        <Head>Wohin soll ich deinen Plan schicken?</Head>
        <Sub>
          Danach siehst du dein Ergebnis und kannst direkt ein kostenloses
          Strategiegespräch buchen.
        </Sub>
      </div>

      <div className="space-y-7 border-y border-[color:var(--ink)]/12 py-8">
        {field("firstName", "Vorname", firstName, setFirstName)}
        {field("email", "E-Mail", email, setEmail, "email", "du@beispiel.de")}
        {field(
          "instagram",
          "Instagram",
          instagram,
          setInstagram,
          "text",
          "@deinhandle",
        )}
      </div>

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

  const stats: [string, string][] = [
    ["Nische", data.niche || profile.label],
    ["Startpotenzial", `${score}/100`],
    ["Reichweite / Monat", `${monthlyViews.toLocaleString("de-DE")} Views`],
    ["Potenzial / Monat", formatEur(monthly)],
  ];

  return (
    <div className="space-y-14 pb-10">
      <div className="space-y-4">
        <StepLabel>Dein Ergebnis</StepLabel>
        <Head>
          {data.firstName ? `${data.firstName}, ` : ""}das ist dein Startpunkt.
        </Head>
        <Sub>
          Deine Zahlen im Überblick. Im Gespräch gehen wir sie gemeinsam durch
          und schauen, ob wir zusammenpassen.
        </Sub>
      </div>

      <section className="grid gap-x-10 gap-y-8 border-y border-[color:var(--ink)]/12 py-8 sm:grid-cols-2">
        {stats.map(([k, v]) => (
          <div key={k}>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
              {k}
            </p>
            <p className="mt-2 font-serif text-[2rem] leading-none tabular-nums text-[color:var(--ink)] sm:text-[2.4rem]">
              {v}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
        <img
          src={lauraPortrait.url}
          alt="Laura"
          className="h-16 w-16 shrink-0 rounded-full object-cover"
          loading="lazy"
          width={200}
          height={200}
        />
        <div>
          <h2 className="font-serif text-[1.6rem] leading-tight text-[color:var(--ink)] sm:text-[2rem]">
            Was im Gespräch passiert
          </h2>
          <ul className="mt-5 divide-y divide-[color:var(--ink)]/8 border-y border-[color:var(--ink)]/8">
            {[
              "Wir schauen uns deinen Content und deine Nische ehrlich an.",
              "Wir definieren dein konkretes Angebot und den Preis.",
              "Du bekommst deinen 12-Wochen-Weg, unabhängig davon ob wir zusammenarbeiten.",
            ].map((t) => (
              <li
                key={t}
                className="py-4 text-[15px] leading-relaxed text-[color:var(--ink)]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-[1.75rem] leading-tight text-[color:var(--ink)] sm:text-[2.2rem]">
          Termin auswählen
        </h2>
        <p className="text-sm text-[color:var(--muted-fg)]">
          30 Minuten, kostenlos, per Video. Kein Verkaufsdruck.
        </p>
        <CalendlyEmbed />
      </section>

      <div className="space-y-4 border-t border-[color:var(--ink)]/12 pt-8 text-center">
        <p className="text-sm text-[color:var(--muted-fg)]">
          Lieber erst schriftlich bewerben?
        </p>
        <Link
          to="/apply"
          className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[color:var(--ink)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition hover:bg-[color:var(--ink)] hover:text-white"
        >
          Zur Bewerbung
        </Link>
      </div>
    </div>
  );
}
