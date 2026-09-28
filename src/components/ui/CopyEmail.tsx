"use client";

import { useState } from "react";

/**
 * Shows an email address with a Copy button. Used where a mailto: link would launch a desktop mail
 * app (often unconfigured) in the middle of a key action such as applying for a role.
 */
export function CopyEmail({ email, className = "", tone = "light" }: { email: string; className?: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is still visible and selectable
    }
  };
  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`font-medium select-all ${tone === "dark" ? "text-white" : "text-black"}`}>{email}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
        className={`rounded-xs border px-2 py-0.5 text-[12px] font-medium transition-colors ${
          tone === "dark" ? "border-white/20 text-gray-400 hover:border-white hover:text-white" : "border-black/15 text-gray-700 hover:border-black hover:text-black"
        }`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
