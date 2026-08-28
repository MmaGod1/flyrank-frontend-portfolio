import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmail } from "@/lib/portfolio-data";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please try emailing directly." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = payload;

  if (!isNonEmptyString(name, 100)) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isNonEmptyString(email, 200) || !EMAIL_RE.test((email as string).trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isNonEmptyString(message, 5000)) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const safeName = (name as string).trim();
  const safeEmail = (email as string).trim();
  const safeMessage = (message as string).trim();

  // Constructed here, per-request, not at module load — avoids Vercel's
  // build-time "collect page data" pass importing this module before
  // the runtime environment variables are available.
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: safeEmail,
      subject: `New portfolio message from ${safeName}`,
      text: `From: ${safeName} <${safeEmail}>\n\n${safeMessage}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "The message could not be sent right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return NextResponse.json(
      { error: "The message could not be sent right now. Please try again shortly." },
      { status: 500 }
    );
  }
}