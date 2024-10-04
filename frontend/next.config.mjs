/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cinenews.be',
            },
        ],
    },
};

export default nextConfig;
