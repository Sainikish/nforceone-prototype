import type { Status } from "@/content/types";

/**
 * review (default): pending items render with a "Pending approval" marker.
 * production: anything not approved is removed (PRD 2.1, 18.1).
 */
export const reviewMode = process.env.NEXT_PUBLIC_CONTENT_MODE !== "production";

export const isVisible = (item: { status: Status }) => item.status === "approved" || reviewMode;

export const visible = <T extends { status: Status }>(items: readonly T[]) => items.filter(isVisible);
