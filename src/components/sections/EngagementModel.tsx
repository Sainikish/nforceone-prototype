"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagementModels } from "@/content/engagement";

/** How We Engage: horizontal expanding panels on desktop, a plain list on mobile (ENG-001). */
export function EngagementModel() {
  const [active, setActive] = useState(2);

  return (
    <section aria-labelledby="eng-title" className="bg-paper-50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we engage"
          title={<span id="eng-title">One partner. The delivery model that fits.</span>}
          lead="From US-based client teams to India-based scalable engineering, with commercial models that match how you want to buy."
        />

        {/* Desktop: expanding panels */}
        <div className="mt-16 hidden h-[300px] gap-2 xl:flex" role="list">
          {engagementModels.map((m, i) => {
            const on = i === active;
            return (
              <div
                role="listitem"
                key={m.name}
                style={{ flexGrow: on ? 2.6 : 1 }}
                className="relative min-w-0 basis-0 transition-[flex-grow] duration-(--duration-slower) ease-(--ease-out)"
              >
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-md border p-5 text-left transition-colors duration-(--duration-slow) ${
                    on ? "border-black bg-black text-white" : "border-line bg-white text-black hover:border-black/30"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                    {on && <span aria-hidden className="size-1.5 rounded-full bg-red" />}
                  </span>
                  <span className="block">
                    <span className={`t-label block text-gray-500 transition-opacity ${on ? "opacity-100" : "opacity-0"}`}>{m.group}</span>
                    <span
                      className={`mt-3 block font-semibold leading-tight tracking-[-0.02em] transition-[font-size] duration-(--duration-slow) ${
                        on ? "text-[24px]" : "text-[17px]"
                      }`}
                    >
                      {m.name}
                    </span>
                    <span
                      className={`mt-3 block max-w-[26rem] t-body text-gray-400 transition-opacity duration-(--duration-slow) ${
                        on ? "opacity-100" : "h-0 opacity-0"
                      }`}
                    >
                      {m.line}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet: everything visible */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
          {engagementModels.map((m, i) => (
            <li key={m.name} className="bg-white p-6">
              <span className="t-label text-gray-500">
                {String(i + 1).padStart(2, "0")} · {m.group}
              </span>
              <p className="mt-3 text-[19px] font-semibold tracking-[-0.02em]">{m.name}</p>
              <p className="mt-2 t-small text-gray-600">{m.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
