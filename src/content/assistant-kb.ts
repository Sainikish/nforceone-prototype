import { pillars } from "./capabilities";
import { caseStudies } from "./caseStudies";
import { engagementModels } from "./engagement";
import { innovationAreas } from "./innovation";
import { site } from "./site";
import { telecomAreas, telecomSolutions } from "./telecom";

/**
 * Knowledge base for the website assistant (CHAT-002/003). Every answer is composed from
 * the same approved content modules the site renders, so the assistant cannot say anything
 * the site doesn't. Edit the source modules, not these strings.
 */
export type KbEntry = {
  id: string;
  keywords: string[];
  answer: string;
  links: { label: string; href: string }[];
  handoff?: boolean;
};

const list = (xs: readonly string[]) => xs.join(", ");

export const kb: KbEntry[] = [
  {
    id: "overview",
    keywords: ["nforce", "who", "company", "overview", "services", "offer", "introduce", "business"],
    answer: `${site.description}\n\nWe work across four capability pillars: ${list(pillars.map((p) => p.name))}.`,
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "About NForce One", href: "/about" },
    ],
  },
  ...pillars.map<KbEntry>((p) => ({
    id: p.slug,
    keywords: [
      ...p.name.toLowerCase().split(/[^a-z]+/),
      ...p.groups.flatMap((g) => g.items.flatMap((i) => i.name.toLowerCase().split(/[^a-z]+/))),
      ...(p.technologies ?? []).map((t) => t.toLowerCase()),
    ].filter((k) => k.length > 1 && !["and", "the"].includes(k)),
    answer: `${p.name}: ${p.summary}\n\nCapabilities include ${list(p.groups.flatMap((g) => g.items.map((i) => i.name)))}.`,
    links: [
      { label: p.name, href: `/capabilities/${p.slug}` },
      { label: p.cta.label, href: `/contact?intent=${p.cta.intent}` },
    ],
  })),
  {
    id: "telecom",
    keywords: ["telecom", "telco", "oss", "bss", "billing", "provisioning", "network", "field", "ivr", "carrier", "operator", "communications", "5g", "edge", "churn", "subscriber", "subscribers", "vnf"],
    answer: `Telecom is NForce One's deep-domain specialism. We work across ${list(
      telecomAreas.map((a) => a.name),
    )}.\n\nTelecom solutions include ${list(telecomSolutions.map((t) => t.name))}.`,
    links: [
      { label: "Telecom", href: "/industries/telecom" },
      { label: "Discuss Your Telecom Transformation", href: "/contact?intent=telecom" },
    ],
  },
  {
    id: "engagement",
    keywords: ["engage", "engagement", "model", "delivery", "onshore", "offshore", "hybrid", "india", "us", "usa", "staff", "augmentation", "sow", "managed", "outsourcing", "team"],
    answer: `We deliver from the US and India, with flexible models:\n${engagementModels
      .map((m) => `• ${m.name}: ${m.line}`)
      .join("\n")}`,
    links: [
      { label: "How we engage", href: "/about#delivery" },
      { label: "Discuss Your Project", href: "/contact?intent=project" },
    ],
  },
  {
    id: "case-studies",
    keywords: ["case", "study", "studies", "example", "examples", "outcome", "outcomes", "results", "work", "portfolio", "proof"],
    answer: `Our case-study library covers engagements including ${list(
      caseStudies.map((c) => c.title.toLowerCase()),
    )}. Client names and measured outcomes are published only once they have been approved.`,
    links: [{ label: "Case Studies", href: "/case-studies" }],
  },
  {
    id: "innovation",
    keywords: ["product", "products", "innovation", "platform", "platforms", "accelerator", "accelerators", "build", "demo", "qforce", "aiktra"],
    answer: `NForce One designs, builds and operates its own products, accelerators and AI-driven platforms. Focus areas include ${list(
      innovationAreas.map((a) => a.name),
    )}. Details for individual products are shared as they are approved for publication. Our team can walk you through them in a demo.`,
    links: [
      { label: "Innovation & Products", href: "/innovation" },
      { label: "Request a Demo", href: "/contact?intent=demo" },
    ],
  },
  {
    id: "locations",
    keywords: ["where", "location", "locations", "office", "offices", "address", "plano", "texas", "hyderabad", "email", "phone", "contact", "reach"],
    answer: `NForce One has offices in ${site.offices.map((o) => `${o.city} (${o.lines.join(", ")}; ${o.phone.display})`).join(" and ")}. You can email ${site.email}.`,
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    id: "careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "role", "roles", "join", "work", "vacancy", "opening", "apply"],
    answer: "We are growing across Quality Engineering, AI, engineering and enterprise platforms. Current openings and life at NForce One are on our Careers page.",
    links: [{ label: "Careers", href: "/careers" }],
  },
  {
    id: "clients",
    keywords: ["client", "clients", "customer", "customers", "reference", "references", "logo", "logos", "testimonial", "testimonials", "who", "worked"],
    answer:
      "We only share client names, logos and testimonials with each client's approval, so I can't list them here. Our team can discuss relevant references directly with you.",
    links: [{ label: "Talk to an Expert", href: "/contact?intent=expert" }],
    handoff: true,
  },
  {
    id: "human",
    keywords: ["talk", "speak", "expert", "human", "person", "call", "meeting", "sales", "price", "pricing", "cost", "quote", "rate", "rates", "proposal", "budget"],
    answer:
      "That is best handled by our team directly. Share a few details and the right NForce One expert will follow up with you.",
    links: [
      { label: "Talk to an Expert", href: "/contact?intent=expert" },
      { label: "Request a Demo", href: "/contact?intent=demo" },
    ],
    handoff: true,
  },
];

export const fallback: Omit<KbEntry, "id" | "keywords"> = {
  answer:
    "I don't have an approved answer to that yet, and I would rather not guess. Our team can help directly, or you can ask me about our capabilities, Telecom expertise, delivery models, products or case studies.",
  links: [
    { label: "Talk to an Expert", href: "/contact?intent=expert" },
    { label: "Contact Us", href: "/contact" },
  ],
  handoff: true,
};
