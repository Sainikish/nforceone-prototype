import type { Product } from "./types";

/** Innovation focus areas: PRD §13. One-line descriptions are draft copy (CONT-005). */
export const innovationAreas = [
  { name: "AI-powered Quality Engineering", line: "Using AI to design, generate and maintain tests." },
  { name: "Agentic Automation", line: "Agents that carry out multi-step operational work." },
  { name: "Testing Accelerators", line: "Reusable assets that shorten the path to coverage." },
  { name: "Enterprise Automation", line: "Workflow automation across enterprise systems." },
  { name: "AI Agents", line: "Purpose-built agents for business functions." },
  { name: "Digital Platforms", line: "Platforms NForce One designs, builds and operates." },
  { name: "Reusable Engineering Frameworks", line: "Proven foundations every engagement starts from." },
] as const;

/**
 * Product inventory: PRD §10.2. Every product stays `pending` until leadership, confidentiality
 * and product-readiness approval is recorded (PROD-CASE-004). No descriptions are invented.
 */
export const products: Product[] = [
  { slug: "qforce-ai", name: "QForce AI", status: "pending" },
  { slug: "aiktra", name: "AIKTRA", status: "pending" },
  { slug: "onehr", name: "OneHR", status: "pending" },
  { slug: "nforce-arena", name: "NForce Arena (CricketHub)", status: "pending" },
  { slug: "pulse", name: "Pulse", status: "pending" },
  { slug: "sync", name: "Sync", status: "pending" },
  { slug: "tracktion", name: "Tracktion", status: "pending" },
  { slug: "flightops", name: "FlightOps", status: "pending" },
  { slug: "auraface", name: "AuraFace / NForce Identity", status: "pending" },
  { slug: "modozo", name: "Modozo", status: "pending" },
  { slug: "ask-navi", name: "Ask Navi", status: "pending" },
  { slug: "nforce-retailops", name: "NForce RetailOps", status: "pending" },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Appendix B: the sections every product case study must cover. */
export const productTemplate = [
  { key: "problem", title: "Business Problem", need: "The recurring problem or inefficiency the product solves." },
  { key: "solution", title: "Product Solution", need: "What was built, and for whom." },
  { key: "features", title: "Key Features", need: "Core capabilities and user journeys." },
  { key: "architecture", title: "Architecture / Workflow", need: "System, agent, data or workflow diagram." },
  { key: "stack", title: "Technology Stack", need: "Frontend, backend, cloud, data, AI / model / agent stack and integrations." },
  { key: "ai", title: "AI / Agentic AI Usage", need: "Where AI is used, why, and how outputs and actions are validated." },
  { key: "value", title: "Business Value", need: "Time savings, cost, productivity, automation, quality and user experience." },
  { key: "screens", title: "Real Screenshots", need: "Approved product UI screenshots or demo-environment imagery." },
] as const;
