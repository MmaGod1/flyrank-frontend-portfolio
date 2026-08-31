export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Job Scout & CV Tailor",
    description:
      "A personal job-search agent that scouts postings against a chosen set of URLs, analyzes them against a real CV and profile, and helps tailor applications — without ever inventing skills the CV doesn't support.",
    tags: ["TypeScript", "Node.js", "Gemini AI"],
    href: "https://github.com/MmaGod1/flyrank-personal-agent",
    image: "/projects/job-scout.png",
  },
  {
    title: "HeartPsalm",
    description:
      "A web app that connects how you're feeling to the wisdom of Bible verses and gospel music — describe your emotions and get a personalized verse, with a gospel song recommendation if you want more encouragement.",
    tags: ["JavaScript", "Web App"],
    href: "https://github.com/MmaGod1/HeartPsalm",
    image: "/projects/heartpsalm.png",
  },
  {
    title: "Expense Tracker",
    description:
      "A lightweight expense tracker built with vanilla HTML, CSS, and JavaScript to log and track everyday spending.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/MmaGod1/HTML-CSS-JS_Projects/tree/main/04-expense-tracker",
    image: "/projects/expense-tracker.png",
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
    description:
      "Frontend development training and project work focused on React, Next.js, TypeScript, accessibility, and AI-assisted development.",
  },
  {
    title: "Teaching",
    description:
      "Taught students HTML, CSS, JavaScript, Python, and C, using practical projects and problem-solving exercises.",
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Programming & Data",
    skills: ["Python", "C", "SQL"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "Supabase"],
  },
];

export const cvHref = "/about";

export const contactEmail = "gmmaduchukwu@gmail.com";