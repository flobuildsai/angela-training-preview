import { createFileRoute } from "@tanstack/react-router";
import { FunnelProvider, useFunnel } from "@/funnel-content/FunnelContext";
import { FunnelLayout } from "@/funnel-content/FunnelLayout";
import { StepAnalysis, StepHero } from "@/funnel-content/steps/intro";
import {
  StepCamera,
  StepFollowers,
  StepHours,
  StepPosting,
  StepReadiness,
  StepSkill,
} from "@/funnel-content/steps/questions";
import {
  StepBelief,
  StepCalculator,
  StepScore,
} from "@/funnel-content/steps/insight";
import { StepRoadmap } from "@/funnel-content/steps/plan";
import { StepLead, StepResult } from "@/funnel-content/steps/finish";

export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      { title: "Content-Check | Creating Society" },
      {
        name: "description",
        content:
          "In 2 Minuten: Wie viel du mit deinem Content verdienen kannst, dein eigenes Angebot und dein 12-Wochen-Plan. Danach direkt Strategiegespräch buchen.",
      },
      { property: "og:title", content: "Content-Check | Creating Society" },
      {
        property: "og:description",
        content:
          "Deine Nische, deine Zahlen, dein 12-Wochen-Plan. Kostenlos in zwei Minuten.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentFunnelPage,
});

function StepRouter() {
  const { step } = useFunnel();
  switch (step) {
    case 0:
      return <StepHero />;
    case 1:
      return <StepAnalysis />;
    case 2:
      return <StepFollowers />;
    case 3:
      return <StepPosting />;
    case 4:
      return <StepSkill />;
    case 5:
      return <StepCamera />;
    case 6:
      return <StepHours />;
    case 7:
      return <StepReadiness />;
    case 8:
      return <StepScore />;
    case 9:
      return <StepBelief />;
    case 10:
      return <StepCalculator />;
    case 11:
      return <StepLead />;
    case 12:
      return <StepResult />;
    default:
      return null;
  }
}

function ContentFunnelPage() {
  return (
    <FunnelProvider>
      <FunnelLayout>
        <StepRouter />
      </FunnelLayout>
    </FunnelProvider>
  );
}
