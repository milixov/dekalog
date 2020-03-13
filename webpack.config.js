/* eslint-disable no-undef */
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              import: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.ico',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      orientation: 'portrait',
      display: 'standalone',
      name: 'Sievo App',
      short_name: 'Sievo',
      start_url: '.',
      description: 'Programming Assignment',
      background_color: '#ffffff',
      theme_color: '#000000',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('./public/assets/android-chrome-192x192.png'),
          destination: path.join('assets'),
          size: '192x192',
        },
        {
          src: path.resolve('./public/assets/android-chrome-512x512.png'),
          destination: path.join('assets'),
          size: '512x512',
        },
        {
          src: path.resolve('./public/assets/apple-touch-icon.png'),
          destination: path.join('assets'),
          size: '180x180',
        },
        {
          src: path.resolve('./public/assets/favicon-16x16.png'),
          destination: path.join('assets'),
          size: '16x16',
        },
        {
          src: path.resolve('./public/assets/favicon-32x32.png'),
          destination: path.join('assets'),
          size: '32x32',
        },
      ],
    }),
  ],
}
