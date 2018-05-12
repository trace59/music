<template>
  <div class="m-header">
    <h1 class="text">Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon icon-mine"></i>
    </router-link>
    <router-link to="/search" class="search" tag="div">
      <i class="icon icon-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }

  .mine {
    position: absolute;
    top: 0;
    left: 0;
  }

  .search {
    position: absolute;
    top: 0;
    right: 0;
  }

  .icon {
    display: block;
    padding: 12px;
    font-size: 20px;
    color: $color-theme;
  }

  .icon-search {
    font-size: 30px;
  }
}
</style>
