const { nsp } = require('./conf/socketServer.default.conf.js')
const { formateLog, log } = require('./logs/index.js')

/**
 * 初始化命名空间
 * @param {*} io 
 */
const initNsp = function (io) {
  for (let item of nsp) {
    let nspInterface = io.of(item.name)
    nspInterface.on('connection', function (socket) {
      log(
        formateLog({
          action: 'connection',
          id: socket.id,
          ip: socket.handshake.address.replace('::ffff:', ''),
          agent: socket.handshake.headers['user-agent']
        })
      )
      item.on?.connection(socket)

      // 加入房间
      if (item.room) {
        socket.join(item.room)
        log(
          formateLog({
            action: 'join room',
            id: socket.id
          })
        )
      }

      let onKeys = Object.keys(item.on).filter(
        (v) => ['connection', 'disconnect'].indexOf(v) === -1
      )
      for (let key of onKeys) {
        socket.on(key, (...argument) => {
          item.on[key](nspInterface, ...argument)
          log(
            formateLog({
              action: 'message-to-all',
              id: socket.id,
              message: JSON.stringify(argument)
            })
          )
        })

        socket.on(`to-others-${key}`, (...argument) => {
          item.on[key](socket.to(item.room), ...argument)
          log(
            formateLog({
              action: 'message-to-others',
              id: socket.id,
              message: JSON.stringify(argument)
            })
          )
        })
      }

      // 断开连接--写日志
      socket.on('disconnect', (reason) => {
        log(
          formateLog({
            action: 'disconnect',
            id: socket.id,
            reason
          })
        )
        item.on?.disconnect(socket, reason)
      })

      socket.on('error', (err) => {
        log(
          formateLog({
            action: 'error',
            id: socket.id,
            message: err.message
          })
        )
        if (err && err.message === 'unauthorized event') {
          socket.disconnect()
        }
      })
    })
  }
}

module.exports = initNsp
