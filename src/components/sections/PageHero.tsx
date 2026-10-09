import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Dark page opener shared by every internal page. It holds the page's single H1. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_85%_0%,black,transparent_60%)]" />
      <div className="container-x relative pt-[144px] pb-20 md:pt-[168px] md:pb-24">
        <div className={`grid gap-12 ${aside ? "lg:grid-cols-12 lg:items-end lg:gap-8" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-[62rem]"}>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="t-h1 mt-7 text-balance">{title}</h1>
            {lead && <p className="t-lead mt-7 max-w-[40rem] text-gray-300">{lead}</p>}
            {actions && <div className="mt-10 md:mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
