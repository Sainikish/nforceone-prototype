"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a page-level view event once (capability_view, case_study_view, product_view). */
export function TrackView({ event, label }: { event: AnalyticsEvent; label: string }) {
  useEffect(() => {
    track(event, { label, page: location.pathname });
  }, [event, label]);
  return null;
}
