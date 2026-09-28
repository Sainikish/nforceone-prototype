import { CaseStudyGrid } from "@/components/cards/CaseStudyGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { caseStudies, productCaseStudies } from "@/content/caseStudies";
import { products } from "@/content/innovation";
import { visible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
    "Client and product case studies from NForce One across AI, Quality Engineering, Digital Engineering and Telecom.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const items = [
    ...visible(caseStudies).map((c) => ({ c })),
    ...productCaseStudies(visible(products)),
  ];
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real engagements. Real products."
        lead="Client programs and NForce One products, each told the same way: the challenge, what we built, how we delivered and what changed. Names and metrics are published only with approval."
      />
      <section aria-label="Case study library" className="bg-paper-50 py-16 md:py-24">
        <div className="container-x">
          <h2 className="sr-only">All case studies</h2>
          <CaseStudyGrid items={items} />
        </div>
      </section>
      <FinalCTA title="Discuss a similar challenge." />
    </>
  );
}
