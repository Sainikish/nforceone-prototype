# NForce One Website — Design & Build Architecture

Source of truth: *NForce One Website Enhancement PRD v1.3* and the crawl of nforceone.com
(`_source/nforceone-inventory`, 48 pages, 2026-07-23). This document covers PRD deliverables
DEL-001 (sitemap), DEL-003 (brand palette + component system), DEL-004 (motion spec) and
DEL-008 (content migration / redirect matrix). It also records every content decision made
while building, so reviewers can see what came from where.

---

## 1. Audit summary

**Existing project:** no codebase. The current site is WordPress. Everything here is new.
Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Geist**. Framer Motion
is not used. Every animation in the brief works with CSS, SVG and one small
IntersectionObserver, so we skip the ~50 KB library (PERF-003).

**Live-site content problems (PRD §18). Every one is fixed here, not migrated:**

| Problem | Where | Resolution |
|---|---|---|
| Placeholder brand "Tecnologia" | Services, Industries, Careers | Removed |
| Copy that doesn't match the page (AI tile describes security, Pega describes web dev, DevOps intro is payment-testing text, NFT/CRM placeholders) | Services, Home "Solutions" | Rewritten from PRD §8 capability lists |
| Wrong section headings ("POS Systems" on IoT/Regression, "Mobile App Testing Tools" on AI Testing) | Service pages | Gone (pages consolidated into pillars) |
| Content unrelated to Telecom, plus a generic "IT services for manufacturers" band | Telecom + all industry pages | Telecom rebuilt from PRD §9 (TEL-001/002) |
| Unsupported stats: "0 Critical Defects", "100% Coverage", "24/7", "8+ services", "65%+ CSAT", "over 10 years", "100+ professionals" | Home, Telecom, Industries, About | Removed (CONT-003). The only experience claim is "20+ Years of Technology & Quality Engineering Leadership", used as leadership positioning (BR-004) |
| Broken email `admin@3.151.21.218` | Contact | Replaced with `contact@nforceone.com` (the PRD footer address). **Confirm the lead-routing mailbox (LEAD-004)** |
| Industries index links to pages that don't exist (Healthcare, Travel, Media & Publishing, Retail Tech, Public Sector) | Industries | Only Telecom gets a deep page. Other sectors are listed pending proof-of-experience approval |
| Empty meta descriptions site-wide | All | Unique title/description per page |
| Misspelling "Compatability" | Compatibility Testing | Page consolidated |
| Generic "Reviews" block / partner logos with no approval record | Home | Removed (TEST-001). The testimonial slot is marked pending |

---

## 2. Content governance model

Every content record in `src/content/*` has a `status`:

```
approved | pending   (pending = needs business / client / employee approval)
```

`NEXT_PUBLIC_CONTENT_MODE` controls what gets rendered:

- `review` (the default): pending items render with a visible **Pending approval** marker.
  Stakeholders use this mode to review the build.
- `production`: pending items and pending sections are **not rendered at all**. This
  enforces PRD 2.1 ("No placeholder… content") and 18.1 governance mechanically.

Photography slots (`<PhotoSlot>`) work the same way. They describe the shot we need
(PHOTO-002 shot list) until real, consented photography is supplied.

### What is approved vs pending right now

| Content | Status | Source |
|---|---|---|
| Positioning line, 10-second goal, four pillars and their capability lists | Approved | PRD §1, §5, §8 |
| Telecom capability areas & stories | Approved | PRD §9 |
| Engagement models + descriptions | Approved | PRD §14 |
| Innovation focus areas | Approved | PRD §13 |
| Offices: Plano TX (Associate Brand Office), Hyderabad | Approved (validate) | Live contact page |
| "20+ Years… Leadership" | Approved as positioning | PRD BR-004 |
| Supporting descriptive copy for pillars/pages | Draft, needs business sign-off (CONT-005) | Written from PRD language |
| Case studies: E2E QA for US telecom provider (2025), AI-driven outreach (2024), AI travel planner (2024) | **Pending**: names anonymised, challenge/outcome not supplied | Live About page |
| Product inventory (QForce AI, AIKTRA, OneHR, NForce Arena, Pulse, Sync, Tracktion, FlightOps, AuraFace, Modozo, Ask Navi, NForce RetailOps) | **Pending**: names only, no descriptions invented | PRD §10.2 |
| Client testimonials | **Samples only** (3): illustrative, no names, marked "Sample", removed in production | TEST-002 |
| Employee testimonials / photos | **Samples only** (2): no names or photos | EMP-TEST-003 |
| Photography | **Stock stand-ins** (12, Unsplash License, credits in `src/content/media.ts`), tagged "Stock", removed in production. Leadership portraits intentionally left as briefs | PRD §12 |
| Open roles (5 titles) | **Pending**: confirm still open | Live Careers page |
| Leadership names/photos | **None supplied** | ABOUT-002 |
| Privacy / Terms copy | **None supplied**: legal to provide | — |

