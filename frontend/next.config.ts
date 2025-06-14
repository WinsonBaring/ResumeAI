// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // If you are serving images from your /public/assets/images folder,
    // you generally DON'T need a special 'images' configuration here for local patterns.

    // next/image automatically handles static assets in `public`.
    rewrites: async () => {
      return [
        {
          // 👇 matches all routes except /api
          source: "/((?!api/).*)",
          destination: "/static-app-shell",
        },
      ];
    },
    logging: {
        fetches: {
          fullUrl: true,
        },
      },

    // Example of a valid 'images' configuration (if you needed it for remote domains):
    images: {
        remotePatterns: [
            new URL('https://miro.medium.com/v2/resize:fit:1400/format:webp/0*X34fMZ-X7U0cEavh'),
            new URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"),
            new URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq49TZ7uBGmA3DVysJwhOKpBlCRucxLN3fdg&s")
        ],
    },

    // You can also specify domains directly for simpler cases:
    // images: {
    //     domains: ['example.com', 'another-cdn.net'],
    // },
};

export default nextConfig;