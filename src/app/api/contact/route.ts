import { NextResponse } from "next/server";
import { intents, interests } from "@/content/contact";

const INTERESTS: readonly string[] = interests;
const INTENTS: string[] = [...intents.map((i) => i.id), "general"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Personal mailboxes are rejected for "Business Email" (LEAD-003)
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|aol|icloud|proton|protonmail)\./i;

type Lead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  intent: string;
  consent: boolean;
  source: string;
};

/**
 * Lead intake (LEAD-003/004/006). It validates the lead, screens bots with a honeypot and a
 * minimum fill time, and forwards to LEAD_WEBHOOK_URL (CRM / mail automation) when configured.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bot screening: filled honeypot or a sub-3-second submission → silently accept, drop
  const startedAt = Number(body.startedAt);
  if (body.website || (Number.isFinite(startedAt) && Date.now() - startedAt < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const s = (k: string, max = 200) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const lead: Lead = {
    name: s("name"),
    company: s("company"),
    email: s("email"),
    phone: s("phone", 40),
    interest: s("interest"),
    message: s("message", 4000),
    intent: INTENTS.includes(s("intent")) ? s("intent") : "general",
    consent: body.consent === true,
    source: s("source") || "contact-form",
  };

  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = "Please enter your name.";
  if (!lead.company && lead.intent !== "careers") errors.company = "Please enter your company.";
  if (!EMAIL.test(lead.email)) errors.email = "Please enter a valid email address.";
  else if (lead.intent !== "careers" && FREE_MAIL.test(lead.email)) errors.email = "Please use your business email address.";
  if (!INTERESTS.includes(lead.interest)) errors.interest = "Please choose an area of interest.";
  if (lead.message.length < 10) errors.message = "Please tell us a little more (10+ characters).";
  if (!lead.consent) errors.consent = "Please confirm we may contact you.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    }).catch(() => null);
    if (!res?.ok) {
      return NextResponse.json({ error: "We couldn't send your message. Please email contact@nforceone.com." }, { status: 502 });
    }
  } else {
    console.info("[lead] LEAD_WEBHOOK_URL not configured; lead not forwarded", { intent: lead.intent, interest: lead.interest });
  }
  return NextResponse.json({ ok: true });
}
