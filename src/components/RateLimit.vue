<template lang="pug">
  .rate-limit-container
    .camera
      .iconfont.icon-xiangji
    p
      strong {{requestsLeft}}
      | requests left before rate-limit
</template>

<script>
export default {
  props: {
    requestsLeft: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.rate-limit-container
  display flex
  justify-content center
  align-items center
  padding 10px 10px 10px 0
  height 60px
  background #FFF
  font-size 14px
  text-align left
  color #39373c
  .camera
    width 40px
    margin 0 7px 0 0
    padding 0 4px 0 10px
    box-sizing content-box
    height 60px
    cursor pointer
    border-right 1px dashed rgba(57, 55, 60, .5)
    transition all 0.3s linear
    &:hover
      background #33D3E1
      border-color #FFF
      color #FFF
  .iconfont
    font-size 32px
    line-height 54px
img
  width 32px
  height 32px
  margin-top 12px
p
  width 120px
strong
  font-weight bold
  color #33D3E1
  margin-right 4px
</style>
