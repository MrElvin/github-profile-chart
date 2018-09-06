import Vue from 'vue'
import App from './App.vue'
import axios from './utils/axios'
import router from './router'
import 'melongrid.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
