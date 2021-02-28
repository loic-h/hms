 module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
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
  }
 }
