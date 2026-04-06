import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollTo } from "@/lib/scrollTo";

export type NavTheme = "gsap" | "editorial" | "bold" | "cinematic";

const navLinks = ["About", "Projects", "Resume"];

function getPillStyles(theme: NavTheme): React.CSSProperties {
  switch (theme) {
    case "editorial":
      return {
        background: "rgba(3, 7, 18, 0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      };
    case "bold":
      return {
        background: "rgba(0, 0, 0, 0.95)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      };
    case "gsap":
    case "cinematic":
    default:
      return {
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      };
  }
}

interface NavbarProps {
  theme?: NavTheme;
}

const Navbar = ({ theme = "gsap" }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pillStyles = getPillStyles(theme);

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
          className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <img
            src="/images/logo.png"
            alt="Chee Pheng portfolio logo"
            className="h-12 w-12"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
          />
        </button>

        {/* Center nav - desktop */}
        <div
          className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1.5 gap-1"
          style={pillStyles}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-3.5 py-1.5 text-sm font-medium font-body rounded-full flex items-center gap-1.5 bg-white text-black"
          >
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="liquid-glass rounded-full p-3"
                style={pillStyles}
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-950 border-gray-800">
              <SheetTitle className="text-foreground font-heading italic text-2xl mb-6">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => { scrollTo(link.toLowerCase()); setOpen(false); }}
                    className="text-left text-lg font-body text-white/90 hover:text-white transition-colors py-3"
                  >
                    {link}
                  </button>
                ))}
                <button
                  onClick={() => { scrollTo("contact"); setOpen(false); }}
                  className="mt-4 px-5 py-2.5 text-sm font-medium font-body rounded-full flex items-center gap-2 w-fit bg-white text-black"
                >
                  Contact
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-12 hidden md:block" />
      </div>
    </nav>
  );
};

export default Navbar;
