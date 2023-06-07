/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  images: {
    domains: ['cdn.myanimelist.net'],
  },

  reactStrictMode: true,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'api.ts'],
};

module.exports = nextConfig;
