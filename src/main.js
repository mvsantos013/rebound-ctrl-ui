import Vue from 'vue'
import App from './app'
import store from './store'
import router from './router'
import './plugins/filters'
import './plugins/quasar'
import './plugins/vue-toast-notification'
import '@/assets/css/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
