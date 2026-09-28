import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { PendingBadge, PendingField } from "@/components/ui/Pending";
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
            {p.status !== "approved" && <PendingBadge tone="dark">Publication status: approval pending</PendingBadge>}
          </>
        }
      />

      <article className="bg-white py-20 md:py-28">
        <div className="container-x">
          {productTemplate.map((s, i) => (
            <section
              key={s.key}
              aria-labelledby={`s-${s.key}`}
              className="grid gap-6 border-t border-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-4">
                <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 id={`s-${s.key}`} className="t-h3 mt-3">
                  {s.title}
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <PendingField need={s.need} />
              </div>
            </section>
          ))}
        </div>
      </article>

      <FinalCTA title={`See ${p.name} in action.`} />
    </>
  );
}
