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
    <main className="min-h-screen bg-background text-foreground py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/" className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground transition">
          ← Back
        </Link>
        <h1 className="mt-8 font-serif text-4xl sm:text-6xl leading-[0.95]">
          Join
          <span className="font-serif-italic block text-muted-foreground mt-2">Creating Society.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          One payment. Lifetime access. 30-day guarantee.
        </p>

        <div className="mt-12 grid md:grid-cols-[1fr_1fr] gap-6">
          <div className="rounded-2xl bg-card p-8 border border-border">
            <p className="text-[10px] uppercase tracking-[0.38em] text-muted-foreground">Order summary</p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-serif text-xl">Creating Society</p>
                <p className="text-xs text-muted-foreground mt-1">Lifetime access</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground line-through">$997</p>
                <p className="font-serif text-4xl">$697</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border flex justify-between items-baseline">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Total due today</span>
              <span className="font-serif text-2xl">$697</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Or choose 3 × $249 at checkout.</p>
          </div>

          <div className="rounded-2xl bg-card p-8 border border-dashed border-border">
            {/* TODO: Mount Stripe Embedded Checkout here */}
            <p className="text-[10px] uppercase tracking-[0.38em] text-muted-foreground">TODO</p>
            <p className="mt-3 font-serif text-xl">Stripe Embedded Checkout goes here</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Replace this placeholder with the Stripe checkout session mount point.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
