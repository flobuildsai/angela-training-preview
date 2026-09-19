import { createFileRoute } from "@tanstack/react-router";
import { FunnelShell, HonestBox } from "@/components/funnel";
import { LEGAL_INTRO, PRIVACY_SECTIONS } from "@/config/funnel/legal";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ meta: [
    { title: "Datenschutzerklärung — Creating Society" },
    { name: "description", content: "Informationen zur Verarbeitung personenbezogener Daten bei Creating Society." },
    { property: "og:title", content: "Datenschutzerklärung — Creating Society" },
    { property: "og:description", content: "Datenschutzinformationen zu Website, Formularen, Kommunikation und eingebundenen Diensten." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
  ] }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <FunnelShell>
      <section className="funnel-section">
        <div className="funnel-container max-w-[820px]">
          <p className="text-caption font-medium text-slate">{LEGAL_INTRO.eyebrow}</p>
          <h1 className="mt-5 font-display text-[36px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[56px]">Datenschutzerklärung<span className="ember-dot">.</span></h1>
          <p className="mt-5 text-body text-slate">Stand: September 2026</p>
          <div className="mt-12"><HonestBox heading="Vor Veröffentlichung prüfen">{LEGAL_INTRO.notice}</HonestBox></div>
          <div className="mt-16 divide-y divide-fog border-t border-fog">
            {PRIVACY_SECTIONS.map((section, index) => <section key={section.title} className="py-8"><h2 className="text-heading font-medium">{index + 1}. {section.title}</h2><div className="mt-4 space-y-3 text-body leading-[1.5] text-slate">{section.paragraphs.map((text) => <p key={text}>{text}</p>)}{section.list ? <ul className="mt-5 grid gap-3 sm:grid-cols-2">{section.list.map((item) => <li key={item} className="rounded-input border border-fog bg-pure-white p-4">{item}</li>)}</ul> : null}</div></section>)}
          </div>
        </div>
      </section>
    </FunnelShell>
  );
}