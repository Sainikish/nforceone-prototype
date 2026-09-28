import type { Status } from "./types";

export type Role = {
  title: string;
  team: string;
  location: string;
  status: Status;
  overview?: string;
  requirements?: string[];
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
      "Develop API automation for REST and SOAP services (Postman, ReadyAPI, SoapUI, REST Assured or Playwright), including contract validation and service virtualisation.",
      "Script and analyse performance and load tests with NeoLoad, LoadRunner or JMeter.",
      "Own the test automation CI/CD pipeline: parallel and cross-browser runs, containerised execution and consolidated reporting.",
      "Define test strategy for new features and track quality metrics such as coverage, flakiness, escaped defects and mean time to detection.",
      "Share automation practices and modern AI-assisted testing workflows with the wider QA team.",
    ],
  },
  { title: "Senior Automation Tester", team: "Quality Engineering", location: "Hyderabad", status: "approved" },
  { title: "Performance Tester", team: "Quality Engineering", location: "Hyderabad", status: "approved" },
  { title: "QA Manager", team: "Quality Engineering", location: "Hyderabad", status: "approved" },
  { title: "PEGA Developer", team: "Enterprise Platforms", location: "Hyderabad", status: "approved" },
  { title: "Associate Engineer Intern", team: "Engineering", location: "Hyderabad", status: "approved" },
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
    name: "People first",
    line: "We value team happiness, work/life balance and professional development.",
  },
  {
    name: "Engineering culture",
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
