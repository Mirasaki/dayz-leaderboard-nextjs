const { NODE_ENV } = process.env;

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css;
  font-src 'self' https://cdnjs.cloudflare.com/;
  img-src 'self' data:
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  });
}

// react-refresh needs 'unsafe-eval'
// Next.js needs 'unsafe-inline' during development https://github.com/vercel/next.js/blob/canary/packages/next/client/dev/fouc.js
// Specifying 'nonce' makes a modern browsers ignore 'unsafe-inline'
// else {
//   securityHeaders.push({
//     key: 'Content-Security-Policy',
//     value: 'default-src \'self\'; style-src \'unsafe-inline\'; script-src \'self\' \'unsafe-eval\';'
//   });
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: NODE_ENV !== 'production',
  headers: async () => {
    return [
      {
        // Apply these headers to all routes in our application
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

let withBundleAnalyzer;
if (NODE_ENV !== 'production') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  });
}

module.exports = NODE_ENV !== 'production'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
