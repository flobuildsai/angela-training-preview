import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { PRODUCTS, DEFAULT_PRODUCT, isProductKey, type ProductKey } from "@/config/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Creating Society" },
      {
        name: "description",
        content:
          "Sichere dir deinen Zugang zu Creating Society: Templates-Bibliothek oder das 12-Wochen-Programm.",
      },
      { property: "og:title", content: "Checkout | Creating Society" },
      {
        property: "og:description",
        content: "Templates oder 12-Wochen-Programm buchen und sofort starten.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { produkt?: ProductKey } => ({
    produkt: isProductKey(search["produkt"]) ? search["produkt"] : undefined,
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { produkt } = Route.useSearch();
  const [selected, setSelected] = useState<ProductKey>(produkt ?? DEFAULT_PRODUCT);
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);

  const product = PRODUCTS[selected];
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <main className="min-h-screen bg-[color:var(--cream)]">
      <PaymentTestModeBanner />
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <Link
          to="/"
          className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted-fg)] hover:text-[color:var(--wine)]"
        >
          ← Zurück
        </Link>

        <h1 className="mt-8 font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">
          Deinen Zugang <span className="serif-italic text-[color:var(--rose)]">sichern</span>
        </h1>
        <p className="mt-4 max-w-xl text-[color:var(--muted-fg)] leading-relaxed">
          Zahlung abschließen und sofort loslegen. Dein Zugang wird direkt nach der Zahlung freigeschaltet.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-4">
            {(Object.keys(PRODUCTS) as ProductKey[]).map((key) => {
              const p = PRODUCTS[key];
              const active = key === selected;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={started}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left rounded-2xl border p-6 transition ${
                    active
                      ? "border-[color:var(--rose)] bg-white shadow-sm"
                      : "border-[color:var(--border)] bg-white/60 hover:bg-white"
                  } ${started ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-serif text-xl text-[color:var(--wine)]">{p.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-fg)] mt-1">
                        {p.tagline}
                      </p>
                    </div>
                    <p className="font-serif text-2xl text-[color:var(--wine)] whitespace-nowrap">
                      {p.priceLabel}
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-[color:var(--muted-fg)]">{p.priceNote}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-[color:var(--muted-fg)]">
                    {p.includes.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white border border-[color:var(--border)] p-6 sm:p-8">
            {!started ? (
              <>
                <h2 className="font-serif text-2xl text-[color:var(--wine)]">Bestellübersicht</h2>
                <div className="mt-6 flex items-baseline justify-between border-t border-[color:var(--border)] pt-6">
                  <span className="text-sm text-[color:var(--muted-fg)]">{product.name}</span>
                  <span className="font-serif text-2xl text-[color:var(--wine)]">
                    {product.priceLabel}
                  </span>
                </div>

                <label className="mt-8 block text-xs uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">
                  E-Mail für deinen Zugang
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="du@beispiel.de"
                  className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--cream2)] px-4 py-3 text-[color:var(--ink)] outline-none focus:border-[color:var(--rose)]"
                />

                <button
                  type="button"
                  disabled={!emailValid}
                  onClick={() => setStarted(true)}
                  className="mt-6 w-full rounded-full bg-[color:var(--wine)] px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-40"
                >
                  Weiter zur Zahlung
                </button>
                <p className="mt-4 text-xs text-[color:var(--muted-fg)]">
                  Sichere Zahlung über Stripe. Kreditkarte, Apple Pay, Google Pay und Klarna.
                </p>
              </>
            ) : (
              <StripeEmbeddedCheckout
                priceId={product.priceId}
                customerEmail={email}
                returnUrl={`${window.location.origin}/welcome?session_id={CHECKOUT_SESSION_ID}`}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
