<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .top-tip
    position: fixed
    top: 20%
    left: 0
    right: 0
    width: 25%
    margin: auto
    border-radius: 10px
    // filter: blur(5px)
    z-index: 100
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
      opacity:  1
    &.drop-enter, &.drop-leave-to
      opacity: 0
      width: 0
      transform: translate3d(0, -100%, 0)
</style>
