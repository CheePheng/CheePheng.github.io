import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollFrameHero from "@/components/ScrollFrameHero";
import AboutContent from "@/components/AboutContent";
import TranscriptsContent from "@/components/TranscriptsContent";
import ContactContent from "@/components/ContactContent";
import ScrollToTop from "@/components/ScrollToTop";
import { projects, techColors } from "@/data/projects";

function CinematicProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".cinematic-project-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 py-20 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="glow-dot" />
          <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">
            Projects
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading italic gradient-text tracking-tight mb-12">
          Selected Work
        </h2>

        {/* Responsive project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="cinematic-project-card premium-card rounded-xl overflow-hidden group"
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="relative h-40 overflow-hidden bg-white/[0.03]">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] to-transparent" />
                </div>
              )}

              <div className="p-5">
                {/* Category */}
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-violet-300/50 block mb-2">
                  {project.category}
                </span>

                {/* Name */}
                <h3 className="text-lg font-heading italic text-white/90 mb-2 leading-tight">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-white/40 font-body text-xs leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-body font-medium ${
                        techColors[t] ?? "bg-white/[0.06] text-white/40"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.featured ? (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-body text-violet-400/70 hover:text-violet-300 transition-colors"
                  >
                    Case Study
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <a
                    href={`https://github.com/CheePheng/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-body text-white/30 hover:text-white/60 transition-colors"
                  >
                    GitHub
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CinematicPage() {
  return (
    <div className="min-h-screen relative bg-[#07070d]">
      {/* Aurora particle background — cinematic page only */}
      <AuroraBackground />

      <Navbar theme="cinematic" />

      {/* 192-frame scroll hero — still uses Motion, will be migrated in Task 14 */}
      <ScrollFrameHero />

      {/* Content sections below the frame hero */}
      <div className="relative z-10">
        <AboutContent theme="cinematic" />
        <CinematicProjectGrid />
        <TranscriptsContent theme="cinematic" />
        <ContactContent theme="cinematic" />
      </div>

      <ScrollToTop />
    </div>
  );
}
