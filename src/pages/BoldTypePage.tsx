import Navbar from "@/components/Navbar";
import BoldHero from "@/components/bold/BoldHero";
import MasonryProjects from "@/components/bold/MasonryProjects";
import BoldLower from "@/components/bold/BoldLower";
import ChapterFooter from "@/components/ChapterFooter";
import ScrollToTop from "@/components/ScrollToTop";

export default function BoldTypePage() {
  return (
    <div className="min-h-screen relative bg-[#0a0807]">
      <Navbar theme="bold" />
      <BoldHero />
      <MasonryProjects />
      <BoldLower />
      <ChapterFooter destination="cinematic" />
      <ScrollToTop />
    </div>
  );
}
