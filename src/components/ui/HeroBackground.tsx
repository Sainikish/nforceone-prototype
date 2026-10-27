"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
);

export function HeroBackground() {
  return <HeroCanvas />;
}
