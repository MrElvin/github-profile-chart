const axios = require('axios')
const cheerio = require('cheerio')
const CONFIG = require('../../project.config.json')

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + process.env.NODE_ENV === 'production' ? process.env.TOKEN : CONFIG.TOKEN
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
    .catch(err => console.log('GRAPHQL', err))
}

const graphqlQuery = (userName, type, opt) => {
  switch (type) {
    case 'userName':
      return genQueryUserName(userName, opt)
    case 'userProfile':
      return genQueryUserInfo(userName, opt)
    case 'userRepos':
      return genQueryUserRepos(userName, opt)
  }
}

const genQueryUserName = (userName, opt) => {
  const query = `
    {
      rateLimit {
        remaining
      },
      user(login: "${userName}") {
        name,
        login,
        createdAt,
        starredRepositories(first: 100 orderBy: {field: STARRED_AT, direction: DESC} ${opt.endCursor === undefined ? '' : ', after: "' + opt.endCursor + '"'}) {
          totalCount,
          pageInfo {
            hasNextPage
            endCursor
          },
          edges {
            node {
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
      rateLimit {
        remaining
      },
      user(login: "${userName}") {
        avatarUrl,
        bio,
        createdAt,
        location,
        name,
        login,
        url,
        following {
          totalCount
        },
        followers {
          totalCount
        }
      }
    }
  `
  return query
}

const genQueryUserRepos = (userName, opt) => {
  const query = `
    {
      rateLimit {
        remaining
      },
      user(login: "${userName}") {
        repositories(affiliations: [OWNER, COLLABORATOR], isFork: false, first: 100, orderBy: {field: CREATED_AT, direction: DESC} ${opt.endCursor === undefined ? '' : ', after: "' + opt.endCursor + '"'}) {
          totalCount,
          pageInfo {
            hasNextPage,
            endCursor
          },
          edges {
            node {
              name,
              url,
              primaryLanguage {
                name
              },
              stargazers {
                totalCount
              },
              defaultBranchRef{
                ...on Ref {
                  target {
                    ...on Commit{
                      history(since: "${opt.createdAt}") {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  return query
}

const convertCommits = (html) => {
  const $ = cheerio.load(html)
  const result = []
  const resultObj = {}
  const commits = $('.day')
  for (let i = 0; i < commits.length; i++) {
    let date = commits.eq(i).data('date')
    let count = +commits.eq(i).data('count')
    let datePrefix = date.substring(0, 7)
    result.push({ date, count, datePrefix })
  }
  result.forEach((v, i) => {
    if (Object.keys(resultObj).indexOf(v.datePrefix) === -1) {
      resultObj[v.datePrefix] = [v]
    } else {
      resultObj[v.datePrefix].push(v)
    }
  })
  return Object.keys(resultObj).map((v, i) => {
    const date = v
    const count = resultObj[v].reduce((t, c) => t + c.count, 0)
    return { date, count }
  })
}

module.exports = {
  graphql,
  convertCommits
}
