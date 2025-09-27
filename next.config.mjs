/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  // Base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/az-900' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/az-900/' : '',
}

export default nextConfig