import { NextResponse } from "next/server";
import { site } from "@/data/site";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").replace(/[\r\n]+/g, " ").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!name || name.length > 100) {
    return NextResponse.json(
      { error: "Enter your name (100 characters or fewer)." },
      { status: 400 }
    );
  }
  if (!isEmail(email) || email.length > 200) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Write a message between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || site.email;

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      {
        error: `Email delivery isn't configured yet. Please email me at ${contactToEmail}.`,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [contactToEmail],
        reply_to: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "The message couldn't be sent. Please try again later." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "The message couldn't be sent. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
