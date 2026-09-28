import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Pipeline } from "@/components/diagrams/Pipeline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonial } from "@/components/sections/Testimonial";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TrackView } from "@/components/ui/TrackView";
import { getPillar, pillars } from "@/content/capabilities";
import { caseStudies } from "@/content/caseStudies";
import { clientTestimonials } from "@/content/testimonials";
import { visible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/capabilities/[slug]">): Promise<Metadata> {
  const p = getPillar((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.seo.title, description: p.seo.description, path: `/capabilities/${p.slug}` });
}

export default async function PillarPage({ params }: PageProps<"/capabilities/[slug]">) {
  const p = getPillar((await params).slug);
  if (!p) notFound();

  const related = visible(caseStudies).filter((c) => p.related.caseStudies.includes(c.slug));
  const others = pillars.filter((o) => o.slug !== p.slug);
  const diagram =
    p.slug === "digital-engineering" ? "digital" : p.slug === "data-cloud-enterprise-platforms" ? "data" : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    description: p.summary,
    provider: { "@type": "Organization", name: "NForce One" },
    serviceType: p.groups.flatMap((g) => g.items.map((i) => i.name)),
  };

  return (
    <>
      <TrackView event="capability_view" label={p.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow={
          <>
            <Link href="/capabilities" className="hover:text-white">
              Capabilities
            </Link>{" "}
            / {p.index}
          </>
        }
        title={p.name}
        lead={p.tagline}
        actions={
          <>
            <Button href={`/contact?intent=${p.cta.intent}`} tone="dark" size="lg" track={`cap_${p.slug}_primary`}>
              {p.cta.label}
            </Button>
            <Button href="#services" tone="dark" variant="secondary" size="lg" arrow={false}>
              See what we do
            </Button>
          </>
        }
      />

      {/* Problems (CAP-001) */}
      <section aria-labelledby="problems" className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why it matters" title={<span id="problems">The problems we solve</span>} lead={p.summary} />
          </div>
          <ol className="grid gap-px self-end overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {p.problems.map((x, i) => (
              <li key={x} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="bg-white p-6 md:p-8">
                <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[17px] font-medium leading-snug tracking-[-0.015em]">{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-title" className="bg-paper-50 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={<span id="services-title">What we deliver</span>} />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {p.groups.map((g) => (
              <div key={g.title}>
                <h3 className="t-label flex items-center gap-3 text-gray-600">
                  {g.title}
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </h3>
                <ul className="mt-2">
                  {g.items.map((c) => (
                    <li key={c.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
                      <span className="text-[16px] font-semibold tracking-[-0.01em]">{c.name}</span>
                      <span className="t-small text-gray-600">{c.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works (CAP-004) */}
      {(p.flow || diagram) && (
        <section aria-labelledby="how" className="bg-ink-900 py-20 text-white md:py-28">
          <div className="container-x">
            <SectionHeading tone="dark" eyebrow="How it works" title={<span id="how">From first signal to outcome</span>} />
            <div className="mt-14 rounded-md border border-white/10 bg-black/40 p-8 md:p-10">
              {diagram ? (
                <div className="rounded-sm bg-white p-6 md:p-10">
                  <ArchitectureDiagram variant={diagram} />
                </div>
              ) : (
                <Pipeline steps={p.flow!} direction="responsive" tone="dark" slot={1} label={`${p.name} workflow`} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* AI systems we assure (QE only) */}
      {p.assures && (
        <section aria-labelledby="assure" className="bg-white py-20 md:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="AI Assurance"
                title={<span id="assure">AI systems we assure</span>}
                lead="AI systems evolve, and so do their risks. We test for hallucination, bias, drift and misuse so you can trust what you ship."
              />
            </div>
            <ul className="grid gap-px self-start overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {p.assures.map((a) => (
                <li key={a.name} className="sm:[&:last-child:nth-child(odd)]:col-span-2 bg-white p-6">
                  <p className="text-[16px] font-semibold">{a.name}</p>
                  <p className="mt-2 t-small text-gray-600">{a.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Differentiators + technology */}
      <section aria-labelledby="diff" className={`${p.assures ? "bg-paper-50" : "bg-white"} py-20 md:py-28`}>
        <div className="container-x">
          <SectionHeading eyebrow="Why NForce One" title={<span id="diff">What sets our approach apart</span>} />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {p.differentiators.map((d, i) => (
              <li key={d.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="border-t border-black pt-6">
                <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-4 text-[20px]">{d.title}</h3>
                <p className="mt-3 t-body text-gray-600">{d.line}</p>
              </li>
            ))}
          </ol>
          {p.technologies && (
            <div className="mt-20 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
              <h3 className="t-label text-gray-600 lg:col-span-3">Technologies &amp; tools</h3>
              <ul className="flex flex-wrap gap-2 lg:col-span-9">
                {p.technologies.map((t) => (
                  <li key={t} className="rounded-xs border border-line px-3 py-1.5 text-[14px] text-gray-700">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Proof + cross-links (CAP-003) */}
      <section aria-labelledby="proof" className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Proof & related" title={<span id="proof">Where this capability shows up</span>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CaseStudyCard key={c.slug} c={c} />
            ))}
            {p.related.industries.includes("telecom") && (
              <Link
                href="/industries/telecom"
                className="group flex min-h-[280px] flex-col justify-between rounded-md bg-black p-8 text-white"
              >
                <Eyebrow tone="dark">Industry</Eyebrow>
                <div>
                  <p className="t-h3">Telecom</p>
                  <p className="mt-3 t-small text-gray-400">
                    OSS/BSS, CX / IVR / Voice AI, network and field operations, data and automation.
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    Explore Telecom <ArrowUpRight className="arrow-diag" size={14} />
                  </span>
                </div>
              </Link>
            )}
          </div>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/capabilities/${o.slug}`} className="group flex h-full items-center justify-between gap-4 bg-white p-6 hover:bg-paper-50">
                  <span>
                    <span className="t-label text-gray-500">{o.index}</span>
                    <span className="mt-2 block text-[16px] font-semibold">{o.name}</span>
                  </span>
                  <ArrowRight className="arrow shrink-0" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(p.slug === "quality-engineering-ai-assurance" || p.slug === "ai-agentic-solutions") && (
        <Testimonial items={clientTestimonials} context={p.slug === "ai-agentic-solutions" ? "ai" : "qe"} />
      )}
      <FinalCTA />
    </>
  );
}
