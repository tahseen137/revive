import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { checkRateLimit, getClientIp, feedbackRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const rateLimitError = await checkRateLimit(feedbackRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { feedback, email } = body;

    if (!feedback || typeof feedback !== "string") {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
    }

    const feedbackEntry = {
      id: crypto.randomUUID(),
      feedback: feedback.trim(),
      email: email || null,
      timestamp: new Date().toISOString(),
      product: "revive",
    };

    // Log to console
    console.log("[FEEDBACK]", JSON.stringify(feedbackEntry, null, 2));

    // Try to append to feedback.json (will work in dev, may not in serverless)
    try {
      const feedbackPath = path.join(process.cwd(), "feedback.json");
      let existing: unknown[] = [];
      try {
        const data = await fs.readFile(feedbackPath, "utf-8");
        existing = JSON.parse(data);
      } catch {
        // File doesn't exist yet, start fresh
      }
      existing.push(feedbackEntry);
      await fs.writeFile(feedbackPath, JSON.stringify(existing, null, 2));
    } catch (err) {
      // Serverless environments can't write files - that's ok, we logged it
      console.log("[FEEDBACK] Could not write to file (serverless env):", err);
    }

    return NextResponse.json({ success: true, id: feedbackEntry.id });
  } catch (error) {
    console.error("[FEEDBACK ERROR]", error);
    return NextResponse.json({ error: "Failed to process feedback" }, { status: 500 });
  }
}
