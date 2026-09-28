import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page has moved or no longer exists."
      lead="Our site has been reorganised around four capability pillars. Most older service pages now live under Capabilities."
      actions={
        <>
          <Button href="/capabilities" tone="dark" size="lg">Explore Capabilities</Button>
          <Button href="/" tone="dark" variant="secondary" size="lg" arrow={false}>Back to home</Button>
        </>
      }
    />
  );
}
