import { Pipeline } from "@/components/diagrams/Pipeline";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getPillar } from "@/content/capabilities";

/** Quality Engineering & AI Assurance: dark, full-width pipeline, dense capability index (PRD §8.2). */
export function QualitySection() {
  const p = getPillar("quality-engineering-ai-assurance")!;
  return (
    <section aria-labelledby="qe-title" className="relative overflow-hidden bg-ink-900 py-24 text-white md:py-32">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">
              {p.index} · {p.name}
            </Eyebrow>
            <h2 id="qe-title" data-reveal className="t-h2 mt-6 text-balance">
              {p.tagline}
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-400 lg:col-span-5">
            {p.summary}
          </p>
        </div>

        <div className="mt-16 rounded-md border border-white/10 bg-black/40 p-8 md:mt-20 md:p-10">
          <Pipeline
            steps={p.flow!}
            direction="responsive"
            tone="dark"
            slot={1}
            label="Quality pipeline, from requirement to release confidence"
          />
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-2 lg:gap-16">
          {p.groups.map((g) => (
            <div key={g.title}>
              <h3 className="t-label flex items-center gap-3 text-gray-500">
                {g.title}
                <span aria-hidden className="h-px flex-1 bg-white/10" />
              </h3>
              <ul className="mt-2">
                {g.items.map((c, i) => (
                  <li
                    key={c.name}
                    className="group grid grid-cols-[2.25rem_1fr] gap-x-2 border-b border-white/10 py-4 sm:max-lg:grid-cols-[2.25rem_minmax(0,15rem)_1fr] sm:max-lg:gap-x-6 xl:grid-cols-[2.25rem_minmax(0,14rem)_1fr] xl:gap-x-6"
                  >
                    <span className="t-label pt-1 text-gray-500 transition-colors group-hover:text-red-on-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-medium">{c.name}</span>
                    <span className="col-start-2 mt-1 t-small text-gray-500 sm:max-lg:col-start-3 sm:max-lg:mt-0 xl:col-start-3 xl:mt-0">{c.line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/contact?intent=assessment" tone="dark" track="home_qe_assessment">
            Request an AI / QA Assessment
          </Button>
          <Button href={`/capabilities/${p.slug}`} tone="dark" variant="secondary" track="home_qe_explore">
            Explore Quality Engineering
          </Button>
        </div>
      </div>
    </section>
  );
}
