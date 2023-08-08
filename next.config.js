/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/sports',
          permanent: false,
        },
      ];
    },
  };

module.exports = nextConfig