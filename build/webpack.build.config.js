/**
 *
 * @author Bichi Kim [bichi@pjfactory.com]
 * @copyright (c) PJ Factory Co.
 * @license Private
 */
const WebpackBaseConfig = require('./webpack.base.config')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(WebpackBaseConfig, {
  output: {
    library: 'vuex-keg',
    libraryTarget: 'umd',
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