---

## 3. Sitemap (DEL-001)

```
/                                         Home
/capabilities                             Capabilities overview
  /capabilities/ai-agentic-solutions
  /capabilities/quality-engineering-ai-assurance
  /capabilities/digital-engineering
  /capabilities/data-cloud-enterprise-platforms
/industries                               Industries overview (Telecom featured)
  /industries/telecom                     Telecom deep page (URL preserved)
/innovation                               Innovation & Products
  /innovation/[product]                   Product case-study template (Appendix B)
/case-studies                             Library with filters
  /case-studies/[slug]                    Client case-study template (Appendix A)
/about                                    Company · Leadership · Delivery · Culture
/careers                                  Employer brand + open roles
/contact                                  Conversion (intent-aware form)
/privacy  /terms                          Legal (pending copy)
/api/contact                              Lead intake (POST)
/api/assistant                            Grounded assistant (POST)
```

Primary nav: **Capabilities ▾ · Industries · Innovation & Products · Case Studies · About**.
Utility nav: **Careers · Contact · [Talk to an Expert]**.

### Redirect matrix (SEO-001), implemented in `next.config.ts`

| Old URL | New URL |
|---|---|
| `/services` | `/capabilities` |
| `/services/{quality-assurance, manual-testing, automation-testing, consulting-testing, outsourcing-testing, ux-testing, performance-testing, functional-testing, regression-testing, integration-testing, compatibility-testing, pos-testing, payment-testing, iot-testing, mobile-app-testing, mobile-and-device-testing, web-app-testing, cloud-testing, pega-testing, ai-testing}` | `/capabilities/quality-engineering-ai-assurance` |
| `/services/{artificial-intelligence, intelligent-rpa}` | `/capabilities/ai-agentic-solutions` |
| `/services/{software-development, digital-app-development, management-services}` | `/capabilities/digital-engineering` |
| `/services/{pega-development, devops, database-management, data-analytics, big-data}` | `/capabilities/data-cloud-enterprise-platforms` |
| `/industries/{automotive, banking-and-financial, digital-media-and-advertising, education-and-edutech, energy-and-utilities, finance-and-fintech, insurance, isv, manufacturing, retail}` | `/industries` |
| `/industries/telecom` | preserved |
| `/faq` | `/contact` (the FAQ answers were never exposed. Rebuild as a real FAQ once answers are approved) |
| `/about`, `/careers`, `/contact` | preserved |

---

## 4. Design system (DEL-003)

### Principles
The UI is monochrome. **Black is the anchor**, white and light-gray surfaces carry reading
(DES-003: not an all-black site), and **NForce red is a signal, never a fill**. Colour comes
from photography.

