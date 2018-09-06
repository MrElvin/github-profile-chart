const CONFIG = require('../../project.config.json')
const axios = require('axios')

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + CONFIG.TOKEN
    config.baseURL = 'https://api.github.com/graphql'
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

const graphql = async (userName, type, opt = {}) => {
  return axios.post('', {
    query: graphqlQuery(userName, type, opt)
  }).then(res => res.data.data)
    .catch(err => err)
}

const graphqlQuery = (userName, type, opt) => {
  switch (type) {
    case 'userName':
      return genQueryUserName(userName, opt)
    case 'userInfo':
      return genQueryUserInfo(userName, opt)
  }
}

const genQueryUserName = (userName, opt) => {
  const query = `
    {
      user(login: ${userName}) {
        name,
        login,
        starredRepositories(first: 10 orderBy: {field: STARRED_AT, direction: DESC} after: ${opt.endCursor === undefined ? '' : opt.endCursor}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
            startCursor
            hasPreviousPage
          }
          edges {
            node {
              id,
              name,
              owner {
                login
              }
            }
          }
        }
      }
    }
  `
  return query
}

const genQueryUserInfo = (userName, opt) => {
  const query = `
    {
      user(login: ${userName}) {
        avatarUrl,
        bio,
        company,
        createdAt,
        email,
        location,
        name,
        login,
        url,
        websiteUrl
      }
    }
  `
  return query
}

module.exports.graphql = graphql
