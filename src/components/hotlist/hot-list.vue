<template>
  <div class="hot-list">
    <p class="hot-text">热门推荐</p>
    <div class="hot-remd">
      <div class="remd-ul" v-for="hotUl in remdUl">
        <div class="remd-li" @click="select(hotLi)" v-for="hotLi in hotUl">
          <div class="hotli">
            <span class="hot-icon">
              <icon name="headphones" scale="0.7"></icon>
              <span>{{ hotLi.listennum > 99999 ? _listennumTransform(hotLi.listennum) : hotLi.listennum }}</span>
            </span>
            <img v-lazy="hotLi.imgurl" />
            <p>{{ hotLi.dissname }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      remdUl: [],
      listennum: ''
    }
  },
  created () {
    this._getPlayList()
  },
  methods: {
    select(item) {
      this.$emit('selectItem', item)
    },
    _getPlayList () {
      getPlayList().then(res => {
        if (res.code === ERR_OK) {
          let lists = res.data.list.splice(0, 6)
          let hotList = []
          hotList.push(lists.slice(0, 3), lists.slice(3, 6))
          this.remdUl = hotList
        }
      })
    },
    _listennumTransform (string) {
      string += ''
      let length = string.length - 4
      let tenThousand = string.slice(0, length)
      let point = string.slice(length, length + 1)
      string = tenThousand + '.' + point + '万'
      return string
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .hot-list
    width: 100%
    text-align: center
    .hot-text
      position: relative
      text-align: left
      font-size: $font-size-medium
      padding: 10px
      height: 20px
      line-height: 20px
      &::before
        content: ''
        position: absolute
        left: 0
        width: 3px
        height: 20px
        display: block
        background-color: $color-text

    .remd-ul
      display: flex
      width: 100%
      justify-content: space-between
      padding-bottom: 15px
      .remd-li
        position: relative
        width: 33%
        .hotli
          display: flex
          flex-direction: column
          justify-content: center
          &::after
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 20px
              background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent)
          .hot-icon
            position: absolute
            text-align: right
            z-index: 2
            top: 5px
            right: 5px
            color: #fff
            line-height: 1.2
            font-size: $font-size-small
          img
            border-radius: 5px
            width: 100%
          p
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            overflow: hidden
            font-size: $font-size-small
            text-align: left
            color: $color-text-d
            line-height: 1.2
            padding: 5px 5px 0
</style>
