import { createFileRoute } from "@tanstack/react-router";
import { FunnelShell, HonestBox } from "@/components/funnel";
import { IMPRINT_SECTIONS, LEGAL_INTRO } from "@/config/funnel/legal";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [
    { title: "Impressum — Creating Society" },
    { name: "description", content: "Impressum und Anbieterkennzeichnung von Creating Society." },
    { property: "og:title", content: "Impressum — Creating Society" },
    { property: "og:description", content: "Anbieterkennzeichnung und Kontaktangaben von Creating Society." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <FunnelShell>
      <section className="funnel-section">
        <div className="funnel-container max-w-[820px]">
          <p className="text-caption font-medium text-slate">{LEGAL_INTRO.eyebrow}</p>
          <h1 className="mt-5 font-display text-[36px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[56px]">Impressum<span className="ember-dot">.</span></h1>
          <div className="mt-12"><HonestBox heading="Vor Veröffentlichung prüfen">{LEGAL_INTRO.notice}</HonestBox></div>
          <div className="mt-16 divide-y divide-fog border-t border-fog">
            {IMPRINT_SECTIONS.map((section) => <section key={section.title} className="py-8"><h2 className="text-heading font-medium">{section.title}</h2><div className="mt-4 space-y-3 text-body leading-[1.5] text-slate">{section.paragraphs.map((text) => <p key={text}>{text}</p>)}</div></section>)}
          </div>
        </div>
      </section>
    </FunnelShell>
  );
}