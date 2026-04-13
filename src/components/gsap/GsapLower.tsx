import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { bio, skills, education, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

export default function GsapLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      gsap.from(".gl-chapter", {
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".gl-cap", {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gl-caps", start: "top 85%", once: true },
      });
      gsap.from(".gl-evidence-row", {
        opacity: 0,
        x: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gl-evidence", start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      {/* ── APPROACH ───────────────────────────── */}
      <section id="about" className="relative overflow-hidden py-24 md:py-32 px-6 md:px-16">
        <span
          aria-hidden="true"
          className="absolute -top-10 right-0 pointer-events-none select-none font-heading italic text-white/[0.035] leading-none"
          style={{ fontSize: "22vw" }}
        >
          05
        </span>
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 gl-chapter">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">Chapter A</span>
            </div>
            <h2 className="font-heading italic text-white text-5xl md:text-6xl leading-[0.95] tracking-tight">Approach.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 gl-chapter">
            <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-[52ch]">
              {bio}
            </p>
            <div className="mt-8 flex items-center gap-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              <span>DkIT — BSc (Hons) 2025</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Cloud · Full-Stack · Motion</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ───────────────────────── */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 gl-chapter">
            <h3 className="font-heading italic text-white/90 text-3xl md:text-4xl tracking-tight">Capabilities</h3>
            <span className="text-[10px] font-body text-white/40 uppercase tracking-[0.25em]">{String(skills.length).padStart(2, "0")} Tools</span>
          </div>
          <div className="gl-caps flex flex-wrap gap-x-8 gap-y-3 max-w-4xl">
            {skills.map((s, i) => (
              <span key={s} className="gl-cap font-heading italic text-white/80 text-2xl md:text-3xl leading-none">
                {s}
                {i < skills.length - 1 && <span className="text-violet-400/50 ml-8">/</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVIDENCE (transcripts) ─────────────── */}
      <section id="resume" className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/[0.06] gl-evidence">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.3em]">Chapter B</span>
            </div>
            <h3 className="font-heading italic text-white text-5xl md:text-6xl leading-[0.95] tracking-tight mb-4">Evidence.</h3>
            <p className="text-white/45 font-body text-sm leading-relaxed max-w-[28ch]">
              Academic records from Dundalk Institute of Technology, {education[1].period.split(" ")[0]} — 2025.
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {transcripts.map((t) => (
                <li key={`${t.year}-${t.label}`} className="gl-evidence-row group flex items-center justify-between gap-4 py-5">
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="font-heading italic text-violet-300/70 text-xl tabular-nums shrink-0 w-14">{t.year}</span>
                    <span className="font-body text-white/75 text-sm md:text-base truncate">{t.title}</span>
                  </div>
                  <a
                    href={t.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-body font-semibold text-white/50 group-hover:text-violet-300 uppercase tracking-[0.2em] transition-colors shrink-0"
                  >
                    View
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── START A MOTION-DRIVEN PROJECT ──────── */}
      <section id="contact" className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8 gl-chapter">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-violet-400/60" />
              <span className="text-[10px] font-body font-semibold text-violet-300/70 uppercase tracking-[0.35em]">Final Chapter</span>
            </div>
            <h2 className="font-heading italic text-white text-6xl md:text-8xl leading-[0.9] tracking-tight">
              Start a<br/>motion-driven<br/>
              <span className="text-violet-300/80">project.</span>
            </h2>
          </div>
          <div className="md:col-span-4 gl-chapter">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-between gap-3 py-4 border-b border-white/20 hover:border-violet-300/80 transition-colors group"
              >
                <span className="font-body text-white/80 text-sm">{contact.email}</span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-violet-300 transition-colors" />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-3 py-4 border-b border-white/20 hover:border-violet-300/80 transition-colors group"
              >
                <span className="font-body text-white/80 text-sm">{contact.githubLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-violet-300 transition-colors" />
              </a>
            </div>
            <p className="mt-8 text-[10px] text-white/25 font-body uppercase tracking-[0.2em]">
              © 2026 Chee Pheng Ng
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
