import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

/** Speichert den Funnel-Lead und legt ihn als Lead in Close an. */
export const sendLeadToClose = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      first_name: data.firstName,
      email: data.email,
      whatsapp: data.whatsapp,
      niche: data.niche,
      followers: data.followers,
      posting: data.posting,
      hours: data.hours,
      skill: data.skill,
      readiness: data.readiness,
      score: data.score,
      monthly_views: data.monthlyViews,
      price: data.price,
      buyers: data.buyers,
      source: "creator_funnel",
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert(row)
      .select("id")
      .single();
    if (error) console.error("Lead konnte nicht gespeichert werden:", error.message);

    const apiKey = process.env["CLOSE_API_KEY"];
    if (!apiKey) {
      console.error("CLOSE_API_KEY fehlt — Lead wurde nicht übertragen.");
      return { ok: false as const, reason: "missing_key" };
    }

    const { createCloseLead, ensureCustomFields } = await import("@/lib/close.server");
    try {
      const fields = await ensureCustomFields(apiKey);
      const closeId = await createCloseLead(
        apiKey,
        { ...data, source: "Creator-Funnel (creatingsociety.de)" },
        fields,
      );
      if (inserted?.id) {
        await supabaseAdmin
          .from("leads")
          .update({ close_lead_id: closeId, close_synced_at: new Date().toISOString() })
          .eq("id", inserted.id);
      }
      return { ok: true as const };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(message);
      if (inserted?.id) {
        await supabaseAdmin
          .from("leads")
          .update({ close_error: message.slice(0, 500) })
          .eq("id", inserted.id);
      }
      return { ok: false as const, reason: "close_error" };
    }
  });

/**
 * Überträgt alle noch nicht synchronisierten Leads nach Close.
 * Nur für Admins.
 */
export const backfillLeadsToClose = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertAdmin } = await import("@/lib/admin.server");
    await assertAdmin(context);

    const apiKey = process.env["CLOSE_API_KEY"];
    if (!apiKey) throw new Error("CLOSE_API_KEY fehlt.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createCloseLead, ensureCustomFields } = await import("@/lib/close.server");
    const fields = await ensureCustomFields(apiKey);

    const { data: rows, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .is("close_synced_at", null)
      .order("created_at", { ascending: true })
      .limit(200);
    if (error) throw new Error(error.message);

    let synced = 0;
    let failed = 0;
    for (const r of rows ?? []) {
      try {
        const closeId = await createCloseLead(
          apiKey,
          {
            firstName: r.first_name ?? "",
            email: r.email,
            whatsapp: r.whatsapp ?? "",
            niche: r.niche ?? "",
            followers: r.followers ?? "",
            posting: r.posting ?? "",
            hours: r.hours ?? "",
            skill: r.skill ?? "",
            readiness: r.readiness ?? 0,
            score: r.score ?? 0,
            monthlyViews: r.monthly_views ?? 0,
            price: r.price ?? 0,
            buyers: r.buyers ?? 0,
            source: r.source ?? "creator_funnel",
            createdAt: r.created_at,
          },
          fields,
        );
        await supabaseAdmin
          .from("leads")
          .update({
            close_lead_id: closeId,
            close_synced_at: new Date().toISOString(),
            close_error: null,
          })
          .eq("id", r.id);
        synced++;
      } catch (e) {
        failed++;
        const message = e instanceof Error ? e.message : String(e);
        await supabaseAdmin
          .from("leads")
          .update({ close_error: message.slice(0, 500) })
          .eq("id", r.id);
      }
    }

    return { synced, failed, remaining: (rows?.length ?? 0) - synced - failed };
  });

/** Legt die Custom Fields in Close an (idempotent). Nur für Admins. */
export const setupCloseCustomFields = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertAdmin } = await import("@/lib/admin.server");
    await assertAdmin(context);
    const apiKey = process.env["CLOSE_API_KEY"];
    if (!apiKey) throw new Error("CLOSE_API_KEY fehlt.");
    const { ensureCustomFields } = await import("@/lib/close.server");
    const fields = await ensureCustomFields(apiKey);
    return { fields: Object.keys(fields).length };
  });
