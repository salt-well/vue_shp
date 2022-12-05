//对axios进行二次封装
import axios from "axios"

//引入进度条
import nprogress from "nprogress"
//start:进度条开始，done:进度条结束
//引入进度条样式
import "nprogress/nprogress.css"


//axios.create方法执行，返回一个axios和request一样
let mockRequests = axios.create({
    //***mockjs模拟请求路径
    baseURL:'/mock',
    //超时设置
    timeout:5000
})

//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
mockRequests.interceptors.request.use((config)=>{
   //config:配置对象，对象里面有一个属性很重要，headers请求头 
   
   //1.进度条开始动
   nprogress.start()

   return config
},(error)=>{
  return Promise.reject(error) 
})
//响应拦截器:
mockRequests.interceptors.response.use((response)=>{
    //响应成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    
    //1.进度条结束
    nprogress.done()

    return response.data
},(error)=>{
    //响应失败的回调函数:   (new Error('faile')后,error传参数没用到)
    return Promise.reject(error.message) 
})

export default mockRequests