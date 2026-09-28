/** Subtle page transition: fade + 6px rise, re-keyed on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
