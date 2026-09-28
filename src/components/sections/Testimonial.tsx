import { PendingBadge } from "@/components/ui/Pending";
import type { Testimonial as T } from "@/content/types";
import { reviewMode, visible } from "@/lib/content";

type Context = T["context"][number];

/**
 * Editorial testimonial (HOME-009, TEST-003). Renders the first testimonial matching `context`,
 * plus further matches as smaller quotes when `more` is set. Only approved testimonials survive
 * production mode. Samples always carry a visible marker and never show a personal name.
 */
export function Testimonial({
  items,
  label = "Client voices",
  context = "general",
  more = false,
}: {
  items: T[];
  label?: string;
  context?: Context;
  more?: boolean;
}) {
  const list = visible(items).filter((t) => t.context.includes(context));
  if (list.length === 0 && !reviewMode) return null;
  const [t, ...rest] = list;
  const who = (x: T) => (x.sample ? null : x.name);

  return (
    <section aria-label={label} className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="t-label flex items-center gap-2.5 text-gray-600">
            <span aria-hidden className="inline-block h-px w-5 bg-red" />
            {label}
          </p>
        </div>
        <div className="lg:col-span-9">
          {t ? (
            <figure>
              {t.sample && <PendingBadge>Sample testimonial · replace with approved quote</PendingBadge>}
              <blockquote className={`t-h2 text-balance font-medium ${t.sample ? "mt-8" : ""}`}>
                <span aria-hidden className="text-gray-500">“</span>
                {t.quote}
                <span aria-hidden className="text-gray-500">”</span>
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
                {who(t) && <span className="text-[15px] font-semibold">{who(t)}</span>}
                <span className="t-label text-gray-600">
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </figure>
          ) : (
            <div className="rounded-md border border-dashed border-black/15 p-8 md:p-12">
              <PendingBadge>Awaiting approved testimonial</PendingBadge>
              <p className="t-h2 mt-8 max-w-[22ch] font-medium text-gray-500">“An approved testimonial will appear here.”</p>
              <p className="mt-8 max-w-[40rem] t-small text-gray-600">
                Reserved for a real, attributed quote with written permission to publish (PRD §11).
              </p>
            </div>
          )}

          {more && rest.length > 0 && (
            <ul className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
              {rest.map((x) => (
                <li key={x.quote}>
                  <figure>
                    <blockquote className="text-[19px] leading-snug tracking-[-0.012em]">“{x.quote}”</blockquote>
                    <figcaption className="mt-4 t-label text-gray-600">
                      {who(x) ? `${who(x)} · ` : ""}
                      {x.role} · {x.company}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
