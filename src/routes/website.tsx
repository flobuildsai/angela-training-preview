import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, BriefcaseBusiness, Clock3, Laptop, MessageCircle, PackageOpen, Smartphone, Store, UserRound, WandSparkles } from "lucide-react";
import lauraNew from "@/assets/laura-new.jpg.asset.json";
import lauraPortrait from "@/assets/laura-portrait.jpg.asset.json";
import lauraWalk from "@/assets/laura-walk.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { CardGrid, FAQ, FunnelShell, HonestBox, LogoRow, ProofBlock, Steps, StickyCTA, Testimonials, ValueStack } from "@/components/funnel";
import { WebsiteClaimModal } from "@/components/funnel/WebsiteClaimModal";
import { WEBSITE_COPY } from "@/config/funnel/website";
import { trackEvent } from "@/lib/track";
import { useReveal } from "@/components/FreeShell";

export const Route = createFileRoute("/website")({
  head: () => ({ meta: [
    { title: "Deine kostenlose Website | Creating Society" },
    { name: "description", content: "Wir bauen deine Website als Social Media Managerin gemeinsam mit dir und schalten sie in 20 Minuten live." },
    { property: "og:title", content: "Deine kostenlose Website | Creating Society" },
    { property: "og:description", content: "Website, Kundenportal und Akquise-Toolkit für deinen Start als Social Media Managerin." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WebsitePage,
});

const WHY_ICONS = [Store, BriefcaseBusiness, UserRound, Clock3, Laptop, Smartphone];
const PACKAGE_ICONS = [Laptop, MessageCircle, WandSparkles, MessageCircle, BriefcaseBusiness, Clock3];

function SectionIntro({ eyebrow, heading, sub }: { eyebrow: string; heading: string; sub: string }) {
  return <div className="rv col-span-full max-w-[620px]"><p className="funnel-eyebrow">{eyebrow}</p><h2 className="mt-4 text-[36px] font-medium leading-[1.08]">{heading}</h2><p className="mt-4 text-subheading leading-[1.5] text-slate">{sub}</p></div>;
}

function WebsitePage() {
  useReveal();
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => { trackEvent("website_claim_view"); }, []);
  const openModal = () => { trackEvent("website_claim_open"); setModalOpen(true); };

  return (
    <FunnelShell partnerNotice={WEBSITE_COPY.partnerNotice}>
      <section className="relative mx-4 min-h-[88vh] overflow-hidden rounded-card text-pure-white lg:min-h-screen">
        <img src={lauraNew.url} alt="Laura Mercedes bei der Arbeit" className="absolute inset-0 h-full w-full object-cover object-[center_28%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-pressed-graphite)_0%,color-mix(in_srgb,var(--color-pressed-graphite)_45%,transparent)_48%,transparent_80%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1120px] items-end px-5 pb-14 sm:px-8 sm:pb-20 lg:min-h-screen">
          <div className="max-w-[850px]">
            <p className="funnel-eyebrow text-pure-white/80">{WEBSITE_COPY.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-[13ch] text-[38px] font-medium leading-[1.02] tracking-[-0.02em] sm:text-[52px] lg:text-[64px]">{WEBSITE_COPY.hero.title.slice(0, -1)}<span className="ember-dot">.</span></h1>
            <p className="mt-6 max-w-[680px] text-[19px] leading-[1.5] text-pure-white/90">{WEBSITE_COPY.hero.sub}</p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button id="website-claim-target" onClick={openModal} size="lg" className="bg-pure-white px-[18px] py-3 text-near-black hover:bg-pure-white/90">{WEBSITE_COPY.hero.cta}</Button>
              <a href="#kostenlos" className="inline-flex items-center gap-2 text-sm font-medium text-pure-white underline-offset-4 hover:underline">{WEBSITE_COPY.hero.ghost}<ArrowDown className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="funnel-section"><div className="funnel-container rv"><p className="funnel-eyebrow mb-10">{WEBSITE_COPY.logos.eyebrow}</p><LogoRow logos={[...WEBSITE_COPY.logos.items]} /></div></section>

      <section className="funnel-section bg-pure-white"><div className="funnel-container grid grid-cols-12 gap-8"><SectionIntro {...WEBSITE_COPY.why} /><div className="col-span-full mt-5 rv"><CardGrid items={WEBSITE_COPY.why.cards.map((title, index) => { const Icon = WHY_ICONS[index] ?? Store; return { icon: <Icon />, title, body: "" }; })} /></div></div></section>

      <section className="funnel-section"><div className="funnel-container grid grid-cols-12 gap-8"><SectionIntro {...WEBSITE_COPY.package} /><div className="col-span-full mt-5 rv"><CardGrid items={WEBSITE_COPY.package.cards.map((title, index) => { const Icon = PACKAGE_ICONS[index] ?? PackageOpen; return { icon: <Icon />, title, body: "" }; })} /></div></div></section>

      <section className="funnel-section bg-pure-white"><div className="funnel-container grid grid-cols-12 items-start gap-8"><div className="col-span-full max-w-[620px] lg:col-span-5"><SectionIntro eyebrow={WEBSITE_COPY.value.eyebrow} heading={WEBSITE_COPY.value.heading} sub={WEBSITE_COPY.value.sub} /></div><div className="col-span-full rv lg:col-span-6 lg:col-start-7"><ValueStack items={[...WEBSITE_COPY.value.items]} total={WEBSITE_COPY.value.total} price={WEBSITE_COPY.value.price} footnote={WEBSITE_COPY.value.footnote} /><Button onClick={openModal} size="lg" className="mt-6 w-full">{WEBSITE_COPY.hero.cta}</Button></div></div></section>

      <section className="relative mx-4 min-h-[68vh] overflow-hidden rounded-card text-pure-white"><img src={lauraWalk.url} alt="Laura Mercedes unterwegs" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-pressed-graphite/50" /><div className="relative mx-auto flex min-h-[68vh] max-w-[900px] flex-col items-center justify-center px-5 py-24 text-center"><h2 className="text-[36px] font-medium leading-[1.08] sm:text-[52px]">{WEBSITE_COPY.photoBand.heading}</h2><Button onClick={openModal} size="lg" className="mt-8 bg-pure-white text-near-black hover:bg-pure-white/90">{WEBSITE_COPY.hero.cta}</Button></div></section>

      <section className="funnel-section"><div className="funnel-container"><SectionIntro eyebrow={WEBSITE_COPY.steps.eyebrow} heading={WEBSITE_COPY.steps.heading} sub={WEBSITE_COPY.steps.sub} /><div className="mt-16 rv"><Steps items={WEBSITE_COPY.steps.items.map((item, index) => ({ ...item, image: <img src={[lauraPortrait.url, lauraWalk.url, lauraNew.url][index]} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /> }))} /></div></div></section>

      <section id="kostenlos" className="funnel-section scroll-mt-8 bg-pure-white"><div className="funnel-container grid grid-cols-12"><div className="col-span-full rv lg:col-span-9"><p className="funnel-eyebrow mb-5">{WEBSITE_COPY.honest.eyebrow}</p><HonestBox heading={WEBSITE_COPY.honest.heading}>{WEBSITE_COPY.honest.body}</HonestBox></div></div></section>

      <section className="funnel-section"><div className="funnel-container rv"><p className="funnel-eyebrow mb-8">{WEBSITE_COPY.laura.eyebrow}</p><ProofBlock photo={<img src={lauraPortrait.url} alt="Laura Mercedes" loading="lazy" className="aspect-[4/5] w-full object-cover" />} heading={WEBSITE_COPY.laura.heading} quote={WEBSITE_COPY.laura.quote} stats={[...WEBSITE_COPY.laura.stats]} /></div></section>

      <Testimonials items={[...WEBSITE_COPY.testimonials]} />

      <section className="funnel-section bg-pure-white"><div className="funnel-container grid grid-cols-12 gap-8"><SectionIntro eyebrow={WEBSITE_COPY.faq.eyebrow} heading={WEBSITE_COPY.faq.heading} sub={WEBSITE_COPY.faq.sub} /><div className="col-span-full mt-5 rv lg:col-span-9"><FAQ items={[...WEBSITE_COPY.faq.items]} /></div></div></section>

      <section className="funnel-section"><div className="funnel-container grid grid-cols-12"><div className="col-span-full rv rounded-card bg-pure-white p-8 shadow-xl sm:p-14 lg:col-span-10"><p className="funnel-eyebrow">{WEBSITE_COPY.final.eyebrow}</p><h2 className="mt-4 text-[36px] font-medium leading-[1.08] sm:text-[52px]">{WEBSITE_COPY.final.heading}</h2><Button onClick={openModal} size="lg" className="mt-8">{WEBSITE_COPY.final.cta}</Button></div></div></section>

      <WebsiteClaimModal open={modalOpen} onOpenChange={setModalOpen} />
      <StickyCTA label={WEBSITE_COPY.hero.cta} targetId="website-claim-target" onClick={openModal} />
    </FunnelShell>
  );
}