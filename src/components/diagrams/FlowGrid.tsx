/** Compact, static step grid: homepage explorer and the mobile version of pillar workflows. */
export function FlowGrid({ steps }: { steps: { label: string; line: string }[] }) {
  return (
    <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className={`flex min-h-[112px] flex-col justify-between p-4 ${last ? "bg-black text-white" : "bg-white text-black"}`}>
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
