import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CharSplit from "@/components/CharSplit";
import { ChevronDown } from "lucide-react";
import { scrollTo } from "@/lib/scrollTo";

export default function GsapHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const section = sectionRef.current;

      // Parallax on gradient orbs
      const orbs = section.querySelectorAll<HTMLElement>(".hero-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: (i + 1) * -80,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Subtitle reveal
      const subtitleChars = section.querySelectorAll(".subtitle-char");
      gsap.from(subtitleChars, {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.8,
      });

      // Badge fade in
      gsap.from(".hero-badge", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        delay: 1.2,
      });

      // CTA buttons
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        delay: 1.4,
      });

      // Scroll indicator fade out on scroll
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const subtitleText = "Full Stack Developer";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient mesh background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-orb absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-violet-500/[0.07] rounded-full blur-[140px]" />
        <div className="hero-orb absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-indigo-500/[0.06] rounded-full blur-[120px]" />
        <div className="hero-orb absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-cyan-500/[0.05] rounded-full blur-[110px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main heading */}
        <CharSplit
          text="CHEE PHENG"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading italic font-bold tracking-tight text-white"
          trigger={false}
        />

        {/* Subtitle */}
        <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-white/50 font-body">
          {subtitleText.split("").map((char, i) => (
            <span key={i} className="subtitle-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        {/* Badge */}
        <div className="hero-badge mt-6 md:mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md text-xs sm:text-sm text-white/50 font-body">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to Work &middot; Cloud Computing Graduate &middot; DkIT 2025
        </div>

        {/* CTA buttons */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="hero-cta px-6 py-2.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 text-sm font-body font-medium hover:bg-violet-500/25 transition-colors"
          >
            View Projects
          </button>
          <a
            href="https://github.com/CheePheng"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta px-6 py-2.5 rounded-full border border-white/[0.08] text-white/60 text-sm font-body font-medium hover:text-white/80 hover:border-white/15 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-[0.2em] font-body">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
