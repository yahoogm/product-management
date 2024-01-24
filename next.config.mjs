/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URI: process.env.MONGODB_URI,
    API_URL: process.env.NEXT_API_URL
  },
};

export default nextConfig;
