import Navbar from "@/components/Navbar";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import CaseStudyCard from "@/components/casestudy/CaseStudyCard";
import CaseStudyLower from "@/components/casestudy/CaseStudyLower";
import ScrollToTop from "@/components/ScrollToTop";
import { projects } from "@/data/projects";

export default function CaseStudiesPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen relative bg-[#0f0c08]">
      {/* Warm bronze/amber gradient mesh — editorial tone */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-orange-500/[0.025] rounded-full blur-[140px]" />
        <div className="absolute top-2/3 left-1/2 w-[350px] h-[350px] bg-yellow-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <Navbar theme="editorial" />
      <CaseStudyHero />

      {/* Featured projects section */}
      <section id="projects" className="relative z-10 py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto space-y-6">
          {featured.map((project, i) => (
            <CaseStudyCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <CaseStudyLower />
      <ScrollToTop />
    </div>
  );
}
