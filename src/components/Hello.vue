<template lang="pug">
  .hello-container
    div
      div Enter GitHub Username
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
    search () {
      const userName = this.userName.replace(/()|()/g, '')
      if (userName === '') return
      this.handleUser(userName)
    },
    async handleUser (userName) {
      let res = this.$http.get(`/api/checkstar/${userName}`)
        .then(res => {
          console.log('hello', res)
          if (res.data.success) {
            this.$router.push({
              name: 'Profile',
              params: { userName }
            })
            localStorage.setItem('github-profile-chart-token', res.data.token)
          } else {
            alert(`${userName} 获取 token 失败，先 star 本仓库`)
          }
        })
    }
  },
}
</script>

<style lang="stylus" scoped>
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

