"use client";

import Link from "next/link";
import type { ComponentProps, PointerEvent } from "react";

/** A Link that publishes the pointer position as --mx / --my, so children can paint a cursor-following spotlight in CSS. */
export function SpotlightLink({ onPointerMove, ...props }: ComponentProps<typeof Link>) {
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  };
  return <Link {...props} onPointerMove={move} />;
}
