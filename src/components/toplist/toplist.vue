<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getVkey} from 'api/song'
import {ERR_OK} from 'api/config'
import {getMusicList} from 'api/rank'
import {createSong} from 'common/js/song'
export default {
  created() {
    this._getTopList()
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      } else {
        return ''
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    _getTopList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.songs = this._normalizeSongs(res.songlist)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
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
  .slide-enter-active, .slide-leave-active
    transition: all .3s ease
  .slide-enter, .slide-leave-to
    transition: translate3d(100%, 0, 0)
</style>
