import Image from "next/image";
import Link from "next/link";

/** Official NF1 mark (unaltered, per PRD §4.2) paired with the typeset company name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="NForce One, home" className={`group flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/nf1-mark-480.webp"
        alt=""
        width={480}
        height={205}
        priority
        className="h-[26px] w-auto md:h-[32px]"
      />
      <span aria-hidden className="h-5 w-px bg-white/20 md:h-6" />
      <span className="text-[16px] font-semibold tracking-[-0.02em] text-white md:text-[18px]">NForce One</span>
    </Link>
  );
}
