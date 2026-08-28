import type { ExperienceEntry as ExperienceEntryType } from "@/lib/portfolio-data";

export function ExperienceEntry({ entry }: { entry: ExperienceEntryType }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-lg text-foreground">{entry.title}</h3>
      {entry.org && (
        <p className="mt-0.5 text-sm text-foreground/60">{entry.org}</p>
      )}
      <p className="mt-2 text-sm text-foreground/75">{entry.description}</p>
    </div>
  );
}