import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  projects,
  techColors,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import ProjectFilters from "@/components/ProjectFilters";

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  const href = project.featured
    ? `/#/projects/${project.slug}`
    : `https://github.com/CheePheng/${project.repo}`;
  const isExternal = !project.featured;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block min-w-[280px] md:min-w-[380px] flex-shrink-0 group"
    >
      <div className="premium-card rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors h-full">
        {/* Thumbnail */}
        <div className="relative w-full h-44 md:h-52 overflow-hidden bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
          {project.thumbnail && !imgError ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl font-heading italic text-white/20">
                {project.name[0]}
              </span>
            </div>
          )}
          {project.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-medium border border-violet-500/30 backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-base font-body font-semibold text-white/90 group-hover:text-white transition-colors">
            {project.name}
          </h3>
          <p className="mt-1.5 text-xs text-white/40 font-body line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  techColors[t] ?? "bg-white/10 text-white/50"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function HorizontalScrollProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Refresh ScrollTrigger when filter changes
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const handleFilterChange = useCallback(
    (cat: ProjectCategory | "all") => {
      setActiveCategory(cat);
      // ScrollTrigger refresh is handled in useGSAP via dependency
    },
    [],
  );

  useGSAP(
    () => {
      if (reducedMotion || isMobile || !sectionRef.current || !trackRef.current)
        return;

      // Kill previous trigger if exists
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }

      // Wait a frame for DOM to update after filter change
      requestAnimationFrame(() => {
        if (!trackRef.current || !sectionRef.current) return;

        const scrollWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        if (scrollWidth <= viewportWidth) return;

        triggerRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (scrollWidth - viewportWidth),
          invalidateOnRefresh: true,
          animation: gsap.to(trackRef.current, {
            x: () => -(scrollWidth - viewportWidth),
            ease: "none",
          }),
        });
      });
    },
    {
      scope: sectionRef,
      dependencies: [activeCategory, isMobile, reducedMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-28"
    >
      {/* Section heading */}
      <div className="text-center px-4 mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="glow-dot" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-body">
            Work
          </span>
          <span className="glow-dot" />
        </div>
        <h2 className="text-3xl md:text-5xl font-heading italic gradient-text">
          Projects
        </h2>
        <p className="mt-3 text-sm text-white/40 font-body max-w-md mx-auto">
          A selection of things I&apos;ve built &mdash; from AI tools to full-stack applications.
        </p>
      </div>

      {/* Filters */}
      <ProjectFilters active={activeCategory} onChange={handleFilterChange} />

      {/* Desktop: horizontal scroll */}
      {!isMobile ? (
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-8 md:px-16 will-change-transform"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}

            {/* View All link card */}
            <a
              href="https://github.com/CheePheng?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[280px] md:min-w-[380px] flex-shrink-0 flex items-center justify-center"
            >
              <div className="premium-card rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 transition-colors p-10 text-center w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="text-2xl text-white/20">&rarr;</span>
                <span className="text-sm font-body text-white/50 hover:text-violet-300 transition-colors">
                  View All Repositories
                </span>
              </div>
            </a>
          </div>
        </div>
      ) : (
        /* Mobile: vertical grid */
        <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/CheePheng?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full border border-white/[0.08] text-white/50 text-sm font-body font-medium hover:text-violet-300 hover:border-violet-500/30 transition-colors"
            >
              View All Repositories &rarr;
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
