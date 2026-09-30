import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { FlowGrid } from "@/components/diagrams/FlowGrid";
import { Pipeline } from "@/components/diagrams/Pipeline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

/**
 * Pillar page (CAP-001): hero with the problems it solves → services → how it works →
 * why NForce One (+ technologies) → proof (+ client voice) → closing CTA.
 */
export default async function PillarPage({ params }: PageProps<"/capabilities/[slug]">) {
  const p = getPillar((await params).slug);
  if (!p) notFound();

  const related = visible(caseStudies).filter((c) => p.related.caseStudies.includes(c.slug));
  const quoteContext = p.slug === "ai-agentic-solutions" ? "ai" : p.slug === "quality-engineering-ai-assurance" ? "qe" : null;
  const quote = quoteContext ? visible(clientTestimonials).find((t) => t.context.includes(quoteContext)) : undefined;
  const others = pillars.filter((o) => o.slug !== p.slug);
  const proofCount = related.length + (quote ? 1 : 0);
  const threeGroups = p.groups.length >= 3;
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "<") }} />

      {/* 1 · Hero + the problems this pillar solves */}
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
        lead={p.summary}
        actions={
          <>
            <Button href={`/contact?intent=${p.cta.intent}`} tone="dark" size="lg" track={`cap_${p.slug}_primary`}>
              {p.cta.label}
            </Button>
            <Button href="#services" tone="dark" variant="ghost" size="lg">
              {p.headings.services}
            </Button>
          </>
        }
        aside={
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="t-label text-gray-500">The problems we solve</h2>
            <ul className="mt-5 space-y-4">
              {p.problems.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] leading-snug text-gray-400">
                  <span aria-hidden className="mt-2 size-1 shrink-0 bg-red-on-dark" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* 2 · Services (+ AI systems we assure, for QE) */}
      <section id="services" aria-labelledby="services-title" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={<span id="services-title">{p.headings.services}</span>} />
          <div className={`mt-14 grid gap-12 ${threeGroups ? "lg:grid-cols-3 lg:gap-10" : "lg:grid-cols-2 lg:gap-16"}`}>
            {p.groups.map((g) => (
              <div key={g.title}>
                <h3 className="t-label flex items-center gap-3 text-gray-600">
                  {g.title}
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </h3>
                <ul className="mt-2">
                  {g.items.map((c) => (
                    <li
                      key={c.name}
                      className={`grid gap-1 border-b border-line py-5 ${threeGroups ? "" : "sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6"}`}
                    >
                      <span className="text-[16px] font-semibold tracking-[-0.01em]">{c.name}</span>
                      <span className="t-small text-gray-600">{c.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {p.assures && (
            <div className="mt-16 rounded-md bg-paper-50 p-6 md:p-10">
              <h3 className="t-h4 text-[20px]">AI systems we assure</h3>
              <p className="mt-2 max-w-[40rem] t-small text-gray-600">
                AI systems evolve, and so do their risks. We test for hallucination, bias, drift and misuse.
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {p.assures.map((a) => (
                  <li key={a.name}>
                    <p className="text-[15px] font-semibold">{a.name}</p>
                    <p className="mt-1 t-small text-gray-600">{a.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 3 · How it works */}
      {(p.flow || diagram) && (
        <section aria-labelledby="how" className="bg-ink-900 py-20 text-white md:py-28">
          <div className="container-x">
            <SectionHeading tone="dark" eyebrow="How it works" title={<span id="how">{p.headings.how}</span>} />
            <div className="mt-14 rounded-md border border-white/10 bg-black/40 p-6 md:p-10">
              {diagram ? (
                <div className="rounded-sm bg-white p-6 md:p-10">
                  <ArchitectureDiagram variant={diagram} />
                </div>
              ) : (
                <>
                  <div className="lg:hidden">
                    <FlowGrid steps={p.flow!} />
                  </div>
                  <div className="hidden lg:block">
                    <Pipeline steps={p.flow!} direction="responsive" tone="dark" slot={1} label={p.headings.how} numbered={false} />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Why NForce One (+ technologies) */}
      <section aria-labelledby="why" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Why NForce One" title={<span id="why">{p.headings.why}</span>} />
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {p.differentiators.map((d, i) => (
              <li key={d.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="border-t border-black pt-6">
                <h3 className="t-h4 text-[20px]">{d.title}</h3>
                <p className="mt-3 t-body text-gray-600">{d.line}</p>
              </li>
            ))}
          </ul>
          {p.technologies && (
            <div className="mt-16 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
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

      {/* 5 · Proof (+ client voice) and related */}
      <section aria-labelledby="proof" className="border-t border-line bg-paper-50 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Proof" title={<span id="proof">Where this work shows up</span>} />
          {/* Phones: swipeable row instead of a tall stack; tablet/desktop: grid */}
          <div className={`no-scrollbar mt-14 gap-4 max-md:-mx-(--gutter) max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-(--gutter) md:grid md:grid-cols-2 ${proofCount >= 3 ? "lg:grid-cols-3" : ""}`}>
            {related.map((c) => (
              <div key={c.slug} className="max-md:w-[84%] max-md:shrink-0 max-md:snap-start flex">
                <CaseStudyCard c={c} />
              </div>
            ))}
            {quote && (
              <figure className="max-md:w-[84%] max-md:shrink-0 max-md:snap-start flex flex-col justify-between rounded-md bg-black p-8 text-white">
                <div>
                  <span aria-hidden className="block text-[44px] leading-none text-red-on-dark">“</span>
                  <blockquote className="mt-2 text-[19px] font-medium leading-snug tracking-[-0.015em]">{quote.quote}</blockquote>
                </div>
                <figcaption className="mt-8 border-t border-white/10 pt-5">
                  {!quote.sample && <span className="block text-[15px] font-semibold">{quote.name}</span>}
                  <span className="t-label text-gray-500">
                    {quote.role} · {quote.company}
                  </span>
                  {quote.sample && (
                    <span className="mt-3 block">
                      <PendingBadge tone="dark">Sample testimonial</PendingBadge>
                    </span>
                  )}
                </figcaption>
              </figure>
            )}
          </div>

          <nav aria-label="Related capabilities and industry" className="mt-14">
            <ul
              className={`grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 ${
                p.related.industries.includes("telecom") ? "lg:grid-cols-4" : "md:grid-cols-3"
              }`}
            >
              {p.related.industries.includes("telecom") && (
                <li>
                  <Link href="/industries/telecom" className="group flex h-full items-center justify-between gap-4 bg-black p-6 text-white">
                    <span>
                      <span className="t-label text-red-on-dark">Industry</span>
                      <span className="mt-2 block text-[16px] font-semibold">Telecom</span>
                    </span>
                    <ArrowUpRight className="arrow-diag shrink-0" size={16} />
                  </Link>
                </li>
              )}
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
          </nav>
        </div>
      </section>

      <FinalCTA
        title={p.closing.title}
        lead={p.closing.lead}
        primary={p.cta.intent === "assessment" || p.cta.intent === "project" ? p.cta.intent : "expert"}
        primaryLabel={p.cta.label}
      />
    </>
  );
}
