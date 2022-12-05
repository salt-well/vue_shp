//当前这个模块:API进行统一管理
import requests from "./request"

//引入mock模块API
import mockRequests from "./mockRequest"

//三级联动获取数据API
/* export const reqCategoryList = ()=>{
    //发请求:axios发请求返回结果Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
} */
//简写:
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//mock模拟
//轮播图获取数据
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
//floor获取数据
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' })

//search搜索数据
export const reqGetSearchList = (params) => requests({ url: '/list', method: 'post', data: params })
//detail模块详情页数据
export const reqGetDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get'})

//加入购物车&&修改商品个数的接口
export const reqAddOrUpdateCart =(skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车数据
export const reqGetShopCart = () => requests({url:'/cart/cartList',method:'get'})
//修改某一个商品的勾选的状态
export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
