import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseVisual, clientLabel } from "@/components/cards/CaseStudyCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { PendingBadge, PendingField } from "@/components/ui/Pending";
import { TrackView } from "@/components/ui/TrackView";
import { getPillar } from "@/content/capabilities";
import { caseStudies, caseTemplate, getCaseStudy } from "@/content/caseStudies";
import type { CaseStudy } from "@/content/types";
import { isVisible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.filter(isVisible).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return {
    ...pageMeta({
      title: c.title,
      description: `${c.kind} case study: ${c.title}. ${c.industry}, ${c.categories.filter((x) => x !== c.kind).join(", ")}.`,
      path: `/case-studies/${c.slug}`,
    }),
    ...(c.status !== "approved" && { robots: { index: false, follow: false } }),
  };
}

/** Renders one Appendix A section, or the brief for its missing content (review mode). */
function Field({ c, k, need }: { c: CaseStudy; k: (typeof caseTemplate)[number]["key"]; need: string }) {
  switch (k) {
    case "challenge":
    case "solution":
    case "deliveryModel":
      return c[k] ? <p className="t-lead text-gray-700">{c[k]}</p> : <PendingField need={need} />;
    case "technology":
      return c.technology?.length ? (
        <ul className="flex flex-wrap gap-2">
          {c.technology.map((t) => (
            <li key={t} className="rounded-xs border border-line px-3 py-1.5 text-[14px]">
              {t}
            </li>
          ))}
        </ul>
      ) : (
        <PendingField need={need} />
      );
    case "outcomes":
      return c.outcomes?.length ? (
        <ul className="space-y-3">
          {c.outcomes.map((o) => (
            <li key={o} className="t-lead border-l-2 border-red pl-5">
              {o}
            </li>
          ))}
        </ul>
      ) : (
        <PendingField need={need} />
      );
    case "visual":
      return <CaseVisual c={c} large />;
    case "quote":
      return c.quote ? (
        <blockquote>
          <p className="t-h3 font-medium">“{c.quote.text}”</p>
          <footer className="mt-5 t-small text-gray-600">
            {c.quote.name} · {c.quote.role}, {c.quote.company}
          </footer>
        </blockquote>
      ) : (
        <PendingField need={need} />
      );
  }
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c || !isVisible(c)) notFound();
  const caps = c.capabilities.map(getPillar).filter((p) => !!p);

  return (
    <>
      <TrackView event="case_study_view" label={c.slug} />
      <PageHero
        eyebrow={
          <>
            <Link href="/case-studies" className="hover:text-white">
              Case Studies
            </Link>{" "}
            / {c.kind}
          </>
        }
        title={c.title}
      >
        <dl className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Client", clientLabel(c)],
            ["Industry", c.industry],
            ["Year", c.year ?? "—"],
            ["Status", c.status === "approved" ? "Published" : "Approval pending"],
          ].map(([k, v]) => (
            <div key={k} className="bg-black p-5">
              <dt className="t-label text-gray-500">{k}</dt>
              <dd className="mt-2 text-[15px]">{k === "Status" && c.status !== "approved" ? <PendingBadge tone="dark" /> : v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <article className="bg-white py-20 md:py-28">
        <div className="container-x">
          {caseTemplate.map((s, i) => (
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
                <Field c={c} k={s.key} need={s.need} />
              </div>
            </section>
          ))}

          <section aria-labelledby="s-related" className="grid gap-6 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <span className="t-label text-gray-500">{String(caseTemplate.length + 1).padStart(2, "0")}</span>
              <h2 id="s-related" className="t-h3 mt-3">
                Related Capabilities
              </h2>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {caps.map((p) => (
                <li key={p.slug}>
                  <Link href={`/capabilities/${p.slug}`} className="group flex h-full items-center justify-between gap-4 bg-white p-6 hover:bg-paper-50">
                    <span>
                      <span className="t-label text-gray-500">{p.index}</span>
                      <span className="mt-2 block text-[16px] font-semibold">{p.name}</span>
                    </span>
                    <ArrowRight className="arrow shrink-0" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-20 flex flex-wrap gap-3">
            <Button href="/contact?intent=project" track={`case_${c.slug}_similar`}>
              Discuss a similar challenge
            </Button>
            <Button href="/case-studies" variant="secondary" arrow={false}>
              All case studies
            </Button>
          </div>
        </div>
      </article>

      <FinalCTA />
    </>
  );
}
