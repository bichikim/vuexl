const WebpackBaseConfig = require('./webpack.base.config')
const WebpackMerge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals');
module.exports = WebpackMerge(WebpackBaseConfig, {
  output: {
    libraryTarget: 'commonjs2',
  },
  mode: 'production',
  externals: [nodeExternals()]
})