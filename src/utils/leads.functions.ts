import { createServerFn } from "@tanstack/react-start";

export interface FunnelLeadInput {
  firstName: string;
  email: string;
  whatsapp: string;
  niche: string;
  followers: string;
  posting: string;
  hours: string;
  skill: string;
  readiness: number;
  score: number;
  monthlyViews: number;
  price: number;
  buyers: number;
}

function validate(input: unknown): FunnelLeadInput {
  const d = input as Partial<FunnelLeadInput>;
  if (!d || typeof d.email !== "string" || !d.email.includes("@")) {
    throw new Error("Ungültige Lead-Daten.");
  }
  return {
    firstName: String(d.firstName ?? "").slice(0, 80),
    email: d.email.slice(0, 160),
    whatsapp: String(d.whatsapp ?? "").slice(0, 32),
    niche: String(d.niche ?? "").slice(0, 120),
    followers: String(d.followers ?? "").slice(0, 80),
    posting: String(d.posting ?? "").slice(0, 80),
    hours: String(d.hours ?? "").slice(0, 80),
    skill: String(d.skill ?? "").slice(0, 160),
    readiness: Number(d.readiness ?? 0),
    score: Number(d.score ?? 0),
    monthlyViews: Number(d.monthlyViews ?? 0),
    price: Number(d.price ?? 0),
    buyers: Number(d.buyers ?? 0),
  };
}

/** Legt den Funnel-Lead als Lead + Kontakt in Close an. */
export const sendLeadToClose = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const apiKey = process.env["CLOSE_API_KEY"];
    if (!apiKey) {
      console.error("CLOSE_API_KEY fehlt — Lead wurde nicht übertragen.");
      return { ok: false as const, reason: "missing_key" };
    }

    const displayName = data.firstName || data.email;
    const note = [
      `Quelle: Creator-Funnel (creatingsociety.de)`,
      `Nische: ${data.niche}`,
      `Reichweite: ${data.followers}`,
      `Postet: ${data.posting}`,
      `Zeit pro Woche: ${data.hours}`,
      `Startpunkt: ${data.skill}`,
      `Bereitschaft: ${data.readiness}/10`,
      `Score: ${data.score}/100`,
      `Views pro Monat: ${data.monthlyViews}`,
      `Angebot: ${data.price} EUR x ${data.buyers} Kunden = ${data.price * data.buyers} EUR/Monat`,
      `WhatsApp: ${data.whatsapp}`,
    ].join("\n");

    const res = await fetch("https://api.close.com/api/v1/lead/", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${apiKey}:`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: displayName,
        description: note,
        contacts: [
          {
            name: displayName,
            emails: [{ email: data.email, type: "office" }],
            phones: data.whatsapp
              ? [{ phone: data.whatsapp, type: "mobile" }]
              : [],
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Close API failed [${res.status}]: ${body}`);
      return { ok: false as const, reason: `close_${res.status}` };
    }

    return { ok: true as const };
  });
