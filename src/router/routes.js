//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center'

//个人中心的二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import TeamOrder from '@/pages/Center/teamOrder'

export default [
	{
		path: "/home",
		component: Home,
		meta: {
			show: true
		}
	},
	{
		name: "search",
		path: "/search/:keyword?", //加?代表params参数可不传
		component: Search,
		meta: {
			show: true
		},
		//路由组件能传递props数据
		//1.布尔值写法:只能传params,不能传query
		//props:true,
		//2.对象写法:额外给路由组件传递一此props
		//props:{a:1,b:2}
		//3.函数写法:可以params、query参数
		// props:($route)=>{
		//    return {keyword:$route.params.keyword,k:$route.query.k}                
		//}             
		// props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
	},
	{
		path: "/login",
		component: Login,
		meta: {
			show: false
		}
	},
	{
		path: "/register",
		component: Register,
		meta: {
			show: false
		}
	},
	//重定向，在项目运行起来的时候，转到首页
	{
		path: '*',
		redirect: "/home"
	},
	{
		path: "/detail/:skuId",
		component: Detail,
		meta: {
			show: true
		}
	},
	{
		path: "/addcartsuccess",
		component: AddCartSuccess,
		meta: {
			show: true
		}
	},
	{
		path: "/shopcart",
		component: ShopCart,
		meta: {
			show: true
		}
	},
	{
		path: "/trade",
		component: Trade,
		meta: {
			show: true
		}
	},
	{
		path: "/pay",
		component: Pay,
		meta: {
			show: true
		}
	},
	{
		path: "/paysuccess",
		component: PaySuccess,
		meta: {
			show: true
		}
	},
	{
		path: "/center",
		component: Center,
		meta: { show: true },
		//二级路由配置的地方
		children:[
		     //我的订单
		     {
		          path:'myorder',
		          component:MyOrder
		     }
		     ,
		     {
		         path:'teamorder',
		         component:TeamOrder
		     }
		     ,
		     {
		         path:'/center',
		         redirect:'/center/myorder'
		     }
		]
	},
]
