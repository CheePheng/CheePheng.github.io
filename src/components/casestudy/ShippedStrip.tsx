import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, Github } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { shippedArtifacts } from "@/data/projects";

/**
 * A dense list of deployments a recruiter can click within five seconds.
 * Lives above the featured case studies so shipping proof precedes narrative.
 */
export default function ShippedStrip() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      gsap.from(".shipped-row", {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="shipped-heading"
      className="relative z-10 pt-10 md:pt-12 pb-16 md:pb-20 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow + heading */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-10 items-end">
          <div className="md:col-span-4">
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-amber-200/60 block mb-4">
              § Live &amp; shipped
            </span>
            <h2
              id="shipped-heading"
              className="font-heading italic text-white text-3xl md:text-5xl leading-[1.02] tracking-tight"
            >
              Try before you read.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-white/50 font-body text-sm md:text-base leading-relaxed max-w-[48ch]">
            Three deployments you can verify in five seconds. The case studies
            below are engineering-depth studies on source-available work; the
            artifacts here are the live ones.
          </p>
        </div>

        {/* Numbered rows — editorial, no cards */}
        <ol className="space-y-0">
          {shippedArtifacts.map((a, i) => (
            <li
              key={a.liveUrl}
              className="shipped-row grid md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-t border-white/10"
            >
              <div className="md:col-span-1 flex items-start">
                <span className="font-body font-mono text-[11px] tabular-nums text-white/50 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="font-heading italic text-white text-2xl md:text-3xl leading-[1.1] mb-2">
                  {a.name}
                </h3>
                <p className="text-white/60 font-body text-sm md:text-base leading-relaxed max-w-[52ch]">
                  {a.tagline}
                </p>
              </div>

              <div className="md:col-span-3 flex flex-wrap items-start gap-1.5 md:pt-2">
                {a.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-[10px] font-body font-medium bg-white/[0.06] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="md:col-span-3 flex flex-col md:items-end gap-2 md:pt-1">
                <a
                  href={a.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-amber-100/90 hover:text-amber-50 transition-colors border-b border-amber-200/30 hover:border-amber-200/70 pb-0.5"
                >
                  Try live
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={a.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-body text-white/55 hover:text-white/80 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  Source
                </a>
              </div>
            </li>
          ))}
        </ol>

        {/* Closing hairline + transition label into the case studies */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10">
          <p className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-white/50">
            Below &mdash; engineering depth studies
          </p>
        </div>
      </div>
    </section>
  );
}
