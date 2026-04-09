import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, techColors } from "@/data/projects";

/**
 * Pinned 4-beat sticky split-scroll projects.
 * Left: number, title, pitch, tags, link (morphs between beats).
 * Right: large image crossfades.
 * Mobile / reduced-motion: vertical stack, no pin.
 */

const featured = projects.filter((p) => p.featured).slice(0, 4);

export default function SplitScrollProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const usePinned = isDesktop && !reducedMotion;

  useGSAP(
    () => {
      if (!usePinned || !sectionRef.current) return;
      const section = sectionRef.current;
      const pin = section.querySelector<HTMLElement>(".ssp-pin");
      if (!pin) return;

      const total = featured.length;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * total * 0.85}`,
        pin: pin,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress * total + 0.0001),
          );
          setActiveIndex(idx);
          // progress bar fill
          const fill = section.querySelector<HTMLElement>(".ssp-progress-fill");
          if (fill) fill.style.transform = `scaleX(${self.progress})`;
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [usePinned] },
  );

  // ————— Desktop pinned ver —————
  if (usePinned) {
    return (
      <section
        ref={sectionRef}
        id="projects"
        className="relative"
        style={{ height: `${featured.length * 85}vh` }}
      >
        <div className="ssp-pin relative h-screen w-full overflow-hidden">
          {/* Section header */}
          <div className="absolute top-10 left-12 z-20 flex items-center gap-4">
            <span className="w-10 h-px bg-violet-400/60" />
            <span className="font-body text-[10px] font-semibold text-violet-300/80 uppercase tracking-[0.35em]">
              Motion Dossier
            </span>
            <span className="font-heading italic text-white/40 text-sm">— Four Beats</span>
          </div>

          {/* Split layout */}
          <div className="relative h-full grid grid-cols-[1fr_1fr] gap-0">
            {/* LEFT: text column */}
            <div className="relative flex items-center px-12 lg:px-20">
              <div className="relative w-full max-w-[560px]">
                {featured.map((project, i) => (
                  <div
                    key={project.slug}
                    className="absolute inset-0"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform:
                        activeIndex === i
                          ? "translateY(0) translateX(0)"
                          : activeIndex > i
                            ? "translateY(-40px) translateX(-20px)"
                            : "translateY(40px) translateX(20px)",
                      filter: activeIndex === i ? "blur(0px)" : "blur(6px)",
                      transitionProperty: "opacity, transform, filter",
                      transitionDuration: "900ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div className="text-[11px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.35em] mb-6 flex items-center gap-3">
                      <span className="w-6 h-px bg-violet-400/60" />
                      Chapter {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Massive ghost numeral behind heading */}
                    <div className="font-heading italic text-white/[0.06] text-[14rem] leading-[0.8] tracking-tight absolute -top-8 -left-4 pointer-events-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <h3 className="relative font-heading italic text-white text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
                      {project.name}
                    </h3>

                    <p className="relative font-body text-white/55 text-base lg:text-lg leading-relaxed mb-8 max-w-[460px]">
                      {project.description}
                    </p>

                    <div className="relative flex flex-wrap gap-2 mb-10">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="relative inline-flex items-center gap-3 text-sm font-body font-medium text-white group/link"
                    >
                      <span className="relative">
                        <span className="absolute -bottom-1 left-0 right-0 h-px bg-violet-400/60 group-hover/link:bg-violet-300 transition-colors" />
                        Read the case study
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: image column */}
            <div className="relative overflow-hidden">
              {featured.map((project, i) => (
                <div
                  key={project.slug}
                  className="absolute inset-0"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transform:
                      activeIndex === i
                        ? "scale(1.02) translateY(0)"
                        : activeIndex > i
                          ? "scale(1.12) translateY(-40px)"
                          : "scale(1.12) translateY(40px)",
                    transition: "opacity 1000ms cubic-bezier(0.22,1,0.36,1), transform 1400ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {project.thumbnail ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07070d]/20 to-[#07070d]/85" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/80 via-transparent to-[#07070d]/20" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-indigo-900/40 flex items-center justify-center">
                      <span className="font-heading italic text-white/20 text-[20vw]">
                        {project.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-12 right-12 flex items-center gap-6">
            <span className="font-heading italic text-white text-3xl leading-none tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 relative h-px bg-white/10">
              <div
                className="ssp-progress-fill absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400/80 to-violet-300/40 origin-left"
                style={{ transform: "scaleX(0)", transformOrigin: "left", height: "1px" }}
              />
              {featured.map((_, idx) => (
                <span
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/20"
                  style={{ left: `${(idx / (featured.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            <span className="font-body text-[10px] text-white/40 uppercase tracking-[0.25em] tabular-nums">
              of {String(featured.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>
    );
  }

  // ————— Mobile / reduced-motion fallback —————
  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-violet-400/60" />
          <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">
            Selected Work
          </span>
        </div>
        <div className="space-y-16">
          {featured.map((project, i) => (
            <article key={project.slug} className="group">
              <div className="text-[10px] font-body font-semibold text-violet-300/60 uppercase tracking-[0.3em] mb-3">
                {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
              </div>
              {project.thumbnail && (
                <div className="relative aspect-[16/10] mb-5 overflow-hidden rounded-sm">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/60 to-transparent" />
                </div>
              )}
              <h3 className="font-heading italic text-white text-4xl leading-[0.95] mb-3">
                {project.name}
              </h3>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-body font-medium ${
                      techColors[t] ?? "bg-white/[0.06] text-white/50"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-body text-violet-300"
              >
                View Case Study <ArrowUpRight className="w-3 h-3" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
