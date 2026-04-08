import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const bio =
  "I'm Chee Pheng Ng — from Malaysia to Ireland, I pursued Computer Science at Dundalk Institute of Technology (DkIT). After completing 3 years in Software Development, I continued with an Honours year in Cloud Computing, graduating in 2025. Now I'm focused on building AI-powered applications and modern full-stack solutions.";

const skills = [
  "TypeScript",
  "React",
  "Cloud Architecture",
  "Node.js",
  "Java",
  "SQL",
];

export default function HubAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from(".hub-about-eyebrow", {
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
      gsap.from(".hub-about-heading", {
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
      gsap.from(".hub-about-bio", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".hub-about-skill", {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hub-about-skills",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".hub-about-education", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hub-about-education",
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full px-6 py-24 md:py-32 md:px-16 bg-[#07070d]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="hub-about-eyebrow flex items-center gap-3 mb-4">
          <span className="h-1 w-1 rounded-full bg-violet-300/80" />
          <span className="text-xs font-body font-semibold text-violet-300/80 uppercase tracking-[0.2em]">
            About
          </span>
        </div>

        {/* Heading */}
        <h2 className="hub-about-heading font-heading italic text-4xl md:text-5xl text-white tracking-tight mb-8">
          A quick hello.
        </h2>

        {/* Bio */}
        <p className="hub-about-bio font-body text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl">
          {bio}
        </p>

        {/* Skills */}
        <div className="hub-about-skills flex flex-wrap gap-2 mb-10">
          {skills.map((skill) => (
            <span
              key={skill}
              className="hub-about-skill inline-flex items-center px-3 py-1.5 rounded-full text-xs font-body font-medium bg-white/[0.04] border border-white/[0.08] text-white/70 backdrop-blur-md"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Education blurb */}
        <p className="hub-about-education font-body text-sm text-white/40">
          <span className="text-violet-300/80">BSc (Hons) Computing</span>
          {" — Dundalk Institute of Technology, 2025"}
        </p>
      </div>
    </section>
  );
}
