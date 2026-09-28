import type { Pillar } from "./types";

/**
 * The four strategic capability pillars (PRD §5, §8).
 * Capability names are verbatim from the PRD; one-line descriptions are draft copy
 * pending business approval (CONT-005). Technologies come from the existing site's
 * tool lists, regrouped under the right pillar.
 */
export const pillars: Pillar[] = [
  {
    slug: "ai-agentic-solutions",
    headings: { services: "What we build", how: "How an AI agent works", why: "Why NForce One for AI" },
    closing: { title: "Put AI to work inside your workflows.", lead: "Tell us where AI could take on real work, and we'll show you how we'd build it, ground it and assure it." },
    pitch: "AI agents and generative AI applications that run inside real enterprise workflows, grounded in your data and validated before they act.",
    highlights: ["Agentic AI", "Generative AI", "RAG Solutions", "Voice AI"],
    index: "01",
    name: "AI & Agentic Solutions",
    short: "AI & Agentic",
    tagline: "AI that works inside the enterprise, not beside it.",
    summary:
      "We design, build and operate AI agents and generative AI applications that run inside real enterprise workflows. They are grounded in your data, integrated with your systems and validated before they act.",
    problems: [
      "AI pilots that never make it into production workflows",
      "Assistants that cannot reach, or be trusted with, enterprise data",
      "Automation that breaks as soon as a process changes",
      "Customer and voice channels that deflect instead of resolve",
    ],
    groups: [
      {
        title: "Build",
        items: [
          { name: "Agentic AI", line: "Goal-driven agents that plan, use tools and complete multi-step work." },
          { name: "Generative AI", line: "Content, summarization and reasoning capabilities built into your products." },
          { name: "AI Agents", line: "Task-specific agents with memory, function calling and guardrails." },
          { name: "RAG Solutions", line: "Retrieval-augmented generation grounded in your approved knowledge." },
          { name: "AI Application Development", line: "Production AI applications, from interface to model integration." },
        ],
      },
      {
        title: "Automate & Engage",
        items: [
          { name: "Intelligent Automation", line: "Process automation that combines rules, AI and human review." },
          { name: "Conversational AI", line: "Chat assistants for customers and employees across channels." },
          { name: "Voice AI", line: "Speech-driven agents for support, sales and internal workflows." },
          { name: "AI-enabled Enterprise Workflows", line: "AI embedded into the systems your teams already use." },
        ],
      },
    ],
    flow: [
      { label: "Input", line: "Request, document, call or event" },
      { label: "Understand", line: "Intent, context and retrieved knowledge" },
      { label: "Reason", line: "Plan the steps and choose the tools" },
      { label: "Act", line: "Call systems, APIs and workflows" },
      { label: "Validate", line: "Check outputs against rules and evaluations" },
      { label: "Outcome", line: "A completed, auditable result" },
    ],
    differentiators: [
      {
        title: "Assurance is built in",
        line: "Our Quality Engineering heritage means evaluation, regression and safety testing are designed into every agent from the start.",
      },
      {
        title: "Grounded, not generic",
        line: "Agents are connected to your approved data and systems, so their answers and actions reflect your business.",
      },
      {
        title: "Built by a team that ships products",
        line: "NForce One builds and operates its own AI products and accelerators, and brings that experience to client work.",
      },
    ],
    technologies: [
      "LangChain",
      "OpenAI APIs",
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "Amazon SageMaker",
      "Azure Cognitive Services",
      "Apache Spark MLlib",
      "MLflow",
    ],
    related: { industries: ["telecom"], caseStudies: ["ai-driven-outreach", "ai-travel-planner"] },
    cta: { label: "Discuss Your AI Initiative", intent: "expert" },
    seo: {
      title: "AI & Agentic Solutions",
      description:
        "Agentic AI, generative AI, RAG, conversational and voice AI, and intelligent automation built into enterprise workflows by NForce One.",
    },
  },
  {
    slug: "quality-engineering-ai-assurance",
    headings: { services: "What we test and assure", how: "From requirement to release confidence", why: "Why NForce One for quality" },
    closing: { title: "Ship every release with confidence.", lead: "Get an expert view of your test estate or AI systems, and where automation and assurance pay off first." },
    pitch: "The quality engineering heritage we started with, extended to assure the AI systems enterprises are adopting next.",
    highlights: ["Automation Testing", "Agentic AI Testing", "LLM Evaluation", "Voice / IVR Testing"],
    index: "02",
    name: "Quality Engineering & AI Assurance",
    short: "Quality Engineering",
    tagline: "Release confidence for the systems you run and the AI you adopt.",
    summary:
      "Quality Engineering is where NForce One started. We test the platforms enterprises depend on today, and we bring the same rigor to the AI systems they are adopting next.",
    problems: [
      "Release cycles slowed by manual regression",
      "Integration defects discovered in production, not before",
      "Performance that holds in test and fails at scale",
      "AI systems that hallucinate, drift or regress between prompt changes",
    ],
    groups: [
      {
        title: "Engineering Quality",
        items: [
          { name: "Functional / End-to-End Testing", line: "Business journeys validated across every connected system." },
          { name: "Automation Testing", line: "Maintainable suites that run on every build and release." },
          { name: "API Testing", line: "Contract, functional and negative testing for services and integrations." },
          { name: "Performance Testing", line: "Load, stress and scalability testing against real-world conditions." },
          { name: "QA Consulting & Transformation", line: "Assess QA maturity, modernize test strategy, set automation roadmaps and strengthen governance." },
          { name: "Managed QA Services", line: "Onshore, offshore and hybrid QA teams owning end-to-end testing, automation, reporting and delivery support." },
        ],
      },
      {
        title: "Agentic Test Automation",
        items: [
          { name: "Autonomous Test Case Generation", line: "Agents read user stories, requirements and the live application to generate test cases, including the edge cases teams miss." },
          { name: "Self-Healing Test Automation", line: "When a locator or workflow changes, agents detect it and repair the affected scripts automatically." },
          { name: "Autonomous Exploratory Testing", line: "Agents follow unscripted paths and probe unexpected inputs to surface defects scripts can't find." },
          { name: "Intelligent Regression Testing", line: "Agents analyze each code change and select the regression tests that actually matter for it." },
          { name: "Agentic API & Integration Testing", line: "Agents inspect API contracts and generate request chains, negative cases and boundary tests." },
          { name: "Synthetic Test Data Generation", line: "Realistic, compliant test data on demand, covering scenarios production data rarely contains." },
          { name: "Continuous Quality Monitoring", line: "Agents run inside CI/CD, triage failures, group duplicate defects and flag genuine regressions." },
        ],
      },
      {
        title: "AI Assurance",
        items: [
          { name: "AI Testing & Agentic AI Testing", line: "Behavior, tool use and task completion validated for agents." },
          { name: "LLM Evaluation", line: "Accuracy, relevance, safety and consistency scored systematically." },
          { name: "RAG & Hallucination Testing", line: "Retrieval quality and groundedness of every answer." },
          { name: "Prompt Regression Testing", line: "Catch behavior changes when prompts, models or data change." },
          { name: "Voice / IVR Testing", line: "Call flows, recognition and resolution tested end to end." },
          { name: "Model Evaluation & Benchmarking", line: "Compare models against your tasks before you commit." },
          { name: "AI Security Testing", line: "Prompt injection, data leakage and misuse resistance." },
        ],
      },
    ],
    flow: [
      { label: "Requirement", line: "Business rules and acceptance criteria" },
      { label: "Automation", line: "Suites generated and maintained" },
      { label: "Testing", line: "Functional, API and performance" },
      { label: "AI Assurance", line: "Evaluation, grounding and safety" },
      { label: "Validation", line: "Evidence against the release bar" },
      { label: "Release Confidence", line: "Ship with known risk" },
    ],
    differentiators: [
      {
        title: "Quality Engineering heritage",
        line: "Over 20 years of technology and quality engineering leadership sit behind every test strategy we design.",
      },
      {
        title: "AI Assurance as a discipline",
        line: "We assure AI systems the way mature teams assure software: with repeatable evaluations, regression baselines and release gates.",
      },
      {
        title: "Telecom-grade integration testing",
        line: "We are experienced in end-to-end testing across OSS/BSS, billing, provisioning and customer channels.",
      },
    ],
    assures: [
      { name: "Chatbots & Virtual Assistants", line: "Conversational agents on web, mobile and messaging channels." },
      { name: "RAG & Search Agents", line: "Retrieval-augmented generation, vector stores and document embeddings." },
      { name: "Fine-Tuned LLMs", line: "Custom models trained on domain-specific data or tasks." },
      { name: "Voice AI & IVR Systems", line: "Speech-driven systems for support, sales and internal workflows." },
      { name: "Multi-Agent Systems", line: "Collaborative agents with reasoning, memory and function calling." },
    ],
    technologies: [
      "Selenium",
      "Appium",
      "Postman",
      "Apache JMeter",
      "LoadRunner",
      "Gatling",
      "Locust",
      "Jenkins",
      "LangSmith",
      "Langfuse",
      "Ragas",
      "TruLens",
    ],
    related: { industries: ["telecom"], caseStudies: ["telecom-end-to-end-quality-engineering"] },
    cta: { label: "Request an AI / QA Assessment", intent: "assessment" },
    seo: {
      title: "Quality Engineering & AI Assurance",
      description:
        "End-to-end, automation, API and performance testing, plus AI assurance: LLM evaluation, RAG and hallucination testing, prompt regression, Voice/IVR and AI security testing.",
    },
  },
  {
    slug: "digital-engineering",
    headings: { services: "What we build and modernize", how: "A typical architecture we deliver", why: "Why NForce One for engineering" },
    closing: { title: "Let's build your next application.", lead: "From new products to modernizing what you already run, scope it with a team that tests as it builds." },
    pitch: "We build and modernize the applications enterprises run on, and the APIs and services behind them.",
    highlights: ["Application Modernization", "Web & Mobile Applications", "Microservices", "Product Engineering"],
    index: "03",
    name: "Digital Engineering",
    short: "Digital Engineering",
    tagline: "Modern applications, engineered to last.",
    summary:
      "We build and modernize the applications enterprises run on, from customer-facing web and mobile products to the APIs, services and enterprise systems behind them.",
    problems: [
      "Legacy applications that slow every change",
      "Product roadmaps waiting on engineering capacity",
      "Monoliths that can't scale with demand",
      "Applications with no clear owner once they go live",
    ],
    groups: [
      {
        title: "Build",
        items: [
          { name: "Application Development", line: "Custom applications designed around your business processes." },
          { name: "Web & Mobile Applications", line: "Responsive web and native-quality mobile experiences." },
          { name: "Product Engineering", line: "End-to-end product teams from discovery to release." },
          { name: "Enterprise Applications", line: "Business-critical systems built for security and scale." },
        ],
      },
      {
        title: "Modernize & Run",
        items: [
          { name: "Application Modernization", line: "Incremental migration from legacy to modern architectures." },
          { name: "API Development", line: "Well-designed APIs that make systems composable." },
          { name: "Microservices", line: "Independently deployable services with clear boundaries." },
          { name: "Application Support", line: "Ongoing maintenance, enhancement and support." },
        ],
      },
    ],
    differentiators: [
      {
        title: "Quality engineered in",
        line: "Testing and automation are part of the delivery pipeline from the first sprint.",
      },
      {
        title: "Your stack, your standards",
        line: "We work within your tools, cloud and architecture choices rather than imposing our own.",
      },
      {
        title: "US + India product teams",
        line: "Onshore product leadership paired with scalable offshore engineering.",
      },
    ],
    related: { industries: ["telecom"], caseStudies: ["ai-travel-planner"] },
    cta: { label: "Discuss Your Project", intent: "project" },
    seo: {
      title: "Digital Engineering",
      description:
        "Application development and modernization, web and mobile, APIs, microservices, enterprise applications, product engineering and application support.",
    },
  },
  {
    slug: "data-cloud-enterprise-platforms",
    headings: { services: "What we engineer", how: "From source to insight", why: "Why NForce One for platforms" },
    closing: { title: "Build the foundation your AI needs.", lead: "Talk through your data, cloud and platform roadmap with engineers who connect it end to end." },
    pitch: "The data, cloud and enterprise platforms every AI and digital program depends on, connected into one whole.",
    highlights: ["Data Engineering", "Cloud Transformation", "DevOps", "SAP & Pega"],
    index: "04",
    name: "Data, Cloud & Enterprise Platforms",
    short: "Data & Cloud",
    tagline: "The foundation every AI and digital initiative depends on.",
    summary:
      "We engineer the data, cloud and enterprise platforms that AI and digital programs depend on, and connect them into one operating whole.",
    problems: [
      "Data spread across systems that don't talk to each other",
      "Cloud estates that grew faster than their governance",
      "Slow, manual release and environment processes",
      "Enterprise platforms under-used or hard to change",
    ],
    groups: [
      {
        title: "Data & Cloud",
        items: [
          { name: "Data Engineering", line: "Reliable pipelines that make data usable for analytics and AI." },
          { name: "Analytics", line: "From operational dashboards to predictive models." },
          { name: "Cloud Transformation", line: "Migration and modernization on AWS, Azure and GCP." },
          { name: "DevOps", line: "CI/CD, infrastructure as code, observability and environment automation." },
        ],
      },
      {
        title: "Enterprise Platforms",
        items: [
          { name: "Enterprise Integration", line: "Connecting applications, data and partners through APIs and events." },
          { name: "SAP", line: "SAP implementation support, integration and testing." },
          { name: "Pega", line: "Pega case management, workflow automation, development and testing." },
          { name: "Digital Transformation", line: "Programs that connect platforms, processes and people." },
        ],
      },
    ],
    flow: [
      { label: "Sources", line: "Applications, devices and partners" },
      { label: "Integrate", line: "APIs, events and pipelines" },
      { label: "Platform", line: "AWS · Azure · GCP" },
      { label: "Insight", line: "Analytics and AI" },
    ],
    differentiators: [
      {
        title: "AI-ready by design",
        line: "Data and cloud foundations are built with the AI use cases that will run on them in mind.",
      },
      {
        title: "Automation over tickets",
        line: "CI/CD, infrastructure as code and environment automation replace manual hand-offs.",
      },
      {
        title: "Platform depth",
        line: "Hands-on SAP and Pega delivery, alongside cloud-native engineering.",
      },
    ],
    technologies: [
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "AWS CloudFormation",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "Datadog",
      "Pega App Studio",
      "Pega Deployment Manager",
      "PegaUnit",
    ],
    related: { industries: ["telecom"], caseStudies: [] },
    cta: { label: "Schedule a Capability Discussion", intent: "expert" },
    seo: {
      title: "Data, Cloud & Enterprise Platforms",
      description:
        "Data engineering, analytics, cloud transformation on AWS, Azure and GCP, DevOps, enterprise integration, SAP, Pega and digital transformation.",
    },
  },
];

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
