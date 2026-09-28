import type { Status } from "./types";

/**
 * Telecom is the approved deep-domain industry (PRD §6, §9).
 * The sectors below appeared on the legacy site, but proven delivery experience has not been
 * confirmed. They stay pending until leadership approves them (PRD §6 "based on proven experience").
 */
export const otherIndustries: { name: string; status: Status }[] = [
  { name: "Banking & Financial Services", status: "pending" },
  { name: "Insurance", status: "pending" },
  { name: "Retail & eCommerce", status: "pending" },
  { name: "ISV & Technology", status: "pending" },
  { name: "Energy & Utilities", status: "pending" },
  { name: "Manufacturing", status: "pending" },
  { name: "Automotive", status: "pending" },
  { name: "Education & EdTech", status: "pending" },
  { name: "Digital Media & Advertising", status: "pending" },
];
