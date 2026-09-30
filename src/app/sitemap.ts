import type { MetadataRoute } from "next";
import { pillars } from "@/content/capabilities";
import { caseStudies } from "@/content/caseStudies";
import { products } from "@/content/innovation";
import { site } from "@/content/site";

/** Only approved detail pages are listed, so pending content is never submitted for indexing. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/capabilities",
    ...pillars.map((p) => `/capabilities/${p.slug}`),
    "/industries",
    "/industries/telecom",
    "/innovation",
    ...products.filter((p) => p.status === "approved").map((p) => `/innovation/${p.slug}`),
    "/case-studies",
    ...caseStudies.filter((c) => c.status === "approved").map((c) => `/case-studies/${c.slug}`),
    "/about",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
