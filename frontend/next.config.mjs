/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'movies.monnaie-services.com',
                pathname: '/BE/poster/**',
            },
        ],
    },
};

export default nextConfig;
