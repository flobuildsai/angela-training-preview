interface LogoItem { src: string; alt: string }

export function LogoRow({ logos }: { logos: LogoItem[] }) {
  if (!logos.length) return null;
  const mobileLogos = [...logos, ...logos];
  return (
    <div className="overflow-hidden" aria-label="Bekannt aus">
      <div className="hidden grid-cols-2 items-center gap-8 sm:grid md:grid-cols-4">
        {logos.map((logo) => <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy" className="mx-auto max-h-9 max-w-36 grayscale" />)}
      </div>
      <div className="logo-marquee flex w-max items-center gap-12 sm:hidden">
        {mobileLogos.map((logo, index) => <img key={`${logo.src}-${index}`} src={logo.src} alt={index < logos.length ? logo.alt : ""} loading="lazy" className="max-h-8 w-32 object-contain grayscale" />)}
      </div>
    </div>
  );
}