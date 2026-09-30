import { Suspense } from "react";
import { AskButton } from "@/components/assistant/AskButton";
import { ContactForm } from "@/components/forms/ContactForm";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Phone } from "@/components/ui/Phone";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to an NForce One expert, discuss your project, request a product demo or an AI / QA assessment. Offices in Plano, Texas and Hyderabad, India.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // Candidates arriving from a careers "Apply" link get a careers-specific header
  const careers = (await searchParams).intent === "careers";
  return (
    <>
      <PageHero
        eyebrow={careers ? "Careers" : "Contact"}
        title={careers ? "Apply to join NForce One" : "Talk to the right team"}
        lead={
          careers
            ? "Tell us about yourself and the role you're interested in"
            : "Tell us what you're working on and we'll route it straight to our AI, Quality Engineering, Digital Engineering, Data & Cloud or Telecom specialists"
        }
      />

      <section aria-label="Contact NForce One" className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-7">
            <noscript>
              <p className="mb-8 rounded-md border border-line p-6 t-small text-gray-700">
                JavaScript is required to submit this form. To get in touch, email{" "}
                <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">
                  {site.email}
                </a>{" "}
                directly.
              </p>
            </noscript>
            <Suspense
              fallback={
                <div aria-hidden="true" className="animate-pulse space-y-8">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-10 w-24 rounded-sm bg-paper-50" />
                    <div className="h-10 w-32 rounded-sm bg-paper-50" />
                    <div className="h-10 w-24 rounded-sm bg-paper-50" />
                    <div className="h-10 w-28 rounded-sm bg-paper-50" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="h-[72px] rounded-sm bg-paper-50" />
                    <div className="h-[72px] rounded-sm bg-paper-50" />
                    <div className="h-[72px] rounded-sm bg-paper-50" />
                    <div className="h-[72px] rounded-sm bg-paper-50" />
                    <div className="h-[72px] rounded-sm bg-paper-50 sm:col-span-2" />
                    <div className="h-36 rounded-sm bg-paper-50 sm:col-span-2" />
                  </div>
                  <div className="h-5 w-64 rounded-sm bg-paper-50" />
                  <div className="h-12 w-40 rounded-sm bg-paper-50" />
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <h3 className="t-label text-gray-600">Email</h3>
                <CopyEmail email={site.email} className="mt-3 text-[19px] tracking-[-0.015em]" />

              </div>
              <div>
                <h3 className="t-label text-gray-600">Offices</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {site.offices.map((o) => (
                    <li key={o.city} className="py-5">
                      <p className="text-[16px] font-semibold">{o.city}</p>
                      <p className="mt-0.5 t-label text-[11px] text-gray-500">{o.label}</p>
                      <address className="mt-3 t-small not-italic text-gray-600">
                        {o.lines.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </address>
                      <span className="mt-2 block t-small font-medium text-black">
                        <Phone display={o.phone.display} href={o.phone.href} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md bg-paper-50 p-6">
                <p className="t-small text-gray-600">Have a quick question first?</p>
                <AskButton className="-ml-2 mt-1" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
