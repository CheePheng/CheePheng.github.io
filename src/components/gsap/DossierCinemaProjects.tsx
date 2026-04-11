import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 4);

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

          {/* Temporary beat placeholder — replaced in Task 3 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/30 text-6xl font-heading italic">
              Beat {activeIndex + 1}
            </span>
          </div>
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
