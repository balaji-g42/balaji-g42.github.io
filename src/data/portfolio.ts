export type ProfileId = "recruiter" | "client" | "developer";

export const person = {
  name: "Balaji G",
  series: "BALAJI",
  subtitle: "THE SERIES",
  headline: "Senior AI-Driven Automation Engineer",
  location: "Bengaluru, India",
  email: "balajig4292@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/balaji-g-ste",
    github: "https://github.com/balaji-g42",
    instagram: "https://www.instagram.com/i_am_balaji_angel/",
  },
  photo: "/balaji.png",
};

export const profiles: Record<
  ProfileId,
  { label: string; blurb: string; tagline: string; cta: string; ctaTarget: string; order: string[] }
> = {
  recruiter: {
    label: "Recruiter",
    blurb: "Skim the highlights",
    tagline:
      "7+ years making healthcare software release-ready. Regression cut from days to under 10 hours.",
    cta: "Get in touch",
    ctaTarget: "contact",
    order: ["journey", "skills", "projects"],
  },
  client: {
    label: "Client",
    blurb: "See what I can build for you",
    tagline:
      "I build and test products end to end: Flutter apps, backends and automation that keeps them honest.",
    cta: "Start a project",
    ctaTarget: "contact",
    order: ["projects", "journey", "skills"],
  },
  developer: {
    label: "Developer",
    blurb: "Show me the stack",
    tagline:
      "Test automation, MCP tooling and self-hosted infra. Python first, Flutter and TypeScript when it ships.",
    cta: "Browse the code",
    ctaTarget: "projects",
    order: ["projects", "skills", "journey"],
  },
};

export const about = {
  lead: "I build test automation for healthcare software.",
  body: [
    "I automate regression for three healthcare products across 10+ dashboards: Python, Selenium and Behave suites running in Jenkins that took a 500+ scenario regression from days to under 10 hours.",
    "Outside work I ship Flutter apps, write MCP tooling and run my own infrastructure at home: Proxmox, Docker, PostgreSQL, n8n behind reverse proxies. I prefer self-hosted and free over subscriptions.",
  ],
  stats: [
    { value: "7+", label: "years in healthcare tech" },
    { value: "500+", label: "regression scenarios" },
    { value: "<10h", label: "regression, down from days" },
    { value: "15,000+", label: "users on the products" },
  ],
};

export type Episode = { title: string; period: string; text: string; tags: string[] };
export type Season = { name: string; year: number; role: string; place: string; period: string; episodes: Episode[] };

export const seasons: Season[] = [
  {
    name: "Season 3",
    year: 2025,
    role: "Senior AI-Driven Automation Engineer",
    place: "HBox.ai (QHbox India Pvt Ltd)",
    period: "May 2025 – present",
    episodes: [
      {
        title: "Days to Hours",
        period: "2025",
        text: "Took regression for three healthcare products from days to under 10 hours, with 5+ releases a month and 15,000+ users depending on it.",
        tags: ["500+ scenarios", "CI/CD", "Docker"],
      },
      {
        title: "Healthcare Regression Suite",
        period: "2025 – present · ongoing",
        text: "Building and extending the regression suite for the healthcare portals: Python, Selenium and Behave, run in Jenkins and reported through Allure.",
        tags: ["Ongoing", "Python", "Selenium", "Behave", "Jenkins"],
      },
      {
        title: "Agentic QA Framework",
        period: "2025 – present · ongoing",
        text: "Work in progress: autonomous UI agents that explore an app, generate tests and heal broken locators.",
        tags: ["Ongoing", "AI agents", "Qdrant", "Selenium"],
      },
    ],
  },
  {
    name: "Season 2",
    year: 2022,
    role: "Senior SQA Engineer",
    place: "Omnicuris",
    period: "Apr 2022 – May 2025",
    episodes: [
      {
        title: "API First",
        period: "2022",
        text: "Designed a Karate DSL API framework covering the platform's healthcare microservices.",
        tags: ["Karate DSL", "API", "Microservices"],
      },
      {
        title: "Under Load",
        period: "2024",
        text: "Benchmarked live learning platforms with JMeter and Taurus, and scaled Behave BDD suites while mentoring the team.",
        tags: ["JMeter", "Taurus", "Behave", "Mentoring"],
      },
    ],
  },
  {
    name: "Season 1",
    year: 2019,
    role: "Software Test Engineer",
    place: "Omnicuris",
    period: "Mar 2019 – Apr 2022",
    episodes: [
      {
        title: "Pilot",
        period: "2019",
        text: "Web and API automation, regression reliability, and integration, system and security validation. Also contributed to the Flutter Escape Omni game.",
        tags: ["Selenium", "API", "Flutter"],
      },
    ],
  },
  {
    name: "Prologue",
    year: 2009,
    role: "B.E. Electronics & Communication",
    place: "Angel College of Engineering and Technology",
    period: "2009 – 2013",
    episodes: [
      {
        title: "Origin story",
        period: "2013",
        text: "Electrical, Electronics and Communications engineering, 8.1 CGPA. Later: Selenium WebDriver 4, LambdaTest, Agile with Jira, Azure and Node.js certifications.",
        tags: ["B.E.", "Certifications"],
      },
    ],
  },
];

