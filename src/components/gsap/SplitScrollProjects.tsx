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
        end: () => `+=${window.innerHeight * total}`,
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
        style={{ height: `${featured.length * 100}vh` }}
      >
        <div className="ssp-pin relative h-screen w-full overflow-hidden">
          {/* Section header */}
          <div className="absolute top-10 left-12 z-20 flex items-center gap-3">
            <span className="w-8 h-px bg-violet-400/60" />
            <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">
              Selected Work · 04 Beats
            </span>
          </div>

          {/* Split layout */}
          <div className="relative h-full grid grid-cols-[1fr_1fr] gap-0">
            {/* LEFT: text column */}
            <div className="relative flex items-center px-12 lg:px-20">
              <div className="relative w-full max-w-[560px]">
                {featured.map((project, i) => (
                  <div
                    key={project.slug}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform:
                        activeIndex === i
                          ? "translateY(0)"
                          : activeIndex > i
                            ? "translateY(-20px)"
                            : "translateY(20px)",
                      transitionProperty: "opacity, transform",
                    }}
                  >
                    <div className="text-[11px] font-body font-semibold text-violet-300/60 uppercase tracking-[0.3em] mb-4">
                      {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </div>
                    <h3 className="font-heading italic text-white text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
                      {project.name}
                    </h3>
                    <p className="font-body text-white/60 text-base lg:text-lg leading-relaxed mb-6 max-w-[480px]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-3 py-1 rounded-full text-[11px] font-body font-medium ${
                            techColors[t] ?? "bg-white/[0.06] text-white/50"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-body text-violet-300 hover:text-violet-200 transition-colors group"
                    >
                      <span className="border-b border-violet-400/40 group-hover:border-violet-300 pb-0.5">
                        View Case Study
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
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
                  className="absolute inset-0 transition-all duration-1000 ease-out"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transform:
                      activeIndex === i ? "scale(1)" : "scale(1.08)",
                  }}
                >
                  {project.thumbnail ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07070d]/30 to-[#07070d]/80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/70 via-transparent to-transparent" />
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
          <div className="absolute bottom-10 left-12 right-12 flex items-center gap-4">
            <span className="text-[10px] font-body text-white/40 uppercase tracking-[0.2em] tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
              <div
                className="ssp-progress-fill absolute inset-0 bg-violet-400/60 origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="text-[10px] font-body text-white/40 uppercase tracking-[0.2em] tabular-nums">
              {String(featured.length).padStart(2, "0")}
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
