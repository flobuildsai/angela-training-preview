import { createFileRoute } from "@tanstack/react-router";
import type Stripe from "stripe";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type Tier = "template_club" | "community";

const INSTALLMENT_COUNT = 3;

function tierForPrice(priceId: string | undefined | null): Tier {
  if (priceId?.startsWith("programm")) return "community";
  return "template_club";
}

async function grantAccess(params: {
  email: string;
  tier: Tier;
  priceId: string;
  sessionId?: string | null;
  customerId?: string | null;
  subscriptionId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
}) {
  const email = params.email.toLowerCase();

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  await supabaseAdmin.from("orders").upsert(
    {
      user_id: profile?.id ?? null,
      email,
      stripe_session_id: params.sessionId ?? null,
      stripe_customer_id: params.customerId ?? null,
      stripe_subscription_id: params.subscriptionId ?? null,
      price_id: params.priceId,
      product_id: params.priceId.startsWith("programm") ? "programm" : "templates",
      tier: params.tier,
      amount_total: params.amountTotal ?? null,
      currency: params.currency ?? "eur",
      status: "paid",
    },
    { onConflict: "stripe_session_id" },
  );

  // Zugang sofort freischalten, wenn bereits ein Konto existiert.
  // Sonst wird der Zugang beim Registrieren automatisch nachgetragen.
  if (profile?.id) {
    await supabaseAdmin.rpc("claim_orders_for_user", {
      _user_id: profile.id,
      _email: email,
    });
  }
}

async function handleCheckoutCompleted(stripe: Stripe, session: Stripe.Checkout.Session) {
  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });
  const email =
    full.customer_details?.email ?? full.customer_email ?? undefined;
  if (!email) return;

  const priceId =
    (full.metadata?.["priceId"] as string | undefined) ??
    full.line_items?.data[0]?.price?.lookup_key ??
    "templates_onetime";

  await grantAccess({
    email,
    tier: tierForPrice(priceId),
    priceId,
    sessionId: full.id,
    customerId: typeof full.customer === "string" ? full.customer : full.customer?.id,
    subscriptionId:
      typeof full.subscription === "string" ? full.subscription : full.subscription?.id,
    amountTotal: full.amount_total,
    currency: full.currency,
  });
}

async function handleInvoicePaid(stripe: Stripe, invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription?: string | null })
    .subscription;
  if (!subscriptionId || typeof subscriptionId !== "string") return;

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("id, installments_paid")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();

  const paid = (order?.installments_paid ?? 0) + 1;
  if (order) {
    await supabaseAdmin
      .from("orders")
      .update({ installments_paid: paid })
      .eq("id", order.id);
  }

  // Ratenzahlung: nach der letzten Rate endet das Abo automatisch,
  // der Zugang bleibt dauerhaft bestehen.
  if (paid >= INSTALLMENT_COUNT) {
    await stripe.subscriptions.cancel(subscriptionId).catch(() => undefined);
  }
}

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const envParam = url.searchParams.get("env");
        const env: StripeEnv = envParam === "live" ? "live" : "sandbox";

        const secret =
          env === "live"
            ? process.env["PAYMENTS_LIVE_WEBHOOK_SECRET"]
            : process.env["PAYMENTS_SANDBOX_WEBHOOK_SECRET"];
        const signature = request.headers.get("stripe-signature");
        if (!secret || !signature) {
          return new Response("Missing signature", { status: 401 });
        }

        const body = await request.text();
        const stripe = createStripeClient(env);

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, secret);
        } catch {
          return new Response("Invalid signature", { status: 401 });
        }

        try {
          switch (event.type) {
            case "checkout.session.completed":
              await handleCheckoutCompleted(stripe, event.data.object);
              break;
            case "invoice.paid":
              await handleInvoicePaid(stripe, event.data.object);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error("[stripe-webhook]", event.type, error);
          return new Response("Handler error", { status: 500 });
        }

        return new Response("ok");
      },
    },
  },
});
