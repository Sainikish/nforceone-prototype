import { TelecomStack } from "@/components/diagrams/TelecomStack";
import { ArrowLink, Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Telecom as the deep-domain differentiator (HOME-005, TEL-002, TEL-004). */
export function TelecomSection({ headingLevel = "h2", numbered = true }: { headingLevel?: "h1" | "h2"; numbered?: boolean }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="tel-title" className="relative bg-black py-24 text-white md:py-32">
      <div className="container-x grid gap-14 xl:grid-cols-12 xl:gap-8">
        <div className="xl:col-span-5">
          <div className="max-w-[40rem] xl:sticky xl:top-28">
            <Eyebrow tone="dark">Where we stand apart · Telecom</Eyebrow>
            <H id="tel-title" data-reveal className="t-h2 mt-6 text-balance">
              Engineering the OSS/BSS, customer and network systems carriers depend on
            </H>
            <p data-reveal className="t-lead mt-6 text-gray-400">
              Telecom is where we run deepest. AI, Quality Engineering and digital engineering converge across OSS/BSS, customer experience, network and data.
            </p>
            <div className="mt-10 flex flex-col items-start gap-5">
              <Button href="/contact?intent=telecom" tone="dark" track="telecom_discuss">
                Discuss Your Telecom Transformation
              </Button>
              <ArrowLink href="/industries/telecom" tone="dark" track="telecom_explore">
                Explore Telecom
              </ArrowLink>
            </div>
          </div>
        </div>
        <div className="xl:col-span-7">
          <TelecomStack numbered={numbered} />
        </div>
      </div>
    </section>
  );
}
