import Image from "next/image";
import type { StockImage } from "@/content/media";
import { reviewMode } from "@/lib/content";

type Treatment = "Full color" | "Black & white" | "Grayscale + accent" | "Monochrome overlay";

const filters: Record<Treatment, string> = {
  "Full color": "",
  "Black & white": "grayscale contrast-[1.05]",
  "Grayscale + accent": "grayscale",
  "Monochrome overlay": "grayscale brightness-[0.85]",
};

/**
 * Photography slot (PRD §12, prompt §31–32). With `image`, it renders a stock stand-in with the
 * requested treatment and a visible Stock tag. Without one, it renders the shot brief. Both render
 * only in review mode. When approved NForce One photography arrives, pass it as `image` and mark
 * it approved.
 */
export function PhotoSlot({
  brief,
  image,
  treatment = "Full color",
  ratio = "4/3",
  tone = "light",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: {
  brief: string;
  image?: StockImage;
  treatment?: Treatment;
  ratio?: string;
  tone?: "light" | "dark";
  sizes?: string;
  className?: string;
}) {
  if (!reviewMode) return null;
  const dark = tone === "dark";

  if (image) {
    return (
      <figure className={`group relative overflow-hidden rounded-md bg-ink-800 ${className}`} style={{ aspectRatio: ratio }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className={`zoom-media object-cover ${filters[treatment]}`}
        />
        {treatment === "Monochrome overlay" && <span aria-hidden className="absolute inset-0 bg-black/25 mix-blend-multiply" />}
        {treatment === "Grayscale + accent" && <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-red" />}
        <figcaption className="absolute left-3 top-3 flex items-center gap-1.5 rounded-xs bg-black/70 px-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.04em] text-white backdrop-blur-sm">
          <span aria-hidden className="size-1 rounded-full bg-red-on-dark" />
          Stock<span className="hidden md:inline"> · {image.credit}</span>
          <span className="sr-only"> (Unsplash). Placeholder for: {brief}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photography placeholder: ${brief}`}
      className={`relative overflow-hidden rounded-md ${dark ? "bg-ink-800 text-gray-500" : "bg-paper-100 text-gray-600"} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className={`absolute inset-0 ${dark ? "bg-grid-dark" : "bg-grid-light"}`} />
      <span aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l border-t border-current opacity-50" />
      <span aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r border-t border-current opacity-50" />
      <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-current opacity-50" />
      <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-current opacity-50" />
      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-1.5">
        <span className="t-label text-[10px] opacity-70">Photography · {treatment}</span>
        <span className={`t-small max-w-[28ch] ${dark ? "text-gray-400" : "text-gray-700"}`}>{brief}</span>
      </div>
    </div>
  );
}
