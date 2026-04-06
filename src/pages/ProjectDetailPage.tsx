import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.featured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-heading italic gradient-text">404</h1>
          <p className="mb-4 text-lg text-white/40 font-body">Project not found</p>
          <Link to="/" className="text-violet-400 font-body hover:text-violet-300 transition-colors">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-white p-8">
      <h1 className="text-4xl font-heading italic gradient-text">{project.name}</h1>
      <p className="text-white/40 mt-2">Case study page — placeholder</p>
    </div>
  );
}
