/**
 * Environment variable validation for Revive
 * 
 * Validates that required env vars are set in production.
 * In development, logs warnings for missing optional vars.
 */

interface EnvConfig {
  // Required
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;

  // Security — required in production
  API_SECRET_KEY: string;
  ADMIN_SECRET: string;
  CRON_SECRET: string;
  CARD_UPDATE_SECRET: string;

  // Optional
  RESEND_API_KEY?: string;
  KV_REST_API_URL?: string;
  KV_REST_API_TOKEN?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
}

const REQUIRED_VARS: (keyof EnvConfig)[] = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_APP_URL",
  "API_SECRET_KEY",
  "ADMIN_SECRET",
  "CRON_SECRET",
  "CARD_UPDATE_SECRET",
];

const REQUIRED_IN_PRODUCTION: string[] = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_APP_URL",
  "API_SECRET_KEY",
  "ADMIN_SECRET",
  "CRON_SECRET",
  "CARD_UPDATE_SECRET",
];

/**
 * Validate environment variables at startup.
 * In production: throws if any required var is missing.
 * In development: logs warnings only.
 */
export function validateEnv(): void {
  const isProduction = process.env.NODE_ENV === "production";
  const missing: string[] = [];
  const vars = isProduction ? REQUIRED_IN_PRODUCTION : REQUIRED_VARS;

  for (const key of vars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  // Check Redis in production
  if (isProduction) {
    const hasRedis =
      (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

    if (!hasRedis) {
      missing.push("KV_REST_API_URL+KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL+UPSTASH_REDIS_REST_TOKEN)");
    }
  }

  if (missing.length > 0) {
    const message = `Missing required environment variables:\n  - ${missing.join("\n  - ")}`;
    if (isProduction) {
      throw new Error(message);
    } else {
      console.warn(`⚠️  [Env Validation] ${message}`);
    }
  }
}
