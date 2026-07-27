import { useState } from "react";
import posterImg from "@/assets/video-poster.jpg";

interface VideoBlockProps {
  videoId: string;
  label: string;
  poster?: string;
}

export function VideoBlock({ videoId, label, poster = posterImg }: VideoBlockProps) {
  const [playing, setPlaying] = useState(false);

  // TODO: Replace with real Vimeo/Wistia embed using videoId
  // Example: <iframe src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`} ... />

  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-center eyebrow text-[color:var(--muted-fg)] mb-4">{label}</p>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${label}`}
        className="group relative block w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(26,18,9,0.35)] focus:outline-none focus:ring-2 focus:ring-[color:var(--rose)] focus:ring-offset-4 focus:ring-offset-[color:var(--background)]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          data-video-id={videoId}
        />
        <div className="absolute inset-0 bg-[color:var(--ink)]/25 transition-colors group-hover:bg-[color:var(--ink)]/15" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-[color:var(--cream)]/95 shadow-lg transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[color:var(--wine)]" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {playing && (
          <div className="absolute inset-0 grid place-items-center bg-[color:var(--ink)]/60 text-[color:var(--cream)] text-sm">
            {/* TODO: embed player here */}
            Video player loads here
          </div>
        )}
      </button>
      <p className="mt-3 text-center text-xs tracking-wide text-[color:var(--muted-fg)]">Click to unmute</p>
    </div>
  );
}
