# Portfolio Multi-Experience Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the single-page portfolio into a 4-experience multi-page site with GSAP animations, a floating experience switcher, curated projects with case studies, and assets hosted on GitHub Releases.

**Architecture:** React SPA with HashRouter serving 4 experience routes (`/`, `/case-studies`, `/bold`, `/cinematic`) plus project detail routes (`/projects/:slug`). Shared data layer for projects and transcripts. Phased migration from Motion (Framer Motion) to GSAP + ScrollTrigger. Heavy assets (192 frames, screenshots) hosted on GitHub Releases CDN.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, GSAP + ScrollTrigger + @gsap/react, React Router DOM 6 (HashRouter)

**Spec:** `docs/superpowers/specs/2026-04-06-portfolio-upgrade-design.md`

---

## Phase 1: Foundation — Data Layer, Dependencies, Routing

### Task 1: Install GSAP and register plugins

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install GSAP packages**

```bash
npm install gsap @gsap/react
```

- [ ] **Step 2: Verify installation**

```bash
npm ls gsap @gsap/react
```

Expected: Both packages listed with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap and @gsap/react"
```

---

### Task 2: Create shared data layer — projects and transcripts

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/transcripts.ts`

- [ ] **Step 1: Create `src/data/projects.ts`**

```typescript
export type ProjectCategory = "ai" | "web" | "systems";

export interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  repo: string;
  featured: boolean;
  thumbnail: string;
  problem?: string;
  solution?: string;
  impact?: string;
  screenshots?: string[];
}

const ASSETS_BASE =
  "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1";

export const projects: Project[] = [
  // ── Featured (case study pages) ──
  {
    name: "CoPilot",
    slug: "copilot",
    description: "AI-powered interview practice tool with real-time feedback",
    tech: ["TypeScript", "React", "Electron", "Claude API"],
    category: "ai",
    featured: true,
    repo: "CoPilot",
    thumbnail: `${ASSETS_BASE}/copilot.webp`,
    problem: "Interview anxiety with no affordable, realistic practice tool available.",
    solution:
      "Built a desktop app using Electron + React that connects to Claude API and Ollama for real-time AI-powered mock interviews with instant feedback.",
    impact:
      "Provides personalized interview coaching with multiple AI model support, enabling candidates to practice anytime.",
  },
  {
    name: "PartyAI",
    slug: "partyai",
    description: "13 AI-powered party games for local multiplayer fun",
    tech: ["TypeScript", "React"],
    category: "ai",
    featured: true,
    repo: "PartyAI",
    thumbnail: `${ASSETS_BASE}/partyai.webp`,
    problem: "Party games lack AI integration for dynamic, unpredictable gameplay.",
    solution:
      "Created 13 distinct AI-powered party games designed for local multiplayer, with AI generating unique challenges and responses each round.",
    impact: "13 unique games playable locally with friends, powered by AI for endless replayability.",
  },
  {
    name: "KinshipPro",
    slug: "kinshippro",
    description: "Offline Chinese kinship title calculator with 200+ terms",
    tech: ["TypeScript", "React"],
    category: "web",
    featured: true,
    repo: "KinshipPro",
    thumbnail: `${ASSETS_BASE}/kinshippro.webp`,
    problem: "Chinese kinship titles are complex with 200+ unique terms that are hard to remember.",
    solution:
      "Built an offline-first calculator that maps family relationships to their correct Chinese kinship titles, working entirely without internet.",
    impact: "200+ kinship terms indexed and instantly searchable, works offline for family gatherings.",
  },
  {
    name: "AdCopyGen",
    slug: "adcopygen",
    description: "AI-powered advertising copy generation tool",
    tech: ["TypeScript", "React"],
    category: "ai",
    featured: true,
    repo: "AdCopyGen",
    thumbnail: `${ASSETS_BASE}/adcopygen.webp`,
    problem: "Writing effective ad copy is time-consuming and requires marketing expertise.",
    solution:
      "Built an AI tool that generates targeted advertising copy based on product details and audience parameters.",
    impact: "Generates professional ad copy in seconds, reducing content creation time significantly.",
  },
  // ── Standard (card + GitHub link) ──
  {
    name: "FlyerForge",
    slug: "flyerforge",
    description: "Design business cards and flyers with ease",
    tech: ["TypeScript", "React"],
    category: "web",
    featured: false,
    repo: "FlyerForge",
    thumbnail: `${ASSETS_BASE}/flyerforge.webp`,
  },
  {
    name: "Equipment Inspection",
    slug: "equipment-inspection",
    description: "Equipment inspection tracking and reporting tool",
    tech: ["TypeScript", "React"],
    category: "web",
    featured: false,
    repo: "EquipmentInspection",
    thumbnail: `${ASSETS_BASE}/equipment-inspection.webp`,
  },
  {
    name: "Crew Time Log",
    slug: "crew-time-log",
    description: "Field production crew time logging application",
    tech: ["TypeScript", "React"],
    category: "web",
    featured: false,
    repo: "Field-production-crew-time-log",
    thumbnail: `${ASSETS_BASE}/crew-time-log.webp`,
  },
  {
    name: "WildSphere Zoo",
    slug: "wildsphere-zoo",
    description: "Zoo management system with animal tracking and reporting",
    tech: ["C#", ".NET"],
    category: "systems",
    featured: false,
    repo: "WildSphere-Zoo-",
    thumbnail: `${ASSETS_BASE}/wildsphere-zoo.webp`,
  },
  {
    name: "AI Travel Companion",
    slug: "ai-travel-companion",
    description: "AI-powered travel planning and recommendation app",
    tech: ["TypeScript", "React"],
    category: "ai",
    featured: false,
    repo: "AiTravelCompanionB",
    thumbnail: `${ASSETS_BASE}/ai-travel-companion.webp`,
  },
  {
    name: "NewsApp",
    slug: "newsapp",
    description: "Modern news aggregation and reading application",
    tech: ["TypeScript", "React"],
    category: "web",
    featured: false,
    repo: "NewsApp",
    thumbnail: `${ASSETS_BASE}/newsapp.webp`,
  },
  {
    name: "IoT Simulation",
    slug: "iot-simulation",
    description: "IoT device simulation and data aggregation system",
    tech: ["Python"],
    category: "systems",
    featured: false,
    repo: "IotSimulationAndAggregationSystem",
    thumbnail: `${ASSETS_BASE}/iot-simulation.webp`,
  },
  {
    name: "Pizza Delivery App",
    slug: "pizza-delivery",
    description: "Full-stack pizza ordering and delivery management",
    tech: ["Java", "Spring Boot"],
    category: "web",
    featured: false,
    repo: "FinalProjectPizza",
    thumbnail: `${ASSETS_BASE}/pizza-delivery.webp`,
  },
];

export const techColors: Record<string, string> = {
  TypeScript: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  React: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  Electron: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  "Claude API": "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "C#": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  ".NET": "bg-purple-500/15 text-purple-300 border-purple-500/20",
  Java: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  "Spring Boot": "bg-green-500/15 text-green-300 border-green-500/20",
  Python: "bg-green-500/15 text-green-300 border-green-500/20",
};

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI",
  web: "Web",
  systems: "Systems",
};
```

