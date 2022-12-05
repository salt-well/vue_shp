//home模块小仓库

import {
    reqCategoryList,
    reqGetBannerList,
    reqGetFloorList
} from '@/api'

//准备actions:处理actions,可以书写自己的业务逻辑，也可以处理异步——用于响应组件中的动作
const actions = {
    //三级联动   
    async categoryList({ commit }) {
        //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据  
        let result = await reqCategoryList()
        //console.log('home中actions获取reqCategoryList',result)
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //轮播图
    async getBannerList(context) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('BANNERLIST', result.data)
        }
    },
    //floor
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
}
//准备mutations:修改state的唯一手段——用于操作数据（state）
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryLists = value
    },
    BANNERLIST(state, bannerList) {
        state.bannerLists = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorLists = floorList
    }
}
//state:仓库存储数据的地方
const state = {
    categoryLists: [],
    bannerLists: [],
    floorLists: []
}
//准备getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便——用于将state中的数据进行加工
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}