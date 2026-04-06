import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavTheme } from "@/components/Navbar";
import { GraduationCap, Code } from "lucide-react";

const skills = [
  "TypeScript", "React", "Java", "C#", "HTML/CSS", "SQL",
  "Cloud Architecture", "Mobile Development", "REST APIs", "Git",
  "Node.js", "IoT", "Agile", "Docker",
];

const skillColors: Record<string, string> = {
  TypeScript: "bg-blue-400", React: "bg-cyan-400", Java: "bg-orange-400",
  "C#": "bg-purple-400", "HTML/CSS": "bg-red-400", SQL: "bg-yellow-400",
  "Cloud Architecture": "bg-violet-400", "Mobile Development": "bg-green-400",
  "REST APIs": "bg-blue-400", Git: "bg-orange-400",
  "Node.js": "bg-green-400", IoT: "bg-cyan-400", Agile: "bg-violet-400", Docker: "bg-blue-400",
};

const bio =
  "I'm Chee Pheng Ng — from Malaysia to Ireland, I pursued Computer Science at Dundalk Institute of Technology (DkIT). After completing 3 years in Software Development, I continued with an Honours year in Cloud Computing, graduating in 2025. Now I'm focused on building AI-powered applications and modern full-stack solutions.";

const education = [
  {
    period: "2024 – 2025",
    degree: "BSc (Honours) Level 8 — Computing in Cloud Computing",
    school: "Dundalk Institute of Technology",
    note: "Second Class Honours Grade 2",
    icon: GraduationCap,
  },
  {
    period: "2020 – 2023",
    degree: "BSc Computer Science — Software Development",
    school: "Dundalk Institute of Technology",
    note: "3 Years",
    icon: Code,
  },
];

interface Props {
  theme: NavTheme;
}

export default function AboutContent({ theme }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const isGlass = theme === "gsap" || theme === "cinematic";
  const isEditorial = theme === "editorial";
  const isBold = theme === "bold";

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      // Heading
      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 85%", once: true },
      });

      // Bio words
      const words = sectionRef.current.querySelectorAll(".bio-word");
      if (words.length) {
        gsap.from(words, {
          opacity: 0,
          y: 12,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".bio-text", start: "top 85%", once: true },
        });
      }

      // Skills
      gsap.from(".skill-tag", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".skills-grid", start: "top 85%", once: true },
      });

      // Education cards
      gsap.from(".edu-card-left", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".edu-card-left", start: "top 85%", once: true },
      });
      gsap.from(".edu-card-right", {
        x: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".edu-card-right", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  const sectionClasses = [
    "section-premium relative py-16 md:py-24 px-6 md:px-16 overflow-hidden",
    isGlass ? "dot-grid" : "",
  ].join(" ");

  const cardBase = isGlass
    ? "premium-card p-6 rounded-xl"
    : isEditorial
      ? "bg-white/[0.03] border border-white/[0.06] p-6 rounded-xl"
      : "bg-white/[0.04] border-2 border-white/10 p-6 rounded-xl";

  const accentColor = isGlass
    ? "text-violet-400"
    : isEditorial
      ? "text-white/60"
      : "text-white";

  return (
    <section ref={sectionRef} id="about" className={sectionClasses}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="about-heading mb-12">
          {isGlass && (
            <div className="flex items-center gap-3 mb-4">
              <div className="glow-dot" />
              <span className="text-xs font-body font-semibold text-violet-300/70 uppercase tracking-[0.2em]">
                About Me
              </span>
              <div className="glow-dot" />
            </div>
          )}
          {isEditorial && (
            <span className="text-xs font-body font-semibold text-white/40 uppercase tracking-[0.2em] mb-4 block">
              About Me
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
            {isBold ? "ABOUT" : "About Me"}
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: Bio + Skills */}
          <div>
            <p className="bio-text text-white/50 font-body font-light leading-relaxed mb-8">
              {bio.split(" ").map((word, i) => (
                <span key={i} className="bio-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>

            <h3 className={`text-sm font-body font-semibold uppercase tracking-[0.15em] ${accentColor} mb-4`}>
              Skills &amp; Technologies
            </h3>
            <div className="skills-grid flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`skill-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium ${
                    isBold
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-white/[0.04] text-white/60 border border-white/[0.06]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${skillColors[skill] ?? "bg-white/40"}`} />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className="space-y-6">
            <h3 className={`text-sm font-body font-semibold uppercase tracking-[0.15em] ${accentColor} mb-4`}>
              Education
            </h3>
            {education.map((edu, i) => {
              const Icon = edu.icon;
              const cardClass = i === 0 ? "edu-card-left" : "edu-card-right";
              return (
                <div
                  key={edu.period}
                  className={`${cardBase} ${cardClass} ${
                    isGlass ? "border-l-2 border-l-violet-500/60" : isBold ? "border-l-4 border-l-white" : "border-l-2 border-l-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isGlass ? "bg-violet-500/10 text-violet-400" : "bg-white/[0.06] text-white/50"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <span
                        className={`text-xs font-body font-semibold uppercase tracking-wider ${
                          isGlass ? "text-violet-300/60" : isBold ? "text-white/80 text-base" : "text-white/40"
                        }`}
                      >
                        {edu.period}
                      </span>
                      <h4 className="text-white/90 font-body font-semibold mt-1">
                        {edu.degree}
                      </h4>
                      <p className="text-white/40 text-sm font-body">
                        {edu.school}
                      </p>
                      <p className="text-white/30 text-xs font-body mt-1">
                        {edu.note}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
