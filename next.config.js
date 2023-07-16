/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://menuki.noeticit.tech',
    // BASE_URL: 'http://127.0.0.1:8000',
  },
  images: {
    domains: ['menuki.noeticit.tech'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'menuki.noeticit.tech'
      },
    ],
  },
}

module.exports = nextConfig
