import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects, techColors } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const project = projects.find((p) => p.slug === slug);

  // Update document title
  useEffect(() => {
    if (project) {
      document.title = `Chee Pheng — ${project.name}`;
    }
    return () => {
      document.title = "Chee Pheng";
    };
  }, [project]);

  useGSAP(
    () => {
      if (reducedMotion || !mainRef.current || !project) return;

      gsap.from(".detail-heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".detail-meta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.35,
      });

      gsap.from(".detail-section", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".detail-sections",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: mainRef, dependencies: [project, reducedMotion] },
  );

  if (!project || !project.featured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-heading italic gradient-text">404</h1>
          <p className="mb-4 text-lg text-white/40 font-body">Project not found</p>
          <Link
            to="/"
            className="text-violet-400 font-body hover:text-violet-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#07070d]">
      {/* Subtle gradient mesh */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/[0.025] rounded-full blur-[140px]" />
      </div>

      <Navbar theme="editorial" />

      <div ref={mainRef} className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="detail-meta inline-flex items-center gap-2 text-sm font-body text-white/40 hover:text-white/70 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Category label */}
        <div className="detail-meta mb-4">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-white/30">
            {project.category} &mdash; Case Study
          </span>
        </div>

        {/* Project name */}
        <h1 className="detail-heading text-5xl sm:text-6xl md:text-7xl font-heading italic text-white/90 tracking-tight leading-none mb-6">
          {project.name}
        </h1>

        {/* Overview */}
        <p className="detail-meta text-lg font-body font-light text-white/50 leading-relaxed max-w-2xl mb-4">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="detail-meta flex flex-wrap gap-2 mb-12">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-3 py-1 rounded-full text-xs font-body font-medium ${
                techColors[t] ?? "bg-white/[0.06] text-white/40"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Case study sections */}
        <div className="detail-sections space-y-12">
          {project.problem && (
            <div className="detail-section">
              <h2 className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                The Problem
              </h2>
              <p className="text-white/60 font-body font-light text-base leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="detail-section">
              <h2 className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                The Solution
              </h2>
              <p className="text-white/60 font-body font-light text-base leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {project.impact && (
            <div className="detail-section">
              <h2 className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                Impact
              </h2>
              <p className="text-white/60 font-body font-light text-base leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] my-12" />

        {/* GitHub link */}
        <div className="flex items-center gap-6">
          <a
            href={`https://github.com/CheePheng/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] text-white/60 text-sm font-body font-medium hover:text-white/90 hover:border-white/20 transition-colors"
          >
            View on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <Link
            to="/case-studies"
            className="text-sm font-body text-white/30 hover:text-white/60 transition-colors"
          >
            All Case Studies
          </Link>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
