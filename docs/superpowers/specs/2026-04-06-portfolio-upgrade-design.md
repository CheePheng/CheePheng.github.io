# Portfolio Upgrade Design Spec

## Context

CheePheng.github.io is a React + Vite + Tailwind SPA portfolio site. The site currently shows 9 hardcoded projects (the user now has 25 repos), 3 transcripts, and uses a 192-frame scroll-controlled hero animation (~20MB of WebP assets). The user wants to:

1. Modernize the site with award-winning portfolio design patterns (GSAP scroll animations, kinetic typography, bold layouts)
2. Expand to 4 distinct portfolio "experiences" visitors can switch between
3. Add a 4th transcript (2023 BSc Computing Stage 2)
4. Curate 12-15 projects (up from 9) with screenshots and case study detail pages
5. Move heavy assets to GitHub Releases CDN

---

## Architecture

### Routes (HashRouter)

| Route | Page | Description |
|-------|------|-------------|
| `/#/` | GSAP Scroll | Default homepage — kinetic typography, parallax, horizontal scroll gallery |
| `/#/case-studies` | Case Study Storytelling | Narrative Problem → Solution → Impact for featured projects |
| `/#/bold` | Bold Typography | Oversized headings, asymmetric layouts, masonry project grid |
| `/#/cinematic` | 192 Frames Experience | Full-screen scroll-controlled frame animation (current hero, refined) |
| `/#/projects/:slug` | Project Detail | Individual case study page for featured projects |

### Shared Components (across all 4 pages)

- **ExperienceSwitcher** — floating pill (bottom-right), expands to show 4 options, highlights current page
- **Navbar** — persists across all pages, but adapts per experience (see Navbar section)
- **ProjectData** — shared JSON/TS data file with all 12-15 curated projects
- **TranscriptData** — shared data for 4 transcripts
- **ContactInfo** — email, GitHub, social links
- **ScrollToTop** — existing scroll-to-top button
- **PageTransition** — fade/wipe animation wrapper on route change
- **AboutContent / TranscriptsContent / ContactContent** — shared data-driven components that accept a `theme` prop (`'gsap' | 'editorial' | 'bold' | 'cinematic'`) for styling variants. One component, 4 visual treatments. Avoids maintaining 4 copies of the same content.

### Technical Changes

| What | Before | After |
|------|--------|-------|
| Animation library | Motion (Framer Motion) | GSAP + ScrollTrigger |
| Heavy assets | `/public/frames/` (in repo) | GitHub Releases CDN |
| Projects shown | 9 hardcoded | 12-15 curated with screenshots |
| Transcripts | 3 | 4 (add 2023 BSc Computing Stage 2) |
| Pages | 1 (SPA) | 4 experiences + project detail routes |
| Page transitions | None | GSAP fade/wipe between routes |

---

## Navbar

The current Navbar uses `scrollTo()` for in-page anchor navigation. This must be reworked for multi-page routing.

### Behavior
- **Persists across all 4 experiences** — same component, adapts styling per theme
- **Navigation items** (About, Projects, Transcripts, Contact) scroll to in-page anchors on the current page (each page has these sections)
- **Logo/Name** links to `/#/` (GSAP homepage)
- **Mobile hamburger** remains (Radix Sheet), same anchor-scroll behavior
- **Does NOT duplicate the ExperienceSwitcher** — the navbar handles section navigation, the floating pill handles page switching
- **Styling:** Transparent/glassmorphism on GSAP and Cinematic pages, solid dark on Case Studies, high-contrast on Bold Typography — controlled by theme prop

---

## Navbar + ExperienceSwitcher Coexistence (Mobile)

- On mobile (<768px), the floating pill is slightly smaller (icon only, no text) to avoid overlapping with the hamburger sheet
- The pill sits at `bottom: 20px; right: 16px`, the navbar hamburger is at top-right — no conflict
- When the pill is expanded, it gets a higher z-index than the Sheet overlay

---

## Page 1: GSAP Scroll Homepage (Default — `/#/`)

