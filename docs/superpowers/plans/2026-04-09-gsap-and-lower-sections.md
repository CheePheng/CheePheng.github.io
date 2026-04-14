# /gsap Redesign + Per-Route Lower Sections Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (A) Redesign the `/gsap` projects/scroll section so it feels like an award-style interactive story, not a pinned card list. (B) Give `/gsap`, `/bold`, and `/case-studies` their own lower-section variants (About / Transcript / Contact) so each route has a distinct ending — without creating 15 duplicate components.

**Architecture:**
- **One enhancement** to [SplitScrollProjects.tsx](src/components/gsap/SplitScrollProjects.tsx) — don't rewrite, sharpen: tighter pacing, bigger chapter numerals, image parallax + scale, directional copy morph, premium progress rail with tick morph.
- **Three new lower-section variant files**, one per route that needs differentiation:
  - [src/components/gsap/GsapLower.tsx](src/components/gsap/GsapLower.tsx) — kinetic editorial: asymmetric Approach / Capabilities / Start a Motion-Driven Project
  - [src/components/bold/BoldLower.tsx](src/components/bold/BoldLower.tsx) — statement: Manifesto / Strengths / Commission
  - [src/components/casestudy/CaseStudyLower.tsx](src/components/casestudy/CaseStudyLower.tsx) — dossier: Role & Approach / Evidence / Discuss a Project
- **Extract shared data** into [src/data/profile.ts](src/data/profile.ts) — bio, skills, education — so the three variants import the same strings rather than duplicating copy. `transcripts` already has its own data file.
- **Leave `/` and `/cinematic` alone** — they already use bespoke sections (Hub uses `HubAbout`/`HubResume`) or benefit from the restrained shared component (Cinematic). The existing `AboutContent`/`TranscriptsContent`/`ContactContent` continue to serve them.
- Page wiring: each of `GsapHomePage`, `BoldTypePage`, `CaseStudiesPage` stops importing the three shared lower components and renders its one new variant instead.

**Tech Stack:** React + Vite + TS + Tailwind + GSAP (ScrollTrigger) + `useGSAP` + `useReducedMotion`. No new libraries.

---

## Files touched

**Modify:**
- `src/components/gsap/SplitScrollProjects.tsx` — enhancement only (no rewrite)
- `src/pages/GsapHomePage.tsx` — swap lower section imports
- `src/pages/BoldTypePage.tsx` — swap lower section imports
- `src/pages/CaseStudiesPage.tsx` — swap lower section imports

**Create:**
- `src/data/profile.ts` — shared bio/skills/education strings
- `src/components/gsap/GsapLower.tsx`
- `src/components/bold/BoldLower.tsx`
- `src/components/casestudy/CaseStudyLower.tsx`

**Leave alone:**
- `src/components/AboutContent.tsx`, `TranscriptsContent.tsx`, `ContactContent.tsx` — still used by `/cinematic` (all three) and `/` (contact only via HubPage)
- `src/components/hub/HubAbout.tsx`, `HubResume.tsx` — already bespoke
- `src/components/gsap/GsapHero.tsx` — untouched, hero is already strong

---

## Task 1: Extract shared profile data

**Files:**
- Create: `src/data/profile.ts`

- [ ] **Step 1: Create the data file.**

```ts
// src/data/profile.ts

export const bio =
  "I'm Chee Pheng Ng — from Malaysia to Ireland, I pursued Computer Science at Dundalk Institute of Technology (DkIT). After completing 3 years in Software Development, I continued with an Honours year in Cloud Computing, graduating in 2025. Now I'm focused on building AI-powered applications and modern full-stack solutions.";

export const skills = [
  "TypeScript", "React", "Java", "C#", "HTML/CSS", "SQL",
  "Cloud Architecture", "Mobile Development", "REST APIs", "Git",
  "Node.js", "IoT", "Agile", "Docker",
];

export const education = [
  {
    period: "2024 – 2025",
    degree: "BSc (Honours) Level 8 — Computing in Cloud Computing",
    school: "Dundalk Institute of Technology",
    note: "Second Class Honours Grade 2",
  },
  {
    period: "2020 – 2023",
    degree: "BSc Computer Science — Software Development",
    school: "Dundalk Institute of Technology",
    note: "3 Years",
  },
];

export const contact = {
  email: "cheephengcheepheng@outlook.com",
  github: "https://github.com/CheePheng",
  githubLabel: "github.com/CheePheng",
};
```

