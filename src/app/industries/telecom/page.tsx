import Link from "next/link";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { TelecomStack } from "@/components/diagrams/TelecomStack";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonial } from "@/components/sections/Testimonial";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/capabilities";
import { caseStudies } from "@/content/caseStudies";
import { telecomAreas, telecomSolutions } from "@/content/telecom";
import { clientTestimonials } from "@/content/testimonials";
import { visible } from "@/lib/content";
import { stock } from "@/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Telecom",
  description:
    "Telecom technology partner for OSS/BSS transformation, end-to-end telecom quality engineering, AI virtual agents, Voice AI and IVR, network and field operations, and telecom data and automation.",
  path: "/industries/telecom",
});

/** Which capability pillar powers each telecom area (cross-linking, CAP-003 / NAV-002). */
const pillarFor: Record<string, string> = {
  "oss-bss": "data-cloud-enterprise-platforms",
  quality: "quality-engineering-ai-assurance",
  cx: "ai-agentic-solutions",
  network: "digital-engineering",
  data: "data-cloud-enterprise-platforms",
};

export default function TelecomPage() {
  const cases = visible(caseStudies).filter((c) => c.categories.includes("Telecom"));
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Link href="/industries" className="hover:text-white">
              Industries
            </Link>{" "}
            / Telecom
          </>
        }
        title="Telecom, engineered end to end"
        lead="Telecom is where NForce One's AI, Quality Engineering and engineering depth come together, from the subscriber's first call to the billing run and the field visit."
        actions={
          <>
            <Button href="/contact?intent=telecom" tone="dark" size="lg" track="telecom_page_discuss">
              Discuss Your Telecom Transformation
            </Button>
            <Button href="/contact?intent=assessment" tone="dark" variant="secondary" size="lg" track="telecom_page_assessment">
              Request an AI or QA Assessment
            </Button>
          </>
        }
      />

      <section aria-labelledby="tel-arch" className="bg-black pb-20 text-white md:pb-28">
        <div className="container-x">
          <div className="border-t border-white/10 pt-16">
            <SectionHeading
              tone="dark"
              eyebrow="Telecom architecture"
              title={<span id="tel-arch">We work across the whole stack</span>}
              lead="Select a layer to see how we engage. Quality Engineering runs end to end, across every layer."
            />
            <div className="mt-14">
              <TelecomStack />
            </div>
          </div>
        </div>
      </section>

      {/* Telecom solutions (official site content) */}
      <section aria-labelledby="tel-solutions" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Telecom solutions"
            title={<span id="tel-solutions">Built for how operators run today</span>}
            lead="From modernizing infrastructure to automating customer service and turning network data into operational decisions — built for an industry being reshaped by 5G, AI and automation."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
            {telecomSolutions.map((sol, i) => (
              <li key={sol.name} data-reveal style={{ "--reveal-i": i % 2 } as React.CSSProperties} className="flex flex-col bg-white p-8 md:p-10">
                <span className="t-label text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-5 text-[20px]">{sol.name}</h3>
                <p className="mt-3 t-body text-gray-600">{sol.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Telecom capability areas" className="bg-white">
        {telecomAreas.map((a, i) => {
          const pillar = pillars.find((p) => p.slug === pillarFor[a.id]);
          if (!pillar) return null;
          return (
            <article
              key={a.id}
              id={a.id}
              aria-labelledby={`area-${a.id}`}
              className={`${i % 2 ? "bg-paper-50" : "bg-white"} py-20 md:py-24`}
            >
              <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-1">
                  <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="lg:col-span-5">
                  <h2 id={`area-${a.id}`} data-reveal className="t-h2">
                    {a.name}
                  </h2>
                  <p data-reveal className="t-lead mt-6 text-gray-600">
                    {a.story}
                  </p>
                  <Link
                    href={`/capabilities/${pillar.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 t-small font-medium text-gray-700 hover:text-black"
                  >
                    Powered by {pillar.name} <ArrowRight className="arrow" size={14} />
                  </Link>
                </div>
                <ul className="grid gap-px self-start overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
                  {a.points.map((pt) => (
                    <li key={pt} className="sm:[&:last-child:nth-child(odd)]:col-span-2 flex items-center gap-3 bg-white px-5 py-4 text-[15px]">
                      <span aria-hidden className="size-1 shrink-0 bg-red" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      <section aria-labelledby="tel-proof" className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Proof" title={<span id="tel-proof">Telecom work</span>} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {cases.map((c) => (
              <CaseStudyCard key={c.slug} c={c} />
            ))}
            <PhotoSlot
              brief="Telecom delivery team at work: war-room, test lab or client workshop (client permission required)"
              image={stock.cellTower}
              treatment="Black & white"
              ratio="auto"
              className="min-h-[320px]"
            />
          </div>
        </div>
      </section>

      <Testimonial items={clientTestimonials} label="Telecom client voice" context="telecom" />
      <FinalCTA
        title="Discuss your telecom transformation"
        lead="OSS/BSS, customer experience, network or data: talk to our telecom team about where to start."
        primary="telecom"
      />
    </>
  );
}
