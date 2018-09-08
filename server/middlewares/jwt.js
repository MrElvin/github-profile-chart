const jwt = require('jsonwebtoken')
const CONFIG = require('../../project.config.json')

module.exports = async (ctx, next) => {
  console.log(ctx.header.authorization)
  const token = ctx.header.authorization.slice(7)
  try {
    const tokenDecoded = jwt.verify(token, CONFIG.JWT_SECRET)
    ctx.token = tokenDecoded
    await next()
  } catch (e) {
    console.log(e)
    ctx.body = {
      success: false,
      message: 'Token 过期或未 star 本项目'
    }
  }
}
