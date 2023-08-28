/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sports',
        permanent: false,
      },
    ]
  },
  // generateEtags: false,
}

module.exports = nextConfig
