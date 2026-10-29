import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { innovationAreas } from "@/content/innovation";

const featured = ["AI-powered Quality Engineering", "Agentic Automation", "Testing Accelerators", "AI Agents"];

/** Innovation & Products, homepage cut (HOME-007): one statement and four focus areas. */
export function InnovationStrip() {
  const areas = innovationAreas.filter((a) => featured.includes(a.name));
  return (
    <section aria-labelledby="inn-title" className="relative overflow-hidden bg-ink-900 py-14 text-white md:py-20">
      <div aria-hidden className="bg-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_85%_10%,black,transparent_60%)]" />
      <div className="container-x relative">
        <Eyebrow tone="dark" center className="mb-10">Innovation &amp; Products</Eyebrow>
        <div className="mx-auto max-w-[48rem] text-center">
          <h2 id="inn-title" data-reveal className="t-h2 text-balance">
            We don&apos;t only deliver technology. <span className="text-gray-500">We build it.</span>
          </h2>
          <p data-reveal className="t-lead mt-6 text-gray-400">
            Our own products, accelerators and AI platforms. What we learn building them goes into every client engagement.
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
