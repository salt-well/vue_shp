//先引入mockjs模块
import Mock from 'mockjs'

//把JSON数据引入进来【JSON数据格式根本没有对外暴露，但是可以引入】
//原因是:【图片、JSON】数据格式是webpack【默认】对外暴露的
import banner from './banner.json'
import floor from './floor.json'

//接口:相当于nodejs里面中间件,注意：这里'/mock/banner'不能写成'/mock/banner.json',否则获取不到数据
//第一个参数：接口的地址 第二个参数:向这个接口发请求获取到的数据 
//Mock插件：中间件默认是GET请求
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
