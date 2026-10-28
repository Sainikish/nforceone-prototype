"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

// three.js is only fetched in the browser, after the hero text has painted
const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

/**
 * Right-hand hero visual: the live 3D globe. If WebGL is unavailable (or the context is lost) it falls back
 * to the static globe image so the hero never looks broken. On small screens it sits below the CTAs, never behind the text.
 */
export function HeroGlobe() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image src="/hero-globe.png" alt="" fill priority sizes="100vw" className="object-cover object-right" />
        <div className="absolute inset-0 [background:linear-gradient(to_right,#000_20%,transparent_55%)] lg:[background:linear-gradient(to_right,#000_16%,transparent_38%)] xl:[background:linear-gradient(to_right,#000_18%,transparent_44%)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none relative mx-auto -mt-2 mb-2 w-full max-w-[34rem] aspect-[1.25] transition-opacity duration-[1400ms] ease-out sm:max-w-[40rem] lg:absolute lg:right-[-5vw] lg:top-[calc(3%+2.5vw)] lg:m-0 lg:max-w-none lg:w-[58vw] lg:aspect-[1.1] ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <GlobeScene onReady={onReady} onFail={onFail} />
    </div>
  );
}
