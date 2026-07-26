import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { VideoBlock } from "@/components/VideoBlock";
import heroImg from "@/assets/cs-hero.jpg";
import portraitImg from "@/assets/cs-portrait.jpg";
import workImg from "@/assets/cs-work.jpg";
import palmImg from "@/assets/cs-palm.jpg";
import interiorImg from "@/assets/cs-interior.jpg";
import streetImg from "@/assets/cs-street.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ─────────────────────────────────────────────────────────────
// SOCIAL PROOF — keep empty until we have verified real results.
// The Proof section renders only when results.length > 0.
// ─────────────────────────────────────────────────────────────
type Result = { metric: string; label: string; name: string; handle: string };
type Testimonial = { quote: string; name: string; handle: string };

const results: Result[] = [];
const testimonials: Testimonial[] = [];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
      setPastHero(y > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { progress, pastHero };
}

function Marquee() {
  const items = ["CREATING SOCIETY", "ATTENTION INTO INCOME", "BUILD WHAT'S YOURS", "EST. 2026"];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-border py-5 overflow-hidden bg-background">
      <div className="flex w-max whitespace-nowrap animate-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="mx-8 text-muted-foreground text-[10px] uppercase tracking-[0.4em]">
            {t} <span className="mx-8 text-muted-foreground/50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StickyHeader({ solid }: { solid: boolean }) {
  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-40 transition-all duration-500 " +
        (solid
          ? "bg-background/80 backdrop-blur-xl border-b border-border text-foreground"
          : "bg-transparent text-foreground")
      }
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl">
          Creating <span className="font-serif-italic">Society</span>
        </Link>
        <nav className="flex items-center gap-6">
          <a href="#system" className="hidden md:inline text-[10px] uppercase tracking-[0.28em] opacity-70 hover:opacity-100 transition">The System</a>
          <a href="#pricing" className="hidden md:inline text-[10px] uppercase tracking-[0.28em] opacity-70 hover:opacity-100 transition">Pricing</a>
          <a href="#faq" className="hidden md:inline text-[10px] uppercase tracking-[0.28em] opacity-70 hover:opacity-100 transition">FAQ</a>
          <a
            href="#pricing"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.22em] bg-foreground text-background hover:opacity-90 transition"
          >
            <span className="hidden sm:inline">Get Access —&nbsp;</span>$697
          </a>
        </nav>
      </div>
    </header>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-px bg-transparent pointer-events-none">
      <div className="h-full bg-foreground transition-[width] duration-75" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

