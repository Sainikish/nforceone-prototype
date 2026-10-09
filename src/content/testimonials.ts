import type { Testimonial } from "./types";

/**
 * Testimonials (PRD §11, §11.1).
 *
 * The entries below are SAMPLES written for design review. They are not real quotes, carry no
 * personal names, and are marked `sample: true` + `status: "pending"`, so they render with a
 * "Sample" marker in review mode and are removed in production mode. Replace each one with an
 * approved testimonial (written permission for wording, attribution and photo/logo: TEST-005,
 * EMP-TEST-003) and delete the sample flag.
 */
export const clientTestimonials: Testimonial[] = [
  {
    status: "pending",
    sample: true,
    context: ["general", "telecom", "qe"],
    quote:
      "They understood our order-to-bill flows faster than any partner we had worked with. The regression suite we had been trying to build for years finally exists, and releases stopped being events.",
    name: "Sample attribution",
    role: "VP, Quality Engineering",
    company: "US Telecom Provider",
  },
  {
    status: "pending",
    sample: true,
    context: ["ai"],
    quote:
      "What stood out was the discipline. Before a single agent went live we had evaluation sets, guardrails and a clear view of how it would fail.",
    name: "Sample attribution",
    role: "Director, AI Platforms",
    company: "Enterprise Technology Company",
  },
  {
    status: "pending",
    sample: true,
    context: ["delivery"],
    quote:
      "The Hybrid model just works: leadership in our time zone, and an engineering team in Hyderabad that owns its work end to end.",
    name: "Sample attribution",
    role: "CTO",
    company: "US Technology Company",
  },
  {
    status: "pending",
    sample: true,
    context: ["digital"],
    quote:
      "We went from a monolith to independently deployable services in under a year without a single production incident. The team moved fast and quality stayed high throughout.",
    name: "Sample attribution",
    role: "VP Engineering",
    company: "US Technology Company",
  },
  {
    status: "pending",
    sample: true,
    context: ["data"],
    quote:
      "We finally have a data platform our AI and analytics teams can actually build on. The migration was cleaner than we expected and the pipelines have been rock solid since go-live.",
    name: "Sample attribution",
    role: "Head of Data Engineering",
    company: "Enterprise Software Company",
  },
];

export const employeeTestimonials: Testimonial[] = [
  {
    status: "pending",
    sample: true,
    context: ["careers", "general"],
    quote:
      "I joined as a manual tester. Now I design automation frameworks and evaluate LLM features for clients. Nobody told me to stay in my lane.",
    name: "Sample attribution",
    role: "Senior QA Engineer",
    company: "Hyderabad",
  },
  {
    status: "pending",
    sample: true,
    context: ["careers"],
    quote:
      "People here care about doing it properly. Code reviews, test coverage and demos are how every team works, not a policy someone wrote.",
    name: "Sample attribution",
    role: "Software Engineer",
    company: "Hyderabad",
  },
];
