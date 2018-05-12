<template>
  <transition name="slider">
    <div class="singer-detail">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {getVkey} from 'api/song'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list) // 处理获取到的歌手信息
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      ret.forEach(it => {
        if (!it.url) {
          getVkey(it.mid).then(vkey => {
            it.url = `http://dl.stream.qqmusic.qq.com/C400${it.mid}.m4a?vkey=${vkey}&guid=7631401125&uin=1103052133&fromtag=66`
            console.log(it)
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background

.slider-enter-active, .slider-leave-active
  transition: all 0.3s
.slider-enter, .slider-leave-to
  transform: translate3d(100%, 0, 0)
</style>
