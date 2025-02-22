import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.trapichedigital.com.mx',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'trapichedigital.com.mx',
                pathname: '/**',
            },
        ],
    }
}

export default nextConfig
