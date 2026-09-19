interface VimeoEmbedProps {
  id?: string;
  title?: string;
}

export function VimeoEmbed({ id, title = "Video" }: VimeoEmbedProps) {
  if (!id?.trim()) {
    return (
      <div className="grid aspect-video w-full place-items-center rounded-card border border-fog bg-cream-paper text-caption font-medium text-slate">
        Video folgt
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-card bg-pressed-graphite shadow-xl">
      <iframe
        src={`https://player.vimeo.com/video/${encodeURIComponent(id)}?dnt=1&title=0&byline=0&portrait=0`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}