import type { Intent } from "./types";

/** Contact options shared by the form and /api/contact (LEAD-002/003). */
export const interests = [
  "AI & Agentic Solutions",
  "Quality Engineering & AI Assurance",
  "Digital Engineering",
  "Data, Cloud & Enterprise Platforms",
  "Telecom",
  "Innovation & Products",
  "Careers",
  "Other",
] as const;

export const intents: { id: Intent; label: string; submit?: string; interest?: (typeof interests)[number] }[] = [
  { id: "expert", label: "Talk to an Expert" },
  { id: "project", label: "Discuss Your Project" },
  { id: "demo", label: "Request a Demo", interest: "Innovation & Products" },
  { id: "assessment", label: "Request an AI / QA Assessment", interest: "Quality Engineering & AI Assurance" },
  { id: "telecom", label: "Telecom Transformation", submit: "Discuss Your Telecom Transformation", interest: "Telecom" },
  { id: "careers", label: "Careers", submit: "Submit Application", interest: "Careers" },
];
