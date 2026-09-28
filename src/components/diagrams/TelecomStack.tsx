"use client";

import { useId, useState } from "react";
import { telecomAreas, telecomLayers, type TelecomAreaId } from "@/content/telecom";

/**
 * Interactive telecom architecture (TEL-002). Seven layers from customer to automation,
 * plus a Quality Engineering rail that spans the whole stack end to end. Selecting a layer
 * reveals the matching capability story. It works with pointer, keyboard and touch.
 */
export function TelecomStack({ numbered = true }: { numbered?: boolean }) {
  const [active, setActive] = useState<TelecomAreaId>("cx");
  const id = useId();
  const area = telecomAreas.find((a) => a.id === active)!;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
      <div className="flex gap-3">
        {/* QE rail: spans every layer */}
        <button
          type="button"
          aria-pressed={active === "quality"}
          aria-controls={`${id}-panel`}
          onClick={() => setActive("quality")}
          onMouseEnter={() => setActive("quality")}
          className={`group relative flex w-10 shrink-0 items-center justify-center rounded-sm border transition-colors duration-(--duration-base) ${
            active === "quality" ? "border-red-on-dark/60 bg-red/10" : "border-white/12 hover:border-white/30"
          }`}
        >
          <span className="t-label whitespace-nowrap text-[10px] text-gray-400 [writing-mode:vertical-rl] rotate-180 group-aria-pressed:text-white">
            Quality Engineering · End to End
          </span>
        </button>

        <ol className="relative flex flex-1 flex-col gap-2" aria-label="Telecom architecture layers">
          <span aria-hidden className="absolute left-5 top-3 bottom-3 w-px bg-white/10" />
          <span aria-hidden className="motion-only tel-signal absolute left-[17px] size-[7px] rounded-full bg-red-on-dark" />
          {telecomLayers.map((l, i) => {
            const on = l.area === active;
            return (
              <li key={l.label}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-controls={`${id}-panel`}
                  onClick={() => setActive(l.area)}
                  onMouseEnter={() => setActive(l.area)}
                  onFocus={() => setActive(l.area)}
                  className={`relative flex h-12 w-full items-center gap-4 rounded-sm border pl-10 pr-4 text-left transition-[background-color,border-color] duration-(--duration-base) ${
                    on ? "border-white/40 bg-white/[0.07]" : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-[17px] size-[7px] rounded-[2px] border transition-colors ${
                      on ? "border-red-on-dark bg-red-on-dark" : "border-white/30 bg-black"
                    }`}
                  />
                  {numbered && <span className="t-label w-5 text-gray-500">{String(i + 1).padStart(2, "0")}</span>}
                  <span className={`text-[15px] font-medium ${on ? "text-white" : "text-gray-400"}`}>{l.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div id={`${id}-panel`} aria-live="polite" className="flex flex-col justify-between rounded-md border border-white/10 bg-ink-800 p-6 md:p-8">
        <div key={area.id} className="page-in">
          <p className="t-label text-red-on-dark">Capability area</p>
          <h3 className="t-h3 mt-4 text-white">{area.name}</h3>
          <p className="mt-4 t-body text-gray-400">{area.story}</p>
        </div>
        <ul key={`${area.id}-p`} className="page-in mt-8 flex flex-wrap gap-2">
          {area.points.map((p) => (
            <li key={p} className="rounded-xs border border-white/12 px-2.5 py-1.5 text-[13px] text-gray-400">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes tel-signal { 0% { top: 12px; opacity: 0 } 6% { opacity: 1 } 90% { opacity: 1 } 100% { top: calc(100% - 18px); opacity: 0 } }
        .tel-signal { animation: tel-signal 6s var(--ease-in-out) infinite; }
      `}</style>
    </div>
  );
}
