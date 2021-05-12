import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
Vue.config.productionTip = false
window.Vue = Vue;
new Vue({
  name:'root',
  render: h => h(App),
  store
}).$mount('#app')
