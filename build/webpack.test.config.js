const WebpackBaseConfig = require('./webpack.base.config')
const WebpackMerge = require('webpack-merge')
// won't ues entry in karma test
WebpackBaseConfig.entry = null
module.exports = WebpackMerge(WebpackBaseConfig, {
  devtool: '#inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$|\.ts$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      }
    ]
  }
})
