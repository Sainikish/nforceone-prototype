import Link from "next/link";
import { pillars } from "@/content/capabilities";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/** Capabilities mega menu: four strategic pillars (NAV-001), with a Telecom shortcut (NAV-002). */
export function MegaMenu({ id, open, onNavigate }: { id: string; open: boolean; onNavigate: () => void }) {
  return (
    <div
      id={id}
      hidden={!open}
      className="mega-in absolute inset-x-0 top-full border-b border-white/10 bg-black"
    >
      {/* Shared rows (subgrid): number, title and list line up across all four columns however the titles wrap */}
      <div className="container-x grid grid-cols-4 grid-rows-[auto_auto_1fr] gap-x-px py-8">
        {pillars.map((p) => (
          <Link
            key={p.slug}
            href={`/capabilities/${p.slug}`}
            onClick={onNavigate}
            className="group relative row-span-3 grid grid-rows-subgrid rounded-md p-5 transition-colors duration-(--duration-base) hover:bg-white/[0.04]"
          >
            <span className="t-label text-gray-500 transition-colors group-hover:text-red-on-dark">{p.index}</span>
            <span className="mt-4 flex items-start justify-between gap-3 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-white">
              {p.name}
              <ArrowRight className="arrow mt-1 shrink-0 text-gray-500 group-hover:text-white" size={15} />
            </span>
            <ul className="mt-5 space-y-2 self-start border-t border-white/10 pt-4">
              {p.highlights.map((h) => (
                <li key={h} className="text-[13px] text-gray-400">
                  {h}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex items-center justify-between py-4 text-[13px]">
          <Link href="/capabilities" onClick={onNavigate} className="group inline-flex items-center gap-2 text-gray-400 hover:text-white">
            All capabilities <ArrowRight className="arrow" size={13} />
          </Link>
          <Link
            href="/industries/telecom"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <span className="size-1.5 rounded-full bg-red" aria-hidden />
            Telecom: our deep-domain specialism
            <ArrowUpRight className="arrow-diag" size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
