import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import {
  projects,
  experience,
  skillGroups,
  cvHref,
  contactEmail,
} from "@/lib/portfolio-data";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          Mmachukwu
        </h1>
        <p className="mt-4 max-w-xl text-lg text-foreground/80">
          I build user-friendly web applications that are easy to navigate
          and designed to meet both user needs and business goals.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={cvHref}>Get my CV</Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </section>

      {/* ---------------- Projects ---------------- */}
      <section
        id="projects"
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          My Projects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* ---------------- Personal statement ---------------- */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto w-full max-w-2xl px-4 py-14 text-center sm:px-6">
          <p className="font-display text-xl text-foreground sm:text-2xl">
            &ldquo;I like building things that are useful, understandable,
            and enjoyable to use.&rdquo;
          </p>
        </div>
      </section>

      {/* ---------------- Experience ---------------- */}
      <section
        id="experience"
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          My Experience
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {experience.map((entry) => (
            <ExperienceEntry key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      {/* ---------------- Skills & tech stack ---------------- */}
      <section
        id="skills"
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          Skills &amp; Tech Stack
        </h2>
        <div className="mt-8 flex flex-col gap-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-sm uppercase tracking-wide text-foreground/60">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section
        id="contact"
        className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24"
      >
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          Let&apos;s work together.
        </h2>
        <p className="mt-3 text-foreground/80">
          Contact me for an interview or partnership.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={`mailto:${contactEmail}`}>Get in touch</Button>
        </div>
      </section>
    </div>
  );
}