- [ ] **Step 2: Create `src/data/transcripts.ts`**

```typescript
export interface Transcript {
  year: string;
  title: string;
  label: string;
  viewUrl: string;
  downloadUrl: string;
}

export const transcripts: Transcript[] = [
  {
    year: "2023",
    title: "BSc in Computing — Stage 2",
    label: "2023 Transcript",
    viewUrl:
      "https://drive.google.com/file/d/1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF/view",
    downloadUrl:
      "https://drive.usercontent.google.com/u/0/uc?id=1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF&export=download",
  },
  {
    year: "2024",
    title: "BSc Computer Science — Software Development",
    label: "2024 Transcript",
    viewUrl:
      "https://drive.google.com/file/d/1HKvUkcNMkJ_1XF438dfNJvHOkUnxq_9y/view",
    downloadUrl:
      "https://drive.usercontent.google.com/u/0/uc?id=1HKvUkcNMkJ_1XF438dfNJvHOkUnxq_9y&export=download",
  },
  {
    year: "2025",
    title: "BSc (Hons) Computing in Cloud Computing",
    label: "2025 Transcript",
    viewUrl:
      "https://drive.google.com/file/d/1CxvIhBSTedeEFiU-pupYORTKKkhisRSX/view",
    downloadUrl:
      "https://drive.usercontent.google.com/u/0/uc?id=1CxvIhBSTedeEFiU-pupYORTKKkhisRSX&export=download",
  },
  {
    year: "2025",
    title: "European Diploma Supplement",
    label: "Diploma Supplement",
    viewUrl:
      "https://drive.google.com/file/d/1BZz6BoMlbnmkDFjLBuKH_dVEh148av72/view",
    downloadUrl:
      "https://drive.usercontent.google.com/u/0/uc?id=1BZz6BoMlbnmkDFjLBuKH_dVEh148av72&export=download",
  },
];
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts src/data/transcripts.ts
git commit -m "feat: add shared project and transcript data layer"
```

---

### Task 3: Create useReducedMotion hook and GSAP registration utility

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/lib/gsap.ts`

- [ ] **Step 1: Create `src/hooks/useReducedMotion.ts`**

```typescript
import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

- [ ] **Step 2: Create `src/lib/gsap.ts`**

This file registers GSAP plugins once so every component can import from here.

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useReducedMotion.ts src/lib/gsap.ts
git commit -m "feat: add useReducedMotion hook and GSAP registration"
```

---

### Task 4: Create Experience Switcher component

**Files:**
- Create: `src/components/ExperienceSwitcher.tsx`

- [ ] **Step 1: Create `src/components/ExperienceSwitcher.tsx`**

Floating pill, bottom-right. Expands upward to show 4 experience options. Uses GSAP for expand/collapse animation. Stores last-visited in localStorage.

```typescript
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Grid2X2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Experience {
  path: string;
  label: string;
  icon: string;
}

