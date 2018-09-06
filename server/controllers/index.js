const jwt = require('jsonwebtoken')
const utils = require('../utils')
const CONFIG = require('../../project.config.json')
// const util = require('util')

const checkStar = async (ctx) => {
  const userName = ctx.params.userName
  let [token, success] = [null, false]
  try {
    let res = await utils.graphql(userName, 'userName')
    console.log(res)
    let { hasNextPage, endCursor } = res.user.starredRepositories.pageInfo
    while (hasNextPage) {
      let newRes = await utils.graphql(userName, 'userName', { endCursor })
      hasNextPage = newRes.user.starredRepositories.pageInfo.hasNextPage
      endCursor = newRes.user.starredRepositories.pageInfo.endCursor
      res.user.starredRepositories.edges = [...res.user.starredRepositories.edges, ...newRes.user.starredRepositories.edges]
    }
    success = res.user.starredRepositories.edges.some(r => r.node.name === 'github-profile-chart' && r.node.owner.login === 'MrElvin')
    ctx.body = {
      success,
      token: success ? jwt.sign({
        userName: res.user.login
      }, CONFIG.JWT_SECRET, { expiresIn: 60 * 1 }) : null
    }
  } catch (e) {
    ctx.body = {
      success,
      token
    }
  }
}

const getUserInfo = async (ctx) => {
  const res = await utils.graphql(ctx.params.userName, 'userInfo')
  console.log(res)
  ctx.body = res
}

const getUserData = async (ctx) => {

}

module.exports = {
  getUserInfo,
  checkStar,
  getUserData
}
