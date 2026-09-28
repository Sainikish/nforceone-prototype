import Link from "next/link";
import { ArrowLink } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { innovationAreas, products } from "@/content/innovation";
import { visible } from "@/lib/content";

/** Innovation & Products: a technology showcase, built differently from services (HOME-007, PRD §13). */
export function ProductShowcase() {
  const list = visible(products);
  return (
    <section aria-labelledby="inn-title" className="relative overflow-hidden bg-ink-900 py-24 text-white md:py-32">
      <div aria-hidden className="bg-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_65%)]" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="dark">Innovation &amp; Products</Eyebrow>
            <h2 id="inn-title" data-reveal className="t-h2 mt-6 text-balance">
              We don&apos;t only deliver technology. <span className="text-gray-500">We build it.</span>
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-400 lg:col-span-4">
            NForce One designs, builds and operates its own products, accelerators and AI-driven platforms.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h3 className="t-label text-gray-500">Where we innovate</h3>
            <ul className="mt-4 border-t border-white/10">
              {innovationAreas.map((a) => (
                <li key={a.name} className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                  <span className="text-[15px] font-medium">{a.name}</span>
                  <span className="t-small text-gray-500">{a.line}</span>
                </li>
              ))}
            </ul>
          </div>

          {list.length > 0 && (
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex items-center justify-between">
                <h3 className="t-label text-gray-500">Product portfolio</h3>
                <PendingBadge tone="dark">Publication pending approval</PendingBadge>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/innovation/${p.slug}`}
                      data-track="product_view"
                      data-track-label={p.slug}
                      className="group flex h-full min-h-[104px] flex-col justify-between gap-6 bg-ink-900 p-5 transition-colors duration-(--duration-base) hover:bg-ink-700"
                    >
                      <ArrowUpRight className="arrow-diag self-end text-gray-500 group-hover:text-white" size={14} />
                      <span className="text-[15px] font-medium leading-snug tracking-[-0.01em]">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ArrowLink href="/innovation" tone="dark" className="mt-14" track="home_innovation_explore">
          Explore Innovation &amp; Products
        </ArrowLink>
      </div>
    </section>
  );
}
