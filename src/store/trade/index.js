import {reqShopInfo} from '@/api'

let actions = {
	async getShopInfo(context){
		let result = await  reqShopInfo()
		console.log('trade 组件action:',result)
		if (result.code == 200){
			context.commit('GETSHOPINFO',result.data)
		}else{			
			return Promise.reject(new Error(result.message))
		}
		
	}
}
let mutations = {
	GETSHOPINFO(state,tradeInfo){		
		state.tradeInfo = tradeInfo
	}
}
let state = {
	tradeInfo : {}
}
let getters = {}

export default {
	actions,
	mutations,
	state,
	getters
}