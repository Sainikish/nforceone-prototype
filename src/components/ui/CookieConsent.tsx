"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "nf1-cookie-consent";

/**
 * Cookie consent banner (GDPR/CCPA). Defers GA initialisation until the user
 * accepts. Renders only on the client, after hydration, to avoid SSR mismatch.
 * Consent is stored in localStorage so the banner stays dismissed across visits.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // In development, always show so the banner can be reviewed without clearing storage
    if (process.env.NODE_ENV === "development") {
      setVisible(true);
      return;
    }
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch { /* ignore */ }
    setVisible(false);
    // Unblock GA: fire the consent update if gtag is already loaded
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-expect-error gtag global injected by layout
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
      });
    }
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-[72px] left-4 right-4 z-[80] md:bottom-6 md:left-6 md:right-auto md:max-w-[420px]"
    >
      <div className="rounded-md border border-white/10 bg-ink-800 p-5 shadow-2xl">
        <p className="t-small text-gray-400">
          We use cookies to understand how visitors use our site (Google Analytics). No personal data is sold.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
            Privacy notice
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button tone="dark" onClick={accept} arrow={false}>
            Accept
          </Button>
          <Button tone="dark" variant="secondary" onClick={decline} arrow={false}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
