<template lang="pug">
  .rate-limit-container
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
  padding 10px
  width 140px
  height 60px
  background #FFF
  font-size 14px
  text-align left
  color #39373c
strong
  font-weight bold
  color #33D3E1
  margin-right 4px
</style>
