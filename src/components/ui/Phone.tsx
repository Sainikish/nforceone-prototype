/**
 * Phone number: tap-to-call on phones, where that is expected; plain selectable text on desktop,
 * where a tel: link opens an operating-system "choose an app" dialog instead.
 */
export function Phone({ display, href, className = "" }: { display: string; href: string; className?: string }) {
  return (
    <>
      <a href={href} className={`lg:hidden ${className}`}>
        {display}
      </a>
      <span className={`hidden select-all lg:inline ${className}`}>{display}</span>
    </>
  );
}
