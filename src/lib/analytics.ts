/**
 * Analytics events (PRD §25). Pushes to GA4 when NEXT_PUBLIC_GA_ID is configured,
 * otherwise to window.dataLayer so a tag manager can pick them up.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "demo_request"
  | "case_study_view"
  | "product_view"
  | "capability_view"
  | "assistant_open"
  | "assistant_message"
  | "assistant_handoff";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (w.gtag) w.gtag("event", event, params);
  else (w.dataLayer ??= []).push({ event, ...params });
}
