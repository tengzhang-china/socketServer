const { Server } = require('socket.io')
const { options } = require('./conf/socketServer.default.conf.js')

const io = new Server(require('./initHttpServer.js')(), options)
module.exports = {
  io
}
