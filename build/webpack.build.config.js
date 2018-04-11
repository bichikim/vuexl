const webpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const externals = require('webpack-node-externals')
module.exports = webpackMerge(webpackBaseConfig, {
  output: {
    library: 'vuexl',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  devtool: 'source-map',
  mode: 'production',
  externals: [externals()]
})