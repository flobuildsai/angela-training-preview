import { LESSONS, MODULES } from "@/config/freeCourse";

/**
 * Das Kurs-Portal in einem Handy-Rahmen — gebaut in HTML/CSS statt als Bild,
 * damit es gestochen scharf ist und immer den echten Stand des Kurses zeigt.
 */
export function CourseMockup({ className = "" }: { className?: string }) {
  const first = LESSONS[0];
  return (
    <div className={`mx-auto w-[290px] ${className}`} aria-hidden="true">
      <div className="rounded-[44px] bg-[#0b0b0b] p-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[36px] bg-white text-[#101010]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#0b0b0b]" />
          <div className="px-5 pb-6 pt-12">
            <p className="text-[7px] uppercase tracking-[0.22em] text-[#94897A]">Das Creating Society System</p>
            <p className="mt-1.5 font-serif text-[19px] leading-[1.05]">
              Laura, hier fängt es <span className="serif-italic text-[#94897A]">an.</span>
            </p>
            <div className="mt-4 rounded-2xl bg-[#0E0E0E] p-3.5 text-white">
              <p className="text-[6.5px] uppercase tracking-[0.2em] opacity-60">Als Nächstes · {first.duration}</p>
              <p className="mt-1 font-serif text-[13px] leading-snug">{first.title}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
                  <svg viewBox="0 0 24 24" className="ml-[1px] h-3 w-3 fill-[#0E0E0E]"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="text-[7px] font-semibold uppercase tracking-[0.18em]">Jetzt ansehen</span>
              </div>
            </div>
            <ul className="mt-4 divide-y divide-black/[0.08]">
              {MODULES.slice(0, 5).map((m, i) => (
                <li key={m.n} className="flex items-center gap-2.5 py-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-[#94897A]" : i === 1 ? "border border-black" : "border border-black/20"}`} />
                  <span className={`text-[9.5px] ${i > 1 ? "text-black/40" : ""}`}>
                    <span className="serif-italic text-[#94897A]">0{m.n}</span> {m.title}
                  </span>
                  <span className="ml-auto text-[6.5px] uppercase tracking-[0.16em] text-black/40">
                    {i === 0 ? "offen" : i === 1 ? "morgen" : `Tag ${i}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Home indicator */}
          <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  );
}
