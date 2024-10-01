/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if you want to allow non-https domains as well
        hostname: "**", // Allow all hostnames
      },
    ],
  },
};

module.exports = nextConfig;
