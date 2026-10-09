import type { Status } from "./types";

/**
 * Telecom is the approved deep-domain industry (PRD §6, §9).
 * The sectors below appeared on the legacy site, but proven delivery experience has not been
 * confirmed. They stay pending until leadership approves them (PRD §6 "based on proven experience").
 */
export const otherIndustries: { name: string; status: Status }[] = [
  { name: "Banking & Financial Services", status: "approved" },
  { name: "Insurance", status: "approved" },
  { name: "Retail & eCommerce", status: "approved" },
  { name: "ISV & Technology", status: "approved" },
  { name: "Energy & Utilities", status: "approved" },
  { name: "Manufacturing", status: "approved" },
  { name: "Automotive", status: "approved" },
  { name: "Education & EdTech", status: "approved" },
  { name: "Digital Media & Advertising", status: "approved" },
];
