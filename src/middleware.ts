/**
 * Next.js Middleware — A/B Testing + Authentication
 *
 * 1. A/B test: Splits homepage traffic 50/50 between variants A and B.
 *    - Variant A (default): current page.tsx
 *    - Variant B: /variantb/page.tsx (rewrites / → /variantb internally)
 *    - Cookie `ab_variant` persists assignment for 30 days
 *
 * 2. Auth: Enforces auth for protected API routes.
 *    Public routes are whitelisted below.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/api/webhooks/stripe',
  '/api/waitlist',
  '/api/feedback',
  '/api/health',
  '/api/acp',
  '/api/connect',
  '/api/stripe/connect',
  '/api/stripe/callback',
  '/api/update-card',
  '/api/auth/login',
  '/api/checkout',
];

// Routes that require cron secret (handled separately)
const CRON_ROUTES = [
  '/api/cron/',
  '/api/email/send',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ── A/B Test (homepage only) ──────────────────────────────────────────────
  if (path === '/') {
    const existingVariant = request.cookies.get('ab_variant')?.value;
    const variant = existingVariant || (Math.random() < 0.5 ? 'a' : 'b');

    if (variant === 'b') {
      const response = NextResponse.rewrite(new URL('/variantb', request.url));
      if (!existingVariant) {
        response.cookies.set('ab_variant', 'b', {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
          sameSite: 'lax',
        });
      }
      return response;
    }

    // Variant A — serve normally, just set the cookie if missing
    if (!existingVariant) {
      const response = NextResponse.next();
      response.cookies.set('ab_variant', 'a', {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.next();
  }

  // ── Auth (API routes only) ────────────────────────────────────────────────
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

  if (!authHeader && !sessionCookie) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api/:path*'],
};
