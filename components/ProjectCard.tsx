import { Button } from "@/components/Button";
import type { Project } from "@/lib/portfolio-data";

export function ProjectCard({ project }: { project: Project }) {
  const hasRealLink = project.href && project.href !== "#";

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex aspect-video items-center justify-center border-b border-border bg-background text-sm text-foreground/40">
        Project preview
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg text-foreground">
          {project.title}
        </h3>
        <p className="flex-1 text-sm text-foreground/75">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasRealLink ? (
          <Button href={project.href} variant="secondary" className="mt-1 self-start">
            View project
          </Button>
        ) : (
          <span className="mt-1 self-start text-xs text-foreground/50">
            Link coming soon
          </span>
        )}
      </div>
    </div>
  );
}