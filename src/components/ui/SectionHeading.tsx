import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "light",
  center = false,
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
  className?: string;
}) {
  const text = typeof children === "string" ? children : Array.isArray(children) && children.every((c) => typeof c === "string") ? children.join("") : null;
  return (
    <p
      data-type
      className={`t-label flex items-center gap-3 font-sans! text-[0.9375rem]! font-bold! tracking-[0.14em]! md:text-[1.0625rem]! ${center ? "justify-center" : ""} ${className}`}
    >
      {/* The gradient and the "writing" wipe live on this span, so both follow the text's own width. */}
      <span
        className={`eyebrow-text ${tone === "dark" ? "eyebrow-flow-dark" : "eyebrow-flow-light"}`}
        style={{ "--n": text?.length ?? 24 } as React.CSSProperties}
      >
        {children}
      </span>
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
