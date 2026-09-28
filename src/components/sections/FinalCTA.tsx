import Link from "next/link";
import { AskButton, AskChips } from "@/components/assistant/AskButton";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

type CtaIntent = "expert" | "demo" | "project" | "assessment" | "telecom";

const catalog: Record<CtaIntent, { label: string; note: string }> = {
  expert: { label: "Talk to an Expert", note: "Speak with the right NForce One team" },
  demo: { label: "Request a Demo", note: "See NForce One products and accelerators" },
  project: { label: "Discuss Your Project", note: "Scope an engagement with our team" },
  assessment: { label: "Request an AI / QA Assessment", note: "An expert review of your AI or QA estate" },
  telecom: { label: "Discuss Your Telecom Transformation", note: "OSS/BSS, CX, network and data programs" },
};

const secondaryOrder: CtaIntent[] = ["demo", "project", "assessment", "expert"];

/**
 * Closing CTA (HOME-011, LEAD-001). Each page supplies its own headline, lead and primary action.
 * The secondary list shows three other intents and never repeats the primary one.
 */
export function FinalCTA({
  title = "Let's build what's next.",
  lead = "Tell us what you are building, testing or modernizing, and the right NForce One team will get back to you.",
  primary = "expert",
  primaryLabel,
  prompts,
}: {
  title?: string;
  lead?: string;
  primary?: CtaIntent;
  /** Page-specific button text for the primary intent (e.g. "Discuss Your AI Initiative"). */
  primaryLabel?: string;
  prompts?: readonly string[];
}) {
  const secondary = secondaryOrder.filter((i) => i !== primary).slice(0, 3);

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-black text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_45%,black,transparent_75%)]" />
      <div className="container-x relative grid gap-16 pt-24 pb-20 md:pt-32 md:pb-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="cta-title" data-reveal className="t-h1 max-w-[14ch] text-balance">
            {title}
          </h2>
          <p data-reveal className="t-lead mt-8 max-w-[32rem] text-gray-400">
            {lead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={`/contact?intent=${primary}`} tone="dark" size="lg" track={`final_${primary}`}>
              {primaryLabel ?? catalog[primary].label}
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
          {secondary.map((i) => (
            <li key={i} className="border-b border-white/10">
              <Link
                href={`/contact?intent=${i}`}
                data-track={i === "demo" ? "demo_request" : "cta_click"}
                data-track-label={catalog[i].label}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block text-[17px] font-medium tracking-[-0.015em]">{catalog[i].label}</span>
                  <span className="mt-1 block t-small text-gray-500">{catalog[i].note}</span>
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
