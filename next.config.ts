import type { NextConfig } from "next";

const QE = "/capabilities/quality-engineering-ai-assurance";
const AI = "/capabilities/ai-agentic-solutions";
const DE = "/capabilities/digital-engineering";
const DATA = "/capabilities/data-cloud-enterprise-platforms";

// Legacy WordPress URLs → consolidated capability pillars (docs/ARCHITECTURE.md §3)
const legacy: Record<string, string> = {
  "/services": "/capabilities",
  ...Object.fromEntries(
    [
      "quality-assurance", "manual-testing", "automation-testing", "consulting-testing",
      "outsourcing-testing", "ux-testing", "performance-testing", "functional-testing",
      "regression-testing", "integration-testing", "compatibility-testing", "pos-testing",
      "payment-testing", "iot-testing", "mobile-app-testing", "mobile-and-device-testing",
      "web-app-testing", "cloud-testing", "pega-testing", "ai-testing",
    ].map((s) => [`/services/${s}`, QE]),
  ),
  "/services/artificial-intelligence": AI,
  "/services/intelligent-rpa": AI,
  "/services/software-development": DE,
  "/services/digital-app-development": DE,
  "/services/management-services": DE,
  ...Object.fromEntries(
    ["pega-development", "devops", "database-management", "data-analytics", "big-data"].map((s) => [
      `/services/${s}`,
      DATA,
    ]),
  ),
  ...Object.fromEntries(
    [
      "automotive", "banking-and-financial", "digital-media-and-advertising", "education-and-edutech",
      "energy-and-utilities", "finance-and-fintech", "insurance", "isv", "manufacturing", "retail",
    ].map((s) => [`/industries/${s}`, "/industries"]),
  ),
  "/faq": "/contact",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
