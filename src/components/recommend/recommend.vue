<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="playlists">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img @load="imgLoaded" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <fm-area @selectItem="selectItem"></fm-area>
        <div class="recommend-list">
          <!-- <h1 class="list-title">热门歌单推荐</h1> -->
          <hot-list @selectItem="selectItem"></hot-list>
          <ul>
            <p class="list-recommend">精选歌单</p>
            <li @click="selectItem(item)" v-for="item in playlists" class="item" :key="item.dissid">
              <div class="icon">
                <img v-lazy="item.imgurl" windth="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playlists.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { getRecommend, getPlayList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import hotList from 'components/hotlist/hot-list'
import fmArea from 'components/fm-area/fm-area'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommends: [],
      playlists: []
    }
  },
  mounted () {
    this._equalHeight()
    window.addEventListener('resize', () => {
      this._equalHeight()
      this.$refs.scroll.refresh()
    })
  },
  created () {
    this._getRecommend()
    this._getPlayList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      let len = this.playlists.length
      let random = (Math.random() * 10) | 0
      if (item === 'fm') {
        item = this.playlists[len - random]
        item.dissname = '私人FM'
      } else if (item === 'recommend') {
        item = this.playlists[len - random - 1]
        item.dissname = '每日推荐'
      }
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _equalHeight () {
      let radioArr = document.querySelectorAll('.radio')
      radioArr.forEach(it => {
        let width = it.offsetWidth
        it.style.height = width + 'px'
      })
    },
    _getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getPlayList () {
      getPlayList().then(res => {
        if (res.code === ERR_OK) {
          this.playlists = res.data.list.slice(6)
          console.log(this.playlists)
        }
      })
    },
    imgLoaded () {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    hotList,
    fmArea,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      // height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    .item
      display: flex
      box-sizing: border-box
      align-items: center
      padding: 0 20px 20px 20px

      .icon
        display: flex
        align-items: center
        flex: 0 0 60px
        width: 60px
        padding-right: 20px
      .text
        display: flex
        flex-direction: column
        justify-content: center
        text-align: left
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        .name
          margin-bottom: 10px
          color: $color-text
        .desc
          color: $color-text-d
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
