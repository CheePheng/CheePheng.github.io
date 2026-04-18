import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects, categoryLabels } from "@/data/projects";
import type { ProjectStatus } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Picture from "@/components/Picture";
import NextCaseStudy from "@/components/casestudy/NextCaseStudy";
import ScrollToTop from "@/components/ScrollToTop";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "source-available": "Source available",
  archived: "Archived",
  "in-progress": "In progress",
};

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/50">
        {label}
      </dt>
      <dd className="text-sm font-body text-white/80">{value}</dd>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const project = projects.find((p) => p.slug === slug);

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

      gsap.from(".detail-hero", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".detail-hero img",
        { filter: "grayscale(1)" },
        { filter: "grayscale(0)", duration: 1.2, ease: "power2.out", delay: 0.15 },
      );

      gsap.from(".detail-heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".detail-meta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.35,
        stagger: 0.04,
      });

      gsap.from(".detail-section", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
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
      <div className="flex min-h-screen items-center justify-center bg-[#0f0c08]">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-heading italic text-white">404</h1>
          <p className="mb-4 text-lg text-white/55 font-body">Project not found</p>
          <Link
            to="/case-studies"
            className="text-sm font-body text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/30"
          >
            Back to case studies
          </Link>
        </div>
      </div>
    );
  }

  const hasMeta =
    project.role || project.timeline || project.status || project.category;

  return (
    <div className="min-h-screen relative bg-[#0f0c08]">
      <Navbar theme="editorial" />

      <main
        ref={mainRef}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24"
      >
        <button
          onClick={() => navigate(-1)}
          className="detail-meta inline-flex items-center gap-2 text-sm font-body text-white/55 hover:text-white/80 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="detail-meta mb-5">
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50">
            {categoryLabels[project.category]} &mdash; Case Study
          </span>
        </div>

        {project.thumbnail && (
          <div className="detail-hero relative aspect-[4/3] md:aspect-[16/9] overflow-hidden mb-10 md:mb-14">
            <Picture
              src={project.thumbnail}
              alt={project.thumbnailAlt ?? `${project.name} — project still`}
              loading="eager"
              decoding="async"
              imgClassName="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
          </div>
        )}

        <h1 className="detail-heading font-heading italic text-white text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] mb-8">
          {project.name}
        </h1>

        <p className="detail-meta font-body font-light text-white/70 text-lg md:text-xl leading-relaxed max-w-[62ch] mb-16">
          {project.description}
        </p>

        {hasMeta && (
          <>
            <dl className="detail-meta grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-6">
              {project.role && <MetaRow label="Role" value={project.role} />}
              {project.timeline && (
                <MetaRow label="Timeline" value={project.timeline} />
              )}
              {project.status && (
                <MetaRow label="Status" value={STATUS_LABEL[project.status]} />
              )}
              <MetaRow
                label="Stack"
                value={project.tech.slice(0, 3).join(" · ")}
              />
            </dl>
            <div className="h-px bg-white/10 mb-16" />
          </>
        )}

        <div className="detail-sections space-y-16">
          {project.techDepth && (
            <section className="detail-section">
              <p className="font-heading italic text-white/85 text-xl md:text-2xl leading-relaxed max-w-[58ch]">
                &ldquo;{project.techDepth}&rdquo;
              </p>
              <p className="mt-3 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/50">
                Key decision
              </p>
            </section>
          )}

          {project.problem && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                The problem
              </h2>
              <p className="md:col-span-9 text-white/75 font-body text-base md:text-lg leading-relaxed max-w-[62ch]">
                {project.problem}
              </p>
            </section>
          )}

          {project.solution && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                The solution
              </h2>
              <p className="md:col-span-9 text-white/75 font-body text-base md:text-lg leading-relaxed max-w-[62ch]">
                {project.solution}
              </p>
            </section>
          )}

          {project.architecture && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                Architecture
              </h2>
              <p className="md:col-span-9 text-white/70 font-body text-base leading-relaxed max-w-[62ch]">
                {project.architecture}
              </p>
            </section>
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                Responsibilities
              </h2>
              <ul className="md:col-span-9 space-y-3 max-w-[62ch]">
                {project.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-white/70 font-body text-base leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="font-body font-mono text-[10px] text-white/50 tabular-nums pt-2 shrink-0 w-6"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <section className="detail-section">
              <h2 className="text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 mb-8">
                Challenges &amp; resolutions
              </h2>
              <div className="space-y-10">
                {project.challenges.map((c, i) => (
                  <div key={i} className="max-w-[68ch]">
                    <p className="font-heading italic text-white/85 text-lg md:text-xl leading-relaxed mb-4">
                      {c.problem}
                    </p>
                    <div className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="font-body font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 pt-1 shrink-0"
                      >
                        Resolution
                      </span>
                      <p className="text-white/65 font-body text-base leading-relaxed">
                        {c.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.outcomes && project.outcomes.length > 0 && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                Outcomes
              </h2>
              <ul className="md:col-span-9 space-y-2 max-w-[62ch]">
                {project.outcomes.map((item, i) => (
                  <li
                    key={i}
                    className="text-white/70 font-body text-base leading-relaxed border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.impact && !project.outcomes && (
            <section className="detail-section grid md:grid-cols-12 gap-6 md:gap-10">
              <h2 className="md:col-span-3 text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 pt-2">
                Impact
              </h2>
              <p className="md:col-span-9 text-white/70 font-body text-base leading-relaxed max-w-[62ch]">
                {project.impact}
              </p>
            </section>
          )}

          <section className="detail-section">
            <h2 className="text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-white/50 mb-5">
              Built with
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[11px] font-body font-medium bg-white/[0.06] text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="h-px bg-white/10 my-12" />

        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-body font-semibold hover:bg-white/90 transition-colors"
            >
              Try live
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white/80 text-sm font-body font-medium hover:text-white hover:border-white/30 transition-colors"
            >
              <Github className="w-4 h-4" />
              View source
            </a>
          ) : project.status === "source-available" ? (
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/55 text-sm font-body">
              Source available on request
            </span>
          ) : null}
        </div>
      </main>

      <NextCaseStudy currentSlug={project.slug} />

      <ScrollToTop />
    </div>
  );
}
