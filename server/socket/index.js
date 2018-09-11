const Koa = require('koa')
const IO = require('socket.io')
const http = require('http')
const CONFIG = require('../../project.config.json')

const socketApp = new Koa()
const socketServer = http.createServer(socketApp.callback).listen(CONFIG.SOCKET_PORT)
const io = IO(socketServer)

module.exports = io
