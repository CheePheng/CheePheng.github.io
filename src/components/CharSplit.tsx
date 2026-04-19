import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CharSplitProps {
  text: string;
  className?: string;
  trigger?: boolean;
  as?: "h1" | "h2" | "span";
  variant?: "cinematic" | "editorial";
}

export default function CharSplit({
  text,
  className = "",
  trigger = true,
  as: Tag = "h1",
  variant = "cinematic",
}: CharSplitProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;
      const chars = containerRef.current.querySelectorAll(".char");

      const tween =
        variant === "editorial"
          ? { y: 6, opacity: 0, stagger: 0.015, duration: 0.4, ease: "power2.out" }
          : { y: 80, opacity: 0, rotateX: -40, stagger: 0.03, duration: 0.8, ease: "power3.out" };

      if (trigger) {
        gsap.from(chars, {
          ...tween,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });
      } else {
        gsap.from(chars, { ...tween, delay: 0.3 });
      }
    },
    { scope: containerRef },
  );

  const words = text.split(" ");
  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement>}
      className={className}
      style={{ perspective: "600px" }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block"
          style={{ marginRight: "0.3em" }}
        >
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
