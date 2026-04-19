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

      // Bold's verb is "snap": scale + opacity only, expo.out, short.
      gsap.from(".bold-role", {
        opacity: 0,
        scale: 0.97,
        duration: 0.4,
        ease: "expo.out",
      });

      gsap.from(".bold-name-filled", {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.from(".bold-name-outline", {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: "expo.out",
        delay: 0.25,
      });

      gsap.from(".bold-accent", {
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "expo.out",
        delay: 0.5,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-[#0a0807] overflow-hidden px-6 md:px-16 pt-24 pb-16"
    >
      {/* Asymmetric large type — left-aligned */}
      <div className="max-w-7xl">
        <h1 className="sr-only">Chee Pheng — Full Stack Developer</h1>

        {/* Role label — answers "who is this" before the name lands */}
        <div className="bold-role mb-6 flex items-center gap-4">
          <div className="w-10 h-px bg-red-500/70" />
          <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/70">
            Full Stack Developer
          </span>
        </div>

        {/* Filled "CHEE" */}
        <div aria-hidden="true" className="bold-name-filled leading-none select-none">
          <span
            className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-body font-black uppercase text-white tracking-[-0.04em] leading-[0.85]"
          >
            CHEE
          </span>
        </div>

        {/* Outline "PHENG" — offset slightly right */}
        <div aria-hidden="true" className="bold-name-outline leading-none select-none pl-[3vw]">
          <span
            className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-body font-black uppercase tracking-[-0.04em] leading-[0.85]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            }}
          >
            PHENG
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
            className="text-sm font-body text-white/55 hover:text-white/70 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-body">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
