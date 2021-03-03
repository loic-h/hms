const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  pages: {
    manage: {
      entry: 'src/manage/main.js',
      template: 'public/manage.html',
      title: 'Manage',
      chunks: [ 'chunk-vendors', 'chunk-common', 'manage' ]
    },
    play: {
      entry: 'src/play/main.js',
      template: 'public/play.html',
      title: 'Play',
      chunks: [ 'chunk-vendors', 'chunk-common', 'play' ]
    }
  },
  chainWebpack: config => {
    config
      .plugin('html-manage')
      .tap(args => {
        args[0].env = {
          node: process.env.NODE_ENV,
          pusher: {
            key: process.env.PUSHER_KEY,
            cluster: process.env.PUSHER_CLUSTER
          }
        };
        return args;
      })

    config
      .plugin('html-play')
      .tap(args => {
        args[0].env = {
          node: process.env.NODE_ENV,
          pusher: {
            key: process.env.PUSHER_KEY,
            cluster: process.env.PUSHER_CLUSTER
          }
        };
        return args;
      })
  },
}
