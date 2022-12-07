//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由相关配置项
import routes from './routes'
//引入vuex
import store from '@/store'


//先把VueRouter原型中的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push和replace
/*
 *location:参数
 *resolve:成功的回调
 *reject:失败的回调
 */
VueRouter.prototype.push = function(location,resolve,reject){
    //传了成功或失败的回调执行
    if(resolve && reject){
        //call||apply区别:相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点:call与apply传递参数,call传递参数用逗号隔开,apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}


//配置路由
const router = new VueRouter({
     routes:routes,
	 //设置滚动条的位置
	 scrollBehavior() {
	     //滚动行为这个函数,需要有返回值,返回值为一个对象。
	     //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
	     return { y: 0 }
	 }
})
export default router

//全局前置守卫
router.beforeEach(async (to,from,next)=>{
	//console.log(store)
	let hasToken = store.state.user.token
	let hasNickName = store.state.user.nickName
	console.log(hasToken,hasNickName)
	if (hasToken){
		//用户名为空获取
		if(!hasNickName){
			try{
				console.log('routes里面:',hasNickName)
				await store.dispatch('getUserInfo')
			}
			catch(error){
				
			}			
		}
	}
	
	next()
})