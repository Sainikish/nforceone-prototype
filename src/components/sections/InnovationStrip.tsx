import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { innovationAreas } from "@/content/innovation";

const featured = ["AI-powered Quality Engineering", "Agentic Automation", "Testing Accelerators", "AI Agents"];

/** Innovation & Products, homepage cut (HOME-007): one statement and four focus areas. */
export function InnovationStrip() {
  const areas = innovationAreas.filter((a) => featured.includes(a.name));
  return (
    <section aria-labelledby="inn-title" className="relative overflow-hidden bg-ink-900 py-24 text-white md:py-28">
      <div aria-hidden className="bg-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_85%_10%,black,transparent_60%)]" />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Innovation &amp; Products</Eyebrow>
            <h2 id="inn-title" data-reveal className="t-h2 mt-6 text-balance">
              We don&apos;t only deliver technology. <span className="text-gray-500">We build it.</span>
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-400 lg:col-span-4 lg:col-start-9">
            Our own products, accelerators and AI platforms, and what we learn from them goes into every engagement.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <li key={a.name} className="flex min-h-[168px] flex-col justify-end bg-ink-900 p-6">
              <p className="text-[17px] font-semibold leading-snug tracking-[-0.015em]">{a.name}</p>
              <p className="mt-2 t-small text-gray-500">{a.line}</p>
            </li>
          ))}
        </ul>

        <ArrowLink href="/innovation" tone="dark" className="mt-10" track="home_innovation_explore">
          Explore Innovation &amp; Products
        </ArrowLink>
      </div>
    </section>
  );
}
