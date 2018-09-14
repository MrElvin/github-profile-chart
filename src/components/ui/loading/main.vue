<template lang="pug">
  transition(name="fade" @after-leave="handleAfterLeave")
    .loading(v-if="visible"
      :class="[{ 'fullscreen': fullscreen }]")
      .spinner
        .double-bounce1
        .double-bounce2
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      visible: false,
      fullscreen: true
    }
  },
  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    }
  }
}
</script>

<style lang="stylus" scoped>
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
.loading
  position absolute
  left 0
  top 0
  bottom 0
  right 0
  z-index 1000
  background rgba(255, 255, 255, .8)
.fullscreen
  position fixed
  .spinner
    transform translate(-50%, -100%)
.spinner
  width 60px
  height 60px
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
.double-bounce1,
.double-bounce2
  width 100%
  height 100%
  border-radius 50%
  background-color #33D3E1
  opacity 0.6
  position absolute
  top 0
  left 0
  -webkit-animation bounce 2.0s infinite ease-in-out
  animation bounce 2.0s infinite ease-in-out
.double-bounce2
  -webkit-animation-delay -1.0s
  animation-delay -1.0s
@keyframes bounce
  0%, 100%
    transform scale(0.0)
    -webkit-transform scale(0.0)
  50%
    transform scale(1.0)
    -webkit-transform scale(1.0)
</style>
