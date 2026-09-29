import { ArrowLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { engagementModels } from "@/content/engagement";
import { stock } from "@/content/media";
import { site } from "@/content/site";

/** People-led moment on the homepage: US + India delivery (BR-003), told through photography. */
export function DeliveryBand() {
  const where = engagementModels.filter((m) => m.group === "Where we deliver");
  return (
    <section aria-labelledby="people-title" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>US + India delivery</Eyebrow>
            <h2 id="people-title" data-reveal className="t-h2 mt-6 text-balance">
              Built by people who care about engineering
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-600 lg:col-span-5">
            Client-facing teams in {site.offices[0].city}. Scalable engineering and delivery in {site.offices[1].city}. One
            team, accountable end to end.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-6 gap-3 md:mt-16">
          <PhotoSlot
            brief="NForce One Hyderabad delivery team in a working session"
            image={stock.teamMeeting}
            ratio="16/10"
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="col-span-6 lg:col-span-4 lg:row-span-2 lg:aspect-auto! lg:h-full"
          />
          <PhotoSlot
            brief="Design review at the whiteboard"
            image={stock.whiteboard}
            treatment="Black & white"
            ratio="16/10"
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="col-span-3 lg:col-span-2"
          />
          <PhotoSlot
            brief="Engineers at work"
            image={stock.engineersCoding}
            treatment="Grayscale + accent"
            ratio="16/10"
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="col-span-3 lg:col-span-2"
          />
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {where.map((m) => (
            <div key={m.name} className="bg-white p-6">
              <p className="text-[16px] font-semibold">{m.name}</p>
              <p className="mt-1 t-small text-gray-600">{m.line}</p>
            </div>
          ))}
        </div>
        <ArrowLink href="/about#delivery" className="mt-10" track="home_delivery_about">
          How we deliver
        </ArrowLink>
      </div>
    </section>
  );
}
