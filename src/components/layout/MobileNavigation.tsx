"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { pillars } from "@/content/capabilities";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ArrowRight, Close, Plus } from "@/components/ui/icons";
import { Logo } from "./Logo";

/** Full-screen mobile menu. Focus is trapped while open and Escape closes it. */
export function MobileNavigation({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [capsOpen, setCapsOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      id="mobile-nav"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="page-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-black lg:hidden"
    >
      <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 grid size-10 place-items-center text-white">
          <Close size={20} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-x flex-1 pt-6">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          <li>
            <button
              type="button"
              aria-expanded={capsOpen}
              aria-controls="m-caps"
              onClick={() => setCapsOpen((o) => !o)}
              className="flex w-full items-center justify-between py-5 text-left text-[22px] font-medium tracking-[-0.02em] text-white"
            >
              Capabilities
              <Plus size={18} className={`transition-transform duration-(--duration-base) ${capsOpen ? "rotate-45" : ""}`} />
            </button>
            <ul id="m-caps" hidden={!capsOpen} className="pb-5">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link href={`/capabilities/${p.slug}`} onClick={onClose} className="flex items-baseline gap-4 py-2.5 text-[15px] text-gray-400">
                    <span className="t-label text-gray-500">{p.index}</span>
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/capabilities" onClick={onClose} className="mt-1 flex items-center gap-2 py-2.5 pl-9 text-[14px] text-white">
                  All capabilities <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </li>
          {nav.primary.filter((i) => !("mega" in i)).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-center justify-between py-5 text-[22px] font-medium tracking-[-0.02em] text-white"
              >
                {item.label}
                {isActive(item.href) && <span aria-hidden className="size-1.5 rounded-full bg-red" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x shrink-0 space-y-4 pb-8 pt-10">
        <Button href="/contact?intent=expert" tone="dark" size="lg" className="w-full" track="mobile_nav_talk_to_expert">
          Talk to an Expert
        </Button>
        <div className="flex justify-center t-small">
          <CopyEmail email={site.email} tone="dark" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
