import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Join Creating Society — Checkout" },
      { name: "description", content: "Complete your enrollment in Creating Society." },
      { property: "og:title", content: "Join Creating Society" },
      { property: "og:description", content: "Complete your enrollment." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--cream)] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/" className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted-fg)] hover:text-[color:var(--wine)]">
          ← Back
        </Link>
        <h1 className="mt-8 font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">
          Join <span className="serif-italic text-[color:var(--rose)]">Creating Society</span>
        </h1>
        <p className="mt-4 text-[color:var(--muted-fg)] leading-relaxed">
          One payment. Lifetime access. 30-day guarantee.
        </p>

        <div className="mt-10 grid md:grid-cols-[1fr_1fr] gap-6">
          <div className="rounded-2xl bg-white p-8 border border-[color:var(--border)]">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-medium">Creating Society</p>
                <p className="text-xs text-[color:var(--muted-fg)] mt-1">Lifetime access</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[color:var(--muted-fg)] line-through">$997</p>
                <p className="font-serif text-3xl text-[color:var(--wine)]">$697</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[color:var(--border)] flex justify-between items-baseline">
              <span className="text-sm text-[color:var(--muted-fg)]">Total due today</span>
              <span className="font-serif text-2xl text-[color:var(--wine)]">$697</span>
            </div>
            <p className="mt-4 text-xs text-[color:var(--muted-fg)]">Or choose 3 × $249 at checkout.</p>
          </div>

          <div className="rounded-2xl bg-[color:var(--cream2)] p-8 border border-dashed border-[color:var(--rose)]/40">
            {/* TODO: Mount Stripe Embedded Checkout here */}
            <p className="eyebrow text-[color:var(--rose)]">TODO</p>
            <p className="mt-3 font-serif text-xl text-[color:var(--wine)]">Stripe Embedded Checkout goes here</p>
            <p className="mt-3 text-sm text-[color:var(--muted-fg)] leading-relaxed">
              Replace this placeholder with the Stripe checkout session mount point.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
