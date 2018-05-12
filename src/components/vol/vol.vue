<template>
  <div class="vol" ref="vol">
    <div class="vol-container">
      <scroll ref="scroll" class="cover-wrapper" :data="data.img">
        <ul v-show="!loadingShow">
          <li class="item" v-for="(imgUrl, index) in data.img" :key="imgUrl">
            <img @load="imgLoaded" class="img" :src="imgUrl">
            <p class="title">{{data.title[index]}}</p>
          </li>
        </ul>
        <div class="loading-container" v-show="loadingShow">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import Loading from 'base/loading/loading'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      data: [],
      checkLoad: false,
      checkNum: 0
    }
  },
  computed: {
    loadingShow() {
      if (this.checkNum < 20) {
        return true
      }
      return false
    }
  },
  created() {
    this._getVol()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '70px' : ''
      this.$refs.vol.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getVol() {
      axios.get('/api/volData').then(res => {
        this.data = res.data.data.vol
      })
    },
    imgLoaded () {
      this.checkNum++
      if (this.checkNum === this.data.img.length && !this.checkLoad) {
        console.log(this.checkNum)
        setTimeout(() => {
          this.$refs.scroll.refresh()
          console.log(this.$refs.scroll)
          console.log(1)
        }, 200)
        this.checkLoad = true
      }
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
  .vol
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .vol-container
      height: 100%
      .cover-wrapper
        position: relative
        overflow: hidden
        height: 100%
        .item
          text-align: center
          margin: 3px 0 5px
          .img
            width: 95%
            margin: 5px 0 0
            border-radius: 5px 5px 0 0
          .title
            width: 95%
            margin: auto
            padding: 5px 0
            background-color: #333
            border-radius: 0 0 5px 5px
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)

</style>
