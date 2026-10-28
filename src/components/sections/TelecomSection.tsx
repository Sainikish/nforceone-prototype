import { TelecomStack } from "@/components/diagrams/TelecomStack";
import { ArrowLink, Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Telecom as the deep-domain differentiator (HOME-005, TEL-002, TEL-004). */
export function TelecomSection({ headingLevel = "h2", numbered = true }: { headingLevel?: "h1" | "h2"; numbered?: boolean }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="tel-title" className="relative bg-black py-14 text-white md:py-20">
      <div className="container-x grid gap-14 xl:grid-cols-12 xl:gap-8">
        <Eyebrow tone="dark" center className="xl:col-span-12">Where we stand apart · Telecom</Eyebrow>
        <div className="mx-auto max-w-[48rem] text-center xl:col-span-12">
          <H id="tel-title" data-reveal className="t-h2 text-balance">
            Engineering the OSS/BSS, customer and network systems carriers depend on
          </H>
          <p data-reveal className="t-lead mt-6 text-gray-400">
            Telecom is where we run deepest. AI, Quality Engineering and digital engineering converge across OSS/BSS, customer experience, network and data.
          </p>
        </div>
        <div className="xl:col-span-10 xl:col-start-2">
          <TelecomStack numbered={numbered} />
        </div>
        <div className="flex flex-col items-center gap-5 xl:col-span-12">
          <Button href="/contact?intent=telecom" tone="dark" track="telecom_discuss">
            Discuss Your Telecom Transformation
          </Button>
          <ArrowLink href="/industries/telecom" tone="dark" track="telecom_explore">
            Explore Telecom
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
