const WebpackBaseConfig = require('./webpack.base.config')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(WebpackBaseConfig, {
  output: {
    library: 'vuexl',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production',
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    vuex: 'vuex',
    'vue-class-component': 'vue-class-component'
  }
})