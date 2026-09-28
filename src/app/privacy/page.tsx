import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Privacy", description: "NForce One privacy notice.", path: "/privacy" }) };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      need="Approved privacy notice from NForce One legal, covering website forms, analytics cookies and AI assistant data handling and retention (PRD CHAT-011, LEAD-006)."
      facts={[
        "Contact form submissions are used only to respond to your enquiry.",
        "The website assistant answers from approved NForce One information and does not store conversation content.",
        "Analytics, when enabled, measure page views and interactions such as CTA clicks and form submissions.",
      ]}
    />
  );
}
