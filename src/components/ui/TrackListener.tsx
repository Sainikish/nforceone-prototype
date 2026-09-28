"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Delegated analytics: any element with data-track="<event>" reports on click, with
 * data-track-label as context. This saves wiring handlers into every server-rendered CTA.
 */
export function TrackListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as AnalyticsEvent, {
        label: el.dataset.trackLabel ?? el.textContent?.trim(),
        href: el.getAttribute("href") ?? undefined,
        page: location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
