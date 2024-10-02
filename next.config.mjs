/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_PAYLOAD_URL,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_PAYLOAD_URL,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
