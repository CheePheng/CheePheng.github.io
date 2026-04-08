import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CharSplit from "@/components/CharSplit";

/**
 * GSAP hero — kinetic editorial.
 * - Oversized italic heading (CharSplit mask reveal)
 * - 3 background marquee word-rows at different speeds + opacities
 * - Spotlight cursor (radial gradient follows pointer)
 * - Gradient mesh + grain noise
 */

const MARQUEE_ROWS = [
  "MOTION · SCROLL · INTERACTION · TIMING · GSAP · SCROLLTRIGGER · EASE · STAGGER · REVEAL ·",
  "KINETIC · CHOREOGRAPHY · RHYTHM · TENSION · RELEASE · PIN · SCRUB · TIMELINE · TRANSFORM ·",
  "PARALLAX · MORPH · SPLIT · MASK · DELAY · DURATION · SEQUENCE · LOOP · FRAME · TWEEN ·",
];

export default function GsapHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Spotlight cursor (pointer-follow radial gradient)
  useEffect(() => {
    if (reducedMotion) return;
    const el = spotlightRef.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.background = `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(167,139,250,0.12), transparent 60%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    tick();
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;
      const section = sectionRef.current;

      // Tagline stagger
      gsap.from(section.querySelectorAll(".gsap-hero-tag > span"), {
        opacity: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.9,
      });

      // Scroll cue fade out
      gsap.to(".gsap-hero-cue", {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // Marquee parallax drift on scroll
      section.querySelectorAll<HTMLElement>(".gsap-marquee").forEach((m, i) => {
        gsap.to(m, {
          xPercent: i % 2 === 0 ? -20 : 20,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] -left-[15%] w-[700px] h-[700px] bg-violet-600/[0.12] rounded-full blur-[180px]" />
        <div className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] bg-indigo-500/[0.10] rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] left-[30%] w-[500px] h-[500px] bg-fuchsia-500/[0.07] rounded-full blur-[140px]" />
      </div>

      {/* Background marquee word-rows */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col justify-around py-20"
        aria-hidden="true"
      >
        {MARQUEE_ROWS.map((row, i) => (
          <div
            key={i}
            className="gsap-marquee whitespace-nowrap font-heading italic text-white/[0.04] select-none"
            style={{
              fontSize: `${i === 1 ? 13 : i === 0 ? 10 : 11}vw`,
              letterSpacing: "-0.02em",
              animation: `gsap-marquee-${i} ${30 + i * 8}s linear infinite`,
              willChange: "transform",
            }}
          >
            {row.repeat(3)}
          </div>
        ))}
      </div>

      {/* Spotlight cursor overlay */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      {/* Noise grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="gsap-hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#gsap-hero-noise)" />
        </svg>
      </div>

      {/* Content — asymmetric, left-aligned, oversized */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Top meta label */}
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <span className="w-8 h-px bg-violet-400/60" />
          <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">
            Motion Chapter · 01
          </span>
        </div>

        {/* Main heading — huge italic */}
        <CharSplit
          text="CHEE PHENG"
          className="block text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] font-heading italic font-bold tracking-[-0.04em] text-white"
          trigger={false}
        />

        {/* Tagline — stacked, oversized, italic */}
        <div className="gsap-hero-tag mt-8 md:mt-12 text-3xl md:text-5xl lg:text-6xl font-heading italic leading-[1.05] text-white/80 max-w-[900px]">
          <span className="block">Motion is</span>
          <span className="block">the design—</span>
          <span className="block text-violet-300/90">not the decoration.</span>
        </div>
      </div>

      {/* Scroll cue — bottom right */}
      <div className="gsap-hero-cue absolute bottom-10 right-10 flex items-center gap-3 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em] font-body">
          Scroll
        </span>
        <span className="w-12 h-px bg-white/30" />
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes gsap-marquee-0 { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @keyframes gsap-marquee-1 { from { transform: translateX(-33.33%); } to { transform: translateX(0); } }
        @keyframes gsap-marquee-2 { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @media (prefers-reduced-motion: reduce) {
          .gsap-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
