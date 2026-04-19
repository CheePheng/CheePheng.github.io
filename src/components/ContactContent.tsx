import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavTheme } from "@/components/Navbar";
import { Mail, Github, Linkedin } from "lucide-react";
import { CONTACT } from "@/data/contact";

interface Props {
  theme: NavTheme;
}

export default function ContactContent({ theme }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const isGlass = theme === "gsap" || theme === "cinematic";
  const isEditorial = theme === "editorial";
  const isBold = theme === "bold";
  const isHub = theme === "hub";

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".contact-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 85%", once: true },
      });

      gsap.from(".contact-btn", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-actions", start: "top 90%", once: true },
      });
    },
    { scope: sectionRef },
  );

  const sectionClasses =
    "section-premium relative py-16 md:py-24 px-6 md:px-16 overflow-hidden";

  return (
    <section ref={sectionRef} id="contact" className={sectionClasses}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading block */}
        <div className="contact-heading mb-10">
          {isGlass && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="glow-dot" />
              <span className="text-xs font-body font-semibold text-amber-200/70 uppercase tracking-[0.3em]">
                Let&apos;s Connect
              </span>
              <div className="glow-dot" />
            </div>
          )}
          {isEditorial && (
            <span className="text-xs font-body font-semibold text-white/55 uppercase tracking-[0.2em] mb-4 block">
              Let&apos;s Connect
            </span>
          )}
          {isHub && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-1 w-1 rounded-full bg-[color:var(--hub-green-deep)]" />
              <span className="text-xs font-hub-body font-semibold text-[color:var(--hub-green-deep)] uppercase tracking-[0.3em]">
                Let&apos;s Connect
              </span>
              <span className="h-1 w-1 rounded-full bg-[color:var(--hub-green-deep)]" />
            </div>
          )}
          <h2
            className={
              isBold
                ? "text-6xl md:text-8xl font-body font-black uppercase tracking-tight text-white"
                : isEditorial
                  ? "text-3xl md:text-4xl font-heading italic text-white/90 tracking-tight"
                  : isHub
                    ? "text-4xl md:text-5xl font-hub-display italic text-[color:var(--hub-ink)] tracking-tight"
                    : "text-4xl md:text-5xl font-heading italic text-white tracking-tight"
            }
          >
            {isBold ? "GET IN TOUCH" : "Get In Touch"}
          </h2>
          <p
            className={
              isHub
                ? "text-[color:var(--hub-ink-muted)] font-hub-body font-light mt-4 max-w-xl mx-auto leading-relaxed"
                : "text-white/55 font-body font-light mt-4 max-w-xl mx-auto leading-relaxed"
            }
          >
            {CONTACT.availability}
          </p>
        </div>

        {/* Action buttons */}
        <div className="contact-actions flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className={`contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl ${isHub ? "font-hub-body" : "font-body"} font-semibold text-sm transition-colors ${
              isGlass
                ? "bg-amber-500 hover:bg-amber-400 text-neutral-950"
                : isBold
                  ? "bg-white text-black hover:bg-white/90"
                  : isHub
                    ? "bg-[color:var(--hub-green-deep)] hover:bg-[color:var(--hub-green-soft)] text-[color:var(--hub-bg-elev)]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            <Mail size={16} />
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={
              isHub
                ? "contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-hub-body font-semibold text-sm bg-[color:var(--hub-bg-elev)] border border-[color:var(--hub-border)] text-[color:var(--hub-ink-muted)] hover:text-[color:var(--hub-ink)] hover:border-[color:var(--hub-green-deep)] transition-colors"
                : "contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm bg-white/[0.06] text-white/70 hover:bg-white/10 transition-colors"
            }
          >
            <Linkedin size={16} />
            {CONTACT.linkedinHandle}
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={
              isHub
                ? "contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-hub-body font-semibold text-sm bg-[color:var(--hub-bg-elev)] border border-[color:var(--hub-border)] text-[color:var(--hub-ink-muted)] hover:text-[color:var(--hub-ink)] hover:border-[color:var(--hub-green-deep)] transition-colors"
                : "contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm bg-white/[0.06] text-white/70 hover:bg-white/10 transition-colors"
            }
          >
            <Github size={16} />
            {CONTACT.githubHandle}
          </a>
        </div>

        {/* Copyright */}
        <p
          className={
            isHub
              ? "mt-16 text-xs text-[color:var(--hub-ink-faint)] font-hub-body"
              : "mt-16 text-xs text-white/20 font-body"
          }
        >
          &copy; 2026 {CONTACT.name} &middot; Built with React, Vite &amp; Tailwind CSS
        </p>
      </div>
    </section>
  );
}
