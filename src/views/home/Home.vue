<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 置顶导航控制 -->
    <tab-control
      v-show="isTabFixed"
      class="fixed"
      @itemClick="tabClick"
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
    ></tab-control>
    <!-- 滚动 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore" 
      :data="showGoodsList"
      :pull-up-load="true"
      :probe-type="3"
    >
      <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
      <feature-view :features="recommends"></feature-view>
      <recommend-view></recommend-view>
      <!-- 导航控制 -->
      <tab-control @itemClick="tabClick" :titles="['流行', '新款', '精选']" ref="tabControl"></tab-control>
      <goods-list :goods-list="showGoodsList" class="good-list"></goods-list>
    </scroll>
    <!-- 回到置顶 -->
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt />
    </back-top>
  </div>
</template> 

<script>
import NavBar from "common/navbar/NavBar";
import Scroll from "common/scroll/Scroll";
import BackTop from "content/backTop/BackTop";
import TabControl from "content/tabControl/TabControl";
import HomeSwiper from "./childComps/HomeSwiper";
import FeatureView from "./childComps/FeatureView";
import RecommendView from "./childComps/RecommendView";
import GoodsList from "./childComps/GoodsList";
import { getHomeMultidata, getHomeData, RECOMMEND, BANNER } from "network/home";
import { NEW, POP, SELL, BACKTOP_DISTANCE } from "@/common/const";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    BackTop,
    HomeSwiper,
    FeatureView,
    RecommendView,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // 数据请求设计
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: POP,
      isTabFixed: false,
      tabOffsetTop: 0,
      showBackTop: false,
      popOffsetTop: 0,
      newOffsetTop: 0,
      sellOffsetTop: 0,
      isPop: false,
      isNew: false,
      isSell: false,
      leaveY: 0
    };
  },
  computed: {
    // 导航显示数据
    showGoodsList() {
      return this.goodsList[this.currentType].list;
    },
  },
  created() {
    // 请求首页多个数据
    this.getMultiData();

    // 首次请求商品数据
    this.getHomeProducts(POP);
    this.getHomeProducts(NEW);
    this.getHomeProducts(SELL);
  },
  activated: function () {
    // 刷新轮播图高度
    this.$refs.hSwiper.startTimer();
    // 回到离开时首页滚动距离
    console.log(this.leaveY);
    this.$refs.scroll.scrollTo(0, this.leaveY, 200)
    this.$refs.scroll.refresh()
  },
  deactivated: function () {
    // 停止刷新轮播图高度
    this.$refs.hSwiper.stopTimer();
    // 记录离开时首页滚动距离
    this.leaveY  = this.$refs.scroll.scroll.startY
    console.log(this.leaveY);
    // this.$store.commit('leaveHome',this.leaveY)
    // console.log(this.$store);
  },
  updated() {
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  methods: {
    // 导航点击控制
    tabClick(index) {
      // 初始化导航
      switch (index) {
        case 0:
          this.currentType = POP;
          if (this.$refs.scroll.scroll.startY <= -this.tabOffsetTop) {
            if (!this.isPop) {
              this.popOffsetTop = -this.tabOffsetTop;
              this.$refs.scroll.scrollTo(0, this.popOffsetTop, 0);
              this.isPop = true;
            } else {
              this.$refs.scroll.scrollTo(0, this.popOffsetTop, 0);
              this.currentIndex == "new"
                ? (this.newOffsetTop = this.$refs.scroll.scroll.startY)
                : (this.sellOffsetTop = this.$refs.scroll.scroll.startY);
            }
          } else {
            this.popOffsetTop = this.$refs.scroll.scroll.startY;
            this.isPop = false;
          }
          break;
        case 1:
          this.currentType = NEW;
          if (this.$refs.scroll.scroll.startY <= -this.tabOffsetTop) {
            if (!this.isNew) {
              this.newOffsetTop = -this.tabOffsetTop;
              this.$refs.scroll.scrollTo(0, this.newOffsetTop, 0);
              this.isNew = true;
            } else {
              this.$refs.scroll.scrollTo(0, this.newOffsetTop, 0);
              this.currentIndex == "pop"
                ? (this.popOffsetTop = this.$refs.scroll.scroll.startY)
                : (this.sellOffsetTop = this.$refs.scroll.scroll.startY);
            }
          } else {
            this.newOffsetTop = this.$refs.scroll.scroll.startY;
            this.isNew = false;
          }
          break;
        case 2:
          this.currentType = SELL;
          if (this.$refs.scroll.scroll.startY <= -this.tabOffsetTop) {
            if (!this.isSell) {
              this.sellOffsetTop = -this.tabOffsetTop;
              this.$refs.scroll.scrollTo(0, this.sellOffsetTop, 0);
              this.isSell = true;
            } else {
              this.$refs.scroll.scrollTo(0, this.sellOffsetTop, 0);
              this.currentIndex == "pop"
                ? (this.popOffsetTop = this.$refs.scroll.scroll.startY)
                : (this.newOffsetTop = this.$refs.scroll.scroll.startY);
            }
          } else {
            this.sellOffsetTop = this.$refs.scroll.scroll.startY;
            this.isSell = false;
          }
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    // 监听滚动距离
    contentScroll(position) {
      // 决定置顶导航是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;
      // 决定backTop是否显示
      this.showBackTop = position.y < -BACKTOP_DISTANCE;
     
    },
    // 上拉加载
    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    // 网络请求相关方法
    getMultiData() {
      getHomeMultidata().then((res) => {
        this.banners = res.data[BANNER].list;
        this.recommends = res.data[RECOMMEND].list;
      });
    },
    // 导航数据请求
    getHomeProducts(type) {
      getHomeData(type, this.goodsList[type].page + 1).then((res) => {
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;
        // 下拉数据请求
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>
