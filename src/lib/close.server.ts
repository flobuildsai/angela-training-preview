/** Close.com API helpers (server-only). */

export interface CloseLeadPayload {
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
  source: string;
  createdAt?: string;
}

/** Custom Fields, die in Close automatisch angelegt werden. */
export const CLOSE_CUSTOM_FIELDS: { name: string; type: "text" | "number" }[] = [
  { name: "Nische", type: "text" },
  { name: "Reichweite", type: "text" },
  { name: "Posting-Frequenz", type: "text" },
  { name: "Zeit pro Woche", type: "text" },
  { name: "Startpunkt", type: "text" },
  { name: "Bereitschaft (1-10)", type: "number" },
  { name: "Funnel-Score", type: "number" },
  { name: "Views pro Monat", type: "number" },
  { name: "Angebotspreis (EUR)", type: "number" },
  { name: "Kunden pro Monat", type: "number" },
  { name: "Umsatzpotenzial (EUR)", type: "number" },
  { name: "WhatsApp", type: "text" },
  { name: "Quelle", type: "text" },
];

const BASE = "https://api.close.com/api/v1";

function authHeader(apiKey: string) {
  return `Basic ${btoa(`${apiKey}:`)}`;
}

async function closeFetch<T>(
  apiKey: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(apiKey),
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Close API [${res.status}] ${path}: ${body}`);
  }
  return (await res.json()) as T;
}

interface CloseField {
  id: string;
  name: string;
  type: string;
}

/** Legt fehlende Custom Fields an und liefert die Zuordnung Name -> Feld-ID. */
export async function ensureCustomFields(
  apiKey: string,
): Promise<Record<string, string>> {
  const existing = await closeFetch<{ data: CloseField[] }>(
    apiKey,
    "/custom_field/lead/?_limit=200",
  );
  const map: Record<string, string> = {};
  for (const f of existing.data) map[f.name] = f.id;

  for (const field of CLOSE_CUSTOM_FIELDS) {
    if (map[field.name]) continue;
    const created = await closeFetch<CloseField>(apiKey, "/custom_field/lead/", {
      method: "POST",
      body: JSON.stringify({ name: field.name, type: field.type }),
    });
    map[field.name] = created.id;
  }
  return map;
}

function customValues(
  fields: Record<string, string>,
  d: CloseLeadPayload,
): Record<string, unknown> {
  const values: Record<string, unknown> = {
    Nische: d.niche,
    Reichweite: d.followers,
    "Posting-Frequenz": d.posting,
    "Zeit pro Woche": d.hours,
    Startpunkt: d.skill,
    "Bereitschaft (1-10)": d.readiness,
    "Funnel-Score": d.score,
    "Views pro Monat": d.monthlyViews,
    "Angebotspreis (EUR)": d.price,
    "Kunden pro Monat": d.buyers,
    "Umsatzpotenzial (EUR)": d.price * d.buyers,
    WhatsApp: d.whatsapp,
    Quelle: d.source,
  };
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(values)) {
    const id = fields[name];
    if (!id) continue;
    if (value === "" || value === null || value === undefined) continue;
    out[`custom.${id}`] = value;
  }
  return out;
}

/** Erstellt einen Lead in Close und gibt die Close-Lead-ID zurück. */
export async function createCloseLead(
  apiKey: string,
  d: CloseLeadPayload,
  fields: Record<string, string>,
): Promise<string> {
  const displayName = d.firstName || d.email;
  const note = [
    `Quelle: ${d.source}`,
    `Nische: ${d.niche}`,
    `Reichweite: ${d.followers}`,
    `Postet: ${d.posting}`,
    `Zeit pro Woche: ${d.hours}`,
    `Startpunkt: ${d.skill}`,
    `Bereitschaft: ${d.readiness}/10`,
    `Score: ${d.score}/100`,
    `Views pro Monat: ${d.monthlyViews}`,
    `Angebot: ${d.price} EUR x ${d.buyers} Kunden = ${d.price * d.buyers} EUR/Monat`,
    `WhatsApp: ${d.whatsapp}`,
    d.createdAt ? `Eingetragen: ${d.createdAt}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const created = await closeFetch<{ id: string }>(apiKey, "/lead/", {
    method: "POST",
    body: JSON.stringify({
      name: displayName,
      description: note,
      contacts: [
        {
          name: displayName,
          emails: [{ email: d.email, type: "office" }],
          phones: d.whatsapp ? [{ phone: d.whatsapp, type: "mobile" }] : [],
        },
      ],
      ...customValues(fields, d),
    }),
  });
  return created.id;
}

/** Trägt eine Telefonnummer am ersten Kontakt eines Close-Leads nach. */
export async function addCloseContactPhone(
  apiKey: string,
  leadId: string,
  phone: string,
): Promise<void> {
  const lead = await closeFetch<{ contacts: { id: string; phones?: { phone: string }[] }[] }>(
    apiKey,
    `/lead/${leadId}/`,
  );
  const contact = lead.contacts?.[0];
  if (!contact) return;
  if (contact.phones?.some((p) => p.phone.replace(/\D/g, "") === phone.replace(/\D/g, ""))) return;
  await closeFetch(apiKey, `/contact/${contact.id}/`, {
    method: "PUT",
    body: JSON.stringify({ phones: [...(contact.phones ?? []), { phone, type: "mobile" }] }),
  });
}
