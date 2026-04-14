# Remove /gsap Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the entire `/gsap` route and all its exclusive components because the page has persistent ScrollTrigger bugs.

**Architecture:** Delete 4 files (1 page + 3 components), remove 3 lines from 2 shared files (App.tsx route + ExperienceSwitcher menu entry). GSAP library stays — it powers animations on every other page.

**Tech Stack:** React 18, Vite, TypeScript, react-router-dom v6 (HashRouter)

---

## Context

The `/gsap` page (`DossierCinemaProjects` pinned ScrollTrigger) has persistent bugs — pin overlap, jittery scrub, stacked content during transitions. Rather than continue patching, the user wants the entire page removed.

GSAP itself (`src/lib/gsap.ts`, `gsap` + `@gsap/react` npm packages) is used by every other page (`/`, `/bold`, `/case-studies`, `/cinematic`, `/projects/:slug`) and MUST be kept.

## File structure

### Delete:
- `src/pages/GsapHomePage.tsx` — page component
- `src/components/gsap/GsapHero.tsx` — kinetic hero
- `src/components/gsap/GsapLower.tsx` — about/resume/contact
- `src/components/gsap/DossierCinemaProjects.tsx` — pinned scroll projects

### Modify:
- `src/App.tsx` — remove lazy import (line 8) + route (line 23)
- `src/components/ExperienceSwitcher.tsx` — remove menu entry (line 11)

### Keep (do NOT touch):
- `src/lib/gsap.ts` — shared by all pages
- `gsap` / `@gsap/react` npm packages — shared
- `src/components/Navbar.tsx` — shared (accepts `theme="gsap"` but that's just a dead code path after deletion, harmless)
- All other pages and components

## Tasks

### Task 1 — Remove route and navigation entry

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/ExperienceSwitcher.tsx`

- [ ] **Step 1: Remove GsapHomePage lazy import from App.tsx**

In `src/App.tsx`, delete line 8:
```tsx
const GsapHomePage = React.lazy(() => import("@/pages/GsapHomePage"));
```

- [ ] **Step 2: Remove /gsap route from App.tsx**

In `src/App.tsx`, delete line 23:
```tsx
<Route path="/gsap" element={<GsapHomePage />} />
```

- [ ] **Step 3: Remove GSAP Scroll entry from ExperienceSwitcher**

In `src/components/ExperienceSwitcher.tsx`, delete line 11:
```tsx
{ label: "GSAP Scroll", icon: "✨", path: "/gsap" },
```

- [ ] **Step 4: Lint + build**

Run: `npm run lint && npm run build`
Expected: clean (only pre-existing FloatingIslandsScene chunk warning). GsapHomePage.tsx still exists on disk but is now dead code — no import references it.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/ExperienceSwitcher.tsx
git commit -m "feat: remove /gsap route and navigation entry"
```

---

### Task 2 — Delete GSAP page and components

**Files:**
- Delete: `src/pages/GsapHomePage.tsx`
- Delete: `src/components/gsap/GsapHero.tsx`
- Delete: `src/components/gsap/GsapLower.tsx`
- Delete: `src/components/gsap/DossierCinemaProjects.tsx`

- [ ] **Step 1: Verify no remaining imports**

Run: `grep -r "GsapHomePage\|gsap/GsapHero\|gsap/GsapLower\|gsap/DossierCinema\|gsap/SplitScroll" src/`
Expected: zero matches (Task 1 removed the only import).

- [ ] **Step 2: Delete all 4 files**

```bash
git rm src/pages/GsapHomePage.tsx
git rm src/components/gsap/GsapHero.tsx
git rm src/components/gsap/GsapLower.tsx
git rm src/components/gsap/DossierCinemaProjects.tsx
```

- [ ] **Step 3: Remove the now-empty directory**

```bash
rmdir src/components/gsap
```

(If git already removed the directory, this is a no-op.)

- [ ] **Step 4: Lint + build**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor: delete GsapHomePage and all gsap-specific components"
```

---

### Task 3 — Verify no regressions

**Files:** None — read-only verification.

- [ ] **Step 1: Final lint + build gate**

Run: `npm run lint && npm run build`
Expected: clean.

- [ ] **Step 2: Verify remaining routes still build**

Check the build output includes chunks for:
- `HubPage`
- `CaseStudiesPage`
- `BoldTypePage`
- `CinematicPage`
- `ProjectDetailPage`

And does NOT include `GsapHomePage`.

- [ ] **Step 3: Grep for any stale /gsap references**

Run: `grep -r "/gsap" src/`
Expected: zero matches (or only comments/docs, nothing functional).

- [ ] **Step 4: Report unpushed commit count**

```bash
git log origin/main..HEAD --oneline | wc -l
```

## Verification

- `npm run lint && npm run build` — clean after each task
- Navigating to `/#/gsap` in browser shows NotFound page (the `*` catch-all route)
- ExperienceSwitcher shows 3 entries (Case Studies, Bold Type, 192 Frames) — no GSAP Scroll
- All other routes (`/`, `/bold`, `/case-studies`, `/cinematic`) load normally
- No console errors on any remaining route
