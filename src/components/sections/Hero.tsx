import Image from "next/image";
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
      {/* Globe background image — fades in slowly for a dramatic entrance */}
      <div aria-hidden className="absolute inset-0 pointer-events-none [animation:fade-in_1.4s_var(--ease-out)_both]">
        <Image
          src="/hero-globe.png"
          alt=""
          fill
          priority
          className="object-cover object-right opacity-100"
          sizes="100vw"
        />
        {/* Thin left fade to protect text legibility */}
        <div className="absolute inset-0 [background:linear-gradient(to_right,#000_20%,transparent_55%)] lg:[background:linear-gradient(to_right,#000_16%,transparent_38%)] xl:[background:linear-gradient(to_right,#000_18%,transparent_44%)]" />
      </div>
      <div aria-hidden className="bg-grid-dark absolute inset-0 opacity-30 [mask-image:linear-gradient(to_right,black_20%,transparent_55%)] lg:[mask-image:linear-gradient(to_right,black_16%,transparent_38%)] xl:[mask-image:linear-gradient(to_right,black_18%,transparent_44%)]" />
      <div className="container-x relative pt-24 pb-16 lg:min-h-[min(calc(100svh-200px),820px)] lg:pt-[104px] lg:pb-12 flex items-center">
        <div className="max-w-[52rem]">
          <h1 id="hero-title" className="t-display">
            <span className="block [animation:rise-in_0.7s_var(--ease-out)_80ms_both]">AI.</span>
            <span className="block [animation:rise-in_0.7s_var(--ease-out)_180ms_both]">Quality Engineering.</span>
            <span className="block [animation:rise-in_0.7s_var(--ease-out)_280ms_both]">Digital Transformation.</span>
            <span className="block text-gray-400 [animation:rise-in_0.7s_var(--ease-out)_380ms_both]">Built to Scale at Speed.</span>
          </h1>

          <p className="t-lead mt-7 max-w-[36rem] text-balance text-gray-500 [animation:rise-in_0.7s_var(--ease-out)_510ms_both]">
            Built on two decades of Quality Engineering, extended into AI, Digital Engineering and deep Telecom expertise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 [animation:rise-in_0.7s_var(--ease-out)_640ms_both]">
            <Button href="/contact?intent=expert" tone="dark" size="lg" track="hero_talk_to_expert" className="max-sm:w-full">
              Talk to an Expert
            </Button>
            <Button href="/capabilities" tone="dark" variant="secondary" size="lg" track="hero_explore_capabilities">
              Explore Our Capabilities
            </Button>
          </div>
        </div>
      </div>
      <p className="sr-only">{site.description}</p>
    </section>
  );
}
