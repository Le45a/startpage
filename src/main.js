import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueJsonp from 'vue-jsonp'
import './plugins/element.js'

Vue.use(vueJsonp)// vue跨域解决
Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
