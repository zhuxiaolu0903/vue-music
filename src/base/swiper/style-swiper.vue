<template>
  <div class="style-swiper" ref="styleSwiper">
    <div class="swiper-group" ref="swiperGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  name: 'style-swiper',
  mounted() {
    setTimeout(() => {
      this._setClass()
      this._initSwiper()
    }, 20)
  },
  methods: {
    _setClass() {
      let children = this.$refs.swiperGroup.children
      let width = 0
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        addClass(child, 'swiper-item')
        width += child.clientWidth + 12
      }
      this.$refs.swiperGroup.style.width = (width - 12) + 'px'
    },
    _initSwiper() {
      this.swiper = new BScroll(this.$refs.styleSwiper, {
        scrollX: true,
        momentum: false,
        snap: {
          loop: false,
          threshold: 0.3,
          speed: 400
        },
        bounce: {
          right: true
        },
        stopPropagation: true,
        eventPassthrough: 'vertical'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .style-swiper
    position: relative
    overflow: hidden
    .swiper-group
      white-space: nowrap
      .swiper-item
        position: relative
        display: inline-block
        margin-right 12px
        width 100px
        vertical-align middle
        background-color rgba(0, 0, 0, 0.03)
        border-radius 5px
        &:last-child
          margin-right 0
        .picture img
          width 100%
          height 120px
          border-radius 5px 5px 0 0
        .des
          margin 0 5px
          height 40px
          line-height: 18px
          font-size $font-size-small-s
          color: $color-text-ll
          white-space normal
          text-overflow -o-ellipsis-lastline
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
        .playCount
          position absolute
          top 6px
          right 3px
          display flex
          align-items center
          color: $color-text-l
          font-size $font-size-small-s
          .icon
            display inline-block
            margin-right 2px
</style>
