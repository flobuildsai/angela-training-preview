import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Check, CircleCheck, Clock3, Globe2, Layers3, PackageOpen, Play, Store, Users2 } from "lucide-react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWork from "@/assets/laura-work.jpg.asset.json";
import proofGrid from "@/assets/proof-grid.jpeg.asset.json";
import proofStats from "@/assets/proof-stats.jpeg.asset.json";
import proofViews15m from "@/assets/proof-views-15m.jpeg.asset.json";
import proofViews7m from "@/assets/proof-views-7m.jpeg.asset.json";
import proofStripe from "@/assets/proof-stripe.png.asset.json";
import videoPoster from "@/assets/video-poster.jpg";
import { FreeFooter, FreeHeader, useReveal } from "@/components/FreeShell";
import { FreeOptinModal } from "@/components/funnel/FreeOptinModal";
import { Button } from "@/components/ui/button";
import { COURSE_NAME, FAQ, FREE_PAGE, FOR_WHOM, MODULES, PROGRAM_PRICE, VALUE_STACK } from "@/config/freeCourse";
import { trackEvent } from "@/lib/track";

export const Route = createFileRoute("/free")({
  head: () => ({ meta: [
    { title: "Das Creating Society System — kostenlos | Creating Society" },
    { name: "description", content: "Das komplette System, mit dem Frauen aus Social Media ein eigenes digitales Business aufbauen — kostenlos." },
    { property: "og:title", content: "Das Creating Society System — kostenlos" },
    { property: "og:description", content: "6 Module und 22 Videos: in 30 Tagen von Positionierung zu Produkt und Store." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: FreePage,
});

const icons = [PackageOpen, Globe2, Users2, Clock3, Store, Layers3];
const logos = ["wix", "base44", "canva", "capcut", "meta"] as const;
const proofImages = [proofViews15m.url, proofGrid.url, proofStats.url, proofStripe.url, proofViews7m.url];
const totalWorth = VALUE_STACK.reduce((sum, item) => sum + Number(item.worth.replace(/[^\d]/g, "")), 0);
const eur = (value: number) => `${value.toLocaleString("de-DE")} €`;

function Heading({ eyebrow, title, body, center = true, light = false }: { eyebrow: string; title: ReactNode; body?: string; center?: boolean; light?: boolean }) {
  return <div className={`${center ? "mx-auto text-center" : ""} max-w-[760px] rv`}>
    <p className={`funnel-eyebrow ${light ? "text-pure-white/60" : ""}`}>{eyebrow}</p>
    <h2 className="mt-4 font-display text-[36px] font-medium leading-[1.04] sm:text-[52px]">{title}</h2>
    {body ? <p className={`mt-5 text-[17px] leading-relaxed ${light ? "text-pure-white/70" : "text-slate"}`}>{body}</p> : null}
  </div>;
}

function CTA({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return <div className="mt-9 flex flex-col items-center gap-3">
    <Button type="button" size="lg" onClick={onClick} className={light ? "bg-pure-white text-near-black hover:bg-pure-white/90" : "px-8"}>
      {FREE_PAGE.hero.primaryCta}<ArrowRight />
    </Button>
    <p className={`text-xs ${light ? "text-pure-white/55" : "text-slate"}`}>{FREE_PAGE.hero.note}</p>
  </div>;
}

function FreePage() {
  useReveal();
  const [optinOpen, setOptinOpen] = useState(false);
  useEffect(() => { trackEvent("free_page_view"); }, []);
  const openOptin = () => setOptinOpen(true);

  return <main className="overflow-hidden bg-cream-paper text-near-black">
    <FreeHeader nav={FREE_PAGE.nav.map((item) => <a key={item.href} href={item.href} className="text-sm font-medium text-pure-white/70 transition hover:text-pure-white">{item.label}</a>)} right={<Button type="button" size="sm" onClick={openOptin} className="bg-pure-white text-near-black hover:bg-pure-white/90">Kostenlos starten</Button>} />

    <section className="relative min-h-[920px] overflow-hidden bg-pressed-graphite text-pure-white sm:min-h-[1040px]">
      <img src={lauraNew.url} alt="Laura Mercedes" className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-pressed-graphite/35 via-pressed-graphite/55 to-pressed-graphite" />
      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center px-5 pb-20 pt-36 text-center sm:px-8 sm:pt-44">
        <div className="rv flex items-center gap-2 rounded-full border border-pure-white/20 bg-pressed-graphite/55 px-4 py-2 text-xs font-medium backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-ember" />{FREE_PAGE.hero.badge}
        </div>
        <h1 className="rv d1 mt-7 max-w-[1000px] font-display text-[45px] font-medium leading-[0.98] sm:text-[72px] lg:text-[88px]">{FREE_PAGE.hero.title}<span className="ember-dot">.</span></h1>
        <p className="rv d2 mt-6 max-w-[720px] text-[18px] leading-relaxed text-pure-white/75 sm:text-xl">{FREE_PAGE.hero.body}</p>
        <div className="rv d3 mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button type="button" size="lg" onClick={openOptin} className="bg-pure-white text-near-black hover:bg-pure-white/90">{FREE_PAGE.hero.primaryCta}<ArrowRight /></Button>
          <a href="#video" className="text-sm font-medium text-pure-white underline underline-offset-4">{FREE_PAGE.hero.secondaryCta}</a>
        </div>
        <div className="rv d3 mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-pure-white/70">{FREE_PAGE.trust.map((item) => <span key={item} className="flex items-center gap-2"><CircleCheck className="h-4 w-4" />{item}</span>)}</div>

        <div id="video" className="rv mt-14 w-full max-w-[920px] scroll-mt-24">
          <div className="free-video-glow relative aspect-video overflow-hidden rounded-card border border-pure-white/15 bg-near-black">
            <img src={videoPoster} alt="Laura erklärt das Creating Society System" className="h-full w-full object-cover opacity-65" />
            <div className="absolute inset-0 bg-pressed-graphite/30" />
            <button type="button" onClick={openOptin} aria-label="Kostenlosen Kurs öffnen" className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-pure-white/30 bg-pure-white text-near-black shadow-xl transition hover:scale-105 sm:h-24 sm:w-24">
              <Play className="ml-1 h-8 w-8 fill-current" />
            </button>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-pressed-graphite/90 to-transparent p-5 text-left sm:p-8">
              <div><p className="text-xs uppercase tracking-[0.08em] text-pure-white/60">{FREE_PAGE.video.duration}</p><p className="mt-1 text-lg font-medium sm:text-2xl">{FREE_PAGE.video.label}</p></div>
              <span className="hidden text-sm text-pure-white/60 sm:block">Video ansehen</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-fog bg-pure-white py-9">
      <p className="px-5 text-center text-xs font-medium uppercase tracking-[0.08em] text-stone">{FREE_PAGE.partnerTitle}</p>
      <div className="mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="free-logo-marquee flex items-center gap-16 pr-16">{[...logos, ...logos, ...logos].map((logo, i) => <img key={`${logo}-${i}`} src={`/logos/${logo}.svg`} alt={logo} className="h-7 w-28 object-contain grayscale opacity-55" />)}</div>
      </div>
    </section>

    <section id="vorteile" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <Heading eyebrow="Warum dieses Modell" title={<>Du brauchst kein riesiges Publikum. Du brauchst ein System<span className="ember-dot">.</span></>} body="Sechs Vorteile, die dieses Modell für Creatorinnen so zugänglich machen." />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{FREE_PAGE.modelBenefits.map((item, i) => { const Icon = icons[i]; return <article key={item.title} className="rv min-h-[245px] rounded-card border border-fog bg-pure-white p-8 transition hover:-translate-y-0.5 hover:shadow-xl"><Icon className="h-8 w-8" /><div className="my-7 h-px bg-fog" /><h3 className="text-xl font-medium">{item.title}</h3><p className="mt-3 text-[15px] leading-relaxed text-slate">{item.body}</p></article>; })}</div>
      <CTA onClick={openOptin} />
    </section>

    <section className="bg-pure-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><Heading eyebrow="Alles bereits verbunden" title={<>Ein komplettes Creator Business. Nicht nur ein Kurs<span className="ember-dot">.</span></>} body="Du baust alle Teile in der richtigen Reihenfolge auf — von deiner Positionierung bis zum ersten Verkauf." />
        <div className="mt-14 grid overflow-hidden rounded-card border border-fog bg-fog md:grid-cols-2 lg:grid-cols-3">{FREE_PAGE.included.map((item, i) => <article key={item.title} className="rv bg-pure-white p-8 outline outline-1 outline-fog"><p className="text-sm font-medium text-stone">0{i + 1}</p><h3 className="mt-10 text-2xl font-medium">{item.title}</h3><p className="mt-3 text-[15px] leading-relaxed text-slate">{item.body}</p></article>)}</div><CTA onClick={openOptin} /></div>
    </section>

    <section className="bg-pressed-graphite py-16 text-pure-white">
      <div className="overflow-hidden"><div className="free-ticker flex items-center gap-10 pr-10">{[...FREE_PAGE.ticker, ...FREE_PAGE.ticker].map((item, i) => <div key={`${item}-${i}`} className="flex items-center gap-10"><span className="whitespace-nowrap font-display text-2xl font-medium sm:text-4xl">{item}</span><span className="ember-dot text-3xl">•</span></div>)}</div></div>
    </section>

    <section id="ergebnisse" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <Heading eyebrow="Der gesamte Wert" title={<>Du bekommst nicht nur Videos. Du bekommst den ganzen Aufbau<span className="ember-dot">.</span></>} />
      <div className="mt-12 overflow-hidden rounded-card border border-fog bg-pure-white shadow-xl">{VALUE_STACK.map((item) => <div key={item.label} className="grid gap-2 border-b border-fog px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-9"><div><p className="font-medium">{item.label}</p><p className="mt-1 text-sm text-slate">{item.note}</p></div><p className="text-xl text-slate line-through">{item.worth}</p></div>)}<div className="flex items-center justify-between bg-pressed-graphite px-6 py-7 text-pure-white sm:px-9"><div><p className="text-sm text-pure-white/55">Gesamtwert {eur(totalWorth)}</p><p className="mt-1 text-xl font-medium">Dein Zugang heute</p></div><p className="font-display text-4xl font-medium">0 €</p></div></div>
      <CTA onClick={openOptin} />
    </section>

    <section id="kurs" className="scroll-mt-24 bg-pure-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><Heading eyebrow={FREE_PAGE.course.eyebrow} title={<>{FREE_PAGE.course.title}<span className="ember-dot">.</span></>} body={FREE_PAGE.course.body} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{MODULES.filter((module) => module.n > 0).map((module) => <article key={module.n} className="rv flex min-h-[280px] flex-col rounded-card bg-cream-paper p-8"><div className="flex items-center justify-between"><span className="text-sm font-medium text-stone">MODUL 0{module.n}</span><CircleCheck className="h-5 w-5" /></div><h3 className="mt-10 text-2xl font-medium leading-tight">{module.title}</h3><p className="mt-2 font-medium text-slate">{module.italic}</p><p className="mt-5 text-sm leading-relaxed text-slate">{module.body}</p><p className="mt-auto border-t border-fog pt-5 text-sm font-medium">Ergebnis: {module.result}</p></article>)}</div><CTA onClick={openOptin} /></div>
    </section>

    <section className="bg-pressed-graphite py-20 text-pure-white sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><Heading eyebrow="Du bist nicht allein" title={<>Gebaut für Umsetzung. Nicht fürs nächste offene Browser-Tab<span className="ember-dot">.</span></>} light />
        <div className="mt-14 grid gap-4 md:grid-cols-2">{FREE_PAGE.support.map((item) => <article key={item.title} className="rv rounded-card border border-pure-white/15 bg-pure-white/5 p-8"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-pure-white text-near-black"><Check className="h-5 w-5" /></div><h3 className="mt-8 text-2xl font-medium">{item.title}</h3><p className="mt-3 leading-relaxed text-pure-white/65">{item.body}</p></article>)}</div><CTA onClick={openOptin} light /></div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"><Heading eyebrow="So startest du" title={<>In drei einfachen Schritten zu deinem eigenen System<span className="ember-dot">.</span></>} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">{[["01", "Zugang holen", "Trag Vorname und E-Mail ein. Du brauchst keine Kreditkarte."], ["02", "Mit Laura mitbauen", "Starte sofort mit dem 30-Tage-Plan und setze jede Lektion direkt um."], ["03", "Deinen Store launchen", "Nach 30 Tagen stehen Positionierung, Produkt, Store und Launch."]].map(([number, title, body]) => <article key={number} className="rv overflow-hidden rounded-card bg-pure-white shadow-xl"><div className="aspect-[16/10] overflow-hidden"><img src={number === "01" ? lauraPortrait.url : number === "02" ? lauraWork.url : proofStripe.url} alt="" className="h-full w-full object-cover" /></div><div className="p-7"><span className="text-sm font-medium text-stone">SCHRITT {number}</span><h3 className="mt-4 text-2xl font-medium">{title}</h3><p className="mt-3 text-[15px] leading-relaxed text-slate">{body}</p></div></article>)}</div><CTA onClick={openOptin} />
    </section>

    <section className="bg-pure-white py-20 sm:py-28"><div className="mx-auto max-w-6xl px-5 sm:px-8"><Heading eyebrow={FREE_PAGE.proof.eyebrow} title={<>{FREE_PAGE.proof.title}<span className="ember-dot">.</span></>} body={FREE_PAGE.proof.body} />
      <div className="mt-14 columns-2 gap-3 md:columns-3 md:gap-5">{proofImages.map((src, i) => <figure key={src} className="rv mb-3 break-inside-avoid overflow-hidden rounded-card border border-fog bg-cream-paper p-2 shadow-xl md:mb-5"><img src={src} alt={`Creating Society Ergebnis ${i + 1}`} className="h-auto w-full rounded-[14px]" loading="lazy" /></figure>)}</div><CTA onClick={openOptin} /></div></section>

    <section id="warum-kostenlos" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div className="rv"><img src={lauraPortrait.url} alt="Laura" className="h-16 w-16 rounded-full object-cover" /><p className="funnel-eyebrow mt-7">Der ehrliche Grund</p><h2 className="mt-4 text-[36px] font-medium leading-[1.04] sm:text-[52px]">Warum ist ein Teil unseres {eur(PROGRAM_PRICE)}-Programms kostenlos<span className="ember-dot">?</span></h2></div><div className="rv space-y-6 text-[17px] leading-relaxed text-slate lg:pt-24"><p>Ein Teil der Frauen, die dieses System durcharbeiten, will danach mit uns weitermachen — im 12-Wochen-Programm, mit persönlicher Begleitung. Das ist unser Geschäft.</p><p>Wir zeigen lieber, wie wir arbeiten, statt 45 Minuten lang nur darüber zu sprechen. Wenn du das System allein umsetzt, hast du alles, was du brauchst. Wenn du es schneller willst, reden wir.</p><p className="font-medium text-near-black">Keine Kreditkarte. Kein Countdown. Kein versteckter Zwang. Nur das System und deine Entscheidung, es zu benutzen.</p><p className="text-xl font-medium text-near-black">— Laura</p></div></section>

    <section className="bg-pressed-graphite py-20 text-pure-white sm:py-28"><div className="mx-auto max-w-6xl px-5 sm:px-8"><Heading eyebrow={FREE_PAGE.examples.eyebrow} title={<>{FREE_PAGE.examples.title}<span className="ember-dot">.</span></>} light />
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{FREE_PAGE.examples.items.map((item, i) => <div key={item} className="rv flex items-center gap-4 rounded-card border border-pure-white/15 bg-pure-white/5 p-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pure-white text-sm font-medium text-near-black">{i + 1}</span><p className="font-medium">{item}</p></div>)}</div><CTA onClick={openOptin} light /></div></section>

    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"><Heading eyebrow="Häufige Fragen" title={<>Was du vor dem Start wissen willst<span className="ember-dot">.</span></>} />
      <div className="mt-12 divide-y divide-fog border-y border-fog">{FAQ.map((item) => <details key={item.q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium sm:text-2xl"><span>{item.q}</span><span className="text-slate transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl leading-relaxed text-slate">{item.a}</p></details>)}</div></section>

    <section className="relative mx-4 mb-4 overflow-hidden rounded-card text-pure-white"><img src={lauraWork.url} alt="Laura bei der Arbeit" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-pressed-graphite/80" /><div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-36"><p className="funnel-eyebrow text-pure-white/60">Dein nächster Schritt</p><h2 className="mt-5 text-[42px] font-medium leading-[1.02] sm:text-[64px]">Dein Content ist schon da. Jetzt kommt das System<span className="ember-dot">.</span></h2><p className="mx-auto mt-6 max-w-xl text-lg text-pure-white/70">Starte heute mit 22 Videos, sechs Modulen und deinem 30-Tage-Plan.</p><CTA onClick={openOptin} light /></div></section>

    <FreeFooter />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fog bg-pure-white/95 p-3 backdrop-blur sm:hidden"><Button type="button" onClick={openOptin} className="w-full">{FREE_PAGE.hero.primaryCta}</Button></div>
    <FreeOptinModal open={optinOpen} onOpenChange={setOptinOpen} />
  </main>;
}