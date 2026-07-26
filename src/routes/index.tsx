import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { VideoBlock } from "@/components/VideoBlock";
import mentorImg from "@/assets/mentor.jpg";
import opportunityImg from "@/assets/opportunity.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ── Reveal-on-scroll hook ─────────────────────────────────────────────
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

// ── Marquee ───────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "CREATING SOCIETY",
    "ATTENTION INTO INCOME",
    "BUILD WHAT'S YOURS",
    "CREATING SOCIETY",
  ];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="bg-[color:var(--wine)] py-4 overflow-hidden border-y border-white/5">
      <div className="flex w-max whitespace-nowrap animate-marquee">
        {doubled.map((t, i) => (
          <span key={i} className="mx-8 text-[color:var(--cream)]/70 text-xs tracking-[0.35em] font-medium">
            {t} <span className="mx-8 text-[color:var(--rose)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-[color:var(--cream)]">
        <Link to="/" className="font-serif text-xl tracking-tight">
          Creating <span className="serif-italic">Society</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#pricing" className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-[color:var(--cream)]/75 hover:text-[color:var(--cream)]">
            Pricing
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase bg-[color:var(--rose)] text-[color:var(--cream)] hover:opacity-90 transition"
          >
            Get Access
          </a>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  useReveal();

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      {/* HERO */}
      <section className="relative bg-[color:var(--wine)] text-[color:var(--cream)] pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        <Nav />
        <div className="relative mx-auto max-w-[780px] px-6 text-center">
          <p className="rv eyebrow text-[color:var(--cream)]/60">The Creator Business System</p>
          <h1 className="rv d1 mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            Everyone teaches you how to get views.
            <br />
            <span className="serif-italic text-[color:var(--rose)]">We show you how to turn them into a business.</span>
          </h1>
          <p className="rv d2 mt-8 text-base sm:text-lg text-[color:var(--cream)]/75 max-w-[620px] mx-auto leading-relaxed">
            Your own digital product. Your own audience. Your own business. Not brand deals you have to chase. Not someone else's course you resell.
          </p>
        </div>
        <div className="rv d3 relative mx-auto max-w-4xl px-6 mt-14">
          <VideoBlock videoId="hero-1" label="Video 1: Start here" />
        </div>
        <div className="rv d4 mt-10 text-center px-6">
          <a
            href="#pricing"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[color:var(--rose)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
          >
            Get Instant Access
          </a>
          <p className="mt-8 text-xs sm:text-sm text-[color:var(--cream)]/60 tracking-wide">
            3M+ monthly views <span className="mx-2 text-[color:var(--rose)]">·</span>
            39K community <span className="mx-2 text-[color:var(--rose)]">·</span>
            Marbella / Dubai <span className="mx-2 text-[color:var(--rose)]">·</span>
            Built from zero
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* PROBLEM */}
      <section className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          <div className="rv">
            <p className="eyebrow text-[color:var(--rose)]">The real reason</p>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight">
              You don't have a reach problem.
              <br />
              <span className="serif-italic text-[color:var(--rose)]">You have an offer problem.</span>
            </h2>
          </div>
          <div className="rv d1 space-y-5 text-[color:var(--muted-fg)] leading-relaxed text-[15px] sm:text-base">
            <p>You post. It performs. Sometimes it really performs — thousands of views, saves, shares, new followers.</p>
            <p>Then the month ends, you check your account, and nothing has changed.</p>
            <p>Here is what nobody tells you: views are not a business. Views are traffic. And traffic without something to sell is just noise that costs you your evenings.</p>
            <p>The creators making real money are not more talented than you. Most of them get fewer views than you. They simply have something to sell when the attention arrives.</p>
            <blockquote className="mt-8 border-l-2 border-[color:var(--rose)] pl-6 py-2 serif-italic text-[color:var(--ink)] text-xl leading-snug">
              I was getting three million views a month and making almost nothing from them. That number didn't change my life. What I built behind it did.
            </blockquote>
          </div>
        </div>
      </section>

      {/* VIDEO 2 */}
      <section className="bg-[color:var(--cream2)] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="rv eyebrow text-[color:var(--rose)]">The full breakdown</p>
          <h2 className="rv d1 mt-5 font-serif text-4xl sm:text-5xl tracking-tight">How this actually works</h2>
          <p className="rv d2 mt-5 text-[color:var(--muted-fg)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The four phases, what you build in each one, and why this is different from every content course you've seen.
          </p>
          <div className="rv d3 mt-12">
            <VideoBlock videoId="breakdown-2" label="Video 2: The full breakdown" />
          </div>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="rv font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-center max-w-3xl mx-auto">
            Let's be specific about who this is for.
          </h2>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <div className="rv d1 rounded-2xl bg-white p-8 sm:p-10 border-l-4 border-[color:var(--rose)] shadow-[0_20px_60px_-40px_rgba(26,18,9,0.4)]">
              <h3 className="font-serif text-2xl">This is for you if:</h3>
              <ul className="mt-6 space-y-4 text-[color:var(--ink)]/85 text-[15px] leading-relaxed">
                {[
                  "You're creating content and getting views, but none of it turns into income",
                  "You're starting from zero and want a business, not a hobby",
                  "You want something that is yours — not brand deals, not a course someone else wrote",
                  "You'd rather build one real offer than post five times a day forever",
                  "You can commit 5–10 focused hours a week",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv d2 rounded-2xl bg-[color:var(--cream2)] p-8 sm:p-10">
              <h3 className="font-serif text-2xl text-[color:var(--muted-fg)]">This is not for you if:</h3>
              <ul className="mt-6 space-y-4 text-[color:var(--muted-fg)] text-[15px] leading-relaxed">
                {[
                  "You want money without building anything",
                  "You're looking for a done-for-you product to resell",
                  "You want to be famous more than you want to be paid",
                  "You need someone to motivate you every morning",
                  "You expect this to work in two weeks",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--muted-fg)]/60 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOCIETY SYSTEM */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="rv eyebrow text-[color:var(--rose)]">The Society System</p>
            <h2 className="rv d1 mt-5 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Four phases. <span className="serif-italic">One outcome.</span>
            </h2>
            <p className="rv d2 mt-6 text-[color:var(--cream)]/70 leading-relaxed">
              Everyone else starts at phase two and stops there. That's why their students end up with an audience and an empty bank account.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            {[
              {
                n: "01",
                name: "POSITION",
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
                n: "02",
                name: "ATTENTION",
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
                n: "03",
                name: "OFFER",
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
                n: "04",
                name: "CONVERT",
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
              <div
                key={p.n}
                className="rv rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 grid md:grid-cols-[auto_1fr] gap-8"
              >
                <div className="min-w-0">
                  <div className="font-serif text-5xl sm:text-6xl text-[color:var(--rose)]">{p.n}</div>
                  <div className="mt-3 text-xs tracking-[0.25em] font-semibold">{p.name}</div>
                </div>
                <div className="min-w-0">
                  <p className="serif-italic text-xl sm:text-2xl text-[color:var(--cream)]/90">{p.tag}</p>
                  <ul className="mt-6 space-y-3 text-[color:var(--cream)]/75 text-[15px] leading-relaxed">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--rose)] shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 pt-5 border-t border-white/10 serif-italic text-[color:var(--rose)]">
                    {p.out}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="rv font-serif text-4xl sm:text-5xl tracking-tight text-center">Everything you get</h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "The Society System — all four phases, step by step",
              "The private community — women building at the same time as you",
              "Direct feedback from Laura on your positioning, content and offer",
              "The Template Vault — hooks, reel scripts, sales page, emails, pricing frameworks",
              "The Faceless Track — the entire system without ever showing your face",
              "Society AI — trained on our frameworks, not generic prompts",
              "Lifetime access and every future update",
            ].map((t, i) => (
              <div
                key={t}
                className="rv rounded-2xl bg-white p-7 border border-[color:var(--border)] hover:border-[color:var(--rose)]/40 transition"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="text-[color:var(--rose)] font-serif text-lg">0{i + 1}</div>
                <p className="mt-3 text-[color:var(--ink)]/85 leading-relaxed text-[15px]">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-[color:var(--cream2)] py-24 sm:py-32">
        <div className="mx-auto max-w-[640px] px-6 text-center">
          <h2 className="rv font-serif text-4xl sm:text-5xl tracking-tight">
            The <span className="serif-italic text-[color:var(--rose)]">honest</span> guarantee
          </h2>
          <div className="rv d1 mt-8 space-y-5 text-[color:var(--muted-fg)] leading-relaxed">
            <p>I'm not going to promise you a number. Anyone promising you a specific income is either lying or hasn't done this long enough to know better.</p>
            <p>Here is what I will promise. Go through the system, do the work, show up in the community. If within 30 days you don't have more clarity and a clearer path than anything else you've bought, email us and we'll refund you. No forms. No interrogation.</p>
          </div>
        </div>
      </section>

      {/* VIDEO 3 + PRICING */}
      <section id="pricing" className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="rv eyebrow text-[color:var(--rose)]">Before you join</p>
            <h2 className="rv d1 mt-5 font-serif text-4xl sm:text-5xl tracking-tight">
              Watch this, then <span className="serif-italic">choose your level.</span>
            </h2>
          </div>
          <div className="rv d2 mt-12">
            <VideoBlock videoId="pricing-3" label="Video 3: Watch before joining" />
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-6">
            {/* Card A */}
            <div className="rv rounded-2xl bg-white p-8 sm:p-10 border border-[color:var(--border)] flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-3xl">Creating Society</h3>
                <span className="pill">Save $300</span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-[color:var(--muted-fg)] line-through">$997</span>
                <span className="font-serif text-6xl text-[color:var(--wine)]">$697</span>
              </div>
              <p className="mt-1 text-sm text-[color:var(--muted-fg)]">or 3 × $249</p>
              <p className="mt-3 text-sm text-[color:var(--ink)]/80">One-time payment. Lifetime access. No subscription.</p>
              <ul className="mt-6 space-y-3 text-[15px] text-[color:var(--ink)]/85 flex-1">
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
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/checkout"
                className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[color:var(--rose)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
              >
                Get Instant Access
              </Link>
              <p className="mt-4 text-center text-xs text-[color:var(--muted-fg)]">
                Instant access · Lifetime · 30-day guarantee
              </p>
            </div>

            {/* Card B */}
            <div className="rv d1 rounded-2xl bg-[color:var(--wine)] text-[color:var(--cream)] p-8 sm:p-10 flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-3xl">The Inner Circle</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.6rem] font-semibold tracking-[0.13em] uppercase bg-white/10 text-[color:var(--cream)]/70">
                  By application
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-6xl">$3,997</span>
              </div>
              <p className="mt-1 text-sm text-[color:var(--cream)]/60">or 3 × $1,497</p>
              <p className="mt-3 serif-italic text-[color:var(--cream)]/85">
                12 weeks. Small cohort. We build your offer with you.
              </p>
              <ul className="mt-6 space-y-3 text-[15px] text-[color:var(--cream)]/85 flex-1">
                {[
                  "Everything in Creating Society",
                  "Weekly live strategy calls",
                  "1:1 onboarding and offer build with Laura",
                  "Done-with-you positioning, product and launch",
                  "Private channel, direct access",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--rose)] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-white/10 serif-italic text-[color:var(--rose)]">
                You leave with a finished digital product and your first paying clients.
              </p>
              <Link
                to="/apply"
                className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[color:var(--cream)] text-[color:var(--wine)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
              >
                Apply now
              </Link>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-[color:var(--muted-fg)]">
            No hidden upsells. No closer on the phone. Two options, both priced in public.
          </p>
        </div>
      </section>

      {/* LAURA'S STORY */}
      <section className="bg-[color:var(--cream2)] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rv text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Hi, I'm <span className="serif-italic text-[color:var(--rose)]">Laura.</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rv">
              <img src={mentorImg} alt="" className="w-full aspect-[4/5] object-cover rounded-2xl" loading="lazy" />
            </div>
            <div className="rv d1 space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[15px] sm:text-base">
              <p>Right now my Instagram does around three million views a month. I live between Marbella and Dubai. From the outside it looks like exactly the thing everyone online is trying to build.</p>
              <p className="serif-italic text-[color:var(--wine)]">Here's the part I don't usually post.</p>
              <p>For a long time that number meant nothing. Three million people watched my content every month and I made almost nothing from it. Brand deals took weeks to negotiate and paid once. My following grew while my bank account didn't. By every metric people talk about online I was winning — and I was broke in a very well-decorated way.</p>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="rv order-2 md:order-1 space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[15px] sm:text-base">
              <p>The uncomfortable truth was that I had built an audience without building a business. Those are two different things, and nobody says it out loud because grow your followers is much easier to sell than build something worth selling.</p>
              <p>So I stopped optimising for views and started building the thing underneath. I worked out what I could actually help someone with. I built one offer. I sold it before I had finished making it. And in the first month it worked, I made more from one product than a year of brand deals had paid me.</p>
              <p>Nothing about my content changed dramatically. What changed is that there was finally something on the other side of the attention.</p>
            </div>
            <div className="rv d1 order-1 md:order-2">
              <img src={opportunityImg} alt="" className="w-full aspect-[4/5] object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>

          <div className="rv mt-14 max-w-2xl mx-auto text-center space-y-5 text-[color:var(--ink)]/85 leading-relaxed text-[15px] sm:text-base">
            <p className="serif-italic text-xl text-[color:var(--wine)]">That's the whole thing. That's what Creating Society is.</p>
            <p>I won't tell you it's easy, fast or passive. It's a business, and businesses take work. But it's work that compounds — unlike posting every day forever and hoping a brand notices you.</p>
            <p>If you have attention and nothing behind it, or you're starting from zero and want to do it properly this time, you're in the right place.</p>
            <p className="serif-italic text-lg text-[color:var(--wine)]">— Laura</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="rv font-serif text-4xl sm:text-5xl tracking-tight text-center">
            Questions, <span className="serif-italic text-[color:var(--rose)]">answered.</span>
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
                <AccordionItem key={q} value={`item-${i}`} className="border-b border-[color:var(--border)]">
                  <AccordionTrigger className="text-left font-serif text-lg sm:text-xl hover:no-underline py-6">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[color:var(--muted-fg)] leading-relaxed text-[15px] pb-6">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* PS */}
      <section className="bg-[color:var(--wine)] text-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-[640px] px-6">
          <div className="rv space-y-5 leading-relaxed text-[color:var(--cream)]/85 text-[15px] sm:text-base">
            <p className="serif-italic text-2xl text-[color:var(--rose)]">P.S.</p>
            <p>If you scrolled this far, you're probably wondering why this is $697 and not $3,000.</p>
            <p>Fair question. Honest answer: I could charge more. Programs with less inside charge four figures and sell them on a call with someone who won't let you off the phone.</p>
            <p>I don't want to build that business. I want a lot of women inside this, building real things — because the ones who succeed become the proof that this works, and some of them will eventually want to work with me directly in The Inner Circle. That's where the deeper work happens, and it's priced accordingly.</p>
            <p>So this is priced to be a decision you can make on your own, tonight, without a phone call.</p>
            <p className="serif-italic text-[color:var(--cream)]">If you win, I win. That's the whole model.</p>
            <p className="serif-italic">See you inside. — Laura</p>
          </div>
          <div className="rv d1 mt-10 text-center">
            <Link
              to="/checkout"
              className="inline-flex items-center px-8 py-4 rounded-full bg-[color:var(--rose)] text-[color:var(--cream)] text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition"
            >
              Get Instant Access
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[color:var(--ink)] text-[color:var(--cream)]/70 py-14">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-[1fr_auto] items-center">
          <div>
            <div className="font-serif text-xl text-[color:var(--cream)]">
              Creating <span className="serif-italic">Society</span>
            </div>
            <p className="mt-2 text-xs text-[color:var(--cream)]/50">© 2026 Creating Society. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs tracking-[0.15em] uppercase">
            <a href="#" className="hover:text-[color:var(--cream)]">Privacy</a>
            <a href="#" className="hover:text-[color:var(--cream)]">Terms</a>
            <a href="#" className="hover:text-[color:var(--cream)]">Contact</a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-[color:var(--cream)]/40 leading-relaxed max-w-3xl">
            Results are not guaranteed and vary based on individual effort, experience and market conditions. Any figures shown are examples, not a promise of earnings.
          </p>
        </div>
      </footer>
    </main>
  );
}
