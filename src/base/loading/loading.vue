<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="play">{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
  .loading
    width: 100%
    text-align: center
    img
      width: 20px
      height: 20px
    .play
      line-height: 20px
      font-size: $font-size-small
      color: $font-text-l
</style>
