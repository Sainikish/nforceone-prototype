import { CapabilityExplorer } from "@/components/sections/CapabilityExplorer";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { InnovationStrip } from "@/components/sections/InnovationStrip";
import { PeopleDelivery } from "@/components/sections/PeopleDelivery";
import { ProofSection } from "@/components/sections/ProofSection";
import { TelecomSection } from "@/components/sections/TelecomSection";
import { suggestedQuestions } from "@/content/assistant-prompts";

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
