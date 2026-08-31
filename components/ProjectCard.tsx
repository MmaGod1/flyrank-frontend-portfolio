import { Button } from "@/components/Button";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.08.78 2.17v3.22c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-background text-sm text-foreground/40">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          "Project preview"
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-foreground">{project.title}</h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="mt-0.5 shrink-0 rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-background hover:text-foreground"
          >
            <GithubIcon />
          </a>
        </div>

        <p className="flex-1 text-sm text-foreground/75">{project.description}</p>

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
      </div>
    </div>
  );
}