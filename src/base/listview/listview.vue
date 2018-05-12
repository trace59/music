<template>
  <scroll
    ref="listview"
    class="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll">
    <ul>
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul>
          <li @click="selectItem(item)" class="list-item" v-for="item in group.items">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="singer-name"> {{item.name}} </span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h2 class="fixedtitle"> {{fixedTitle}} </h2>
    </div>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
        class="item"
        :class="{'current': currentIndex === index}"
        :data-index="index">
        {{ item }}
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import Loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
    window.addEventListener('resize', () => {
      this.$refs.listview.refresh()
    })
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  computed: {
    shortcutList () {
      return this.data.map(it => it.title.substr(0, 1))
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return
      }
      console.log(this.scrollY)
      console.log(this.currentIndex)
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    refresh () {
      this.$refs.listview.refresh()
    },
    selectItem (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let dalta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + dalta
      this.currentIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.currentIndex = parseInt(index)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      // 中间
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          // console.log(this.currentIndex)
          return
        }
      }
      // 底部
      this.currentIndex = listHeight.length - 1
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        color: $color-text-d
        font-size: $font-size-medium
        background: #333
      .list-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .singer-name
          margin-left: 20px
          color: $color-text-d
          font-size: $font-size-medium
  .list-shortcut
    position: absolute
    top: 50%
    right: 0
    color: $color-text-d
    z-index: 20
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    text-align: center
    border-radius: 10px
    font-family: Helvetica
    font-size: $font-size-small
    background: rgba(0,0,0,.3)
    .item
      padding: 3px
      line-height: 1
  .current
    color: $color-theme

  .list-fixed
    position: absolute
    width: 100%
    top: -1px
    .fixedtitle
      width: 100%
      height: 30px
      line-height: 30px
      padding-left: 20px
      color: $color-text-d
      font-size: $font-size-medium
      background: #333
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
