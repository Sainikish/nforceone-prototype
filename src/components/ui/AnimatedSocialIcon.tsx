"use client";

import { useId } from "react";

export interface AnimatedSocialIconProps {
  platform: string;
  href: string;
  label?: string;
  size?: number;
  className?: string;
}

interface IconDefinition {
  viewBox: string;
  path: string;
  evenOdd?: boolean;
}

/**
 * High-precision vector paths matching the reference recording brand symbols.
 * Standalone glyphs with optical weighting and zero extra badges/containers.
 */
const ICONS: Record<string, IconDefinition> = {
  linkedin: {
    viewBox: "0 0 24 24",
    // Standalone "in" glyph matching reference recording:
    path: "M4.98 1.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zM2.75 8.5h4.45V22H2.75V8.5zm7.25 0h4.2v1.9h.1c.6-1.1 2.1-2.2 4.4-2.2 4.7 0 5.6 3.1 5.6 7.1V22h-4.4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V22H10V8.5z",
  },
  x: {
    viewBox: "0 0 24 24",
    // Official X brand glyph:
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  twitter: {
    viewBox: "0 0 24 24",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  youtube: {
    viewBox: "0 0 24 24",
    // YouTube play button glyph with hollow centered play triangle:
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    evenOdd: true,
  },
  instagram: {
    viewBox: "0 0 24 24",
    // Instagram camera glyph:
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    evenOdd: true,
  },
  facebook: {
    viewBox: "0 0 24 24",
    // Standalone lowercase "f" glyph:
    path: "M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z",
  },
  shopify: {
    viewBox: "0 0 24 24",
    // Standalone Shopify shopping bag glyph:
    path: "M21.579 6.883c-.15-.45-.53-.78-.99-.86l-4.52-.79c-.06-.01-.13-.02-.19-.02L13.82 2.2a1.64 1.64 0 0 0-1.4-.87c-.08 0-.16 0-.24.02-.5.09-.9.43-1.07.89l-1.9 4.88-3.05.53a1.47 1.47 0 0 0-1.2 1.34c0 .07 0 .14.01.21l1.52 11.75a2.2 2.2 0 0 0 2.18 1.92h9.52a2.2 2.2 0 0 0 2.18-1.92l2.25-13.06c.07-.36-.01-.73-.2-1.01zM12.44 3.73c.12-.31.33-.42.47-.45.09.21.36.87.69 1.68l-2.6.45 1.44-3.68zm-.83 14.88c-1.89 0-3.07-1.26-3.07-3.05 0-2.31 1.97-3.79 4.82-4.04l.79-.07v-.47c0-.98-.67-1.55-1.74-1.55-.95 0-1.63.43-1.94 1.15l-1.39-.77c.61-1.35 1.89-2.03 3.42-2.03 2.06 0 3.39 1.13 3.39 3.12v4.86c0 .76.15 1.13.3 1.38h-1.66c-.14-.23-.23-.62-.24-1.08-.55.84-1.46 1.47-2.68 1.47zm.79-5.74c-1.73.17-2.92.93-2.92 2.45 0 1.05.69 1.77 1.79 1.77.96 0 1.67-.52 1.98-1.33v-2.89h-.85z",
  },
};

export function AnimatedSocialIcon({
  platform,
  href,
  label,
  size = 22,
  className = "",
}: AnimatedSocialIconProps) {
  const rawId = useId();
  const safeGradientId = `social-grad-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const key = platform.trim().toLowerCase();
  const icon = ICONS[key] ?? ICONS.x;
  const accessibleLabel = label ?? platform;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      className={`group relative inline-flex items-center justify-center rounded-sm transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="relative block h-full w-full overflow-hidden">
        {/* Layer 1: Solid White Default SVG (slides UP and exits on hover/focus) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-[380ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%] motion-reduce:transition-none"
        >
          <svg
            viewBox={icon.viewBox}
            width={size}
            height={size}
            fill="currentColor"
            className="block"
          >
            <path
              fillRule={icon.evenOdd ? "evenodd" : undefined}
              clipRule={icon.evenOdd ? "evenodd" : undefined}
              d={icon.path}
            />
          </svg>
        </span>

        {/* Layer 2: Gradient SVG (slides UP from bottom into place on hover/focus) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center translate-y-[110%] transition-transform duration-[380ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        >
          <svg
            viewBox={icon.viewBox}
            width={size}
            height={size}
            className="block"
          >
            <defs>
              <linearGradient
                id={safeGradientId}
                x1="0%"
                y1="10%"
                x2="100%"
                y2="90%"
              >
                <stop offset="0%" stopColor="#ec3784" />
                <stop offset="28%" stopColor="#f86548" />
                <stop offset="68%" stopColor="#fa8c3d" />
                <stop offset="100%" stopColor="#fac348" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${safeGradientId})`}
              fillRule={icon.evenOdd ? "evenodd" : undefined}
              clipRule={icon.evenOdd ? "evenodd" : undefined}
              d={icon.path}
            />
          </svg>
        </span>
      </span>

      <span className="sr-only">{accessibleLabel} (opens in a new tab)</span>
    </a>
  );
}
