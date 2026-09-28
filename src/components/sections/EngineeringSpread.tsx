import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { ArrowLink } from "@/components/ui/Button";
import { getPillar } from "@/content/capabilities";

/** Digital Engineering + Data, Cloud & Enterprise Platforms as a two-page editorial spread. */
export function EngineeringSpread() {
  const spread = [
    { p: getPillar("digital-engineering")!, variant: "digital" as const },
    { p: getPillar("data-cloud-enterprise-platforms")!, variant: "data" as const },
  ];
  return (
    <section aria-label="Digital Engineering and Data, Cloud & Enterprise Platforms" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-px bg-line lg:grid-cols-2">
        {spread.map(({ p, variant }, i) => (
          <article
            key={p.slug}
            aria-labelledby={`sp-${p.slug}`}
            className={`flex flex-col bg-white py-12 first:pt-0 lg:py-0 ${i === 0 ? "lg:pr-14" : "lg:pl-14"}`}
          >
            <p className="t-label text-gray-500">
              {p.index} · {p.name}
            </p>
            <h2 id={`sp-${p.slug}`} data-reveal className="t-h2 mt-6 max-w-[16ch] text-balance">
              {p.tagline}
            </h2>
            <p data-reveal className="mt-6 max-w-[34rem] t-body text-gray-600">
              {p.summary}
            </p>
            <div data-reveal className="mt-12 rounded-md border border-line bg-paper-50 p-6 md:p-8">
              <ArchitectureDiagram variant={variant} />
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2.5 text-[14px] text-gray-700">
              {p.groups
                .flatMap((g) => g.items)
                .map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span aria-hidden className="size-1 bg-black/30" />
                    {c.name}
                  </li>
                ))}
            </ul>
            <ArrowLink href={`/capabilities/${p.slug}`} className="mt-10" track={`home_${variant}_explore`}>
              Explore {p.name}
            </ArrowLink>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
