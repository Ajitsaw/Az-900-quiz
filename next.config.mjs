/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  // Remove basePath and assetPrefix - let GitHub Actions handle this
  // OR use environment-based configuration:
  basePath: process.env.NODE_ENV === 'production' ? '/az-900' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/az-900/' : '',
}

export default nextConfig