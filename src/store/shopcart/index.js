//购物车小仓库

import {reqGetShopCart,reqUpdateChecked,reqDeleteCart} from "@/api"
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
	},
	//修改全部商品的勾选的状态
	allUpdateChecked({ commit, state, dispatch }, isChecked) {
	     let arr = [];
	     //获取购物车商品的个数,进行遍历
	     state.shopCartLists[0].cartInfoList.forEach(item => {
	          //调用修改某一个商品的action【四次】
	          let ps = dispatch("changeChecked", { skuId: item.skuId, isChecked });
	          arr.push(ps);
	     })
	     //Promise.all():参数需要的是一个数组【数组里面需要promise】
	     //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
	     //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
	     return Promise.all(arr);
	},
     //删除某一个商品的数据
     async deleteCartById({ commit, state, dispatch }, skuId) {
          let result = await reqDeleteCart(skuId);
          if (result.code == 200) {
               return 'ok';
          } else {
               return Promise.reject();
          }
     },
	 //删除选中的商品
	 deleteAllCart({ commit, state, dispatch }) {
	      let arr = [];
	      //获取仓库里面购物车的数据
	      state.shopCartLists[0].cartInfoList.forEach(item => {
	           //商品的勾选状态是勾选的,发请求一个一个删除
	           if (item.isChecked == 1) {
	                let ps = dispatch('deleteCartById', item.skuId);
	                arr.push(ps);
	           }
	      })
	      return Promise.all(arr);
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
