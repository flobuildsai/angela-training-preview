import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — The Inner Circle" },
      { name: "description", content: "Apply for The Inner Circle by Creating Society." },
      { property: "og:title", content: "Apply — The Inner Circle" },
      { property: "og:description", content: "12 weeks. Small cohort. We build your offer with you." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    // TODO: POST application to real endpoint (e.g. /api/public/apply)
    await new Promise((r) => setTimeout(r, 600));
    console.log("application", Object.fromEntries(formData));
    setPending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[color:var(--cream)] py-24 grid place-items-center">
        <div className="max-w-lg px-6 text-center">
          <p className="eyebrow text-[color:var(--rose)]">Received</p>
          <h1 className="mt-5 font-serif text-5xl tracking-tight text-[color:var(--wine)]">
            Thank you.
          </h1>
          <p className="mt-5 text-[color:var(--muted-fg)] leading-relaxed">
            We read every application ourselves. If it's a fit for this cohort, you'll hear from us within 48 hours with next steps.
          </p>
          <Link to="/" className="mt-10 inline-flex items-center px-8 py-4 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const field = "mt-2 w-full rounded-lg border border-[color:var(--border)] bg-white px-4 py-3 text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--rose)]";

  return (
    <main className="min-h-screen bg-[color:var(--cream)] py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <Link to="/" className="text-xs tracking-[0.2em] uppercase text-[color:var(--muted-fg)] hover:text-[color:var(--wine)]">← Back</Link>
        <p className="mt-8 eyebrow text-[color:var(--rose)]">The Inner Circle</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tight text-[color:var(--wine)]">
          Apply to <span className="serif-italic text-[color:var(--rose)]">work with us.</span>
        </h1>
        <p className="mt-5 text-[color:var(--muted-fg)] leading-relaxed">
          12 weeks. Small cohort. We build your offer with you. Answer honestly — we'd rather say no than take the wrong person.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <label className="block text-sm">
              <span className="text-[color:var(--ink)] font-medium">First name</span>
              <input required name="firstName" className={field} />
            </label>
            <label className="block text-sm">
              <span className="text-[color:var(--ink)] font-medium">Email</span>
              <input required type="email" name="email" className={field} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-[color:var(--ink)] font-medium">Instagram handle</span>
            <input required name="instagram" placeholder="@yourhandle" className={field} />
          </label>
          <label className="block text-sm">
            <span className="text-[color:var(--ink)] font-medium">Where are you right now?</span>
            <select required name="stage" className={field} defaultValue="">
              <option value="" disabled>Select one…</option>
              <option value="zero">Starting from zero</option>
              <option value="posting">Posting but not earning</option>
              <option value="earning">Already earning</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-[color:var(--ink)] font-medium">What do you want to be true in 12 weeks?</span>
            <textarea required name="goal" rows={5} className={field} />
          </label>
          <label className="block text-sm">
            <span className="text-[color:var(--ink)] font-medium">Are you able to invest $3,997?</span>
            <select required name="invest" className={field} defaultValue="">
              <option value="" disabled>Select one…</option>
              <option value="yes">Yes</option>
              <option value="plan">Yes with a payment plan</option>
              <option value="no">Not right now</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-4 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[color:var(--wine)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition disabled:opacity-60"
          >
            {pending ? "Sending…" : "Submit application"}
          </button>
        </form>
      </div>
    </main>
  );
}
