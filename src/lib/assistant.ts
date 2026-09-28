import { fallback, kb, type KbEntry } from "@/content/assistant-kb";

export type AssistantReply = {
  answer: string;
  links: { label: string; href: string }[];
  handoff: boolean;
  topic: string | null;
};

const STOP = new Set(
  "a an the is are am i me my we our you your us to of for in on at with and or can could would should how tell show about please want like know give any some this that it its be do does did what one help need".split(
    " ",
  ),
);
// Words that carry intent even though they're common
const KEEP = new Set(["us"]);

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+/ ]+/g, " ")
    .split(/[\s/]+/)
    .filter((t) => t && (!STOP.has(t) || KEEP.has(t)));

const index = kb.map((e) => ({ e, keys: new Set(e.keywords.map((k) => k.toLowerCase())) }));

/**
 * Deterministic retrieval over the approved knowledge base (CHAT-003). An empty or weak
 * match returns the fallback with a human handoff (CHAT-007). It never generates free text.
 */
export function answer(question: string): AssistantReply {
  const tokens = tokenize(question.slice(0, 500));
  let best: KbEntry | null = null;
  let bestScore = 0;
  for (const { e, keys } of index) {
    let score = 0;
    for (const t of tokens) {
      if (keys.has(t)) score += 1;
      else if (t.length > 4 && keys.has(t.replace(/s$/, ""))) score += 0.75;
    }
    if (score > bestScore) {
      best = e;
      bestScore = score;
    }
  }
  if (!best || bestScore < 1) return { ...fallback, handoff: true, topic: null };
  return { answer: best.answer, links: best.links, handoff: !!best.handoff, topic: best.id };
}
