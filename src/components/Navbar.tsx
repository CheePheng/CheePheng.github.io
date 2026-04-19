import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollTo } from "@/lib/scrollTo";

export type NavTheme = "gsap" | "editorial" | "bold" | "cinematic" | "hub";

const navLinks = ["About", "Projects", "Resume"];

function getPillStyles(theme: NavTheme): React.CSSProperties {
  switch (theme) {
    case "bold":
      return {
        background: "rgba(10, 8, 7, 0.95)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      };
    case "hub":
      return {
        background: "oklch(97% 0.012 85 / 0.85)",
        border: "1px solid oklch(82% 0.018 85)",
        boxShadow: "0 6px 20px oklch(22% 0.02 80 / 0.08)",
      };
    case "editorial":
    case "gsap":
    case "cinematic":
    default:
      return {
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      };
  }
}

function getPillSurfaceClass(theme: NavTheme): string {
  switch (theme) {
    case "editorial":
      return "surface-translucent-editorial";
    case "bold":
    case "hub":
      return "";
    case "gsap":
    case "cinematic":
    default:
      return "surface-translucent";
  }
}

interface NavbarProps {
  theme?: NavTheme;
}

const Navbar = ({ theme = "gsap" }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pillStyles = getPillStyles(theme);
  const pillSurface = getPillSurfaceClass(theme);
  const isHub = theme === "hub";

  const linkClass = isHub
    ? "relative px-3 py-2 text-sm font-medium text-[color:var(--hub-ink-muted)] font-hub-body hover:text-[color:var(--hub-ink)] transition-colors after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-[color:var(--hub-green-deep)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-[var(--ease-out-quart)] hover:after:scale-x-100 focus-visible:after:scale-x-100"
    : "relative px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-white/50 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-[var(--ease-out-quart)] hover:after:scale-x-100 focus-visible:after:scale-x-100";

  const contactPillClass = isHub
    ? "px-3.5 py-1.5 text-sm font-medium font-hub-body rounded-full flex items-center gap-1.5 bg-[color:var(--hub-ink)] text-[color:var(--hub-bg-elev)] hover:bg-[color:var(--hub-green-deep)] transition-colors"
    : "px-3.5 py-1.5 text-sm font-medium font-body rounded-full flex items-center gap-1.5 bg-white text-black";

  const hamburgerIconClass = isHub ? "h-5 w-5 text-[color:var(--hub-ink)]" : "h-5 w-5 text-white";

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <button
          onClick={handleLogoClick}
          aria-label="Go to home"
          className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <img
            src="/images/logo.png"
            alt="Chee Pheng portfolio logo"
            className="h-12 w-12"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
          />
        </button>

        {/* Center nav - desktop */}
        {theme === "cinematic" ? (
          <div
            className={`hidden md:flex items-center ${pillSurface} rounded-full px-2 py-1.5`}
            style={pillStyles}
          >
            <Link
              to="/"
              className="px-4 py-1.5 text-sm font-medium font-body rounded-full flex items-center gap-1.5 bg-white text-black"
            >
              Selected Work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div
            className={`hidden md:flex items-center ${pillSurface} rounded-full px-2 py-1.5 gap-1`}
            style={pillStyles}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={linkClass}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className={contactPillClass}
            >
              Contact
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Mobile */}
        <div className="md:hidden">
          {theme === "cinematic" ? (
            <Link
              to="/"
              className={`${pillSurface} rounded-full px-5 min-h-[44px] text-sm font-medium font-body inline-flex items-center gap-1.5 bg-white text-black`}
            >
              Selected Work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={`${pillSurface} rounded-full p-3`}
                  style={pillStyles}
                >
                  <Menu className={hamburgerIconClass} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={
                  isHub
                    ? "bg-[color:var(--hub-bg)] border-[color:var(--hub-border)]"
                    : "bg-gray-950 border-gray-800"
                }
              >
                <SheetTitle
                  className={
                    isHub
                      ? "text-[color:var(--hub-ink)] font-hub-display italic text-2xl mb-6"
                      : "text-foreground font-heading italic text-2xl mb-6"
                  }
                >
                  Menu
                </SheetTitle>
                <div className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => { scrollTo(link.toLowerCase()); setOpen(false); }}
                      className={
                        isHub
                          ? "text-left text-lg font-hub-body text-[color:var(--hub-ink-muted)] hover:text-[color:var(--hub-ink)] transition-colors py-3"
                          : "text-left text-lg font-body text-white/90 hover:text-white transition-colors py-3"
                      }
                    >
                      {link}
                    </button>
                  ))}
                  <button
                    onClick={() => { scrollTo("contact"); setOpen(false); }}
                    className={
                      isHub
                        ? "mt-4 px-5 min-h-[44px] text-sm font-medium font-hub-body rounded-full flex items-center gap-2 w-fit bg-[color:var(--hub-ink)] text-[color:var(--hub-bg-elev)]"
                        : "mt-4 px-5 min-h-[44px] text-sm font-medium font-body rounded-full flex items-center gap-2 w-fit bg-white text-black"
                    }
                  >
                    Contact
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        <div className="w-12 hidden md:block" />
      </div>
    </nav>
  );
};

export default Navbar;
