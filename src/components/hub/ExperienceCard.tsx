import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/data/experiences";
import { ACCENT_CLASSES } from "@/data/experiences";

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLButtonElement>(null);
  const accent = ACCENT_CLASSES[experience.accent];

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;
      const onEnter = () =>
        gsap.to(el, { y: -4, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out" });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <button
      ref={cardRef}
      onClick={() => navigate(experience.path)}
      className={`
        group relative text-left rounded-2xl overflow-hidden w-full
        bg-white/[0.04] backdrop-blur-md
        border border-white/[0.08]
        hover:border-white/20 hover:bg-white/[0.06]
        transition-colors duration-300
        ${accent.glow}
        focus:outline-none focus-visible:ring-2 ${accent.ring}
      `}
      aria-label={`Open ${experience.label} experience`}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl leading-none">{experience.icon}</span>
          <span
            className={`text-[10px] font-body font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full ${accent.bg} ${accent.text}`}
          >
            {experience.tagline}
          </span>
        </div>
        <h3 className="font-heading italic text-2xl text-white mb-1">
          {experience.label}
        </h3>
        <p className="font-body text-sm text-white/50 leading-relaxed">
          {experience.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-white/50 group-hover:text-white/70 transition-colors">
          <span className="font-body uppercase tracking-[0.15em]">Enter</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}
