import type { Metadata } from "next";
import { CapabilityExplorer } from "@/components/sections/CapabilityExplorer";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { InnovationStrip } from "@/components/sections/InnovationStrip";
import { PeopleDelivery } from "@/components/sections/PeopleDelivery";
import { ProofSection } from "@/components/sections/ProofSection";
import { TelecomSection } from "@/components/sections/TelecomSection";
import { suggestedQuestions } from "@/content/assistant-prompts";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "NForce One | AI, Quality Engineering & Digital Engineering",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "NForce One | AI, Quality Engineering & Digital Engineering",
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NForce One | AI, Quality Engineering & Digital Engineering",
    description: site.description,
  },
};

/**
 * Homepage (PRD §7.1), consolidated to eight sections:
 * positioning → credibility → capabilities → differentiation → proof → products → people & engagement → CTA.
 * Capability depth lives on the pillar pages. The assistant is always available via the floating launcher.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <CapabilityExplorer />
      <TelecomSection numbered={false} />
      <ProofSection />
      <InnovationStrip />
      <PeopleDelivery />
      <FinalCTA prompts={suggestedQuestions.slice(0, 3)} />
    </>
  );
}
