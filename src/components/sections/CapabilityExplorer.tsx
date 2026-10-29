import { ArrowUpRight } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SpotlightLink } from "@/components/ui/SpotlightLink";
import { pillars } from "@/content/capabilities";

/** One look per tile. The four tiles alternate black / paper / signal red / ink so the grid reads as a composition, not a list. */
const looks = [
  {
    span: "lg:col-span-7",
    tile: "bg-black text-white",
    sub: "text-gray-400",
    chip: "border-white/20 text-gray-300",
    arrow: "border-white/25 group-hover:border-white group-hover:bg-white group-hover:text-black",
    numeral: "text-white/[0.06] group-hover:text-white/[0.1]",
    pattern: "bg-grid-dark [mask-image:radial-gradient(ellipse_at_85%_15%,black,transparent_65%)] opacity-40",
    glow: "bg-[radial-gradient(circle_at_85%_10%,rgb(255_68_54/0.28),transparent_55%)]",
    spot: "rgb(255 255 255 / 0.14)",
    lit: "bg-grid-dark",
  },
  {
    span: "lg:col-span-5",
    tile: "bg-paper-100 text-black border border-line",
    sub: "text-gray-600",
    chip: "border-black/15 bg-white text-gray-700",
    arrow: "border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white",
    numeral: "text-black/[0.05] group-hover:text-black/[0.09]",
    pattern: "bg-grid-light [mask-image:radial-gradient(ellipse_at_90%_10%,black,transparent_60%)] opacity-70",
    glow: "bg-[radial-gradient(circle_at_90%_5%,rgb(212_10_10/0.14),transparent_55%)]",
    spot: "rgb(212 10 10 / 0.12)",
    lit: "bg-grid-light",
  },
  {
    span: "lg:col-span-5",
    tile: "bg-red text-white",
    sub: "text-white/90",
    chip: "border-white/40 text-white",
    arrow: "border-white/50 group-hover:border-white group-hover:bg-white group-hover:text-red",
    numeral: "text-white/[0.1] group-hover:text-white/[0.18]",
    pattern: "bg-grid-dark [mask-image:radial-gradient(ellipse_at_90%_10%,black,transparent_60%)] opacity-50",
    glow: "bg-[radial-gradient(circle_at_90%_5%,rgb(255_255_255/0.22),transparent_55%)]",
    spot: "rgb(255 255 255 / 0.22)",
    lit: "bg-grid-dark",
  },
  {
    span: "lg:col-span-7",
    tile: "bg-ink-800 text-white",
    sub: "text-gray-400",
    chip: "border-white/20 text-gray-300",
    arrow: "border-white/25 group-hover:border-white group-hover:bg-white group-hover:text-black",
    numeral: "text-white/[0.06] group-hover:text-white/[0.1]",
    pattern: "bg-grid-dark [mask-image:radial-gradient(ellipse_at_85%_15%,black,transparent_65%)] opacity-40",
    glow: "bg-[radial-gradient(circle_at_85%_10%,rgb(255_255_255/0.12),transparent_55%)]",
    spot: "rgb(255 255 255 / 0.12)",
    lit: "bg-grid-dark",
  },
] as const;

/**
 * "What we do": the four capability pillars as a bento grid. Each tile links to its pillar page,
 * so every pillar stays one click away and fully crawlable without JS.
 */
export function CapabilityExplorer() {
  return (
    <section aria-labelledby="wwd-title" className="bg-white py-14 md:py-20">
      <div className="container-x">
        <Eyebrow center className="mb-6">What we do</Eyebrow>
        <div className="mx-auto max-w-[48rem] text-center">
          <h2 id="wwd-title" data-reveal className="t-h2 text-balance">
            Engineering intelligence into every layer of the enterprise
          </h2>
          <p data-reveal className="t-lead mt-6 text-gray-600">
            Four capability pillars. One standard of engineering rigor.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 md:mt-14 lg:grid-cols-12">
          {pillars.map((p, i) => {
            const l = looks[i % looks.length];
            return (
              <li key={p.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className={l.span}>
                <SpotlightLink
                  href={`/capabilities/${p.slug}`}
                  data-track="capability_view"
                  data-track-label={p.slug}
                  className={`group relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-lg p-6 md:min-h-[290px] md:p-8 ${l.tile}`}
                >
                  <span aria-hidden className={`pointer-events-none absolute inset-0 ${l.pattern}`} />
                  <span aria-hidden className={`pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-(--duration-slower) group-hover:opacity-100 ${l.glow}`} />
                  {/* Cursor spotlight: a soft light plus the grid lighting up under the pointer */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100"
                    style={{ background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${l.spot}, transparent 70%)` }}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 [mask-image:radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),black,transparent)] ${l.lit}`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-3 right-14 select-none text-[6rem] font-semibold leading-none tracking-[-0.06em] transition-all duration-(--duration-slower) ease-(--ease-out) group-hover:translate-y-2 md:-top-5 md:right-20 md:text-[9rem] ${l.numeral}`}
                  >
                    {p.index}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="t-label rounded-full border border-current/25 px-3 py-1.5 opacity-80">{p.index}</span>
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-(--duration-base) ${l.arrow}`}>
                      <ArrowUpRight className="arrow-diag" size={18} />
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="max-w-[20ch] text-[1.375rem] font-semibold leading-[1.1] tracking-[-0.03em] text-balance md:text-[1.75rem]">
                      {p.name}
                    </h3>
                    <p className={`mt-3 max-w-[34rem] t-small ${l.sub}`}>{p.tagline}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.highlights.map((h) => (
                        <li key={h} className={`rounded-full border px-2.5 py-1 text-[12.5px] font-medium ${l.chip}`}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
