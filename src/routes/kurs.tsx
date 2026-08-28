import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ApplicationCard } from "@/components/ApplicationCard";
import { FreeFooter, FreeHeader, useReveal } from "@/components/FreeShell";
import {
  APPLICATION_AFTER_LESSON_INDEX,
  COURSE_NAME,
  LESSONS,
  MODULES,
  isUnlocked,
  unlocksAt,
} from "@/config/freeCourse";
import { readProgress } from "@/lib/freeAccess";
import { useFreeAccess } from "@/lib/useFreeAccess";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/kurs")({
  head: () => ({
    meta: [
      { title: `${COURSE_NAME} | Creating Society` },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { t?: string; e?: string; n?: string } => ({
    t: typeof search["t"] === "string" ? search["t"] : undefined,
    e: typeof search["e"] === "string" && search["e"].length <= 160 ? search["e"] : undefined,
    n: typeof search["n"] === "string" && search["n"].length <= 80 ? search["n"] : undefined,
  }),
  component: CoursePage,
});

const fmt = new Intl.DateTimeFormat("de-DE", { weekday: "long", hour: "2-digit", minute: "2-digit" });

function CoursePage() {
  useReveal();
  const { t, e, n } = Route.useSearch();
  const navigate = useNavigate();
  const { access, status } = useFreeAccess(t, { email: e, firstName: n });
  const [progress, setProgress] = useState<Record<string, "started" | "completed">>({});

  useEffect(() => {
    if (status === "none") void navigate({ to: "/free" });
    if (status === "ok") {
      setProgress(readProgress());
      trackEvent("free_course_view");
    }
  }, [status, navigate]);

  const signedUpAt = useMemo(() => (access ? new Date(access.signedUpAt).getTime() : Date.now()), [access]);

  if (status !== "ok" || !access) return <main className="min-h-screen bg-[color:var(--background)]" />;

  const completed = LESSONS.filter((l) => progress[l.slug] === "completed").length;
  const nextLesson = LESSONS.find((l) => progress[l.slug] !== "completed" && isUnlocked(l, signedUpAt)) ?? null;
  const showApplication = completed > APPLICATION_AFTER_LESSON_INDEX;
  const name = access.firstName?.split(" ")[0];

  return (
    <main className="bg-[color:var(--background)] text-[color:var(--ink)]">
      <FreeHeader
        right={
          <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
            {completed}/{LESSONS.length} Lektionen
          </span>
        }
      />

      <section className="mx-auto max-w-5xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="rv">
          <p className="eyebrow text-[color:var(--rose)]">{COURSE_NAME}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.03] sm:text-6xl">
            {name ? `${name}, ` : ""}
            {completed === 0 ? (
              <>hier fängt es <span className="serif-italic text-[color:var(--rose)]">an.</span></>
            ) : completed === LESSONS.length ? (
              <>du hast alles <span className="serif-italic text-[color:var(--rose)]">durch.</span></>
            ) : (
              <>weiter geht's mit <span className="serif-italic text-[color:var(--rose)]">Lektion {completed + 1}.</span></>
            )}
          </h1>
        </div>

        {nextLesson && (
          <Link
            to="/kurs/$lesson"
            params={{ lesson: nextLesson.slug }}
            className="mt-10 block rounded-2xl bg-[color:var(--wine)] p-7 text-[color:var(--cream)] transition hover:opacity-95 sm:p-9 rv d1"
          >
            <p className="eyebrow opacity-70">
              Als Nächstes · {nextLesson.module === 0 ? "Start here" : `Modul ${nextLesson.module}`} · {nextLesson.duration}
            </p>
            <p className="mt-2 font-serif text-2xl leading-snug sm:text-3xl">{nextLesson.title}</p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed opacity-75">{nextLesson.outcome}</p>
            <span className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
              Jetzt ansehen
            </span>
          </Link>
        )}

        {showApplication && <ApplicationCard name={name} />}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 sm:pb-32">
        {MODULES.map((m) => {
          const lessons = LESSONS.filter((l) => l.module === m.n);
          return (
            <div key={m.n} className="border-t border-[color:var(--border)] py-10 rv">
              <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
                <div>
                  <span className="serif-italic text-3xl text-[color:var(--rose)]">{m.n === 0 ? "Start" : `0${m.n}`}</span>
                  <h2 className="mt-2 font-serif text-2xl leading-snug">{m.title}</h2>
                  <p className="mt-1 serif-italic text-lg text-[color:var(--muted-fg)]">{m.italic}</p>
                  <p className="mt-3 text-[12px] leading-snug text-[color:var(--muted-fg)]"><span className="uppercase tracking-[0.16em] text-[color:var(--rose)]">Ergebnis</span> · {m.result}</p>
                </div>
                <ul className="divide-y divide-[color:var(--border)]">
                  {lessons.map((l) => {
                    const open = isUnlocked(l, signedUpAt);
                    const state = progress[l.slug];
                    const idx = LESSONS.indexOf(l) + 1;
                    const inner = (
                      <div className="flex items-start gap-4 py-4">
                        <span
                          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                            state === "completed"
                              ? "bg-[color:var(--rose)]"
                              : open
                                ? "border border-[color:var(--ink)]"
                                : "border border-[color:var(--border)]"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-[16px] leading-snug ${open ? "" : "text-[color:var(--muted-fg)]"}`}>
                            <span className="text-[color:var(--muted-fg)]">{idx}.</span> {l.title}
                          </p>
                          <p className="mt-1 text-[13px] text-[color:var(--muted-fg)]">
                            {open
                              ? `${l.duration}${state === "completed" ? " · erledigt" : state === "started" ? " · angefangen" : ""}`
                              : `Offen ab ${fmt.format(unlocksAt(l, signedUpAt))}`}
                          </p>
                        </div>
                      </div>
                    );
                    return (
                      <li key={l.slug}>
                        {open ? (
                          <Link to="/kurs/$lesson" params={{ lesson: l.slug }} className="block transition hover:opacity-70">
                            {inner}
                          </Link>
                        ) : (
                          inner
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      <FreeFooter />
    </main>
  );
}
