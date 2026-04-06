import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function MasonryProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".masonry-card", {
        opacity: 0,
        y: 50,
        stagger: 0.08,
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
      className="relative bg-black py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-px bg-violet-500/50" />
          <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/30">
            Projects
          </span>
        </div>

        {/* CSS grid masonry-like layout */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {projects.map((project) => {
            const isFeatured = project.featured;
            const repoUrl = `https://github.com/CheePheng/${project.repo}`;
            const detailUrl = `/projects/${project.slug}`;

            return (
              <div
                key={project.slug}
                className="masonry-card group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
                style={isFeatured ? { gridRow: "span 2" } : undefined}
              >
                {/* Background thumbnail */}
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                ) : null}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Content */}
                <div
                  className={`relative z-10 flex flex-col justify-end p-6 ${
                    isFeatured ? "min-h-[320px]" : "min-h-[180px]"
                  }`}
                >
                  {/* Category */}
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
                    {project.category}
                  </span>

                  {/* Name — always visible */}
                  <h3
                    className={`font-heading font-black uppercase text-white tracking-tight leading-none mb-3 ${
                      isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {project.name}
                  </h3>

                  {/* Description — only on featured */}
                  {isFeatured && (
                    <p className="text-white/40 font-body text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Tech stack — reveal on hover */}
                  <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 mb-4">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-white/10 text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-3">
                    {isFeatured ? (
                      <Link
                        to={detailUrl}
                        className="inline-flex items-center gap-1 text-xs font-body font-medium text-white/50 hover:text-white transition-colors"
                      >
                        Case Study
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-body font-medium text-white/50 hover:text-white transition-colors"
                      >
                        GitHub
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
