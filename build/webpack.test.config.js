const webpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
// won't ues entry in karma test
webpackBaseConfig.entry = null
module.exports = webpackMerge(webpackBaseConfig, {
  devtool: '#inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$|\.ts$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true}
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      }
    ]
  }
})
