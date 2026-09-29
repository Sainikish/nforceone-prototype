import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page has moved or no longer exists. Explore NForce One capabilities or return to the homepage.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page has moved or no longer exists"
      lead="Our site has been reorganized around four capability pillars. Most older service pages now live under Capabilities."
      actions={
        <>
          <Button href="/capabilities" tone="dark" size="lg">Explore Capabilities</Button>
          <Button href="/" tone="dark" variant="secondary" size="lg" arrow={false}>Back to home</Button>
        </>
      }
    />
  );
}
