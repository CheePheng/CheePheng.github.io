import Navbar from "@/components/Navbar";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import CaseStudyCard from "@/components/casestudy/CaseStudyCard";
import CaseStudyLower from "@/components/casestudy/CaseStudyLower";
import ShippedStrip from "@/components/casestudy/ShippedStrip";
import ChapterFooter from "@/components/ChapterFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { projects } from "@/data/projects";

export default function CaseStudiesPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen relative bg-[#0f0c08]">
      <Navbar theme="editorial" />
      <CaseStudyHero />
      <ShippedStrip />

      {/* Featured projects section */}
      <section id="projects" className="relative z-10 py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto space-y-6">
          {featured.map((project, i) => (
            <CaseStudyCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <CaseStudyLower />
      <ChapterFooter destination="bold" />
      <ScrollToTop />
    </div>
  );
}
