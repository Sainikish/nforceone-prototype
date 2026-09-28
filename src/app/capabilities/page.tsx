import Link from "next/link";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { pillars } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Capabilities",
  description:
    "Find the right NForce One capability for your problem: AI & Agentic Solutions; Quality Engineering & AI Assurance; Digital Engineering; Data, Cloud & Enterprise Platforms.",
  path: "/capabilities",
});

/** Capabilities overview as a decision page: start from the problem, land on the pillar. */
export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Start from the problem."
        lead="Four capability pillars, one standard of engineering. Find the one that matches what's in your way."
      />

      <section aria-label="Which capability fits your problem" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="hidden grid-cols-12 gap-8 border-b border-black pb-4 lg:grid lg:px-4">
            <p className="t-label col-span-6 text-gray-600">If your challenge is…</p>
            <p className="t-label col-span-6 text-gray-600">…start here</p>
          </div>
          <ol>
            {pillars.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/capabilities/${p.slug}`}
                  data-track="capability_view"
                  data-track-label={p.slug}
                  className="group grid gap-6 py-10 transition-colors hover:bg-paper-50 lg:grid-cols-12 lg:gap-8 lg:px-4"
                >
                  <ul className="space-y-2.5 lg:col-span-6">
                    {p.problems.slice(0, 3).map((x) => (
                      <li key={x} className="flex gap-3 text-[16px] leading-snug text-gray-700">
                        <span aria-hidden className="mt-2 size-1 shrink-0 bg-red" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start justify-between gap-6 lg:col-span-6">
                    <div>
                      <span className="t-label text-gray-500 transition-colors group-hover:text-red">{p.index}</span>
                      <h2 className="t-h3 mt-2">{p.name}</h2>
                      <p className="mt-2 t-body text-gray-600">{p.tagline}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-line transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white">
                      <ArrowRight className="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA
        title="Not sure which pillar fits?"
        lead="Bring us the problem. We'll bring the right mix of AI, quality and engineering."
      />
    </>
  );
}
