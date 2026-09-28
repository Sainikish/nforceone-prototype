import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ContentChecklist } from "@/components/ui/ContentChecklist";
import { PendingBadge } from "@/components/ui/Pending";
import { TrackView } from "@/components/ui/TrackView";
import { getProduct, productTemplate, products } from "@/content/innovation";
import { isVisible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return products.filter(isVisible).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/innovation/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    ...pageMeta({
      title: p.name,
      description: p.summary ?? `${p.name}, a product designed and built by NForce One.`,
      path: `/innovation/${p.slug}`,
    }),
    ...(p.status !== "approved" && { robots: { index: false, follow: false } }),
  };
}

/** Product case-study template (PRD Appendix B). Sections fill as approved content is supplied. */
export default async function ProductPage({ params }: PageProps<"/innovation/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p || !isVisible(p)) notFound();

  return (
    <>
      <TrackView event="product_view" label={p.slug} />
      <PageHero
        eyebrow={
          <>
            <Link href="/innovation" className="hover:text-white">
              Innovation &amp; Products
            </Link>{" "}
            / Product
          </>
        }
        title={p.name}
        lead={p.summary}
        actions={
          <>
            <Button href="/contact?intent=demo" tone="dark" size="lg" track={`product_${p.slug}_demo`}>
              Request a Demo
            </Button>
            {p.status !== "approved" && (
              <span className="self-start sm:self-center">
                <PendingBadge tone="dark">Publication status: approval pending</PendingBadge>
              </span>
            )}
          </>
        }
      />

      {/* Product stories publish section by section (Appendix B); until then one checklist replaces eight empty blocks */}
      <section aria-label="Product story" className="bg-white py-16 md:py-24">
        <div className="container-x">
          <ContentChecklist
            title="Product story in preparation"
            intro={`The full ${p.name} case study covers these sections. Each is needed before it can be published.`}
            items={productTemplate}
          />
        </div>
      </section>

      <FinalCTA title={`See ${p.name} in action.`} lead="Book a walkthrough with the team that built it." primary="demo" />
    </>
  );
}
