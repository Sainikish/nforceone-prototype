import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/capabilities";

/** "What We Do": one featured pillar and three editorial rows (HOME-004). */
export function CapabilityPillars() {
  const [featured, ...rest] = pillars;
  return (
    <section aria-labelledby="wwd-title" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="What we do"
            title={<span id="wwd-title">Engineering intelligence into every layer of the enterprise</span>}
          />
          <p data-reveal className="t-lead text-gray-600 lg:col-span-4">
            Four capability pillars with one standard of engineering rigor, delivered Onshore, Offshore or Hybrid.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line md:mt-20 lg:grid-cols-12">
          <Link
            href={`/capabilities/${featured.slug}`}
            data-track="capability_view"
            data-track-label={featured.slug}
            className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-paper-50 p-8 transition-colors duration-(--duration-slow) hover:bg-paper-100 md:p-12 lg:col-span-7 lg:row-span-3 lg:min-h-[600px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -bottom-16 select-none text-[clamp(12rem,24vw,22rem)] font-semibold leading-none tracking-[-0.06em] text-black/[0.035] watermark" data-mark={featured.index} />
            <div className="relative">
              <span className="t-label text-gray-500 transition-colors group-hover:text-red">{featured.index}</span>
              <h3 className="t-h2 mt-6 max-w-[14ch]">{featured.name}</h3>
              <p className="t-lead mt-6 max-w-[36rem] text-gray-600">{featured.summary}</p>
            </div>
            <div className="relative mt-10">
              <ul className="flex flex-wrap gap-2">
                {featured.highlights.map((h) => (
                  <li key={h} className="rounded-xs border border-black/10 bg-white px-2.5 py-1.5 text-[13px] text-gray-700">
                    {h}
                  </li>
                ))}
              </ul>
              <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
                Explore {featured.short}
                <ArrowRight className="arrow" size={15} />
              </span>
            </div>
          </Link>

          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/capabilities/${p.slug}`}
              data-track="capability_view"
              data-track-label={p.slug}
              className="group flex flex-col justify-between gap-8 bg-white p-8 transition-colors duration-(--duration-slow) hover:bg-paper-50 md:p-10 lg:col-span-5"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="t-label text-gray-500 transition-colors group-hover:text-red">{p.index}</span>
                  <h3 className="t-h3 mt-4">{p.name}</h3>
                  <p className="mt-3 t-body text-gray-600">{p.tagline}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-line transition-colors duration-(--duration-base) group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="arrow" size={15} />
                </span>
              </div>
              <p className="t-small text-gray-500">{p.highlights.join("  ·  ")}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
