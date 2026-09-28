import type { ReactNode } from "react";
import { reviewMode } from "@/lib/content";

/** Marker shown on unapproved content in review mode. Never rendered in production mode. */
export function PendingBadge({ children = "Pending approval", tone = "light" }: { children?: ReactNode; tone?: "light" | "dark" }) {
  if (!reviewMode) return null;
  return (
    <span
      className={`t-label inline-flex items-center gap-1.5 rounded-xs border px-1.5 py-1 text-[10px] ${
        tone === "dark" ? "border-red-on-dark/40 text-red-on-dark" : "border-red/30 text-red"
      }`}
    >
      <span aria-hidden className="size-1 rounded-full bg-current" />
      {children}
    </span>
  );
}

/** Wraps a whole block of pending content. Renders nothing in production mode. */
export function ReviewOnly({ children }: { children: ReactNode }) {
  return reviewMode ? <>{children}</> : null;
}

/** Placeholder for a section field that needs approved content. */
export function PendingField({ need, tone = "light" }: { need: string; tone?: "light" | "dark" }) {
  if (!reviewMode) return null;
  return (
    <div
      className={`rounded-sm border border-dashed p-4 t-small ${
        tone === "dark" ? "border-white/15 text-gray-500" : "border-black/15 text-gray-600"
      }`}
    >
      <PendingBadge tone={tone}>Content required</PendingBadge>
      <p className="mt-2">{need}</p>
    </div>
  );
}
