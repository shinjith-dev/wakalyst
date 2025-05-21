// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    esmExternals: false,
  },
  transpilePackages: ["waka"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
};
