import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");

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

    waitlist.emails.push({
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      source,
    });

    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

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
  // Admin endpoint — could add auth later
  const waitlist = await getWaitlist();
  return NextResponse.json({
    count: waitlist.emails.length,
    emails: waitlist.emails,
  });
}
