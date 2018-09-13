const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaHistoryApiFallback = require('koa2-history-api-fallback')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaStatic = require('koa-static')
const koaCors = require('koa2-cors')

const path = require('path')
const config = require('./project.config.json')
const api = require('./server/router')
require('./server/socket')

const app = new Koa()
const router = koaRouter()

onerror(app)

app.use(koaCors())
app.use(bodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.use('/api', api.routes(), api.allowedMethods())
app.use(router.routes(), router.allowedMethods())
app.use(koaHistoryApiFallback())

app.use(koaStatic(path.join(__dirname, '/dist')))

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  ctx.body = { success: false }
})

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}`)
})
module.exports = app
