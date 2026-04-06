import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { techColors } from "@/data/projects";

interface Props {
  project: Project;
}

export default function CaseStudyCard({ project }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !cardRef.current) return;

      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className="group relative border border-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
    >
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-0">
        {/* Thumbnail */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[280px] bg-white/[0.03] overflow-hidden">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.name} screenshot`}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
            />
          ) : null}
          {/* Fallback overlay when no thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-heading italic text-white/10 select-none">
              {project.name.charAt(0)}
            </span>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070d]/60 md:block hidden" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            {/* Category + name */}
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-white/30 mb-3 block">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-heading italic text-white/90 mb-4 leading-tight">
              {project.name}
            </h3>
            <p className="text-white/50 font-body font-light text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Problem / Solution / Impact */}
            <div className="space-y-4">
              {project.problem && (
                <div>
                  <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/30 block mb-1">
                    Problem
                  </span>
                  <p className="text-white/50 font-body text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div>
                  <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/30 block mb-1">
                    Solution
                  </span>
                  <p className="text-white/50 font-body text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.impact && (
                <div>
                  <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/30 block mb-1">
                    Impact
                  </span>
                  <p className="text-white/50 font-body text-sm leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer: tech + link */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                    techColors[t] ?? "bg-white/[0.06] text-white/40"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-xs font-body font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              View Case Study
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
