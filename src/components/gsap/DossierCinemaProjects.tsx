import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 4);

function BeatOpening({ project, active }: { project: Project; active: boolean }) {
  const lines: { el: React.ReactNode; delay: number }[] = [
    {
      el: (
        <div className="font-body text-[10px] text-violet-300/80 uppercase tracking-[0.35em]">
          Chapter 01 / Dossier
        </div>
      ),
      delay: 0,
    },
    {
      el: (
        <h3 className="font-heading italic text-white text-4xl mt-3">
          {project.name}
        </h3>
      ),
      delay: 120,
    },
    {
      el: (
        <p className="font-body text-white/60 text-sm mt-2 max-w-[40ch]">
          {project.description}
        </p>
      ),
      delay: 240,
    },
  ];

  return (
    <div className="absolute inset-0">
      {/* Full-bleed image + parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: active
            ? "scale(1.02) translateY(0)"
            : "scale(1.05) translateY(40px)",
          transition: "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-indigo-900/40 flex items-center justify-center">
            <span className="font-heading italic text-white/20 text-[20vw]">
              {project.name[0]}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#07070d]/85 via-[#07070d]/30 to-transparent" />
      </div>

      {/* Caption stack — opts into parallax via CSS var */}
      <div
        className="absolute bottom-16 left-12 max-w-[520px]"
        style={{ transform: "translateY(var(--dcp-text-y, 0))" }}
      >
        {lines.map(({ el, delay }, i) => (
          <div
            key={i}
            style={{
              opacity: active ? 1 : 0,
              filter: active ? "blur(0)" : "blur(8px)",
              transition:
                "opacity 700ms ease-out, filter 700ms ease-out",
              transitionDelay: `${delay}ms`,
            }}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

function BeatDevelopment({ project, active }: { project: Project; active: boolean }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_auto] gap-12 px-16 items-center">
      <div
        className="min-w-0"
        style={{ transform: "translateY(var(--dcp-text-y, 0))" }}
      >
        <div className="font-body text-[10px] text-violet-300/70 uppercase tracking-[0.35em] mb-6">
          Chapter 02 / Development
        </div>
        <h3
          className="font-heading italic text-white leading-[0.85] whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          {project.name.split("").map((ch, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: active ? 1 : 0,
                filter: active ? "blur(0)" : "blur(10px)",
                transition: "opacity 700ms ease-out, filter 700ms ease-out",
                transitionDelay: `${i * 35}ms`,
              }}
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </h3>
        <div className="mt-10 flex items-center gap-4 max-w-[60ch]">
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-heading italic text-white/60 text-lg">
            {project.tech.join(" / ")}
          </span>
        </div>
      </div>

      <div className="w-[36vw] max-w-[520px] aspect-[3/4] relative overflow-hidden ring-1 ring-white/[0.06]">
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: active
                ? "scale(1.02) translateY(0)"
                : "scale(1.1) translateY(40px)",
              transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/60 to-transparent" />
      </div>
    </div>
  );
}

function BeatClimax({ project, active }: { project: Project; active: boolean }) {
  return (
    <div className="absolute inset-0 isolate">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: active
                ? "scale(1.02) translateY(0)"
                : "scale(1.08) translateY(60px)",
              transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 to-indigo-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h3
          className="font-heading uppercase text-white mix-blend-difference text-center leading-[0.82] px-8 whitespace-nowrap"
          style={{
            fontSize: "18vw",
            transform: active ? "scale(1)" : "scale(3)",
            opacity: active ? 1 : 0,
            transition:
              "transform 600ms cubic-bezier(0.19, 1, 0.22, 1), opacity 150ms ease-out",
          }}
        >
          {project.name}
        </h3>
      </div>
    </div>
  );
}

function BeatEpilogue({ project, active }: { project: Project; active: boolean }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Category", value: project.category.toUpperCase() },
    { label: "Tech", value: project.tech.join(" · ") },
    { label: "Impact", value: project.impact ?? project.description },
    {
      label: "Repository",
      value: (
        <a
          href={`https://github.com/CheePheng/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 hover:decoration-white"
        >
          github.com/CheePheng/{project.repo}
        </a>
      ),
    },
    {
      label: "Case Study",
      value: (
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 underline decoration-white/30 hover:decoration-white"
        >
          Read the full dossier
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_40%] gap-16 px-16 items-center">
      <div style={{ transform: "translateY(var(--dcp-text-y, 0))" }}>
        <div className="font-body text-[10px] text-violet-300/70 uppercase tracking-[0.35em] mb-4">
          Chapter 04 / Epilogue
        </div>
        <h3 className="font-heading italic text-white text-5xl lg:text-6xl mb-10">
          {project.name}
        </h3>
        <dl className="max-w-[52ch]">
          {rows.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex items-baseline gap-6 border-t border-white/15 pt-3 pb-4"
              style={{
                transform: active ? "translateY(0)" : "translateY(12px)",
                opacity: active ? 1 : 0,
                transition:
                  "transform 600ms ease-out, opacity 600ms ease-out",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <dt className="font-body text-[10px] text-white/40 uppercase tracking-[0.25em] w-28 shrink-0">
                {label}
              </dt>
              <dd className="font-body italic text-white/85 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="aspect-[4/5] relative overflow-hidden ring-1 ring-white/[0.06]">
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: active ? "scale(1.02)" : "scale(1.08)",
              transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
}

export default function DossierCinemaProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const usePinned = isDesktop && !reducedMotion;

  useGSAP(
    () => {
      if (!usePinned || !sectionRef.current) return;
      const section = sectionRef.current;
      const pin = section.querySelector<HTMLElement>(".dcp-pin");
      if (!pin) return;
      const total = featured.length;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * total * 0.65}`,
        pin,
        scrub: 0.3,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress * total + 0.0001),
          );
          setActiveIndex(idx);
          const localProgress = (self.progress * total) % 1;
          pin.style.setProperty("--dcp-text-y", `${localProgress * -24}px`);
          if (numeralRef.current) {
            if (idx >= total - 1) {
              numeralRef.current.style.opacity = "0";
            } else if (localProgress > 0.85) {
              numeralRef.current.style.opacity = "1";
              numeralRef.current.style.transform = `translateX(${(localProgress - 0.85) * 600}%)`;
            } else {
              numeralRef.current.style.opacity = "0";
              numeralRef.current.style.transform = "translateX(-100%)";
            }
          }
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef, dependencies: [usePinned] },
  );

  if (usePinned) {
    const total = featured.length;
    return (
      <section
        ref={sectionRef}
        id="projects"
        className="relative"
        style={{ height: `${total * 65}vh` }}
      >
        <div className="dcp-pin relative h-screen w-full overflow-hidden isolate">
          {/* Film-reel progress strip */}
          <aside className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
            <span className="font-heading italic text-white text-xl tabular-nums leading-none">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-3 py-3">
              {featured.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-7 transition-colors duration-500 ${
                    activeIndex === i ? "bg-violet-400/80" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <span className="font-body text-[9px] text-white/40 uppercase tracking-[0.25em]">
              of {String(total).padStart(2, "0")}
            </span>
          </aside>

          {/* Interstitial numeral wipe */}
          <div
            ref={numeralRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-10 font-heading italic text-white/[0.04] leading-none select-none"
            style={{
              fontSize: "40vw",
              opacity: 0,
              transform: "translateX(-100%)",
              transition: "opacity 200ms ease-out",
            }}
          >
            {String(Math.min(activeIndex + 2, total)).padStart(2, "0")}
          </div>

          {featured.map((project, i) => (
            <div
              key={project.slug}
              className="absolute inset-0"
              style={{ pointerEvents: activeIndex === i ? "auto" : "none" }}
            >
              {i === 0 && <BeatOpening project={project} active={activeIndex === i} />}
              {i === 1 && <BeatDevelopment project={project} active={activeIndex === i} />}
              {i === 2 && <BeatClimax project={project} active={activeIndex === i} />}
              {i === 3 && <BeatEpilogue project={project} active={activeIndex === i} />}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 px-6">
      <h2 className="text-white/40 font-heading italic text-4xl text-center">
        Dossier Cinema (scaffold — mobile)
      </h2>
    </section>
  );
}
