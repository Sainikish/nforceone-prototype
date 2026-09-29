"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { intents, interests } from "@/content/contact";
import { site } from "@/content/site";
import type { Intent } from "@/content/types";
import { track } from "@/lib/analytics";
import { RESUME_ACCEPT, checkResume } from "@/lib/resume";

type Errors = Partial<Record<"name" | "company" | "email" | "interest" | "message" | "consent" | "resume" | "form", string>>;

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
  const [resume, setResume] = useState<File | null>(null);
  const resumeInput = useRef<HTMLInputElement>(null);
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
    const isCareers = intent === "careers";
    if (isCareers) {
      // Keep a specific reason (too large / wrong type) rather than replacing it with a generic one
      const problem = resume ? checkResume(resume) : errors.resume ?? (role ? "Please attach your resume." : null);
      if (problem) {
        setErrors({ resume: problem });
        resumeInput.current?.focus();
        return;
      }
    }
    if (fd.get("consent") !== "on") {
      setErrors({ consent: "Please tick the box to confirm NForce One may contact you." });
      formRef.current?.querySelector<HTMLElement>('[name="consent"]')?.focus();
      return;
    }
    const body = {
      ...Object.fromEntries(fd.entries()),
      interest,
      intent,
      consent: fd.get("consent") === "on",
      startedAt: startedAt.current ?? Date.now() - 10_000,
      source: params.get("source") ?? "contact-form",
      role: intent === "careers" ? (role ?? "") : "",
    };
    setState("sending");
    setErrors({});
    try {
      let res: Response;
      if (isCareers) {
        // Multipart so the resume file travels with the application
        const mp = new FormData();
        for (const [k, v] of Object.entries(body)) if (k !== "resume") mp.append(k, String(v));
        if (resume) mp.append("resume", resume, resume.name);
        res = await fetch("/api/contact", { method: "POST", body: mp });
      } else {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
      }
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
        <h2 className="t-h3 mt-8">
          {intent === "careers" ? "Thank you. Your application is with our hiring team." : "Thank you. Your message is with our team."}
        </h2>
        <p className="mt-4 t-body text-gray-600">
          {intent === "careers"
            ? "We'll review your details and get back to you at the email address you provided."
            : "The right NForce One team will get back to you at the email address you provided."}
        </p>
        <Link
          href={intent === "careers" ? "/careers" : "/case-studies"}
          className="mt-8 inline-block t-small font-medium underline underline-offset-4"
        >
          {intent === "careers" ? "Back to open positions" : "Browse case studies while you wait"}
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
      <fieldset hidden={careers && !!role}>
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

      {careers && role && (
        <p className="rounded-sm bg-paper-50 px-4 py-3 t-small">
          <span className="text-gray-600">Applying for</span> <span className="font-semibold">{role}</span>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="t-small font-medium">
            Name <span aria-hidden className="text-red">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required className={`${field} h-12 border-line`} {...a("name")} />
          {err("name")}
        </div>
        {careers ? (
          <div>
            <label htmlFor="profileUrl" className="t-small font-medium">
              LinkedIn or portfolio <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input id="profileUrl" name="profileUrl" type="url" inputMode="url" placeholder="https://" className={`${field} h-12 border-line`} />
          </div>
        ) : (
          <div>
            <label htmlFor="company" className="t-small font-medium">
              Company <span aria-hidden className="text-red">*</span>
            </label>
            <input id="company" name="company" autoComplete="organization" required className={`${field} h-12 border-line`} {...a("company")} />
            {err("company")}
          </div>
        )}
        <div>
          <label htmlFor="email" className="t-small font-medium">
            {careers ? "Email" : "Business email"} <span aria-hidden className="text-red">*</span>
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
        <div className={`sm:col-span-2 ${careers ? "hidden" : ""}`}>
          <label htmlFor="interest" className="t-small font-medium">
            Area of interest <span aria-hidden className="text-red">*</span>
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
            {careers ? "About you" : "Message"} <span aria-hidden className="text-red">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={role ? `I'm interested in the ${role} role.` : undefined}
            placeholder={careers ? "Tell us about yourself and the role you're interested in" : "What are you building, testing or modernizing?"}
            className={`${field} border-line py-3`}
            {...a("message")}
          />
          <p className="mt-1.5 t-small text-gray-500">
            {careers ? "What you've worked on, what you enjoy, and what you're looking for." : "Share as much as you can — it helps us route to the right specialist."}
          </p>
          {err("message")}
        </div>

        {careers && (
          <div className="sm:col-span-2">
            <span id="resume-label" className="t-small font-medium">
              Resume {!role && <span className="font-normal text-gray-500">(optional)</span>}
            </span>
            <input
              ref={resumeInput}
              id="resume"
              name="resume"
              type="file"
              accept={RESUME_ACCEPT}
              aria-labelledby="resume-label"
              aria-describedby={errors.resume ? "resume-err resume-help" : "resume-help"}
              aria-invalid={!!errors.resume}
              className="peer sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                const problem = f ? checkResume(f) : null;
                setErrors((x) => ({ ...x, resume: problem ?? undefined }));
                setResume(problem ? null : f);
                if (problem) e.target.value = "";
              }}
            />
            {resume ? (
              <div className="mt-2 flex items-center justify-between gap-4 rounded-sm border border-black bg-paper-50 px-4 py-3.5">
                <span className="flex min-w-0 items-center gap-3">
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xs bg-black text-[10px] font-semibold uppercase text-white">
                    {resume.name.split(".").pop()}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium">{resume.name}</span>
                    <span className="block t-small text-gray-600">{resume.size < 1024 * 1024 ? `${Math.max(1, Math.round(resume.size / 1024))} KB` : `${(resume.size / 1024 / 1024).toFixed(1)} MB`}</span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setResume(null);
                    if (resumeInput.current) resumeInput.current.value = "";
                    resumeInput.current?.focus();
                  }}
                  className="shrink-0 t-small font-medium underline underline-offset-4"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="resume"
                className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-dashed px-4 py-7 text-center transition-colors hover:border-black hover:bg-paper-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red ${
                  errors.resume ? "border-red" : "border-black/25"
                }`}
              >
                <span className="text-[15px] font-medium">Choose a file to upload</span>
                <span className="t-small text-gray-600">PDF or Word, up to 4 MB</span>
              </label>
            )}
            {err("resume")}
            <p id="resume-help" className="mt-3 t-small text-gray-600">
              Can&apos;t upload? Email your resume to <CopyEmail email={site.careersEmail} />
            </p>
          </div>
        )}
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

      <Button type="submit" size="lg" arrow={false} disabled={state === "sending"} className="w-full sm:w-auto">
        {state === "sending" ? (
          <>
            <span aria-hidden className="inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-current border-t-transparent" />
            Sending…
          </>
        ) : (
          (() => {
            const i = intents.find((x) => x.id === intent);
            return i?.submit ?? i?.label ?? "Send";
          })()
        )}
      </Button>
    </form>
  );
}
