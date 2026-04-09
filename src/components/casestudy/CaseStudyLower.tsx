import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight } from "lucide-react";
import { bio, skills, education, contact } from "@/data/profile";
import { transcripts } from "@/data/transcripts";

export default function CaseStudyLower() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      gsap.from(".cl-block", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative max-w-6xl mx-auto px-6 md:px-16">
      <section id="about" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">§</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Role &amp; Approach
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              On the author.
            </h2>
            <p className="font-body text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-[56ch] first-letter:font-heading first-letter:italic first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-white">
              {bio}
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mt-10 pt-8 border-t border-white/[0.08]">
              <div>
                <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 mb-3">Discipline</span>
                <ul className="space-y-1">
                  {skills.slice(0, 7).map((s) => (
                    <li key={s} className="font-body text-white/70 text-sm">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 mb-3">Education</span>
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.period}>
                      <div className="font-body text-white/70 text-sm">{e.degree}</div>
                      <div className="font-body text-white/40 text-xs mt-0.5">{e.school} · {e.period}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">Ev.</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Evidence
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              Transcripts &amp; records.
            </h2>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {transcripts.map((t) => (
                <li key={`${t.year}-${t.label}`} className="flex items-baseline justify-between gap-6 py-5">
                  <div className="flex items-baseline gap-6 min-w-0">
                    <span className="font-heading italic text-white/30 text-2xl tabular-nums shrink-0 w-16">{t.year}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-white/40 mb-0.5">{t.label}</div>
                      <div className="font-body text-white/75 text-sm md:text-base truncate">{t.title}</div>
                    </div>
                  </div>
                  <a
                    href={t.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-white/60 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors shrink-0"
                  >
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="editorial-row cl-block">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="editorial-number">Fin.</div>
            <div className="mt-4 text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/40">
              Correspondence
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-heading italic text-white text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8">
              Discuss a project.
            </h2>
            <p className="font-body text-white/55 text-base md:text-lg leading-relaxed max-w-[52ch] mb-10">
              Briefs, commissions, and collaborations welcome. Written replies within two working days.
            </p>
            <dl className="space-y-6">
              <div className="flex items-baseline gap-6 border-b border-white/[0.08] pb-4">
                <dt className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 w-24 shrink-0">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="font-body text-white/85 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-6 border-b border-white/[0.08] pb-4">
                <dt className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-white/35 w-24 shrink-0">Repos</dt>
                <dd>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="font-body text-white/85 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors">
                    {contact.githubLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-12 text-[10px] font-body text-white/25 uppercase tracking-[0.25em]">
              Colophon — Set in Instrument Serif &amp; Barlow. © 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
