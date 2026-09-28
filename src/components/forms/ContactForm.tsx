"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { intents, interests } from "@/content/contact";
import type { Intent } from "@/content/types";
import { track } from "@/lib/analytics";

type Errors = Partial<Record<"name" | "company" | "email" | "interest" | "message" | "consent" | "form", string>>;

const field =
  "mt-2 block w-full rounded-sm border bg-white px-3.5 text-[15px] text-black transition-colors placeholder:text-gray-400 focus:border-black focus:outline-none aria-[invalid=true]:border-red";

/**
 * Low-friction lead form (LEAD-003). The intent is preselected from ?intent= (every CTA and
 * the assistant hand off here), so routing and consent are the same everywhere (LEAD-006).
 */
export function ContactForm() {
  const params = useSearchParams();
  const initial = (intents.find((i) => i.id === params.get("intent"))?.id ?? "expert") as Intent;
  const role = params.get("role");
  const [intent, setIntent] = useState<Intent>(initial);
  const [interest, setInterest] = useState<string>(intents.find((i) => i.id === initial)?.interest ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onStart = () => {
    if (startedAt.current) return;
    startedAt.current = Date.now();
    track("form_start", { form: "contact", intent });
  };

  const chooseIntent = (id: Intent) => {
    setIntent(id);
    const i = intents.find((x) => x.id === id);
    if (i?.interest) setInterest(i.interest);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      ...Object.fromEntries(fd.entries()),
      interest,
      intent,
      consent: fd.get("consent") === "on",
      startedAt: startedAt.current ?? Date.now() - 10_000,
      source: params.get("source") ?? "contact-form",
    };
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok?: boolean; errors?: Errors; error?: string };
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        setState("idle");
        const first = data.errors && Object.keys(data.errors)[0];
        if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      track("form_submit", { form: "contact", intent, interest });
      if (intent === "demo") track("demo_request", { interest });
      setState("sent");
    } catch {
      setErrors({ form: "We couldn't reach the server. Please try again or email contact@nforceone.com." });
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="page-in rounded-md border border-line bg-paper-50 p-8 md:p-12">
        <span aria-hidden className="grid size-10 place-items-center rounded-sm bg-black text-white">✓</span>
        <h2 className="t-h3 mt-8">Thank you. Your message is with our team.</h2>
        <p className="mt-4 t-body text-gray-600">
          The right NForce One team will get back to you at the email address you provided.
        </p>
        <Link href="/case-studies" className="mt-8 inline-block t-small font-medium underline underline-offset-4">
          Browse case studies while you wait
        </Link>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-[13px] text-red">
        {errors[k]}
      </p>
    ) : null;
  const a = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const careers = intent === "careers";

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} noValidate className="space-y-8">
      <fieldset>
        <legend className="t-label text-gray-600">I would like to</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {intents.map((i) => (
            <label key={i.id} className="cursor-pointer">
              <input
                type="radio"
                name="intent-choice"
                value={i.id}
                checked={intent === i.id}
                onChange={() => chooseIntent(i.id)}
                className="peer sr-only"
              />
              <span className="flex h-10 items-center rounded-sm border border-line px-4 text-[14px] text-gray-700 transition-colors peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red hover:border-black/40">
                {i.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="t-small font-medium">
            Name
          </label>
          <input id="name" name="name" autoComplete="name" required className={`${field} h-12 border-line`} {...a("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="company" className="t-small font-medium">
            Company {careers && <span className="font-normal text-gray-500">(optional)</span>}
          </label>
          <input id="company" name="company" autoComplete="organization" required={!careers} className={`${field} h-12 border-line`} {...a("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="email" className="t-small font-medium">
            {careers ? "Email" : "Business email"}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={`${field} h-12 border-line`} {...a("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="t-small font-medium">
            Phone <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={`${field} h-12 border-line`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="interest" className="t-small font-medium">
            Area of interest
          </label>
          <select
            id="interest"
            name="interest"
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={`${field} h-12 appearance-none border-line bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23000' stroke-width='1.5'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-10`}
            {...a("interest")}
          >
            <option value="" disabled>
              Select an area
            </option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          {err("interest")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="t-small font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={role ? `I'm interested in the ${role} role.` : undefined}
            placeholder={careers ? "Tell us about yourself and the role you're interested in" : "What are you building, testing or modernising?"}
            className={`${field} border-line py-3`}
            {...a("message")}
          />
          {err("message")}
        </div>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 t-small text-gray-600">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-black" {...a("consent")} />
          <span>
            NForce One may contact me about this enquiry. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy notice
            </Link>
            .
          </span>
        </label>
        {err("consent")}
      </div>

      {errors.form && (
        <p role="alert" className="rounded-sm border border-red/30 bg-red/5 p-4 t-small text-red">
          {errors.form}
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === "sending"} className="w-full sm:w-auto">
        {state === "sending" ? "Sending…" : (() => {
          const i = intents.find((x) => x.id === intent);
          return i?.submit ?? i?.label ?? "Send";
        })()}
      </Button>
    </form>
  );
}
