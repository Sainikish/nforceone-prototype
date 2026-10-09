/**
 * Canonical origin for metadata, sitemap and Open Graph. Tolerates an empty or protocol-less
 * NEXT_PUBLIC_SITE_URL, then falls back to the Vercel production domain, then nforceone.com.
 */
function resolveSiteUrl(): string {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const raw of candidates) {
    const v = raw?.trim();
    if (!v) continue;
    try {
      return new URL(/^https?:\/\//.test(v) ? v : `https://${v}`).origin;
    } catch {
      // invalid value: try the next candidate
    }
  }
  return "https://www.nforceone.com";
}

export const site = {
  name: "NForce One",
  legalName: "NForce One",
  url: resolveSiteUrl(),
  positioning: ["AI.", "Quality Engineering.", "Digital Engineering.", "Delivered from the US and India."],
  positioningLine: "AI. Quality Engineering. Digital Engineering. Delivered from the US and India.",
  description:
    "NForce One is a technology and delivery partner built on twenty years of Quality Engineering, extended into AI, Digital Engineering and Telecom, and delivered from the US and India.",
  // Matches the official nforceone.com footer. Confirm lead-routing owner (LEAD-004).
  email: "contact@nforceone.com",
  // Job applications, as listed on the official careers page.
  careersEmail: "admin@nforceone.com",
  offices: [
    {
      city: "Plano, Texas",
      label: "United States · Associate Brand Office",
      lines: ["5700 Tennyson Parkway, Suite 300", "Plano, Texas 75024", "United States"],
      phone: { display: "+1 (972) 499-6667", href: "tel:+19724996667" },
    },
    {
      city: "Hyderabad, Telangana",
      label: "India · Delivery Center",
      lines: ["4th Floor, Sanali Spazio, Inorbit Mall Rd", "Madhapur, Hyderabad, Telangana 500081", "India"],
      phone: { display: "+91 93469 34833", href: "tel:+919346934833" },
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nforceone/" },
    { label: "X", href: "https://x.com/NForceOneonX" },
    { label: "YouTube", href: "https://www.youtube.com/@socialmedia_NforceOne" },
    { label: "Instagram", href: "https://www.instagram.com/nforce_one/" },
  ],
} as const;

export const nav = {
  primary: [
    { label: "Capabilities", href: "/capabilities", mega: true },
    { label: "Industries", href: "/industries" },
    { label: "Innovation", href: "/innovation" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
} as const;

/** PRD HOME-003 / BR-003 / BR-004 */
export const credibility = [
  { value: "20+", label: "Years of Quality Engineering leadership" },
  { value: "150+", label: "Engineers and delivery specialists" },
  { value: "US + India", label: "Two-continent delivery" },
  { value: "AI · QE · Digital", label: "Three core engineering disciplines" },
  { value: "Telecom", label: "OSS/BSS, CX and network systems" },
] as const;
