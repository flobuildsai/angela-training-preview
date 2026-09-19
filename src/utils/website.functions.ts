import { createServerFn } from "@tanstack/react-start";

export interface WebsiteClaimInput {
  firstName: string;
  email: string;
  phone: string;
  consent: boolean;
  utm?: { source?: string; medium?: string; campaign?: string; content?: string };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+(?:49|43|41)\d{7,13}$/;

function validate(input: unknown): WebsiteClaimInput {
  const d = input as Partial<WebsiteClaimInput>;
  const email = String(d?.email ?? "").trim().toLowerCase();
  const phone = String(d?.phone ?? "").replace(/[\s()/-]/g, "");
  if (!String(d?.firstName ?? "").trim()) throw new Error("Bitte gib deinen Vornamen ein.");
  if (!EMAIL.test(email)) throw new Error("Bitte gib eine gültige E-Mail-Adresse ein.");
  if (!PHONE.test(phone)) throw new Error("Bitte nutze eine gültige Nummer aus DE, AT oder CH.");
  if (d?.consent !== true) throw new Error("Bitte bestätige, dass wir dich kontaktieren dürfen.");
  const clean = (value: unknown) => typeof value === "string" ? value.slice(0, 80) : undefined;
  const utm = d?.utm && typeof d.utm === "object" ? d.utm : {};
  return {
    firstName: String(d.firstName).trim().slice(0, 80),
    email: email.slice(0, 160),
    phone: phone.slice(0, 20),
    consent: true,
    utm: { source: clean(utm.source), medium: clean(utm.medium), campaign: clean(utm.campaign), content: clean(utm.content) },
  };
}

function sourceLabel(utm: WebsiteClaimInput["utm"]) {
  const parts = ["Website-Claim (creatingsociety.de/website)"];
  if (utm?.source) parts.push(`${utm.source}${utm.medium ? `/${utm.medium}` : ""}`);
  if (utm?.campaign) parts.push(utm.campaign);
  if (utm?.content) parts.push(utm.content);
  return parts.join(" · ");
}

async function createCloseTask(apiKey: string, leadId: string) {
  const due = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const response = await fetch("https://api.close.com/api/v1/task/", {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${apiKey}:`)}`, "Content-Type": "application/json" },
    body: JSON.stringify({ lead_id: leadId, text: "Website-Claim: anrufen", date: due }),
  });
  if (!response.ok) throw new Error(`Close task [${response.status}]: ${(await response.text()).slice(0, 500)}`);
}

async function syncClose(leadId: string, data: WebsiteClaimInput, label: string) {
  const apiKey = process.env["CLOSE_API_KEY"];
  if (!apiKey) throw new Error("CLOSE_API_KEY fehlt.");
  const { createCloseLead, ensureCustomFields } = await import("@/lib/close.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const fields = await ensureCustomFields(apiKey);
  const closeId = await createCloseLead(apiKey, {
    firstName: data.firstName, email: data.email, whatsapp: data.phone,
    niche: "Social Media Management", followers: "", posting: "", hours: "", skill: "Website-Claim",
    readiness: 0, score: 0, monthlyViews: 0, price: 0, buyers: 0, source: label,
  }, fields);
  await supabaseAdmin.from("leads").update({ close_lead_id: closeId, close_synced_at: new Date().toISOString() }).eq("id", leadId);
  await createCloseTask(apiKey, closeId);
}

async function syncBrevo(data: WebsiteClaimInput, label: string) {
  const apiKey = process.env["BREVO_API_KEY"];
  const listId = Number(process.env["BREVO_WEBSITE_LIST_ID"] ?? 0);
  if (!apiKey) throw new Error("BREVO_API_KEY fehlt.");
  if (!listId) throw new Error("BREVO_WEBSITE_LIST_ID fehlt.");
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email: data.email,
      attributes: { VORNAME: data.firstName, WHATSAPP: data.phone, QUELLE: label },
      listIds: [listId],
      updateEnabled: true,
    }),
  });
  if (!response.ok && response.status !== 204) throw new Error(`Brevo [${response.status}]: ${(await response.text()).slice(0, 500)}`);
}

export const claimWebsite = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin.from("leads").insert({
      first_name: data.firstName, email: data.email, whatsapp: data.phone,
      niche: "Social Media Management", followers: "", posting: "", hours: "", skill: "Website-Claim",
      readiness: 0, score: 0, monthly_views: 0, price: 0, buyers: 0, source: "website_claim",
    }).select("id").single();
    if (error || !inserted) throw new Error("Deine Anfrage konnte gerade nicht gespeichert werden. Versuch es bitte noch einmal.");

    const label = sourceLabel(data.utm);
    const results = await Promise.allSettled([syncClose(inserted.id, data, label), syncBrevo(data, label)]);
    const closeResult = results[0];
    if (closeResult?.status === "rejected") {
      const message = closeResult.reason instanceof Error ? closeResult.reason.message : String(closeResult.reason);
      console.error("[website] Close sync failed", message);
      await supabaseAdmin.from("leads").update({ close_error: message.slice(0, 500) }).eq("id", inserted.id);
    }
    const brevoResult = results[1];
    if (brevoResult?.status === "rejected") console.error("[website] Brevo sync failed", brevoResult.reason);
    return { ok: true as const };
  });
