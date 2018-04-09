const path = require('path')
const webpack = require('webpack')
const formatter = require('eslint-friendly-formatter')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: ['./src/index.ts']
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve('src'),
      '~': resolve('lib'),
      '@@': resolve('./'),
      '~~': resolve('./')
    },
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     // ... nothing to add so far
  //   }),
  // ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts|vue)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter,
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
    ]
  },
}
