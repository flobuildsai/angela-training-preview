import { useState } from "react";
import type { LessonVideo } from "@/config/freeCourse";

interface CoursePlayerProps {
  video: LessonVideo;
  title: string;
  poster?: string;
  onPlay?: () => void;
}

/**
 * Ein Player für Vimeo, YouTube oder MP4. Ohne Video zeigt er ein ruhiges
 * „folgt"-Cover statt eines kaputten Embeds.
 */
export function CoursePlayer({ video, title, poster, onPlay }: CoursePlayerProps) {
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    onPlay?.();
  };

  const frame = "relative w-full overflow-hidden rounded-2xl bg-[color:var(--ink)]";
  const ratio = { aspectRatio: "16 / 9" } as const;

  if (!video) {
    return (
      <div className={`${frame} grid place-items-center text-center text-[color:var(--cream)]`} style={ratio}>
        {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="relative space-y-2 px-6">
          <p className="eyebrow opacity-70">Video folgt</p>
          <p className="font-serif text-2xl sm:text-3xl">{title}</p>
          <p className="text-sm opacity-70">Die Aufgabe unten kannst du schon jetzt machen.</p>
        </div>
      </div>
    );
  }

  if (video.kind === "mp4") {
    return (
      <div className={frame} style={ratio}>
        <video
          controls
          playsInline
          preload="metadata"
          poster={video.poster ?? poster}
          src={video.url}
          onPlay={onPlay}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  const src =
    video.kind === "vimeo"
      ? `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
      : `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  if (!playing) {
    return (
      <button type="button" onClick={start} aria-label={`${title} abspielen`} className={`${frame} group block`} style={ratio}>
        {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        <span className="absolute inset-0 bg-[color:var(--ink)]/30 transition group-hover:bg-[color:var(--ink)]/20" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-[color:var(--cream)]/95 shadow-lg transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[color:var(--wine)]" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className={frame} style={ratio}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
