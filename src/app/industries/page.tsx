import Link from "next/link";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { otherIndustries } from "@/content/industries";
import { telecomAreas } from "@/content/telecom";
import { visible } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Industries",
  description:
    "Telecom is NForce One's deep-domain specialism, across OSS/BSS, customer experience, network and field operations, data and automation.",
  path: "/industries",
});

export default function IndustriesPage() {
  const others = visible(otherIndustries);
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Deep domain beats broad claims"
        lead="We focus where we have proven depth. Telecom is our specialism, and it is where AI, Quality Engineering and engineering come together."
      />

      <section aria-labelledby="tel-feature" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Link
            href="/industries/telecom"
            className="group grid overflow-hidden rounded-md border border-line lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between gap-10 bg-black p-8 text-white md:p-12 lg:col-span-6">
              <div>
                <p className="t-label flex items-center gap-2.5 text-red-on-dark">
                  <span aria-hidden className="size-1.5 rounded-full bg-red-on-dark" /> Featured specialism
                </p>
                <h2 id="tel-feature" className="t-h1 mt-8">
                  Telecom
                </h2>
                <p className="t-lead mt-6 max-w-[30rem] text-gray-400">
                  OSS/BSS, customer experience, network operations and data, engineered end to end.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Explore Telecom <ArrowRight className="arrow" size={15} />
              </span>
            </div>
            <ol className="divide-y divide-line lg:col-span-6">
              {telecomAreas.map((a, i) => (
                <li key={a.id} className="flex items-start gap-6 p-6 md:px-10 md:py-7">
                  <span className="t-label pt-1 text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[17px] font-semibold">{a.name}</span>
                    <span className="mt-1 block t-small text-gray-600">{a.points.slice(0, 4).join(" · ")}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Link>
        </div>
      </section>

      {/* Other sectors: one compact band until proven-experience stories are approved (PRD §6) */}
      <section aria-labelledby="other-ind" className="border-t border-line bg-white pb-20 md:pb-28">
        <div className="container-x grid gap-8 pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="other-ind" className="t-h3">
              Other sectors, on request
            </h2>
            <p className="mt-3 t-small text-gray-600">
              Our capabilities travel. Dedicated industry stories are published as we document proven delivery.
            </p>
          </div>
          <div className="lg:col-span-8">
            {others.length > 0 && (
              <>
                <ul className="flex flex-wrap gap-2">
                  {others.map((i) => (
                    <li key={i.name} className="rounded-sm border border-line px-3.5 py-2 text-[14px] text-gray-700">
                      {i.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <PendingBadge>Confirm proven experience before publishing</PendingBadge>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Bring us your industry's hardest problem"
        lead="Our capabilities travel. Tell us where you operate and what's in the way."
      />
    </>
  );
}
