export const site = {
  name: "NForce One",
  legalName: "NForce One",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nforceone.com",
  positioning: ["AI.", "Quality Engineering.", "Digital Transformation.", "Built to Scale at Speed."],
  positioningLine: "AI. Quality Engineering. Digital Transformation. Built to Scale at Speed.",
  description:
    "NForce One is a technology and delivery partner combining AI, Quality Engineering, Digital Engineering and deep Telecom expertise, delivered at scale from the US and India.",
  // PRD footer address. Confirm lead-routing owner (LEAD-004).
  email: "contact@nforceone.com",
  // From the live site header. Validate before launch.
  phone: { display: "1-800-356-8933", href: "tel:+18003568933" },
  offices: [
    {
      city: "Plano, Texas",
      label: "United States · Associate Brand Office",
      lines: ["5700 Tennyson Parkway, Suite 300", "Plano, Texas 75024", "United States"],
    },
    {
      city: "Hyderabad",
      label: "India · Delivery Center",
      lines: ["4th Floor, Sanali Spazio, Inorbit Mall Rd", "Madhapur, Hyderabad, Telangana 500081", "India"],
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
    { label: "Innovation & Products", href: "/innovation" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
  ],
  utility: [
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** PRD HOME-003 / BR-003 / BR-004 */
export const credibility = [
  { value: "20+", label: "Years of Technology & Quality Engineering Leadership" },
  { value: "US + India", label: "Delivery across two continents" },
  { value: "Telecom", label: "Deep-domain expertise" },
  { value: "AI + QE", label: "Engineering and assurance, together" },
  { value: "Onshore · Offshore · Hybrid", label: "Delivery models" },
] as const;
