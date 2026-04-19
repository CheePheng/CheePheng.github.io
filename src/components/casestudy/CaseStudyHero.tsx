import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CharSplit from "@/components/CharSplit";

export default function CaseStudyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".cs-hero-meta", {
        opacity: 0,
        y: 6,
        duration: 0.45,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from(".cs-hero-subtitle", {
        opacity: 0,
        y: 8,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.55,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 pb-10 md:pb-12 px-6 md:px-16 overflow-hidden"
    >
      {/* Subtle divider line at the bottom of the hero */}
      <div className="absolute bottom-0 left-6 md:left-16 right-6 md:right-16 h-px bg-white/[0.06]" />

      <div className="max-w-6xl mx-auto">
        <span className="cs-hero-meta block text-xs font-body font-semibold text-white/55 uppercase tracking-[0.2em] mb-6">
          Selected Work
        </span>

        <CharSplit
          text="Chee Pheng"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading italic text-white tracking-tight leading-none"
          trigger={false}
          variant="editorial"
        />

        <p className="cs-hero-subtitle mt-6 text-base md:text-lg font-body font-light text-white/70 max-w-2xl leading-relaxed">
          Full-stack engineer &middot; BSc Computing DkIT 2025 &middot; Available mid-2026 &middot; Ireland or remote.
        </p>
      </div>
    </section>
  );
}
