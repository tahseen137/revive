import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");
const WAITLIST_LOG_FILE = path.join(process.cwd(), "data", "waitlist.log");

async function getWaitlist(): Promise<{ emails: { email: string; timestamp: string; source: string }[] }> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { emails: [] };
  }
}

async function getLog(): Promise<string> {
  try {
    return await fs.readFile(WAITLIST_LOG_FILE, "utf-8");
  } catch {
    return "";
  }
}

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("Authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.warn("ADMIN_SECRET not configured - admin endpoint is open!");
    return true; // Allow access if no secret is set (for development)
  }

  if (!authHeader) {
    return false;
  }

  // Support both "Bearer <token>" and just "<token>"
  const token = authHeader.startsWith("Bearer ") 
    ? authHeader.substring(7) 
    : authHeader;

  return token === adminSecret;
}

export async function GET(req: NextRequest) {
  // Check authentication
  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const waitlist = await getWaitlist();
    const log = await getLog();

    // Parse query parameters for filtering
    const url = new URL(req.url);
    const includeLog = url.searchParams.get("log") === "true";
    const format = url.searchParams.get("format") || "json";

    const response = {
      count: waitlist.emails.length,
      signups: waitlist.emails,
      ...(includeLog && { log: log.split("\n").filter(Boolean) }),
    };

    if (format === "csv") {
      // Return as CSV
      const csv = [
        "Email,Timestamp,Source",
        ...waitlist.emails.map(e => `${e.email},${e.timestamp},${e.source}`)
      ].join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=waitlist.csv",
        },
      });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Admin waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    );
  }
}
