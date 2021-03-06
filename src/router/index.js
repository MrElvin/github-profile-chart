import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jsonwebtoken'
import axios from '../utils/axios'

const Hello = () => import('@/components/Hello')
const Profile = () => import('@/components/Profile')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/profile/:userName',
      name: 'Profile',
      component: Profile,
      beforeEnter (to, from, next) {
        const userName = to.params.userName
        const token = localStorage.getItem('github-profile-chart-token')
        if (!token || (jwt.decode(token) && jwt.decode(token).userName !== userName)) {
          axios.get(`/api/checkstar/${userName}`)
            .then(res => {
              if (res.data.success && res.data.token !== null) {
                localStorage.setItem('github-profile-chart-token', res.data.token)
                next()
              } else {
                next({
                  name: 'Hello',
                  params: {
                    reason: 'redirect'
                  }
                })
              }
            })
            .catch(() => {
              next({
                name: 'Hello',
                params: {
                  reason: 'redirect'
                }
              })
            })
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      component: Hello
    }
  ]
})
