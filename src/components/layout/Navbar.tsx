"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Menu } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape + outside click close the mega menu
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        headerRef.current?.querySelector<HTMLButtonElement>("[data-mega-trigger]")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [megaOpen]);

  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen((o) => {
      if (!o) hoverOpenedAt.current = Date.now();
      return true;
    });
  };
  // A click right after hover-open must not close the menu the pointer just opened
  const clickToggle = () => setMegaOpen((o) => (o && Date.now() - hoverOpenedAt.current < 500 ? true : !o));
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || megaOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-(--duration-slow) ease-(--ease-out) ${
        solid ? "border-b border-white/10 bg-black" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-sm focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <div
        className={`container-x flex items-center justify-between transition-[height] duration-(--duration-slow) ease-(--ease-out) ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.primary.map((item) =>
              "mega" in item ? (
                <li key={item.href} onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    data-mega-trigger
                    aria-expanded={megaOpen}
                    aria-controls="mega-capabilities"
                    onClick={clickToggle}
                    className={`relative flex h-9 items-center gap-1 rounded-sm px-3 text-[14px] transition-colors ${
                      megaOpen || isActive(item.href) ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-(--duration-base) ${megaOpen ? "rotate-180" : ""}`}
                    />
                    {isActive(item.href) && <ActiveDot />}
                  </button>
                  {/* In DOM order right after its trigger, so Tab moves straight into the menu */}
                  <MegaMenu id="mega-capabilities" open={megaOpen} onNavigate={() => setMegaOpen(false)} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative flex h-9 items-center rounded-sm px-3 text-[14px] transition-colors ${
                      isActive(item.href) ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && <ActiveDot />}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {nav.utility.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`hidden h-9 items-center rounded-sm px-3 text-[14px] transition-colors xl:flex ${
                isActive(item.href) ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact?intent=expert" tone="dark" track="nav_talk_to_expert" className="ml-2 h-9! max-sm:hidden!">
            Talk to an Expert
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="-mr-2 ml-1 grid size-10 place-items-center rounded-sm text-white lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </header>
  );
}

function ActiveDot() {
  return <span aria-hidden className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-red" />;
}
