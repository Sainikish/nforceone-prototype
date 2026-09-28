import { Pipeline } from "@/components/diagrams/Pipeline";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getPillar } from "@/content/capabilities";

/** AI & Agentic Solutions: text left, live agent workflow right (PRD §8.1, ANIM-003). */
export function AISection() {
  const p = getPillar("ai-agentic-solutions")!;
  const items = p.groups.flatMap((g) => g.items);
  return (
    <section aria-labelledby="ai-title" className="bg-paper-50 py-24 md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>
            {p.index} · {p.name}
          </Eyebrow>
          <h2 id="ai-title" data-reveal className="t-h2 mt-6 text-balance">
            {p.tagline}
          </h2>
          <p data-reveal className="t-lead mt-6 text-gray-600">
            {p.summary}
          </p>
          <ul className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-8">
            {items.map((c) => (
              <li key={c.name} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px]">
                <span aria-hidden className="size-1 shrink-0 bg-black/40" />
                {c.name}
              </li>
            ))}
          </ul>
          <ArrowLink href={`/capabilities/${p.slug}`} className="mt-10" track="home_ai_explore">
            Explore AI &amp; Agentic Solutions
          </ArrowLink>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <figure className="relative rounded-md border border-line bg-white p-8 md:p-12">
            <figcaption className="mb-10 flex items-center justify-between">
              <span className="t-label text-gray-500">Agent workflow</span>
              <span className="t-label flex items-center gap-2 text-gray-500">
                <span aria-hidden className="blink size-1.5 rounded-full bg-red" />
                Validated before it acts
              </span>
            </figcaption>
            <Pipeline steps={p.flow!} label="How an NForce One AI agent works, from input to outcome" />
          </figure>
        </div>
      </div>
    </section>
  );
}
