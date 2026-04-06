import { ProjectCategory, categoryLabels } from "@/data/projects";

interface ProjectFiltersProps {
  active: ProjectCategory | "all";
  onChange: (category: ProjectCategory | "all") => void;
}

const categories: (ProjectCategory | "all")[] = ["all", "ai", "web", "systems"];

export default function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-colors border ${
            active === cat
              ? "bg-violet-500/15 text-violet-300 border-violet-500/30"
              : "text-white/40 border-white/[0.06] hover:text-white/60 hover:border-white/10"
          }`}
        >
          {cat === "all" ? "All" : categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
