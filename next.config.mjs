/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                pathname: '/**', // разрешает все пути на этом домене
            },
        ],
    },
};

export default nextConfig;