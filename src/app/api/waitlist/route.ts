import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { waitlistRateLimit, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeEmail } from "@/lib/sanitize";

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get Redis client
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

// In-memory fallback for development
const memoryWaitlist: { email: string; timestamp: string; source: string }[] = [];

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
}

async function getWaitlist(): Promise<WaitlistEntry[]> {
  const redis = getRedis();
  if (redis) {
    const entries = await redis.lrange<WaitlistEntry>("waitlist:emails", 0, -1);
    return entries || [];
  }
  return memoryWaitlist;
}

async function addToWaitlist(email: string, source: string): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const entry = { email, timestamp, source };
  
  const redis = getRedis();
  if (redis) {
    // Check for duplicate
    const existing = await redis.get<string>(`waitlist:email:${email}`);
    if (existing) return false; // Already exists
    
    // Add to list and set lookup key
    await redis.rpush("waitlist:emails", JSON.stringify(entry));
    await redis.set(`waitlist:email:${email}`, timestamp);
    return true;
  }
  
  // In-memory fallback
  if (memoryWaitlist.some(e => e.email === email)) {
    return false;
  }
  memoryWaitlist.push(entry);
  return true;
}

async function sendNotification(email: string, source: string) {
  const timestamp = new Date().toISOString();
  
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
      console.log(`[Waitlist] Email notification sent for ${sanitizeEmail(email)}`);
    } catch (error) {
      console.error("[Waitlist] Error sending email notification:", error);
    }
  }
  
  // Webhook notification (if configured)
  if (process.env.WAITLIST_WEBHOOK_URL) {
    try {
      await fetch(process.env.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎉 **New Revive Waitlist Signup**\n📧 Email: ${sanitizeEmail(email)}\n📍 Source: ${source}\n⏰ Time: ${new Date(timestamp).toLocaleString()}`,
        }),
      });
      console.log(`[Waitlist] Webhook notification sent for ${sanitizeEmail(email)}`);
    } catch (error) {
      console.error("Error sending webhook notification:", error);
    }
  }
}

export async function POST(req: NextRequest) {
  // Rate limit check: 5 requests per minute per IP
  const ip = getClientIp(req);
  const rateLimitError = await checkRateLimit(waitlistRateLimit, ip);
  if (rateLimitError) return rateLimitError;

  try {
    const { email, source = "landing" } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Add to waitlist (returns false if duplicate)
    const added = await addToWaitlist(normalizedEmail, source);
    
    if (!added) {
      return NextResponse.json(
        { message: "You're already on the list! We'll be in touch soon." },
        { status: 200 }
      );
    }

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
