import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonial } from "@/components/sections/Testimonial";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { CountUp } from "@/components/ui/CountUp";
import { ContentChecklist } from "@/components/ui/ContentChecklist";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { reviewMode } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { culture, values } from "@/content/careers";
import { engagementModels } from "@/content/engagement";
import { site } from "@/content/site";
import { employeeTestimonials } from "@/content/testimonials";
import { stock } from "@/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "NForce One combines a Quality Engineering heritage, an AI-first focus and its own product innovation with US + India delivery.",
  path: "/about",
});

const story = [
  {
    title: "Quality Engineering heritage",
    line: "Our roots are in testing and quality engineering. That discipline shapes how we build, not only how we test.",
  },
  {
    title: "AI as the next layer",
    line: "We build AI agents and generative AI applications, and we assure them with the same rigor we bring to enterprise software.",
  },
  {
    title: "Services and products, together",
    line: "We deliver client programs and build our own products and accelerators, and each makes the other better.",
  },
];

export default function AboutPage() {
  const where = engagementModels.filter((m) => m.group === "Where we deliver");
  return (
    <>
      <PageHero
        eyebrow="About NForce One"
        title="Engineers who build, test and ship"
        lead="NForce One is a technology and delivery partner. We combine AI, Quality Engineering, Digital Engineering and deep Telecom expertise, delivered from the United States and India."
        actions={
          <Button href="/careers" tone="dark" variant="secondary" size="lg" track="about_careers">
            Join the team
          </Button>
        }
      />

      {/* Who we are + team photography */}
      <section aria-labelledby="who" className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Who we are"
              title={<span id="who">A technology partner, not a staffing company</span>}
              lead="We take responsibility for outcomes: designing, building, testing, modernizing and operating the systems enterprises depend on."
            />
            <ul className="mt-10 border-t border-line">
              {story.map((st) => (
                <li key={st.title} className="border-b border-line py-5">
                  <h3 className="text-[16px] font-semibold">{st.title}</h3>
                  <p className="mt-1 t-small text-gray-600">{st.line}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-6 gap-3 lg:col-span-7">
            <PhotoSlot brief="Hyderabad engineering team collaborating at the delivery center" image={stock.teamAroundScreen} treatment="Full color" ratio="4/5" className="col-span-4" />
            <div className="col-span-2 flex flex-col gap-3">
              <PhotoSlot brief="Team members reviewing work together" image={stock.colleaguesLaptop} treatment="Black & white" ratio="3/4" sizes="25vw" />
              <PhotoSlot brief="Whiteboard / design session" image={stock.workshopBoard} treatment="Grayscale + accent" ratio="1/1" sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership experience (BR-004) */}
      <section aria-labelledby="exp" className="bg-black py-20 text-white md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p aria-hidden className="text-[clamp(7rem,18vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em] lg:col-span-6">
            <CountUp to={20} suffix="+" />
          </p>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="exp" className="t-h2">
              <span className="sr-only">20+ </span>Years of Technology &amp; Quality Engineering Leadership
            </h2>
            <p className="t-lead mt-6 text-gray-400">
              Our leadership brings more than two decades of experience in technology delivery and quality engineering to every
              engagement.
            </p>
          </div>
        </div>
      </section>

      {/* US + India delivery */}
      <section id="delivery" aria-labelledby="del" className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="US + India delivery"
            title={<span id="del">Close to our clients. Built to scale.</span>}
            lead="Client-facing teams in the United States, with scalable engineering and delivery from India, combined in whichever model fits."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
            {site.offices.map((o, i) => (
              <div key={o.city} className="bg-white p-8 md:p-10">
                <p className="t-label text-gray-500">{o.label}</p>
                <p className="t-h3 mt-4">{o.city}</p>
                <p className="mt-8 border-t border-line pt-5 t-small">
                  <span className="font-semibold">{where[i].name}.</span> <span className="text-gray-600">{where[i].line}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col justify-between gap-3 rounded-md bg-paper-50 px-8 py-5 t-small sm:flex-row sm:items-center">
            <p>
              <span className="font-semibold">{where[2].name}.</span> <span className="text-gray-600">{where[2].line}</span>
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 font-medium">
              Office addresses <ArrowRight className="arrow" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership (ABOUT-002): profiles publish once supplied; checklist only in review mode */}
      {reviewMode && (
        <section aria-label="Leadership" className="bg-white pb-20 md:pb-28">
          <div className="container-x">
            <ContentChecklist
              title="Leadership profiles in preparation"
              intro="The people accountable for delivery will be introduced here with approved names, titles and photography."
              items={[
                { title: "Names & titles", need: "Leadership team members approved for publication." },
                { title: "Portraits", need: "Consented, consistently lit portraits (black & white treatment)." },
                { title: "Short bios", need: "Two or three lines each on experience and focus." },
              ]}
            />
          </div>
        </section>
      )}

      {/* Culture & values */}
      <section aria-labelledby="culture" className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="People & culture" title={<span id="culture">Better together</span>} lead="Work matters, and so do the people doing it." />
            <ul className="mt-10 border-t border-line">
              {culture.map((c) => (
                <li key={c.name} className="border-b border-line py-5">
                  <p className="text-[16px] font-semibold">{c.name}</p>
                  <p className="mt-1 t-small text-gray-600">{c.line}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="t-label text-gray-600">Our values</h3>
            <ol className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {values.map((v, i) => (
                <li key={v.name} className="bg-white p-6 md:p-8">
                  <span className="t-label text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 t-h4 text-[20px]">
                    <span className="text-red">{v.name[0]}</span>{v.name.slice(1)}
                  </p>
                  <p className="mt-2 t-small text-gray-600">{v.line}</p>
                </li>
              ))}
            </ol>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <PhotoSlot brief="Team event or celebration, Hyderabad" image={stock.celebration} treatment="Full color" ratio="3/2" sizes="25vw" />
              <PhotoSlot brief="Training / innovation session" image={stock.whiteboard} treatment="Monochrome overlay" ratio="3/2" sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      <Testimonial items={employeeTestimonials} label="Employee voices" context="careers" more />
      <FinalCTA
        title="Let's talk about your next program"
        lead="We'll bring the right people and the delivery model to match: Onshore, Offshore or Hybrid."
      />
    </>
  );
}
