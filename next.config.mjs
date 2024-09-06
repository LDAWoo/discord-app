/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["uploadthing.com", "utfs.io", "img.clerk.com"],
    },
};

export default nextConfig;
