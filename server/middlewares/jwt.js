const jwt = require('jsonwebtoken')
const CONFIG = require('../../project.config.json')

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization.slice(7)
  try {
    const tokenDecoded = jwt.verify(token, CONFIG.JWT_SECRET)
    ctx.token = tokenDecoded
    await next()
  } catch (e) {
    console.log(e)
    ctx.body = {
      success: false,
      message: 'Token expired Or Have not starred this repository'
    }
  }
}
