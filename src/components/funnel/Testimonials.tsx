export interface TestimonialItem { src: string; alt: string }

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  if (!items.length) return null;
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <figure key={item.src} className="overflow-hidden rounded-card bg-pure-white p-3 shadow-xl"><img src={item.src} alt={item.alt} loading="lazy" className="h-auto w-full rounded-input" /></figure>)}</div>;
}