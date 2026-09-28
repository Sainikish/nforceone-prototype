import Link from "next/link";
import { HeroSystem } from "@/components/diagrams/HeroSystem";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { innovationAreas, products } from "@/content/innovation";
import { visible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Innovation & Products",
  description:
    "NForce One designs, builds and operates its own products, accelerators and AI-driven platforms, from AI-powered Quality Engineering to agentic automation.",
  path: "/innovation",
});

export default function InnovationPage() {
  const list = visible(products);
  return (
    <>
      <PageHero
        eyebrow="Innovation & Products"
        title="Products, platforms and accelerators, built by NForce One."
        lead="NForce One designs, builds and operates its own products, accelerators and AI-driven platforms, and brings what we learn to every client engagement."
        actions={
          <Button href="/contact?intent=demo" tone="dark" size="lg" track="innovation_demo" >
            Request a Product Demo
          </Button>
        }
        aside={
          <div className="mx-auto max-w-[420px] opacity-90">
            <HeroSystem />
          </div>
        }
      />

      <section aria-labelledby="areas" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Where we innovate" title={<span id="areas">Seven areas of engineering innovation</span>} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {innovationAreas.map((a, i) => (
              <li key={a.name} data-reveal style={{ "--reveal-i": i % 4 } as React.CSSProperties} className="flex min-h-[200px] flex-col justify-between bg-white p-6 md:p-8">
                <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[18px] font-semibold leading-snug tracking-[-0.015em]">{a.name}</span>
                  <span className="mt-2 block t-small text-gray-600">{a.line}</span>
                </span>
              </li>
            ))}
            <li className="flex min-h-[200px] flex-col justify-between bg-black p-6 text-white md:p-8">
              <span className="t-label text-gray-500">Client products</span>
              <span>
                <span className="block text-[18px] font-semibold">Built with clients</span>
                <span className="mt-2 block t-small text-gray-400">Client products are featured where the client approves.</span>
              </span>
            </li>
          </ol>
        </div>
      </section>

      {list.length > 0 && (
        <section aria-labelledby="portfolio" className="bg-ink-900 py-20 text-white md:py-28">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                tone="dark"
                eyebrow="Product portfolio"
                title={<span id="portfolio">NForce One products</span>}
                lead="Each product has a full case study covering the problem, architecture, AI usage and business value. Stories are published as each product is approved for external visibility."
              />
              <PendingBadge tone="dark">Publication pending approval</PendingBadge>
            </div>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p, i) => {
                const inner = (
                  <>
                    <span className="flex items-center justify-between">
                      <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                      {p.status === "approved" && <ArrowUpRight className="arrow-diag text-gray-500 group-hover:text-white" size={15} />}
                    </span>
                    <span>
                      <span className="block text-[19px] font-semibold tracking-[-0.015em]">{p.name}</span>
                      <span className="mt-2 block t-small text-gray-500">{p.summary ?? "Case study in preparation"}</span>
                    </span>
                  </>
                );
                const cls = "flex h-full min-h-[160px] flex-col justify-between bg-ink-900 p-6";
                return (
                  <li key={p.slug}>
                    {p.status === "approved" ? (
                      <Link
                        href={`/innovation/${p.slug}`}
                        data-track="product_view"
                        data-track-label={p.slug}
                        className={`group ${cls} transition-colors hover:bg-ink-700`}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA
        title="See our products in action."
        lead="Book a walkthrough of NForce One products, accelerators and AI platforms."
        primary="demo"
      />
    </>
  );
}
