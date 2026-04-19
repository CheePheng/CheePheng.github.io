import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollFrameHero from "@/components/ScrollFrameHero";
import ChapterFooter from "@/components/ChapterFooter";
import ScrollToTop from "@/components/ScrollToTop";

function CinematicColophon() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 md:px-16 py-10">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-body uppercase tracking-[0.3em] text-white/45">
        <span>Chee Pheng &middot; Full-stack engineer</span>
        <span>A cinematic reel &middot; 2026</span>
      </div>
    </footer>
  );
}

export default function CinematicPage() {
  return (
    <div className="min-h-screen relative bg-[#07070d]">
      <AuroraBackground />

      <Navbar theme="cinematic" />

      <ScrollFrameHero />

      <ChapterFooter destination="editorial" />

      <CinematicColophon />

      <ScrollToTop />
    </div>
  );
}
