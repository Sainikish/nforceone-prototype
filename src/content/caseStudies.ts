import { stock } from "./media";
import type { CaseStudy, Product } from "./types";

/**
 * Client engagements referenced on the legacy About page. Names stay anonymised until
 * written approval exists (CASE-002). Challenge, solution and outcomes stay empty until the
 * delivery team supplies validated content (CASE-003). Nothing here is invented.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "telecom-end-to-end-quality-engineering",
    status: "pending",
    kind: "Client",
    client: "US Telecom Provider",
    clientName: "Consolidated Communications",
    nameApproved: false,
    industry: "Telecom",
    year: "2025",
    title: "End-to-end quality engineering for a US telecom provider",
    categories: ["Client", "Telecom", "Quality Engineering"],
    capabilities: ["quality-engineering-ai-assurance"],
    visual: "Sanitised test-architecture diagram or delivery dashboard, approved by the client",
    image: stock.fiberSwitch,
  },
  {
    slug: "ai-driven-outreach",
    status: "pending",
    kind: "Client",
    client: "AI outreach engagement",
    clientName: "Atomic",
    nameApproved: false,
    industry: "Technology",
    year: "2024",
    title: "AI-driven outreach",
    categories: ["Client", "AI"],
    capabilities: ["ai-agentic-solutions"],
    visual: "Product UI screenshot of the outreach workflow",
    image: stock.codeScreens,
  },
  {
    slug: "ai-travel-planner",
    status: "pending",
    kind: "Client",
    client: "AI travel engagement",
    clientName: "Intripid",
    nameApproved: false,
    industry: "Travel",
    year: "2024",
    title: "AI travel planner",
    categories: ["Client", "AI", "Digital Engineering"],
    capabilities: ["ai-agentic-solutions", "digital-engineering"],
    visual: "Mobile / web screens of the trip-planning experience",
    image: stock.teamReview,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const caseFilters = ["All", "Client", "Product", "Telecom", "AI", "Quality Engineering", "Digital Engineering"] as const;

/** Appendix A: the sections every client case study must cover. */
export const caseTemplate = [
  { key: "challenge", title: "Business Challenge", need: "The business, operational, quality, customer or technology problem." },
  { key: "solution", title: "NForce One Solution", need: "What NForce One designed, built, tested, modernised, automated or operated." },
  { key: "technology", title: "Capabilities & Technology", need: "Relevant AI, QA, cloud, data, application, telecom and platform technologies." },
  { key: "deliveryModel", title: "Delivery Model", need: "Onshore, Offshore, Hybrid, Managed Delivery, SOW or T&M." },
  { key: "outcomes", title: "Business Outcomes", need: "Validated, measurable impact approved for external use." },
  { key: "visual", title: "Visual Evidence", need: "Approved screenshots, diagrams, architecture or before/after visuals." },
  { key: "quote", title: "Client Voice", need: "An approved testimonial, if available." },
] as const;

/** Product case studies (PROD-CASE-001) share the library, and each one links to its product page. */
export const productCaseStudies = (products: Product[]) =>
  products.map<{ c: CaseStudy; href: string }>((p) => ({
    href: `/innovation/${p.slug}`,
    c: {
      slug: `product-${p.slug}`,
      status: p.status,
      kind: "Product",
      client: "NForce One product",
      nameApproved: true,
      industry: "NForce One",
      title: p.name,
      categories: ["Product"],
      capabilities: [],
      challenge: p.summary,
      visual: "Approved product UI screenshots",
    },
  }));
