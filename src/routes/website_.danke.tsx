import { createFileRoute } from "@tanstack/react-router";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { FunnelShell, Steps, VimeoEmbed } from "@/components/funnel";
import { WEBSITE_COPY, WEBSITE_THANKS } from "@/config/funnel/website";

export const Route = createFileRoute("/website_/danke")({
  head: () => ({ meta: [
    { title: "Wir rufen dich an | Creating Society" },
    { name: "description", content: "Deine Website-Anfrage ist angekommen. Wir melden uns innerhalb von 24 Stunden." },
    { property: "og:title", content: "Wir rufen dich an | Creating Society" },
    { property: "og:description", content: "Deine Website-Anfrage ist angekommen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
  ] }),
  component: WebsiteThanksPage,
});

function WebsiteThanksPage() {
  return <FunnelShell partnerNotice={WEBSITE_COPY.partnerNotice}>
    <section className="funnel-section"><div className="funnel-container grid grid-cols-12 gap-8"><div className="col-span-full max-w-[760px]"><p className="funnel-eyebrow">{WEBSITE_THANKS.eyebrow}</p><h1 className="mt-5 text-[38px] font-medium leading-[1.02] sm:text-[56px]">{WEBSITE_THANKS.title.slice(0, -1)}<span className="ember-dot">.</span></h1><p className="mt-6 max-w-[620px] text-[19px] leading-[1.5] text-slate">{WEBSITE_THANKS.sub}</p></div><div className="col-span-full mt-8 lg:col-span-9"><VimeoEmbed id={WEBSITE_THANKS.videoId} title="Was dich jetzt erwartet" /></div></div></section>
    <section className="funnel-section bg-pure-white"><div className="funnel-container"><p className="funnel-eyebrow">{WEBSITE_THANKS.stepsEyebrow}</p><h2 className="mt-4 max-w-[620px] text-[36px] font-medium leading-[1.08]">{WEBSITE_THANKS.stepsHeading}</h2><p className="mt-4 max-w-[620px] text-subheading text-slate">{WEBSITE_THANKS.stepsSub}</p><div className="mt-16"><Steps items={WEBSITE_THANKS.steps.map((step) => ({ ...step }))} /></div></div></section>
    <section className="funnel-section"><div className="funnel-container"><div className="max-w-[760px] rounded-card bg-pure-white p-8 shadow-xl sm:p-12"><p className="text-subheading text-slate">{WEBSITE_THANKS.phoneHeading}</p><p className="mt-4 font-display text-[32px] font-medium sm:text-[42px]"><a href={`tel:${WEBSITE_THANKS.whatsappNumber.replace(/\s/g, "")}`}>{WEBSITE_THANKS.whatsappNumber}</a></p></div></div></section>
    {WEBSITE_THANKS.setterCalendlyUrl ? <section className="funnel-section bg-pure-white"><div className="funnel-container"><h2 className="text-[36px] font-medium">{WEBSITE_THANKS.calendlyHeading}</h2><div className="mt-10"><CalendlyEmbed url={WEBSITE_THANKS.setterCalendlyUrl} /></div></div></section> : null}
  </FunnelShell>;
}