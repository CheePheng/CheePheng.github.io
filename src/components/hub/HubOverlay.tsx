import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EXPERIENCES } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";

export default function HubOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;
      const tl = gsap.timeline();
      tl.from(".hub-name", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".hub-tagline",
          { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
          "-=0.5",
        )
        .from(
          ".hub-card",
          {
            opacity: 0,
            y: 24,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from(
          ".hub-hint",
          { opacity: 0, duration: 0.5, ease: "power1.out" },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-20 pointer-events-none"
    >
      {/* Heading */}
      <div className="text-center mb-10 md:mb-14 pointer-events-none">
        <h1 className="hub-name font-heading text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-3">
          CHEE PHENG
        </h1>
        <p className="hub-tagline font-body text-base md:text-lg text-white/60 italic">
          Let's build something great
        </p>
      </div>

      {/* Cards grid (pointer-events re-enabled) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full pointer-events-auto">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="hub-card">
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </div>

      {/* Hint */}
      <p className="hub-hint mt-10 md:mt-14 text-xs md:text-sm text-white/35 font-body text-center pointer-events-none">
        Switch experiences anytime using the{" "}
        <span className="text-violet-300/80 font-medium">menu</span> at the bottom-right.
      </p>
    </div>
  );
}
