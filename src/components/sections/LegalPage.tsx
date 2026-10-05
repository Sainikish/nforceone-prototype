import type { ReactNode } from "react";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { PendingField } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { PageHero } from "./PageHero";

/** Legal page shell. Pass body copy as children; the need marker is review-mode only. */
export function LegalPage({ title, need, facts = [], children }: { title: string; need: string; facts?: string[]; children?: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-white py-20">
        <div className="container-x max-w-[48rem]! space-y-8">
          <PendingField need={need} />
          {children}
          {facts.length > 0 && (
            <ul className="space-y-3 t-body text-gray-700">
              {facts.map((f) => (
                <li key={f} className="border-l-2 border-line pl-4">
                  {f}
                </li>
              ))}
            </ul>
          )}
          <p className="t-body text-gray-600">
            Questions: <CopyEmail email={site.email} />
          </p>
        </div>
      </section>
    </>
  );
}
