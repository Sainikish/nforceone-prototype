"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Send, Spark } from "@/components/ui/icons";
import { suggestedQuestions } from "@/content/assistant-prompts";
import { track } from "@/lib/analytics";
import type { AssistantReply } from "@/lib/assistant";

type Msg = { role: "user" | "assistant"; text: string; links?: AssistantReply["links"] };

const handoffs = [
  { label: "Talk to an Expert", href: "/contact?intent=expert" },
  { label: "Request a Demo", href: "/contact?intent=demo" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Persistent, unobtrusive website assistant (CHAT-001…011). A small launcher opens a
 * non-modal panel. Answers come from /api/assistant (approved content only), and every
 * conversation offers a human handoff.
 */
export function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  // Phones: keep the first screen clean; reveal the launcher once the visitor scrolls past the hero
  const [pastHero, setPastHero] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = useCallback(async (q: string) => {
    const question = q.trim();
    if (!question) return;
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = (await res.json()) as AssistantReply & { error?: string };
      track("assistant_message", { topic: data.topic ?? "unanswered" });
      setMsgs((m) => [...m, { role: "assistant", text: data.error ?? data.answer, links: data.links }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong on our side. You can reach the team directly.", links: handoffs.slice(2) },
      ]);
    } finally {
      setBusy(false);
    }
  }, []);

  const show = useCallback(() => {
    setOpen((was) => {
      if (!was) track("assistant_open", { page: location.pathname });
      return true;
    });
  }, []);

  // Other components can open the assistant (optionally with a question)
  useEffect(() => {
    const onOpen = (e: Event) => {
      show();
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) void ask(q);
    };
    window.addEventListener("nf:assistant", onOpen);
    return () => window.removeEventListener("nf:assistant", onOpen);
  }, [ask, show]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? setOpen(false) : show())}
        aria-expanded={open}
        aria-controls="nf-assistant"
        className={`group fixed right-4 bottom-4 z-40 flex h-11 items-center gap-2.5 rounded-sm border border-white/15 bg-black pr-4 pl-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_-8px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-out) md:right-6 md:bottom-6 ${
          open ? "pointer-events-none translate-y-2 opacity-0" : ""
        } ${pastHero ? "" : "max-sm:invisible max-sm:translate-y-2 max-sm:opacity-0"} transition-[opacity,transform,visibility]`}
      >
        <Spark size={16} className="text-red-on-dark transition-transform duration-(--duration-slow) group-hover:rotate-45" />
        Ask NForce AI
      </button>

      <section
        id="nf-assistant"
        role="dialog"
        aria-modal="false"
        aria-labelledby="nf-assistant-title"
        hidden={!open}
        className="page-in fixed inset-x-3 bottom-3 z-50 flex h-[min(78svh,620px)] flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-900 text-white shadow-[0_24px_64px_-16px_rgb(0_0_0/0.6)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[392px]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="nf-assistant-title" className="flex items-center gap-2 text-[15px] font-semibold">
              <Spark size={15} className="text-red-on-dark" /> NForce AI Assistant
            </h2>
            <p className="mt-1 text-[12px] text-gray-500">Answers from approved NForce One information only</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close assistant"
            className="-mr-2 grid size-9 place-items-center rounded-sm text-gray-400 hover:text-white"
          >
            <Close size={18} />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
          <Bubble role="assistant">
            Hi, I can help you find your way around NForce One: our capabilities, Telecom expertise, products, case
            studies and how to reach the right team.
          </Bubble>
          {msgs.length === 0 && (
            <ul className="space-y-2 pt-1" aria-label="Suggested questions">
              {suggestedQuestions.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => void ask(q)}
                    className="w-full rounded-sm border border-white/10 px-3.5 py-2.5 text-left text-[13.5px] text-gray-400 transition-colors hover:border-white/30 hover:text-white"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {msgs.map((m, i) => (
            <Bubble key={i} role={m.role} links={m.links}>
              {m.text}
            </Bubble>
          ))}
          {busy && (
            <p className="flex items-center gap-1.5 text-[13px] text-gray-500" role="status">
              <span className="blink size-1.5 rounded-full bg-red-on-dark" /> Looking that up…
            </p>
          )}
        </div>

        <div className="border-t border-white/10 px-5 pt-3 pb-4">
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-3" aria-label="Talk to a person">
            {handoffs.map((h) => (
              <li key={h.href} className="shrink-0">
                <Link
                  href={`${h.href}${h.href.includes("?") ? "&" : "?"}source=assistant`}
                  onClick={() => {
                    track("assistant_handoff", { target: h.label });
                    setOpen(false);
                  }}
                  className="block rounded-xs bg-white/[0.06] px-2.5 py-1.5 text-[12.5px] text-gray-400 transition-colors hover:bg-white hover:text-black"
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(input);
            }}
            className="flex items-center gap-2 rounded-sm border border-white/15 bg-black pl-3.5 focus-within:border-white/40"
          >
            <label htmlFor="nf-assistant-input" className="sr-only">
              Ask a question
            </label>
            <input
              ref={inputRef}
              id="nf-assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask about capabilities, Telecom, products…"
              className="h-11 min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="grid size-11 shrink-0 place-items-center text-white disabled:text-gray-600"
            >
              <Send size={17} />
            </button>
          </form>
          <p className="mt-2.5 text-[11px] leading-snug text-gray-500">
            Please don&apos;t share confidential information. Conversations aren&apos;t stored.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
              Privacy
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Bubble({ role, children, links }: { role: Msg["role"]; children: React.ReactNode; links?: Msg["links"] }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-md rounded-br-xs bg-white px-3.5 py-2.5 text-[14px] text-black">{children}</p>
      </div>
    );
  }
  return (
    <div className="max-w-[92%]">
      <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-400">{children}</p>
      {links && links.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group inline-flex items-center gap-1.5 rounded-xs border border-white/15 px-2.5 py-1.5 text-[12.5px] text-white transition-colors hover:border-white"
              >
                {l.label} <span aria-hidden className="arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
