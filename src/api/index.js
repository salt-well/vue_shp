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
export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//删除某一个商品的接口
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})


//用户注册信息
export const reqRegister = (data) => requests({url:'/user/passport/register',method:'post',data})
//获取用户登录成功以后用户信息的接口
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});
//获取验证码接口
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,method:'post',data});
//退出登录业务
export const reqUserLogout = ()=>requests({url:`/user/passport/logout`,method:'get'});


//获取订单详情信息
export const reqShopInfo = () => requests({url:'/order/auth/trade',method:'get'}) 
//获取订单用户地址信息
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});
//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//查询支付结果
export const reqPayResult = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});