<template lang="pug">
  .rate-limit-container
    .camera(@click="capturePic")
      .iconfont.icon-xiangji
    p
      strong {{requestsLeft}}
      | requests left before rate-limit
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'RateLimit',
  props: {
    requestsLeft: {
      type: Number,
      default: 0
    }
  },
  methods: {
    capturePic () {
      const dom = document.querySelectorAll('.profile-container')[0]
      if (dom) {
        html2canvas(dom, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#F9F9F9'
        })
          .then(canvas => {
            const a = document.createElement('a')
            const url = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            a.href = url
            a.download = `${this.$route.params.userName}'s GitHub Profile.png`
            a.click()
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@media (max-width: 576px)
  #app
    .rate-limit-container
      display none
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
    line-height 56px
img
  width 32px
  height 32px
  margin-top 12px
p
  width 120px
  padding-left 4px
strong
  font-weight bold
  color #33D3E1
  margin-right 4px
</style>
