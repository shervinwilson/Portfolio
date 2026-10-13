import { NextResponse } from "next/server";

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

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] Email not configured. Message received:", {
        name,
        email,
        message,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      {
        error:
          "The contact form isn't set up yet. Please email me directly instead.",
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
        to: [CONTACT_TO_EMAIL],
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
