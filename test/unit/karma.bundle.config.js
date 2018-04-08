/**
 * karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * mocha, chai, karma-coverage
 * @author Bichi Kim <bichi@live.co.kr>
 */
const webpack = require('../../build/webpack.test.config.js')
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec'],
    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      {pattern: '../bundle/*.spec.js'}
    ],
    exclude: [
      '../bundle/**/*.spec.skip.js',
    ],
    preprocessors: {
      '../bundle/**/*.js': ['webpack', 'sourcemap'],
      //'': ['webpack', 'sourcemap', 'coverage'],
    },
    webpack,
    webpackMiddleware: {
      noInfo: true,
    },
    logLevel: config.LOG_INFO,
    colors: true,
    mime: {
      'text/x-typescript': ['ts'],
    },
  })
}
