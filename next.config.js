/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'listo-listo.firebasestorage.app'], // Allowed external image domains
  },
  // any other configuration can go here
};

module.exports = nextConfig;
