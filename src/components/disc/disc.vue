<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getVkey} from 'api/song'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          console.log(res.cdlist[0].songlist)
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          console.log(this.songs)
        }
      })
    },
    _createUrl (songs, vkeys) {
      songs.forEach((song, index) => {
        song['url'] = vkeys[index].purl
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      ret.forEach(it => {
        if (!it.url) {
          getVkey(it.mid).then(vkey => {
            it.url = `http://dl.stream.qqmusic.qq.com/C400${it.mid}.m4a?vkey=${vkey}&guid=7631401125&uin=1103052133&fromtag=66`
          })
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  components: {
    musicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
