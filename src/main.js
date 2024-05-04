import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 统一引入
import * as API from '@/api'
// 按需引入element-ui
import {Button, MessageBox} from 'element-ui'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import welcome from '@/assets/welcome.png'
Vue.use(VueLazyload,{
  loading: welcome,
})
// 自定义插件
// import myPlugin from '@/plugins/myplugin'
// Vue.use(myPlugin)
import '@/plugins/validate'

Vue.config.productionTip = false
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 按需引入element-ui
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
}).$mount('#app')
