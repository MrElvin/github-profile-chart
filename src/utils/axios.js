import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3008' : '/'
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('github-profile-chart-token')
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
