import { stock } from "./media";
import type { CaseStudy, Product } from "./types";

/**
 * Client engagements from the official nforceone.com About page. Solution text is taken from that
 * page (lightly edited and anonymized). The live site already names these clients; set
 * `nameApproved: true` once that is confirmed for this site (CASE-002). Challenge and measured
 * outcomes stay empty until the delivery team supplies validated content (CASE-003).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "telecom-end-to-end-quality-engineering",
    status: "approved",
    kind: "Client",
    client: "US Telecom Provider",
    clientName: "Consolidated Communications",
    nameApproved: false,
    industry: "Telecom",
    year: "2025",
    title: "End-to-end quality engineering for a US telecom provider",
    solution:
      "Quality assurance delivered across every stage of the software lifecycle, managing and executing dozens of parallel projects with precision, consistency and enterprise-grade accountability.",
    categories: ["Client", "Telecom", "Quality Engineering"],
    capabilities: ["quality-engineering-ai-assurance"],
    visual: "Sanitized test-architecture diagram or delivery dashboard, approved by the client",
    image: stock.fiberSwitch,
  },
  {
    slug: "ai-driven-outreach",
    status: "approved",
    kind: "Client",
    client: "US Technology Company",
    clientName: "Atomic",
    nameApproved: false,
    industry: "Technology",
    year: "2024",
    title: "AI-driven outreach",
    solution:
      "An AI-driven outreach system that handles the client's full outbound communication pipeline — from prospect identification through personalised messaging — running continuously at a scale that wasn't possible with a human-led process.",
    categories: ["Client", "AI"],
    capabilities: ["ai-agentic-solutions"],
    visual: "Product UI screenshot of the outreach workflow",
    image: stock.codeScreens,
  },
  {
    slug: "ai-travel-planner",
    status: "approved",
    kind: "Client",
    client: "Travel Technology Company",
    clientName: "Intripid",
    nameApproved: false,
    industry: "Travel",
    year: "2024",
    title: "AI travel planner",
    solution:
      "A multi-agent AI system that handles the end-to-end itinerary workflow — planning, booking sequencing and exception handling — reducing the work that previously required manual coordination for each trip.",
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
  { key: "solution", title: "NForce One Solution", need: "What NForce One designed, built, tested, modernized, automated or operated." },
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
      image: p.image,
    },
  }));
