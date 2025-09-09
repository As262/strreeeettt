/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // top-level output flag for static export
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.pexels.com'],
  },
};

module.exports = nextConfig; // <-- export outside the config object
