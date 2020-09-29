<template>
  <div id="nav-bar">
    <!-- nav 的封装 -->
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-center">
      <slot name="center">中心</slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
#nav-bar {
  position: relative;
  z-index: 10;
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.nav-left {
  width: 60px;
}
.nav-center {
  flex: 1;
}
.nav-right {
  width: 60px;
}
</style>
