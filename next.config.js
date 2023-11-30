/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // reactStrictMode: false,
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {fs: false}
  //   return config
  // }


  // webpack(config) {
  //   config.resolve.fallback = {

  //     // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped.
  //     ...config.resolve.fallback,  

  //     fs: false, // the solution
  //   };
    
  //   return config;
  // },
}

module.exports = nextConfig
