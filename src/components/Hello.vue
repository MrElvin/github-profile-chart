<template lang="pug">
  .hello-container
    div
      div(@click="test") Enter GitHub Username
      input(v-model="userName" placeholder="ex.'MrElvin'" @keyup.enter="search")
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    test () {
      this.$msg('fadfadf')
    },
    search (e) {
      e.target.blur()
      const userName = this.userName.replace(/()|()/g, '')
      if (userName === '') return
      this.handleUser(userName)
    },
    async handleUser (userName) {
      this.$emit('changeLoadingListener', true)
      let res = await this.$http.get(`/api/checkstar/${userName}`)
      if (res.data.success) {
        localStorage.setItem('github-profile-chart-token', res.data.token)
        this.$router.push({
          name: 'Profile',
          params: { userName }
        })
      } else {
        this.$emit('changeLoadingListener', false)
        this.$msg.warning(`${userName} 获取 token 失败，先 star 本仓库`)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@media (max-width: 767px)
  #app
    .hello-container
      & > div
        font-size 24px
      input
        width 260px
        font-size 18px
@media (max-width: 576px)
  #app
    .hello-container
      & > div
        font-size 18px
      input
        width 200px
        font-size 14px
        height 36px
        line-height 36px
.hello-container
  height 100%
  position relative
  color #39373C
  & > div
    position absolute
    left 50%
    top 20%
    transform translateX(-50%)
    font-size 36px
  input
    width 380px
    height 50px
    line-height 50px
    font-size 24px
    padding 12px 32px
    margin-top 54px
    text-align center
    outline none
    border none
    border-radius 25px
    transition box-shadow .3s
    box-shadow rgba(0, 0, 0, 0.1) 0px 0px 8px
    &::-webkit-input-placeholder
      color #ACB4B8
    &:focus
      box-shadow rgba(55, 218, 231, .3) 0px 0px 128px, rgba(55, 218, 231, .6) 0px 0px 64px
    &:focus::-webkit-input-placeholder
      color transparent
</style>
