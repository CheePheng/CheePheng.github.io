import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavTheme } from "@/components/Navbar";
import { Eye, Download } from "lucide-react";
import { transcripts } from "@/data/transcripts";

interface Props {
  theme: NavTheme;
}

export default function TranscriptsContent({ theme }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const isGlass = theme === "gsap" || theme === "cinematic";
  const isEditorial = theme === "editorial";
  const isBold = theme === "bold";

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      // Heading
      gsap.from(".transcript-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".transcript-heading", start: "top 85%", once: true },
      });

      // Cards stagger from alternating sides
      const cards = sectionRef.current.querySelectorAll(".transcript-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  const sectionClasses = [
    "section-premium relative py-16 md:py-24 px-6 md:px-16 overflow-hidden",
    isGlass ? "dot-grid" : "",
  ].join(" ");

  const cardBase = isGlass
    ? "premium-card rounded-xl p-5"
    : isEditorial
      ? "bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
      : "bg-white/[0.04] border-2 border-white/10 rounded-xl p-5";

  const accentBorder = isGlass
    ? "border-l-2 border-l-violet-500/60"
    : isBold
      ? "border-l-4 border-l-white"
      : "border-l-2 border-l-white/20";

  const accentColor = isGlass ? "text-violet-400" : "text-white/60";

  return (
    <section ref={sectionRef} id="resume" className={sectionClasses}>
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="transcript-heading mb-12">
          {isGlass && (
            <div className="flex items-center gap-3 mb-4">
              <div className="glow-dot" />
              <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">
                Academic Records
              </span>
              <div className="glow-dot" />
            </div>
          )}
          {isEditorial && (
            <span className="text-xs font-body font-semibold text-white/40 uppercase tracking-[0.2em] mb-4 block">
              Academic Records
            </span>
          )}
          <h2
            className={
              isBold
                ? "text-6xl md:text-8xl font-heading font-black uppercase tracking-tight text-white"
                : isEditorial
                  ? "text-3xl md:text-4xl font-heading italic text-white/90 tracking-tight"
                  : "text-4xl md:text-5xl font-heading italic gradient-text tracking-tight"
            }
          >
            {isBold ? "TRANSCRIPTS" : "Transcripts"}
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {transcripts.map((t) => (
            <div
              key={`${t.year}-${t.label}`}
              className={`transcript-card ${cardBase} ${accentBorder}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className={`font-heading font-bold shrink-0 ${
                      isBold
                        ? "text-3xl text-white"
                        : isGlass
                          ? "text-lg text-violet-300/80"
                          : "text-lg text-white/40"
                    }`}
                  >
                    {t.year}
                  </span>
                  <div>
                    <span
                      className={`text-xs font-body font-semibold uppercase tracking-wider ${
                        isGlass ? "text-violet-300/60" : "text-white/40"
                      }`}
                    >
                      {t.label}
                    </span>
                    <h3 className="text-white/90 font-body font-semibold mt-0.5">
                      {t.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={t.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                      isGlass
                        ? "bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                        : "bg-white/[0.06] text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <Eye size={14} />
                    View
                  </a>
                  <a
                    href={t.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${accentColor} ${
                      isGlass
                        ? "bg-white/[0.04] hover:bg-white/[0.08]"
                        : "bg-white/[0.04] hover:bg-white/[0.08]"
                    }`}
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
