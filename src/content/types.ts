import type { StockImage } from "./media";

/**
 * Publication status, per PRD §18.1 governance.
 * `pending` content renders with a marker in review mode and is removed in production mode.
 */
export type Status = "approved" | "pending";

export type Pillar = {
  slug: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  /** One-sentence homepage pitch (≤ 22 words). */
  pitch: string;
  /** 3–4 sub-capabilities surfaced in the mega menu and pillar cards. */
  highlights: string[];
  problems: string[];
  groups: { title: string; items: { name: string; line: string }[] }[];
  flow?: { label: string; line: string }[];
  differentiators: { title: string; line: string }[];
  /** AI systems covered by AI Assurance (legacy AI Testing page, the one accurate block on it). */
  assures?: { name: string; line: string }[];
  technologies?: string[];
  related: { industries: string[]; caseStudies: string[] };
  cta: { label: string; intent: Intent };
  seo: { title: string; description: string };
};

export type Intent = "expert" | "project" | "demo" | "assessment" | "telecom" | "careers" | "general";

export type CaseStudy = {
  slug: string;
  status: Status;
  kind: "Client" | "Product";
  client: string;
  /** Real client name, only rendered when `nameApproved` is true (CASE-002). */
  clientName?: string;
  nameApproved: boolean;
  industry: string;
  year?: string;
  title: string;
  categories: string[];
  capabilities: string[];
  challenge?: string;
  solution?: string;
  technology?: string[];
  deliveryModel?: string;
  outcomes?: string[];
  quote?: { text: string; name: string; role: string; company: string };
  /** Brief for the approved visual evidence that should replace any stock stand-in. */
  visual: string;
  /** Stock stand-in shown in review mode until approved visuals exist. */
  image?: StockImage;
};

export type Product = {
  slug: string;
  name: string;
  status: Status;
  /** Written only once product owners supply approved copy (PROD-CASE-002). */
  summary?: string;
};

export type Testimonial = {
  status: Status;
  /** Illustrative copy for design review only: never publishable, always marked "Sample". */
  sample?: boolean;
  /** Where the quote is most relevant; pages pick the first match. */
  context: ("general" | "telecom" | "qe" | "ai" | "delivery" | "careers")[];
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
};
