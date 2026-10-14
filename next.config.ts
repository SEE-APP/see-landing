import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const isVercel = Boolean(process.env.VERCEL);
// Preview deployments load the Vercel Toolbar (comments) from these origins.
const toolbar = process.env.VERCEL_ENV === 'preview' ? ' https://vercel.live' : '';

// No nonces: they would make every page dynamic. The theme script is the only inline script.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${toolbar}`,
  `style-src 'self' 'unsafe-inline'${toolbar}`,
  `img-src 'self' blob: data:${toolbar && `${toolbar} https://vercel.com`}`,
  `font-src 'self'${toolbar && `${toolbar} https://assets.vercel.com`}`,
  `connect-src 'self'${toolbar && `${toolbar} wss://ws-us3.pusher.com`}`,
  `frame-src 'self'${toolbar}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Only on Vercel, so `next start` over plain http on localhost keeps working.
  ...(isVercel ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  // Add `includeSubDomains; preload` only once every subdomain of the production domain serves HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // A request carries the form plus the previous form state, so about twice the longest message
      // (4000 Georgian characters ≈ 12 KB) plus notes: ~30 KB at most. Larger bodies throw before the action runs.
      bodySizeLimit: '64kb',
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
