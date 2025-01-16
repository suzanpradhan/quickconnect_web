/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.3:8000",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};
export default nextConfig;
