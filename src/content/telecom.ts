/** Telecom deep-domain story: PRD §9 (TEL-001, TEL-002). */
export const telecomAreas = [
  {
    id: "oss-bss",
    name: "OSS/BSS Transformation",
    story:
      "Order management, provisioning, billing, customer management, service activation and network systems, modernized and integrated end to end.",
    points: ["Order Management", "Provisioning", "Billing", "Customer Management", "Service Activation", "Network Systems"],
  },
  {
    id: "quality",
    name: "Quality Engineering",
    story:
      "End-to-end telecom testing across the full order-to-bill chain, with system integration, automation, performance and regression built into every release.",
    points: ["End-to-End Telecom Testing", "System Integration Testing", "Automation", "Performance", "Regression"],
  },
  {
    id: "cx",
    name: "AI & Customer Experience",
    story:
      "AI virtual agents, Voice AI and IVR that resolve customer needs, validated call by call before they reach subscribers.",
    points: ["AI Virtual Agents", "Voice AI", "IVR", "Agentic AI", "Customer-Service Automation", "Call Validation"],
  },
  {
    id: "network",
    name: "Network & Field Operations",
    story:
      "Network operations and field-service workflows, automated for operational efficiency from the NOC to the field.",
    points: ["Network Operations", "Field-Service Workflows", "Automation", "Operational Efficiency"],
  },
  {
    id: "data",
    name: "Data & Automation",
    story: "Telecom data engineering and analytics that power intelligent automation and predictive operations.",
    points: ["Telecom Data Engineering", "Analytics", "Intelligent Automation", "Predictive Operations"],
  },
] as const;

export type TelecomAreaId = (typeof telecomAreas)[number]["id"];

/** Layers shown in the interactive architecture, each mapped to a capability area. */
export const telecomLayers: { label: string; area: TelecomAreaId }[] = [
  { label: "Customer", area: "cx" },
  { label: "CX · IVR · Voice AI", area: "cx" },
  { label: "OSS / BSS", area: "oss-bss" },
  { label: "Network", area: "network" },
  { label: "Field Operations", area: "network" },
  { label: "Data", area: "data" },
  { label: "Automation", area: "data" },
];

/**
 * Telecom solutions, from the official nforceone.com Telecom page (September 2026).
 * The live page's "CSAT by over 65%" figure is omitted until it is validated (CONT-003).
 */
export const telecomSolutions = [
  {
    name: "AI-Powered Virtual Agents & IVR",
    line: "Natural, real-time support through LLM-powered voice and text agents that handle high-volume queries, billing and technical troubleshooting, and escalate complex cases to human agents.",
    area: "cx",
  },
  {
    name: "Predictive Network Maintenance",
    line: "Telemetry and AI analytics detect network anomalies before failures occur, minimizing downtime, optimizing resource deployment and improving SLA compliance.",
    area: "network",
  },
  {
    name: "5G & Edge Infrastructure Modernization",
    line: "Scale to 5G by integrating edge computing nodes, virtualized network functions (VNFs) and real-time orchestration, bringing new services to market faster with lower latency.",
    area: "network",
  },
  {
    name: "Real-Time Subscriber Analytics & Churn Reduction",
    line: "Customer data platforms deliver real-time insight into usage, sentiment and service quality, helping providers anticipate churn, personalize offers and retain high-value subscribers.",
    area: "data",
  },
] as const satisfies readonly { name: string; line: string; area: TelecomAreaId }[];
