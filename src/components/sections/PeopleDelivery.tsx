import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { engagementModels } from "@/content/engagement";
import { stock } from "@/content/media";

/** People + How We Engage in one section: photography first, then the six models as one compact index. */
export function PeopleDelivery() {
  const groups = ["Where we deliver", "How we engage"] as const;
  return (
    <section aria-labelledby="people-title" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>People &amp; delivery</Eyebrow>
            <h2 id="people-title" data-reveal className="t-h2 mt-6 text-balance">
              One team across the US and India
            </h2>
          </div>
          <p data-reveal className="t-lead text-gray-600 lg:col-span-4 lg:col-start-9">
            Client leads in Plano. Engineers in Hyderabad. Onshore, Offshore or Hybrid, whichever model your program calls for.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-6 gap-3">
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

        <div className="mt-12 divide-y divide-line border-y border-line">
          {groups.map((g) => (
            <div key={g} className="grid gap-4 py-6 md:grid-cols-12 md:gap-8">
              <h3 className="t-label pt-1 text-gray-600 md:col-span-3">{g}</h3>
              <ul className="grid gap-5 sm:grid-cols-3 md:col-span-9">
                {engagementModels
                  .filter((m) => m.group === g)
                  .map((m) => (
                    <li key={m.name}>
                      <p className="text-[16px] font-semibold tracking-[-0.01em]">{m.name}</p>
                      <p className="mt-1 t-small text-gray-600">{m.line}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
