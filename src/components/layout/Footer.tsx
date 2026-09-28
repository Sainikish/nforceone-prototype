import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/content/capabilities";
import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

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
      <div className="container-x pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src="/brand/nforceone-logo.webp" alt="NForce One: Let's Do IT!" width={640} height={365} className="h-auto w-[168px]" />
            <p className="mt-10 text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              AI.
              <br />
              Quality Engineering.
              <br />
              <span className="text-gray-500">Digital Transformation.</span>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="t-label text-gray-500">Capabilities</h2>
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
              <h2 className="t-label text-gray-500">Company</h2>
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
              <h2 className="t-label text-gray-500">Contact</h2>
              <ul className="mt-5 space-y-3 t-small">
                <li>
                  <a href={`mailto:${site.email}`} className="text-white hover:text-gray-400">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phone.href} className="text-gray-400 hover:text-white">
                    {site.phone.display}
                  </a>
                </li>
              </ul>
              <ul className="mt-8 space-y-6">
                {site.offices.map((o) => (
                  <li key={o.city}>
                    <p className="t-small text-white">{o.city}</p>
                    <address className="mt-1 t-small not-italic text-gray-500">
                      {o.lines.slice(0, 2).map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
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
          </div>
        </div>
      </div>
      {/* Speed-line motif taken from the logo: a single red hairline */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-red to-transparent opacity-60" />
    </footer>
  );
}
