<template lang="pug">
  transition(name="message-fade")
    .message-container(v-if="visible"
      :class="`message-${type}`"
      @mouseenter="clearTimer"
      @mouseleave="startTimer") {{message}}
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      duration: 3000,
      message: '',
      type: 'info',
      visible: false,
      onClose: null,
      timer: null,
      center: false
    }
  },
  methods: {
    close () {
      this.visible = false
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      } else {
        throw new Error('Message Duration must more than 0!')
      }
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>

<style lang="stylus" scoped>
.message-fade
  &-enter,
  &-leave-to
    transform translateY(-90px)
    opacity 0
  &-enter-to,
  &-leave
    transform translateY(0)
    opacity 1
  &-enter-active,
  &-leave-active
    transition all .5s ease-out
.message-container
  width 400px
  margin-left -200px
  padding 16px
  position fixed
  left 50%
  top 40px
  border 1px solid transparent
  box-shadow rgba(0, 0, 0, 0.1) 0px 0px 8px
  z-index 20
  border-radius 6px
.message-success
  background #EBF7F9
  color #33D3E1
  border-color #33D3E1
.message-info
  background #F6F6F6
  color #A0A0A0
  border-color #A0A0A0
.message-warning
  background #FDF8F2
  color #E9BD89
  border-color #E9BD89
.message-error
  background #FFF9FA
  color #F895A8
  border-color #F895A8
</style>
