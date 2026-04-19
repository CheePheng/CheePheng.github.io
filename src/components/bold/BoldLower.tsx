import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bio, skills, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

const manifestoLines = [
  "Build software",
  "that earns attention.",
  "Every pixel. Every beat.",
];

export default function BoldLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      // Bold snaps: scale + opacity only, expo.out, short.
      gsap.from(".bl-line", {
        opacity: 0,
        scale: 0.94,
        stagger: 0.08,
        duration: 0.5,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bl-manifesto", start: "top 80%", once: true },
      });
      gsap.from(".bl-strength", {
        opacity: 0,
        scale: 0.97,
        stagger: 0.04,
        duration: 0.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bl-strengths", start: "top 85%", once: true },
      });
      gsap.from(".bl-doc", {
        opacity: 0,
        scale: 0.97,
        stagger: 0.06,
        duration: 0.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bl-docs", start: "top 85%", once: true },
      });
      gsap.from(".bl-cta-word", {
        opacity: 0,
        scale: 0.94,
        stagger: 0.07,
        duration: 0.5,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bl-cta", start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative bg-[#0a0807]">
      <section id="about" className="bl-manifesto relative py-32 md:py-40 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 01 · Manifesto</span>
          </div>
          <h2 className="font-body font-black text-white uppercase text-6xl md:text-9xl leading-[0.85] tracking-tight">
            {manifestoLines.map((line, i) => (
              <span key={i} className="block bl-line">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-16 max-w-[56ch]">
            <div className="w-16 h-px bg-white mb-6" />
            <p className="text-white/60 font-body text-base md:text-lg leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 02 · Strengths</span>
          </div>
          <ul className="bl-strengths grid sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-12 max-w-5xl">
            {skills.map((s, i) => (
              <li key={s} className="bl-strength flex items-baseline gap-4 border-b border-white/15 py-4">
                <span className="font-body text-xs text-white/55 font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-body font-black uppercase text-white text-xl md:text-2xl tracking-tight">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="resume" className="relative py-24 md:py-32 px-6 md:px-16 border-t-2 border-white/10 bl-docs">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 03 · Documents</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {transcripts.map((t) => (
              <a
                key={`${t.year}-${t.label}`}
                href={t.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bl-doc group relative p-6 border-2 border-white/15 hover:border-white hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-body font-black text-white text-3xl block leading-none mb-2">{t.year}</span>
                    <span className="text-[10px] font-body font-bold text-white/50 uppercase tracking-[0.2em] block mb-1">{t.label}</span>
                    <span className="font-body text-white/80 text-sm">{t.title}</span>
                  </div>
                  <span className="text-[10px] font-body font-bold text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">View →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bl-cta relative py-40 md:py-56 px-6 md:px-16 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-0.5 bg-white" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.35em] text-white">§ 04 · Commission</span>
            <span className="w-12 h-0.5 bg-white" />
          </div>
          <h2 className="font-body font-black text-white uppercase text-7xl md:text-[12rem] leading-[0.82] tracking-tighter">
            <span className="block bl-cta-word">COMMISSION</span>
            <span className="block bl-cta-word text-white/20">A BUILD.</span>
          </h2>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto">
            <a
              href={`mailto:${contact.email}`}
              className="flex-1 w-full px-8 py-5 bg-white text-black font-body font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              Email →
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full px-8 py-5 border-2 border-white text-white font-body font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              GitHub →
            </a>
          </div>
          <p className="mt-20 text-[10px] text-white/50 font-mono uppercase tracking-[0.3em]">
            © 2026 · CHEE PHENG NG · ALL RIGHTS RESERVED
          </p>
        </div>
      </section>
    </div>
  );
}
