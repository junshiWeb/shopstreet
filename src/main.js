import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  proload: 1,
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: function (h) {
    return h(App)
  },
  router,
  store
}).$mount('#app')
