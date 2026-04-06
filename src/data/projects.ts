export type ProjectCategory = "ai" | "web" | "systems";

export interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  repo: string;
  featured: boolean;
  thumbnail?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  screenshots?: string[];
}

export const ASSETS_BASE =
  "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1";

export const projects: Project[] = [
  // Featured projects
  {
    name: "CoPilot",
    slug: "copilot",
    description:
      "An AI-powered interview practice tool that gives real-time feedback on answers, helping candidates prepare with confidence.",
    tech: ["TypeScript", "React", "Electron", "Claude API"],
    category: "ai",
    repo: "CoPilot",
    featured: true,
    problem:
      "Job seekers struggle to practice interviews realistically without access to a live interviewer, leaving them underprepared for high-stakes moments.",
    solution:
      "Built a desktop app using Electron that streams questions from Claude API, records spoken responses, and returns structured feedback on clarity, relevance, and tone.",
    impact:
      "Enables unlimited private practice sessions with instant AI feedback, reducing interview anxiety and improving answer quality.",
  },
  {
    name: "PartyAI",
    slug: "partyai",
    description:
      "A collection of 13 AI-powered party games designed to entertain groups with dynamic, AI-generated content.",
    tech: ["TypeScript", "React"],
    category: "ai",
    repo: "PartyAI",
    featured: true,
    problem:
      "Traditional party games become repetitive quickly, and hosting groups often struggle to keep energy high throughout an event.",
    solution:
      "Developed 13 distinct game modes powered by AI-generated prompts and responses, ensuring no two game sessions are identical.",
    impact:
      "Delivers endlessly replayable entertainment for groups, with each session producing unique content tailored to players.",
  },
  {
    name: "KinshipPro",
    slug: "kinshippro",
    description:
      "A Chinese kinship calculator that resolves over 200 relational terms, bridging a gap in cross-cultural family communication.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "KinshipPro",
    featured: true,
    problem:
      "Chinese kinship terminology is highly complex, with over 200 distinct terms that vary by generation, gender, and lineage side — impossible to memorise for most learners.",
    solution:
      "Built an interactive calculator that takes two family members as input and traverses a relationship graph to output the precise Chinese kinship term.",
    impact:
      "Removes a significant cultural barrier for diaspora communities, language learners, and anyone navigating Chinese family relationships.",
  },
  {
    name: "AdCopyGen",
    slug: "adcopygen",
    description:
      "An AI ad copy generation tool that produces platform-optimised marketing text from a brief product description.",
    tech: ["TypeScript", "React"],
    category: "ai",
    repo: "AdCopyGen",
    featured: true,
    problem:
      "Small businesses and freelancers lack the budget for professional copywriters, yet poorly written ads directly hurt conversion rates.",
    solution:
      "Created a React app that accepts a product brief and target platform, then generates multiple ad copy variants using AI with tone and length controls.",
    impact:
      "Lets small teams produce professional-grade ad copy in seconds, lowering the barrier to effective digital marketing.",
  },

  // Standard projects
  {
    name: "FlyerForge",
    slug: "flyerforge",
    description:
      "A browser-based design tool for creating business cards and flyers with customisable templates.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "FlyerForge",
    featured: false,
  },
  {
    name: "Equipment Inspection",
    slug: "equipment-inspection",
    description:
      "A digital equipment inspection form and reporting system for field teams.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "EquipmentInspection",
    featured: false,
  },
  {
    name: "Crew Time Log",
    slug: "crew-time-log",
    description:
      "A field production crew time tracking application for logging hours and generating reports.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "Field-production-crew-time-log",
    featured: false,
  },
  {
    name: "WildSphere Zoo",
    slug: "wildsphere-zoo",
    description:
      "A zoo management system for tracking animals, enclosures, and staff schedules.",
    tech: ["C#", ".NET"],
    category: "systems",
    repo: "WildSphere-Zoo-",
    featured: false,
  },
  {
    name: "AI Travel Companion",
    slug: "ai-travel-companion",
    description:
      "An AI-assisted travel planning app that generates itineraries and recommendations.",
    tech: ["TypeScript", "React"],
    category: "ai",
    repo: "AiTravelCompanionB",
    featured: false,
  },
  {
    name: "NewsApp",
    slug: "newsapp",
    description:
      "A news aggregation app that fetches and displays articles from multiple sources.",
    tech: ["TypeScript", "React"],
    category: "web",
    repo: "NewsApp",
    featured: false,
  },
  {
    name: "IoT Simulation",
    slug: "iot-simulation",
    description:
      "An IoT device simulation and data aggregation system for testing sensor pipelines.",
    tech: ["Python"],
    category: "systems",
    repo: "IotSimulationAndAggregationSystem",
    featured: false,
  },
  {
    name: "Pizza Delivery App",
    slug: "pizza-delivery",
    description:
      "A full-stack pizza ordering and delivery management application.",
    tech: ["Java", "Spring Boot"],
    category: "web",
    repo: "FinalProjectPizza",
    featured: false,
  },
];

export const techColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  React: "bg-cyan-500/20 text-cyan-300",
  Electron: "bg-gray-500/20 text-gray-300",
  "Claude API": "bg-orange-500/20 text-orange-300",
  "C#": "bg-purple-500/20 text-purple-300",
  ".NET": "bg-violet-500/20 text-violet-300",
  Python: "bg-yellow-500/20 text-yellow-300",
  Java: "bg-red-500/20 text-red-300",
  "Spring Boot": "bg-green-500/20 text-green-300",
};

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI",
  web: "Web",
  systems: "Systems",
};
