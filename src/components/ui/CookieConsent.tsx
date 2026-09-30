"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "nf1-cookie-consent";
const GA = process.env.NEXT_PUBLIC_GA_ID;

function grantConsent() {
  if (typeof window === "undefined") return;
  if ("gtag" in window) {
    // @ts-expect-error gtag global injected by layout
    window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied" });
  }
  // Load the GA script on first acceptance (not loaded by default to avoid pre-consent requests)
  if (GA && !document.getElementById("ga-script")) {
    const s = document.createElement("script");
    s.id = "ga-script";
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
    s.async = true;
    document.head.appendChild(s);
    // @ts-expect-error gtag global injected by layout
    if ("gtag" in window) window.gtag("js", new Date());
    // @ts-expect-error gtag global injected by layout
    if ("gtag" in window) window.gtag("config", GA, { send_page_view: false });
  }
}

/**
 * Cookie consent banner (GDPR/CCPA). The GA script is loaded only after the
 * user accepts, and consent is restored on every return visit automatically.
 * In development the banner always shows so the UI can be reviewed.
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
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted") {
        // Returning visitor who already accepted — restore consent and load GA without showing the banner
        grantConsent();
        return;
      }
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  // Allow the footer "Cookie preferences" link to reopen the banner at any time
  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("show-cookie-consent", show);
    return () => window.removeEventListener("show-cookie-consent", show);
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch { /* ignore */ }
    setVisible(false);
    grantConsent();
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

/** Renders a "Cookie preferences" button for the footer. Clears stored choice and reopens the banner. */
export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
        window.dispatchEvent(new Event("show-cookie-consent"));
      }}
    >
      Cookie preferences
    </button>
  );
}
