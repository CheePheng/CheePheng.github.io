import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavTheme } from "@/components/Navbar";
import { Mail, Github } from "lucide-react";

interface Props {
  theme: NavTheme;
}

export default function ContactContent({ theme }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const isGlass = theme === "gsap" || theme === "cinematic";
  const isEditorial = theme === "editorial";
  const isBold = theme === "bold";

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
              <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">
                Let&apos;s Connect
              </span>
              <div className="glow-dot" />
            </div>
          )}
          {isEditorial && (
            <span className="text-xs font-body font-semibold text-white/40 uppercase tracking-[0.2em] mb-4 block">
              Let&apos;s Connect
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
            {isBold ? "GET IN TOUCH" : "Get In Touch"}
          </h2>
          <p className="text-white/40 font-body font-light mt-4">
            I&apos;m currently open to opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Action buttons */}
        <div className="contact-actions flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:cheephengcheepheng@outlook.com"
            className={`contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors ${
              isGlass
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : isBold
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            <Mail size={16} />
            cheephengcheepheng@outlook.com
          </a>
          <a
            href="https://github.com/CheePheng"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors ${
              isGlass
                ? "bg-white/[0.06] text-white/70 hover:bg-white/10"
                : "bg-white/[0.06] text-white/70 hover:bg-white/10"
            }`}
          >
            <Github size={16} />
            github.com/CheePheng
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-16 text-xs text-white/20 font-body">
          &copy; 2026 Chee Pheng Ng &middot; Built with React, Vite &amp; Tailwind CSS
        </p>
      </div>
    </section>
  );
}
