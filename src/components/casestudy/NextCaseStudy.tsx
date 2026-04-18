import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";

interface Props {
  currentSlug: string;
}

export default function NextCaseStudy({ currentSlug }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const featured = projects.filter((p) => p.featured);
  const currentIndex = featured.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % featured.length;
  const next = featured[nextIndex];
  const positionLabel = String(nextIndex + 1).padStart(2, "0");
  const totalLabel = String(featured.length).padStart(2, "0");

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      gsap.from(".next-cs-reveal", {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    },
    { scope: ref, dependencies: [currentSlug] },
  );

  return (
    <section
      ref={ref}
      aria-label={`Continue reading: ${next.name}`}
      className="relative border-t border-white/[0.06] bg-[#0f0c08] px-6 md:px-16 py-20 md:py-28"
    >
      <Link
        to={`/projects/${next.slug}`}
        className="group block max-w-4xl mx-auto"
      >
        <div className="next-cs-reveal mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-amber-300/60" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-amber-200/60">
            Case Study {positionLabel} of {totalLabel} &middot; Continue
          </span>
        </div>

        <h2 className="next-cs-reveal font-heading italic text-white text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] mb-6">
          {next.name}
        </h2>

        <p className="next-cs-reveal font-body text-white/60 text-base md:text-lg leading-relaxed max-w-[62ch] mb-10">
          {next.description}
        </p>

        <div
          className="next-cs-reveal relative inline-flex items-baseline gap-2.5 pb-1 text-white/80 transition-colors group-hover:text-white
                     after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
                     after:origin-left after:scale-x-0 after:bg-white/50
                     after:transition-transform after:duration-300 after:ease-out
                     group-hover:after:scale-x-100"
        >
          <span className="font-body text-sm font-semibold">Read the next case study</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
        </div>
      </Link>
    </section>
  );
}
