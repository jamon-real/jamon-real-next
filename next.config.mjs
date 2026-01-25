/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Allows the site to be served from a subdirectory
    trailingSlash: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
}

export default nextConfig
