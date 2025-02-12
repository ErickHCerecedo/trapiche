import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'dummyimage-com.translate.goog',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
