import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import mentorImg from "@/assets/mentor.jpg";
import opportunityImg from "@/assets/opportunity.jpg";

export const Route = createFileRoute("/training")({
  component: TrainingPage,
  head: () => ({
    meta: [
      { title: "Free Masterclass — Laura Mercedes" },
      { name: "description", content: "The exact strategy Laura used to grow to over 1 million followers and build a 7-figure creator business. Free 30-minute training." },
    ],
  }),
});

// ── Marquee ───────────────────────────────────────────────────────────────

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#2B0F16", padding: "13px 0", overflow: "hidden" }}>
      <div className="flex whitespace-nowrap w-max animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-5" style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reveal hook ───────────────────────────────────────────────────────────

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

// ── Form state ────────────────────────────────────────────────────────────
// TODO: Set your Formspree form ID at https://formspree.io
const FORMSPREE_REG = "YOUR_FORM_ID";

function useRegForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function submit(name: string, email: string) {
    setState("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_REG}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "training-registration" }),
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

// ── Page component ────────────────────────────────────────────────────────

function TrainingPage() {
  useReveal();

  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { state: regState, errMsg: regErr, submit: submitReg } = useRegForm();

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F4", color: "#1A1209", fontFamily: "Inter, sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-[6%] h-[60px] transition-all duration-300"
        style={{
          background: solid ? "#FAF8F4" : "transparent",
          borderBottom: solid ? "1px solid rgba(26,18,9,0.10)" : "1px solid transparent",
        }}>
        <Link to="/" className="font-[family-name:var(--font-serif)] font-semibold tracking-tight transition-colors"
          style={{ color: solid ? "#1A1209" : "rgba(255,255,255,0.88)", textDecoration: "none", fontSize: "1.1rem" }}>
          Laura Mercedes
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Home", to: "/" as const },
          ].map(({ label, to }) => (
            <Link key={label} to={to}
              style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "color .2s",
                color: solid ? "#7A6D65" : "rgba(255,255,255,0.45)" }}>
              {label}
            </Link>
          ))}
          <a href="/training" style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
            color: solid ? "#1A1209" : "rgba(255,255,255,0.9)", borderBottom: solid ? "1px solid #1A1209" : "1px solid rgba(255,255,255,0.6)", paddingBottom: 1 }}>
            Free Training
          </a>
          <Link to="/#pricing"
            style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "color .2s",
              color: solid ? "#7A6D65" : "rgba(255,255,255,0.45)" }}>
            Join AOI
          </Link>
        </div>
        <a href="#register" onClick={scrollTo("register")}
          className="text-[0.72rem] font-medium tracking-[0.04em] px-5 py-2 rounded-full transition-all"
          style={{
            background: solid ? "#2B0F16" : "rgba(255,255,255,0.14)",
            color: "#fff",
            border: solid ? "1px solid #2B0F16" : "1px solid rgba(255,255,255,0.3)",
            textDecoration: "none",
          }}>
          Register Free
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ padding: "110px 6% 72px", textAlign: "center" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,7,10,0.72) 0%, rgba(20,7,10,0.80) 60%, rgba(20,7,10,0.92) 100%)" }} />
        <div className="relative z-10 mx-auto" style={{ maxWidth: 720 }}>
          <div className="flex items-center justify-center gap-2 mb-7" style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C86068", display: "inline-block" }} />
            Free Masterclass
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C86068", display: "inline-block" }} />
          </div>
          <h1 className="font-[family-name:var(--font-serif)]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.015em", color: "#fff", marginBottom: 18 }}>
            Build your personal brand &amp;<br />
            turn your content into <em style={{ fontStyle: "italic", fontWeight: 400 }}>cash</em>
          </h1>
          <p style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)", fontWeight: 300, color: "rgba(255,255,255,0.52)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 28px" }}>
            The exact strategy Laura used to grow to over 1 million followers and build a 7-figure creator business from scratch.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center mb-11">
            <a href="#register" onClick={scrollTo("register")}
              className="rounded-full transition-all hover:opacity-80 hover:-translate-y-0.5"
              style={{ padding: "13px 28px", background: "#fff", color: "#2B0F16", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", boxShadow: "0 4px 18px rgba(0,0,0,0.25)" }}>
              Register for Free →
            </a>
            <a href="#modules" onClick={scrollTo("modules")}
              className="rounded-full transition-all hover:border-white/50 hover:text-white"
              style={{ padding: "13px 20px", background: "transparent", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.78rem", border: "1px solid rgba(255,255,255,0.2)" }}>
              See what's covered
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[["1M+", "Followers"], ["4,000+", "AOI Students"], ["30 min", "Free Class"]].map(([val, lbl], i) => (
              <div key={i} style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.32)", letterSpacing: "0.06em" }}>
                <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{val}</strong> {lbl}
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10" aria-hidden>
          <div className="w-px animate-scroll-line" style={{ background: "rgba(255,255,255,0.18)" }} />
        </div>
      </section>

      <Marquee items={["FREE MASTERCLASS", "Laura Mercedes", "PERSONAL BRAND", "Content that Converts"]} />

      {/* ── OPPORTUNITY ──────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1120 }}>
          <div className="rv overflow-hidden rounded-sm" style={{ aspectRatio: "4/5" }}>
            <img src={opportunityImg} alt="Creator lifestyle" className="w-full h-full object-cover transition-transform duration-[8s] hover:scale-105" loading="lazy" />
          </div>
          <div className="rv d2">
            <div className="font-[family-name:var(--font-serif)] serif-italic mb-3" style={{ fontSize: "0.9rem", color: "#7A6D65" }}>The opportunity is real.</div>
            <span className="pill">Why This, Why Now</span>
            <h2 className="font-[family-name:var(--font-serif)] mt-3" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>
              The creators winning right now<br />have a <em style={{ fontStyle: "italic", color: "#2B0F16", fontWeight: 400 }}>system.</em> Not more luck.
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#7A6D65", lineHeight: 1.82, marginTop: 12, maxWidth: 520 }}>It is not about going viral once. It is about building an audience that trusts you, then monetising that trust in multiple ways — consistently, without burning out.</p>
            <div style={{ marginTop: 22 }}>
              {[
                ["01", <><strong style={{ color: "#1A1209", fontWeight: 500 }}>Stop posting and praying.</strong> Learn the content strategy that consistently grows an engaged audience on any platform.</>],
                ["02", <><strong style={{ color: "#1A1209", fontWeight: 500 }}>Build multiple income streams.</strong> Digital products, brand deals, UGC, coaching — you'll know exactly where to start.</>],
                ["03", <><strong style={{ color: "#1A1209", fontWeight: 500 }}>Use AI to do more in less time.</strong> Laura's tools and workflow for content creation with AI built into the system.</>],
                ["04", <><strong style={{ color: "#1A1209", fontWeight: 500 }}>The mindset behind a personal brand</strong> that actually sells — positioning, trust, and why most people never build momentum.</>],
              ].map(([n, text]) => (
                <div key={String(n)} className="flex gap-4 items-start py-3.5" style={{ borderBottom: "1px solid rgba(26,18,9,0.10)" }}>
                  <div className="font-[family-name:var(--font-serif)] font-light shrink-0" style={{ fontSize: "1.5rem", color: "rgba(26,18,9,0.12)", width: 34, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.86rem", color: "#7A6D65", lineHeight: 1.65 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(26,18,9,0.10), transparent)" }} />

      {/* ── MODULES ──────────────────────────────────────────────────── */}
      <section id="modules" style={{ padding: "88px 6%", background: "#F2ECE3", borderTop: "1px solid rgba(26,18,9,0.10)", borderBottom: "1px solid rgba(26,18,9,0.10)" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-12">
            <span className="pill rv">What You'll Learn</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", fontWeight: 600, lineHeight: 1.1 }}>
              Four modules.<br />The entire <em style={{ fontStyle: "italic", color: "#2B0F16", fontWeight: 400 }}>blueprint.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { n: "01", lbl: "Module One", t: "Positioning & Niche Clarity", d: "How to define exactly who you are online and what you stand for — without picking a box that limits you.", items: ["The \"become the niche\" framework", "Naming your personal brand", "Content pillars that attract the right audience"] },
              { n: "02", lbl: "Module Two", t: "Content Strategy That Converts", d: "The system behind content that grows your audience and builds the trust that leads to sales.", items: ["Hook frameworks that stop the scroll", "Sales content without feeling pushy", "Storytelling that builds authority"] },
              { n: "03", lbl: "Module Three", t: "Monetisation Roadmap", d: "The four main ways Laura's students earn online, and how to layer each income stream in the right order.", items: ["UGC + brand deals (even at a small following)", "Digital products & how to price them", "Affiliate income and passive systems"] },
              { n: "04", lbl: "Module Four", t: "The AI Creator Stack", d: "Laura's real workflow for using AI to move faster, think clearer, and create content that sounds like you.", items: ["AI tools Laura actually uses daily", "Keeping your authentic voice with AI", "Systems to batch content and save time"] },
            ].map((m, i) => (
              <div key={m.n} className={`rv d${i % 2} grid gap-4 p-7 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                style={{ background: "#fff", border: "1px solid rgba(26,18,9,0.10)", gridTemplateColumns: "auto 1fr" }}>
                <div className="font-[family-name:var(--font-serif)] font-light pt-1" style={{ fontSize: "2.2rem", color: "rgba(26,18,9,0.10)", lineHeight: 1 }}>{m.n}</div>
                <div>
                  <div className="eyebrow mb-1.5" style={{ color: "#C86068", fontSize: "0.58rem" }}>{m.lbl}</div>
                  <div className="font-[family-name:var(--font-serif)] font-semibold mb-2" style={{ fontSize: "1.05rem" }}>{m.t}</div>
                  <p style={{ fontSize: "0.8rem", color: "#7A6D65", lineHeight: 1.65, marginBottom: 12 }}>{m.d}</p>
                  <div className="flex flex-col gap-1">
                    {m.items.map((item) => (
                      <div key={item} className="flex gap-2" style={{ fontSize: "0.76rem", color: "#7A6D65" }}>
                        <span style={{ color: "#2B0F16", flexShrink: 0, fontSize: "0.72rem", marginTop: 1 }}>→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section style={{ background: "#2B0F16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,96,104,0.05) 0%, transparent 55%)" }} />
        <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center" style={{ maxWidth: 1120, padding: "88px 6%" }}>
          <div className="rv relative">
            <div className="overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
              <img src={mentorImg} alt="Laura Mercedes" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-3 -right-3 p-4 rounded-sm font-[family-name:var(--font-serif)] font-semibold"
              style={{ background: "#fff", color: "#2B0F16", fontSize: "0.9rem", boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}>
              7-Figure Creator
              <span className="block mt-0.5 font-sans font-normal" style={{ fontSize: "0.65rem", color: "#7A6D65" }}>Since 2020</span>
            </div>
          </div>
          <div className="rv d2">
            <div className="font-[family-name:var(--font-serif)] serif-italic mb-1" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}>Meet your host</div>
            <h2 className="font-[family-name:var(--font-serif)] mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1 }}>Hi, I'm Laura.</h2>
            <div className="flex flex-col gap-3" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.8 }}>
              <p>I started creating content with a laptop, a $40 ring light, and absolutely zero strategy. I posted, it flopped. I overthought my niche for months. I watched people with less talent and less effort build audiences I couldn't crack.</p>
              <p>Then I stopped guessing and built <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>a system.</strong> Over the next three years, I grew to over 1 million followers, launched a program that now has 4,000+ students, and built a 7-figure business that runs on content and digital products.</p>
              <p>This masterclass is the starting point — <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>the exact blueprint I wish I had on day one.</strong></p>
            </div>
            <div className="grid grid-cols-3 overflow-hidden rounded-sm mt-8" style={{ background: "rgba(255,255,255,0.07)", gap: 1 }}>
              {[["1M+", "Followers"], ["4K+", "Students"], ["7-Fig", "Creator Biz"]].map(([val, lbl]) => (
                <div key={lbl} className="text-center py-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="font-[family-name:var(--font-serif)]" style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{val}</div>
                  <div className="eyebrow mt-1" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.62rem" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section style={{ padding: "88px 6%" }}>
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <div className="text-center mb-12">
            <span className="pill rv">Social Proof</span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mt-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600 }}>What students are saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stars: "★★★★★", q: '"This masterclass changed how I think about content completely. I implemented what Laura taught and went from 12k to 74k followers in 4 months."', name: "Mia R.", handle: "@mia.creates" },
              { stars: "★★★★★", q: '"I had no idea how to monetise my audience. After this training I launched my first digital product and made $3,200 in the first week."', name: "Sarah T.", handle: "@sarahcreates" },
              { stars: "★★★★★", q: '"The positioning module alone was worth it. I finally know what I stand for online and my engagement went up immediately when I applied it."', name: "Camille D.", handle: "@camilledigital" },
            ].map((t, i) => (
              <div key={i} className={`rv d${i} flex flex-col gap-3 p-7 rounded-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                style={{ background: "#F2ECE3", border: "1px solid rgba(26,18,9,0.10)" }}>
                <div style={{ color: "#C86068", fontSize: "0.75rem", letterSpacing: 2 }}>{t.stars}</div>
                <p className="font-[family-name:var(--font-serif)] serif-italic flex-1" style={{ fontSize: "0.96rem", color: "#1A1209", lineHeight: 1.6 }}>{t.q}</p>
                <div style={{ paddingTop: 14, borderTop: "1px solid rgba(26,18,9,0.10)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#1A1209" }}>{t.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "#C86068", marginTop: 1 }}>{t.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ─────────────────────────────────────────────── */}
      <section id="register" style={{ background: "#2B0F16" }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1120, padding: "88px 6%" }}>
          <div>
            <span className="rv inline-flex items-center px-3 py-1 rounded-full eyebrow mb-4"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
              Free Masterclass
            </span>
            <h2 className="font-[family-name:var(--font-serif)] rv d1 mb-4"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, color: "#fff", lineHeight: 1.08 }}>
              Ready to start<br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>building something real?</em>
            </h2>
            <p className="rv d2" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.78 }}>
              No fluff, no upsell, no pitch during the training. Just the exact creator business blueprint — completely free. Reserve your spot and start watching instantly.
            </p>
          </div>
          <div className="rv d3 p-8 rounded-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {regState === "success" ? (
              <div className="text-center py-5">
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>✓</div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.6 }}>You're registered!<br />Check your inbox for the training link.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); submitReg(name, email); }}>
                <div style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 6 }}>First name</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder="Your first name"
                  className="w-full mb-4 outline-none transition-colors"
                  style={{ padding: "12px 16px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }} />
                <div style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 6 }}>Email address</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="your@email.com"
                  className="w-full mb-4 outline-none transition-colors"
                  style={{ padding: "12px 16px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }} />
                <button type="submit" disabled={regState === "loading"}
                  className="w-full py-3.5 rounded-full transition-all hover:opacity-80 hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: "#fff", color: "#2B0F16", border: "none", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer" }}>
                  {regState === "loading" ? "Reserving your spot…" : "Watch the Free Training →"}
                </button>
                {regState === "error" && <p style={{ fontSize: "0.72rem", color: "#ff9f9f", textAlign: "center", marginTop: 8 }}>{regErr}</p>}
              </form>
            )}
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: 10 }}>Instant access. No credit card. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-[6%] py-6"
        style={{ background: "#FAF8F4", borderTop: "1px solid rgba(26,18,9,0.10)" }}>
        <Link to="/" className="font-[family-name:var(--font-serif)] font-semibold" style={{ color: "#1A1209", textDecoration: "none", fontSize: "1rem" }}>Laura Mercedes</Link>
        <p style={{ fontSize: "0.65rem", color: "rgba(26,18,9,0.3)" }}>© {new Date().getFullYear()} Laura Mercedes. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" style={{ fontSize: "0.65rem", color: "#7A6D65", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ fontSize: "0.65rem", color: "#7A6D65", textDecoration: "none" }}>Terms</a>
          <Link to="/" style={{ fontSize: "0.65rem", color: "#7A6D65", textDecoration: "none" }}>Join AOI</Link>
        </div>
      </footer>
    </div>
  );
}
