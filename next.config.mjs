/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sun9-63.userapi.com',
                pathname: '/**', // разрешает все пути на этом домене
            },
        ],
    },
};

export default nextConfig;