export type Project = {
  title: string;
  kind: string;
  year?: string;
  pitch: string;
  stack: string[];
  url?: string;
  linkLabel?: string;
  status?: string;
  hue: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Agentic QA Framework",
    kind: "Automation",
    pitch: "Work in progress: autonomous UI agents that explore an app, generate tests and heal broken locators.",
    stack: ["Python", "Behave", "Selenium", "Qdrant", "Jenkins"],
    status: "In progress",
    hue: 355,
    featured: true,
  },
  {
    title: "Page Object Framework",
    kind: "Automation",
    year: "2025",
    pitch: "A clean-architecture Selenium and Python framework built from scratch: page objects, Behave features, config-driven runs and Allure reports.",
    stack: ["Python", "Selenium", "Behave", "Allure"],
    hue: 190,
    featured: true,
  },
  {
    title: "CI/CD Pipelines",
    kind: "DevOps",
    pitch: "GitHub Actions that test, build and publish on release: npm with provenance, Docker images to GHCR. Plus Jenkins pipelines for regression, including a self-hosted Jenkins.",
    stack: ["GitHub Actions", "Jenkins", "Docker", "GHCR"],
    url: "https://github.com/balaji-g42/project-agent-memory/blob/main/.github/workflows/publish.yml",
    linkLabel: "See a workflow ↗",
    hue: 15,
    featured: true,
  },
  {
    title: "Homelab",
    kind: "Infrastructure",
    pitch: "A self-hosted stack I run and maintain: Docker Compose services behind a reverse proxy and Cloudflare Tunnel, Proxmox, backups and monitoring.",
    stack: ["Docker", "Proxmox", "Linux", "Cloudflare Tunnel"],
    hue: 140,
    featured: true,
  },
  {
    title: "Home Automation",
    kind: "Smart home",
    pitch: "A self-hosted Home Assistant running my home: lights and air quality by room, energy and network monitoring, and power control for my servers, reachable securely from anywhere behind a reverse proxy.",
    stack: ["Home Assistant", "Docker", "Energy dashboard", "Reverse proxy"],
    hue: 195,
    featured: true,
  },
  {
    title: "Project Agent Memory",
    kind: "Developer tool",
    pitch: "An MCP server that gives coding agents persistent project memory. 8 tools, Qdrant or PostgreSQL/pgvector, local embeddings.",
    stack: ["TypeScript", "MCP", "Qdrant", "pgvector"],
    url: "https://github.com/balaji-g42/project-agent-memory",
    hue: 265,
    featured: true,
  },
  {
    title: "AI Weather",
    kind: "Mobile app",
    pitch: "A weather app with spoken AI daily briefings, forecasts and air quality. Live on Google Play.",
    stack: ["Flutter", "Dart", "AI briefings"],
    url: "https://play.google.com/store/apps/details?id=com.aiweather.weather",
    linkLabel: "Get it on Google Play ↗",
    hue: 205,
    featured: true,
  },
  {
    title: "Indian Neighbour",
    kind: "Freelance app",
    pitch: "Connects Indian communities across US neighbourhoods. Built in 40 days, 10,000+ installs on the Play Store and App Store.",
    stack: ["Flutter", "Dart", "Firebase"],
    hue: 28,
  },
  {
    title: "Healthcare Portal Suites",
    kind: "Automation",
    pitch: "Python, Selenium and Behave test suites for healthcare web portals.",
    stack: ["Python", "Selenium", "Behave", "Allure"],
    hue: 190,
  },
  {
    title: "Karate + Jenkins",
    kind: "Template",
    pitch: "A ready-to-run Karate API testing setup wired into Jenkins.",
    stack: ["Karate", "Jenkins"],
    url: "https://github.com/balaji-g42/karate_jenkins",
    hue: 120,
  },
  {
    title: "Envy",
    kind: "Freelance app",
    pitch: "An app for hosting and discovering local parties.",
    stack: ["Flutter", "Dart"],
    hue: 320,
  },
];

