import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { transcripts } from "@/data/transcripts";

export default function HubResume() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".hub-resume-eyebrow", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".hub-resume-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".hub-resume-row", {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hub-resume-list",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".hub-resume-footnote", {
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".hub-resume-footnote",
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative w-full px-6 py-24 md:py-32 md:px-16 bg-[color:var(--hub-bg)]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="hub-resume-eyebrow flex items-center gap-3 mb-4">
          <span className="h-1 w-1 rounded-full bg-[color:var(--hub-green-deep)]" />
          <span className="text-xs font-hub-body font-semibold text-[color:var(--hub-green-deep)] uppercase tracking-[0.3em]">
            Resume
          </span>
        </div>

        {/* Heading */}
        <h2 className="hub-resume-heading font-hub-display italic text-4xl md:text-5xl text-[color:var(--hub-ink)] tracking-tight mb-10">
          Resume.
        </h2>

        {/* List */}
        <ul className="hub-resume-list divide-y divide-[color:var(--hub-border)] border-t border-[color:var(--hub-border)]">
          {transcripts.map((t) => (
            <li
              key={`${t.year}-${t.label}`}
              className="hub-resume-row flex items-center justify-between gap-4 py-4"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-hub-body text-xs font-semibold text-[color:var(--hub-green-deep)] uppercase tracking-[0.2em] shrink-0 w-12">
                  {t.year}
                </span>
                <span className="font-hub-body text-sm md:text-base text-[color:var(--hub-ink)] truncate">
                  {t.title}
                </span>
              </div>
              <a
                href={t.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-hub-body font-medium text-[color:var(--hub-ink-muted)] hover:text-[color:var(--hub-green-deep)] transition-colors shrink-0"
                aria-label={`View ${t.label}`}
              >
                <span className="uppercase tracking-[0.15em]">View</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>

        {/* Footnote */}
        <p className="hub-resume-footnote mt-8 text-xs font-hub-body text-[color:var(--hub-ink-faint)]">
          Full transcripts and expanded details live under{" "}
          <span className="text-[color:var(--hub-green-deep)] font-semibold">Selected Work</span>.
        </p>
      </div>
    </section>
  );
}
