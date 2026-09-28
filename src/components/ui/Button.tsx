import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-black text-white hover:bg-ink-700",
    secondary: "border border-black/15 text-black hover:border-black hover:bg-black hover:text-white",
    ghost: "text-black hover:text-black/70 px-0!",
  },
  dark: {
    primary: "bg-white text-black hover:bg-paper-200",
    secondary: "border border-white/20 text-white hover:border-white hover:bg-white hover:text-black",
    ghost: "text-white hover:text-white/70 px-0!",
  },
};

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: "md" | "lg";
  arrow?: boolean;
  track?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Primary / secondary / ghost buttons. Render as a Link when `href` is given.
 * `track` sets data-track-label for the delegated analytics listener (cta_click).
 */
export function Button({
  href,
  children,
  variant = "primary",
  tone = "light",
  size = "md",
  arrow = true,
  track,
  className = "",
  type = "button",
  disabled,
}: Props) {
  const cls = [
    "group inline-flex items-center justify-center gap-2.5 rounded-sm font-medium whitespace-nowrap",
    "transition-[background-color,color,border-color] duration-(--duration-base) ease-(--ease-out)",
    "disabled:opacity-50 disabled:pointer-events-none",
    size === "lg" ? "h-12 px-6 text-[15px]" : "h-10 px-4.5 text-sm",
    styles[tone][variant],
    className,
  ].join(" ");
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="arrow -mr-0.5" size={size === "lg" ? 17 : 15} />}
    </>
  );
  const trackProps = track ? { "data-track": "cta_click", "data-track-label": track } : {};

  if (href) {
    return (
      <Link href={href} className={cls} {...trackProps}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} {...trackProps}>
      {inner}
    </button>
  );
}

/** Inline text link with arrow, for secondary navigation inside content. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className = "",
  track,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  track?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium ${
        tone === "dark" ? "text-white" : "text-black"
      } ${className}`}
      {...(track ? { "data-track": "cta_click", "data-track-label": track } : {})}
    >
      <span className="underline decoration-current/25 underline-offset-[5px] transition-[text-decoration-color] group-hover:decoration-current">
        {children}
      </span>
      <ArrowRight className="arrow" size={15} />
    </Link>
  );
}
