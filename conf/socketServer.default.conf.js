module.exports = {
  port: 3000, //服务端口 -- webServer端口
  options: {
    serveClient: false,
    cors: {
      origin: ['http://localhost:3001'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }, //启用跨域
    cookie: true,
    connectTimeout: 45000, //连接超时
    pingTimeout: 20000, //心跳超时
    pingInterval: 25000, //服务端超时
    maxHttpBufferSize: 1e6, //单词消息传输数据量B
    async allowRequest(req, cb) {
      // console.log(req.headers)
      cb(null, true) //是否可连接
    }
  },

  // 命名空间
  nsp: [
    // {
    //   name: '/'
    // },
    {
      name: '/test', //可以正则
      room: 'room-test',
      on: {
        // 连接回调
        connection(socket) {
          socket.send('custom-event', '----') //send默认事件message
        },

        // 自定义事件默认通知所有人, 包括发送消息的
        test(socket, data) {
          socket.emit('res-test', data)
        },

        // 断开连接回调
        disconnect(socket, reason) {}
      }
    }
  ],

  // 日志配置
  logConf: {
    open: true, //开启日志
    server: false, //开启服务器日志
    dir: 'logs' //记录日志目录
  },
}