const experiences: Experience[] = [
  { path: "/", label: "GSAP Scroll", icon: "✨" },
  { path: "/case-studies", label: "Case Studies", icon: "📖" },
  { path: "/bold", label: "Bold Type", icon: "▌" },
  { path: "/cinematic", label: "192 Frames", icon: "🎬" },
];

const STORAGE_KEY = "preferred-experience";

export default function ExperienceSwitcher() {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const lastVisited = localStorage.getItem(STORAGE_KEY);

  // Update localStorage on route change
  useEffect(() => {
    const currentPath = location.pathname;
    if (experiences.some((e) => e.path === currentPath)) {
      localStorage.setItem(STORAGE_KEY, currentPath);
    }
  }, [location.pathname]);

  // Animate expand/collapse
  useGSAP(() => {
    if (!menuRef.current) return;
    gsap.to(menuRef.current, {
      height: expanded ? "auto" : 0,
      opacity: expanded ? 1 : 0,
      duration: reducedMotion ? 0 : 0.25,
      ease: "power2.out",
    });
  }, { dependencies: [expanded] });

  // Close when clicking outside
  useEffect(() => {
    if (!expanded) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-experience-switcher]")) setExpanded(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [expanded]);

  const handleSwitch = (path: string) => {
    setExpanded(false);
    navigate(path);
  };

  const currentPath = location.pathname;

  return (
    <div
      data-experience-switcher
      className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-2"
    >
      {/* Expanded menu */}
      <div
        ref={menuRef}
        className="overflow-hidden rounded-2xl border border-violet-500/20"
        style={{
          height: 0,
          opacity: 0,
          background: "rgba(15, 15, 25, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div className="p-2 flex flex-col gap-0.5 min-w-[160px]">
          <p className="text-[10px] uppercase tracking-widest text-white/30 px-3 pt-2 pb-1 font-body">
            Switch Experience
          </p>
          {experiences.map((exp) => {
            const isActive = currentPath === exp.path;
            const isLastVisited = !isActive && lastVisited === exp.path;
            return (
              <button
                key={exp.path}
                onClick={() => handleSwitch(exp.path)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-white/60 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <span className="text-sm">{exp.icon}</span>
                <span className="text-xs font-body font-medium">{exp.label}</span>
                {isLastVisited && (
                  <span className="text-[8px] text-white/30 ml-auto">Last</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 rounded-full border border-violet-500/30 px-3.5 py-2.5 md:px-4 md:py-2.5 transition-colors hover:border-violet-500/50"
        style={{
          background: "rgba(139, 92, 246, 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Grid2X2 className="h-4 w-4 text-violet-400" />
        <span className="text-xs font-body font-semibold text-violet-300 hidden md:inline">
          4 Experiences
        </span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ExperienceSwitcher.tsx
git commit -m "feat: add floating experience switcher component"
```

---

### Task 5: Create PageTransition layout wrapper and branded loading fallback

**Files:**
- Create: `src/components/PageTransition.tsx`
- Create: `src/components/LoadingFallback.tsx`

- [ ] **Step 1: Create `src/components/LoadingFallback.tsx`**

Branded loading state shown during lazy-load of page chunks.

```typescript
export default function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
      <img
        src="/images/logo.png"
        alt=""
        className="h-16 w-16 animate-pulse"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/PageTransition.tsx`**

Layout route wrapper that fades out on route change, swaps content, fades in.

```typescript
import { useRef, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const isFirstRender = useRef(true);

  const setTitle = useCallback(() => {
    const titles: Record<string, string> = {
      "/": "Chee Pheng — Full Stack Developer",
      "/case-studies": "Chee Pheng — Project Case Studies",
      "/bold": "Chee Pheng — Portfolio",
      "/cinematic": "Chee Pheng — Cinematic Experience",
    };
    document.title = titles[location.pathname] || "Chee Pheng — Full Stack Developer";
  }, [location.pathname]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      setTitle();
      return;
    }

    window.scrollTo(0, 0);

    if (reducedMotion) {
      setTitle();
      return;
    }

    // Fade in the new page
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out", onStart: setTitle }
    );
  }, [location.pathname, reducedMotion, setTitle]);

  return (
    <div ref={containerRef}>
      <Outlet />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PageTransition.tsx src/components/LoadingFallback.tsx
git commit -m "feat: add page transition wrapper and loading fallback"
```

---

### Task 6: Restructure App.tsx with multi-route setup and lazy loading

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite `src/App.tsx`**

Replace the current single-route setup with lazy-loaded multi-page routes wrapped in PageTransition.

```typescript
import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ExperienceSwitcher from "@/components/ExperienceSwitcher";
import LoadingFallback from "@/components/LoadingFallback";

const GsapHomePage = lazy(() => import("@/pages/GsapHomePage"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const BoldTypePage = lazy(() => import("@/pages/BoldTypePage"));
const CinematicPage = lazy(() => import("@/pages/CinematicPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App = () => (
  // "dark" class on wrapper ensures Tailwind dark: utilities keep working
  // after removing ThemeProvider from next-themes
  <div className="dark">
    <HashRouter>
      <ExperienceSwitcher />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<PageTransition />}>
            <Route path="/" element={<GsapHomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/bold" element={<BoldTypePage />} />
            <Route path="/cinematic" element={<CinematicPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  </div>
);

export default App;
```

- [ ] **Step 2: Create placeholder page files so routes resolve**

Create minimal placeholder pages that will be built out in later tasks:

**`src/pages/GsapHomePage.tsx`:**
```typescript
export default function GsapHomePage() {
  return <div className="min-h-screen bg-[#07070d] text-white p-8">GSAP Home (placeholder)</div>;
}
```

**`src/pages/CaseStudiesPage.tsx`:**
```typescript
export default function CaseStudiesPage() {
  return <div className="min-h-screen bg-[#07070d] text-white p-8">Case Studies (placeholder)</div>;
}
```

**`src/pages/BoldTypePage.tsx`:**
```typescript
export default function BoldTypePage() {
  return <div className="min-h-screen bg-[#07070d] text-white p-8">Bold Typography (placeholder)</div>;
}
```

**`src/pages/CinematicPage.tsx`:**
```typescript
export default function CinematicPage() {
  return <div className="min-h-screen bg-[#07070d] text-white p-8">Cinematic 192 Frames (placeholder)</div>;
}
```

**`src/pages/ProjectDetailPage.tsx`:**
```typescript
import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.featured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-heading italic gradient-text">404</h1>
          <p className="mb-4 text-lg text-white/40 font-body">Project not found</p>
          <Link to="/" className="text-violet-400 font-body hover:text-violet-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-white p-8">
      <h1 className="text-4xl font-heading italic gradient-text">{project.name}</h1>
      <p className="text-white/40 mt-2">Case study page (placeholder — to be built in Phase 2)</p>
    </div>
  );
}
```

- [ ] **Step 3: Run dev server and verify routing works**

```bash
npm run dev
```

Test in browser:
- `http://localhost:8080/#/` → shows GSAP placeholder
- `http://localhost:8080/#/case-studies` → shows Case Studies placeholder
- `http://localhost:8080/#/bold` → shows Bold placeholder
- `http://localhost:8080/#/cinematic` → shows Cinematic placeholder
- `http://localhost:8080/#/projects/copilot` → shows CoPilot placeholder
- `http://localhost:8080/#/projects/nonexistent` → shows 404
- Experience switcher pill visible and navigates between pages
- Page transitions fade in on route change

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/GsapHomePage.tsx src/pages/CaseStudiesPage.tsx src/pages/BoldTypePage.tsx src/pages/CinematicPage.tsx src/pages/ProjectDetailPage.tsx
git commit -m "feat: restructure App.tsx with multi-route lazy loading and placeholder pages"
```

---

### Task 7: Refactor Navbar for multi-page support

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Refactor Navbar to accept theme prop and use anchor scroll on current page**

The navbar must work on any page — it scrolls to in-page anchors (about, projects, resume, contact) which exist on every page. The logo links to home route.

```typescript
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollTo } from "@/lib/scrollTo";

export type NavTheme = "gsap" | "editorial" | "bold" | "cinematic";

const navLinks = ["About", "Projects", "Resume"];

interface NavbarProps {
  theme?: NavTheme;
}

const themeStyles: Record<NavTheme, string> = {
  gsap: "bg-black/25 backdrop-blur-2xl",
  editorial: "bg-gray-950/90 backdrop-blur-lg",
  bold: "bg-black/95",
  cinematic: "bg-black/25 backdrop-blur-2xl",
};

export default function Navbar({ theme = "gsap" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <button onClick={handleLogoClick} className="cursor-pointer">
          <img
            src="/images/logo.png"
            alt="Chee Pheng portfolio logo"
            className="h-12 w-12"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
          />
        </button>

        {/* Desktop nav */}
        <div
          className={`hidden md:flex items-center rounded-full px-2 py-1.5 gap-1 ${themeStyles[theme]}`}
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-3.5 py-1.5 text-sm font-medium font-body rounded-full flex items-center gap-1.5 bg-white text-black"
          >
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={`rounded-full p-3 ${themeStyles[theme]}`}
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-950 border-gray-800">
              <SheetTitle className="text-foreground font-heading italic text-2xl mb-6">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => { scrollTo(link.toLowerCase()); setOpen(false); }}
                    className="text-left text-lg font-body text-white/90 hover:text-white transition-colors py-3"
                  >
                    {link}
                  </button>
                ))}
                <button
                  onClick={() => { scrollTo("contact"); setOpen(false); }}
                  className="mt-4 px-5 py-2.5 text-sm font-medium font-body rounded-full flex items-center gap-2 w-fit bg-white text-black"
                >
                  Contact
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-12 hidden md:block" />
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "refactor: update Navbar for multi-page routing with theme prop"
```

---

## Phase 2: Build the 4 Experience Pages

### Task 8: Build shared content components (About, Transcripts, Contact)

**Files:**
- Create: `src/components/AboutContent.tsx`
- Create: `src/components/TranscriptsContent.tsx`
- Create: `src/components/ContactContent.tsx`
- Create: `src/components/CharSplit.tsx`

These are shared across all 4 pages. Each accepts a `theme` prop for styling variants. Uses GSAP for animations via `useGSAP`.

- [ ] **Step 1: Create `src/components/CharSplit.tsx`** — manual character splitting utility for kinetic typography

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CharSplitProps {
  text: string;
  className?: string;
  trigger?: boolean; // true = animate on scroll, false = animate on mount
  as?: "h1" | "h2" | "span";
}

export default function CharSplit({ text, className = "", trigger = true, as: Tag = "h1" }: CharSplitProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");

    if (trigger) {
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    } else {
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }, { scope: containerRef });

  const words = text.split(" ");

  return (
    <Tag ref={containerRef as any} className={className} style={{ perspective: "600px" }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block" style={{ marginRight: "0.3em" }}>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Create `src/components/AboutContent.tsx`**

Shared about section with narrative story, skills, and education. Theme-aware styling.

**CRITICAL: Must render with `id="about"` on the outermost `<section>` element.** The Navbar uses `scrollTo("about")` which calls `document.getElementById("about")`. Without this, anchor navigation silently fails.

This component should contain the narrative bio, skills grid, and education timeline — content sourced from the current `AboutSection.tsx` but restructured with a compelling narrative and GSAP animations.

Key points for implementation:
- **Render `<section id="about" ...>`** as the root element
- Reuse text content from `src/components/AboutSection.tsx:59-65` (bio paragraphs)
- Reuse skills array from `src/components/AboutSection.tsx:6-9`
- Reuse education cards from `src/components/AboutSection.tsx:99-133`
- Replace all `motion.*` with GSAP `useGSAP` + ScrollTrigger
- Accept `theme: NavTheme` prop for styling variants
- Add narrative paragraph: "From Malaysia to Ireland, I pursued Computer Science at DkIT..."
- Use GSAP ScrollTrigger for word-by-word text reveal (`gsap.from` with stagger on each word `<span>`)
- Skills grid: `gsap.from` with stagger 0.03s per skill tag
- Education timeline: animated SVG line that draws itself via `strokeDashoffset`

- [ ] **Step 3: Create `src/components/TranscriptsContent.tsx`**

Shared transcript section. Imports from `src/data/transcripts.ts`. GSAP staggered entrance from alternating sides.

**CRITICAL: Must render with `id="resume"` on the outermost `<section>` element.** The Navbar uses `scrollTo("resume")`.

Key points:
- **Render `<section id="resume" ...>`** as the root element
- Import `transcripts` from `@/data/transcripts`
- Reuse card design from `src/components/ResumeSection.tsx:60-100`
- Replace `motion.*` with GSAP
- Alternating slide direction: even cards from left (`x: -50`), odd from right (`x: 50`)
- Each card: `useGSAP` with ScrollTrigger, `gsap.from({ x, opacity: 0, duration: 0.6 })`

- [ ] **Step 4: Create `src/components/ContactContent.tsx`**

Shared contact section. GSAP animations. Theme-aware.

**CRITICAL: Must render with `id="contact"` on the outermost `<section>` element.** The Navbar uses `scrollTo("contact")`.

Key points:
- **Render `<section id="contact" ...>`** as the root element
- Reuse content from `src/components/ContactSection.tsx`
- Replace `motion.*` with GSAP
- "Let's work together" large heading with gradient animation

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/CharSplit.tsx src/components/AboutContent.tsx src/components/TranscriptsContent.tsx src/components/ContactContent.tsx
git commit -m "feat: add shared theme-aware content components with GSAP animations"
```

---

### Task 9: Build Page 1 — GSAP Scroll Homepage

**Files:**
- Modify: `src/pages/GsapHomePage.tsx`
- Create: `src/components/gsap/GsapHero.tsx`
- Create: `src/components/gsap/HorizontalScrollProjects.tsx`
- Create: `src/components/ProjectFilters.tsx`

- [ ] **Step 1: Create `src/components/gsap/GsapHero.tsx`**

Full-viewport hero with kinetic typography using CharSplit. "CHEE PHENG" letters animate on scroll. Parallax gradient mesh background. "Full Stack Developer" stagger reveal. Scroll indicator.

Key implementation details:
- Use `CharSplit` for the name
- GSAP ScrollTrigger for parallax background layers (2-3 divs at different scroll speeds via `scrub: true`)
- "Full Stack Developer" subtitle uses `gsap.from` with stagger
- Scroll indicator bouncing chevron via `gsap.to` with `repeat: -1, yoyo: true`
- Full viewport height: `h-screen`

- [ ] **Step 2: Create `src/components/ProjectFilters.tsx`**

Filter pills: "All / AI / Web / Systems". Simple state component.

```typescript
import { ProjectCategory, categoryLabels } from "@/data/projects";

interface ProjectFiltersProps {
  active: ProjectCategory | "all";
  onChange: (category: ProjectCategory | "all") => void;
}

const categories: (ProjectCategory | "all")[] = ["all", "ai", "web", "systems"];

export default function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-colors border ${
            active === cat
              ? "bg-violet-500/15 text-violet-300 border-violet-500/30"
              : "text-white/40 border-white/[0.06] hover:text-white/60 hover:border-white/10"
          }`}
        >
          {cat === "all" ? "All" : categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/gsap/HorizontalScrollProjects.tsx`**

GSAP ScrollTrigger horizontal scroll gallery. Vertical scroll triggers horizontal movement. Cards scale on center. Featured projects show "Case Study" badge.

Key implementation details:
- Wrapper div with `overflow: hidden`, inner track `display: flex, gap`
- `ScrollTrigger.create({ trigger, pin: true, scrub: 1, end: () => "+=" + scrollWidth })`
- Each card: thumbnail image (lazy loaded), name, tech tags, description
- Featured badge links to `/projects/:slug`
- On mobile (< 768px): skip horizontal scroll, render vertical grid instead
- Filter state passed down from parent to filter visible projects

- [ ] **Step 4: Build out `src/pages/GsapHomePage.tsx`**

Compose: Navbar(theme="gsap") → GsapHero → AboutContent(theme="gsap") → HorizontalScrollProjects → TranscriptsContent(theme="gsap") → ContactContent(theme="gsap") → ScrollToTop

**Background:** Pages 1-3 do NOT use AuroraBackground (that's only for Page 4/Cinematic). Instead, use a CSS gradient mesh background — a fixed `div` with 2-3 radial gradients (violet/indigo at low opacity) providing ambient depth. Add this as a shared `GradientMeshBg` component or inline in each page wrapper.

**Project thumbnail error handling:** All `<img>` elements for project thumbnails must include `loading="lazy"` and an `onError` handler that swaps to a gradient fallback (e.g., `e.target.src = ''` + CSS gradient background on the card).

- [ ] **Step 5: Test in browser**

```bash
npm run dev
```

Navigate to `http://localhost:8080/#/`. Verify:
- Kinetic typography hero animates on scroll
- Parallax background layers move at different speeds
- About section text reveals word-by-word
- Horizontal scroll gallery works (desktop) / vertical grid (mobile)
- Filter pills filter projects
- Featured projects show badge
- Transcripts show 4 entries with view/download
- Contact section visible

- [ ] **Step 6: Commit**

```bash
git add src/pages/GsapHomePage.tsx src/components/gsap/ src/components/ProjectFilters.tsx
git commit -m "feat: build GSAP scroll homepage with kinetic hero and horizontal scroll gallery"
```

---

### Task 10: Build Page 2 — Case Studies

**Files:**
- Modify: `src/pages/CaseStudiesPage.tsx`
- Create: `src/components/casestudy/CaseStudyHero.tsx`
- Create: `src/components/casestudy/CaseStudyCard.tsx`

- [ ] **Step 1: Create hero and card components**

- `CaseStudyHero`: Minimal hero — "Chee Pheng" heading + "Project Case Studies" subtitle. Clean, editorial feel. Subtle GSAP fade-in only.
- `CaseStudyCard`: Full-width card per featured project. Shows thumbnail, problem, solution, impact. Link to `/projects/:slug`.

- [ ] **Step 2: Build out `src/pages/CaseStudiesPage.tsx`**

Compose: Navbar(theme="editorial") → CaseStudyHero → map featured projects → CaseStudyCard → AboutContent(theme="editorial") → TranscriptsContent(theme="editorial") → ContactContent(theme="editorial")

- [ ] **Step 3: Build out `src/pages/ProjectDetailPage.tsx`**

Full case study layout for featured projects. Sections: overview, problem, approach/solution, tech stack badges, impact. Back button using `useNavigate(-1)`. Set document title to project name.

- [ ] **Step 4: Test in browser**

Navigate to `/#/case-studies`. Click a featured project → verify it opens the detail page. Back button returns.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CaseStudiesPage.tsx src/pages/ProjectDetailPage.tsx src/components/casestudy/
git commit -m "feat: build case studies page with narrative project cards and detail pages"
```

---

### Task 11: Build Page 3 — Bold Typography

**Files:**
- Modify: `src/pages/BoldTypePage.tsx`
- Create: `src/components/bold/BoldHero.tsx`
- Create: `src/components/bold/MasonryProjects.tsx`

- [ ] **Step 1: Create hero and masonry components**

- `BoldHero`: Massive "CHEE PHENG" — filled text + outline text (`-webkit-text-stroke`). Asymmetric layout (offset to left). Accent line + "Full Stack Developer" small uppercase. Pure black bg.
- `MasonryProjects`: CSS grid masonry layout. Mix of large (span 2 rows) and small cards. Project screenshot as background with dark overlay. Hover reveals description + tech stack. Mobile: single column.

- [ ] **Step 2: Build out `src/pages/BoldTypePage.tsx`**

Compose: Navbar(theme="bold") → BoldHero → MasonryProjects → AboutContent(theme="bold") → TranscriptsContent(theme="bold") → ContactContent(theme="bold")

- [ ] **Step 3: Test in browser**

Navigate to `/#/bold`. Verify oversized typography, masonry grid, hover reveals, single-column on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/pages/BoldTypePage.tsx src/components/bold/
git commit -m "feat: build bold typography page with masonry project grid"
```

---

### Task 12: Build Page 4 — Cinematic (192 Frames)

**Files:**
- Modify: `src/pages/CinematicPage.tsx`

- [ ] **Step 1: Build CinematicPage**

This page reuses existing components with minimal changes:
- Import and render `AuroraBackground` (keep only for this page)
- Import and render `ScrollFrameHero` (existing — still uses Motion for now, will migrate in Phase 3)
- Below the hero: AboutContent(theme="cinematic") → simple project grid (not horizontal scroll) → TranscriptsContent(theme="cinematic") → ContactContent(theme="cinematic")

The scroll frame hero continues to use `motion/react` for now — it has complex `useScroll`/`useTransform` chains that will be migrated to GSAP in Task 14.

- [ ] **Step 2: Update frame URL base for GitHub Releases**

In `src/components/ScrollFrameHero.tsx`, change `getFrameSrc`:

```typescript
// Before:
const getFrameSrc = (i: number) => `/frames/${String(i).padStart(5, "0")}.webp`;

// After — dual-path with CDN primary, local fallback:
const FRAMES_CDN = "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1";
const getFrameSrc = (i: number) => {
  const filename = `${String(i).padStart(5, "0")}.webp`;
  return `${FRAMES_CDN}/${filename}`;
};
// Keep local frames in /public/frames/ during development as fallback.
// Once Task 16 confirms CDN works, the local frames can be removed.
```

**Note:** The local frames still exist in `/public/frames/` as a safety net. Task 16 creates the GitHub Release and uploads frames. Only delete local frames after confirming CDN serving works in Task 16 Step 5.

- [ ] **Step 3: Test in browser**

Navigate to `/#/cinematic`. Verify scroll frames, aurora background, sections below.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CinematicPage.tsx src/components/ScrollFrameHero.tsx
git commit -m "feat: build cinematic page with 192-frame hero and CDN URL"
```

---

## Phase 3: Migration and Cleanup

### Task 13: Migrate ScrollToTop from Motion to GSAP/CSS

**Files:**
- Modify: `src/components/ScrollToTop.tsx`

- [ ] **Step 1: Rewrite ScrollToTop to use CSS transitions instead of Motion AnimatePresence**

```typescript
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 sm:bottom-6 left-4 sm:left-6 z-50 liquid-glass-strong rounded-full p-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
```

Note: Moved to `left` side since ExperienceSwitcher occupies `bottom-right`.

- [ ] **Step 2: Commit**

```bash
git add src/components/ScrollToTop.tsx
git commit -m "refactor: migrate ScrollToTop from Motion to CSS transitions, move to left side"
```

---

### Task 14: Migrate ScrollFrameHero from Motion to GSAP

**Files:**
- Modify: `src/components/ScrollFrameHero.tsx`

This is the most complex migration — 8 `useTransform` calls + `useScroll` + `useMotionValueEvent`.

- [ ] **Step 1: Rewrite ScrollFrameHero using GSAP ScrollTrigger**

Replace all Motion APIs:
- `useScroll` + `useTransform` → GSAP ScrollTrigger timeline with `scrub: true`
- `useMotionValueEvent` → ScrollTrigger `onUpdate` callback
- `motion.div` with `style` bindings → `ref` + GSAP animated properties
- `BlurText` → `CharSplit` (GSAP-based)
- Keep canvas drawing logic unchanged
- Keep progressive loading logic unchanged

The key approach:
- Create a GSAP timeline inside `useGSAP`
- Add ScrollTrigger: `{ trigger: containerRef, start: "top top", end: "bottom bottom", scrub: true }`
- Timeline keyframes replace the `useTransform` ranges:
  - `heroOpacity`: 1 → 1 (at 30%) → 0 (at 45%)
  - `heroY`: 0 → -120
  - `canvasScale`: 1.08 → 1.0
  - etc.

- [ ] **Step 2: Test the cinematic page thoroughly**

```bash
npm run dev
```

Navigate to `/#/cinematic`. Scroll through entire hero. Verify:
- Canvas frames render correctly
- Text overlays appear/disappear at correct scroll positions
- Dolly-zoom effect works
- Mobile optimization (half-res, skip frames) still works

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollFrameHero.tsx
git commit -m "refactor: migrate ScrollFrameHero from Motion to GSAP ScrollTrigger"
```

---

### Task 15: Remove Motion, next-themes, and unused Radix packages

**Files:**
- Modify: `package.json`
- Modify: `src/components/BlurText.tsx` (delete — replaced by CharSplit)
- Delete: old section components that are now replaced by shared content components

- [ ] **Step 1: Verify no files still import from `motion/react`**

```bash
grep -r "from \"motion" src/ --include="*.tsx" --include="*.ts"
```

Expected: No matches. If any remain, migrate them first.

- [ ] **Step 2: Verify no files import `next-themes`**

```bash
grep -r "next-themes" src/ --include="*.tsx" --include="*.ts"
```

Expected: No matches (App.tsx ThemeProvider was removed in Task 6).

- [ ] **Step 3: Remove unused packages**

```bash
npm uninstall motion next-themes @hookform/resolvers react-hook-form zod @tanstack/react-query recharts sonner react-day-picker react-resizable-panels embla-carousel-react input-otp cmdk date-fns vaul @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
```

Keep: `@radix-ui/react-dialog` (used by Sheet), `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `lucide-react`

- [ ] **Step 4: Delete replaced files**

Remove old components that are now superseded:
- `src/components/BlurText.tsx` — replaced by `CharSplit.tsx`
- `src/components/AboutSection.tsx` — replaced by `AboutContent.tsx`

Also update `src/pages/NotFound.tsx` — replace `<a href="/">` with `<Link to="/">` from react-router-dom (plain `<a>` breaks with HashRouter):
```typescript
import { Link } from "react-router-dom";
// ...
<Link to="/" className="text-violet-400 font-body hover:text-violet-300 transition-colors">
  Return to Home
</Link>
```
- `src/components/ProjectsSection.tsx` — replaced by `HorizontalScrollProjects.tsx` + `MasonryProjects.tsx`
- `src/components/ResumeSection.tsx` — replaced by `TranscriptsContent.tsx`
- `src/components/ContactSection.tsx` — replaced by `ContactContent.tsx`
- `src/pages/Index.tsx` — replaced by 4 page files

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: No errors. No warnings about missing imports.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/components/ src/pages/NotFound.tsx
git commit -m "refactor: remove Motion, next-themes, and unused Radix/utility packages"
```

---

## Phase 4: Assets and Polish

### Task 16: Upload assets to GitHub Releases

**Files:**
- No code files — this is an asset upload task

- [ ] **Step 1: Create GitHub Release**

```bash
gh release create assets-v1 --title "Portfolio Assets v1" --notes "192 scroll animation frames and project screenshots for portfolio site"
```

- [ ] **Step 2: Upload 192 WebP frames**

```bash
cd public/frames
gh release upload assets-v1 *.webp --clobber
```

Note: This may take a while with 192 files. If `gh` CLI has issues with glob on Windows, batch upload in groups:
```bash
for f in *.webp; do gh release upload assets-v1 "$f" --clobber; done
```

- [ ] **Step 3: Take project screenshots and upload**

For each of the 12 projects, take a screenshot of the main page or README. Resize to 1200x800, convert to WebP, and upload:

```bash
gh release upload assets-v1 copilot.webp partyai.webp kinshippro.webp adcopygen.webp flyerforge.webp equipment-inspection.webp crew-time-log.webp wildsphere-zoo.webp ai-travel-companion.webp newsapp.webp iot-simulation.webp pizza-delivery.webp --clobber
```

**Important:** Until screenshots are created, use placeholder images. The site should handle missing thumbnails gracefully (show a gradient fallback).

- [ ] **Step 4: Verify frame URLs are accessible**

```bash
curl -sI "https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1/00001.webp" | head -5
```

Expected: HTTP 302 redirect (GitHub Releases redirects to CDN).

- [ ] **Step 5: Remove frames from git tracking (optional — reduces repo size)**

After confirming CDN works, optionally remove frames from the repo:

```bash
git rm -r public/frames/
git commit -m "chore: remove frames from repo (now hosted on GitHub Releases)"
```

Only do this once CDN serving is confirmed working.

---

### Task 17: Add .superpowers to .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Check if `.gitignore` exists and add the entry:

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers to gitignore"
```

---

### Task 18: Final verification

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: No errors, no warnings.

- [ ] **Step 2: Dev server — test all 4 pages**

```bash
npm run dev
```

Test checklist:
- [ ] `/#/` — GSAP hero animates, horizontal scroll works, filters work, 4 transcripts show
- [ ] `/#/case-studies` — narrative cards show, click into project detail pages works, back button works
- [ ] `/#/bold` — masonry grid renders, hover reveals work, oversized typography correct
- [ ] `/#/cinematic` — 192 frames scroll correctly, aurora background visible, content below hero
- [ ] Experience switcher — click between all 4 pages, transitions fade, current page highlighted
- [ ] Mobile (Chrome DevTools, 375px) — horizontal scroll falls back to grid, masonry falls back to single column, pill shows icon only
- [ ] `/#/projects/copilot` — case study detail page renders
- [ ] `/#/projects/nonexistent` — 404 page renders
- [ ] All 4 transcripts show on every page with working view/download links
- [ ] `prefers-reduced-motion` — enable in OS settings, verify animations are instant

- [ ] **Step 3: Lighthouse audit**

Run Lighthouse on each page in Chrome DevTools. Target: 90+ performance.

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "fix: final polish and verification fixes"
```

- [ ] **Step 5: Deploy**

Push to main — GitHub Actions will auto-deploy:

```bash
git push origin main
```

Verify live at `https://cheepheng.github.io`.
