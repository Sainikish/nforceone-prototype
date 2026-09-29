import Link from "next/link";
import { CaseVisual, clientLabel } from "@/components/cards/CaseStudyCard";
import { ArrowLink, Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/caseStudies";
import { visible } from "@/lib/content";

/** Real Outcomes: one featured story + compact rows (HOME-006). Hidden if nothing is publishable. */
export function OutcomesSection() {
  const list = visible(caseStudies);
  if (list.length === 0) return null;
  const [f, ...rest] = list;

  const fields = [
    { k: "Challenge", v: f.challenge },
    { k: "Solution", v: f.solution },
    { k: "Outcome", v: f.outcomes?.[0] },
  ];

  return (
    <section aria-labelledby="out-title" className="bg-paper-50 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Real outcomes"
            title={<span id="out-title">Proof, not promises</span>}
            lead="Real engagements, told plainly. Client names and results appear only once they have been validated and approved for publication."
          />
          <ArrowLink href="/case-studies" className="shrink-0" track="home_all_case_studies">
            All case studies
          </ArrowLink>
        </div>

        <article
          aria-labelledby={`cs-${f.slug}`}
          className="group mt-16 grid gap-3 rounded-md border border-line bg-white p-3 md:mt-20 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <CaseVisual c={f} large />
          </div>
          <div className="flex flex-col p-5 md:p-8 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="t-label text-gray-500">
                {f.kind} · {f.industry} · {f.year}
              </span>
              {f.status === "pending" && <PendingBadge />}
            </div>
            <h3 id={`cs-${f.slug}`} className="t-h3 mt-5">
              {f.title}
            </h3>
            <p className="mt-3 t-small text-gray-600">{clientLabel(f)}</p>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {fields.map((x) => (
                <div key={x.k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                  <dt className="t-label pt-0.5 text-gray-500">{x.k}</dt>
                  <dd className={`t-small ${x.v ? "text-gray-700" : "text-gray-500"}`}>{x.v ?? "Awaiting approved content"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-10">
              <Button href={`/case-studies/${f.slug}`} track="home_featured_case">
                Read the case study
              </Button>
            </div>
          </div>
        </article>

        {rest.length > 0 && (
          <ul className="mt-3 divide-y divide-line rounded-md border border-line bg-white">
            {rest.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  data-track="case_study_view"
                  data-track-label={c.slug}
                  className="group grid items-center gap-2 px-6 py-6 transition-colors hover:bg-paper-50 md:grid-cols-12 md:gap-6 md:px-8"
                >
                  <span className="t-label text-gray-500 md:col-span-2">
                    {c.year} · {c.industry}
                  </span>
                  <span className="t-h4 md:col-span-5">{c.title}</span>
                  <span className="flex flex-wrap items-center gap-2 md:col-span-4">
                    {c.categories
                      .filter((x) => x !== "Client")
                      .map((x) => (
                        <span key={x} className="rounded-xs bg-paper-100 px-2 py-1 text-[12px] text-gray-700">
                          {x}
                        </span>
                      ))}
                    {c.status === "pending" && <PendingBadge />}
                  </span>
                  <ArrowRight className="arrow hidden justify-self-end md:col-span-1 md:block" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
