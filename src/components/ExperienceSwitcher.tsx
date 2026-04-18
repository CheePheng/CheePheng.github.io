import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Grid2X2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOME = { label: "Home", icon: "🏠", path: "/" } as const;

const EXPERIENCES = [
  { label: "Hub", icon: "🧭", path: "/hub" },
  { label: "Bold Type", icon: "▌", path: "/bold" },
  { label: "192 Frames", icon: "🎬", path: "/cinematic" },
] as const;

export default function ExperienceSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

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

  // Escape key closes menu and returns focus to the trigger
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // First item receives focus when menu opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => firstItemRef.current?.focus());
    }
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
      className="fixed"
      style={{ bottom: 20, right: 16, zIndex: 60 }}
    >
      {/* Expanded menu — renders above the pill */}
      <div
        ref={menuRef}
        role="menu"
        aria-label="Experience switcher"
        id="experience-menu"
        className="surface-translucent-strong absolute bottom-full mb-2 right-0 rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          minWidth: 180,
          visibility: "hidden",
          opacity: 0,
        }}
      >
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Home entry */}
          {(() => {
            const isHome = location.pathname === "/" || location.pathname === "/case-studies";
            return (
              <button
                ref={firstItemRef}
                role="menuitem"
                onClick={() => handleSelect(HOME.path)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-body text-left
                  transition-colors duration-150
                  ${
                    isHome
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/8 hover:text-white"
                  }
                `}
              >
                <span className="text-base leading-none">{HOME.icon}</span>
                <span className="flex-1 font-medium">{HOME.label}</span>
                {isHome && (
                  <span className="text-[10px] font-semibold text-white bg-white/15 px-1.5 py-0.5 rounded-full tracking-wide">
                    NOW
                  </span>
                )}
              </button>
            );
          })()}

          {/* Divider */}
          <div className="my-1 mx-2 h-px bg-white/10" aria-hidden="true" />

          {EXPERIENCES.map((exp) => {
            const isCurrent = location.pathname === exp.path;
            return (
              <button
                key={exp.path}
                role="menuitem"
                onClick={() => handleSelect(exp.path)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-body text-left
                  transition-colors duration-150
                  ${
                    isCurrent
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/8 hover:text-white"
                  }
                `}
              >
                <span className="text-base leading-none">{exp.icon}</span>
                <span className="flex-1 font-medium">{exp.label}</span>
                {isCurrent && (
                  <span className="text-[10px] font-semibold text-white bg-white/15 px-1.5 py-0.5 rounded-full tracking-wide">
                    NOW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill trigger */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="surface-translucent-strong inline-flex items-center justify-center gap-2 rounded-full px-4 min-h-[44px] min-w-[44px] text-sm font-body font-medium text-white/90 hover:text-white transition-colors"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        aria-label="Switch experience"
        aria-expanded={open}
        aria-controls="experience-menu"
        aria-haspopup="menu"
      >
        <Grid2X2 className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Menu</span>
      </button>
    </div>
  );
}
