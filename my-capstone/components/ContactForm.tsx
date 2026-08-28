"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Please enter a message.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setStatusMessage("Thanks — your message has been sent. I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-8 flex w-full max-w-md flex-col gap-4 text-left"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={nameId} className="text-sm font-body text-foreground/80">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
         className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
        />
        {errors.name && (
          <p id={`${nameId}-error`} className="text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={emailId} className="text-sm font-body text-foreground/80">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
        />
        {errors.email && (
          <p id={`${emailId}-error`} className="text-sm text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={messageId} className="text-sm font-body text-foreground/80">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className="w-full resize-y rounded-lg border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
        />
        {errors.message && (
          <p id={`${messageId}-error`} className="text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 font-body font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={
          status === "success"
            ? "text-sm text-green-700 dark:text-green-400"
            : status === "error"
              ? "text-sm text-red-600 dark:text-red-400"
              : "sr-only"
        }
      >
        {statusMessage}
      </p>
    </form>
  );
}