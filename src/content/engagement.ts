/** Engagement models: PRD §14 (ENG-001). Descriptions verbatim from the PRD. */
export const engagementModels = [
  { name: "Onshore", line: "US-based engineers and client-facing leads.", group: "Where we deliver" },
  { name: "Offshore", line: "India-based scalable engineering and delivery.", group: "Where we deliver" },
  { name: "Hybrid", line: "Combined US + India model.", group: "Where we deliver" },
  { name: "Managed Delivery", line: "NForce One owns defined outcomes and delivery responsibilities.", group: "How we engage" },
  { name: "Project / SOW", line: "Defined scope, milestones and deliverables.", group: "How we engage" },
  { name: "T&M / Staff Augmentation", line: "Flexible role-based engagement where appropriate.", group: "How we engage" },
] as const;
