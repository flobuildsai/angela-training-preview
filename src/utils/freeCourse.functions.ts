import { createServerFn } from "@tanstack/react-start";

/**
 * Server-Funktionen des Free-Funnels.
 *
 * Zugang zum Kurs ist bewusst leichtgewichtig: Die Anmeldung erzeugt einen
 * Lead; dessen ID ist der Zugangs-Token (in localStorage und im E-Mail-Link).
 * Der Kurs ist kostenlos — das Gate ist UX (Fortschritt, Drip, Ansprache),
 * keine Sicherheitsgrenze.
 */

export interface FreeOptinInput {
  firstName: string;
  email: string;
  /** UTM-Werte aus der URL, für die Quelle in Close. */
  utm?: { source?: string; medium?: string; campaign?: string; content?: string };
}

export interface FreeAccess {
  token: string;
  firstName: string;
  email: string;
  signedUpAt: string;
  whatsapp: string | null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateOptin(input: unknown): FreeOptinInput {
  const d = input as Partial<FreeOptinInput>;
  const email = String(d?.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) throw new Error("Bitte eine gültige E-Mail-Adresse.");
  const utm = d?.utm && typeof d.utm === "object" ? d.utm : {};
  const clean = (v: unknown) => (typeof v === "string" ? v.slice(0, 80) : undefined);
  return {
    firstName: String(d?.firstName ?? "").trim().slice(0, 80),
    email: email.slice(0, 160),
    utm: {
      source: clean(utm.source),
      medium: clean(utm.medium),
      campaign: clean(utm.campaign),
      content: clean(utm.content),
    },
  };
}

function sourceLabel(utm: FreeOptinInput["utm"]): string {
  const parts = ["Free-Kurs (creatingsociety.de/free)"];
  if (utm?.source) parts.push(`${utm.source}${utm.medium ? `/${utm.medium}` : ""}`);
  if (utm?.campaign) parts.push(utm.campaign);
  if (utm?.content) parts.push(utm.content);
  return parts.join(" · ");
}

/** Anmeldung zum kostenlosen System. Idempotent pro E-Mail. */
export const freeOptin = createServerFn({ method: "POST" })
  .inputValidator(validateOptin)
  .handler(async ({ data }): Promise<FreeAccess> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Wer sich zweimal einträgt, bekommt denselben Zugang — Drip-Uhr läuft weiter.
    const { data: existing } = await supabaseAdmin
      .from("leads")
      .select("id, first_name, email, whatsapp, created_at")
      .eq("email", data.email)
      .eq("source", "free_course")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return {
        token: existing.id,
        firstName: existing.first_name ?? data.firstName,
        email: existing.email,
        signedUpAt: existing.created_at,
        whatsapp: existing.whatsapp || null,
      };
    }

    const source = "free_course";
    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert({
        first_name: data.firstName,
        email: data.email,
        whatsapp: "",
        niche: "",
        followers: "",
        posting: "",
        hours: "",
        skill: "",
        readiness: 0,
        score: 0,
        monthly_views: 0,
        price: 0,
        buyers: 0,
        source,
      })
      .select("id, created_at")
      .single();
    if (error || !inserted) {
      console.error("[free] lead insert failed", error?.message);
      throw new Error("Anmeldung gerade nicht möglich. Versuch es gleich noch einmal.");
    }

    // Close + Brevo laufen im Hintergrund; ein Fehler dort darf den Zugang nicht blockieren.
    void syncOptin(inserted.id, data).catch((e) => console.error("[free] sync failed", e));

    return {
      token: inserted.id,
      firstName: data.firstName,
      email: data.email,
      signedUpAt: inserted.created_at,
      whatsapp: null,
    };
  });

