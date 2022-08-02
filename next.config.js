/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REGION: process.env.REGION,
    COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
    COGNITO_USER_POOL_WEB_CLIENT_ID:
    process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
  webpack(config) {
    config.resolve.modules.push('public');
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
