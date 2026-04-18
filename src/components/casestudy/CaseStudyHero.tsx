import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CharSplit from "@/components/CharSplit";

const FRAMINGS = [
  { label: "Bold Type", tagline: "Graphic, high-contrast", path: "/bold" },
  { label: "192 Frames", tagline: "Immersive, frame-by-frame", path: "/cinematic" },
  { label: "Hub", tagline: "Floating-islands 3D", path: "/hub" },
] as const;

export default function CaseStudyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".cs-hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.6,
      });

      gsap.from(".cs-hero-meta", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.9,
      });

      gsap.from(".cs-hero-framing-item", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "expo.out",
        delay: 1.15,
        stagger: 0.07,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden"
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
        />

        <p className="cs-hero-subtitle mt-6 text-base md:text-lg font-body font-light text-white/70 max-w-2xl leading-relaxed">
          Full-stack engineer · BSc (Hons) Computing, DkIT 2025 · Open for graduate roles, Ireland or remote.
        </p>

        <div className="cs-hero-meta mt-8 flex items-center gap-6 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/55">
          <span>Volume I</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Four Studies</span>
          <span className="h-px w-8 bg-white/20" />
          <span>2023 — 2025</span>
        </div>

        {/* Other framings — final piece of the hero composition */}
        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
          <span className="cs-hero-framing-item shrink-0 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/45 md:pt-1">
            Also read as
          </span>
          <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3">
            {FRAMINGS.map((f) => (
              <li key={f.path} className="cs-hero-framing-item">
                <Link
                  to={f.path}
                  className="group relative inline-flex items-baseline gap-2.5 pb-1 text-white/75 transition-colors hover:text-white
                             after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
                             after:origin-left after:scale-x-0 after:bg-white/50
                             after:transition-transform after:duration-300 after:ease-out
                             hover:after:scale-x-100"
                >
                  <span className="font-heading italic text-lg md:text-xl leading-none">
                    {f.label}
                  </span>
                  <span className="text-xs font-body text-white/40 transition-colors group-hover:text-white/65">
                    {f.tagline}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-all duration-300 ease-out group-hover:text-white/80 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