async function syncOptin(leadId: string, data: FreeOptinInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const label = sourceLabel(data.utm);

  const closeKey = process.env["CLOSE_API_KEY"];
  if (closeKey) {
    try {
      const { createCloseLead, ensureCustomFields } = await import("@/lib/close.server");
      const fields = await ensureCustomFields(closeKey);
      const closeId = await createCloseLead(
        closeKey,
        {
          firstName: data.firstName,
          email: data.email,
          whatsapp: "",
          niche: "",
          followers: "",
          posting: "",
          hours: "",
          skill: "",
          readiness: 0,
          score: 0,
          monthlyViews: 0,
          price: 0,
          buyers: 0,
          source: label,
        },
        fields,
      );
      await supabaseAdmin
        .from("leads")
        .update({ close_lead_id: closeId, close_synced_at: new Date().toISOString() })
        .eq("id", leadId);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await supabaseAdmin.from("leads").update({ close_error: message.slice(0, 500) }).eq("id", leadId);
    }
  }

  const { upsertBrevoContact } = await import("@/lib/brevo.server");
  await upsertBrevoContact({
    email: data.email,
    firstName: data.firstName,
    attributes: { FREE_TOKEN: leadId, QUELLE: label },
  });
}

/** Zugang über den Token aus E-Mail-Link oder localStorage wiederherstellen. */
export const freeAccess = createServerFn({ method: "GET" })
  .inputValidator((input: { token: string }) => ({ token: String(input?.token ?? "").slice(0, 64) }))
  .handler(async ({ data }): Promise<FreeAccess | null> => {
    if (!/^[0-9a-f-]{36}$/.test(data.token)) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("id, first_name, email, whatsapp, created_at")
      .eq("id", data.token)
      .eq("source", "free_course")
      .maybeSingle();
    if (!lead) return null;
    return {
      token: lead.id,
      firstName: lead.first_name ?? "",
      email: lead.email,
      signedUpAt: lead.created_at,
      whatsapp: lead.whatsapp || null,
    };
  });

/** WhatsApp-Nummer nachtragen (Willkommensseite, Schritt 2). */
export const freeWhatsapp = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string; whatsapp: string }) => ({
    token: String(input?.token ?? "").slice(0, 64),
    whatsapp: String(input?.whatsapp ?? "").replace(/[^\d+]/g, "").slice(0, 20),
  }))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    if (!/^[0-9a-f-]{36}$/.test(data.token) || !/^\+?\d{8,15}$/.test(data.whatsapp)) return { ok: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .update({ whatsapp: data.whatsapp })
      .eq("id", data.token)
      .eq("source", "free_course")
      .select("close_lead_id, email, first_name")
      .maybeSingle();
    if (error || !lead) return { ok: false };

    const closeKey = process.env["CLOSE_API_KEY"];
    if (closeKey && lead.close_lead_id) {
      try {
        const { addCloseContactPhone } = await import("@/lib/close.server");
        await addCloseContactPhone(closeKey, lead.close_lead_id, data.whatsapp);
      } catch (e) {
        console.error("[free] close phone update failed", e);
      }
    }
    const { upsertBrevoContact } = await import("@/lib/brevo.server");
    await upsertBrevoContact({ email: lead.email, firstName: lead.first_name ?? "", attributes: { WHATSAPP: data.whatsapp } });
    return { ok: true };
  });

/** Fortschritt melden — für Sequenz-Trigger (Brevo) und Close-Notiz. */
export const freeProgress = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string; lesson: string; event: "started" | "completed" }) => ({
    token: String(input?.token ?? "").slice(0, 64),
    lesson: String(input?.lesson ?? "").slice(0, 60),
    event: input?.event === "completed" ? ("completed" as const) : ("started" as const),
  }))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    if (!/^[0-9a-f-]{36}$/.test(data.token)) return { ok: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("email, first_name")
      .eq("id", data.token)
      .eq("source", "free_course")
      .maybeSingle();
    if (!lead) return { ok: false };
    const { upsertBrevoContact } = await import("@/lib/brevo.server");
    await upsertBrevoContact({
      email: lead.email,
      firstName: lead.first_name ?? "",
      attributes: data.event === "completed" ? { LETZTE_LEKTION: data.lesson } : {},
    });
    return { ok: true };
  });
