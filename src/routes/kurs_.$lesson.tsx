import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ApplicationCard } from "@/components/ApplicationCard";
import { CoursePlayer } from "@/components/CoursePlayer";
import { FreeFooter, FreeHeader, PrimaryButton, useReveal } from "@/components/FreeShell";
import {
  APPLICATION_AFTER_LESSON_INDEX,
  LESSONS,
  MODULES,
  isUnlocked,
  lessonBySlug,
  unlocksAt,
} from "@/config/freeCourse";
import { readProgress, writeProgress } from "@/lib/freeAccess";
import { useFreeAccess } from "@/lib/useFreeAccess";
import { trackEvent } from "@/lib/track";
import { freeProgress } from "@/utils/freeCourse.functions";

export const Route = createFileRoute("/kurs_/$lesson")({
  head: ({ params }) => {
    const lesson = lessonBySlug(params.lesson);
    return {
      meta: [
        { title: `${lesson?.title ?? "Lektion"} | Creating Society` },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: LessonPage,
});

const fmt = new Intl.DateTimeFormat("de-DE", { weekday: "long", hour: "2-digit", minute: "2-digit" });

function LessonPage() {
  useReveal();
  const { lesson: slug } = Route.useParams();
  const navigate = useNavigate();
  const { access, status } = useFreeAccess();
  const report = useServerFn(freeProgress);
  const [done, setDone] = useState(false);

  const lesson = lessonBySlug(slug);
  const index = lesson ? LESSONS.indexOf(lesson) : -1;
  const next = index >= 0 ? LESSONS[index + 1] : undefined;
  const module = lesson ? MODULES.find((m) => m.n === lesson.module) : undefined;
  const signedUpAt = useMemo(() => (access ? new Date(access.signedUpAt).getTime() : Date.now()), [access]);
  const unlocked = lesson ? isUnlocked(lesson, signedUpAt) : false;

  useEffect(() => {
    if (status === "none") void navigate({ to: "/free" });
    if (!lesson) void navigate({ to: "/kurs" });
  }, [status, lesson, navigate]);

  useEffect(() => {
    if (status !== "ok" || !lesson || !access || !unlocked) return;
    setDone(readProgress()[lesson.slug] === "completed");
    writeProgress(lesson.slug, "started");
    trackEvent("free_lesson_view", { lesson: lesson.slug });
    void report({ data: { token: access.token, lesson: lesson.slug, event: "started" } }).catch(() => undefined);
  }, [status, lesson, access, unlocked, report]);

  if (status !== "ok" || !access || !lesson || !module) {
    return <main className="min-h-screen bg-[color:var(--background)]" />;
  }

  const complete = () => {
    writeProgress(lesson.slug, "completed");
    setDone(true);
    trackEvent("free_lesson_complete", { lesson: lesson.slug });
    void report({ data: { token: access.token, lesson: lesson.slug, event: "completed" } }).catch(() => undefined);
  };

  const nextOpen = next ? isUnlocked(next, signedUpAt) : false;
  const showApplication = index >= APPLICATION_AFTER_LESSON_INDEX && done;

  return (
    <main className="bg-[color:var(--background)] text-[color:var(--ink)]">
      <FreeHeader
        right={
          <Link to="/kurs" className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-fg)] transition hover:text-[color:var(--ink)]">
            Alle Lektionen
          </Link>
        }
      />

      <article className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <header className="rv">
          <p className="eyebrow text-[color:var(--rose)]">
            {module.n === 0 ? "Start here" : `Modul ${module.n}`} · {module.title} · Video {index + 1} von {LESSONS.length}
          </p>
          <h1 className="mt-4 font-serif text-[2.2rem] leading-[1.05] sm:text-5xl">{lesson.title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted-fg)] sm:text-[17px]">
            {lesson.outcome}
          </p>
        </header>

        <div className="mt-10 rv d1">
          {unlocked ? (
            <CoursePlayer video={lesson.video} title={lesson.title} onPlay={() => trackEvent("free_lesson_play", { lesson: lesson.slug })} />
          ) : (
            <div className="grid aspect-video place-items-center rounded-2xl bg-[color:var(--cream2)] text-center">
              <div className="px-6">
                <p className="eyebrow text-[color:var(--muted-fg)]">Noch nicht offen</p>
                <p className="mt-2 font-serif text-2xl">Offen ab {fmt.format(unlocksAt(lesson, signedUpAt))}</p>
                <p className="mt-2 text-sm text-[color:var(--muted-fg)]">Bis dahin: die Aufgabe der letzten Lektion machen.</p>
              </div>
            </div>
          )}
        </div>

        {unlocked && (
          <section className="mt-12 grid gap-10 md:grid-cols-[1fr_16rem] md:gap-16 rv d2">
            <div>
              <p className="eyebrow rule-label text-[color:var(--muted-fg)]">Dein Ergebnis-Gate</p>
              <p className="mt-5 font-serif text-2xl leading-snug sm:text-3xl">{lesson.task}</p>
              {lesson.resource && (
                <a
                  href={lesson.resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4 transition hover:text-[color:var(--rose)]"
                >
                  {lesson.resource.label} ↗
                </a>
              )}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {done ? (
                  <p className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--rose)]" />
                    Erledigt.
                  </p>
                ) : (
                  <PrimaryButton onClick={complete}>Hab ich — weiter</PrimaryButton>
                )}
                {next && (
                  nextOpen ? (
                    <Link
                      to="/kurs/$lesson"
                      params={{ lesson: next.slug }}
                      className="text-[12px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4 transition hover:text-[color:var(--rose)]"
                    >
                      Nächste Lektion →
                    </Link>
                  ) : (
                    <span className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--muted-fg)]">
                      Nächste Lektion ab {fmt.format(unlocksAt(next, signedUpAt))}
                    </span>
                  )
                )}
              </div>
            </div>
            <aside className="border-t border-[color:var(--border)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="eyebrow text-[color:var(--muted-fg)]">{module.n === 0 ? "Start here" : "In diesem Modul"}</p>
              <ul className="mt-4 space-y-3">
                {LESSONS.filter((l) => l.module === module.n).map((l) => (
                  <li key={l.slug} className={`text-[14px] leading-snug ${l.slug === lesson.slug ? "" : "text-[color:var(--muted-fg)]"}`}>
                    {l.slug === lesson.slug ? (
                      l.title
                    ) : (
                      <Link to="/kurs/$lesson" params={{ lesson: l.slug }} className="transition hover:text-[color:var(--ink)]">
                        {l.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}

        {showApplication && <ApplicationCard name={access.firstName?.split(" ")[0]} />}
      </article>

      <FreeFooter />
    </main>
  );
}
