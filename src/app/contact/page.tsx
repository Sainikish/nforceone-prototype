import { Suspense } from "react";
import { AskButton } from "@/components/assistant/AskButton";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to an NForce One expert, discuss your project, request a product demo or an AI / QA assessment. Offices in Plano, Texas and Hyderabad, India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the right team."
        lead="Tell us what you're working on. Your message goes straight to our AI, Quality Engineering, Digital Engineering, Data & Cloud or Telecom specialists."
      />

      <section aria-label="Contact NForce One" className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-7">
            <Suspense fallback={<div className="h-[720px]" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <h2 className="t-label text-gray-600">Email</h2>
                <a href={`mailto:${site.email}`} className="mt-3 block text-[19px] font-medium tracking-[-0.015em] hover:underline">
                  {site.email}
                </a>
                <a href={site.phone.href} className="mt-1 block t-small text-gray-600 hover:text-black">
                  {site.phone.display}
                </a>
              </div>
              <div>
                <h2 className="t-label text-gray-600">Offices</h2>
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
