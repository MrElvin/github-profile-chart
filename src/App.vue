<template lang="pug">
  #app
    transition(name="fade" mode="out-in")
      router-view
    footer
      div
        | Github-Profile-Chart is built with
        a(href="https://github.com/vuejs/vue") Vue.js
        | /
        a(href="https://github.com/koajs/koa") Koa.js
        | and
        a(href="https://github.com/antvis/g2") AntV
        | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Source is on
        a(href="https://github.com/MrElvin/github-profile-chart") Github
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="stylus">
*
  box-sizing border-box
body, html
  margin 0
  padding 0
  width 100%
  height 100%
  background #FAFAFA
.fade
  &-enter,
  &-leave-to
    opacity 0
  &-enter-to,
  &-leave
    opacity 1
  &-enter-active,
  &-leave-active
    transition opacity .3s linear
#app
  height 100%
  box-sizing border-box
  padding-bottom 51px
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #39373C
footer
  width 100%
  height 50px
  line-height 50px
  position fixed
  bottom 0
  border-top 1px solid #D9E3E8
  background #fff
  a
    font-weight bold
    text-decoration none
    margin 0 6px
    color #39373C
    transition all .2s
    &:active,
    &:hover
      color #37DAE7
</style>
