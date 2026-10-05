import { HeroSystem } from "@/components/diagrams/HeroSystem";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * Homepage hero (HOME-001/002). Each line adds new information: the headline states the positioning,
 * the lead says why us. Height leaves the credibility strip peeking
 * into view as a scroll cue.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-black text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
      <div className="container-x relative grid items-center gap-14 pt-[128px] pb-16 lg:min-h-[min(calc(100svh-96px),880px)] lg:grid-cols-12 lg:gap-8 lg:pt-[104px] lg:pb-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="t-display">
            <span className="block">AI.</span>
            <span className="block">Quality Engineering.</span>
            <span className="block">Digital Transformation.</span>
            <span className="block text-gray-400">Built to Scale at Speed.</span>
          </h1>

          <p className="t-lead mt-7 max-w-[36rem] text-balance text-gray-400">
            Built on two decades of Quality Engineering, extended into AI, Digital Engineering and deep Telecom expertise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/contact?intent=expert" tone="dark" size="lg" track="hero_talk_to_expert" className="max-sm:w-full">
              Talk to an Expert
            </Button>
            <Button href="/capabilities" tone="dark" variant="secondary" size="lg" track="hero_explore_capabilities">
              Explore Our Capabilities
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:mx-0 lg:max-w-[480px] lg:justify-self-end">
          <HeroSystem />
        </div>
      </div>
      <p className="sr-only">{site.description}</p>
    </section>
  );
}
