import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Destination = "bold" | "cinematic" | "editorial";

interface Props {
  destination: Destination;
}

/**
 * Award-site pattern: the next-chapter CTA is rendered in the destination's
 * own visual language so the interviewer sees where they're going before the
 * click. Editorial → Bold uses brutalist sans on deep ink; Bold → Cinematic
 * uses italic serif with a quiet amber beacon; Cinematic → Editorial closes
 * the loop with a two-column "fin" offering Hub or start.
 */
export default function ChapterFooter({ destination }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      gsap.from(".ch-reveal", {
        opacity: 0,
        y: 36,
        stagger: 0.09,
        duration: 0.85,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    },
    { scope: ref, dependencies: [destination] },
  );

  if (destination === "bold") {
    return (
      <section
        ref={ref}
        aria-label="Continue to Bold Type"
        className="relative overflow-hidden bg-[#0a0807] px-6 md:px-16 py-24 md:py-40 border-t border-white/[0.06]"
      >
        <Link to="/bold" className="group block max-w-7xl mx-auto">
          <div className="ch-reveal mb-10 flex items-center gap-4">
            <span className="w-10 h-px bg-red-500/70" />
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-white/60">
              Chapter 02 of 03 · Continue
            </span>
          </div>

          <div aria-hidden="true" className="ch-reveal leading-none select-none">
            <span className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-body font-black uppercase text-white tracking-[-0.04em] leading-[0.85]">
              BOLD
            </span>
          </div>
          <div aria-hidden="true" className="ch-reveal leading-none select-none pl-[3vw]">
            <span
              className="block text-[18vw] sm:text-[15vw] md:text-[13vw] font-body font-black uppercase tracking-[-0.04em] leading-[0.85]"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              }}
            >
              TYPE
            </span>
          </div>

          <div className="ch-reveal mt-10 flex items-center gap-6 text-white/70 transition-colors group-hover:text-white">
            <span className="font-body text-sm font-medium">
              Graphic, high-contrast — the next chapter
            </span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-2" />
          </div>
        </Link>
      </section>
    );
  }

  if (destination === "cinematic") {
    return (
      <section
        ref={ref}
        aria-label="Continue to 192 Frames"
        className="relative overflow-hidden bg-[#07070d] px-6 md:px-16 py-24 md:py-40 border-t border-white/[0.06]"
      >
        <Link to="/cinematic" className="group block max-w-6xl mx-auto">
          <div className="ch-reveal mb-10 flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-amber-300/80"
              style={{ boxShadow: "0 0 12px rgba(252,211,77,0.55)" }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-amber-200/70">
              Chapter 03 of 03 · Continue
            </span>
          </div>

          <h2 className="ch-reveal font-heading italic text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] mb-8">
            One hundred and
            <br />
            ninety-two frames.
          </h2>

          <p className="ch-reveal font-body text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            A scroll-scrubbed sequence. Immersive, frame by frame — the final chapter.
          </p>

          <div className="ch-reveal inline-flex items-center gap-3 border-b border-amber-200/30 pb-1 text-amber-100/90 transition-colors group-hover:border-amber-200/70 group-hover:text-amber-50">
            <span className="font-body text-sm font-semibold">Enter the sequence</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
          </div>
        </Link>
      </section>
    );
  }

  // destination === "editorial" — end-of-sequence loop
  return (
    <section
      ref={ref}
      aria-label="End of the sequence"
      className="relative overflow-hidden bg-[#0f0c08] px-6 md:px-16 py-24 md:py-40 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="ch-reveal mb-10 flex items-center gap-4">
          <span className="w-10 h-px bg-amber-300/60" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-amber-200/65">
            Fin · Three chapters, one author
          </span>
        </div>

        <h2 className="ch-reveal font-heading italic text-white text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] mb-6 max-w-[22ch]">
          The frames are the overture. The case studies are the score.
        </h2>

        <p className="ch-reveal font-body text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-12">
          Return to the beginning, or jump to a different framing of the same work.
        </p>

        <div className="ch-reveal flex flex-col gap-5 sm:flex-row sm:gap-10">
          <Link
            to="/"
            className="group relative inline-flex items-baseline gap-2.5 pb-1 text-white/80 transition-colors hover:text-white
                       after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
                       after:origin-left after:scale-x-0 after:bg-white/50
                       after:transition-transform after:duration-300 after:ease-out
                       hover:after:scale-x-100"
          >
            <span className="font-heading italic text-xl md:text-2xl leading-none">
              Selected Work
            </span>
            <span className="text-xs font-body text-white/45 transition-colors group-hover:text-white/65">
              Chapter 01 · Editorial
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
          </Link>

          <Link
            to="/hub"
            className="group relative inline-flex items-baseline gap-2.5 pb-1 text-white/80 transition-colors hover:text-white
                       after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
                       after:origin-left after:scale-x-0 after:bg-white/50
                       after:transition-transform after:duration-300 after:ease-out
                       hover:after:scale-x-100"
          >
            <span className="font-heading italic text-xl md:text-2xl leading-none">Hub</span>
            <span className="text-xs font-body text-white/45 transition-colors group-hover:text-white/65">
              Floating-islands 3D
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
