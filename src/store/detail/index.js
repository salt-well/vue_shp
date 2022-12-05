import { reqGetDetailList, reqAddOrUpdateCart } from '@/api'

let actions = {
    //获取商品详情
    async getDetailList(conext, skuId) {
        let result = await reqGetDetailList(skuId)
        if (result.code == 200) {
            conext.commit('DETAILLIST', result.data)
        }
    },
	//添加数据至购物车{skuId:skuId,skuNum:skuNum}简写{skuId,skuNum}
    async addOrUpdateCart(_ ,{skuId,skuNum}) {
        //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写
        let result = await reqAddOrUpdateCart(skuId, skuNum);
        
        if (result.code == 200) {
             //如果加入购物车成功,返回promise即为成功
             return "ok";
        } else {
             //如果加入购物车失败，返回失败的Promise
             return Promise.reject();
        }
        //思考问题:目的是前端把商品的ID、商品个数传递给服务器【人家服务器，兄弟我收到了,没有额外的给你传递其余的数据】
        //想的问题:豪哥不对，咱们以前经常commit条件mutation存储数据【没有返回数据，没有数据可存储】,没有需要提交mutation让仓库
        //存储数据
        //第一种解决方案code,完全可以！！！！
    }
}
let mutations = {
    DETAILLIST(state, detailLists) {
        state.detailLists = detailLists
    }
}
let state = {
    //商品详情的数据
    detailLists: {}
}
let getters = {
    //面包屑:导航路径区域 
    categoryView() {
        //研究这个问题:
        //起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
        //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
        return state.detailLists.categoryView || {}
    },
    //商品信息的数据
    skuInfo() {
        return state.detailLists.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.detailLists.spuSaleAttrList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}