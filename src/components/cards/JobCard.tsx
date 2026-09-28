import Link from "next/link";
import type { Role } from "@/content/careers";
import { ArrowRight, Plus } from "@/components/ui/icons";
import { PendingBadge } from "@/components/ui/Pending";

// On-site application (Contact form, Careers mode) rather than mailto:, which launches a desktop
// mail app that is often not configured
const applyHref = (title: string) => `/contact?intent=careers&role=${encodeURIComponent(title)}`;

/**
 * One open role. Every row has the same layout: title and meta on the left, and "Apply" in the same
 * position on the right. Roles with a description also get a "Details" toggle (native <details>,
 * keyboard and screen-reader friendly) that expands the overview and requirements below the row.
 * The Apply link sits outside <summary>, so clicking it never toggles the panel.
 */
export function JobCard({ role }: { role: Role }) {
  const heading = (
    <div className="min-w-0">
      <h3 className="text-[18px] font-semibold tracking-[-0.015em]">{role.title}</h3>
      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 t-small text-gray-600">
        <span>{role.team}</span>
        <span aria-hidden>·</span>
        <span>{role.location}</span>
        {role.status === "pending" && <PendingBadge>Confirm open</PendingBadge>}
      </span>
    </div>
  );

  const apply = (
    <Link
      href={applyHref(role.title)}
      data-track="cta_click"
      data-track-label={`apply_${role.title}`}
      aria-label={`Apply for ${role.title}`}
      className="group inline-flex h-10 items-center gap-2 rounded-sm border border-black/15 px-4 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
    >
      Apply <ArrowRight className="arrow" size={14} />
    </Link>
  );

  return (
    <div className="relative border-b border-line">
      {role.overview ? (
        <details className="group/job">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 pr-0 transition-colors hover:bg-paper-50 sm:px-4 sm:pr-[132px] [&::-webkit-details-marker]:hidden">
            {heading}
            <span className="flex shrink-0 items-center gap-2 t-small font-medium">
              <span className="group-open/job:hidden">Details</span>
              <span className="hidden group-open/job:inline">Close</span>
              <Plus size={16} className="transition-transform duration-(--duration-base) group-open/job:rotate-45" />
            </span>
          </summary>
          <div className="pb-8 sm:px-4">
            <p className="max-w-[48rem] t-body text-gray-700">{role.overview}</p>
            {role.requirements && (
              <>
                <h4 className="t-label mt-8 text-gray-600">Key requirements</h4>
                <ul className="mt-4 grid max-w-[52rem] gap-2.5">
                  {role.requirements.map((r) => (
                    <li key={r} className="flex gap-3 t-small text-gray-700">
                      <span aria-hidden className="mt-2 size-1 shrink-0 bg-red" />
                      {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </details>
      ) : (
        <div className="py-6 sm:px-4 sm:pr-[132px]">{heading}</div>
      )}

      {/* Same position for every role: top-right of the row on larger screens, below the row on phones */}
      <div className="pb-6 sm:absolute sm:right-4 sm:top-[26px] sm:pb-0">{apply}</div>
    </div>
  );
}
