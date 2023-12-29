const { logConf } = require('../conf/socketServer.default.conf')
const fs = require('fs')

/**
 * 服务器打印日志
 * @param {*} message
 */
function logInServer(message) {
  if (logConf.server) console.log(`${message}`) // 打印到服务控制台上
}

/**
 * 记录连接ip
 * @param {*} message
 */
function logIp(message) {
  if (logConf.open) {
    fs.appendFileSync(`${logConf.dir}/ipfile.txt`, message)
    logInServer(message)
  }
}

/**
 * 记录发送消息
 * @param {*} message
 */
function logMsg(message) {
  if (logConf.open) {
    fs.appendFileSync(`${logConf.dir}/msgfile.txt`, message)
    logInServer(message)
  }
}

/**
 * 打印错误日志
 * @param {*} message
 */
function logError(message) {
  if (logConf.open) {
    fs.appendFileSync(`${logConf.dir}/errorfile.txt`, message)
    logInServer(message)
  }
}

module.exports = {
  /**
   * 格式化日志
   * @param action 动作 连接 断开连接 发送消息
   * @param ip
   * @param id socket id
   * @param agent 浏览器信息
   * @param reason 原因
   * @param message 发送消息
   */
  formateLog({ action, reason, ip, id, agent, message }) {
    let time = new Date().toISOString()
    let logObj = {}
    action && (logObj.action = action)
    reason && (logObj.reason = reason)
    ip && (logObj.ip = ip)
    id && (logObj.id = id)
    agent && (logObj.agent = agent)
    message && (logObj.message = message)

    // 通过action记录其他日志

    return `${time} -- ${JSON.stringify(logObj)}\n`
  },
  /**
   * 打印日志
   * @param {*} message
   */
  log(message) {
    if (logConf.open) {
      fs.appendFileSync(`${logConf.dir}/logfile.txt`, message)
      logInServer(message)
    }
  }
}
