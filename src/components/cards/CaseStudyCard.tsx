import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { reviewMode } from "@/lib/content";
import type { CaseStudy } from "@/content/types";

export const clientLabel = (c: CaseStudy) => (c.nameApproved && c.clientName ? c.clientName : c.client);

/** Visual area for a case study. It shows the approved visual or, in review mode, the brief for it. */
export function CaseVisual({ c, large = false }: { c: CaseStudy; large?: boolean }) {
  // Product images are NForce One's own — show in production. Client images are stand-ins, review-only.
  const showImage = !!c.image && (reviewMode || c.kind === "Product");
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-ink-900 text-gray-500 ${large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]" : "aspect-[16/10]"}`}
    >
      <div className="zoom-media absolute inset-0 bg-grid-dark" />
      {showImage && (
        <>
          <Image
            src={c.image!.src}
            alt={c.image!.alt}
            fill
            sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="zoom-media object-cover grayscale"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {reviewMode && c.kind === "Client" && (
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-xs bg-black/70 px-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.04em] text-white">
              <span aria-hidden className="size-1 rounded-full bg-red-on-dark" />
              Stock<span className="hidden md:inline"> · {c.image!.credit}</span>
            </span>
          )}
        </>
      )}
      {!showImage && (
        <div aria-hidden className="zoom-media absolute inset-0 grid place-items-center">
          <span className="select-none text-[clamp(5rem,12vw,10rem)] font-semibold tracking-[-0.06em] text-white/[0.06] watermark" data-mark={c.industry} />
        </div>
      )}
      {reviewMode && !showImage && (
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <span className="t-label text-[10px] text-gray-400">Visual evidence to supply · {c.visual}</span>
        </div>
      )}
    </div>
  );
}

/** Case-study card: image, client/industry, title, capability, outcome, arrow (hover: 1.5% zoom). */
export function CaseStudyCard({ c, href }: { c: CaseStudy; href?: string }) {
  return (
    <Link
      href={href ?? `/case-studies/${c.slug}`}
      data-track={c.kind === "Product" ? "product_view" : "case_study_view"}
      data-track-label={c.slug}
      className="group flex w-full flex-col rounded-md border border-line bg-white p-3 transition-colors duration-(--duration-base) hover:border-black/30"
    >
      <CaseVisual c={c} />
      <div className="flex flex-1 flex-col px-3 pt-6 pb-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="t-label text-gray-500">
            {c.kind} · {c.industry}
            {c.year ? ` · ${c.year}` : ""}
          </span>
        </div>
        <h3 className="t-h4 mt-3 text-[19px]">{c.title}</h3>
        <p className="mt-2 t-small text-gray-600">{clientLabel(c)}</p>
        <p className="mt-4 t-small text-gray-500">
          {c.outcomes?.[0] ?? c.solution ?? c.challenge ?? "Challenge and validated outcomes to be published on approval."}
        </p>
        <span className="mt-auto flex items-center justify-between pt-6">
          <span className="flex flex-wrap gap-1.5">
            {c.categories
              .filter((x) => x !== c.kind)
              .map((x) => (
                <span key={x} className="rounded-xs bg-paper-100 px-2 py-1 text-[12px] text-gray-700">
                  {x}
                </span>
              ))}
          </span>
          <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-line transition-colors duration-(--duration-base) group-hover:border-black group-hover:bg-black group-hover:text-white">
              <ArrowRight className="arrow" size={14} />
            </span>
        </span>
      </div>
    </Link>
  );
}
