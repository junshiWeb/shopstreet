<template>
  <div ref="wrapper">
    <div><slot></slot></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
    /**
     * 调用滚动，需要提供三个参数 
     * probetype 1:不监听滚动 2：监听鼠标滚动 3：监听所有滚动
     * data 展示的数据
     * pullUpLoad 监听下拉加载，默认不监听
     */
		name: "Scroll",
    props: {
		  probeType: {
		    type: Number,
        default: 1
      },
      data: {
		    type: Array,
        default: () => {
          return []
        }
      },
      pullUpLoad: {
		    type: Boolean,
        default: false
      }
    },
    data() {
		  return {
		    scroll: {}
      }
    },
    mounted() {
      // 初始化滚动
		  setTimeout(this.__initScroll, 20)
    },
    methods: {
		  __initScroll() {
		    // 1.初始化BScroll对象
		    if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        })

        // 2.将监听事件回调
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })

        // 3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载');
          this.$emit('pullingUp')
        })
      },
      // 刷新
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      // 上拉加载
      finishPullUp() {
		    this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      // 跳转指定位置
      scrollTo(x, y, time) {
		    this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
	}
</script>

<style scoped>

</style>
