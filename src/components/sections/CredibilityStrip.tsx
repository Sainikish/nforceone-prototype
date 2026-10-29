import { CountUp } from "@/components/ui/CountUp";
import { credibility } from "@/content/site";

/**
 * Credibility strip (HOME-003). "20+" is leadership / experience positioning only (BR-004),
 * never a company-age claim, and the label keeps that wording.
 */
export function CredibilityStrip() {
  return (
    <section aria-label="Why NForce One" className="border-t border-white/10 bg-black text-white">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3 xl:grid-cols-5">
          {credibility.map((c, i) => (
            <li
              key={c.label}
              className={`flex flex-col gap-1.5 bg-black py-5 pr-4 md:gap-2 md:py-10 md:pr-6 ${i > 0 ? "xl:pl-8" : ""} ${
                i === 4 ? "col-span-2 xl:col-span-1" : ""
              } ${i % 2 === 1 ? "max-md:pl-4" : ""} ${i % 3 !== 0 ? "md:max-xl:pl-6" : ""}`}
            >
              <span className="flex flex-col gap-1.5 md:gap-2">
                {/* Real figures are shown large; descriptive items stay a step smaller so the numbers lead */}
                {c.value === "20+" || c.value === "150+" ? (
                  <span className="text-[2.25rem] leading-none font-semibold tracking-[-0.04em] md:flex md:h-[3rem] md:items-end md:text-[3rem]">
                    <CountUp to={c.value === "20+" ? 20 : 150} suffix="+" />
                  </span>
                ) : (
                  <span className="text-[1.125rem] leading-tight font-semibold tracking-[-0.02em] md:flex md:h-[3rem] md:items-end md:text-[1.375rem]">
                    {c.value}
                  </span>
                )}
                <span className="t-small text-gray-500">{c.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
