/**
 * Next.js Middleware for authentication
 * 
 * Enforces auth for protected API routes.
 * Public routes are whitelisted below.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  // Webhooks (verified via Stripe signature)
  '/api/webhooks/stripe',
  
  // Public endpoints
  '/api/waitlist',
  '/api/feedback',
  '/api/health',
  '/api/acp', // ACP has its own CORS handling
  
  // Stripe Connect flow
  '/api/stripe/connect',
  '/api/stripe/callback',
  
  // Card update (token-based auth)
  '/api/update-card',
  
  // Login endpoint (needs to be accessible pre-auth)
  '/api/auth/login',
  
  // Checkout (rate limited separately)
  '/api/checkout',
];

// Routes that require cron secret (handled separately)
const CRON_ROUTES = [
  '/api/cron/',
  '/api/email/send',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip non-API routes
  if (!path.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Allow public routes
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Cron routes have their own auth (CRON_SECRET)
  if (CRON_ROUTES.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check for authentication
  const authHeader = request.headers.get('authorization');
  const sessionCookie = request.cookies.get('revive_session');
  
  // If neither auth header nor session cookie present, reject
  if (!authHeader && !sessionCookie) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Let the route handler do the actual verification
  // (middleware can't access env vars for timing-safe comparison)
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
