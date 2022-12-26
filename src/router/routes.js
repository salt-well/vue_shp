//引入路由组件

//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
//import Home from '@/pages/Home'
//替换成
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')

//个人中心的二级路由组件
const MyOrder = () => import('@/pages/Center/myOrder')
const TeamOrder = () => import('@/pages/Center/teamOrder')

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
