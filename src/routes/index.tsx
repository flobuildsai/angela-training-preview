import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import mentorImg from "@/assets/mentor.jpg";
import opportunityImg from "@/assets/opportunity.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ── Shared sub-components ──────────────────────────────────────────────────

function Pill({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  if (light) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.6rem] font-semibold tracking-[0.13em] uppercase"
        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
        {children}
      </span>
    );
  }
  return <span className="pill">{children}</span>;
}

function Marquee({ reverse = false, items }: { reverse?: boolean; items: string[] }) {
  const cls = reverse ? "animate-marquee-reverse" : "animate-marquee";
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#2B0F16", padding: "13px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className={`flex whitespace-nowrap w-max ${cls}`}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-5 eyebrow" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.98) el.classList.add("on");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

// ── Form hook with Formspree ───────────────────────────────────────────────
// TODO: Set your Formspree form ID at https://formspree.io
const FORMSPREE_CTA = "YOUR_FORM_ID";

function useCTAForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function submit(email: string) {
    setState("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CTA}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home-cta" }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setErrMsg("Something went wrong — please try again.");
      setState("error");
    }
  }
  return { state, errMsg, submit };
}

// ── Page component ─────────────────────────────────────────────────────────

function HomePage() {
  useReveal();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // CTA form state
  const [ctaEmail, setCtaEmail] = useState("");
  const { state: ctaState, errMsg: ctaErr, submit: submitCTA } = useCTAForm();

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F4", color: "#1A1209", fontFamily: "Inter, sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-[6%] h-16"
        style={{
          background: "#FAF8F4",
          borderBottom: "1px solid rgba(26,18,9,0.10)",
          transition: "box-shadow .3s",
          boxShadow: solid ? "0 1px 16px rgba(26,18,9,0.06)" : "none",
        }}
      >
        <Link to="/" className="font-[family-name:var(--font-serif)] text-lg font-semibold tracking-tight" style={{ color: "#1A1209", textDecoration: "none" }}>
          Laura Mercedes
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="eyebrow hover:text-ink transition-colors" style={{ color: "#7A6D65", textDecoration: "none" }}>Home</Link>
          <Link to="/training" className="eyebrow hover:text-ink transition-colors" style={{ color: "#7A6D65", textDecoration: "none" }}>Free Training</Link>
          <a href="#pricing" onClick={scrollTo("pricing")} className="eyebrow hover:text-ink transition-colors" style={{ color: "#7A6D65", textDecoration: "none" }}>Join AOI</a>
        </div>
        <a href="#pricing" onClick={scrollTo("pricing")}
          className="text-[0.72rem] font-medium tracking-[0.04em] px-5 py-2 rounded-full transition-opacity hover:opacity-80"
          style={{ background: "#2B0F16", color: "#FAF8F4", textDecoration: "none" }}>
          Join AOI
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#2B0F16", padding: "72px 6% 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(200,96,104,0.07) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto" style={{ maxWidth: 760 }}>
          <div className="eyebrow mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>The Creator Business System</div>
          <h1 className="font-[family-name:var(--font-serif)] leading-[1.08] tracking-[-0.015em] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 600, color: "#fff" }}>
            Build a personal brand that gets<br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>seen, trusted,</em> and paid in 2026
          </h1>
          <p className="mb-3 mx-auto" style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 600 }}>
            The exact system to grow your audience, create content that converts, and turn your knowledge into real income through digital products, brand deals, and AI-powered systems.
          </p>
          <p className="mx-auto mb-10" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, fontWeight: 300, maxWidth: 520 }}>
            Women inside AOI have gone from scared to post to building profitable personal brands, growing communities, and making their first 6 figures online.
          </p>
          <a href="#pricing" onClick={scrollTo("pricing")}
            className="inline-flex items-center gap-3 rounded-full transition-all hover:opacity-80"
            style={{ padding: "13px 28px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", textDecoration: "none", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.04em" }}>
            Join The Art of Influence
            <span className="grid place-items-center rounded-full text-sm" style={{ width: 24, height: 24, background: "#fff", color: "#2B0F16", fontWeight: 600 }}>→</span>
          </a>

          {/* Video card */}
          <div className="mx-auto mt-14 rounded-2xl overflow-hidden relative"
            style={{ maxWidth: 720, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.3)", aspectRatio: "16/9" }}>
            <img src={heroImg} alt="Laura Mercedes" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid place-items-center rounded-full cursor-pointer transition-transform hover:scale-105"
                style={{ width: 64, height: 64, background: "rgba(255,255,255,0.95)", color: "#2B0F16", fontSize: "1.2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                ▶
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <Marquee items={["THE ART OF INFLUENCE", "AOI 2.0", "7-FIGURE CREATOR", "4,000+ WOMEN"]} />

      {/* ── PROBLEM ──────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto grid md:grid-cols-2 gap-16 items-start" style={{ maxWidth: 1120 }}>
          <div className="rv">
            <span className="pill">The Real Reason</span>
            <div className="font-[family-name:var(--font-serif)] mt-3 leading-[1.1] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 700 }}>
              You're not behind.<br />You're just building it <em style={{ fontStyle: "italic", color: "#2B0F16", fontWeight: 400 }}>wrong.</em>
            </div>
          </div>
          <div className="rv d2 flex flex-col gap-4">
            <p style={{ fontSize: "0.9rem", color: "#7A6D65", lineHeight: 1.82 }}>You post and it flops. You spend hours on a Reel, hit share, and watch it sit at 400 views while someone with half your taste pulls a million on a video they shot in their car.</p>
            <p style={{ fontSize: "0.9rem", color: "#7A6D65", lineHeight: 1.82 }}>You see other women your age building businesses online, getting brand deals that pay six figures, launching digital products that sell while they sleep. And you know, somewhere underneath the frustration, <strong style={{ color: "#1A1209", fontWeight: 500 }}>you could do that too.</strong></p>
            <div style={{ padding: "18px 22px", borderLeft: "2px solid #2B0F16", background: "rgba(43,15,22,0.04)" }}>
              <p className="font-[family-name:var(--font-serif)] serif-italic" style={{ fontSize: "1rem", color: "#1A1209", lineHeight: 1.6 }}>The creators winning right now are not more talented than you. They just have <strong>the system you do not have yet.</strong></p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(26,18,9,0.10), transparent)" }} />

      {/* ── WHO ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%", background: "#F2ECE3", borderTop: "1px solid rgba(26,18,9,0.10)", borderBottom: "1px solid rgba(26,18,9,0.10)" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-12">
            <span className="pill rv">Who AOI Is Built For</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>Who is this for?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { ico: "✦", t: "The Creator", d: "Building your personal brand and monetising through content, brand deals, and digital products." },
              { ico: "✦", t: "The Service Provider", d: "Who wants to attract dream clients, raise your rates, and stop relying only on client work." },
              { ico: "✦", t: "The Educator", d: "Ready to package your expertise into courses, templates, workshops, or coaching programs." },
              { ico: "✦", t: "The Woman With a Skill", d: "Who wants to turn what she knows into a personal brand that gets paid — consistently." },
            ].map((c, i) => (
              <div key={i} className={`rv d${i} flex gap-4 items-start p-7 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg`}
                style={{ background: "#fff", border: "1px solid rgba(26,18,9,0.10)" }}>
                <div style={{ color: "#2B0F16", flexShrink: 0, marginTop: 3 }}>{c.ico}</div>
                <div>
                  <div className="font-[family-name:var(--font-serif)] font-semibold mb-1.5" style={{ fontSize: "1.1rem" }}>{c.t}</div>
                  <p style={{ fontSize: "0.83rem", color: "#7A6D65", lineHeight: 1.68 }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(26,18,9,0.10), transparent)" }} />

      {/* ── INSIDE ───────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="mb-12">
            <span className="pill rv">What's Inside AOI</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>
              When you join AOI,<br />here's what you get
            </h2>
            <p className="rv d2 mt-3" style={{ fontSize: "0.88rem", color: "#7A6D65", lineHeight: 1.82, maxWidth: 520 }}>The strategy, support, tools, and trainings to help you grow your audience, build trust, and turn your personal brand into income.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { ico: "📚", t: "9 Step-by-Step Courses", d: "A complete roadmap from positioning to content, audience growth, digital products, and brand deals." },
              { ico: "💬", t: "Direct Support from Laura", d: "Ask questions, get feedback on your content, ideas, offers, and strategy — you're not alone." },
              { ico: "✨", t: "Ongoing Trainings", d: "New strategies, lessons, and insights in real time so you're never learning outdated tactics." },
              { ico: "🗂️", t: "Full Course Library", d: "Everything built around personal branding, content, monetisation, digital products, and brand deals." },
              { ico: "🤖", t: "Influence AI", d: "Laura's custom-trained AI tool built on her strategies to give you clearer ideas and faster direction." },
              { ico: "👯‍♀️", t: "Supportive Community", d: "Build alongside women who are serious about creating more for themselves — ask, share, grow." },
            ].map((c, i) => (
              <div key={i} className={`rv d${i % 3} p-7 rounded-sm transition-all hover:bg-white hover:shadow-md`}
                style={{ background: "#F2ECE3", border: "1px solid rgba(26,18,9,0.10)" }}>
                <div style={{ fontSize: "1.3rem", marginBottom: 12 }}>{c.ico}</div>
                <div className="font-[family-name:var(--font-serif)] font-semibold mb-2" style={{ fontSize: "1.1rem" }}>{c.t}</div>
                <p style={{ fontSize: "0.82rem", color: "#7A6D65", lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee reverse items={["REAL CREATORS", "REAL RESULTS", "REAL CREATORS", "REAL RESULTS"]} />

      {/* ── CURRICULUM ───────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%", background: "#F2ECE3", borderTop: "1px solid rgba(26,18,9,0.10)" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-14">
            <span className="pill rv">The AOI Curriculum</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mx-auto mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>
              9 courses for every stage<br />of the creator journey.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Course list */}
            <div className="rv" style={{ border: "1px solid rgba(26,18,9,0.10)" }}>
              {[
                ["01", "Build Your Personal Brand", "Foundation"],
                ["02", "Instagram Bootcamp", "Content"],
                ["03", "Become a UGC Creator", "Income"],
                ["04", "Brand Deals Blueprint", "Deals"],
                ["05", "Create an Online Course", "Products"],
                ["06", "Sell Your Course Passively", "Systems"],
                ["07", "How to Sell Online & Build Trust", "Sales"],
                ["08", "Storytelling", "Content"],
                ["09", "Affiliate Marketing", "Income"],
              ].map(([n, t, tag]) => (
                <div key={n} className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-white"
                  style={{ borderBottom: "1px solid rgba(26,18,9,0.10)" }}>
                  <div className="font-[family-name:var(--font-serif)] font-light shrink-0" style={{ fontSize: "1.5rem", color: "rgba(26,18,9,0.12)", width: 42, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.86rem", fontWeight: 500, color: "#1A1209" }}>{t}</div>
                  <span className="ml-auto shrink-0 px-2 py-0.5 rounded-full eyebrow" style={{ background: "rgba(200,96,104,0.10)", color: "#C86068", fontSize: "0.58rem" }}>{tag}</span>
                </div>
              ))}
            </div>
            {/* Module cards */}
            <div className="rv d2 flex flex-col gap-3">
              {[
                { ico: "💡", lbl: "Brand Clarity", t: "Build your personal brand", d: "Become the niche so you can evolve. Get clear on what you're building so every piece of content moves you forward." },
                { ico: "📱", lbl: "Content Strategy", t: "Create content that grows", d: "Proven formats, hooks, and structures so your content gets seen, shared, and saved consistently." },
                { ico: "💸", lbl: "Sales Content", t: "Turn your content into sales", d: "Build an audience that trusts you and sell through content so the right people don't just follow — they buy." },
                { ico: "🎓", lbl: "Digital Products", t: "Create your own digital course", d: "Frameworks and step-by-step guidance to turn what you know into an offer people want to buy." },
                { ico: "🛒", lbl: "Passive Systems", t: "Build passive income", d: "Set up funnels and strategies so your products sell in the background while you live your life." },
                { ico: "🤝", lbl: "Brand Deals", t: "Land brand partnerships", d: "Position your content and use proven templates to secure paid collaborations and long-term deals." },
              ].map((m) => (
                <div key={m.t} className="flex gap-3 p-5 rounded-sm transition-shadow hover:shadow-md" style={{ background: "#fff", border: "1px solid rgba(26,18,9,0.10)" }}>
                  <div style={{ fontSize: "1rem", flexShrink: 0, marginTop: 2 }}>{m.ico}</div>
                  <div>
                    <div className="eyebrow mb-1" style={{ color: "#C86068", fontSize: "0.58rem" }}>{m.lbl}</div>
                    <div className="font-[family-name:var(--font-serif)] font-semibold mb-1" style={{ fontSize: "1rem" }}>{m.t}</div>
                    <p style={{ fontSize: "0.78rem", color: "#7A6D65", lineHeight: 1.6 }}>{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(26,18,9,0.10), transparent)" }} />

      {/* ── RESULTS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-12">
            <span className="pill rv">Student Results</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600 }}>What to expect</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: '"I hit my first 6 figures, booked international weddings in Europe, booked out for 2025, have a waitlist for 2027 clients, and have a team of 6 creators."', h: "@details.bymeg" },
              { q: '"I was able to quit my job to fully focus on my career as a creator. I launched an online editing course and started hosting The Creators Club in Buenos Aires."', h: "@camtent" },
              { q: '"I\'ve made so many more sales than I would\'ve ever imagined. I used to sell 1 guide every month, now I\'m selling 3–5 per day."', h: "@byariaemily" },
            ].map((r, i) => (
              <div key={i} className={`rv d${i} flex flex-col gap-4 p-7 rounded-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                style={{ background: "#F2ECE3", border: "1px solid rgba(26,18,9,0.10)" }}>
                <p className="font-[family-name:var(--font-serif)] serif-italic flex-1" style={{ fontSize: "0.97rem", color: "#1A1209", lineHeight: 1.62 }}>{r.q}</p>
                <div style={{ fontSize: "0.7rem", color: "#C86068", fontWeight: 500, letterSpacing: "0.04em" }}>{r.h}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#2B0F16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(200,96,104,0.06) 0%, transparent 55%)" }} />
        <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1120, padding: "88px 6%" }}>
          <div>
            <Pill light>Influence AI</Pill>
            <div className="font-[family-name:var(--font-serif)] serif-italic mt-2 mb-1" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.4)" }}>Your AI Brand Coach</div>
            <h2 className="font-[family-name:var(--font-serif)] rv mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1 }}>Build faster with AI</h2>
            <p className="rv d1 mb-6" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.78 }}>Trained on everything Laura knows — her strategies, frameworks, and how she actually thinks through content, brand, and sales.</p>
            <div className="rv d2 flex flex-col gap-3">
              {[
                ["✨", "Content ideas tailored to your brand — not generic prompts"],
                ["💬", "Prompts based on Laura's actual frameworks"],
                ["⚡", "Faster clarity when you feel stuck — direction on demand"],
              ].map(([ico, text]) => (
                <div key={text} className="flex gap-3 items-start p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>{ico}</span>
                  <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Chat mockup */}
          <div className="rv d2 rounded-xl p-6 flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
            {[
              { from: "you", text: "I want to grow on Instagram but I don't know what my niche is..." },
              { from: "ai", text: "Let's find it together. You don't need to pick a category — you need to become one. What do people ask your advice on most?" },
              { from: "you", text: "People always ask me about my morning routine and how I stay consistent..." },
              { from: "ai", text: "That's not just a topic — that's a brand. 'The woman who makes discipline look beautiful.' Here are your first 3 content angles..." },
            ].map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg ${msg.from === "you" ? "ml-5" : "mr-5"}`}
                style={{
                  background: msg.from === "you" ? "rgba(255,255,255,0.07)" : "rgba(200,96,104,0.14)",
                  border: msg.from === "ai" ? "1px solid rgba(200,96,104,0.2)" : "none",
                  fontSize: "0.8rem",
                  lineHeight: 1.55,
                  color: msg.from === "you" ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.82)",
                }}>
                <div style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3, color: msg.from === "you" ? "rgba(255,255,255,0.28)" : "rgba(200,96,104,0.7)", textAlign: msg.from === "you" ? "right" : "left" }}>
                  {msg.from === "you" ? "You" : "Influence AI"}
                </div>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUDED ─────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start" style={{ maxWidth: 1120 }}>
          <div>
            <span className="pill rv">Everything Included</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>Every resource &amp; tool<br />you'll ever need</h2>
            <p className="rv d2 mt-3" style={{ fontSize: "0.88rem", color: "#7A6D65", lineHeight: 1.82 }}>You're not just getting lessons. You're getting the templates, systems, prompts, and support that help you actually build, launch, and sell.</p>
          </div>
          <div className="rv d2">
            {[
              ["9+ Courses + Templates"],
              ["Content audits and personalised feedback from Laura"],
              ["Monthly content ideas and strategic prompts"],
              ["100+ hook vault and proven hook frameworks"],
              ["Caption and storytelling structures"],
              ["Reels, Carousel, Stories & Trial Reels frameworks"],
              ["Landing page and email templates"],
              ["Brand deal pitches, rate cards, contracts & invoices"],
              ["Done-for-you content and launch structures"],
            ].map(([text], i) => (
              <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: "1px solid rgba(26,18,9,0.10)", fontSize: "0.86rem", color: "#7A6D65" }}>
                <span style={{ color: "#2B0F16", flexShrink: 0, fontSize: "0.75rem", marginTop: 2 }}>✦</span>
                <div dangerouslySetInnerHTML={{ __html: text.replace(/Laura|9\+|100\+|Reels|Carousel|Stories|Trial|Brand deal|Done-for-you/g, (m) => `<strong style="color:#1A1209;font-weight:500">${m}</strong>`) }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "88px 6%", background: "#F2ECE3", borderTop: "1px solid rgba(26,18,9,0.10)" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-12">
            <span className="pill rv">Art of Influence 2.0</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600 }}>Join today and get<br />lifetime access.</h2>
          </div>
          <div className="mx-auto max-w-[540px]">
            <div className="rv d2 p-12 text-center rounded-sm" style={{ background: "#fff", border: "1px solid rgba(26,18,9,0.10)" }}>
              <div className="eyebrow mb-4" style={{ color: "#C86068" }}>Limited-Time Discount</div>
              <div className="font-[family-name:var(--font-serif)] font-semibold mb-6" style={{ fontSize: "1.5rem" }}>Art of Influence 2.0</div>
              <div style={{ fontSize: "0.85rem", color: "#7A6D65", textDecoration: "line-through", marginBottom: 4 }}>$888</div>
              <div className="font-[family-name:var(--font-serif)]" style={{ fontSize: "4.5rem", fontWeight: 700, color: "#2B0F16", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 6 }}>$697</div>
              <span className="inline-block px-3 py-1 rounded-full mb-6 eyebrow" style={{ background: "rgba(200,96,104,0.10)", color: "#C86068", fontSize: "0.65rem" }}>Save $191 today</span>
              <p style={{ fontSize: "0.75rem", color: "#7A6D65", marginBottom: 8 }}>One-time payment. Lifetime access. No subscription.</p>
              <div style={{ height: 1, background: "rgba(26,18,9,0.10)", marginBottom: 20 }} />
              <div className="text-left flex flex-col gap-2 mb-7">
                {[
                  ["✨", "Lifetime access to 9+ complete courses and community"],
                  ["🤖", "Laura's custom-trained Influence AI"],
                  ["💬", "Direct feedback and support from Laura"],
                  ["🧾", "Sales scripts, templates, and done-for-you resources"],
                  ["📈", "Ongoing updates as new strategies emerge"],
                  ["💼", "Tax-deductible as a business education expense"],
                ].map(([ico, text]) => (
                  <div key={text} className="flex gap-2 items-start" style={{ fontSize: "0.82rem", color: "#7A6D65" }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>{ico}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              {/* TODO: Replace with your actual checkout URL (Stripe, Kajabi, ThriveCart, etc.) */}
              <a href="https://checkout.lauramercedes.com/aoi"
                className="block w-full py-4 rounded-full text-center transition-all hover:opacity-80 hover:-translate-y-0.5"
                style={{ background: "#2B0F16", color: "#FAF8F4", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                Enroll Now — Start Today
              </a>
              <p style={{ fontSize: "0.7rem", color: "#7A6D65", marginTop: 12 }}>Questions? Email hello@lauramercedes.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ────────────────────────────────────────────────────── */}
      <section style={{ background: "#2B0F16", padding: "88px 6%", textAlign: "center" }}>
        <div className="mx-auto" style={{ maxWidth: 680 }}>
          <Pill light>Student Win</Pill>
          <p className="font-[family-name:var(--font-serif)] serif-italic rv mx-auto mt-4 mb-4"
            style={{ fontSize: "clamp(1.3rem, 2.2vw, 2rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.55 }}>
            "I've made so many more sales than I would've ever imagined. I used to sell 1 guide every month, now I'm selling 3–5 per day. I literally made the entire cost of AOI back within a few weeks."
          </p>
          <p className="rv d1 eyebrow" style={{ color: "rgba(255,255,255,0.35)" }}>@byariaemily</p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%", background: "#F2ECE3", borderTop: "1px solid rgba(26,18,9,0.10)", textAlign: "center" }}>
        <div className="mx-auto" style={{ maxWidth: 520 }}>
          <span className="pill rv block mx-auto w-fit mb-4">Free Training First</span>
          <h2 className="font-[family-name:var(--font-serif)] rv d1" style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 600, lineHeight: 1.08, marginBottom: 14 }}>
            Not sure yet?<br />Start with the <em style={{ fontStyle: "italic", color: "#2B0F16", fontWeight: 400 }}>free training.</em>
          </h2>
          <p className="rv d2" style={{ fontSize: "0.88rem", color: "#7A6D65", lineHeight: 1.75, marginBottom: 28 }}>
            Watch Laura's free 30-minute masterclass before you commit to anything. See the blueprint first.
          </p>
          {ctaState === "success" ? (
            <div className="rv" style={{ padding: "14px 22px", borderRadius: 999, background: "rgba(43,15,22,0.07)", fontSize: "0.82rem", color: "#2B0F16", fontWeight: 500 }}>
              ✓ You're in! Check your inbox for the link.
            </div>
          ) : (
            <form className="rv d3 flex gap-2 max-w-[400px] mx-auto mb-3"
              onSubmit={(e) => { e.preventDefault(); submitCTA(ctaEmail); }}>
              <input type="email" value={ctaEmail} onChange={(e) => setCtaEmail(e.target.value)}
                required placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-full outline-none transition-colors"
                style={{ border: "1px solid rgba(26,18,9,0.10)", background: "#fff", color: "#1A1209", fontSize: "0.85rem" }} />
              <button type="submit" disabled={ctaState === "loading"}
                className="px-5 py-3 rounded-full transition-opacity hover:opacity-80 whitespace-nowrap"
                style={{ background: "#2B0F16", color: "#FAF8F4", fontSize: "0.78rem", fontWeight: 500, border: "none", cursor: "pointer" }}>
                {ctaState === "loading" ? "Sending…" : "Watch Free Training →"}
              </button>
            </form>
          )}
          {ctaState === "error" && <p style={{ fontSize: "0.75rem", color: "#c0392b", marginBottom: 8 }}>{ctaErr}</p>}
          <p className="rv d4" style={{ fontSize: "0.68rem", color: "#7A6D65" }}>
            Or <Link to="/training" style={{ color: "#C86068", textDecoration: "none" }}>join AOI directly</Link> and skip straight to the system.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-[6%] py-6"
        style={{ background: "#FAF8F4", borderTop: "1px solid rgba(26,18,9,0.10)" }}>
        <Link to="/" className="font-[family-name:var(--font-serif)] font-semibold" style={{ color: "#1A1209", textDecoration: "none", fontSize: "1.05rem" }}>Laura Mercedes</Link>
        <p style={{ fontSize: "0.68rem", color: "rgba(26,18,9,0.3)" }}>© {new Date().getFullYear()} Laura Mercedes. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" style={{ fontSize: "0.68rem", color: "#7A6D65", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ fontSize: "0.68rem", color: "#7A6D65", textDecoration: "none" }}>Terms</a>
          <a href="mailto:hello@lauramercedes.com" style={{ fontSize: "0.68rem", color: "#7A6D65", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
