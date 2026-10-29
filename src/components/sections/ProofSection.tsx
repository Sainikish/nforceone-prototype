import Link from "next/link";
import { CaseVisual, clientLabel } from "@/components/cards/CaseStudyCard";
import { ArrowLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/caseStudies";
import { clientTestimonials } from "@/content/testimonials";
import { visible } from "@/lib/content";

/** Real Outcomes + Client Voice in one section (HOME-006, HOME-009). Renders nothing if neither is publishable. */
export function ProofSection() {
  const [c] = visible(caseStudies);
  const t = visible(clientTestimonials).find((x) => x.context.includes("general"));
  if (!c && !t) return null;

  return (
    <section aria-labelledby="proof-title" className="bg-paper-50 py-14 md:py-20">
      <div className="container-x">
        <Eyebrow center className="mb-10">Real outcomes</Eyebrow>
        <div className="mx-auto max-w-[48rem] text-center">
          <h2 id="proof-title" data-reveal className="t-h2 text-balance">
            Proof, not promises
          </h2>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-12">
          {c && (
            <Link
              href={`/case-studies/${c.slug}`}
              data-track="case_study_view"
              data-track-label={c.slug}
              className="group flex flex-col overflow-hidden rounded-md border border-line bg-white p-3 transition-colors hover:border-black/30 lg:col-span-7"
            >
              <CaseVisual c={c} sizes="(min-width: 1024px) 58vw, 100vw" />
              <div className="flex flex-1 items-end justify-between gap-6 px-3 pt-6 pb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="t-label text-gray-600">
                      {c.industry} · {c.year}
                    </span>
                    {c.status === "pending" && <PendingBadge />}
                  </div>
                  <h3 className="t-h3 mt-3 max-w-[24ch]">{c.title}</h3>
                  <p className="mt-2 t-small text-gray-600">{clientLabel(c)}</p>
                  {c.solution && <p className="mt-4 max-w-[36rem] t-small text-gray-700">{c.solution}</p>}
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-line transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="arrow" size={15} />
                </span>
              </div>
            </Link>
          )}

          {t && (
            <figure className="flex flex-col justify-between rounded-md bg-black p-8 text-white md:p-10 lg:col-span-5">
              <div>
                <span aria-hidden className="block text-[56px] leading-none text-red-on-dark">“</span>
                <blockquote className="mt-2 text-[clamp(1.25rem,1rem+0.8vw,1.625rem)] font-medium leading-snug tracking-[-0.02em] text-balance">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-10 border-t border-white/10 pt-6">
                {!t.sample && <span className="block text-[15px] font-semibold">{t.name}</span>}
                <span className="t-label text-gray-500">
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </figure>
          )}
        </div>

        <div className="mt-10 flex justify-start">
          <ArrowLink href="/case-studies" track="home_all_case_studies">
            All case studies
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