export const contributions: Project[] = [
  {
    title: "WUD: subpath proxy",
    kind: "getwud/wud",
    pitch: "Added runtime subpath proxy support through WUD_SERVER_BASEPATH.",
    stack: ["Node.js", "Docker", "Merged"],
    url: "https://github.com/getwud/wud/pull/1077",
    hue: 210,
  },
  {
    title: "WUD: login redirect fix",
    kind: "getwud/wud",
    pitch: "Fixed login redirect issues when WUD runs under a subpath.",
    stack: ["Node.js", "Auth", "Merged"],
    url: "https://github.com/getwud/wud/pull/1138",
    hue: 225,
  },
  {
    title: "Libretto: OpenRouter",
    kind: "cashew-labs/libretto",
    pitch: "Added OpenRouter as an AI provider for browser automation.",
    stack: ["TypeScript", "OpenRouter", "Merged"],
    url: "https://github.com/cashew-labs/libretto/pull/238",
    hue: 300,
  },
  {
    title: "Mission Control: session keys",
    kind: "crshdn/mission-control",
    pitch: "Added session key prefix support to agent management and the UI.",
    stack: ["TypeScript", "React", "Merged"],
    url: "https://github.com/crshdn/mission-control/pull/85",
    hue: 45,
  },
];

export const trips: { file: string; alt: string }[] = [
  { file: "trip-01.jpg", alt: "Sun low over a highway at dawn with wispy clouds" },
  { file: "trip-02.jpg", alt: "Waterfall over granite boulders under a clear blue sky" },
  { file: "trip-03.jpg", alt: "Rocky hills above a green forest valley in morning light" },
  { file: "trip-04.jpg", alt: "Wide waterfall dropping into a pool in a forested gorge" },
  { file: "trip-05.jpg", alt: "Misty mountain ridge above a grassy hillside" },
  { file: "trip-07.jpg", alt: "Cumulus clouds over a forested mountain ridge" },
  { file: "trip-08.jpg", alt: "Tree canopy view over a vast forested plain" },
  { file: "trip-09.jpg", alt: "Boulders and tall grass on a hilltop under a blue sky" },
  { file: "trip-10.jpg", alt: "River winding through green forest toward a distant hill" },
];

export const skills:{ group: string; items: string[] }[] = [
  { group: "Test automation", items: ["Python", "Selenium", "Playwright", "Behave (BDD)", "Karate DSL", "Allure"] },
  { group: "AI & agents", items: ["Qdrant / RAG", "MCP tooling", "Prompt patterns"] },
  { group: "Performance & CI", items: ["JMeter", "Taurus", "Jenkins pipelines", "GitHub Actions", "Docker", "GitOps"] },
  { group: "Build", items: ["Flutter / Dart", "TypeScript", "React", "FastAPI", "Node.js", "Firebase"] },
  { group: "Homelab & infra", items: ["Docker & Compose", "Home Assistant", "Proxmox / LXC", "Linux servers", "Reverse proxies", "Cloudflare Tunnel", "Backups & monitoring", "PostgreSQL", "n8n"] },
];
