const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'github profile chart'
  next()
})

module.exports = router
