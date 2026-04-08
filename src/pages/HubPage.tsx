import { lazy, Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Navbar from "@/components/Navbar";
import HubFallback from "@/components/hub/HubFallback";
import HubOverlay from "@/components/hub/HubOverlay";
import HubAbout from "@/components/hub/HubAbout";
import HubResume from "@/components/hub/HubResume";
import ContactContent from "@/components/ContactContent";

// Lazy-load the 3D scene so Three.js only loads when actually rendered
const FloatingIslandsScene = lazy(
  () => import("@/components/hub/FloatingIslandsScene"),
);

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HubPage() {
  const reducedMotion = useReducedMotion();
  const [shouldRender3D, setShouldRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // Set document title
    const prev = document.title;
    document.title = "Chee Pheng — Portfolio";

    const isMobile = window.innerWidth < 768;
    const hasWebGL = detectWebGL();
    setShouldRender3D(!isMobile && !reducedMotion && hasWebGL);

    return () => {
      document.title = prev;
    };
  }, [reducedMotion]);

  // While detecting, render fallback (avoid SSR/flash)
  const use3D = shouldRender3D === true;

  return (
    <div className="relative min-h-screen w-full bg-[#07070d]">
      <Navbar theme="gsap" />

      {/* Hero viewport — 3D scene + overlay + cards, exactly one screen tall */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background layer */}
        {use3D ? (
          <Suspense fallback={<HubFallback />}>
            <FloatingIslandsScene />
          </Suspense>
        ) : (
          <HubFallback />
        )}

        {/* Subtle vignette to push focus to center text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(7,7,13,0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* HTML overlay (heading + cards) — owns id="projects" */}
        <HubOverlay />
      </div>

      {/* Lean in-page sections so Navbar anchors resolve */}
      <HubAbout />
      <HubResume />
      <ContactContent theme="gsap" />
    </div>
  );
}
