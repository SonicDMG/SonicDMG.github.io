import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure for static export (GitHub Pages)
  output: 'export',
  
  // GitHub Pages uses a subdirectory for user sites
  // For username.github.io, basePath should be empty
  basePath: '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
