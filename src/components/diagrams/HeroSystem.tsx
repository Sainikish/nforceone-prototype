/**
 * Hero technology visual (HOME-002, ANIM-004): one signal travels through NForce One's capability
 * story (AI & Agentic → Quality & AI Assurance → Digital Engineering → Data & Cloud → Telecom-grade
 * delivery) to an enterprise outcome. Pure SVG + CSS/SMIL: no JS and no layout shift.
 * Desktop uses a zig-zag layout; phones get a vertical layout so labels stay ≥ 12px.
 * Under prefers-reduced-motion the signal is hidden and the diagram is static.
 */

const CYCLE = 8; // seconds per journey (the signal rests on the outcome for the last 15%)
const TRAVEL = 0.85;

const LABELS = ["AI & Agentic", "Quality & AI Assurance", "Digital Engineering", "Data & Cloud", "Telecom-grade delivery"];

type Layout = {
  id: string;
  viewBox: [number, number];
  path: string;
  nodeW: number;
  nodes: { x: number; y: number; t: number }[];
  outcome: { x: number; y: number; w: number };
  font: number;
};

const desktop: Layout = {
  id: "d",
  viewBox: [560, 624],
  nodeW: 248,
  font: 18,
  path: "M130 60 H410 Q430 60 430 80 V240 Q430 260 410 260 H150 Q130 260 130 280 V340 Q130 360 150 360 H410 Q430 360 430 380 V440 Q430 460 410 460 H150 Q130 460 130 480 V550 Q130 570 150 570 H280",
  nodes: [
    { x: 130, y: 60, t: 0 },
    { x: 430, y: 160, t: 0.2185 },
    { x: 130, y: 260, t: 0.4259 },
    { x: 430, y: 360, t: 0.6396 },
    { x: 130, y: 460, t: 0.8533 },
  ],
  outcome: { x: 280, y: 570, w: 270 },
};

const mobile: Layout = {
  id: "m",
  viewBox: [340, 426],
  nodeW: 300,
  font: 15,
  path: "M170 28 V388",
  nodes: LABELS.map((_, i) => ({ x: 170, y: 28 + i * 72, t: i / 5 })),
  outcome: { x: 170, y: 388, w: 300 },
};

function Diagram({ l, className }: { l: Layout; className: string }) {
  const [vw, vh] = l.viewBox;
  const pid = `hs-path-${l.id}`;
  const h = 52;
  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} aria-hidden className={`h-auto w-full overflow-visible ${className}`}>
      <defs>
        <radialGradient id={`hs-glow-${l.id}`}>
          <stop offset="0" stopColor="#ff4436" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff4436" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path id={pid} d={l.path} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
      <path d={l.path} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1" className="flow-line motion-only" />

      {l.nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <rect x={-l.nodeW / 2} y={-h / 2} width={l.nodeW} height={h} rx="8" fill="#0b0b0b" stroke="#fff" strokeOpacity="0.18" />
          <rect
            x={-l.nodeW / 2}
            y={-h / 2}
            width={l.nodeW}
            height={h}
            rx="8"
            fill="none"
            stroke="#ff4436"
            className="hs-hit motion-only"
            style={{ animationDelay: `${n.t * TRAVEL * CYCLE}s` }}
          />
          <circle cx={-l.nodeW / 2 + 22} cy="0" r="3.5" fill="#ff4436" opacity={i === 0 ? 1 : 0.55} />
          <text
            x={-l.nodeW / 2 + 38}
            y={l.font * 0.36}
            fill="#fff"
            fontSize={l.font}
            fontWeight="600"
            letterSpacing="-0.01em"
            fontFamily="var(--font-sans)"
          >
            {LABELS[i]}
          </text>
        </g>
      ))}

      <g transform={`translate(${l.outcome.x} ${l.outcome.y})`}>
        <rect
          x={-l.outcome.w / 2}
          y="-30"
          width={l.outcome.w}
          height="60"
          rx="8"
          fill="#fff"
          className="hs-outcome"
          style={{ animationDelay: `${TRAVEL * CYCLE}s` }}
        />
        <text
          x={-l.outcome.w / 2 + 24}
          y={l.font * 0.38}
          fill="#000"
          fontSize={l.font + 1}
          fontWeight="600"
          letterSpacing="-0.015em"
          fontFamily="var(--font-sans)"
        >
          Enterprise Outcome
        </text>
        <circle cx={l.outcome.w / 2 - 24} cy="0" r="4.5" fill="#d40a0a" />
      </g>

      <g className="motion-only">
        {[
          { r: 16, fill: `url(#hs-glow-${l.id})` },
          { r: 3.5, fill: "#ff4436" },
        ].map((c) => (
          <circle key={c.r} r={c.r} fill={c.fill}>
            <animateMotion dur={`${CYCLE}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes={`0;${TRAVEL};1`} calcMode="linear">
              <mpath href={`#${pid}`} />
            </animateMotion>
          </circle>
        ))}
      </g>
    </svg>
  );
}

export function HeroSystem({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} role="img" aria-label="How NForce One works: AI and agentic solutions, quality and AI assurance, digital engineering, data and cloud, and telecom-grade delivery combine into an enterprise outcome.">
      <Diagram l={desktop} className="hidden sm:block" />
      <Diagram l={mobile} className="sm:hidden" />
      <style>{`
        @keyframes hs-hit { 0% { opacity: 0.9 } 14% { opacity: 0 } 100% { opacity: 0 } }
        .hs-hit { opacity: 0; animation: hs-hit ${CYCLE}s var(--ease-out) infinite; }
        @keyframes hs-outcome { 0% { filter: none } 4% { filter: drop-shadow(0 0 14px rgb(255 68 54 / .45)) } 20%, 100% { filter: none } }
        .hs-outcome { animation: hs-outcome ${CYCLE}s var(--ease-out) infinite; }
        @media (prefers-reduced-motion: reduce) { .hs-outcome { animation: none } }
      `}</style>
    </div>
  );
}