function MobileStickyCTA({ visible }: { visible: boolean }) {
  return (
    <div
      className={
        "md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border transition-transform duration-300 " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between px-4 pt-3 gap-4">
        <div className="min-w-0">
          <div className="text-[10px] text-muted-foreground line-through leading-none">$997</div>
          <div className="font-serif text-2xl leading-tight text-foreground">$697</div>
        </div>
        <Link
          to="/checkout"
          className="shrink-0 inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.22em] hover:opacity-90 transition"
        >
          Get Access
        </Link>
      </div>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.38em] text-muted-foreground">{children}</p>;
}

function HomePage() {
  useReveal();
  const { progress, pastHero } = useScrollState();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress progress={progress} />
      <StickyHeader solid={pastHero} />

      {/* HERO — cinematic full-bleed */}
      <section aria-labelledby="hero-heading" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background" />

        {/* Top row inside hero */}
        <div className="absolute inset-x-0 top-0 z-10 pt-24 sm:pt-28">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-foreground/75">
            <span>Creating Society</span>
            <span>Est. 2026</span>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1
            id="hero-heading"
            className="animate-fade-up font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95] max-w-4xl mx-auto"
          >
            Everyone teaches you how to get views.
            <span className="font-serif-italic block text-foreground/70 mt-2">We show you how to turn them into a business.</span>
          </h1>
          <p className="animate-fade-up mt-8 text-sm sm:text-base text-foreground/70 max-w-xl leading-relaxed" style={{ animationDelay: ".15s" }}>
            Your own digital product. Your own audience. Your own business.
          </p>
          <a
            href="#pricing"
            className="animate-fade-up mt-10 inline-flex items-center px-8 py-4 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-90 transition"
            style={{ animationDelay: ".25s" }}
          >
            Get Instant Access
          </a>
          <p className="animate-fade-up mt-4 text-[10px] uppercase tracking-[0.28em] text-foreground/50" style={{ animationDelay: ".3s" }}>
            Instant access · Lifetime · 30-day guarantee
          </p>

          {/* stats row */}
          <ul className="animate-fade-up mt-12 flex items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-foreground/60" style={{ animationDelay: ".35s" }}>
            <li>Four Phases</li>
            <li className="h-4 w-px bg-foreground/20" aria-hidden="true" />
            <li>12 Weeks</li>
            <li className="h-4 w-px bg-foreground/20" aria-hidden="true" />
            <li>Lifetime Access</li>
          </ul>
        </div>

        {/* scroll indicator */}
        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-foreground/60">
          <span className="text-[10px] uppercase tracking-[0.38em]">Scroll</span>
          <span className="block w-px animate-scroll-line bg-foreground/50" />
        </div>
      </section>

      {/* VIDEO 1 */}
      <section aria-label="Introduction video" className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <VideoBlock videoId="hero-1" label="Video 1 · Start here" />
        </div>
      </section>

      <Marquee />

      {/* 01 — PROBLEM */}
      <section aria-labelledby="problem-heading" className="bg-background pt-28 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv"><SectionEyebrow>01 — The Problem</SectionEyebrow></div>
          <div className="mt-10 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="rv md:col-span-5">
              <div className="overflow-hidden rounded-md aspect-[4/5] bg-muted">
                <img src={portraitImg} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="rv d1 md:col-span-7 md:pt-4">
              <h2 id="problem-heading" className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
                You don't have a reach problem.
                <span className="font-serif-italic block text-muted-foreground mt-2">You have an offer problem.</span>
              </h2>
              <div className="mt-10 space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <p>You post. It performs. Sometimes it really performs — thousands of views, saves, shares, new followers.</p>
                <p>Then the month ends, you check your account, and nothing has changed.</p>
                <p>Here is what nobody tells you: views are not a business. Views are traffic. And traffic without something to sell is just noise that costs you your evenings.</p>
                <p>The creators making real money are not more talented than you. Plenty of them get fewer views than you. They just had something to sell when the attention showed up.</p>
              </div>
              <div className="mt-10 border-t border-border pt-8">
                <blockquote className="font-serif-italic text-2xl sm:text-3xl text-foreground leading-snug">
                  I was getting three million views a month and making almost nothing from them. That number didn't change my life. What I built behind it did.
                </blockquote>
                <div className="mt-8 border-b border-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — COMPARISON */}
      <section aria-labelledby="difference-heading" className="bg-background py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv"><SectionEyebrow>02 — The Difference</SectionEyebrow></div>
          <div className="rv d1 mt-8 max-w-3xl">
            <h2 id="difference-heading" className="font-serif text-3xl sm:text-5xl leading-none">
              Three ways to make money with content.
              <span className="font-serif-italic block text-muted-foreground mt-2">Only one of them is yours.</span>
            </h2>
          </div>

          {/* Desktop table */}
          <div className="rv d2 mt-14 hidden md:block overflow-hidden rounded-md border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 font-normal w-1/4"></th>
                  <th className="p-5 font-normal text-[10px] uppercase tracking-[0.38em] text-muted-foreground">Reach courses</th>
                  <th className="p-5 font-normal text-[10px] uppercase tracking-[0.38em] text-muted-foreground">Resell programs</th>
                  <th className="p-5 font-serif text-base text-foreground border-l border-foreground/30 bg-foreground/[0.04]">Creating Society</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {[
                  ["What you learn", "How to get more views", "How to sell someone else's product", "How to build and sell your own"],
                  ["What you own at the end", "Nothing", "Nothing", "Your product, your audience, your list"],
                  ["Who you compete with", "Everyone using the same hooks", "100,000 people with an identical sales page", "Nobody"],
                  ["How you get paid", "If a brand notices you", "A cut — until the market saturates", "Directly, every time someone buys"],
                  ["If you stop posting", "It ends", "It ends", "The product keeps selling"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-0 align-top">
                    <td className="p-5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{row[0]}</td>
                    <td className="p-5 text-muted-foreground">{row[1]}</td>
                    <td className="p-5 text-muted-foreground">{row[2]}</td>
                    <td className="p-5 border-l border-foreground/30 bg-foreground/[0.04] text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="rv d2 mt-10 md:hidden space-y-4">
            {[
              { title: "Reach courses", elevated: false, rows: [
                ["What you learn", "How to get more views"],
                ["What you own", "Nothing"],
                ["Who you compete with", "Everyone using the same hooks"],
                ["How you get paid", "If a brand notices you"],
                ["If you stop posting", "It ends"],
              ]},
              { title: "Resell programs", elevated: false, rows: [
                ["What you learn", "How to sell someone else's product"],
                ["What you own", "Nothing"],
                ["Who you compete with", "100,000 people with an identical sales page"],
                ["How you get paid", "A cut — until the market saturates"],
                ["If you stop posting", "It ends"],
              ]},
              { title: "Creating Society", elevated: true, rows: [
                ["What you learn", "How to build and sell your own"],
                ["What you own", "Your product, your audience, your list"],
                ["Who you compete with", "Nobody"],
                ["How you get paid", "Directly, every time someone buys"],
                ["If you stop posting", "The product keeps selling"],
              ]},
            ].map((c) => (
              <div
                key={c.title}
                className={
                  "rounded-md p-6 bg-card " +
                  (c.elevated ? "border border-foreground/30" : "border border-border")
                }
              >
                <h3 className={"font-serif text-2xl " + (c.elevated ? "text-foreground" : "text-muted-foreground")}>{c.title}</h3>
                <dl className="mt-4 space-y-3">
                  {c.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 text-sm text-foreground/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="rv d3 mt-10 text-center font-serif-italic text-xl text-foreground/80">
            This is the entire reason Creating Society exists.
          </p>
        </div>
      </section>

      {/* VIDEO 2 */}
      <section aria-labelledby="breakdown-heading" className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rv"><SectionEyebrow>The full breakdown</SectionEyebrow></div>
          <h2 id="breakdown-heading" className="rv d1 mt-5 font-serif text-3xl sm:text-5xl leading-none">
            How this actually works
          </h2>
          <p className="rv d2 mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The four phases, what you build in each one, and why this is different from every content course you've seen.
          </p>
          <div className="rv d3 mt-12">
            <VideoBlock videoId="breakdown-2" label="Video 2 · The full breakdown" />
          </div>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section aria-labelledby="forwho-heading" className="bg-background pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="forwho-heading" className="rv font-serif text-3xl sm:text-5xl leading-none max-w-2xl">
            Let's be specific about
            <span className="font-serif-italic block text-muted-foreground mt-2">who this is for.</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rv d1 rounded-md bg-card p-8 sm:p-10 border border-border border-t-foreground/60">
              <h3 className="font-serif text-2xl">This is for you if:</h3>
              <ul className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
                {[
                  "You're creating content and getting views, but none of it turns into income",
                  "You're starting from zero and want a business, not a hobby",
                  "You want something that is yours — not brand deals, not a course someone else wrote",
                  "You'd rather build one real offer than post five times a day forever",
                  "You can commit 5–10 focused hours a week",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv d2 rounded-md bg-card p-8 sm:p-10 border border-border">
              <h3 className="font-serif text-2xl text-muted-foreground">This is not for you if:</h3>
              <ul className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {[
                  "You want money without building anything",
                  "You're looking for a done-for-you product to resell",
                  "You want to be famous more than you want to be paid",
                  "You need someone to motivate you every morning",
                  "You expect this to work in two weeks",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02b — THE SOCIETY SYSTEM */}
      <section id="system" aria-labelledby="system-heading" className="bg-background py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv"><SectionEyebrow>02 — The System</SectionEyebrow></div>
          <div className="rv d1 mt-8 max-w-3xl">
            <h2 id="system-heading" className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
              Four phases.
              <span className="font-serif-italic block text-muted-foreground mt-2">One outcome.</span>
            </h2>
            <p className="mt-8 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Everyone else starts at phase two and stops there. That's why their students end up with an audience and an empty bank account.
            </p>
          </div>

          {/* Wide editorial image */}
          <div className="rv d2 mt-16 overflow-hidden rounded-md">
            <img src={workImg} alt="" loading="lazy" className="w-full h-[420px] sm:h-[520px] object-cover" />
          </div>

          <div className="mt-16 border-t border-border">
            {[
              {
                n: "01", name: "Position",
                tag: "What you stand for, and what someone will pay for.",
                items: [
                  "The 12-Month Gap: you don't need to be an expert, you need to be twelve months ahead of the woman you're helping",
                  "Find your niche without locking yourself in a cage",
                  "Turn a topic into a sellable outcome — the step everyone skips",
                  "Choose your model: with your face, or without it",
                ],
                out: "You leave with one sentence: who you help, and with what.",
              },
              {
                n: "02", name: "Attention",
                tag: "The right thousand people. Not the most people.",
                items: [
                  "How reach actually works now: interest-based, not follower-based",
                  "Trial Reels: test on strangers before your audience ever sees it",
                  "Hook frameworks and the vault of hooks that work",
                  "Story sequences that sell daily — even at 300 views",
                  "Batch production for women with a job",
                ],
                out: "You leave with a weekly rhythm that produces qualified attention.",
              },
              {
                n: "03", name: "Offer",
                tag: "Your product in days, not months.",
                items: [
                  "What to build first, and what to never build first",
                  "Sell it before you make it — the pre-sale method that kills the build-forever trap",
                  "Pricing and stacking so it's an obvious yes",
                  "Recording, hosting, delivering — without the tech spiral",
                ],
                out: "You leave with a finished, priced offer.",
              },
              {
                n: "04", name: "Convert",
                tag: "From attention to revenue.",
                items: [
                  "Selling inside your content without sounding like an ad",
                  "DMs, stories, comment triggers, automations",
                  "The simple evergreen funnel: free thing → email → offer",
                  "First clients → their results → your next clients",
                ],
                out: "You leave with repeatable sales.",
              },
            ].map((p) => (
              <div key={p.n} className="rv border-b border-border py-10 sm:py-14 grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">
                <div className="min-w-[80px]">
                  <div className="font-serif-italic text-sm text-muted-foreground">{p.n}</div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl sm:text-4xl">{p.name}</h3>
                  <p className="mt-3 font-serif-italic text-lg sm:text-xl text-muted-foreground">{p.tag}</p>
                  <ul className="mt-6 space-y-3 text-sm sm:text-base leading-relaxed text-foreground/85 max-w-2xl">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{p.out}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 WEEKS TIMELINE */}
      <section aria-labelledby="weeks-heading" className="bg-background py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv overflow-hidden rounded-md">
            <img src={streetImg} alt="" loading="lazy" className="w-full h-[280px] sm:h-[380px] object-cover" />
          </div>
          <div className="rv d1 mt-14 max-w-3xl">
            <SectionEyebrow>What this looks like in practice</SectionEyebrow>
            <h2 id="weeks-heading" className="mt-5 font-serif text-3xl sm:text-5xl leading-none">
              Twelve weeks,
              <span className="font-serif-italic block text-muted-foreground mt-2">if you actually do it.</span>
            </h2>
          </div>

          <div className="mt-14 relative">
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-border" aria-hidden="true" />
            <ol className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
              {[
                { w: "Week 1–2", name: "Position", body: "You'll know exactly who you help and what you're selling. Most people never get this far, which is why most people never get paid." },
                { w: "Week 3–6", name: "Attention", body: "A content rhythm that brings in the right people instead of the most people. Tested, not guessed." },
                { w: "Week 7–9", name: "Offer", body: "Your product exists. Priced, positioned, and sold before it was even finished." },
                { w: "Week 10–12", name: "Convert", body: "Your first sales. Then the second. Then a system that doesn't depend on you posting forever." },
              ].map((n, i) => (
                <li key={n.w} className="rv relative" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background font-serif text-lg relative z-10">
                    {i + 1}
                  </div>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{n.w}</p>
                  <h3 className="mt-2 font-serif text-2xl">{n.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="rv d2 mt-14 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Twelve weeks is the pace if you give it five to ten focused hours a week. Give it less and it takes longer — that's just true.
          </p>
        </div>
      </section>

      {/* 03 — PROOF (guarded) */}
      {results.length > 0 && (
        <section aria-labelledby="proof-heading" className="bg-background py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rv"><SectionEyebrow>03 — The Proof</SectionEyebrow></div>
            <h2 id="proof-heading" className="rv d1 mt-8 font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95] max-w-3xl">
              Receipts,
              <span className="font-serif-italic block text-muted-foreground mt-2">not promises.</span>
            </h2>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((r) => (
                <div key={r.name + r.metric} className="rv rounded-md bg-card p-8 border border-border">
                  <div className="font-serif text-6xl leading-none">{r.metric}</div>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{r.label}</div>
                  <div className="mt-6 pt-5 border-t border-border text-sm">
                    <div>{r.name}</div>
                    <div className="text-muted-foreground text-xs mt-1">{r.handle}</div>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length > 0 && (
              <div className="mt-10 grid md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <figure key={t.name + t.quote.slice(0, 20)} className="rv rounded-md bg-card p-8 border border-border">
                    <blockquote className="font-serif-italic text-xl leading-snug">{t.quote}</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border text-sm">
                      <div>{t.name}</div>
                      <div className="text-muted-foreground text-xs mt-1">{t.handle}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* EVERYTHING YOU GET */}
      <section aria-labelledby="inside-heading" className="bg-background py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv"><SectionEyebrow>What's inside</SectionEyebrow></div>
          <h2 id="inside-heading" className="rv d1 mt-5 font-serif text-3xl sm:text-5xl leading-none max-w-3xl">
            Everything you get,
            <span className="font-serif-italic block text-muted-foreground mt-2">in three parts.</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              { label: "The System", items: [
                ["The Society System", "four phases, 40+ lessons, in the order that actually works"],
                ["The Faceless Track", "the entire system without ever showing your face"],
                ["The 12-week roadmap", "what to do each week, so you never open the app wondering where to start"],
              ]},
              { label: "The Support", items: [
                ["Direct feedback from Laura", "on your positioning, your content and your offer"],
                ["The private community", "women building the same thing at the same time"],
                ["Live monthly Q&A", "bring the thing you're stuck on"],
              ]},
              { label: "The Tools", items: [
                ["The Template Vault", "hook frameworks, reel scripts, sales page, email sequences, pricing calculators"],
                ["Society AI", "trained on our frameworks, so it answers like us instead of like ChatGPT"],
                ["Lifetime access", "every future update, no subscription"],
              ]},
            ].map((cluster) => (
              <div key={cluster.label} className="rv">
                <SectionEyebrow>{cluster.label}</SectionEyebrow>
                <ul className="mt-6 border-t border-border">
                  {cluster.items.map(([title, desc]) => (
                    <li key={title} className="py-5 border-b border-border">
                      <h3 className="font-serif text-xl">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Editorial image pair */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { src: interiorImg, caption: "The work" },
              { src: palmImg, caption: "The life it pays for" },
            ].map((tile) => (
              <figure key={tile.caption} className="rv group">
                <div className="overflow-hidden rounded-md aspect-[4/5] bg-muted">
                  <img
                    src={tile.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4 font-serif-italic text-lg text-muted-foreground">{tile.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section aria-labelledby="guarantee-heading" className="bg-background py-6">
        <div className="mx-auto max-w-[640px] px-6">
          <div className="bg-card border-y border-border py-16 text-center">
            <h2 id="guarantee-heading" className="rv font-serif text-3xl sm:text-4xl leading-none">
              The guarantee,
              <span className="font-serif-italic block text-muted-foreground mt-2">in plain English.</span>
            </h2>
            <div className="rv d1 mt-8 space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed px-6">
              <p>I'm not going to promise you a number. Anyone promising you a specific income is either lying or hasn't done this long enough to know better.</p>
              <p>Here is what I will promise. Go through the system, do the work, show up in the community. If within 30 days you don't have more clarity and a clearer path than anything else you've bought, email us and we'll refund you. No forms. No interrogation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — VIDEO 3 + PRICING */}
      <section id="pricing" aria-labelledby="pricing-heading" className="bg-background py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rv"><SectionEyebrow>04 — The Offer</SectionEyebrow></div>
          <div className="rv d1 mt-8 max-w-3xl">
            <h2 id="pricing-heading" className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
              Watch this, then
              <span className="font-serif-italic block text-muted-foreground mt-2">choose your level.</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-xl">
              Two ways in. Both priced in public, on this page, right now.
            </p>
          </div>
          <div className="rv d2 mt-12">
            <VideoBlock videoId="pricing-3" label="Video 3 · Watch before joining" />
          </div>

          <div className="mt-20 grid lg:grid-cols-[1.15fr_1fr] gap-6 items-start">
            {/* Card A */}
            <div className="rv relative rounded-2xl bg-card p-8 sm:p-10 border border-border flex flex-col">
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.28em] bg-foreground text-background">
                  Most popular
                </span>
              </div>
              <h3 className="font-serif text-3xl">Creating Society</h3>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-muted-foreground line-through">$997</span>
                <span className="font-serif text-7xl leading-none">$697</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">or 3 × $249</p>
              <p className="mt-3 text-sm text-foreground/80">One-time payment. Lifetime access. No subscription.</p>
              <ul className="mt-6 space-y-3 text-sm sm:text-base text-foreground/85 flex-1">
                {[
                  "Lifetime access to The Society System",
                  "The private community",
                  "Direct feedback from Laura",
                  "The Template Vault",
                  "The Faceless Track",
                  "Society AI",
                  "All future updates",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/checkout"
                className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-90 transition"
              >
                Get Instant Access
              </Link>
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {["30-day guarantee", "Secure checkout", "Instant access", "One payment"].map((t, i, a) => (
                  <li key={t} className="flex items-center gap-3">
                    <span>{t}</span>
                    {i < a.length - 1 && <span className="h-3 w-px bg-border" />}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Prices in USD · Payment plans at checkout
              </p>
            </div>

            {/* Card B */}
            <div className="rv d1 rounded-2xl bg-card p-8 border border-border flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-2xl">The Inner Circle</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] border border-border text-muted-foreground">
                  By application
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-serif text-5xl">$3,997</span>
                <span className="text-xs text-muted-foreground">or 3 × $1,497</span>
              </div>
              <p className="mt-3 font-serif-italic text-muted-foreground">
                12 weeks. Small cohort. We build your offer with you.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground flex-1">
                {[
                  "Everything in Creating Society",
                  "Weekly live strategy calls",
                  "1:1 onboarding and offer build with Laura",
                  "Done-with-you positioning, product and launch",
                  "Private channel, direct access",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-4 border-t border-border font-serif-italic text-foreground/80 text-sm">
                You leave with a finished digital product and your first paying clients.
              </p>
              <Link
                to="/apply"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full border border-border text-foreground text-[10px] uppercase tracking-[0.28em] hover:bg-foreground/5 transition"
              >
                Apply now
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Prices in USD · Payment plans at checkout
              </p>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No hidden upsells. No closer on the phone.
          </p>
        </div>
      </section>

      {/* LAURA'S STORY */}
      <section aria-labelledby="story-heading" className="bg-background py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rv"><SectionEyebrow>The founder</SectionEyebrow></div>
          <h2 id="story-heading" className="rv d1 mt-5 font-serif text-4xl sm:text-6xl leading-[0.95] max-w-3xl">
            Hi, I'm
            <span className="font-serif-italic block text-muted-foreground mt-2">Laura.</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rv relative">
              <div className="overflow-hidden rounded-md aspect-[4/5]">
                <img src={portraitImg} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-md" />
            </div>
            <div className="rv d1 space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>Right now my Instagram does around three million views a month. I live between Marbella and Dubai. From the outside it looks like exactly the thing everyone online is trying to build.</p>
              <p className="font-serif-italic text-foreground text-lg">Here's the part I don't usually post.</p>
              <p>For a long time that number meant nothing. Three million people watched my content every month and I made almost nothing from it. Brand deals took weeks to negotiate and paid once. My following grew while my bank account didn't. By every metric people talk about online I was winning — and I was broke in a very well-decorated way.</p>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rv order-2 md:order-1 space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>The uncomfortable truth was that I had built an audience without building a business. Those are two different things, and nobody says it out loud because grow your followers is much easier to sell than build something worth selling.</p>
              <p>So I stopped optimising for views and started building the thing underneath. I worked out what I could actually help someone with. I built one offer. I sold it before I had finished making it. And in the first month it worked, I made more from one product than a year of brand deals had paid me.</p>
              <p>Nothing about my content changed dramatically. What changed is that there was finally something on the other side of the attention.</p>
            </div>
            <div className="rv d1 order-1 md:order-2 relative">
              <div className="overflow-hidden rounded-md aspect-[4/5]">
                <img src={interiorImg} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-md" />
            </div>
          </div>

          <div className="rv mt-14 max-w-2xl mx-auto text-center space-y-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p className="font-serif-italic text-xl text-foreground">That's the whole thing. That's what Creating Society is.</p>
            <p>I won't tell you it's easy, fast or passive. It's a business, and businesses take work. But it's work that compounds — unlike posting every day forever and hoping a brand notices you.</p>
            <p>If you have attention and nothing behind it, or you're starting from zero and want to do it properly this time, you're in the right place.</p>
            <p className="font-serif-italic text-lg text-foreground">— Laura</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-background py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 id="faq-heading" className="rv font-serif text-3xl sm:text-5xl leading-none text-center">
            The things you're
            <span className="font-serif-italic block text-muted-foreground mt-2">actually wondering.</span>
          </h2>
          <div className="rv d1 mt-12">
            <Accordion type="single" collapsible className="w-full">
              {[
                ["I have no followers. Will this work?", "Yes, and this is the most common misunderstanding about how the platform works now. Reach is interest-based, not follower-based — Reels are shown primarily to people who don't follow you. Trial Reels let you test content on strangers before your own audience sees it. You are not starting behind. You're starting clean."],
                ["I don't want to show my face.", "Then don't. The Faceless Track runs through the entire system as a parallel path — voice, writing, visuals, structure. What you cannot skip is having a real brand and a real offer. Anonymous doesn't mean generic."],
                ["I don't have anything to teach.", "Almost everyone says this, and almost everyone is wrong. You don't need to be the best in the world at something. You need to be twelve months ahead of the person who wants to get where you are. Phase One exists entirely to find that thing."],
                ["Is this one of those courses where I resell the course?", "No — and this is the clearest line between us and most of what you've seen. You build your own product. It belongs to you. You are not competing with a hundred thousand women selling the identical thing off an identical sales page."],
                ["I work full time. Do I have enough time?", "The system is built around batching and focused hours, not constant posting. Five to ten hours a week is enough to make real progress. Less than that and you'll be slower — that's honest, not a sales pitch."],
                ["How do I know this isn't another program that goes nowhere?", "You don't, until you're inside — which is why there's a 30-day guarantee with no conditions attached. What I can tell you is why most programs go nowhere: they teach reach and stop. You end up better at content and no closer to income."],
                ["How long do I have access?", "Forever, including every update. One payment, no subscription."],
                ["What if I want more support?", "That's The Inner Circle. Twelve weeks, small group, we build it with you. Apply and we'll talk honestly about whether it's the right moment for you."],
              ].map(([q, a], i) => (
                <AccordionItem key={q} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left font-serif text-lg sm:text-xl hover:no-underline py-6">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-6">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* SECONDARY CAPTURE */}
      <SecondaryCapture />

      {/* PS */}
      <section aria-labelledby="ps-heading" className="relative overflow-hidden bg-background py-32">
        <img src={palmImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-[640px] px-6">
          <h2 id="ps-heading" className="sr-only">A note from Laura</h2>
          <div className="rv space-y-5 leading-relaxed text-muted-foreground text-sm sm:text-base">
            <p className="font-serif-italic text-2xl text-foreground">P.S.</p>
            <p>If you scrolled this far, you're probably wondering why this is $697 and not $3,000.</p>
            <p>Fair question. Honest answer: I could charge more. Programs with less inside charge four figures and sell them on a call with someone who won't let you off the phone.</p>
            <p>I don't want to build that business. I want a lot of women inside this, building real things — because the ones who succeed become the proof that this works, and some of them will eventually want to work with me directly in The Inner Circle. That's where the deeper work happens, and it's priced accordingly.</p>
            <p>So this is priced to be a decision you can make on your own, tonight, without a phone call.</p>
            <p className="font-serif-italic text-foreground">If you win, I win. That's the whole model.</p>
            <p className="font-serif-italic">See you inside. — Laura</p>
          </div>
          <div className="rv d1 mt-10 text-center">
            <Link
              to="/checkout"
              className="inline-flex items-center px-8 py-4 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-90 transition"
            >
              Get Instant Access
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-14 pb-32 md:pb-14 text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-[1fr_auto] items-center">
          <div>
            <div className="font-serif text-xl text-foreground">
              Creating <span className="font-serif-italic">Society</span>
            </div>
            <p className="mt-2 text-xs">© 2026 Creating Society. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.28em]">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-8 pt-6 border-t border-border">
          <p className="text-xs leading-relaxed max-w-3xl">
            Results are not guaranteed and vary based on individual effort, experience and market conditions. Any figures shown are examples, not a promise of earnings.
          </p>
        </div>
      </footer>

      <MobileStickyCTA visible={pastHero} />
    </main>
  );
}

function SecondaryCapture() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST { email } to real endpoint
    setSent(true);
  };

  return (
    <section aria-labelledby="blueprint-heading" className="bg-background py-20">
      <div className="mx-auto max-w-xl px-6 text-center bg-card border border-border rounded-2xl py-16">
        <div className="rv"><SectionEyebrow>Not ready yet?</SectionEyebrow></div>
        <h2 id="blueprint-heading" className="rv d1 mt-4 font-serif text-3xl sm:text-4xl leading-none">
          Take the
          <span className="font-serif-italic block text-muted-foreground mt-1">one-page version.</span>
        </h2>
        <p className="rv d2 mt-5 text-sm text-muted-foreground leading-relaxed px-6">
          The Attention-to-Income Blueprint — the whole system on a single page, so you can see whether it makes sense for you before you spend anything.
        </p>

        {sent ? (
          <p className="rv d3 mt-8 font-serif-italic text-2xl text-foreground">Check your inbox.</p>
        ) : (
          <form onSubmit={submit} className="rv d3 mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-6">
            <label htmlFor="blueprint-email" className="sr-only">Email address</label>
            <input
              id="blueprint-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground/60 text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.28em] hover:opacity-90 transition"
            >
              Send it to me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
