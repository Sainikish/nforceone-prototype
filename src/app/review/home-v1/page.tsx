import { redirect } from "next/navigation";
import { AISection } from "@/components/sections/AISection";
import { AssistantBand } from "@/components/sections/AssistantBand";
import { CapabilityPillars } from "@/components/sections/CapabilityPillars";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { DeliveryBand } from "@/components/sections/DeliveryBand";
import { EngagementModel } from "@/components/sections/EngagementModel";
import { EngineeringSpread } from "@/components/sections/EngineeringSpread";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { QualitySection } from "@/components/sections/QualitySection";
import { TelecomSection } from "@/components/sections/TelecomSection";
import { Testimonial } from "@/components/sections/Testimonial";
import { clientTestimonials } from "@/content/testimonials";
import { reviewMode } from "@/lib/content";
import type { Metadata } from "next";

/** Previous 14-section homepage, kept for side-by-side review. Not indexed. */
export const metadata: Metadata = { title: "Homepage v1 (review)", robots: { index: false, follow: false } };

/**
 * Homepage story (PRD §7.1): positioning → credibility → capabilities → differentiation →
 * proof → products → voices → engagement → assistant → CTA.
 */
export default function HomeV1() {
  if (!reviewMode) redirect("/");
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <CapabilityPillars />
      <AISection />
      <QualitySection />
      <TelecomSection />
      <EngineeringSpread />
      <OutcomesSection />
      <ProductShowcase />
      <Testimonial items={clientTestimonials} />
      <DeliveryBand />
      <EngagementModel />
      <AssistantBand />
      <FinalCTA />
    </>
  );
}
