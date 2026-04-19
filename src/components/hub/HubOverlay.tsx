import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EXPERIENCES } from "@/data/experiences";
import { CONTACT } from "@/data/contact";
import ExperienceCard from "./ExperienceCard";
import { Linkedin, Github } from "lucide-react";

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
          ".hub-role",
          { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" },
          "-=0.55",
        )
        .from(
          ".hub-credential",
          { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" },
          "-=0.35",
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
          "-=0.25",
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
    <section
      ref={containerRef}
      id="projects"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-20 pointer-events-none"
    >
      {/* Off-world credibility links — upper-right of hero */}
      <nav
        aria-label="External profiles"
        className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-3 pointer-events-auto"
      >
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="inline-block p-2 text-white/70 hover:text-white focus-visible:text-white transition-[color,transform] duration-200 ease-[var(--ease-out-quart)] hover:scale-110 hover:-translate-y-0.5 focus-visible:scale-110 focus-visible:-translate-y-0.5"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="inline-block p-2 text-white/70 hover:text-white focus-visible:text-white transition-[color,transform] duration-200 ease-[var(--ease-out-quart)] hover:scale-110 hover:-translate-y-0.5 focus-visible:scale-110 focus-visible:-translate-y-0.5"
        >
          <Github size={18} />
        </a>
      </nav>

      {/* Heading block */}
      <div className="text-center mb-10 md:mb-14 pointer-events-none">
        <h1 className="hub-name font-heading text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4">
          CHEE PHENG
        </h1>
        <p className="hub-role font-body text-sm md:text-base text-white/85 tracking-wide">
          Full-stack engineer &middot; BSc (Hons) Computing, DkIT 2025
        </p>
        <p className="hub-credential font-body text-xs md:text-sm text-white/55 mt-2 max-w-xl mx-auto">
          Open for graduate roles &middot; Ireland or remote &middot; Available mid-2026
        </p>
      </div>

      {/* Cards grid (pointer-events re-enabled) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full pointer-events-auto">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="hub-card">
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </div>

      {/* Hint */}
      <p className="hub-hint hidden md:block mt-10 md:mt-14 text-xs md:text-sm text-white/50 font-body text-center pointer-events-none">
        Switch anytime from the menu at the bottom-right.
      </p>
    </section>
  );
}
