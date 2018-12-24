const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude
      .add(path.resolve('src/icons'));
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      ],
    },
  },
  baseUrl: './',
  devServer: {
    proxy: {
      '/rest': {
        target: 'http://47.93.235.47:8088/mockjsdata/2',
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: 'http://192.168.10.90:8090/',
        pathRewrite: {
          '^/api': '',
        },
      },
      '/edu': {
        target: 'http://192.168.10.89:8090/',
        pathRewrite: {
          '^/edu': '',
        },
      },
    },
  },
};
