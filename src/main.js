import Vue from 'vue'
import App from './App.vue'

//注册全局组件:Header、Footer,全局组件写法【定义一次,可以直接在任意地方使用】
//Vue.component(组件的名字,组件)
//组件:实质是VueComponent构造函数,为什么下面Header组件打印并非是VueComponent构造函数,因为Header组件暴露的
//配置项(JS),并非暴露Vue.extend()[返回VueComponent构造函数],用的是简写方式
import Header from "./components/header"
import TypeNav from "./components/TypeNav"
import Carousel from "./components/Carousel"
import Pagination from "./components/Pagination"
import Footer from "./components/footer"


Vue.component(Header.name, Header)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Footer.name, Footer)

//1.引入路由
import router from '@/router'
//2.axios:引入统一接口
//import {reqCategoryList} from '@/api'
//3.vuex:注册仓库功能
import store from '@/store'
//4.引入MockServe.js ----mock数据
import '@/mock/mockServe'
//5.引入swiper样式
import 'swiper/css/swiper.min.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    //注册全局事件总线
    Vue.prototype.$bus = this
  },
  //注册路由:
  //router:router
  //简写
  router,
  //注册仓库
  store: store,

}).$mount('#app')


