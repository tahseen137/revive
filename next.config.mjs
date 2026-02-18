/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint now configured via .eslintrc.json or CLI flags
  // Instrumentation hook is now available by default in Next.js 16+

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "connect-src 'self' https://api.stripe.com https://vitals.vercel-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "font-src 'self' data:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
