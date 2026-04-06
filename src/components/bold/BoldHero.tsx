import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronDown } from "lucide-react";
import { scrollTo } from "@/lib/scrollTo";

export default function BoldHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      // Filled name slides in from left
      gsap.from(".bold-name-filled", {
        x: -120,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.1,
      });

      // Outline name slides in from right
      gsap.from(".bold-name-outline", {
        x: 120,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.2,
      });

      // Accent line + subtitle
      gsap.from(".bold-accent", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.7,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden px-6 md:px-16 pt-24 pb-16"
    >
      {/* Asymmetric large type — left-aligned */}
      <div className="max-w-7xl">
        {/* Filled "CHEE" */}
        <div className="bold-name-filled leading-none select-none">
          <span
            className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-heading font-black uppercase text-white tracking-[-0.04em] leading-[0.85]"
          >
            CHEE
          </span>
        </div>

        {/* Outline "PHENG" — offset slightly right */}
        <div className="bold-name-outline leading-none select-none pl-[3vw]">
          <span
            className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-heading font-black uppercase tracking-[-0.04em] leading-[0.85]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            }}
          >
            PHENG
          </span>
        </div>

        {/* Accent line + subtitle */}
        <div className="bold-accent mt-8 flex items-center gap-4">
          <div className="w-10 h-px bg-violet-500/50" />
          <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/40">
            Full Stack Developer
          </span>
        </div>

        {/* CTA */}
        <div className="bold-accent mt-10 flex items-center gap-6">
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-body font-semibold hover:bg-white/90 transition-colors"
          >
            View Work
          </button>
          <a
            href="https://github.com/CheePheng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-body text-white/40 hover:text-white/70 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-body">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
