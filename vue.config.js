const HtmlWebpackPlugin = require('html-webpack-plugin');
const title = "The HMS Music Quiz";

module.exports = {
  pages: {
    manage: {
      entry: 'src/manage/main.js',
      template: 'public/manage.html',
      title,
      chunks: [ 'chunk-vendors', 'chunk-common', 'manage' ]
    },
    play: {
      entry: 'src/play/main.js',
      template: 'public/play.html',
      title,
      chunks: [ 'chunk-vendors', 'chunk-common', 'play' ]
    }
  },
  chainWebpack: config => {
    config
      .plugin('html-manage')
      .tap(args => {
        args[0].globals = {
          env: {
            node: process.env.NODE_ENV,
            pusher: {
              key: process.env.PUSHER_KEY,
              cluster: process.env.PUSHER_CLUSTER
            }
          },
          title
        };
        return args;
      })

    config
      .plugin('html-play')
      .tap(args => {
        args[0].globals = {
          env: {
            node: process.env.NODE_ENV,
            pusher: {
              key: process.env.PUSHER_KEY,
              cluster: process.env.PUSHER_CLUSTER
            }
          },
          title
        };
        return args;
      })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/mixins/index.scss";
        `
      }
    }
  }
}
