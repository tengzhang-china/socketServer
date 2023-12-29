const { createServer } = require('http')
const fs = require('fs')
const { port } = require('./conf/socketServer.default.conf')
const { open } = require('./conf/httpServer.default.conf')

const httpServer = function () {
  if (open === true) {
    const server = createServer((req, res) => {
      // 自定义http请求
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })

      fs.readFile('client/index.html', 'utf-8', (err, data) => {
        res.write(err || data)
        res.end()
      })
    })

    server.listen(port, () => {
      console.log(`httpServer启动成功, 访问 http://localhost:${port}`)
    })
    return server
  }
  return port
}

module.exports = httpServer
