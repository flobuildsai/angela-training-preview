import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "You're in — Creating Society" },
      { name: "description", content: "Welcome to Creating Society. Here's how to start." },
      { property: "og:title", content: "You're in — Creating Society" },
      { property: "og:description", content: "Welcome to Creating Society." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const steps = [
    { n: "01", t: "Check your email", d: "Your login and receipt are on their way. Whitelist us so nothing lands in spam." },
    { n: "02", t: "Join the community", d: "This is where the momentum lives. Introduce yourself in the welcome thread." },
    { n: "03", t: "Start with Phase One", d: "Position first. Everything else compounds on top of it." },
  ];
  return (
    <main className="min-h-screen bg-[color:var(--cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow text-[color:var(--rose)]">Welcome</p>
        <h1 className="mt-5 font-serif text-5xl sm:text-6xl tracking-tight text-[color:var(--wine)]">
          You're <span className="serif-italic text-[color:var(--rose)]">in.</span>
        </h1>
        <p className="mt-5 text-[color:var(--muted-fg)] leading-relaxed max-w-xl mx-auto">
          The work starts now. Three things to do next.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-3 text-left">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white p-7 border border-[color:var(--border)]">
              <div className="font-serif text-3xl text-[color:var(--rose)]">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl text-[color:var(--wine)]">{s.t}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-fg)] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-14 inline-flex items-center px-8 py-4 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
