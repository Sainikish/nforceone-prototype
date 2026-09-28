# NForce One website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Geist. No animation library: motion is CSS/SVG.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local`. Key switch:

- `NEXT_PUBLIC_CONTENT_MODE=review` (default): unapproved content renders with **Pending approval** markers.
- `NEXT_PUBLIC_CONTENT_MODE=production`: anything not `approved` is removed from pages and the sitemap.

## Where things live

| Path | What |
|---|---|
| `docs/ARCHITECTURE.md` | Sitemap, content audit, redirect matrix, design system, open items |
| `src/content/*` | All copy and data (the CMS-ready content models). Flip `status` to `approved` to publish |
| `src/components/` | layout · ui · diagrams · sections · cards · forms · assistant |
| `src/app/api/contact` | Lead intake → `LEAD_WEBHOOK_URL` |
| `src/app/api/assistant` | Grounded assistant: answers only from `src/content/assistant-kb.ts` |
| `next.config.ts` | 301 redirects from legacy WordPress URLs |

To publish a case study, product, testimonial or role, fill in its fields in `src/content/` and set `status: "approved"`,
but only once the approval required by PRD §18.1 has been recorded.
