const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization.slice(7)
  console.log(token)
  await next()
}
