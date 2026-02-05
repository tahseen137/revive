import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Resend } from "resend";

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");
const WAITLIST_LOG_FILE = path.join(process.cwd(), "data", "waitlist.log");

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function ensureDataDir() {
  const dir = path.dirname(WAITLIST_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // already exists
  }
}

async function getWaitlist(): Promise<{ emails: { email: string; timestamp: string; source: string }[] }> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { emails: [] };
  }
}

async function logSignup(email: string, source: string, timestamp: string) {
  try {
    const logEntry = `[${timestamp}] New signup: ${email} (source: ${source})\n`;
    await fs.appendFile(WAITLIST_LOG_FILE, logEntry, "utf-8");
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
}

async function sendNotification(email: string, source: string) {
  const timestamp = new Date().toISOString();
  
  // Log to file
  await logSignup(email, source, timestamp);
  
  // Send email notification if Resend is configured
  if (resend && process.env.NOTIFY_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "notifications@revive.com",
        to: process.env.NOTIFY_EMAIL,
        subject: "🎉 New Revive Waitlist Signup",
        html: `
          <h2>New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `,
      });
      console.log(`Email notification sent for ${email}`);
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  }
  
  // Webhook notification (if configured)
  if (process.env.WAITLIST_WEBHOOK_URL) {
    try {
      await fetch(process.env.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎉 **New Revive Waitlist Signup**\n📧 Email: ${email}\n📍 Source: ${source}\n⏰ Time: ${new Date(timestamp).toLocaleString()}`,
        }),
      });
      console.log(`Webhook notification sent for ${email}`);
    } catch (error) {
      console.error("Error sending webhook notification:", error);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, source = "landing" } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    await ensureDataDir();
    const waitlist = await getWaitlist();

    // Check for duplicates
    if (waitlist.emails.some((e) => e.email === normalizedEmail)) {
      return NextResponse.json(
        { message: "You're already on the list! We'll be in touch soon." },
        { status: 200 }
      );
    }

    const timestamp = new Date().toISOString();
    waitlist.emails.push({
      email: normalizedEmail,
      timestamp,
      source,
    });

    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

    // Send notifications (fire and forget - don't block response)
    sendNotification(normalizedEmail, source).catch(console.error);

    return NextResponse.json(
      { message: "You're on the list! We'll notify you when we launch." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint is deprecated - use /api/admin/waitlist instead
  return NextResponse.json(
    { error: "Please use /api/admin/waitlist endpoint" },
    { status: 403 }
  );
}
