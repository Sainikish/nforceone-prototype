import { CaseStudyGrid } from "@/components/cards/CaseStudyGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { caseStudies, productCaseStudies } from "@/content/caseStudies";
import { products } from "@/content/innovation";
import { PendingBadge } from "@/components/ui/Pending";
import { reviewMode, visible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
    "Client and product case studies from NForce One across AI, Quality Engineering, Digital Engineering and Telecom.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  // Only publish-ready product stories get full cards; the rest are listed compactly as "in preparation"
  const items = [
    ...visible(caseStudies).map((c) => ({ c })),
    ...productCaseStudies(products.filter((p) => p.status === "approved")),
  ];
  const inPrep = reviewMode ? products.filter((p) => p.status !== "approved") : [];
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real engagements. Real products."
        lead="Client programs and NForce One products, each told the same way: the challenge, what we built, how we delivered and what changed. Names and metrics appear only with approval."
      />
      <section aria-label="Case study library" className="bg-paper-50 py-16 md:py-24">
        <div className="container-x">
          <h2 className="sr-only">All case studies</h2>
          <CaseStudyGrid items={items} />

          {inPrep.length > 0 && (
            <div className="mt-16 border-t border-line pt-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="t-h4 text-[20px]">Product case studies in preparation</h2>
                <PendingBadge>Publication pending approval</PendingBadge>
              </div>
              <p className="mt-2 max-w-[42rem] t-small text-gray-600">
                Every NForce One product gets a full case study. These are being prepared for publication.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {inPrep.map((p) => (
                  <li key={p.slug} className="rounded-sm border border-line bg-white px-3.5 py-2 text-[14px] text-gray-700">
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <FinalCTA
        title="Facing a similar challenge?"
        lead="Tell us about it, and we'll share how we've approached programs like yours."
        primary="project"
      />
    </>
  );
}
