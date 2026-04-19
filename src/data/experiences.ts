export type ExperienceAccent = "amber" | "white" | "cyan";

export interface Experience {
  id: "case-studies" | "bold" | "cinematic";
  label: string;
  path: string;
  icon: string;
  accent: ExperienceAccent;
  tagline: string;
  description: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "case-studies",
    label: "Selected Work",
    path: "/case-studies",
    icon: "📖",
    accent: "amber",
    tagline: "Editorial",
    description: "In-depth project stories",
  },
  {
    id: "bold",
    label: "Bold Type",
    path: "/bold",
    icon: "▌",
    accent: "white",
    tagline: "Minimal",
    description: "Oversized headings & contrast",
  },
  {
    id: "cinematic",
    label: "192 Frames",
    path: "/cinematic",
    icon: "🎬",
    accent: "cyan",
    tagline: "Cinematic",
    description: "Frame-by-frame scroll animation",
  },
];

// Tailwind class lookups for accent colors.
// Calibrated for Hub's cream + ink palette: filled pills with high contrast
// preview the destination's own identity (amber=editorial, ink=bold, teal=cinematic).
export const ACCENT_CLASSES: Record<
  ExperienceAccent,
  { bg: string; text: string; ring: string; glow: string }
> = {
  amber: {
    bg: "bg-amber-600",
    text: "text-amber-50",
    ring: "ring-amber-700/50",
    glow: "shadow-[0_8px_28px_-14px_rgba(180,110,30,0.38)]",
  },
  white: {
    bg: "bg-[color:var(--hub-ink)]",
    text: "text-[color:var(--hub-bg-elev)]",
    ring: "ring-[color:var(--hub-ink)]/40",
    glow: "shadow-[0_8px_28px_-14px_rgba(40,34,26,0.30)]",
  },
  cyan: {
    bg: "bg-teal-800",
    text: "text-teal-50",
    ring: "ring-teal-800/50",
    glow: "shadow-[0_8px_28px_-14px_rgba(20,70,80,0.34)]",
  },
};
