/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**/**',
            },
            {
                protocol: 'https',
                hostname: 's.gravatar.com'
            }
        ],
    },
};

export default nextConfig;
