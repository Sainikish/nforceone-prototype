import type { Status } from "./types";

/** Roles listed on the legacy Careers page. Confirm each one is still open before launch. */
export const roles: { title: string; team: string; status: Status }[] = [
  { title: "Senior Automation Tester", team: "Quality Engineering", status: "pending" },
  { title: "Performance Tester", team: "Quality Engineering", status: "pending" },
  { title: "QA Manager", team: "Quality Engineering", status: "pending" },
  { title: "PEGA Developer", team: "Enterprise Platforms", status: "pending" },
  { title: "Associate Engineer Intern", team: "Engineering", status: "pending" },
];

/** The four attributes from the legacy About page, with spelling corrected. */
export const values = [
  { name: "User-focused", line: "We start from the people who will use what we build." },
  { name: "Quality-focused", line: "Quality is engineered in, not inspected at the end." },
  { name: "Agility-focused", line: "We move quickly and adapt as your needs change." },
  { name: "Innovation-focused", line: "We build our own products and bring what we learn to every client." },
] as const;

export const culture = [
  {
    name: "People first",
    line: "We value team happiness, work/life balance and professional development.",
  },
  {
    name: "Engineering culture",
    line: "Testing, automation and code quality are part of how every team works, not a separate phase.",
  },
  {
    name: "Learning",
    line: "Engineers grow across AI, Quality Engineering, cloud and enterprise platforms on real client and product work.",
  },
  {
    name: "Innovation",
    line: "Teams build NForce One's own AI products and accelerators alongside client delivery.",
  },
] as const;
