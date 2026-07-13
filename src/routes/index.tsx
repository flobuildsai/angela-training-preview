import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mentorImg from "@/assets/mentor.jpg";
import avatarImg from "@/assets/avatar.jpg";
import opportunityImg from "@/assets/opportunity.jpg";

export const Route = createFileRoute("/")({
  component: TrainingPage,
});

function CTAButton({ label = "Register for free" }: { label?: string }) {
  return (
    <a
      href="#register"
      className="group inline-flex items-center gap-3 rounded-full bg-primary pl-7 pr-2 py-2 text-primary-foreground text-sm font-medium transition-all hover:gap-4 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
    >
      <span>{label}</span>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-cream transition-transform group-hover:rotate-[-15deg]">
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow flex items-center justify-center gap-3 ${light ? "text-cream/80" : "text-foreground/60"}`}>
      <span className="h-px w-6 bg-current opacity-60" />
      <span>{children}</span>
      <span className="h-px w-6 bg-current opacity-60" />
    </div>
  );
}

function TrainingPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-ink text-cream">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <a href="#" className="serif-italic text-lg tracking-tight">Angela Giakas</a>
          <a href="#" className="text-xs tracking-widest uppercase opacity-80 hover:opacity-100">Cart (0)</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden pt-16">
        <img
          src={heroImg}
          alt="Angela on the beach at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/50 to-ink/70" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center text-cream">
          <Eyebrow light>Free Training</Eyebrow>
          <h1 className="mt-8 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight">
            Build your <span className="serif-italic underline decoration-[1.5px] underline-offset-[10px]">personal brand</span> &amp; turn your content into cash
          </h1>
          <h2 className="mt-8 text-xl sm:text-2xl font-medium tracking-tight max-w-2xl">
            Grow your audience. Monetize your brand. Create freedom.
          </h2>
          <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-cream/80">
            In this free 30 minute training, I'll walk you through the creator business blueprint I used to grow my audience, monetise my content and build a business around my personal brand.
          </p>
          <div className="mt-10">
            <CTAButton />
          </div>
          <div className="mt-14 flex items-center gap-3 text-cream/90">
            <img src={avatarImg} alt="Angela Giakas" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-cream/40" />
            <span className="serif-italic text-lg">Angela Giakas</span>
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <section className="relative bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-16 px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src={opportunityImg} alt="Creator lifestyle" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="eyebrow text-foreground/60">— The opportunity</div>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              The new career path starts <span className="serif-italic">online.</span>
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
              <p>We're living in a time where your ideas, skills, story, and perspective can become the foundation of a real business.</p>
              <p>Creators are no longer just posting content. They're building personal brands, launching offers, landing paid partnerships, creating digital products, and turning their knowledge into income.</p>
              <p className="text-ink">But the opportunity isn't just in being seen. <strong className="font-semibold">It's in becoming trusted.</strong></p>
              <p>In this training, I'll show you how to build the kind of personal brand that grows your audience, opens doors, and creates real income.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-ink text-cream py-6 overflow-hidden border-y border-cream/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 pr-6 shrink-0">
              {Array.from({ length: 12 }).map((_, j) => (
                <div key={j} className="flex items-center gap-6">
                  <span className="serif-italic text-3xl md:text-5xl">Free Masterclass</span>
                  <span className="text-2xl opacity-60">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow text-foreground/60">— What you'll learn</div>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              In just 30 mins, you'll learn how to <span className="serif-italic">…</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 rounded-sm overflow-hidden border border-border">
            {[
              { n: "01", t: "Become the niche", d: "Combine your passions with strategy so you stay human and can evolve over time." },
              { n: "02", t: "Master short-form content", d: "Learn how to improve hooks, value, quality, and get more views for your content." },
              { n: "03", t: "Create a digital course", d: "Start selling your skills and generate income from anywhere, without trading time." },
              { n: "04", t: "Multiple income streams", d: "Build your creator ecosystem, attract brand deals, UGC, and affiliate opportunities." },
            ].map((item) => (
              <div key={item.n} className="bg-cream p-8 md:p-12">
                <div className="serif-italic text-4xl md:text-5xl text-foreground/40">{item.n}</div>
                <h3 className="mt-6 text-2xl md:text-3xl">{item.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-md">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Meet your mentor */}
      <section className="bg-ink text-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-16 px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm order-2 md:order-1">
            <img src={mentorImg} alt="Angela Giakas" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 md:order-2">
            <div className="eyebrow text-cream/70">— Meet your mentor</div>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              Hi, I'm <span className="serif-italic">Angela.</span>
            </h2>
            <p className="mt-6 serif-italic text-2xl text-cream/90">I built this for you.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-cream/75 max-w-lg">
              <p>I'm the founder of <span className="underline underline-offset-4">The Art of Influence</span>. I've built a multiple 7-figure career as a creator and helped over 4,000 women do the same. My mission is to empower women to unlock their potential and turn their passion into profit.</p>
              <p>I'm here to guide you through every step of building a thriving online business that not only brings in revenue but also brings you freedom and fulfilment.</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {[
                { s: "7 figure", l: "Creator business" },
                { s: "4k+", l: "Women mentored" },
                { s: "800k+", l: "Combined audience" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="serif-italic text-3xl md:text-4xl">{s.s}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-cream/60">{s.l}</div>
                </div>
              ))}
            </div>

            <p className="mt-10 serif-italic text-xl text-cream/90">Now I'm here to help you do the same.</p>
            <div className="mt-8">
              <CTAButton />
            </div>
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section id="register" className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Eyebrow>Save your seat</Eyebrow>
          <h2 className="mt-8 text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
            Ready to <span className="serif-italic">begin?</span>
          </h2>
          <p className="mt-6 text-muted-foreground">Register free and get instant access to the training.</p>
          <form className="mt-10 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-background px-6 py-4 text-sm outline-none focus:border-ink"
            />
            <button className="rounded-full bg-ink px-8 py-4 text-sm text-cream font-medium hover:opacity-90">
              Register free
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-ink text-cream/70 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-widest md:flex-row">
          <span className="serif-italic text-base normal-case tracking-tight text-cream">Angela Giakas</span>
          <span>© {new Date().getFullYear()} — All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
