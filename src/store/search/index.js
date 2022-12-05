//search模块的小仓库

import { reqGetSearchList } from '@/api'

//响应组件中的动作，可自己书写业务逻辑
let actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchList(params)
        if (result.code = 200) {
            commit('SEARCHLIST', result.data)
        }
    }
}

//操作数据
let mutations = {
    SEARCHLIST(state, searchLists) {
        state.searchLists = searchLists
    }
}

//存储数据
let state = {
    searchLists: {}
}

//简化数据操作
let getters = {
    goodsList(state) {
       //console.log('search模块getters中的state:',state)
       return state.searchLists.goodsList 
    },
    attrsList(state){
        return state.searchLists.attrsList
    },
    trademarkList(state){
        return state.searchLists.trademarkList
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}