/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://ai-aziz-backend.onrender.com"
  }
};

module.exports = nextConfig;
