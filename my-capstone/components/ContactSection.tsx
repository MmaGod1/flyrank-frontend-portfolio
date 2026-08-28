"use client";

import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";

const buttonClasses =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent bg-accent text-accent-ink hover:opacity-90";

export function ContactSection({ contactEmail }: { contactEmail: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        Let&apos;s work together.
      </h2>
      <p className="mt-3 text-foreground/80">
        Contact me for an interview or partnership.
      </p>

      {showForm ? (
        <ContactForm />
      ) : (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className={buttonClasses}
          >
            Get in touch
          </button>
        </div>
      )}

      <p className="mt-6 text-sm text-foreground/60">
        Prefer email? Reach me directly at{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="underline underline-offset-2 hover:text-accent"
        >
          {contactEmail}
        </a>
        .
      </p>
    </>
  );
}