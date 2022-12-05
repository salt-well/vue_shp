//购物车小仓库

import {reqGetShopCart,reqUpdateChecked} from "@/api"
//引入UUID标识,如果是untils/index.js写成"@/utils"，index.js默认省略可不写，否则utils/UUID.js写成"@/utils/UUID"
import {UUID} from "@/utils/UUID"

let actions = {
	//获取购物车列表数:请求头添加临时登录用户标识才能获取到数据
	async getShopCart(context) {
		let result = await reqGetShopCart()
		if(result.code == 200){
			context.commit('SHOPCARTLIST',result.data)
		}
	},
	//修改某一个商品勾选状态
	async changeChecked({commit,state,dispatch},{skuId,isChecked}){
		let result = await reqUpdateChecked(skuId,isChecked)
		if(result.code == 200){
			return 'ok'
		}else{
			return Promise.reject(new Error('update shorCart isChecked fail'))
		}
	}
}

let mutations = {
	SHOPCARTLIST(state,shopCartList){
		state.shopCartLists=shopCartList
	}
}

let state = {
	//购物车列表数据,在@/api/request.js中加上临时请求头userTempId才能获取数据
	shopCartLists:[],
	//临时登录用户标识
	USER_ID:UUID()
}

let getters = {
	//这里参数设置有问题，获取第一个数组
	cartInfo(){
		return state.shopCartLists[0] || {}
	}
}

export default {
	actions,
	mutations,
	state,
	getters
}
