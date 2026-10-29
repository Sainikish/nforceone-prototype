"use client";

import { useEffect, useRef } from "react";

/**
 * While the next section slides over the pinned hero, publish how far it has been covered (0 → 1) as --hz on the
 * hero section. CSS (.hero-zoom) turns that into a slow zoom-in and fade. Only on desktop, where the hero is pinned,
 * and never with reduced motion.
 */
export function HeroScrollZoom() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;

    const apply = () => {
      raf = 0;
      const p = Math.min(Math.max(window.scrollY / section.offsetHeight, 0), 1);
      section.style.setProperty("--hz", p.toFixed(3));
      // Once the next section has fully covered the hero, keep keyboard focus out of it
      section.toggleAttribute("inert", p >= 0.98);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const bind = () => {
      window.removeEventListener("scroll", onScroll);
      if (mq.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        apply();
      } else {
        section.style.removeProperty("--hz");
        section.removeAttribute("inert");
      }
    };

    bind();
    mq.addEventListener("change", bind);
    return () => {
      mq.removeEventListener("change", bind);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      section.style.removeProperty("--hz");
      section.removeAttribute("inert");
    };
  }, []);

  return <span ref={ref} aria-hidden hidden />;
}
