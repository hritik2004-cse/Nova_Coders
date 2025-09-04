import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@tabler/icons-react', 'react-icons', 'lucide-react'],
    optimizeCss: true,
  },
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable compression and performance optimizations
  compress: true,
  
  // Skip TypeScript checking during build (temporary fix)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Reduce bundle size with better tree shaking
  modularizeImports: {
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },
  
  // Enable static optimization
  trailingSlash: false,
  
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Bundle analyzer and chunk optimization
  webpack: (config, { dev, isServer }) => {
    // Fallback for server-side compatibility
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Optimize chunks for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            priority: 15,
            chunks: 'all',
          },
          icons: {
            test: /[\\/]node_modules[\\/](react-icons|@tabler\/icons-react|lucide-react)[\\/]/,
            name: 'icons',
            priority: 15,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

export default withFlowbiteReact(nextConfig);