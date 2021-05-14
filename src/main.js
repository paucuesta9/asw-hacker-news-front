import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  Vuex,
  router,
  render: h => h(App)
}).$mount('#app')
