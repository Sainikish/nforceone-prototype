"use client";

import { Spark } from "@/components/ui/icons";

/** Opens the site assistant, optionally with a question pre-sent. */
export const openAssistant = (question?: string) =>
  window.dispatchEvent(new CustomEvent("nf:assistant", { detail: { question } }));

export function AskButton({
  tone = "light",
  question,
  children = "Ask NForce AI",
  className = "",
}: {
  tone?: "light" | "dark";
  question?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openAssistant(question)}
      className={`group inline-flex h-12 items-center gap-2.5 rounded-sm px-2 text-[15px] font-medium transition-colors ${
        tone === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
      } ${className}`}
    >
      <Spark size={16} className="text-red transition-transform duration-(--duration-slow) group-hover:rotate-45" />
      {children}
    </button>
  );
}

/** Suggested-question chips that open the assistant with the question sent. */
export function AskChips({ questions, tone = "light" }: { questions: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <li key={q}>
          <button
            type="button"
            onClick={() => openAssistant(q)}
            className={`rounded-sm border px-3.5 py-2.5 text-left text-[14px] transition-colors duration-(--duration-base) ${
              tone === "dark"
                ? "border-white/15 text-gray-400 hover:border-white hover:text-white"
                : "border-line bg-white text-gray-700 hover:border-black hover:text-black"
            }`}
          >
            {q}
          </button>
        </li>
      ))}
    </ul>
  );
}
