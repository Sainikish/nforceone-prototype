import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NForce One: AI. Quality Engineering. Digital Transformation. Built to Scale at Speed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (f: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", f));

/** Share image in the site's visual language: black, Geist, one red signal line. */
export default async function OpengraphImage() {
  const [semibold, mono, mark] = await Promise.all([
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Medium.ttf"),
    readFile(join(process.cwd(), "public/brand/nf1-mark-480.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "64px 72px",
          fontFamily: "Geist",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={112} height={48} alt="" />
          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.25)" }} />
          <div style={{ fontSize: 28, letterSpacing: "-0.02em" }}>NForce One</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, letterSpacing: "-0.045em" }}>
          <div>AI.</div>
          <div>Quality Engineering.</div>
          <div>Digital Transformation.</div>
          <div style={{ color: "#8f8f8f" }}>Built to Scale at Speed.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Geist Mono", fontSize: 18, color: "#8f8f8f", letterSpacing: "0.06em" }}>
          <div style={{ width: 40, height: 2, background: "#d40a0a" }} />
          TELECOM EXPERTISE · US + INDIA DELIVERY
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
