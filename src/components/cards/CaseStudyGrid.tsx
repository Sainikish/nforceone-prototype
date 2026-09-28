"use client";

import { useState } from "react";
import { caseFilters } from "@/content/caseStudies";
import type { CaseStudy } from "@/content/types";
import { CaseStudyCard } from "./CaseStudyCard";

/** Filterable case-study library (PRD §10). */
export function CaseStudyGrid({ items }: { items: { c: CaseStudy; href?: string }[] }) {
  const [filter, setFilter] = useState<(typeof caseFilters)[number]>("All");
  const shown = filter === "All" ? items : items.filter(({ c }) => c.categories.includes(filter));

  return (
    <div>
      <div role="group" aria-label="Filter case studies" className="no-scrollbar -mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) pb-1">
        {caseFilters.map((f) => {
          const count = f === "All" ? items.length : items.filter(({ c }) => c.categories.includes(f)).length;
          if (count === 0) return null;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-sm border px-4 text-[14px] transition-colors duration-(--duration-base) ${
                filter === f ? "border-black bg-black text-white" : "border-line bg-white text-gray-700 hover:border-black/40"
              }`}
            >
              {f}
              <span className={`t-label text-[10px] ${filter === f ? "text-gray-400" : "text-gray-500"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} case studies shown
      </p>

      {shown.length ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map(({ c, href }) => (
            <li key={c.slug} className="page-in flex">
              <CaseStudyCard c={c} href={href} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-md border border-dashed border-line p-10 text-center t-small text-gray-600">
          No published case studies in this category yet.
        </p>
      )}
    </div>
  );
}
