import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonial } from "@/components/sections/Testimonial";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { culture, roles } from "@/content/careers";
import { employeeTestimonials } from "@/content/testimonials";
import { visible } from "@/lib/content";
import { stock } from "@/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description:
    "Build what matters at NForce One. Grow across AI, Quality Engineering, cloud and enterprise platforms on real client and product work.",
  path: "/careers",
});

export default function CareersPage() {
  const open = visible(roles);
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build what matters. <span className="text-gray-500">With people who care about engineering.</span>
          </>
        }
        lead="Grow your career as we grow. Work on AI, Quality Engineering and enterprise technology for real clients, and on the products we build ourselves."
        actions={
          <Button href="#roles" tone="dark" size="lg" track="careers_view_roles">
            View open positions
          </Button>
        }
      />

      {/* Life at NForce One: photo-led */}
      <section aria-labelledby="life" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Life at NForce One" title={<span id="life">We put our people first.</span>} />
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            <PhotoSlot brief="Engineers pairing at a workstation" image={stock.engineersCoding} treatment="Full colour" ratio="4/5" className="col-span-2 md:row-span-2 md:aspect-auto! md:h-full" />
            <PhotoSlot brief="QA team stand-up" image={stock.colleaguesLaptop} treatment="Black & white" ratio="1/1" sizes="25vw" />
            <PhotoSlot brief="Hyderabad team working session" image={stock.teamMeeting} treatment="Full colour" ratio="1/1" sizes="25vw" />
            <PhotoSlot brief="Learning session / workshop" image={stock.whiteboard} treatment="Grayscale + accent" ratio="1/1" sizes="25vw" />
            <PhotoSlot brief="Team celebration" image={stock.celebration} treatment="Full colour" ratio="1/1" sizes="25vw" />
          </div>
        </div>
      </section>

      <section aria-labelledby="culture" className="bg-paper-50 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title={<span id="culture">Engineering culture, learning and innovation</span>} />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {culture.map((c, i) => (
              <li key={c.name} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="border-t border-black pt-6">
                <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-4 text-[20px]">{c.name}</h3>
                <p className="mt-3 t-body text-gray-600">{c.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonial items={employeeTestimonials} label="Employee voices" context="careers" more />

      <section id="roles" aria-labelledby="roles-title" className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Open positions" title={<span id="roles-title">Current opportunities</span>} />
            <p className="mt-6 t-small text-gray-600">
              Don&apos;t see your role?{" "}
              <Link href="/contact?intent=careers" className="font-medium text-black underline underline-offset-4">
                Introduce yourself
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            {open.length ? (
              <ul className="border-t border-line">
                {open.map((r) => (
                  <li key={r.title}>
                    <Link
                      href={`/contact?intent=careers&role=${encodeURIComponent(r.title)}`}
                      data-track="cta_click"
                      data-track-label={`apply_${r.title}`}
                      className="group grid items-center gap-2 border-b border-line py-6 transition-colors hover:bg-paper-50 sm:grid-cols-12 sm:gap-6 sm:px-4"
                    >
                      <span className="text-[18px] font-semibold tracking-[-0.015em] sm:col-span-6">{r.title}</span>
                      <span className="t-small text-gray-600 sm:col-span-3">{r.team}</span>
                      <span className="flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end">
                        {r.status === "pending" && <PendingBadge>Confirm open</PendingBadge>}
                        <span className="inline-flex items-center gap-2 t-small font-medium">
                          Apply <ArrowRight className="arrow" size={14} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-md border border-line p-8 t-body text-gray-600">
                There are no open positions right now, but we&apos;re always glad to hear from engineers who care about quality.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
