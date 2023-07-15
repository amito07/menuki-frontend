/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://menuki.noeticit.tech',
  },
  images: {
    domains: ['menuki.noeticit.tech'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'menuki.noeticit.tech',
        port: '',
        pathname: '',
      },
    ],
  },
}

module.exports = nextConfig
