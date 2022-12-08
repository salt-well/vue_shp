import {reqShopInfo,reqAddressInfo,reqSubmitOrder} from '@/api'

let actions = {
	//订单信息
	async getShopInfo(context){
		let result = await  reqShopInfo()
		console.log('trade 组件action:',result)
		if (result.code == 200){
			context.commit('GETSHOPINFO',result.data)
		}else{			
			return Promise.reject(new Error(result.message))
		}
		
	},
	//获取用户收获地址信息
    async getAddressInfo({state,commit,dispatch}){
		let result = await reqAddressInfo()
		if (result.code == 200){
			commit('GETADDRESSINFO',result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error(result.message))
		}
	},
	//提交订单
	async submitOrderInfo({commit},{tradeNo,data}){
		let result = await reqSubmitOrder(tradeNo,data)
		console.log('trade submitorder',result)
		if (result.code == 200){
			commit('SUBMITORDER',result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error(result.message))
		}
	}
}
let mutations = {
	GETSHOPINFO(state,tradeInfo){		
		state.tradeInfo = tradeInfo
	},
	GETADDRESSINFO(state,addressInfo){
		state.userAddressList = addressInfo
	},
	SUBMITORDER(state,payId){
		state.payId = payId
	}
}
let state = {
	tradeInfo : {},
	//收货地址信息
	userAddressList: [],
	//支付订单id
	payId:'',
}
let getters = {
	detailArrayList(){
		return state.tradeInfo.detailArrayList || []
	}
}

export default {
	actions,
	mutations,
	state,
	getters
}