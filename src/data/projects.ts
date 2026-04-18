export type ProjectCategory = "ai" | "web" | "systems";

export type ProjectStatus = "shipped" | "archived" | "in-progress" | "source-available";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Challenge {
  problem: string;
  resolution: string;
}

export interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  repo: string;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  thumbnail?: string;
  thumbnailAlt?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  role?: string;
  timeline?: string;
  status?: ProjectStatus;
  responsibilities?: string[];
  outcomes?: string[];
  challenges?: Challenge[];
  architecture?: string;
  gallery?: GalleryImage[];
  techDepth?: string;
}

export interface ShippedArtifact {
  name: string;
  tagline: string;
  liveUrl: string;
  repoUrl: string;
  tech: string[];
}

export const ASSETS_BASE =
  "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1";

const GH = "https://github.com/CheePheng";

export const projects: Project[] = [
  {
    name: "CoPilot",
    slug: "copilot",
    description:
      "A desktop companion that listens to a live interview and surfaces structured prep in real time.",
    tech: ["TypeScript", "React", "Electron", "Claude API"],
    category: "ai",
    repo: "CoPilot",
    repoUrl: `${GH}/CoPilot`,
    featured: true,
    status: "source-available",
    role: "Sole engineer \u2014 design, build, release",
    timeline: "Jan 2025 \u2013 Mar 2025",
    thumbnail: "/generated/projects/u_copilot.jpg",
    thumbnailAlt:
      "CoPilot desktop window with a live interview transcript in the left pane and AI-generated talking points in the right pane.",
    problem:
      "Mock-interview tools are either scripted chatbots or expensive human sessions. Neither helps during the live moment when a candidate freezes mid-answer and needs a useful next sentence fast.",
    solution:
      "An Electron app that captures system audio, streams a rolling transcript to Claude, and renders structured prep cards \u2014 talking points, relevant examples, and a next-question guess \u2014 in a second always-on-top window sized to sit beside a video call.",
    techDepth:
      "Chose Web Audio API with a local 30-second circular buffer over cloud speech services so the sensitive interview audio never leaves the machine; only short transcript windows go to Claude.",
    architecture:
      "Renderer process owns the UI; main process owns audio capture via navigator.mediaDevices and a MediaRecorder circular buffer. Transcripts are chunked and sent to Claude 3.5 Sonnet with a system prompt that enforces a JSON schema for the prep cards. IPC bridges the two with contextIsolation enabled.",
    responsibilities: [
      "Sole engineer; designed, built, and shipped end-to-end.",
      "Designed the two-window Electron architecture and the always-on-top prep surface.",
      "Wrote the transcript chunking and rolling-buffer logic.",
      "Authored the JSON-constrained Claude prompt and the UI that consumes it.",
    ],
    outcomes: [
      "Cross-platform Electron build under 95 MB with zero native deps.",
      "End-to-end latency from speech to prep card averages under 1.8 seconds on a mid-tier laptop.",
      "Sensitive audio stays on-device; only ~400-char transcript windows leave the machine.",
    ],
    challenges: [
      {
        problem:
          "The rolling transcript could balloon the Claude prompt past useful context as the interview went on.",
        resolution:
          "Added a summariser pass that compacts the oldest transcript minutes into a 2-sentence running summary, so the live window always stays under 4k tokens.",
      },
      {
        problem:
          "System audio capture on Windows and macOS uses two different permission flows that broke the UX the first time a user opened the app.",
        resolution:
          "Wrote a first-run onboarding screen that detects platform, walks the user through the exact system preferences pane, and verifies audio is flowing before unlocking the main UI.",
      },
    ],
  },
  {
    name: "PartyAI",
    slug: "partyai",
    description:
      "Thirteen local-multiplayer party games that lean on an LLM for every round's content \u2014 no repeat prompts, no pre-written deck.",
    tech: ["TypeScript", "React", "Claude API"],
    category: "ai",
    repo: "PartyAI",
    repoUrl: `${GH}/PartyAI`,
    featured: true,
    status: "source-available",
    role: "Sole engineer",
    timeline: "Nov 2024 \u2013 Jan 2025",
    thumbnail: "/generated/projects/u_partyai.jpg",
    thumbnailAlt:
      "PartyAI game menu showing thirteen game cards in a dark grid, with one highlighted and a short description visible.",
    problem:
      "Party-game apps ship a fixed content pack \u2014 play enough rounds and you've seen every card. The novelty curve is brutal, and groups stop opening the app after one evening.",
    solution:
      "A single web app that unifies thirteen game modes under one LLM-backed content engine. Each round asks the model for prompts scoped to the current game's rules, so a group can play the same game twice and never see the same content.",
    techDepth:
      "Modelled each game as a (systemPrompt, validator, roundCount) tuple so adding a new game is one object, not a new code path; the content engine stays generic.",
    architecture:
      "React + Vite front end. A thin content-engine module owns prompt construction and response validation \u2014 each game plugs in a system prompt and a Zod schema for what a valid round looks like. Bad LLM output is rejected and retried up to twice before the UI falls back to a baked-in round.",
    responsibilities: [
      "Sole engineer; designed, built, and shipped end-to-end.",
      "Designed the game-as-data abstraction that all 13 modes share.",
      "Wrote schemas, retries, and cached fallbacks for every game.",
      "Tuned prompts per game to trade off tone (rude, wholesome, absurd) against consistency.",
    ],
    outcomes: [
      "13 games shipped, all consuming one ~200-line content engine.",
      "Typical round costs under 1500 tokens against Claude Haiku.",
      "Fallback round cache means the app still plays if the API is unreachable mid-session.",
    ],
    challenges: [
      {
        problem:
          "Early rounds felt repetitive because the model kept drifting toward its median answer once it saw a few examples.",
        resolution:
          "Added a per-session seen-prompts list that is passed back in every request with an explicit 'do not reuse these themes' instruction. Variance recovered without needing a bigger model.",
      },
      {
        problem:
          "A single bad model response could kill the round flow on a couch of people waiting.",
        resolution:
          "Every game has a Zod schema for its round shape; invalid responses retry silently, and after two failures the UI reaches into the fallback cache so the game never visibly stalls.",
      },
    ],
  },
  {
    name: "KinshipPro",
    slug: "kinshippro",
    description:
      "An offline PWA that resolves over 200 Chinese kinship titles by walking a relationship graph, not a lookup table.",
    tech: ["TypeScript", "React", "PWA"],
    category: "web",
    repo: "KinshipPro",
    repoUrl: `${GH}/KinshipPro`,
    liveUrl: "https://kinshippro.vercel.app",
    featured: true,
    status: "shipped",
    role: "Sole engineer",
    timeline: "Sep 2024 \u2013 Nov 2024",
    thumbnail: "/generated/projects/u_kinshippro.jpg",
    thumbnailAlt:
      "KinshipPro interface showing a family tree on the left and the computed Chinese kinship term with pinyin on the right.",
    problem:
      "Chinese kinship terminology distinguishes over 200 relations by generation, gender, lineage side, and age order. Flashcard apps can't teach it; native speakers themselves often Google the right term mid-conversation.",
    solution:
      "A graph-based calculator: the user assembles a chain of relatives (father's elder brother's wife, etc.) and the app walks a rule graph to produce the correct formal title, the spoken address term, and the pinyin.",
    techDepth:
      "Modelled kinship as a directed graph of primitive relations (\u7236\u3001\u6bcd\u3001\u5144\u3001\u59b9\u3001\u592b\u3001\u59bb\u3001\u5b50\u3001\u5973) with rewrite rules, rather than hard-coding all 200 terms. Adding a new relation is a rule, not a new case.",
    architecture:
      "Vite + React front end, no backend. The kinship engine is a ~300-line module of typed primitives and composition rules. Service worker caches everything for offline use; PWA installable on iOS and Android.",
    responsibilities: [
      "Sole engineer; designed, built, and shipped end-to-end.",
      "Modelled the kinship rule graph from the Chinese grammar literature.",
      "Built the chain-of-relations input UI and the result card.",
      "Set up the service worker, offline cache, and PWA install prompts.",
    ],
    outcomes: [
      "Over 200 distinct kinship terms resolvable from ~8 primitives and ~20 rules.",
      "Installable as a PWA; works fully offline after first load.",
      "Zero backend, zero recurring hosting cost \u2014 runs on GitHub Pages.",
    ],
    challenges: [
      {
        problem:
          "Bilateral descent (father's side vs mother's side) doubles every term and makes a naive lookup table explode.",
        resolution:
          "Tagged each primitive relation with a lineage side and pushed the doubling into the rewrite rules, so the graph stayed small and the side-selection happens once at traversal time.",
      },
      {
        problem:
          "Input UX was the real problem \u2014 'father's elder brother's wife' is seven taps and users lost track mid-chain.",
        resolution:
          "Rebuilt the input as a visible left-to-right chain of chips, each a segmented control. Users see the whole chain at once and can edit any segment without restarting.",
      },
    ],
  },
  {
    name: "AdCopyGen",
    slug: "adcopygen",
    description:
      "A structured ad-copy generator that treats platform and tone as first-class constraints, not afterthoughts.",
    tech: ["TypeScript", "React", "Claude API"],
    category: "ai",
    repo: "AdCopyGen",
    repoUrl: `${GH}/AdCopyGen`,
    featured: true,
    status: "source-available",
    role: "Sole engineer",
    timeline: "Feb 2025 \u2013 Mar 2025",
    thumbnail: "/generated/projects/u_adcopygen.jpg",
    thumbnailAlt:
      "AdCopyGen with a product brief in the left panel and four generated ad variants (Google, Meta, LinkedIn, X) tiled on the right.",
    problem:
      "General-purpose LLM prompts produce bland ad copy because they ignore platform-specific constraints \u2014 character limits, tone conventions, hook placement \u2014 that make real ads convert.",
    solution:
      "A small web app where the user enters a product brief once, then the model generates parallel variants constrained to each target platform (Google Ads headline + description, Meta primary text, LinkedIn sponsored post, X copy) under tone and length controls.",
    techDepth:
      "Per-platform output is schema-constrained with Zod: each variant enforces the real character limits and structural rules of its platform, so output is paste-ready rather than aspirational.",
    architecture:
      "React + Vite front end, Claude 3.5 Sonnet backend. A platform registry object holds each target's rules (max chars, tone conventions, hook shape); the same brief is sent to the model with platform-specific system prompts. Generated variants are validated against the registry and any that overflow retry once.",
    responsibilities: [
      "Sole engineer; designed, built, and shipped end-to-end.",
      "Researched real ad-platform character limits and hook conventions from platform documentation.",
      "Designed the platform registry that makes adding a new ad surface a one-object change.",
      "Built the side-by-side comparison UI and copy-to-clipboard flow.",
    ],
    outcomes: [
      "Four platforms supported out of the box, each with enforced real character limits.",
      "Variants are paste-ready \u2014 no manual trimming to fit Google's 30/90 or Meta's 125.",
      "One product brief produces ~12 variants per run on a single API call per platform.",
    ],
    challenges: [
      {
        problem:
          "The model cheerfully exceeded character limits when given tight constraints \u2014 telling it 'max 30' produced 34 reliably.",
        resolution:
          "Moved enforcement to post-processing: generate a candidate, validate against the registry, retry once with the overflow visible in the retry prompt. Success rate on second try climbed above 95%.",
      },
      {
        problem:
          "Tone sliders (playful/formal) were doing nothing visible because prompt tokens were too weak a signal.",
        resolution:
          "Replaced the sliders with small example snippets per tone that ship inside the system prompt. The model now anchors on real examples rather than adjectives.",
      },
    ],
  },
  {
    name: "FlyerForge",
    slug: "flyerforge",
    description:
      "A browser-based design tool for composing business cards and flyers from constrained templates.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "FlyerForge",
    repoUrl: `${GH}/FlyerForge`,
    featured: false,
    status: "source-available",
    role: "Sole engineer",
  },
  {
    name: "Equipment Inspection",
    slug: "equipment-inspection",
    description:
      "A digital equipment inspection form and reporting system for field teams tracking downtime.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "EquipmentInspection",
    repoUrl: `${GH}/EquipmentInspection`,
    featured: false,
    status: "source-available",
    role: "Sole engineer",
  },
  {
    name: "Crew Time Log",
    slug: "crew-time-log",
    description:
      "A field-production crew time tracker for logging hours and generating labour-cost reports.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "Field-production-crew-time-log",
    repoUrl: `${GH}/Field-production-crew-time-log`,
    featured: false,
    status: "source-available",
    role: "Sole engineer",
  },
  {
    name: "WildSphere Zoo",
    slug: "wildsphere-zoo",
    description:
      "A zoo management system for tracking animals, enclosures, and staff schedules. Coursework in C#/.NET.",
    tech: ["C#", ".NET"],
    category: "systems",
    repo: "WildSphere-Zoo-",
    repoUrl: `${GH}/WildSphere-Zoo-`,
    featured: false,
    status: "archived",
    role: "Coursework",
  },
  {
    name: "AI Travel Companion",
    slug: "ai-travel-companion",
    description:
      "An AI-assisted travel-planning app that composes day-by-day itineraries from a destination and trip length.",
    tech: ["TypeScript", "React"],
    category: "ai",
    repo: "AiTravelCompanionB",
    repoUrl: `${GH}/AiTravelCompanionB`,
    featured: false,
    status: "source-available",
    role: "Sole engineer",
  },
  {
    name: "NewsApp",
    slug: "newsapp",
    description:
      "A news aggregation app that fetches and displays articles from multiple public feeds.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "NewsApp",
    repoUrl: `${GH}/NewsApp`,
    featured: false,
    status: "source-available",
    role: "Sole engineer",
  },
  {
    name: "IoT Simulation",
    slug: "iot-simulation",
    description:
      "An IoT device simulation and data-aggregation system for testing sensor pipelines. Coursework.",
    tech: ["Python"],
    category: "systems",
    repo: "IotSimulationAndAggregationSystem",
    repoUrl: `${GH}/IotSimulationAndAggregationSystem`,
    featured: false,
    status: "archived",
    role: "Coursework",
  },
  {
    name: "Pizza Delivery App",
    slug: "pizza-delivery",
    description:
      "A full-stack pizza ordering and delivery management application. Final-year Java coursework.",
    tech: ["Java", "Spring Boot"],
    category: "web",
    repo: "FinalProjectPizza",
    repoUrl: `${GH}/FinalProjectPizza`,
    featured: false,
    status: "archived",
    role: "Coursework",
  },
];

export const shippedArtifacts: ShippedArtifact[] = [
  {
    name: "3D Portfolio",
    tagline: "A separate portfolio experience in Three.js + React Three Fiber with scroll-driven GSAP sequences.",
    liveUrl: "https://3d-cheepheng-portfolio.cheepheng.workers.dev",
    repoUrl: `${GH}/3d-cheepheng-portfolio`,
    tech: ["Three.js", "R3F", "GSAP"],
  },
  {
    name: "KinshipPro",
    tagline: "Offline PWA that resolves 200+ Chinese kinship titles by walking a relationship graph.",
    liveUrl: "https://kinshippro.vercel.app",
    repoUrl: `${GH}/KinshipPro`,
    tech: ["React", "PWA", "TypeScript"],
  },
  {
    name: "This site",
    tagline: "Five distinct experiences under one hub. Written in React, Vite, GSAP, and Three.js; hosted on GitHub Pages.",
    liveUrl: "https://cheepheng.github.io",
    repoUrl: `${GH}/CheePheng.github.io`,
    tech: ["React", "GSAP", "Three.js"],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI",
  web: "Web",
  systems: "Systems",
};