### Hero — Kinetic Typography
- Full-viewport hero section
- "CHEE PHENG" in large bold type — letters split apart and reposition on scroll using **manual character splitting** (wrap each char in a `<span>`, animate with GSAP). SplitText is a paid GSAP Club plugin — we use the free manual approach instead.
- "Full Stack Developer" subtitle reveals with stagger animation
- Parallax gradient mesh background with 2-3 depth layers
- Scroll indicator at bottom

### About — Narrative Story with Reveals
- **Overhaul from current:** Replace the 14-skill-tag list with a compelling narrative
- Short story: journey from Malaysia → Ireland, BSc → Cloud Computing Honours, pivot into AI-powered apps
- Text fades in word-by-word using GSAP ScrollTrigger
- Skills displayed as an animated grid that staggers in after the narrative
- Education timeline draws itself (animated line + milestone dots)
- Keep parallax orbs in background

### Projects — Horizontal Scroll Gallery with Filters
- Filter pills above gallery: "All / AI / Web / Systems" (filter by category)
- Vertical scroll triggers horizontal movement through project cards (GSAP ScrollTrigger horizontal pin)
- Each card includes a **screenshot/thumbnail** (hosted on GitHub Releases)
- Cards scale up when centered in viewport
- Featured projects (CoPilot, PartyAI, KinshipPro, AdCopyGen) show a "Case Study" badge — click routes to `/#/projects/:slug`
- Non-featured projects link directly to GitHub repo
- **Mobile fallback:** Vertical stacked grid with swipe gestures instead of horizontal scroll

### Transcripts — Staggered Cards
- 4 transcript cards slide in from alternating sides (left, right, left, right)
- Glassmorphism card style maintained
- New entry: 2023 BSc in Computing (Stage 2) — Google Drive ID: `1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF`
- Order: 2023, 2024, 2025 transcript, 2025 diploma supplement

### Contact — Animated CTA
- Large "Let's work together" heading with gradient animation
- Email link + GitHub link with hover scale effects
- Copyright footer

---

## Page 2: Case Study Storytelling (`/#/case-studies`)

### Hero
- Minimal hero with "Chee Pheng" + tagline
- Clean, editorial feel — white/light text on dark background
- No heavy animations — focus on content readability

### Featured Projects as Narrative Cards
- Each featured project displayed as a full-width card with:
  - Project screenshot/thumbnail
  - **Problem** — what challenge this solves
  - **Solution** — technical approach and stack
  - **Impact** — metrics, results, or key outcomes
- Click to expand into full case study at `/#/projects/:slug`

### Project Detail Pages (`/#/projects/:slug`)
- Full narrative layout for each featured project
- Sections: Overview, Problem, Approach, Tech Stack, Screenshots, Outcome
- Back button returns to referring page

### Other Sections
- About, Transcripts, Contact — same content, styled to match editorial theme
- Lighter animations — subtle fades only

---

## Page 3: Bold Typography (`/#/bold`)

### Hero
- Massive "CHEE PHENG" — filled + outline text treatment
- Asymmetric layout — name offset to one side
- Accent line + "Full Stack Developer" in small uppercase tracking
- High contrast: pure black background, white text, violet/cyan accents

### Projects — Masonry Grid
- Asymmetric masonry/staggered grid layout
- Large hover reveals — card expands to show description and tech stack
- Mix of large and small cards for visual rhythm
- Project screenshots as card backgrounds with dark overlay

### Other Sections
- About, Transcripts, Contact — same content, oversized headings, dramatic spacing
- Minimal color — mostly black/white with accent pops

---

## Page 4: 192 Frames Experience (`/#/cinematic`)

### Cinematic Hero
- Full-screen scroll-controlled frame animation (current ScrollFrameHero component, refined)
- 192 WebP frames loaded from GitHub Releases CDN
- Aurora background + particle effects preserved
- Progressive loading maintained (key frames first, then fill-in)
- Mobile optimization preserved (skip odd frames, half-resolution canvas)

### Below the Fold
- **Not a dead end** — after the cinematic scroll, continue into:
  - Minimal about section
  - Project cards (simple grid, not horizontal scroll — let the frames be the star)
  - Transcripts + Contact
- Style matches current site design (glassmorphism, violet/cyan accents)

---

## Experience Switcher (Floating Pill)