- [ ] **Step 2: Verify import resolves:** `npm run build` — expect clean (file isn't imported yet, but build should still work).

- [ ] **Step 3: Commit.**

```bash
git add src/data/profile.ts
git commit -m "chore(data): extract shared profile data for per-route variants"
```

---

## Task 2: Sharpen `/gsap` SplitScrollProjects

**Files:**
- Modify: `src/components/gsap/SplitScrollProjects.tsx`

Enhance the existing pinned 4-beat scroll. **Do not rewrite the whole file** — keep the pin/scrub/ScrollTrigger setup and featured data wiring. Only change the markup, transitions, and pacing.

- [ ] **Step 1: Tighten pacing.** Change the scroll budget from `window.innerHeight * total` to `window.innerHeight * (total * 0.85)`:

```tsx
  end: () => `+=${window.innerHeight * total * 0.85}`,
```

And reduce the section height style:
```tsx
style={{ height: `${featured.length * 85}vh` }}
```

Tighter scroll = more payoff per beat.

- [ ] **Step 2: Redesign the left column.** Replace the left-column inner JSX (the `featured.map` block inside `<div className="relative w-full max-w-[560px]">`) with this editorial layout. The outer map + the absolute-positioned per-beat div structure stay the same; it's the **contents** of each beat that change:

```tsx
<div className="text-[11px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.35em] mb-6 flex items-center gap-3">
  <span className="w-6 h-px bg-violet-400/60" />
  Chapter {String(i + 1).padStart(2, "0")}
</div>

{/* Massive ordinal numeral */}
<div className="font-heading italic text-white/[0.06] text-[14rem] leading-[0.8] tracking-tight absolute -top-8 -left-4 pointer-events-none select-none">
  {String(i + 1).padStart(2, "0")}
</div>

<h3 className="relative font-heading italic text-white text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
  {project.name}
</h3>

<p className="relative font-body text-white/55 text-base lg:text-lg leading-relaxed mb-8 max-w-[460px]">
  {project.description}
</p>

<div className="relative flex flex-wrap gap-2 mb-10">
  {project.tech.slice(0, 4).map((t) => (
    <span
      key={t}
      className="px-2.5 py-0.5 text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15"
    >
      {t}
    </span>
  ))}
</div>

<Link
  to={`/projects/${project.slug}`}
  className="relative inline-flex items-center gap-3 text-sm font-body font-medium text-white group/link"
>
  <span className="relative">
    <span className="absolute -bottom-1 left-0 right-0 h-px bg-violet-400/60 group-hover/link:bg-violet-300 transition-colors" />
    Read the case study
  </span>
  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
</Link>
```

Note: pill border-only style is intentional (kills the techColors pill candy that made all cards look the same). Numeral is `text-white/[0.06]` to bleed behind the heading.

- [ ] **Step 3: Upgrade the beat transitions.** Replace the inline `transform: translateY(...)` style on each absolute beat div with a directional morph based on scroll direction. Simpler: change the `transitionProperty` to include `transform, filter` and use this style:

```tsx
style={{
  opacity: activeIndex === i ? 1 : 0,
  transform:
    activeIndex === i
      ? "translateY(0) translateX(0)"
      : activeIndex > i
        ? "translateY(-40px) translateX(-20px)"
        : "translateY(40px) translateX(20px)",
  filter: activeIndex === i ? "blur(0px)" : "blur(6px)",
  transitionProperty: "opacity, transform, filter",
  transitionDuration: "900ms",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
}}
```

- [ ] **Step 4: Parallax + scale on the image column.** In the right column's per-beat div, replace the existing transform style with:

```tsx
style={{
  opacity: activeIndex === i ? 1 : 0,
  transform:
    activeIndex === i
      ? "scale(1.02) translateY(0)"
      : activeIndex > i
        ? "scale(1.12) translateY(-40px)"
        : "scale(1.12) translateY(40px)",
  transition: "opacity 1000ms cubic-bezier(0.22,1,0.36,1), transform 1400ms cubic-bezier(0.22,1,0.36,1)",
}}
```

Add an inner overlay for cinematic depth by replacing the two existing gradient divs with:

```tsx
<div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07070d]/20 to-[#07070d]/85" />
<div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/80 via-transparent to-[#07070d]/20" />
<div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
```

- [ ] **Step 5: Premium progress rail.** Replace the bottom progress section entirely with:

```tsx
<div className="absolute bottom-12 left-12 right-12 flex items-center gap-6">
  <span className="font-heading italic text-white text-3xl leading-none tabular-nums">
    {String(activeIndex + 1).padStart(2, "0")}
  </span>
  <div className="flex-1 relative h-px bg-white/10">
    <div
      className="ssp-progress-fill absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400/80 to-violet-300/40 origin-left"
      style={{ transform: "scaleX(0)", transformOrigin: "left", height: "1px" }}
    />
    {/* Chapter ticks */}
    {featured.map((_, i) => (
      <span
        key={i}
        className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/20"
        style={{ left: `${(i / (featured.length - 1)) * 100}%` }}
      />
    ))}
  </div>
  <span className="font-body text-[10px] text-white/40 uppercase tracking-[0.25em] tabular-nums">
    of {String(featured.length).padStart(2, "0")}
  </span>
</div>
```

The `.ssp-progress-fill` selector is already wired to the existing `onUpdate` — no JS changes needed.

- [ ] **Step 6: Upgrade the section header.** Replace the `absolute top-10 left-12` header block with a stronger mark:

```tsx
<div className="absolute top-10 left-12 z-20 flex items-center gap-4">
  <span className="w-10 h-px bg-violet-400/60" />
  <span className="font-body text-[10px] font-semibold text-violet-300/80 uppercase tracking-[0.35em]">
    Motion Dossier
  </span>
  <span className="font-heading italic text-white/40 text-sm">— Four Beats</span>
</div>
```

- [ ] **Step 7: Verify.**

```
npm run lint && npm run build
```
Expect clean. Manual: scroll through `/gsap` hero → split scroll. Each beat should feel like a chapter flip: text morph-blur out, image settles-in with scale relax, massive ghost numeral behind the title, progress rail fills with chapter ticks.

- [ ] **Step 8: Commit.**

```bash
git add src/components/gsap/SplitScrollProjects.tsx
git commit -m "feat(gsap): sharpen split-scroll with chapter numerals, blur morph, parallax"
```

---

## Task 3: Create `GsapLower` — kinetic editorial lower sections

**Files:**
- Create: `src/components/gsap/GsapLower.tsx`

Direction: asymmetric, directional, motion-cued. Three parts in one file: `Approach` / `Capabilities` / `Start a Motion-Driven Project`. Single section wrapper with three sub-blocks sharing one GSAP `useGSAP` scope.

- [ ] **Step 1: Create the component.**

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { bio, skills, education, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

export default function GsapLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      gsap.from(".gl-chapter", {
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".gl-cap", {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gl-caps", start: "top 85%", once: true },
      });
      gsap.from(".gl-evidence-row", {
        opacity: 0,
        x: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gl-evidence", start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      {/* ── APPROACH ───────────────────────────── */}
      <section id="about" className="relative py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 gl-chapter">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">Chapter A</span>
            </div>
            <h2 className="font-heading italic text-white text-5xl md:text-6xl leading-[0.95] tracking-tight">Approach.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 gl-chapter">
            <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-[52ch]">
              {bio}
            </p>
            <div className="mt-8 flex items-center gap-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              <span>DkIT — BSc (Hons) 2025</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Cloud · Full-Stack · Motion</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ───────────────────────── */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 gl-chapter">
            <h3 className="font-heading italic text-white/90 text-3xl md:text-4xl tracking-tight">Capabilities</h3>
            <span className="text-[10px] font-body text-white/40 uppercase tracking-[0.25em]">{String(skills.length).padStart(2, "0")} Tools</span>
          </div>
          <div className="gl-caps flex flex-wrap gap-x-8 gap-y-3 max-w-4xl">
            {skills.map((s, i) => (
              <span key={s} className="gl-cap font-heading italic text-white/80 text-2xl md:text-3xl leading-none">
                {s}
                {i < skills.length - 1 && <span className="text-violet-400/50 ml-8">/</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVIDENCE (transcripts) ─────────────── */}
      <section id="resume" className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/[0.06] gl-evidence">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">Chapter B</span>
            </div>
            <h3 className="font-heading italic text-white text-5xl md:text-6xl leading-[0.95] tracking-tight mb-4">Evidence.</h3>
            <p className="text-white/45 font-body text-sm leading-relaxed max-w-[28ch]">
              Academic records from Dundalk Institute of Technology, {education[1].period.split(" ")[0]} — 2025.
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {transcripts.map((t) => (
                <li key={`${t.year}-${t.label}`} className="gl-evidence-row group flex items-center justify-between gap-4 py-5">
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="font-heading italic text-violet-300/70 text-xl tabular-nums shrink-0 w-14">{t.year}</span>
                    <span className="font-body text-white/75 text-sm md:text-base truncate">{t.title}</span>
                  </div>
                  <a
                    href={t.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-body font-semibold text-white/50 group-hover:text-violet-300 uppercase tracking-[0.2em] transition-colors shrink-0"
                  >
                    View
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── START A MOTION-DRIVEN PROJECT ──────── */}
      <section id="contact" className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8 gl-chapter">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.35em]">Final Chapter</span>
            </div>
            <h2 className="font-heading italic text-white text-6xl md:text-8xl leading-[0.9] tracking-tight">
              Start a<br/>motion-driven<br/>
              <span className="text-violet-300/80">project.</span>
            </h2>
          </div>
          <div className="md:col-span-4 gl-chapter">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-between gap-3 py-4 border-b border-white/20 hover:border-violet-300/80 transition-colors group"
              >
                <span className="font-body text-white/80 text-sm">{contact.email}</span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-violet-300 transition-colors" />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-3 py-4 border-b border-white/20 hover:border-violet-300/80 transition-colors group"
              >
                <span className="font-body text-white/80 text-sm">{contact.githubLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-violet-300 transition-colors" />
              </a>
            </div>
            <p className="mt-8 text-[10px] text-white/25 font-body uppercase tracking-[0.2em]">
              © 2026 Chee Pheng Ng
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `GsapHomePage.tsx`.** Replace the three lower imports and the three lower components:

Remove:
```tsx
import AboutContent from "@/components/AboutContent";
import TranscriptsContent from "@/components/TranscriptsContent";
import ContactContent from "@/components/ContactContent";
```
Add:
```tsx
import GsapLower from "@/components/gsap/GsapLower";
```

Replace the section between `<SplitScrollProjects />` and `<ScrollToTop />` (removing the section-dividers around About/Transcripts/Contact) with:
```tsx
      <div className="section-divider" />
      <GsapLower />
```

The `<AboutContent theme="gsap" />` block that was between the hero and SplitScrollProjects is gone now — GsapLower contains Approach. The page becomes: Hero → section-divider → SplitScrollProjects → section-divider → GsapLower.

- [ ] **Step 3: Verify.** `npm run lint && npm run build`. Manual: `/gsap` scrolls Hero → split scroll → Approach → Capabilities → Evidence → Start a project. Each block asymmetric. No duplicate About section.

- [ ] **Step 4: Commit.**

```bash
git add src/components/gsap/GsapLower.tsx src/pages/GsapHomePage.tsx
git commit -m "feat(gsap): replace generic lower sections with kinetic editorial chapters"
```

---

## Task 4: Create `BoldLower` — statement manifesto lower sections

**Files:**
- Create: `src/components/bold/BoldLower.tsx`
- Modify: `src/pages/BoldTypePage.tsx`

Direction: high-contrast typographic statement. Three parts: `Manifesto` / `Strengths` / `Commission`. Pure black, oversized type, minimal ornament.

- [ ] **Step 1: Create the component.**

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bio, skills, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

const manifestoLines = [
  "Build software",
  "that earns attention.",
  "Every pixel. Every beat.",
];

export default function BoldLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      gsap.from(".bl-line", {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: ".bl-manifesto", start: "top 80%", once: true },
      });
      gsap.from(".bl-strength", {
        opacity: 0,
        x: -30,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bl-strengths", start: "top 85%", once: true },
      });
      gsap.from(".bl-doc", {
        opacity: 0,
        y: 20,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".bl-docs", start: "top 85%", once: true },
      });
      gsap.from(".bl-cta-word", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: { trigger: ".bl-cta", start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative bg-black">
      {/* ── MANIFESTO ─────────────────────────── */}
      <section id="about" className="bl-manifesto relative py-32 md:py-40 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 01 · Manifesto</span>
          </div>
          <h2 className="font-heading font-black text-white uppercase text-6xl md:text-9xl leading-[0.85] tracking-tight">
            {manifestoLines.map((line, i) => (
              <span key={i} className="block bl-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-12 text-white/50 font-body text-base md:text-lg leading-relaxed max-w-[56ch] border-l-2 border-white pl-6">
            {bio}
          </p>
        </div>
      </section>

      {/* ── STRENGTHS ─────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 02 · Strengths</span>
          </div>
          <ul className="bl-strengths grid sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-12 max-w-5xl">
            {skills.map((s, i) => (
              <li key={s} className="bl-strength flex items-baseline gap-4 border-b border-white/15 py-4">
                <span className="font-body text-xs text-white/40 font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-heading font-black uppercase text-white text-xl md:text-2xl tracking-tight">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── DOCUMENTS (transcripts) ────────────── */}
      <section id="resume" className="relative py-24 md:py-32 px-6 md:px-16 border-t-2 border-white/10 bl-docs">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 03 · Documents</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {transcripts.map((t) => (
              <a
                key={`${t.year}-${t.label}`}
                href={t.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bl-doc group relative p-6 border-2 border-white/15 hover:border-white hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-heading font-black text-white text-3xl block leading-none mb-2">{t.year}</span>
                    <span className="text-[10px] font-body font-bold text-white/50 uppercase tracking-[0.2em] block mb-1">{t.label}</span>
                    <span className="font-body text-white/80 text-sm">{t.title}</span>
                  </div>
                  <span className="text-[10px] font-body font-bold text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">View →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMISSION ────────────────────────── */}
      <section id="contact" className="bl-cta relative py-40 md:py-56 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 04 · Commission</span>
            <span className="w-12 h-0.5 bg-white" />
          </div>
          <h2 className="font-heading font-black text-white uppercase text-7xl md:text-[12rem] leading-[0.82] tracking-tighter">
            <span className="block bl-cta-word">COMMISSION</span>
            <span className="block bl-cta-word text-white/20">A BUILD.</span>
          </h2>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 max-w-2xl mx-auto">
            <a
              href={`mailto:${contact.email}`}
              className="flex-1 w-full px-8 py-5 bg-white text-black font-body font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              Email →
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full px-8 py-5 border-2 border-white text-white font-body font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              GitHub →
            </a>
          </div>
          <p className="mt-20 text-[10px] text-white/30 font-mono uppercase tracking-[0.3em]">
            © 2026 · CHEE PHENG NG · ALL RIGHTS RESERVED
          </p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `BoldTypePage.tsx`.**

Remove the three imports (`AboutContent`, `TranscriptsContent`, `ContactContent`) and add `import BoldLower from "@/components/bold/BoldLower";`. Replace the three JSX tags with `<BoldLower />`.

- [ ] **Step 3: Verify.** `npm run lint && npm run build`. Manual: `/bold` scrolls Hero → masonry → manifesto → strengths → documents → commission. Every section hard-edged, no rounded corners, black bg throughout.

- [ ] **Step 4: Commit.**

```bash
git add src/components/bold/BoldLower.tsx src/pages/BoldTypePage.tsx
git commit -m "feat(bold): replace generic lower sections with statement manifesto"
```

---

## Task 5: Create `CaseStudyLower` — editorial dossier lower sections

**Files:**
- Create: `src/components/casestudy/CaseStudyLower.tsx`
- Modify: `src/pages/CaseStudiesPage.tsx`

Direction: magazine dossier. Three parts: `Role & Approach` / `Evidence` / `Discuss a Project`. Inherits the `editorial-row` rule-based rhythm already established in Task 4 from the previous plan.

- [ ] **Step 1: Create the component.**

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { bio, skills, education, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

export default function CaseStudyLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      gsap.from(".cl-block", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-16">
      {/* ── ROLE & APPROACH ───────────────────── */}
      <section id="about" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">§</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Role &amp; Approach
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              On the author.
            </h2>
            <p className="font-body text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-[56ch] first-letter:font-heading first-letter:italic first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-white">
              {bio}
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mt-10 pt-8 border-t border-white/[0.08]">
              <div>
                <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 mb-3">Discipline</span>
                <ul className="space-y-1">
                  {skills.slice(0, 7).map((s) => (
                    <li key={s} className="font-body text-white/70 text-sm">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 mb-3">Education</span>
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.period}>
                      <div className="font-body text-white/70 text-sm">{e.degree}</div>
                      <div className="font-body text-white/40 text-xs mt-0.5">{e.school} · {e.period}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVIDENCE ──────────────────────────── */}
      <section id="resume" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">Ev.</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Evidence
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              Transcripts &amp; records.
            </h2>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {transcripts.map((t) => (
                <li key={`${t.year}-${t.label}`} className="flex items-baseline justify-between gap-6 py-5">
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="font-heading italic text-white/30 text-2xl tabular-nums shrink-0 w-16">{t.year}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-white/40 mb-0.5">{t.label}</div>
                      <div className="font-body text-white/75 text-sm md:text-base truncate">{t.title}</div>
                    </div>
                  </div>
                  <a
                    href={t.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-white/60 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors shrink-0"
                  >
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── DISCUSS A PROJECT ─────────────────── */}
      <section id="contact" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">Fin.</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Correspondence
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              Discuss a project.
            </h2>
            <p className="font-body text-white/55 text-base md:text-lg leading-relaxed max-w-[52ch] mb-10">
              Briefs, commissions, and collaborations welcome. Written replies within two working days.
            </p>
            <dl className="space-y-6">
              <div className="flex items-baseline gap-6 border-b border-white/[0.08] pb-4">
                <dt className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 w-24 shrink-0">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="font-body text-white/85 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-6 border-b border-white/[0.08] pb-4">
                <dt className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 w-24 shrink-0">Repos</dt>
                <dd>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="font-body text-white/85 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors">
                    {contact.githubLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-12 text-[10px] font-body text-white/25 uppercase tracking-[0.25em]">
              Colophon — Set in Instrument Serif &amp; Barlow. © 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `CaseStudiesPage.tsx`.**

Remove the three imports, add `import CaseStudyLower from "@/components/casestudy/CaseStudyLower";`. Replace the three JSX tags with `<CaseStudyLower />`.

- [ ] **Step 3: Verify.** `npm run lint && npm run build`. Manual: `/case-studies` scrolls Hero → numbered editorial case study rows → Role & Approach (with drop-cap) → Evidence → Discuss a project. All using the `editorial-row` rule rhythm — fully consistent dossier feel.

- [ ] **Step 4: Commit.**

```bash
git add src/components/casestudy/CaseStudyLower.tsx src/pages/CaseStudiesPage.tsx
git commit -m "feat(case-studies): replace generic lower sections with editorial dossier"
```

---

## Task 6: Final verification

- [ ] **Step 1: Lint + build clean.**

```
npm run lint && npm run build
```

- [ ] **Step 2: Route walk (dev server).**

```
npm run dev
```

Check each route:
- `/` — Hub unchanged (still uses HubAbout/HubResume/ContactContent-gsap)
- `/gsap` — new SplitScrollProjects drama + Approach/Capabilities/Evidence/Start chapters
- `/case-studies` — editorial hero + numbered rows + Role/Evidence/Discuss dossier
- `/bold` — brutalist hero + tiles + Manifesto/Strengths/Documents/Commission
- `/cinematic` — unchanged (still uses shared AboutContent/TranscriptsContent/ContactContent, which is the "restrained supporting layout" wanted)

- [ ] **Step 3: Squint test.** Four routes should now visually end differently. No two lower sections should be mistakable for each other.

- [ ] **Step 4: Mobile check (≤768px).** Each variant should stack cleanly, no horizontal overflow, reduced-motion still honored (every new useGSAP checks `reducedMotion`).

---

## Out of scope (deferred)

- Editing `AboutContent`/`TranscriptsContent`/`ContactContent` — still used by `/` and `/cinematic` exactly as-is.
- `/cinematic` CinematicProjectGrid redesign — separate concern.
- Per-route accent colors beyond what each variant already applies.
- Removing the shared components (they're still used; removal would be a later cleanup if the user later bespokes `/cinematic` too).

## Verification summary

After all 6 tasks:
1. `npm run lint && npm run build` → clean
2. Five routes each feel distinct below the fold
3. Shared `AboutContent`/`TranscriptsContent`/`ContactContent` still used only by `/` (contact) and `/cinematic` (all three)
4. No new data duplication — bio/skills/education/contact all imported from `src/data/profile.ts`
5. Reduced-motion honored in every new component
