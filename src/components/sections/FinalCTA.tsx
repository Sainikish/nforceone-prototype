import Link from "next/link";
import { AskButton, AskChips } from "@/components/assistant/AskButton";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

const intents = [
  { label: "Request a Demo", href: "/contact?intent=demo", note: "See NForce One products and accelerators" },
  { label: "Discuss Your Project", href: "/contact?intent=project", note: "Scope an engagement with our team" },
  { label: "Request an AI / QA Assessment", href: "/contact?intent=assessment", note: "An expert review of your AI or QA estate" },
];

/** Closing enterprise CTA (HOME-011, LEAD-002) with the assistant as a low-friction alternative. */
export function FinalCTA({ title = "Let's build what's next.", prompts }: { title?: string; prompts?: readonly string[] }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-black text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_45%,black,transparent_75%)]" />
      <div className="container-x relative grid gap-16 pt-24 pb-20 md:pt-32 md:pb-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="cta-title" data-reveal className="t-h1 max-w-[12ch] text-balance">
            {title}
          </h2>
          <p data-reveal className="t-lead mt-8 max-w-[32rem] text-gray-400">
            Tell us what you are building, testing or modernising, and the right NForce One team will get back to you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact?intent=expert" tone="dark" size="lg" track="final_talk_to_expert">
              Talk to an Expert
            </Button>
            {!prompts && <AskButton tone="dark" />}
          </div>
          {prompts && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="t-label mb-4 text-gray-500">Or ask NForce AI</p>
              <AskChips questions={prompts} tone="dark" />
            </div>
          )}
        </div>
        <ul className="self-end border-t border-white/10 lg:col-span-5">
          {intents.map((i) => (
            <li key={i.href} className="border-b border-white/10">
              <Link
                href={i.href}
                data-track={i.href.includes("demo") ? "demo_request" : "cta_click"}
                data-track-label={i.label}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block text-[17px] font-medium tracking-[-0.015em]">{i.label}</span>
                  <span className="mt-1 block t-small text-gray-500">{i.note}</span>
                </span>
                <ArrowRight className="arrow shrink-0 text-gray-500 group-hover:text-white" size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
