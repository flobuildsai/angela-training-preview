import { useState } from "react";
import posterImg from "@/assets/cs-video-poster.jpg";

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
      <p className="text-center text-[10px] uppercase tracking-[0.38em] text-muted-foreground mb-4">{label}</p>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${label}`}
        className="group relative block w-full overflow-hidden rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          data-video-id={videoId}
        />
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/25" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full border border-foreground/60 bg-black/20 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-foreground" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {playing && (
          <div className="absolute inset-0 grid place-items-center bg-black/75 text-foreground text-sm">
            {/* TODO: embed player here */}
            Video player loads here
          </div>
        )}
      </button>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.38em] text-muted-foreground/60">Click to unmute</p>
    </div>
  );
}
