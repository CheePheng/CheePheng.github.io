export type ExperienceAccent = "violet" | "amber" | "white" | "cyan";

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
    label: "Case Studies",
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

// Tailwind class lookups for accent colors
export const ACCENT_CLASSES: Record<
  ExperienceAccent,
  { bg: string; text: string; ring: string; glow: string }
> = {
  violet: {
    bg: "bg-violet-500/15",
    text: "text-violet-300",
    ring: "ring-violet-400/40",
    glow: "shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)]",
  },
  amber: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    ring: "ring-amber-400/40",
    glow: "shadow-[0_0_60px_-15px_rgba(251,191,36,0.5)]",
  },
  white: {
    bg: "bg-white/15",
    text: "text-white",
    ring: "ring-white/30",
    glow: "shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]",
  },
  cyan: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    ring: "ring-cyan-400/40",
    glow: "shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]",
  },
};
