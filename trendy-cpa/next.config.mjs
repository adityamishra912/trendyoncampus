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
  allowedDevOrigins: ["10.119.117.208"],

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