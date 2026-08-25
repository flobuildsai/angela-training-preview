import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import proofViews15m from "@/assets/proof-views-15m.jpeg.asset.json";
import proofViews7m from "@/assets/proof-views-7m.jpeg.asset.json";
import proofStripe from "@/assets/proof-stripe.png.asset.json";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/lib/track";
import {
  FOLLOWER_BUCKETS,
  HOURS_OPTIONS,
  POSTING_OPTIONS,
  formatEur,
  useFunnel,
} from "../FunnelContext";
import { Card, Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";

/** Step 12 — Lead-Capture */
export function StepLead() {
  const { next, data, update, monthlyViews, score } = useFunnel();
  const pushLead = useServerFn(sendLeadToClose);
  const [firstName, setFirstName] = useState(data.firstName);
  const [email, setEmail] = useState(data.email);
  const [whatsapp, setWhatsapp] = useState(data.whatsapp);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Bitte trag deinen Vornamen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = "Bitte eine gültige E-Mail-Adresse.";
    const phone = whatsapp.replace(/[^\d+]/g, "");
    if (!/^\+?\d{8,15}$/.test(phone))
      e.whatsapp = "Bitte deine Nummer mit Ländervorwahl, z. B. +49 170 1234567.";
    setErrors(e);
    if (Object.keys(e).length) return;

    update({ firstName: firstName.trim(), email: email.trim(), whatsapp: phone });
    void pushLead({
      data: {
        firstName: firstName.trim(),
        email: email.trim(),
        whatsapp: phone,
        niche: data.niche,
        followers: FOLLOWER_BUCKETS[Math.max(data.followers, 0)]?.label ?? "",
        posting: POSTING_OPTIONS[Math.max(data.posting, 0)] ?? "",
        hours: HOURS_OPTIONS[Math.max(data.hours, 0)] ?? "",
        skill: SKILL_OPTIONS[Math.max(data.skill, 0)] ?? "",
        readiness: data.readiness,
        score,
        monthlyViews,
        price: data.price,
        buyers: data.buyers,
      },
    }).catch(() => undefined);
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
    hint?: string,
  ) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-[color:var(--border)] px-0 py-3 text-lg text-[color:var(--ink)] placeholder:text-[color:var(--muted-fg)]/45 focus:outline-none focus:border-[color:var(--rose)] transition"
      />
      {hint && !errors[id] && (
        <p className="text-xs text-[color:var(--muted-fg)]">{hint}</p>
      )}
      {errors[id] && (
        <p className="text-xs text-[color:var(--rose)]">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="space-y-9">
        <div className="space-y-3">
          <StepLabel>Letzter Schritt</StepLabel>
          <Head>Wohin soll ich deinen Plan schicken?</Head>
          <Sub>
            Danach siehst du direkt deine Auswertung und kannst dir einen freien
            Termin sichern.
          </Sub>
        </div>

        <div className="space-y-7">
          {field("firstName", "Vorname", firstName, setFirstName)}
          {field("email", "E-Mail", email, setEmail, "email", "du@beispiel.de")}
          {field(
            "whatsapp",
            "WhatsApp-Nummer",
            whatsapp,
            setWhatsapp,
            "tel",
            "+49 170 1234567",
            "Ich schicke dir deinen Plan per WhatsApp. Kein Newsletter, keine Werbung.",
          )}
        </div>

        <div className="space-y-3">
          <PrimaryCTA onClick={submit}>Ergebnis ansehen</PrimaryCTA>
          <Micro>
            Kein Spam, jederzeit abmeldbar. Deine Daten bleiben bei uns.
          </Micro>
        </div>
      </div>

      <aside className="lg:pt-24">
        <div className="rounded-2xl bg-[color:var(--cream2)] p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
            Das bekommst du gleich
          </p>
          <ul className="mt-5 space-y-4">
            {[
              "Deinen 12-Wochen-Plan für deine Nische",
              "Deine Zahlen: Reichweite, Angebot, Monatspotenzial",
              "Einen freien Termin für dein Strategiegespräch",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-[15px] leading-snug text-[color:var(--ink)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--rose)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

const METHOD = [
  ["01", "Wofür du stehst", "Eine Positionierung, die andere sofort verstehen."],
  ["02", "Content, der aufbaut", "Formate, die Aufmerksamkeit und Vertrauen erzeugen."],
  ["03", "Ein Angebot, das gekauft wird", "Aus deinem Können wird ein Produkt mit Preis."],
];

const PHASES = [
  ["Woche 1 – 4", "Fundament", "Du weißt, was du verkaufst und an wen."],
  ["Woche 5 – 8", "Produkt", "Dein Angebot existiert und ist verkaufbar."],
  ["Woche 9 – 12", "Verkauf", "Deine ersten zahlenden Kundinnen."],
];

const OBJECTIONS = [
  {
    q: "Ich habe kaum Reichweite.",
    a: "Genau dafür ist das Programm gemacht. Positionierung und Angebot kommen zuerst, Reichweite bauen wir gezielt mit auf.",
  },
  {
    q: "Ich weiß nicht, was ich verkaufen soll.",
    a: "Der häufigste Startpunkt. In den ersten Wochen finden wir dein Angebot, bevor du ein weiteres Video produzierst.",
  },
  {
    q: "Ich habe wenig Zeit.",
    a: "Plane 5 bis 10 Stunden pro Woche. Das ist neben Job oder Studium machbar, entscheidend ist die Konsequenz.",
  },
  {
    q: "Ich habe es schon versucht.",
    a: "Meistens fehlt nicht die Disziplin, sondern die Reihenfolge: erst Positionierung, dann Angebot, dann Verkauf.",
  },
];

/** Step 13 — Ergebnis + Call-Buchung */
export function StepResult() {
  const { data, profile, score, monthlyViews } = useFunnel();
  const monthly = data.price * data.buyers;
  const niche = data.niche || profile.label;

  const bottleneck =
    data.followers <= 1
      ? "Dir fehlt aktuell keine Motivation, sondern Sichtbarkeit mit System. Erst ein wiederholbares Format, dann das Angebot."
      : data.skill === 4
        ? "Deine Reichweite ist da, dein Angebot fehlt. Genau da liegt dein Geld auf der Straße."
        : data.posting <= 1
          ? "Du hast das Wissen, aber keinen Rhythmus. Ohne feste Frequenz bleibt die Nachfrage aus."
          : "Du machst schon vieles richtig. Was fehlt, ist der Weg vom Zuschauer zum zahlenden Kunden.";

  useEffect(() => {
    trackEvent("content_funnel_result_view", { niche: data.niche });
  }, [data.niche]);

  const proof = [
    { img: proofViews15m.url, when: "Monat 1", claim: "1,5 Mio. Views", fit: "contain" },
    { img: proofViews7m.url, when: "Monat 2", claim: "6,9 Mio. Views", fit: "contain" },
    { img: proofStripe.url, when: "Danach", claim: "Die ersten Sales", fit: "contain" },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Diagnose */}
      <section className="space-y-4">
        <StepLabel>Deine Auswertung</StepLabel>
        <Head>
          {data.firstName ? `${data.firstName}, ` : ""}das ist dein Startpunkt.
        </Head>
        <Sub>{bottleneck}</Sub>
        <div className="grid gap-x-8 gap-y-4 border-y border-[color:var(--border)] py-6 sm:grid-cols-2">
          {[
            ["Nische", niche],
            ["Reichweite", FOLLOWER_BUCKETS[Math.max(data.followers, 0)]?.label ?? "—"],
            ["Frequenz", POSTING_OPTIONS[Math.max(data.posting, 0)] ?? "—"],
            ["Zeit pro Woche", HOURS_OPTIONS[Math.max(data.hours, 0)] ?? "—"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                {k}
              </span>
              <span className="text-right text-[15px] text-[color:var(--ink)]">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Zahlen */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Deine Zahlen
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Startpotenzial", `${score}/100`],
            ["Views pro Monat", monthlyViews.toLocaleString("de-DE")],
            ["Potenzial pro Monat", formatEur(monthly)],
          ].map(([k, v]) => (
            <Card key={k} className="bg-[color:var(--cream2)] border-transparent">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                {k}
              </p>
              <p className="mt-2 font-serif text-3xl text-[color:var(--wine)]">{v}</p>
            </Card>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[color:var(--muted-fg)]">
          So gerechnet: {formatEur(data.price)} pro Kunde × {data.buyers} Kunden
          pro Monat = {formatEur(monthly)}. Bei{" "}
          {monthlyViews.toLocaleString("de-DE")} Views im Monat brauchst du dafür
          weniger als ein Prozent Conversion.
        </p>
      </section>

      {/* Beweis */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Dass es funktioniert, siehst du hier.
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {proof.map((p) => (
            <figure key={p.claim} className="min-w-0">
              <div className="overflow-hidden rounded-xl bg-[color:var(--cream2)] ring-1 ring-[color:var(--border)] aspect-[4/5]">
                <img
                  src={p.img}
                  alt={p.claim}
                  loading="lazy"
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <figcaption className="mt-2 space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
                  {p.when}
                </p>
                <p className="font-serif text-base text-[color:var(--wine)] sm:text-lg">
                  {p.claim}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[color:var(--muted-fg)]">
          Ein Account, bei null gestartet. Reichweite allein zahlt nichts aus,
          erst ein eigenes Angebot macht daraus Umsatz.
        </p>
      </section>

      {/* Methode */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Die TCS-Methode
        </h2>
        <div className="border-t border-[color:var(--border)]">
          {METHOD.map(([no, title, body]) => (
            <div
              key={no}
              className="grid gap-2 border-b border-[color:var(--border)] py-5 sm:grid-cols-[3rem_1fr]"
            >
              <span className="font-serif text-2xl text-[color:var(--rose)]">{no}</span>
              <div>
                <p className="font-serif text-xl text-[color:var(--ink)]">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programm */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Das Programm in 12 Wochen
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PHASES.map(([weeks, title, result]) => (
            <div key={title} className="border-t border-[color:var(--wine)] pt-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
                {weeks}
              </p>
              <p className="mt-2 font-serif text-xl text-[color:var(--wine)]">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                {result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gespräch */}
      <section>
        <Card>
          <div className="flex items-start gap-4">
            <img
              src={lauraPortrait.url}
              alt="Laura"
              className="h-14 w-14 shrink-0 rounded-full object-cover"
              loading="lazy"
              width={200}
              height={200}
            />
            <div>
              <p className="font-serif text-xl text-[color:var(--wine)]">
                Was du aus dem Gespräch mitnimmst
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  `Dein konkretes Angebot für ${niche} inklusive Preis.`,
                  "Das Content-Format, mit dem du in den nächsten 30 Tagen startest.",
                  "Deinen 12-Wochen-Weg, auch wenn wir nicht zusammenarbeiten.",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--rose)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Termin */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Termin auswählen
        </h2>
        <p className="text-sm text-[color:var(--muted-fg)]">
          30 Minuten, kostenlos, per Video. Kein Verkaufsdruck.
        </p>
        <CalendlyEmbed />
      </section>

      {/* Einwände */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
          Bevor du buchst
        </h2>
        <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {OBJECTIONS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[color:var(--ink)]">
                <span className="font-medium">{f.q}</span>
                <span className="text-[color:var(--muted-fg)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-fg)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="space-y-3 text-center">
        <p className="text-sm text-[color:var(--muted-fg)]">
          Lieber erst schriftlich bewerben?
        </p>
        <Link
          to="/apply"
          className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-[color:var(--wine)] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-[color:var(--wine)] transition hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)]"
        >
          Zur Bewerbung
        </Link>
      </div>
    </div>
  );
}
