/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Build paytida ESLint xatolarini to‘xtatmaydi
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
