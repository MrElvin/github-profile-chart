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
        if (!token || jwt.decode(token).userName !== userName) {
          axios.get(`/api/checkstar/${userName}`)
            .then(res => {
              if (res.data.success) {
                localStorage.setItem('github-profile-chart-token', res.data.token)
                next()
              } else {
                next(vm => vm.$router.push({ name: 'Hello' }, vm.$msg.warning('获取 Token 值出错')))
              }
            })
            .catch(() => {
              next(vm => vm.$router.push({ name: 'Hello' }, vm.$msg.warning('获取 Token 值出错')))
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
