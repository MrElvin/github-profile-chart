const jwt = require('jsonwebtoken')
const utils = require('../utils')
const CONFIG = require('../../project.config.json')
const axios = require('axios')
// const util = require('util')

const checkStar = async (ctx) => {
  const userName = ctx.params.userName
  let [token, success] = [null, false]
  try {
    let res = await utils.graphql(userName, 'userName')
    let { hasNextPage, endCursor } = res.user.starredRepositories.pageInfo
    while (hasNextPage) {
      let newRes = await utils.graphql(userName, 'userName', { endCursor })
      hasNextPage = newRes.user.starredRepositories.pageInfo.hasNextPage
      endCursor = newRes.user.starredRepositories.pageInfo.endCursor
      res.user.starredRepositories.edges = [...res.user.starredRepositories.edges, ...newRes.user.starredRepositories.edges]
    }
    success = CONFIG.IS_STAR_REQUIRED
      ? res.user.starredRepositories.edges.some(r => r.node.name === 'github-profile-chart' && r.node.owner.login === 'MrElvin')
      : true
    ctx.body = {
      success,
      token: success ? jwt.sign({
        userName: res.user.login,
        createdAt: res.user.createdAt
      }, CONFIG.JWT_SECRET, { expiresIn: 60 * 60 }) : null
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      success,
      token
    }
  }
}

const getUserInfo = async (ctx) => {
  try {
    const userInfo = {}
    const res = await Promise.all(promiseArr.map(f => f(ctx)))
    resultKeyArr.forEach((k, i) => {
      userInfo[k] = res[i]
    })
    ctx.body = {
      success: true,
      userInfo
    }
  } catch (e) {
    console.log('getInfo', e)
    ctx.body = {
      success: false
    }
  }
}

const getUserProfile = async (ctx) => {
  const res = await utils.graphql(ctx.token.userName, 'userProfile')
  return res.user
}

const getUserRepos = async (ctx) => {
  const { userName, createdAt } = ctx.token
  const res = await utils.graphql(userName, 'userRepos', { createdAt })
  let { hasNextPage, endCursor } = res.user.repositories.pageInfo
  while (hasNextPage) {
    let newRes = await utils.graphql(userName, 'userRepos', { endCursor, createdAt })
    hasNextPage = newRes.user.repositories.pageInfo.hasNextPage
    endCursor = newRes.user.repositories.pageInfo.endCursor
    res.user.repositories.edges = [...res.user.repositories.edges, ...newRes.user.repositories.edges]
  }
  return res.user
}

const getUserCommits = async (ctx) => {
  const res = await axios.get(`https://github.com/users/${ctx.token.userName}/contributions`)
  return utils.convertCommits(res.data)
}

const promiseArr = [
  getUserProfile,
  getUserRepos,
  getUserCommits
]

const resultKeyArr = [
  'userProfile',
  'userRepos',
  'userCommits'
]

module.exports = {
  getUserInfo,
  checkStar
}
