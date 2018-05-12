<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/vol">
      <span class="tab-link">Vol</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }

    &.router-link-active {
      .tab-link {
        color: rgba(230, 230, 195, 1);
        border-bottom: 2px solid rgba(230, 230, 195, 1);
      }
    }
  }
}
</style>
