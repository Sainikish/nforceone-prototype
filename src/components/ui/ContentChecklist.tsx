import { reviewMode } from "@/lib/content";
import { PendingBadge } from "./Pending";

/**
 * One compact block listing the content still needed before a page can be published.
 * It replaces a stack of empty sections. Review mode only.
 */
export function ContentChecklist({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: readonly { title: string; need: string }[];
}) {
  if (!reviewMode || items.length === 0) return null;
  return (
    <section aria-labelledby="checklist-title" className="rounded-md border border-dashed border-black/15 bg-paper-50 p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="checklist-title" className="t-h4 text-[20px]">
          {title}
        </h2>
        <PendingBadge>{`${items.length} item${items.length === 1 ? "" : "s"} needed`}</PendingBadge>
      </div>
      {intro && <p className="mt-3 max-w-[44rem] t-small text-gray-600">{intro}</p>}
      <ol className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.title} className="grid grid-cols-[2rem_1fr] gap-2">
            <span aria-hidden className="grid size-6 place-items-center rounded-xs border border-black/15 text-[11px] text-gray-500">
              {i + 1}
            </span>
            <span>
              <span className="block text-[15px] font-semibold">{it.title}</span>
              <span className="mt-0.5 block t-small text-gray-600">{it.need}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
