import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible'
// 加载 dayjs 初始化配置
import './utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
