import { AskChips } from "@/components/assistant/AskButton";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { suggestedQuestions } from "@/content/assistant-prompts";

/** Surfaces the assistant in the homepage story (PRD §7.1 step 9). */
export function AssistantBand() {
  return (
    <section aria-labelledby="ask-title" className="border-t border-line bg-white py-20 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>NForce AI Assistant</Eyebrow>
          <h2 id="ask-title" className="t-h3 mt-5 max-w-[22ch] text-balance">
            Looking for something specific? Ask, and we&apos;ll point you to the right place.
          </h2>
          <p className="mt-4 t-small text-gray-600">
            Answers come only from approved NForce One information, and a person is always one click away.
          </p>
        </div>
        <div className="lg:col-span-7">
          <AskChips questions={suggestedQuestions} />
        </div>
      </div>
    </section>
  );
}
