const io = require('./initIo.js').io

require('./initNsp.js')(io)

console.log('socket-server启动成功')
