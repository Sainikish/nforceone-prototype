"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { ArrowRight } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/capabilities";

/** Compact, static process view used inside the explorer (motion is reserved for hero + Telecom). */
function FlowGrid({ steps }: { steps: { label: string; line: string }[] }) {
  return (
    <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className={`flex min-h-[112px] flex-col justify-between p-4 ${last ? "bg-black text-white" : "bg-white"}`}>
            <span aria-hidden className={`text-[12px] ${last ? "text-red-on-dark" : "text-gray-500"}`}>
              {last ? "●" : "→"}
            </span>
            <span>
              <span className="block text-[15px] font-semibold tracking-[-0.01em]">{s.label}</span>
              <span className={`mt-1 block text-[12.5px] leading-snug ${last ? "text-gray-400" : "text-gray-600"}`}>{s.line}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * "What we do": the four capability pillars as one tabbed explorer (WAI-ARIA tabs pattern).
 * Every panel stays in the DOM, so all content is crawlable and works without JS.
 */
export function CapabilityExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = pillars.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="wwd-title" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="wwd-title" data-reveal className="t-h2 mt-6 text-balance">
              Engineering intelligence into every layer of the enterprise.
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-600 lg:col-span-4">
            Four capability pillars. One standard of engineering rigour.
          </p>
        </div>

        <div role="tablist" aria-label="Capability pillars" className="mt-14 grid grid-cols-2 border-t border-line md:mt-16 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`cap-tab-${p.slug}`}
                aria-selected={on}
                aria-controls={`cap-panel-${p.slug}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative -mt-px flex flex-col items-start gap-2 border-t-2 py-5 pr-4 text-left transition-colors duration-(--duration-base) ${
                  on ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <span className={`t-label ${on ? "text-red" : "text-gray-500"}`}>{p.index}</span>
                <span className="text-[16px] font-semibold leading-snug tracking-[-0.015em] md:text-[18px]">
                  <span className="lg:hidden">{p.short}</span>
                  <span className="hidden lg:inline">{p.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        {pillars.map((p, i) => (
          <div
            key={p.slug}
            role="tabpanel"
            id={`cap-panel-${p.slug}`}
            aria-labelledby={`cap-tab-${p.slug}`}
            hidden={i !== active}
            className="page-in mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8"
          >
            <div className="flex flex-col lg:col-span-5">
              <h3 className="t-h3 text-balance">{p.tagline}</h3>
              <p className="mt-4 t-body text-gray-600">{p.pitch}</p>
              <ul className="mt-8 border-t border-line">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
                    <span aria-hidden className="size-1 shrink-0 bg-red" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href={`/capabilities/${p.slug}`}
                data-track="capability_view"
                data-track-label={p.slug}
                className="group mt-8 inline-flex items-center gap-2 self-start text-sm font-medium"
              >
                <span className="underline decoration-current/25 underline-offset-[5px] group-hover:decoration-current">
                  Explore {p.name}
                </span>
                <ArrowRight className="arrow" size={15} />
              </Link>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-md bg-paper-50 p-5 md:p-8">
                {p.slug === "digital-engineering" ? (
                  <ArchitectureDiagram variant="digital" animate={false} />
                ) : p.slug === "data-cloud-enterprise-platforms" ? (
                  <ArchitectureDiagram variant="data" animate={false} />
                ) : (
                  <FlowGrid steps={p.flow!} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
