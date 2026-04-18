import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import Picture from "@/components/Picture";

interface Props {
  project: Project;
  index: number;
}

export default function CaseStudyCard({ project, index }: Props) {
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
    <article ref={cardRef} className="editorial-row group">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Number + category */}
        <div className="md:col-span-2">
          <div className="editorial-number">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/55">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-6">
          <h3 className="font-heading italic text-white text-3xl md:text-5xl leading-[1.02] tracking-tight mb-6">
            {project.name}
          </h3>
          <p className="font-body text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-[52ch]">
            {project.description}
          </p>

          {project.problem && (
            <div className="mb-4">
              <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 mb-1">Problem</span>
              <p className="text-white/55 font-body text-sm leading-relaxed max-w-[60ch]">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="mb-4">
              <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 mb-1">Solution</span>
              <p className="text-white/55 font-body text-sm leading-relaxed max-w-[60ch]">{project.solution}</p>
            </div>
          )}
          {project.impact && (
            <div className="mb-8">
              <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 mb-1">Impact</span>
              <p className="text-white/55 font-body text-sm leading-relaxed max-w-[60ch]">{project.impact}</p>
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-body font-medium bg-white/[0.06] text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-white/60 hover:text-white/95 transition-colors border-b border-white/20 hover:border-white/60 pb-0.5"
            >
              Read case study
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Thumbnail — asymmetric, grayscale, no rounded card */}
        <div className="md:col-span-4">
          {project.thumbnail ? (
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
              <Picture
                src={project.thumbnail}
                alt={project.thumbnailAlt ?? `${project.name} project thumbnail`}
                imgClassName="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          ) : (
            <div className="aspect-[3/4] flex items-end justify-end">
              <span className="font-heading italic text-white/10 text-8xl leading-none">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
