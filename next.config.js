/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://ai-aziz-backend.onrender.com"
  },
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
