import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/content/capabilities";
import { site } from "@/content/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CookiePreferencesLink } from "@/components/ui/CookieConsent";
import { ArrowUpRight } from "@/components/ui/icons";
import { Phone } from "@/components/ui/Phone";

const company = [
  { label: "Industries", href: "/industries" },
  { label: "Telecom", href: "/industries/telecom" },
  { label: "Innovation & Products", href: "/innovation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="container-x">
        <div className="border-t border-white/10 pt-14 pb-14 md:pt-16 md:pb-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Image src="/brand/nforceone-logo.webp" alt="NForce One: Let's Do IT!" width={640} height={365} className="h-auto w-[132px]" />
              <p className="mt-6 max-w-[18rem] t-small text-gray-400">
                AI. Quality Engineering. Digital Transformation. Built to Scale at Speed.
              </p>
            </div>

            <nav aria-label="Site links" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
              <div>
                <p className="t-label text-gray-500">Capabilities</p>
                <ul className="mt-5 space-y-3">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/capabilities/${p.slug}`} className="t-small text-gray-400 transition-colors hover:text-white">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label text-gray-500">Company</p>
                <ul className="mt-5 space-y-3">
                  {company.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="t-small text-gray-400 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="t-label text-gray-500">Contact</p>
                <ul className="mt-5 space-y-3 t-small">
                  <li>
                    <CopyEmail email={site.email} tone="dark" />
                  </li>
                </ul>
                <ul className="mt-8 space-y-4">
                  {site.offices.map((o) => (
                    <li key={o.city}>
                      <p className="t-small text-white">{o.city}</p>
                      <p className="mt-0.5 t-small text-gray-500">{o.label}</p>
                      <span className="mt-1 block t-small text-gray-400">
                        <Phone display={o.phone.display} href={o.phone.href} className="hover:text-white" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 t-small text-gray-400 hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight className="arrow-diag" size={12} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 t-small text-gray-500">
              <span>© {new Date().getFullYear()} {site.legalName}</span>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <CookiePreferencesLink className="hover:text-white" />
            </div>
          </div>
        </div>
      </div>
      {/* Speed-line motif taken from the logo: a single red hairline */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-red to-transparent opacity-60" />
    </footer>
  );
}
