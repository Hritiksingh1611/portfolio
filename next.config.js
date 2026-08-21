/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : '',
  allowedDevOrigins: ['192.168.1.7', '192.168.1.*', 'localhost'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compress: true,
};

module.exports = nextConfig;
