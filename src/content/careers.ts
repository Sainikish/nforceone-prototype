import type { Status } from "./types";

export type Role = {
  title: string;
  team: string;
  location: string;
  status: Status;
  overview?: string;
  requirements?: string[];
  /** Description written for the new site (the official page lists only the title). HR to review before launch. */
  draft?: boolean;
};

/**
 * Open roles, as currently published on the official nforceone.com careers page (September 2026).
 * Applications go by email to site.careersEmail. Remove a role here when it closes.
 */
export const roles: Role[] = [
  {
    title: "Full Stack AI Application Engineer",
    team: "AI & Engineering",
    location: "Hyderabad",
    status: "approved",
    overview:
      "A hands-on engineer who is a strong software engineer first and an AI practitioner second. You will build complete, production-ready applications end to end, combining solid Python and Java engineering with modern front-end development and Generative AI, RAG and Agentic AI capabilities. You will own the full lifecycle, from business requirement and solution design through backend, data and vector stores, LLM and agent integration, APIs, UI, testing, cloud deployment and production support. This is not a research, notebook-only or model-experimentation role.",
    requirements: [
      "Design and develop AI-powered enterprise applications, assistants, copilots, intelligent search and workflow automation.",
      "Integrate commercial and open-source LLMs into production using prompt and context engineering, structured outputs, and tool and function calling.",
      "Build end-to-end RAG pipelines: ingestion, chunking, embeddings, vector storage, hybrid and semantic retrieval, reranking, evaluation and hallucination reduction.",
      "Build Agentic AI workflows, including multi-agent systems, memory, planning, orchestration, supervisor agents and human-in-the-loop flows.",
      "Develop backend services, REST APIs and microservices in Python (FastAPI, Flask, Django) and Java (Spring Boot).",
      "Build responsive front ends in React or Angular, including streaming LLM responses, chat interfaces and authentication flows.",
      "Work with relational, NoSQL and vector databases.",
      "Deploy, monitor and support applications on Azure, AWS or GCP using Docker, CI/CD and standard observability tooling.",
      "Contribute to AI-powered quality engineering: test generation, defect triage, root cause analysis and self-healing automation.",
      "Translate business requirements into technical solutions, build rapid POCs and take successful ones to production.",
    ],
  },
  {
    title: "Software Development Engineer in Test (SDET)",
    team: "Quality Engineering",
    location: "Hyderabad",
    status: "approved",
    overview:
      "Strong, demonstrable experience with Agentic AI automation is the core requirement. You have already applied agentic AI to real testing problems (autonomous test agents, AI-driven test generation, self-healing automation, intelligent test selection, automated failure triage) and can explain the architecture, prompts, guardrails and measured impact. You will also own how we test AI itself, running LLM-as-a-judge evaluation for our chatbots and agents, and design automation frameworks across web, API and Pega-based enterprise applications, working across Playwright, Selenium and Mabl. This is a coding role, not a manual testing or test-management-only role.",
    requirements: [
      "Design, build and maintain scalable automation frameworks in Playwright and Selenium for web, cross-browser and end-to-end regression.",
      "Design and run LLM-as-a-judge evaluation suites for AI chatbots and agents: rubrics, golden datasets, automated scoring and regression tracking.",
      "Build and maintain low-code UI automation in Mabl, including auto-healing configuration and failure triage.",
      "Automate functional and regression testing for Pega applications: case lifecycles, work objects, portals and dynamic UI.",
      "Integrate agentic AI into the testing lifecycle: AI-assisted test generation, self-healing locators, intelligent test selection and root cause analysis.",
      "Develop API automation for REST and SOAP services (Postman, ReadyAPI, SoapUI, REST Assured or Playwright), including contract validation and service virtualization.",
      "Script and analyze performance and load tests with NeoLoad, LoadRunner or JMeter.",
      "Own the test automation CI/CD pipeline: parallel and cross-browser runs, containerized execution and consolidated reporting.",
      "Define test strategy for new features and track quality metrics such as coverage, flakiness, escaped defects and mean time to detection.",
      "Share automation practices and modern AI-assisted testing workflows with the wider QA team.",
    ],
  },
  {
    title: "Senior Automation Tester",
    team: "Quality Engineering",
    location: "Hyderabad",
    status: "approved",
    draft: true,
    overview:
      "A hands-on automation engineer who designs, builds and maintains the test suites our clients' releases depend on. You will own automation for web, mobile and API layers, keep suites reliable as applications change, and bring AI-assisted testing practices into everyday delivery.",
    requirements: [
      "Design, build and maintain automation frameworks using Selenium, Playwright or Appium.",
      "Automate API testing with Postman, REST Assured or similar tools, including contract and negative tests.",
      "Integrate automated suites into CI/CD pipelines (for example Jenkins) with clear, actionable reporting.",
      "Define automation scope and test strategy with developers and business analysts.",
      "Investigate failures, reduce flakiness and drive defects to closure with reproducible evidence.",
      "Apply AI-assisted and self-healing automation techniques where they add value.",
      "Mentor junior testers and contribute to shared automation standards and accelerators.",
    ],
  },
  {
    title: "Performance Tester",
    team: "Quality Engineering",
    location: "Hyderabad",
    status: "approved",
    draft: true,
    overview:
      "An engineer who makes sure applications hold up at scale. You will plan, script, run and analyze load and performance tests, find bottlenecks before users do, and give teams clear evidence about capacity and risk.",
    requirements: [
      "Script and execute load, stress, soak and scalability tests using JMeter, LoadRunner, NeoLoad or Gatling.",
      "Build realistic workload models from business volumes and production usage.",
      "Monitor and analyze results with tools such as Grafana, Prometheus or Datadog.",
      "Identify bottlenecks across application, API, database and infrastructure layers.",
      "Report response-time trends, capacity limits and risks in a way stakeholders can act on.",
      "Integrate performance checks into CI/CD pipelines where appropriate.",
    ],
  },
  {
    title: "QA Manager",
    team: "Quality Engineering",
    location: "Hyderabad",
    status: "approved",
    draft: true,
    overview:
      "A quality leader who owns test strategy and delivery across client programs. You will lead QA teams working Onshore, Offshore and Hybrid, set the automation roadmap, and make release quality visible and measurable.",
    requirements: [
      "Own test strategy, planning and quality gates across functional, automation, API and performance testing.",
      "Lead and grow QA teams, including hiring, coaching and allocation across programs.",
      "Define and track quality metrics such as coverage, defect leakage and release readiness.",
      "Drive automation and AI-assisted testing adoption with a clear roadmap.",
      "Work with client stakeholders, delivery leads and engineering teams on scope, risk and priorities.",
      "Establish governance, reporting and continuous improvement across QA practices.",
    ],
  },
  {
    title: "PEGA Developer",
    team: "Enterprise Platforms",
    location: "Hyderabad",
    status: "approved",
    draft: true,
    overview:
      "A developer who designs and builds enterprise applications on Pega. You will deliver case management and workflow automation solutions that streamline how our clients' teams and customers work.",
    requirements: [
      "Design and build Pega applications: case types, flows, data models, UI and business rules.",
      "Work in App Studio and Dev Studio, following Pega guardrails and best practices.",
      "Integrate Pega with external systems through REST and SOAP services.",
      "Write and maintain PegaUnit tests and support functional and regression testing.",
      "Support deployments using Pega Deployment Manager and CI/CD practices.",
      "Troubleshoot and tune application performance and resolve production issues.",
    ],
  },
  {
    title: "Associate Engineer Intern",
    team: "Engineering",
    location: "Hyderabad",
    status: "approved",
    draft: true,
    overview:
      "An internship for early-career engineers who want real experience. You will learn by working alongside our teams on client and product work across Quality Engineering, AI and software development.",
    requirements: [
      "Learn and apply software testing fundamentals, including manual and automated testing.",
      "Write code in at least one language such as Python, Java or JavaScript.",
      "Contribute to real projects under the guidance of senior engineers.",
      "Explore AI and automation tools used across our engineering practice.",
      "Communicate clearly, ask questions and take ownership of assigned tasks.",
    ],
  },
];

/** NForce One core values ("GROW"), as published on the official About page. */
export const values = [
  {
    name: "Growth",
    line: "We embrace continuous learning and development, personally and professionally, so every team member can unlock their full potential.",
  },
  {
    name: "Responsibility",
    line: "We take ownership of our actions and their impact on clients, colleagues and communities, and deliver solutions that are reliable and ethical.",
  },
  {
    name: "Optimism",
    line: "We tackle every challenge believing there's a better way forward. Optimism fuels our innovation, resilience and drive for meaningful outcomes.",
  },
  {
    name: "Wisdom",
    line: "We draw on the collective experience and diverse insight of our team to make informed decisions that build long-term success.",
  },
] as const;

export const culture = [
  {
    name: "People First",
    line: "We value team happiness, work/life balance and professional development.",
  },
  {
    name: "Engineering Culture",
    line: "Testing, automation and code quality are part of how every team works, not a separate phase.",
  },
  {
    name: "Learning",
    line: "Engineers grow across AI, Quality Engineering, cloud and enterprise platforms on real client and product work.",
  },
  {
    name: "Innovation",
    line: "Teams build NForce One's own AI products and accelerators alongside client delivery.",
  },
] as const;
