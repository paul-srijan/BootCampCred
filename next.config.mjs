/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    experimental: {
      appDir: true,
    },
    images: {
      unoptimized: true, // Disable image optimization for static export
    },
};
  
export default nextConfig;
