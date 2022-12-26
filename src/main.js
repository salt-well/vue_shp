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
//6.引入Api(将项目全部请求函数引入进来[分别暴露])
import * as API from '@/api'
/*//7.引入element-ui
底下的写法目前是全部引入
完整引入element-ui组件库,可以使用任意UI组件【都是全局组件】
//引入elementUI插件
import ElementUI from 'element-ui';
//引入element样式
import 'element-ui/lib/theme-chalk/index.css';
//安装使用elementUI插件
Vue.use(ElementUI);
*/
//按需引入
import { Button, Row, Col, Input, MessageBox, Message} from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
//8.图片懒加载
import loadimage from '@/assets/loading.gif'
// or with options
//const loadimage = require('./assets/loading.gif')
//引入插件
import VueLazyload from 'vue-lazyload'
//注册插件:增加v-lazy:全局指令
Vue.use(VueLazyload, {
  //preLoad: 1.3,
  //error: errorimage,
  loading: loadimage, //默认加载的图片
  //attempt: 1
})




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    //注册全局事件总线
    Vue.prototype.$bus = this
	////通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
	Vue.prototype.$API = API
  },
  //注册路由:
  //router:router
  //简写:下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store: store,

}).$mount('#app')


