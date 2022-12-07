import Vue from "vue"
import Vuex from "vuex"
//需要使用插件
Vue.use(Vuex)

//引入小仓库
import  home from './home'
import search from './search'
import detail from "./detail"
import shopcart from "./shopcart"
import trade from "./trade"
import user from './user'


//对外暴露Store类的一个实例
export default new Vuex.Store({     
     //实现Vuex仓库模块式开发存储数据
     modules:{
        home,
        search,
        detail,
		shopcart,
		trade,
		user
    }
})
