import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FreeFooter, FreeHeader, PrimaryButton, useReveal } from "@/components/FreeShell";
import { LESSONS, MODULES } from "@/config/freeCourse";
import { readAccess, writeAccess } from "@/lib/freeAccess";
import { trackEvent } from "@/lib/track";
import { freeOptin, freeWhatsapp, type FreeAccess } from "@/utils/freeCourse.functions";

export const Route = createFileRoute("/free_/willkommen")({
  head: () => ({
    meta: [
      { title: "Dein Zugang ist aktiv | Creating Society" },
      { name: "description", content: "Modul 1 ist offen. So startest du." },
      { property: "og:title", content: "Dein Zugang ist aktiv | Creating Society" },
      { property: "og:description", content: "Modul 1 ist offen. So startest du." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { e?: string; n?: string } => ({
    e: typeof search["e"] === "string" && search["e"].length <= 160 ? search["e"] : undefined,
    n: typeof search["n"] === "string" && search["n"].length <= 80 ? search["n"] : undefined,
  }),
  component: WelcomePage,
});

function WelcomePage() {
  useReveal();
  const navigate = useNavigate();
  const { e, n } = Route.useSearch();
  const optIn = useServerFn(freeOptin);
  const [access, setAccess] = useState<FreeAccess | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const a = readAccess();
      if (a) {
        if (cancelled) return;
        setAccess(a);
        setReady(true);
        trackEvent("free_welcome_view");
        return;
      }
      // Hand-off von milou.bio: ?e=<email>&n=<firstName>
      const email = e?.trim();
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const remote = await optIn({
          data: {
            firstName: n ?? "",
            email,
            utm: { source: "milou", medium: "store", campaign: "free-course" },
          },
        }).catch(() => null);
        if (cancelled) return;
        if (remote) {
          writeAccess(remote);
          setAccess(remote);
          setReady(true);
          trackEvent("free_welcome_view", { from: "milou" });
          void navigate({ to: "/free/willkommen", replace: true });
          return;
        }
      }
      if (cancelled) return;
      void navigate({ to: "/free" });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, e, n]);

  if (!ready || !access) return <main className="min-h-screen bg-[color:var(--background)]" />;

  const name = access.firstName?.split(" ")[0];

  return (
    <main className="bg-[color:var(--background)] text-[color:var(--ink)]">
      <FreeHeader
        right={<span className="pill">Zugang aktiv</span>}
      />

      <section className="mx-auto max-w-3xl px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="rv">
          <p className="eyebrow text-[color:var(--rose)]">Willkommen{name ? `, ${name}` : ""}</p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl">
            Dein Zugang ist aktiv<span className="ember-dot">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[color:var(--muted-fg)] sm:text-lg">
            Deine Anmeldung ist da. Hier sind deine nächsten Schritte.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 sm:pb-28">
        <ol className="space-y-6">
          {/* 01 — Strategiegespräch */}
          <li className="rounded-card bg-pressed-graphite p-7 text-pure-white shadow-xl sm:p-9 rv">
            <div className="flex items-start gap-5">
              <span className="text-3xl text-pure-white/60">01</span>
              <div className="flex-1">
                <p className="eyebrow opacity-70">Jetzt · 30 Minuten · kostenlos</p>
                <h2 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">Strategiegespräch mit Laura</h2>
                <p className="mt-3 text-[15px] leading-relaxed opacity-75">
                  Ihr schaut euch deine Situation an, was du aufbauen willst und ob das Programm
                  dazu passt. Ehrlich, ohne Verkaufsdruck — und nicht für jede geeignet.
                </p>
                <div className="mt-6">
                  <Link
                    to="/call"
                    onClick={() => trackEvent("free_welcome_call_click")}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-button bg-pure-white px-8 text-sm font-medium text-pressed-graphite transition hover:opacity-90 sm:w-auto"
                  >
                    Termin ansehen
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* 02 — WhatsApp */}
          <li className="rounded-card bg-pure-white p-7 shadow-xl sm:p-9 rv d1">
            <div className="flex items-start gap-5">
              <span className="text-3xl text-slate">02</span>
              <div className="flex-1">
                <p className="eyebrow text-[color:var(--muted-fg)]">Optional · 20 Sekunden</p>
                <h2 className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">Begleitung per WhatsApp</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted-fg)]">
                  Wir schreiben dir, wenn ein Modul freigeschaltet ist, und fragen nach, ob die Aufgabe
                  gemacht ist. Kein Newsletter, keine Werbung. Wer das hat, setzt dreimal so oft um.
                </p>
                <WhatsappForm access={access} onSaved={(a) => setAccess(a)} />
              </div>
            </div>
          </li>
        </ol>

        <div className="mt-14 rv d3">
          <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Dein Plan für die nächsten Tage</p>
          <ul className="mt-5 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {MODULES.map((m) => {
              const hours = Math.min(...LESSONS.filter((l) => l.module === m.n).map((l) => l.unlockAfterHours));
              const when = hours === 0 ? "Jetzt" : `Ab Tag ${hours / 24 + 1}`;
              return (
                <li key={m.n} className="flex items-baseline justify-between gap-6 py-3.5">
                  <span className="text-[15px]">
                    <span className="serif-italic text-[color:var(--rose)]">{m.n === 0 ? "Start" : `0${m.n}`}</span>{" "}
                    <span className="ml-2">{m.title}</span>
                  </span>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-fg)]">{when}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-[color:var(--muted-fg)]">
            Dein Zugangslink kommt auch per E-Mail an {access.email}. Falls nichts ankommt: Spam-Ordner,
            und trag uns ins Adressbuch ein.
          </p>
        </div>
      </section>

      <FreeFooter />
    </main>
  );
}

function WhatsappForm({ access, onSaved }: { access: FreeAccess; onSaved: (a: FreeAccess) => void }) {
  const save = useServerFn(freeWhatsapp);
  const [value, setValue] = useState(access.whatsapp ?? "");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">(access.whatsapp ? "done" : "idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = value.replace(/[^\d+]/g, "");
    if (!/^\+?\d{8,15}$/.test(phone)) return setState("error");
    setState("busy");
    const res = await save({ data: { token: access.token, whatsapp: phone } }).catch(() => ({ ok: false }));
    if (res.ok) {
      const next = { ...access, whatsapp: phone };
      writeAccess(next);
      onSaved(next);
      trackEvent("free_whatsapp_saved");
      setState("done");
    } else setState("error");
  };

  if (state === "done") {
    return (
      <p className="mt-5 flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-ember" />
        Gespeichert. Die erste Nachricht kommt, wenn Modul 2 offen ist — morgen.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end" noValidate>
      <div className="flex-1">
        <label htmlFor="whatsapp" className="block text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted-fg)]">
          WhatsApp-Nummer
        </label>
        <input
          id="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="+49 170 1234567"
          className="min-h-14 w-full rounded-input border border-fog bg-pure-white px-4 text-body placeholder:text-stone transition focus:border-pressed-graphite focus:outline-none"
        />
        {state === "error" && (
          <p className="mt-2 text-xs text-[color:var(--rose)]">Bitte mit Ländervorwahl, z. B. +49 170 1234567.</p>
        )}
      </div>
      <PrimaryButton type="submit" disabled={state === "busy"} className="sm:min-w-[180px]">
        {state === "busy" ? "…" : "Speichern"}
      </PrimaryButton>
    </form>
  );
}
