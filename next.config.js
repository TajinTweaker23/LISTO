/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow these domains for image optimization
    domains: ['picsum.photos', 'listo-listo.firebaseapp.com', 'source.unsplash.com'],
    // Additionally, use remotePatterns for a catch-all HTTPS rule
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Any other configuration can go here
};

module.exports = nextConfig;