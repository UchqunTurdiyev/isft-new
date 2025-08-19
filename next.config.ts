// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Build vaqtida ESLint xatolarida to‘xtamasin (istalgan payt olib tashlashingiz mumkin)
    ignoreDuringBuilds: true,
  },
  // Agar TypeScript xatolari sabab build to‘xtasa, vaqtincha quyini yoqish mumkin:
  // typescript: { ignoreBuildErrors: true },
}

export default nextConfig
