import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms", description: "NForce One website terms of use.", path: "/terms" });

export default function TermsPage() {
  return <LegalPage title="Terms of use" need="Approved website terms of use from NForce One legal." />;
}
