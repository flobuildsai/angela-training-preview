/**
 * Brevo (ehem. Sendinblue) — Kontakte für den Free-Funnel.
 * Ohne BREVO_API_KEY ist alles ein No-op; der Funnel läuft trotzdem.
 *
 * Erwartete Attribute in Brevo (Kontakte → Einstellungen → Attribute):
 *   VORNAME (Text), FREE_TOKEN (Text), QUELLE (Text), WHATSAPP (Text), LETZTE_LEKTION (Text)
 * Liste: BREVO_FREE_LIST_ID (Zahl) — die Automation „Free-Kurs" hängt an dieser Liste.
 */

export interface BrevoContactInput {
  email: string;
  firstName: string;
  attributes?: Record<string, string | number | boolean | undefined>;
}

export async function upsertBrevoContact(input: BrevoContactInput): Promise<void> {
  const apiKey = process.env["BREVO_API_KEY"];
  if (!apiKey) return;
  const listId = Number(process.env["BREVO_FREE_LIST_ID"] ?? 0);

  const attributes: Record<string, string | number | boolean> = {};
  if (input.firstName) attributes["VORNAME"] = input.firstName;
  for (const [k, v] of Object.entries(input.attributes ?? {})) {
    if (v !== undefined && v !== "") attributes[k] = v;
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email: input.email,
      attributes,
      listIds: listId ? [listId] : undefined,
      updateEnabled: true,
    }),
  });
  if (!res.ok && res.status !== 204) {
    console.error("[brevo] upsert failed", res.status, (await res.text()).slice(0, 300));
  }
}
