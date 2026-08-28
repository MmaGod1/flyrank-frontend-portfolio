
export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const projects: Project[] = [
  {
    title: "Placeholder project 1",
    description:
      "Placeholder description — what this project does and the problem it solves.",
    tags: ["React", "Next.js"],
    href: "#",
  },
  {
    title: "Placeholder project 2",
    description:
      "Placeholder description — what this project does and the problem it solves.",
    tags: ["TypeScript", "Tailwind CSS"],
    href: "#",
  },
  {
    title: "Placeholder project 3",
    description:
      "Placeholder description — what this project does and the problem it solves.",
    tags: ["Python", "SQL"],
    href: "#",
  },
];

export interface ExperienceEntry {
  title: string;
  org?: string;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    title: "FlyRank AI Frontend Engineering",
    description: "Placeholder description — details to be added.",
  },
  {
    title: "Teaching",
    description: "Taught students how to code.",
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    label: "Programming & Data",
    skills: ["Python", "SQL"],
  },
];

// TODO: replace with a real CV file (e.g. drop it in /public and point this
// at "/cv.pdf") or an external link once it's ready.
export const cvHref = "/about";
// TODO: replace with a real contact address.
export const contactEmail = "gmmaduchukwu@gmail.com";