// const nextConfig = {
//   experimental: {
//     typedRoutes: false
//   },
//   serverExternalPackages: [
//     "firebase"
//   ],
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com"
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com"
//       }
//     ]
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.5"],

  typedRoutes: false,

  serverExternalPackages: ["firebase"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;