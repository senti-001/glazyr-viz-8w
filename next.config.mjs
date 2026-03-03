/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    /*
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://glazyr.com/:path*",
        permanent: true,
      },
    ]
  },
  */
    devIndicators: {
        buildActivity: false,
    },
}

export default nextConfig
