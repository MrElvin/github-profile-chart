<template lang="pug">
  transition(name="fade" @after-leave="handleAfterLeave")
    .loading(v-if="visible" :class={'fullscreen': fullscreen})
      .loading-wrapper
        .loading-outer
        .sector
</template>

<script>
  export default {
    name: 'Loading',
    data () {
      return {
        visible: false,
        fullscreen: false,
        lock: true
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
  background rgba(255, 255, 255, .8)
  &.fullscreen
    position fixed
.loading-wrapper
  width 100px
  height 100px
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
.loading-outer
  width 100px
  height 100px
  border-top 1px solid #1ADAE5
  border-left 1px solid #1ADAE5
  border-right 1px solid #1ADAE5
  border-bottom 1px solid transparent
  border-radius 50%
  position relative
  transform rotate(180deg)
  animation outRotate 1.5s infinite linear
.sector
  position absolute
  width 40px
  height 40px
  top 50%
  left 50%
  border-radius 50%
  margin-top -19px
  margin-left -19px
  animation sector-rotate 3s infinite linear
.sector::before,
.sector::after
  content ""
  position absolute
  left 0
  top 0
  width 40px
  height 40px
  border-radius 50%
  transform rotate(0deg)
  clip rect(0px, 20px, 40px, 0px)
.sector::before
  transform rotate(0deg)
  animation sector-b-rotate 3s infinite linear
.sector::after
  transform rotate(0deg)
  animation sector-a-rotate 3s infinite linear
@keyframes sector-rotate {
  0% {
    background: #B3EFF2;
  }
  50% {
    background: #B3EFF2;
  }
  50.0001% {
    background: #1ADAE5;
  }
  100% {
    background: #1ADAE5;
  }
}
@keyframes sector-b-rotate {
  0% {
    background: #1ADAE5;
  }
  50% {
    background: #1ADAE5;
  }
  50.0001% {
    background: #B3EFF2;
  }
  100% {
    background: #B3EFF2;
  }
}

@keyframes sector-a-rotate {
  0% {
    background: #B3EFF2;
    transform: rotate(0deg);
  }
  24.999% {
    background: #B3EFF2;
    transform: rotate(-180deg);
  }
  25% {
    background: #1ADAE5;
    transform: rotate(0deg);
  }
  50% {
    background: #1ADAE5;
    transform: rotate(-180deg);
  }
  50.001% {
    background: #1ADAE5;
    transform: rotate(0deg);
  }
  74.999% {
    background: #1ADAE5;
    transform: rotate(-180deg);
  }
  75% {
    background: #B3EFF2;
    transform: rotate(0deg);
  }
  100% {
    background: #B3EFF2;
    transform: rotate(-180deg);
  }
}
@keyframes outRotate {
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
}
</style>
