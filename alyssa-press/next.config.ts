import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Add the ui-library/dist path to Webpack's module resolution
    config.resolve.modules.push(path.resolve(__dirname, 'ui-library/dist'));
    return config;
  },
  transpilePackages: ['three'],  // Add this line to transpile the three package
};

export default nextConfig;
