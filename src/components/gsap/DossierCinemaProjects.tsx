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

  if (usePinned) {
    return (
      <section
        ref={sectionRef}
        id="projects"
        className="relative"
        style={{ height: `${featured.length * 65}vh` }}
      >
        <div className="dcp-pin relative h-screen w-full overflow-hidden isolate">
          <h2 className="absolute inset-0 flex items-center justify-center text-white/40 font-heading italic text-4xl">
            Dossier Cinema (scaffold)
          </h2>
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
