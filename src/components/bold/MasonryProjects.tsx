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
      className="relative bg-[#0a0807] py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-px bg-red-500/70" />
          <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/50">
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
          {projects.map((project, i) => {
            const isFeatured = project.featured;
            const repoUrl = project.repoUrl;
            const detailUrl = `/projects/${project.slug}`;

            return (
              <div
                key={project.slug}
                className="masonry-card bold-tile aspect-[4/5] relative"
                style={isFeatured ? { gridRow: "span 2" } : undefined}
              >
                {/* Background thumbnail */}
                {project.thumbnail && (
                  <picture>
                    <source srcSet={project.thumbnail.replace(/\.jpe?g$/i, ".avif")} type="image/avif" />
                    <source srcSet={project.thumbnail.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  </picture>
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <span className="bold-tile-number">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-white/70">{project.category}</span>
                  </div>
                  <div>
                    <h3 className="font-heading italic text-white text-3xl md:text-4xl leading-tight mb-3">{project.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-body font-bold uppercase tracking-wider bg-white text-black">{t}</span>
                      ))}
                    </div>
                    {(isFeatured || repoUrl) && (
                      <div className="flex items-center gap-3">
                        {isFeatured ? (
                          <Link
                            to={detailUrl}
                            className="inline-flex items-center gap-1 text-xs font-body font-medium text-white/70 hover:text-white transition-colors"
                          >
                            Case Study
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-body font-medium text-white/70 hover:text-white transition-colors"
                          >
                            GitHub
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
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
