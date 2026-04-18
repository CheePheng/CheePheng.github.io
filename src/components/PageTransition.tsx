import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";

const TITLES: Record<string, string> = {
  "/": "Chee Pheng — Full-Stack Developer",
  "/case-studies": "Chee Pheng — Project Case Studies",
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

export default function PageTransition() {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, behavior: "instant" });

    // Update document title
    document.title = getTitle(location.pathname);

    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!wrapperRef.current) return;

    if (prefersReducedMotion()) {
      // Instant swap — no animation
      gsap.set(wrapperRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power1.out" }
    );
  }, [location.pathname]);

  return <div ref={wrapperRef}><Outlet /></div>;
}
