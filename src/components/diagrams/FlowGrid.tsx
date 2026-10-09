/** Compact, static step grid: homepage explorer and the mobile version of pillar workflows. */
export function FlowGrid({ steps }: { steps: { label: string; line: string }[] }) {
  return (
    <>
      {/* Mobile: vertical connected flow */}
      <ol className="flex flex-col sm:hidden">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s.label} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${last ? "bg-red-on-dark text-white" : "border border-line bg-white text-gray-500"}`}>
                  {last ? "●" : String(i + 1).padStart(2, "0")}
                </span>
                {!last && <span className="w-px flex-1 bg-line my-1" />}
              </div>
              <div className={`flex-1 rounded-sm border border-line p-4 mb-3 ${last ? "bg-black text-white" : "bg-white"}`}>
                <span className="block text-[15px] font-semibold tracking-[-0.01em]">{s.label}</span>
                <span className={`mt-1 block text-[12.5px] leading-snug ${last ? "text-gray-400" : "text-gray-600"}`}>{s.line}</span>
              </div>
            </li>
          );
        })}
      </ol>
      {/* Tablet+: grid */}
      <ol className="hidden sm:grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s.label} className={`flex min-h-[112px] flex-col justify-between p-4 ${last ? "bg-black text-white" : "bg-white text-black"}`}>
              <span aria-hidden className={`text-[12px] font-semibold tabular-nums ${last ? "text-red-on-dark" : "text-gray-400"}`}>
                {last ? "●" : String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[15px] font-semibold tracking-[-0.01em]">{s.label}</span>
                <span className={`mt-1 block text-[12.5px] leading-snug ${last ? "text-gray-400" : "text-gray-600"}`}>{s.line}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
