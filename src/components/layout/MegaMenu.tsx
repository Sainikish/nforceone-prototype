import Link from "next/link";
import { pillars } from "@/content/capabilities";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/** Capabilities mega menu: four strategic pillars (NAV-001), with a Telecom shortcut (NAV-002). */
export function MegaMenu({ id, open, onNavigate }: { id: string; open: boolean; onNavigate: () => void }) {
  return (
    <div
      id={id}
      hidden={!open}
      className="mega-in absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 w-[900px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-line bg-white"
    >
      {/* Four pillar columns with dividers */}
      <div className="grid grid-cols-4 divide-x divide-line p-2">
        {pillars.map((p) => (
          <Link
            key={p.slug}
            href={`/capabilities/${p.slug}`}
            onClick={onNavigate}
            className="group relative flex flex-col gap-0 rounded-lg p-5 transition-colors duration-(--duration-base) hover:bg-paper-50"
          >
            <span className="t-label text-gray-400 transition-colors group-hover:text-red">{p.index}</span>
            <span className="mt-4 flex items-start justify-between gap-3 text-[16px] font-semibold leading-snug tracking-[-0.015em] text-black">
              {p.name}
              <ArrowRight className="arrow mt-0.5 shrink-0 text-gray-400 group-hover:text-black" size={14} />
            </span>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {p.highlights.map((h) => (
                <li key={h} className="text-[12.5px] text-gray-500">
                  {h}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      {/* Footer bar */}
      <div className="border-t border-line">
        <div className="flex items-center justify-between px-7 py-3.5 text-[13px]">
          <Link href="/capabilities" onClick={onNavigate} className="group inline-flex items-center gap-2 text-gray-500 hover:text-black">
            All capabilities <ArrowRight className="arrow" size={13} />
          </Link>
          <Link
            href="/industries/telecom"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 text-gray-500 hover:text-black"
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
