const StylelintPlugin = require('stylelint-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin())

    return config
  }
}

module.exports = nextConfig
