/**
 * Step-flow diagram with a single travelling signal (ANIM-003).
 * vertical   → always a vertical rail (AI agent workflow)
 * responsive → vertical on mobile, horizontal from lg (quality pipeline)
 * Each connector owns one time slot of the cycle, so the signal hands off from node to node.
 * The final step is inverted to mark the outcome. Static under reduced motion.
 */
type Step = { label: string; line: string };

export function Pipeline({
  steps,
  direction = "vertical",
  tone = "light",
  slot = 1.1,
  label,
  animate = true,
  numbered = true,
}: {
  steps: readonly Step[];
  direction?: "vertical" | "responsive";
  tone?: "light" | "dark";
  /** seconds per connector */
  slot?: number;
  label: string;
  animate?: boolean;
  numbered?: boolean;
}) {
  const dark = tone === "dark";
  const h = direction === "responsive";
  const n = steps.length;
  const segs = n - 1;
  const cycle = slot * (segs + 1); // one extra slot of rest on the outcome
  const pct = 100 / (segs + 1);
  const kf = `pl-${n}`;

  const rail = dark ? "bg-white/15" : "bg-black/12";

  return (
    <>
      <style>{`
        @keyframes ${kf}-v { 0% { top: 0; opacity: 1 } ${pct}% { top: 100%; opacity: 1 } ${pct + 0.01}%, 100% { top: 100%; opacity: 0 } }
        @keyframes ${kf}-h { 0% { left: 0; opacity: 1 } ${pct}% { left: 100%; opacity: 1 } ${pct + 0.01}%, 100% { left: 100%; opacity: 0 } }
        @keyframes ${kf}-hit { 0% { box-shadow: 0 0 0 0 rgb(212 10 10 / .5) } ${pct * 0.8}% { box-shadow: 0 0 0 7px rgb(212 10 10 / 0) } 100% { box-shadow: 0 0 0 0 rgb(212 10 10 / 0) } }
      `}</style>
      <ol
        aria-label={label}
        className={`relative grid ${h ? "lg:grid-cols-(--cols)" : ""}`}
        style={{ "--cols": `repeat(${n}, minmax(0, 1fr))` } as React.CSSProperties}
      >
        {steps.map((s, i) => {
          const last = i === n - 1;
          const delay = `${i * slot}s`;
          return (
            <li
              key={s.label}
              data-reveal
              style={{ "--reveal-i": i } as React.CSSProperties}
              className={`relative flex gap-5 pb-9 last:pb-0 ${h ? "lg:flex-col lg:gap-6 lg:pb-0 lg:pr-6" : ""}`}
            >
              {!last && (
                <>
                  <span aria-hidden className={`absolute left-[7px] top-[18px] bottom-[2px] w-px ${rail} ${h ? "lg:hidden" : ""}`}>
                    <span
                      className="motion-only absolute -left-[3px] size-[7px] -translate-y-1/2 rounded-full bg-red opacity-0"
                      style={animate ? { animation: `${kf}-v ${cycle}s linear ${delay} infinite` } : undefined}
                    />
                  </span>
                  {h && (
                    <span aria-hidden className={`absolute left-[20px] right-[4px] top-[7px] hidden h-px lg:block ${rail}`}>
                      <span
                        className="motion-only absolute -top-[3px] size-[7px] -translate-x-1/2 rounded-full bg-red opacity-0"
                        style={animate ? { animation: `${kf}-h ${cycle}s linear ${delay} infinite` } : undefined}
                      />
                    </span>
                  )}
                </>
              )}
              <span
                aria-hidden
                className={`relative z-[1] mt-px size-[15px] shrink-0 rounded-[3px] border ${
                  last
                    ? dark
                      ? "border-white bg-white"
                      : "border-black bg-black"
                    : dark
                      ? "border-white/30 bg-ink-900"
                      : "border-black/25 bg-white"
                }`}
                style={animate ? { animation: `${kf}-hit ${cycle}s var(--ease-out) ${delay} infinite` } : undefined}
              />
              <span className="flex min-w-0 flex-col gap-1.5">
                {numbered && <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>}
                <span className={`text-[17px] font-semibold tracking-[-0.015em] ${dark ? "text-white" : "text-black"}`}>
                  {s.label}
                  {last && <span aria-hidden className="ml-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-red" />}
                </span>
                <span className={`t-small ${dark ? "text-gray-500" : "text-gray-600"}`}>{s.line}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
