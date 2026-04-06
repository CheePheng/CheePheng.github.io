import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Grid2X2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EXPERIENCES = [
  { label: "GSAP Scroll", icon: "✨", path: "/" },
  { label: "Case Studies", icon: "📖", path: "/case-studies" },
  { label: "Bold Type", icon: "▌", path: "/bold" },
  { label: "192 Frames", icon: "🎬", path: "/cinematic" },
] as const;

const LS_KEY = "preferred-experience";

export default function ExperienceSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [lastVisited, setLastVisited] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Store current path as last visited when route changes
  useEffect(() => {
    localStorage.setItem(LS_KEY, location.pathname);
    setLastVisited(location.pathname);
  }, [location.pathname]);

  // Click-outside handler
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // GSAP expand/collapse animation
  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (reducedMotion) {
        gsap.set(menuRef.current, { autoAlpha: open ? 1 : 0, y: open ? 0 : 8 });
        return;
      }

      if (open) {
        gsap.fromTo(
          menuRef.current,
          { autoAlpha: 0, y: 12, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
        );
      } else {
        gsap.to(menuRef.current, {
          autoAlpha: 0,
          y: 8,
          scale: 0.97,
          duration: 0.16,
          ease: "power2.in",
        });
      }
    },
    { scope: containerRef, dependencies: [open, reducedMotion] }
  );

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-60"
      style={{ bottom: 20, right: 16, zIndex: 60 }}
    >
      {/* Expanded menu — renders above the pill */}
      <div
        ref={menuRef}
        className="absolute bottom-full mb-2 right-0 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(15, 15, 25, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          minWidth: 180,
          visibility: "hidden",
          opacity: 0,
        }}
      >
        <div className="p-1.5 flex flex-col gap-0.5">
          {EXPERIENCES.map((exp) => {
            const isCurrent = location.pathname === exp.path;
            const isLast =
              lastVisited === exp.path && !isCurrent;
            return (
              <button
                key={exp.path}
                onClick={() => handleSelect(exp.path)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-body text-left
                  transition-colors duration-150
                  ${
                    isCurrent
                      ? "bg-violet-500/25 text-violet-200"
                      : "text-white/80 hover:bg-white/8 hover:text-white"
                  }
                `}
              >
                <span className="text-base leading-none">{exp.icon}</span>
                <span className="flex-1 font-medium">{exp.label}</span>
                {isCurrent && (
                  <span className="text-[10px] font-semibold text-violet-400 bg-violet-500/20 px-1.5 py-0.5 rounded-full tracking-wide">
                    NOW
                  </span>
                )}
                {isLast && (
                  <span className="text-[10px] font-semibold text-white/30 bg-white/8 px-1.5 py-0.5 rounded-full tracking-wide">
                    LAST
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-body font-medium text-white/90 hover:text-white transition-colors"
        style={{
          background: "rgba(15, 15, 25, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        aria-label="Switch experience"
        aria-expanded={open}
      >
        <Grid2X2 className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">4 Experiences</span>
      </button>
    </div>
  );
}
