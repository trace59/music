<template>
  <scroll class="suggest" :data="result"
  :pullup="pullup"
  :berforeScroll="berforeScroll"
  @scrollToEnd="searchMore"
  @berforeScroll="listScroll"
  ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="Sorry，Without the result"></no-result>
    </div>
  </scroll>
</template>
<script>
import {search} from 'api/search'
import Scroll from 'base/scroll/scroll'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Loading from 'base/loading/loading'
import {getVkey, getSongsKey} from 'api/song'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      berforeScroll: true
    }
  },
  methods: {
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    search(newQuery) {
      this.hasMore = true
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    listScroll() {
      this.$emit('listScroll')
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    _createUrl (songs, vkeys) {
      songs.forEach((song, index) => {
        song['url'] = vkeys[index].purl
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _genResult(data) {
      let ret = []
      console.log(data)
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        console.log(ret)
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _normalizeSongs(list) {
      let ret = []
      let mids = []
      list.forEach(it => {
        mids.push(it.songmid)
      })
      getSongsKey(mids).then(res => {
        console.log(res, 1111)
      })
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
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>
<style lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  .suggest
    height 100%
    overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^="icon-"]
        font-size 14px
        color: $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
