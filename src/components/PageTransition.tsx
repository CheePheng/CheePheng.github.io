import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";

const TITLES: Record<string, string> = {
  "/": "Chee Pheng — Selected Work",
  "/case-studies": "Chee Pheng — Selected Work",
  "/hub": "Chee Pheng — Hub",
  "/bold": "Chee Pheng — Bold Type",
  "/cinematic": "Chee Pheng — Cinematic Experience",
};

function getTitle(pathname: string): string {
  return TITLES[pathname] ?? "Chee Pheng — Full Stack Developer";
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RouteMotion = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

// Each route enters with its own motion verb, matching the experience's
// internal animation vocabulary so the route change itself carries the shift.
function getRouteMotion(pathname: string): RouteMotion {
  // Bold snaps: scale + opacity only, expo.out, short.
  if (pathname.startsWith("/bold")) {
    return {
      from: { opacity: 0, scale: 0.96 },
      to: { opacity: 1, scale: 1, duration: 0.35, ease: "expo.out" },
    };
  }
  // Cinematic drifts: longer y, expo.out.
  if (pathname.startsWith("/cinematic")) {
    return {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
    };
  }
  // Hub stays calm: short y settle, power2.out.
  if (pathname.startsWith("/hub")) {
    return {
      from: { opacity: 0, y: 6 },
      to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    };
  }
  // Editorial reads: ultra-restrained, opacity only.
  // Covers "/", "/case-studies", "/projects/:slug", and any fallthrough.
  return {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.3, ease: "power1.out" },
  };
}

export default function PageTransition() {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = getTitle(location.pathname);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!wrapperRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(wrapperRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const { from, to } = getRouteMotion(location.pathname);
    gsap.fromTo(wrapperRef.current, from, to);
  }, [location.pathname]);

  return <div ref={wrapperRef}><Outlet /></div>;
}
