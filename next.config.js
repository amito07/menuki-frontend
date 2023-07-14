/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://menuki.noeticit.tech',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'menuki.noeticit.tech',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
