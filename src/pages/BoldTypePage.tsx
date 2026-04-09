import Navbar from "@/components/Navbar";
import BoldHero from "@/components/bold/BoldHero";
import MasonryProjects from "@/components/bold/MasonryProjects";
import BoldLower from "@/components/bold/BoldLower";
import ScrollToTop from "@/components/ScrollToTop";

export default function BoldTypePage() {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Minimal gradient mesh — mostly pure black */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 -left-1/3 w-[400px] h-[400px] bg-violet-500/[0.025] rounded-full blur-[180px]" />
      </div>

      <Navbar theme="bold" />
      <BoldHero />
      <MasonryProjects />
      <BoldLower />
      <ScrollToTop />
    </div>
  );
}
