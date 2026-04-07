import Navbar from "@/components/Navbar";
import GsapHero from "@/components/gsap/GsapHero";
import HorizontalScrollProjects from "@/components/gsap/HorizontalScrollProjects";
import AboutContent from "@/components/AboutContent";
import TranscriptsContent from "@/components/TranscriptsContent";
import ContactContent from "@/components/ContactContent";
import ScrollToTop from "@/components/ScrollToTop";

export default function GsapHomePage() {
  return (
    <div className="min-h-screen relative bg-[#07070d]">
      {/* CSS gradient mesh background for ambient depth */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-violet-500/[0.09] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-indigo-500/[0.07] rounded-full blur-[130px]" />
        <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[120px]" />
      </div>
      <Navbar theme="gsap" />
      <GsapHero />
      <div className="section-divider" />
      <AboutContent theme="gsap" />
      <div className="section-divider" />
      <HorizontalScrollProjects />
      <div className="section-divider" />
      <TranscriptsContent theme="gsap" />
      <div className="section-divider" />
      <ContactContent theme="gsap" />
      <ScrollToTop />
    </div>
  );
}
