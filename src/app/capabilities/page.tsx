import Link from "next/link";
import { EngagementModel } from "@/components/sections/EngagementModel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { pillars } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Capabilities",
  description:
    "Four strategic capability pillars: AI & Agentic Solutions; Quality Engineering & AI Assurance; Digital Engineering; Data, Cloud & Enterprise Platforms.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Four pillars. One standard of engineering."
        lead="Every NForce One capability is built on the same foundation: Quality Engineering heritage, AI-first thinking and scalable US + India delivery."
        actions={
          <Button href="/contact?intent=expert" tone="dark" size="lg" track="caps_talk_to_expert">
            Talk to an Expert
          </Button>
        }
      />

      <section aria-label="Capability pillars" className="bg-white py-20 md:py-28">
        <ol className="container-x">
          {pillars.map((p) => (
            <li key={p.slug} className="border-t border-line last:border-b">
              <Link
                href={`/capabilities/${p.slug}`}
                data-track="capability_view"
                data-track-label={p.slug}
                className="group grid gap-6 py-12 transition-colors md:py-16 lg:grid-cols-12 lg:gap-8"
              >
                <span className="t-label text-gray-500 transition-colors group-hover:text-red lg:col-span-1">{p.index}</span>
                <div className="lg:col-span-5">
                  <h2 className="t-h2">{p.name}</h2>
                  <p className="mt-4 t-lead text-gray-600">{p.tagline}</p>
                </div>
                <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:col-start-8">
                  <p className="t-body text-gray-600">{p.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.groups
                      .flatMap((g) => g.items)
                      .map((c) => (
                        <li key={c.name} className="rounded-xs bg-paper-100 px-2.5 py-1.5 text-[13px] text-gray-700">
                          {c.name}
                        </li>
                      ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Explore {p.short} <ArrowRight className="arrow" size={15} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <EngagementModel />
      <FinalCTA />
    </>
  );
}
