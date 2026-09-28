/**
 * Clean architectural diagrams for Digital Engineering and Data/Cloud (CAP-004).
 * Light surface, 1px strokes, one animated flow line per connection.
 */

type Box = { x: number; y: number; w: number; h: number; label: string; sub?: string; strong?: boolean };

const variants: Record<"digital" | "data", { title: string; boxes: Box[]; links: string[] }> = {
  digital: {
    title: "Digital engineering reference architecture: channels, API layer, microservices and enterprise systems",
    boxes: [
      { x: 10, y: 20, w: 150, h: 52, label: "Web", sub: "RESPONSIVE APPS" },
      { x: 10, y: 92, w: 150, h: 52, label: "Mobile", sub: "iOS · ANDROID" },
      { x: 10, y: 164, w: 150, h: 52, label: "Partners", sub: "EXTERNAL APIs" },
      { x: 210, y: 70, w: 110, h: 96, label: "API Layer", sub: "GATEWAY", strong: true },
      { x: 370, y: 20, w: 140, h: 44, label: "Service", sub: "MICROSERVICE" },
      { x: 370, y: 96, w: 140, h: 44, label: "Service", sub: "MICROSERVICE" },
      { x: 370, y: 172, w: 140, h: 44, label: "Enterprise Apps", sub: "ERP · CRM · CORE" },
    ],
    links: [
      "M160 46 H185 V100 H210",
      "M160 118 H210",
      "M160 190 H185 V136 H210",
      "M320 100 H345 V42 H370",
      "M320 118 H370",
      "M320 136 H345 V194 H370",
    ],
  },
  data: {
    title: "Data and cloud reference architecture: sources, integration, cloud platform and insight",
    boxes: [
      { x: 10, y: 20, w: 130, h: 44, label: "Applications", sub: "SOURCE" },
      { x: 10, y: 96, w: 130, h: 44, label: "Devices · Network", sub: "SOURCE" },
      { x: 10, y: 172, w: 130, h: 44, label: "Partners", sub: "SOURCE" },
      { x: 180, y: 70, w: 110, h: 96, label: "Integrate", sub: "APIs · EVENTS" },
      { x: 330, y: 44, w: 180, h: 148, label: "Cloud Platform", sub: "AWS · AZURE · GCP", strong: true },
    ],
    links: ["M140 42 H160 V100 H180", "M140 118 H180", "M140 194 H160 V136 H180", "M290 118 H330"],
  },
};

/** Phone layout: the same architecture as a readable vertical flow (the SVG would shrink to ~4px labels). */
const stacked: Record<"digital" | "data", { label: string; items: string[]; strong?: boolean }[]> = {
  digital: [
    { label: "Channels", items: ["Web", "Mobile", "Partners"] },
    { label: "API Layer", items: ["Gateway"], strong: true },
    { label: "Services", items: ["Microservices", "Enterprise apps (ERP · CRM · Core)"] },
  ],
  data: [
    { label: "Sources", items: ["Applications", "Devices & network", "Partners"] },
    { label: "Integrate", items: ["APIs", "Events"] },
    { label: "Cloud Platform", items: ["AWS · Azure · GCP", "Pipelines · Analytics · AI/ML · DevOps"], strong: true },
  ],
};

function Stacked({ variant }: { variant: "digital" | "data" }) {
  const steps = stacked[variant];
  return (
    <ol className="sm:hidden" aria-label={variants[variant].title}>
      {steps.map((st, i) => (
        <li key={st.label}>
          <div className={`rounded-sm border p-4 ${st.strong ? "border-black bg-black text-white" : "border-black/15 bg-white text-black"}`}>
            <p className="text-[15px] font-semibold">{st.label}</p>
            <p className={`mt-1 text-[13px] ${st.strong ? "text-gray-400" : "text-gray-600"}`}>{st.items.join(" · ")}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="mx-auto block h-5 w-px bg-red" />
          )}
        </li>
      ))}
    </ol>
  );
}

export function ArchitectureDiagram({ variant, animate = true }: { variant: "digital" | "data"; animate?: boolean }) {
  const v = variants[variant];
  return (
    <>
    <Stacked variant={variant} />
    <svg viewBox="0 0 520 236" role="img" aria-label={v.title} className="hidden h-auto w-full sm:block">
      <g fill="none" stroke="#000" strokeOpacity="0.18">
        {v.links.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {animate && (
        <g fill="none" stroke="#d40a0a" strokeOpacity="0.9">
          {v.links.map((d) => (
            <path key={d} d={d} className="flow-line motion-only" />
          ))}
        </g>
      )}
      {v.boxes.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="6"
            fill={b.strong ? "#000" : "#fff"}
            stroke="#000"
            strokeOpacity={b.strong ? 1 : 0.16}
          />
          <text
            x={b.x + 14}
            y={b.y + (b.h > 60 ? 26 : 20)}
            fontSize="12.5"
            fontWeight="600"
            fill={b.strong ? "#fff" : "#000"}
            fontFamily="var(--font-sans)"
          >
            {b.label}
          </text>
          {b.sub && (
            <text x={b.x + 14} y={b.y + (b.h > 60 ? 42 : 34)} fontSize="8.5" letterSpacing="0.05em" fill="#888" fontFamily="var(--font-mono)">
              {b.sub}
            </text>
          )}
        </g>
      ))}
      {variant === "data" && (
        <g fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.05em">
          {["PIPELINES", "ANALYTICS", "AI · ML", "DEVOPS"].map((t, i) => (
            <g key={t}>
              <rect x={344 + (i % 2) * 80} y={108 + Math.floor(i / 2) * 36} width="72" height="26" rx="4" fill="none" stroke="#fff" strokeOpacity="0.25" />
              <text x={350 + (i % 2) * 80} y={124 + Math.floor(i / 2) * 36} fill="#bbb">
                {t}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
    </>
  );
}
