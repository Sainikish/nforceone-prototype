# NForceOne.com — Full Site Content Inventory

**Site:** https://nforceone.com
**Method:** Live crawl via Playwright MCP (headless Chromium), following internal links
**Date:** 2026-07-23
**Pages captured:** 48 (every internal page reachable from the homepage)
**Output format:** Markdown — one file per page in `pages/`, structured for redesign

Each page file contains: page title, URL, full heading hierarchy (H1–H6), complete body copy, buttons/CTAs, images, and a note on forms.

## Top-level (5)
- [Home — NForceOne – Scale at Speed](pages/home.md)
- [About](pages/about.md)
- [Services (index)](pages/services.md)
- [Industries (index)](pages/industries.md)
- [Careers](pages/careers.md)
- [Contact](pages/contact.md)
- [FAQ](pages/faq.md)

## Services (30)
- [Quality Assurance](pages/services_quality-assurance.md)
- [Manual Testing](pages/services_manual-testing.md)
- [Automation Testing](pages/services_automation-testing.md)
- [Consulting Testing](pages/services_consulting-testing.md)
- [Outsourcing Testing](pages/services_outsourcing-testing.md)
- [AI Testing](pages/services_ai-testing.md)
- [UX Testing](pages/services_ux-testing.md)
- [Performance Testing](pages/services_performance-testing.md)
- [Functional Testing](pages/services_functional-testing.md)
- [Regression Testing](pages/services_regression-testing.md)
- [Integration Testing](pages/services_integration-testing.md)
- [Compatibility Testing](pages/services_compatibility-testing.md)
- [POS Testing](pages/services_pos-testing.md)
- [Payment Testing](pages/services_payment-testing.md)
- [IoT Testing](pages/services_iot-testing.md)
- [Mobile App Testing](pages/services_mobile-app-testing.md)
- [Mobile & Device Testing](pages/services_mobile-and-device-testing.md)
- [Web App Testing](pages/services_web-app-testing.md)
- [Cloud Testing](pages/services_cloud-testing.md)
- [Software Development](pages/services_software-development.md)
- [Artificial Intelligence](pages/services_artificial-intelligence.md)
- [PEGA Development](pages/services_pega-development.md)
- [Pega Testing](pages/services_pega-testing.md)
- [Devops](pages/services_devops.md)
- [Database Management](pages/services_database-management.md)
- [Data Analytics](pages/services_data-analytics.md)
- [Big Data](pages/services_big-data.md)
- [Digital App Development](pages/services_digital-app-development.md)
- [Intelligent RPA](pages/services_intelligent-rpa.md)
- [Management Services](pages/services_management-services.md)

## Industries (12)
- [Industry Expertise (index)](pages/industries.md)
- [Automotive](pages/industries_automotive.md)
- [Banking and Financial](pages/industries_banking-and-financial.md)
- [Digital Media and Advertising](pages/industries_digital-media-and-advertising.md)
- [Education and EduTech](pages/industries_education-and-edutech.md)
- [Energy and Utilities](pages/industries_energy-and-utilities.md)
- [Finance and FinTech](pages/industries_finance-and-fintech.md)
- [Insurance](pages/industries_insurance.md)
- [ISV](pages/industries_isv.md)
- [Manufacturing](pages/industries_manufacturing.md)
- [Retail and eCommerce](pages/industries_retail.md)
- [Telecommunication](pages/industries_telecom.md)

## Sitewide patterns (for redesign)

**Shared components on every page**
- Footer CTA block: "Partner with Us to Build and Scale with Confidence" + 8-item capabilities list (Custom Software Development, API & Microservices Architecture, UI/UX Design Systems, DevOps & Infrastructure Automation, Scalable QA & Test Automation, Cloud & API Integrations, Analytics & AI Enablement, Ongoing Maintenance & Support).
- Two forms per page: Free Consultation (First name, Last name, Company/Organization, Company email, Phone, Message) and a newsletter email signup ("Don't miss out updates").
- Persistent "Client Support" button.
- Footer: Company section + LinkedIn link.

**Templates**
- Service detail pages: hero → "Why Your … Needs Testing" → services/types grid → platforms grid → tools & technologies grid (usually 8 tools) → "OUR IMPACT" band → contact footer → shared 5-question FAQ accordion.
- Industry pages: hero + headline → "Our Solutions" (4 blocks) → generic "Our IT services for manufacturers" and "Cut costs while you improve your productivity" bands → contact footer.

**Content issues to fix in the redesign**
- Placeholder brand name "Tecnologia" still appears on Services, Industries, and Careers.
- Mismatched section headings: "Types of POS Systems We Test" on IoT and Regression pages; "Mobile App Testing Tools" heading on the AI page; "POS Testing Tools" heading on UX/Compatibility pages.
- Duplicated boilerplate: Big Data, Digital App Development, and Management Services reuse the Web App Testing copy verbatim; Consulting Testing shows an "Automation Testing" heading; DevOps intro is payment-testing placeholder text.
- Stub pages with little/no unique content: Intelligent RPA (hero only), Big Data (no H1/hero).
- Industries index lists more sectors (Healthcare, Travel Logistics, Media & Publishing, Retail Tech, Public Sector) than have dedicated pages — several "Learn more" links likely 404.
- Broken contact email on Contact page: `admin@3.151.21.218` (raw IP) instead of a domain address.
- Meta descriptions are empty on all pages — an SEO gap.
- Misspelling: "Compatability" on the Compatibility Testing page.
