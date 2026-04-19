import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function LoadingFallback() {
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!imgRef.current) return;

      if (reducedMotion) {
        gsap.set(imgRef.current, { opacity: 0.7, scale: 1 });
        return;
      }

      gsap.to(imgRef.current, {
        opacity: 0.85,
        scale: 1,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { dependencies: [reducedMotion] },
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
      style={{ background: "#07070d" }}
    >
      <img
        ref={imgRef}
        src="/images/logo.png"
        alt="Loading…"
        className="h-14 w-14"
        style={{
          opacity: 0.4,
          transform: "scale(0.98)",
          filter: "drop-shadow(0 2px 12px rgba(245, 225, 160, 0.28))",
        }}
      />
    </div>
  );
}