- **Position:** Fixed, bottom-right corner (like a chat widget)
- **Collapsed state:** Small pill with grid icon + "4 Experiences" text
- **Expanded state:** Click to expand upward, showing 4 options with icons
  - ✨ GSAP Scroll (default)
  - 📖 Case Studies
  - ▌ Bold Type
  - 🎬 192 Frames
- **Current indicator:** Active page highlighted with accent background
- **Glassmorphism styling:** Matches existing premium card design
- **Mobile:** Slightly smaller, same position
- **Animation:** Smooth expand/collapse with GSAP

---

## Project Curation (12-15 projects)

### Recommended Selection

**Featured (get case study pages):**
1. CoPilot — AI interview practice (Electron + React + Claude API)
2. PartyAI — 13 AI party games for multiplayer
3. KinshipPro — Chinese kinship title calculator (200+ terms)
4. AdCopyGen — AI copy generation tool

**Standard (card + GitHub link):**
5. FlyerForge — Design business cards & flyers
6. EquipmentInspection — Equipment inspection tool
7. Field-production-crew-time-log — Production time logging
8. WildSphere Zoo — Zoo management (C#)
9. AI Travel Companion — Travel planning with AI
10. NewsApp — News aggregation
11. IoT Simulation — IoT device simulation (Python)
12. Pizza Delivery App — Full-stack ordering (Java)

**Optional (if 15):**
13. CA2NetworkPair — TCP/UDP networking (Java)
14. huang-furniture — Furniture website
15. CA3MVC — MVC architecture demo (C#)

### Project Data Structure
```typescript
interface Project {
  name: string;
  slug: string;          // URL-friendly name for routing
  description: string;
  tech: string[];        // Multiple tech tags (was single string)
  category: 'ai' | 'web' | 'systems';
  repo: string;
  featured: boolean;
  thumbnail: string;     // GitHub Releases CDN URL
  // Case study fields (featured only):
  problem?: string;
  solution?: string;
  impact?: string;
  screenshots?: string[];
}
```

---

## Transcript Addition

Add to `transcripts` array as first entry (chronological order):
```typescript
{
  year: "2023",
  title: "BSc in Computing — Stage 2",
  label: "2023 Transcript",
  viewUrl: "https://drive.google.com/file/d/1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF/view",
  downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF&export=download",
}
```

---

## Project Screenshots

- Take screenshots of each project's main page or key feature
- Resize to consistent dimensions (e.g., 1200x800 or 16:9 ratio)
- Compress as WebP
- Upload to a GitHub Release on the CheePheng.github.io repo (tag: `assets-v1`)
- Reference via `https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1/{filename}.webp`

---

## Page Transitions

### Implementation Pattern (React Router v6 + GSAP)
Since we're removing Framer Motion (and its `AnimatePresence`), use a **layout route wrapper** approach:

1. Create a `PageTransition` layout route component that wraps all experience routes
2. Use `useLocation()` to detect route changes
3. On route change: GSAP animates the outgoing page container (opacity 1→0, 0.3s), then React renders the new route, then GSAP animates the incoming page (opacity 0→1, 0.3s)
4. Use a `ref` to the page container and `gsap.to()` for the animation
5. The key insight: we don't need to keep the old page mounted — a simple crossfade where the container fades out, route swaps, container fades in is sufficient and avoids the complexity of simultaneous mount/unmount

### Mobile
- Simpler fade only (no directional wipe), shorter duration (0.2s)

---

## Mobile Considerations

- **Horizontal scroll gallery (Page 1):** Falls back to vertical stacked grid with touch swipe
- **Kinetic typography hero:** Reduced animation complexity, smaller text sizes
- **Experience switcher:** Same position, slightly smaller pill
- **192 Frames (Page 4):** Existing mobile optimizations preserved (skip odd frames, half-res canvas)
- **Masonry grid (Page 3):** Falls back to single-column stack
- **Page transitions:** Simpler fade only (no directional wipe)

---

## Migration Strategy: Motion → GSAP

This is a **phased migration**, not big-bang:

### Phase 1: Add GSAP, build new pages
- Install GSAP alongside Motion
- Build all new components (ExperienceSwitcher, page transitions, GSAP hero, horizontal scroll) with GSAP
- New pages (Case Studies, Bold Type) use GSAP only

### Phase 2: Migrate existing components
- Rewrite `ScrollFrameHero` — replace 8 `useTransform` + `useScroll` calls with GSAP ScrollTrigger timeline
- Rewrite `AboutSection`, `ProjectsSection`, `ResumeSection`, `ContactSection` — replace `motion.div` with GSAP `useGSAP()` hook + ScrollTrigger
- Rewrite `BlurText` — replace intersection observer + Motion animations with GSAP stagger
- `AuroraBackground` — keep for Cinematic page (Page 4), remove from other pages (GSAP pages use CSS gradient mesh instead)

### Phase 3: Remove Motion + Cleanup
- Uninstall `motion` once all components are migrated
- Remove `next-themes` (dead weight — dark mode is enforced, all 4 pages are dark-themed)
- Audit and remove unused Radix UI packages (~20 in package.json, only `@radix-ui/react-dialog` for Sheet is actively used)

### GSAP Cleanup Rule
All GSAP animations **must** use the `useGSAP()` hook (from `@gsap/react`), never raw `useEffect`. This ensures proper cleanup on route transitions and prevents memory leaks in a multi-page SPA.

### Key Motion → GSAP equivalents
| Motion API | GSAP Equivalent |
|------------|-----------------|
| `useScroll` + `useTransform` | `ScrollTrigger` with `scrub: true` |
| `whileInView` | `ScrollTrigger` with `start: "top 80%"` |
| `initial` + `animate` | `gsap.from()` |
| `whileHover` | CSS `:hover` or `gsap` event listeners |
| `AnimatePresence` | Layout route wrapper (see Page Transitions) |

---

## Accessibility: `prefers-reduced-motion`

All GSAP animations must respect `prefers-reduced-motion: reduce`:

```typescript
// In a shared utility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// When creating animations
gsap.to(el, {
  duration: prefersReducedMotion ? 0 : 0.6,
  // ...
});
```

- Kinetic typography: show text immediately, no splitting animation
- Horizontal scroll: fall back to regular vertical scroll
- Page transitions: instant swap, no fade
- Parallax: disabled
- Experience switcher: still works, just no expand animation

---

## Code Splitting

Use `React.lazy` + `Suspense` for route-level splitting to keep initial bundle small:

```typescript
const GsapHomePage = lazy(() => import('./pages/GsapHomePage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const BoldTypePage = lazy(() => import('./pages/BoldTypePage'));
const CinematicPage = lazy(() => import('./pages/CinematicPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
```

Each page only loads its own GSAP animations and components. The 192-frame loader only loads on the Cinematic page.

### Suspense Fallback
While a page lazy-loads, show a branded loading state: centered portfolio logo with a subtle pulse animation (CSS only, no GSAP dependency). This avoids a generic spinner on a portfolio site.

---

## Dependencies

### Add
- `gsap` — animation engine (free core + ScrollTrigger plugin are sufficient)
- `@gsap/react` — React integration (`useGSAP` hook)

### Remove (Phase 3, after migration)
- `motion` (Framer Motion) — replaced by GSAP
- `next-themes` — unused (dark mode enforced, no theme switching)

### Keep
- `react-router-dom` — routing (already installed)
- `lucide-react` — icons
- `tailwindcss` — styling
- All other existing dependencies

---

## Asset Hosting (GitHub Releases)

### Setup
1. Create a release on `CheePheng/CheePheng.github.io` with tag `assets-v1`
2. Upload via `gh release upload assets-v1 ./frames/*.webp` (or batch upload)
3. Upload project screenshots to same release
4. Reference assets via: `https://github.com/CheePheng/CheePheng.github.io/releases/download/assets-v1/{filename}`

### What to host
- 192 WebP frames (~20MB total)
- 12-15 project screenshots (~2-3MB total)
- Any future heavy assets

### Loading & Caching Strategy
- GitHub Releases URLs don't set strong `Cache-Control` headers, so implement:
  - **Placeholder/skeleton** while images load (blurred low-res placeholder or shimmer)
  - **Progressive loading** for frames: keep existing key-frame-first strategy, just change the base URL
  - **Error fallback:** If a frame fails to load from Releases, show a static fallback image
- For project thumbnails: lazy-load with `loading="lazy"` + IntersectionObserver
- Consider keeping a low-res hero fallback image in `/public/` for instant first paint

### Content Authoring (Case Studies)
The 4 featured projects need written content before their case study pages can be built:
- **CoPilot** — repo: `CoPilot`
- **PartyAI** — repo: `PartyAI`
- **KinshipPro** — repo: `KinshipPro`
- **AdCopyGen** — repo: `AdCopyGen`

For each, the user needs to provide or we draft: problem statement, solution description, impact/results, and 2-3 screenshots. This is a content dependency — case study pages use placeholder text until real content is authored.

### Per-Page Document Titles
Each experience route sets `document.title` via a simple `useEffect` (OG meta tags are ineffective with HashRouter since crawlers don't execute JS):
- `/` → "Chee Pheng — Full Stack Developer"
- `/case-studies` → "Chee Pheng — Project Case Studies"
- `/bold` → "Chee Pheng — Portfolio"
- `/cinematic` → "Chee Pheng — Cinematic Experience"
- `/projects/:slug` → "Chee Pheng — {Project Name}"

No additional dependency needed — just `useEffect(() => { document.title = '...' }, [])`.

---

## Verification Plan

1. **Build:** `npm run build` — ensure no errors
2. **Dev server:** `npm run dev` — test all 4 pages + route transitions
3. **Test each page:**
   - GSAP homepage: scroll through all sections, test horizontal scroll, test filter pills, test kinetic type
   - Case Studies: verify narrative cards, click into project detail pages
   - Bold Typography: check masonry grid, hover reveals, asymmetric layouts
   - 192 Frames: verify frames load from GitHub Releases CDN, scroll animation works
4. **Experience switcher:** click between all 4 pages, verify transitions, verify current page indicator
5. **Transcripts:** verify all 4 transcripts show, view/download links work
6. **Mobile:** test each page on mobile viewport (Chrome DevTools), verify fallbacks
7. **Performance:** Lighthouse audit on each page — target 90+ performance score
8. **Deploy:** push to main, verify GitHub Actions deploys successfully, test live at cheepheng.github.io

---

## 404 Handling

- `/#/projects/:slug` with an unknown slug → show a "Project not found" page with a link back to the projects section
- Reuse the existing `NotFound.tsx` component, or extend it with a project-specific message

---

## Experience Persistence

- Store the user's last-visited experience in `localStorage` key `preferred-experience`
- **No auto-redirect** — `/#/` always loads GSAP homepage (avoids confusion when sharing links)
- Instead, the ExperienceSwitcher **highlights the last-visited** page with a subtle "Last visited" indicator
- The ExperienceSwitcher updates localStorage on every switch
- URL always takes priority — sharing `/#/bold` loads Bold regardless of localStorage

---

## File Structure (New/Modified)

```
src/
├── data/
│   ├── projects.ts          # Shared project data (12-15 curated)
│   └── transcripts.ts       # Shared transcript data (4 entries)
├── components/
│   ├── ExperienceSwitcher.tsx  # Floating pill component
│   ├── PageTransition.tsx      # Layout route wrapper for transitions
│   ├── ProjectFilters.tsx      # Filter pills for project gallery
│   ├── Navbar.tsx              # Refactored — theme prop, anchor scroll
│   ├── AboutContent.tsx        # Shared about section — theme variants
│   ├── TranscriptsContent.tsx  # Shared transcripts section — theme variants
│   ├── ContactContent.tsx      # Shared contact section — theme variants
│   ├── CharSplit.tsx           # Manual character splitting for kinetic type
│   └── ... (existing components refactored for GSAP)
├── hooks/
│   └── useReducedMotion.ts    # prefers-reduced-motion hook
├── pages/
│   ├── GsapHomePage.tsx        # Page 1: GSAP Scroll
│   ├── CaseStudiesPage.tsx     # Page 2: Case Study Storytelling
│   ├── BoldTypePage.tsx        # Page 3: Bold Typography
│   ├── CinematicPage.tsx       # Page 4: 192 Frames
│   ├── ProjectDetailPage.tsx   # Individual case study
│   └── Index.tsx               # Redirects or removed (App.tsx now owns routing)
├── App.tsx                     # Owns HashRouter, Routes, PageTransition layout, Suspense + lazy imports
```
