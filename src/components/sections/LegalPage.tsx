import { PendingField } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { PageHero } from "./PageHero";

/** Legal page shell. The body copy must come from NForce One legal and is not drafted here. */
export function LegalPage({ title, need, facts = [] }: { title: string; need: string; facts?: string[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-white py-20">
        <div className="container-x max-w-[48rem]! space-y-8">
          <PendingField need={need} />
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
            Questions: <a href={`mailto:${site.email}`} className="text-black underline underline-offset-4">{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
