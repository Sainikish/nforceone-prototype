import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-2.5 ${tone === "dark" ? "text-gray-500" : "text-gray-600"} ${className}`}>
      <span aria-hidden className="inline-block h-px w-5 bg-red" />
      {children}
    </p>
  );
}

/**
 * Standard section opener. `as` controls the heading level so every page keeps a
 * correct H1 → H2 → H3 outline.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  as: Tag = "h2",
  className = "",
  size = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-6">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag data-reveal className={`t-${size} text-balance ${tone === "dark" ? "text-white" : "text-black"}`}>
        {title}
      </Tag>
      {lead && (
        <p
          data-reveal
          style={{ "--reveal-i": 1 } as React.CSSProperties}
          className={`t-lead mt-6 max-w-[42rem] text-pretty ${tone === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
