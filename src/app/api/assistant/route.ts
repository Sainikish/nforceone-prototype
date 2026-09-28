import { NextResponse } from "next/server";
import { answer } from "@/lib/assistant";

/**
 * Website assistant endpoint. Answers come only from the approved knowledge base.
 * No conversation content is stored (CHAT-011).
 */
export async function POST(req: Request) {
  let question = "";
  try {
    const body = (await req.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!question || question.length > 500) {
    return NextResponse.json({ error: "Please ask a question under 500 characters." }, { status: 400 });
  }
  return NextResponse.json(answer(question));
}
