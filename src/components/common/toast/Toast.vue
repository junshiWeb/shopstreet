<template>
  <div class="toast" v-show="isToast">
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    time: {
      type: Number,
      default: 2000,
    },
    isToast: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '请添加内容'
    }
  },
  updated() {
      console.log(this.isToast);
      setTimeout(function() {
        this.isToast = false
        console.log(this.isToast);
      },this.time)
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 15px;
  color: #fff;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 10px;
  z-index: 2;
}

</style>