### Colour tokens (`src/app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--black` | `#000000` | Hero, nav, footer, anchor sections |
| `--ink-900` | `#080808` | Dark section surface |
| `--ink-800` | `#111111` | Dark raised surface |
| `--ink-700` | `#1A1A1A` | Dark borders / hover |
| `--white` | `#FFFFFF` | Page |
| `--paper-50` | `#FAFAFA` | Alt light section |
| `--paper-100` | `#F5F5F5` | Light raised / placeholders |
| `--line` | `#E5E5E5` | Light borders |
| `--gray-600` | `#666666` | Body secondary on light (5.7:1) |
| `--gray-500` | `#888888` | Secondary on dark (5.9:1 on black) |
| `--red` | `#D40A0A` | Brand signal, sampled from the logo "IT!" (#D80305) |
| `--red-deep` | `#7C0000` | Logo gradient midpoint: rare gradient end |
| `--red-on-dark` | `#FF4436` | Small red text on black (AA) |

Red is limited to: active nav indicator, the moving "signal" in diagrams, focus accents,
index numerals on hover, one hairline gradient under the hero, and pending markers.

### Type: Geist Sans (+ Geist Mono for indices/labels only)
One family with two cuts. Mono is used only for technical micro-labels (`01`, `INPUT →`),
never for body text.

| Role | Desktop | Mobile | Weight / tracking |
|---|---|---|---|
| Display (hero) | clamp → 88px | 44px | 600 / -0.045em / 0.95 |
| H1 | 64px | 40px | 600 / -0.04em |
| H2 | 48px | 32px | 600 / -0.035em |
| H3 | 28px | 22px | 550 / -0.02em |
| Lead | 20px | 18px | 400 / -0.01em / 1.5 |
| Body | 16–17px | 16px | 400 / 1.6 |
| Small / label | 13–14px | 13px | 500 / 0 |

### Spacing, radius, motion
- Spacing scale: 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 120 · 160 (Tailwind `--spacing` = 4px base).
- Section rhythm: `py-24 md:py-32` standard, `py-16` for strips.
- Grid: 12 columns, `max-w-[1360px]`, 24px mobile / 40px tablet / 48px desktop gutters. 4 columns on mobile.
- Radius: 4 / 6 / 8 / 12. No pills except status chips.
- Shadows: essentially none. Separation comes from 1px lines.
- Motion: `--ease-out: cubic-bezier(.2,.7,.2,1)`, durations 160 / 240 / 480 / 720ms.
  Reveal = 16px rise + fade, once. Hover = 1.5% image scale, 3px arrow nudge.
  Diagrams = one travelling red signal per diagram. `prefers-reduced-motion` stops all of it.

### Buttons
Primary (black on light / white on dark), Secondary (1px outline), Ghost (text + arrow).
All three have a 40–48px height, 6px radius, the arrow nudges on hover, and a 2px red-offset focus ring.

---

## 5. Homepage story (PRD §7.1 → wireframe)

| # | Section | Surface | Layout rhythm |
|---|---|---|---|
| 1 | Hero: positioning + 2 CTAs + system animation | Black | 7/5 split, live SVG system |
| 2 | Credibility strip | Black, hairline top | 5-up inline, dividers |
| 3 | What We Do: four pillars | White | 1 featured block + 3 editorial rows |
| 4 | AI & Agentic | Paper-50 | Text left / vertical agent workflow right |
| 5 | Quality Engineering & AI Assurance | Ink-900 | Full-width horizontal pipeline + dense index |
| 6 | Telecom differentiator | Black | Sticky title left / interactive layer stack right |
| 7 | Digital Engineering + Data, Cloud & Platforms | White | Two-page editorial spread, each with its own diagram |
| 8 | Real Outcomes | White | One large featured story + 2 rows |
| 9 | Innovation & Products | Ink-900 | Focus areas + product index |
| 10 | Client Voices | Paper-50 | Single large editorial quote (pending slot) |
| 11 | How We Engage | White | Horizontal expanding accordion (6) |
| 12 | Final CTA | Black | Big statement + 3 intents |
| * | AI Assistant | Floating | Bottom-right, all pages |

---

## 6. Component inventory

`src/components/`
- **layout/**: `Navbar`, `MegaMenu`, `MobileNavigation`, `Footer`, `Container`, `Section`
- **ui/**: `Button`, `ArrowLink`, `SectionHeading`, `Eyebrow`, `PendingBadge`, `PhotoSlot`, `CountUp`, `RevealObserver`
- **diagrams/**: `HeroSystem`, `AgentWorkflow`, `QualityPipeline`, `TelecomStack`, `ArchitectureDiagram` (digital + data variants)
- **sections/**: `Hero`, `CredibilityStrip`, `CapabilityPillars`, `CapabilitySection` (AI, QE), `TelecomSection`, `EngineeringSpread`, `OutcomesSection`, `ProductShowcase`, `Testimonial`, `EngagementModel`, `FinalCTA`
- **cards/**: `CaseStudyCard`, `CaseStudyGrid` (filters), `ProductCard`, `JobCard`
- **forms/**: `ContactForm`
- **assistant/**: `AIChatAssistant`

Content lives in `src/content/`, one typed module per model (CMS-003). Swapping to a
headless CMS later only replaces these modules.

---

## 7. Integrations

- **Leads**: `POST /api/contact` validates, applies a honeypot plus a timing check (SEC-003), and forwards
  JSON to `LEAD_WEBHOOK_URL` (CRM/mail automation) when set. The assistant hands visitors off to the same
  form with `?intent=` pre-selected, so routing and consent are identical (LEAD-006).
- **Assistant**: `POST /api/assistant` answers only from `src/content/assistant-kb.ts`, which is built from
  approved content. Retrieval is deterministic, so it cannot hallucinate. Low confidence produces a human
  handoff (CHAT-003/007). An LLM can be layered on later behind the same contract, restricted to that KB.
- **Analytics**: `NEXT_PUBLIC_GA_ID` loads GA4. Events: `cta_click`, `form_start`, `form_submit`,
  `demo_request`, `case_study_view`, `product_view`, `capability_view`, `assistant_open`,
  `assistant_message`, `assistant_handoff` (ANA-002/004). Events are declared with `data-track` attributes
  and handled by a single delegated listener.
- **SEO**: per-page metadata, canonical, Open Graph, Organization JSON-LD, `sitemap.xml`, `robots.txt`.

## 8. Open items for NForce One

1. Confirm the lead-routing mailbox / webhook and owner (LEAD-004).
2. Supply approved client names, challenges and outcomes for the three case studies.
3. Approve which products are public, with descriptions and sanitised screenshots (PROD-CASE-004).
4. Supply client testimonials with written approval (TEST-002/005).
5. Commission photography from the shot list embedded in each `PhotoSlot`.
6. Leadership bios, office photos, employee testimonials with consent.
7. Confirm which non-telecom industries have proven delivery experience.
8. Legal: privacy notice (including assistant data retention, CHAT-011) and terms.
9. Business sign-off on all draft copy (CONT-005).
10. Validate the phone number 1-800-356-8933 (taken from the live site header) and both office addresses.
