import { useEffect, useRef } from "react";

/**
 * CSS-only animated gradient mesh background.
 * Used for mobile, reduced-motion, or when WebGL is unavailable.
 * No Three.js — keeps mobile bundle small and battery-friendly.
 */
export default function HubFallback() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Generate 30 particles once
    container.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "hub-particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDuration = `${8 + Math.random() * 12}s`;
      p.style.animationDelay = `${-Math.random() * 15}s`;
      const size = 1 + Math.random() * 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      container.appendChild(p);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Drifting gradient orbs */}
      <div className="hub-orb hub-orb-1" />
      <div className="hub-orb hub-orb-2" />
      <div className="hub-orb hub-orb-3" />
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0" />
    </div>
  );
}
