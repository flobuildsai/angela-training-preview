import {
  CAMERA_OPTIONS,
  FOLLOWER_BUCKETS,
  HOURS_OPTIONS,
  POSTING_OPTIONS,
  SKILL_OPTIONS,
  useFunnel,
} from "../FunnelContext";
import { Choice, Head, Micro, PrimaryCTA, StepLabel, Sub } from "../ui";

function Question({
  n,
  title,
  hint,
  options,
  value,
  onSelect,
}: {
  n: number;
  title: string;
  hint?: string;
  options: string[];
  value: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="space-y-9">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8">
        <p className="font-serif text-[3.5rem] leading-none tabular-nums text-[color:var(--ink)]/12 sm:text-[5rem]">
          {String(n).padStart(2, "0")}
        </p>
        <div className="space-y-3 sm:pt-2">
          <StepLabel>Frage {n} von 6</StepLabel>
          <Head>{title}</Head>
          {hint && <Sub>{hint}</Sub>}
        </div>
      </div>

      <div className="space-y-3">
        {options.map((o, i) => (
          <div
            key={o}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-[stepIn_.5s_cubic-bezier(.16,1,.3,1)_both]"
          >
            <Choice
              label={o}
              index={i}
              selected={value === i}
              onClick={() => onSelect(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StepFollowers() {
  const { data, update, next } = useFunnel();
  return (
    <Question
      n={1}
      title="Wie groß ist deine Reichweite gerade?"
      hint="Eine ehrliche Zahl reicht. Bei 0 anzufangen ist völlig okay, wir rechnen gleich damit."
      options={FOLLOWER_BUCKETS.map((b) => b.label)}
      value={data.followers}
      onSelect={(i) => {
        update({ followers: i });
        next();
      }}
    />
  );
}

export function StepPosting() {
  const { data, update, next } = useFunnel();
  return (
    <Question
      n={2}
      title="Wie oft postest du aktuell?"
      options={POSTING_OPTIONS}
      value={data.posting}
      onSelect={(i) => {
        update({ posting: i });
        next();
      }}
    />
  );
}

export function StepSkill() {
  const { data, update, next } = useFunnel();
  return (
    <Question
      n={3}
      title="Was könntest du anderen geben?"
      hint="Denk daran, was Menschen dich immer wieder fragen."
      options={SKILL_OPTIONS}
      value={data.skill}
      onSelect={(i) => {
        update({ skill: i });
        next();
      }}
    />
  );
}

export function StepCamera() {
  const { data, update, next } = useFunnel();
  return (
    <Question
      n={4}
      title="Zeigst du dich vor der Kamera?"
      options={CAMERA_OPTIONS}
      value={data.camera}
      onSelect={(i) => {
        update({ camera: i });
        next();
      }}
    />
  );
}

export function StepHours() {
  const { data, update, next } = useFunnel();
  return (
    <Question
      n={5}
      title="Wie viel Zeit hast du pro Woche?"
      hint="Realistisch, neben allem anderen was du tust."
      options={HOURS_OPTIONS}
      value={data.hours}
      onSelect={(i) => {
        update({ hours: i });
        next();
      }}
    />
  );
}

export function StepReadiness() {
  const { data, update, next } = useFunnel();
  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8">
        <p className="font-serif text-[3.5rem] leading-none tabular-nums text-[color:var(--ink)]/12 sm:text-[5rem]">
          06
        </p>
        <div className="space-y-3 sm:pt-2">
          <StepLabel>Frage 6 von 6</StepLabel>
          <Head>Wie ernst ist es dir, in den nächsten 12 Wochen zu starten?</Head>
          <Sub>1 heißt „ich schaue mich nur um“, 10 heißt „ich fange sofort an“.</Sub>
        </div>
      </div>

      <div className="space-y-6 border-y border-[color:var(--ink)]/12 py-8">
        <div className="flex items-end justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted-fg)]">
            Deine Antwort
          </span>
          <span className="font-serif text-[3.5rem] leading-none tabular-nums text-[color:var(--ink)]">
            {data.readiness}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={data.readiness}
          onChange={(e) => update({ readiness: Number(e.target.value) })}
          aria-label="Bereitschaft von 1 bis 10"
          className="w-full accent-[color:var(--ink)]"
        />
        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-fg)]">
          <span>Nur umschauen</span>
          <span>Sofort starten</span>
        </div>
      </div>

      <PrimaryCTA onClick={next}>Auswertung ansehen</PrimaryCTA>
      <Micro>Deine Angaben bleiben auf diesem Gerät.</Micro>
    </div>
  );
}
