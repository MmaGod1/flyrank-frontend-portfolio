import type { Metadata } from "next";
import { contactEmail } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About — Mmaduchukwu Mmachukwu Godsgoodness",
  description:
    "CV and background for Mmaduchukwu Mmachukwu Godsgoodness, Frontend Developer focused on AI-assisted web engineering.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-5 text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function Entry({
  title,
  meta,
  bullets,
}: {
  title: string;
  meta?: string;
  bullets: string[];
}) {
  return (
    <div>
      <h3 className="font-display text-base text-foreground">{title}</h3>
      {meta && <p className="mt-0.5 text-sm text-foreground/60">{meta}</p>}
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          Mmaduchukwu Mmachukwu Godsgoodness
        </h1>
        <p className="mt-1 text-foreground/70">
          Frontend Developer — AI-Assisted Web Engineering
        </p>
        <p className="mt-3 text-sm text-foreground/60">
        <a
          href={`mailto:${contactEmail}`}
          className="underline underline-offset-2 hover:text-accent"
        >
          {contactEmail}
        </a>{" "}
        ·{" "}
        <a
          href="https://github.com/MmaGod1"
          className="underline underline-offset-2 hover:text-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/MmaGod1
        </a>
      </p>
      </header>

      <Section title="Professional summary">
        <p className="text-sm sm:text-base">
          Frontend developer with hands-on training in React, Next.js, and
          AI-assisted development workflows, backed by an economics
          background and prior experience in operations and customer-facing
          roles. Comfortable building accessible UI components, debugging
          modern JavaScript tooling, and using AI tools like Claude and
          ChatGPT as part of a daily development workflow. Seeking an
          entry-level or internship role building production frontend
          applications.
        </p>
      </Section>

      <Section title="Technical skills">
        <p className="text-sm sm:text-base">
          React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS,
          Supabase, Git &amp; GitHub, Vercel, Netlify, Python, C, prompt
          engineering (Claude, ChatGPT), basic cybersecurity fundamentals.
        </p>
      </Section>

      <Section title="Experience">
        <Entry
          title="Frontend AI Engineering Intern — FlyRank (Remote)"
          meta="July 2026 – Present"
          bullets={[
            "Built and deployed a personal portfolio site and a set of accessible UI components (modal, tabs, disclosure) using React, TypeScript, and Tailwind CSS, meeting WCAG accessibility guidelines.",
            "Completed a Next.js capstone project from scratch, structuring routes and components and deploying the finished app to Vercel.",
            "Used AI tools such as Claude and ChatGPT as part of a structured prompt engineering workflow to speed up debugging, documentation, and code review.",
            "Resolved dependency conflicts across Vite, Tailwind v4, and React, keeping builds stable across multiple assignment projects.",
            "Managed all project work with Git and GitHub, including setting up authentication for team-based workflows.",
          ]}
        />
        <Entry
          title="Private Coding Tutor — Port Harcourt, Nigeria"
          meta="April 2024 – Present"
          bullets={[
            "Teach HTML, CSS, JavaScript, Python, and C to teenage students, building a curriculum from first principles around each student's pace and goals.",
            "Guided a student from JavaScript fundamentals through DOM manipulation and event handling to a shopping cart capstone project.",
            "Use whiteboard problem-solving to build computational thinking before students write any code.",
            "Prepared a student for an Electrical and Electronics Engineering degree with a curriculum covering Python, C, and the Linux command line.",
          ]}
        />
        <Entry
          title="Administrative Assistant / Secretary — Northern California School, Lagos, Nigeria"
          meta="January 2019 – January 2020"
          bullets={[
            "Supported daily school operations through scheduling, record management, and administrative coordination.",
            "Managed correspondence with suppliers and assisted with inventory tracking and restocking.",
            "Recognised with the Most Dedicated Staff Award and a Merit Award for commitment and impact.",
          ]}
        />
        <Entry
          title="Supermarket Associate (Cashier & Secretary) — Vince Supermarket, Lagos, Nigeria"
          meta="September 2017 – December 2018"
          bullets={[
            "Handled customer transactions and resolved inquiries in a fast-paced retail setting.",
            "Promoted to a secretarial role, managing basic records, schedules, and documentation.",
          ]}
        />
      </Section>

      <Section title="Projects">
        <Entry
          title="E-Commerce Platform — Freelance Client Project"
          bullets={[
            "Building a full e-commerce site for a clothing and merchandise brand using Next.js, Tailwind CSS, Supabase, and Paystack, including an admin dashboard for product and inventory management and a Paystack-integrated checkout flow, deployed on Vercel.",
          ]}
        />
        <Entry
          title="Interactive 3D Web Experience — Personal Project"
          bullets={[
            "Developed and debugged an interactive 3D web project using React Three Fiber, deployed on Netlify.",
          ]}
        />
      </Section>

      <Section title="Education">
        <Entry
          title="B.Sc. Economics — University of Calabar, Nigeria"
          bullets={[
            "CGPA: 4.48 / 5.0. Awarded Highest CGPA (First Year).",
          ]}
        />
      </Section>

      <Section title="Technical training">
        <Entry
          title="ALX Software Engineering Program"
          meta="March 2024 – February 2025"
          bullets={[
            "Hands-on training in software development fundamentals, JavaScript, Python, HTML, and CSS; built and documented projects on GitHub.",
          ]}
        />
        <Entry
          title="3MTT Cybersecurity Program"
          meta="June 2025 – December 2025"
          bullets={[
            "Training in cybersecurity fundamentals, system vulnerabilities, and security best practices.",
          ]}
        />
      </Section>

      <Section title="Certifications">
        <p className="text-sm sm:text-base">
          Career Essentials in Cybersecurity (Microsoft &amp; LinkedIn, 2025)
          · Teamwork Foundations (LinkedIn, 2025) · Unconscious Bias
          (LinkedIn, 2025) · Effective Listening (LinkedIn, 2025) · Critical
          Thinking for Better Judgment and Decision-Making (LinkedIn, 2025) ·
          Adaptive Leadership (Acumen Academy &amp; Adaptive Change Advisors,
          2025) · Aspire Leaders Program (2025).
        </p>
      </Section>
    </div>
  );
}