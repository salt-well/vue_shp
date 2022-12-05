# vue_shp文档

```
cnpm install --save less less-loader //安装less,less-loadr安装[五版本的]  

npm install --legacy-peer-deps vue-router@4.0.13  //安装vue-router报错因为版本太高，用这个安装指定的版本
```

## 三级联动lodash防抖与节流

## 路由组件
   
pages文件夹下面一般放的是路由组件   

## 1.接口统一管理

项目很小:可以在生命周期函数中使用axios发请求

项目很大：对接口实行统一管理,一般在项目下面有个api文件夹

## 2.跨域问题

原来解决办法：JSONP、CROS、代理 

## 3.nprogress进度条使用

start:进度条开始
done:进度条结束
进度条颜色可以修改的,需要修改nprogress.css中的样式

## 4.vuex状态管理库

vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据。

state
mutations
actions
getters
modules

切记，并不是全部项目都需要vuex,如果项目很少，完全不需要vuex,如果项目很大，组件、数据很多，维护很费劲,可以用vuex实现模块式开发
{
    home:{},
    search:{}
}

### 4.1 三级联动添加背景颜色

正常情况(用户慢慢操作):每一个分类都会触发

非正常情况(用户操作很快):经过测试，只能触发几级,原因是操作太快，浏览器反应不过来,这里需要运用到函数的防抖、节流

防抖:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就说如果快速的触发，只会执行一次(用户操作频繁，但是只是执行一次)

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发(用户操作很频繁，但是把频繁的操作变为少量操作【可以给浏览器有充裕的时间代码解析】)

用loadsh插件处理防抖和节流  
防抖:
```
_.debounce(function(){

},50)
```
节流：
```
_.throttle(function(){

},50) 
```

## 5.三级联运组件的路由跳转与传递参数

路由跳转：
声明式导航：router-link
编程式导航：push|replace

三级联动：如果使用声导航router-link,可以实现路由跳转与传递参数，但是移动菜单有卡顿现象，因为router-link是组件生成的，循环生成大量的组件消耗内存造成

## 6.在搜索页三级列表是收起状态

6.1 v-show和v-if 才能设置过渡动画效果

6.2 三级联动请求数据,派发action放置在app.vue的mounted中，提高性能，只请求一次服务器

## 7.开发Home首页当中的ListContainer组件与Floor组件
   
服务器返回的数据没有提供，使用mockjs插件模拟数据,使用步骤:
1).在项目src文件夹中创建mock文件夹
2).准备json数据    
3).把mock中的图片文件放到public文件夹images中【public文件夹打包的时候会把文件原封不动的打包到dist文件夹】
4).创建mockServer.js通过mockjs
5).添加swiper插件，在mouted通过定时器引用，这样不是完善解决方面
6).完美解决方案  watch + nextTick
  $nextTick:在下次更新循环之后执行延迟回调,在  修改数据 之后  立即使用这个方法，获取更新后的 DOM
  $nextTick:可以保证页面中的结构一定是有的，经常和很多插件一起使【都需要DOM存在】

7).开发floor组件

7.1 getFloorList这个action需要在home组件触发，因为需要v-for遍历floor组件
7.2 组件间通信的方式
props:用于父子组件通信
自定义事件: @on @emit 可以实现子给父通信
全局事件总线: $bus 全能
pubsub-js:vue当中几乎不用 全能
插槽、vuex  
7.3 把首页轮播图拆分为全局组件
看到一个项目在很多组件在都使用，把它注册为全局组件，共用的组件非路由组件放到conpments文件夹中

## 8.search模块

  1).vuex中的getters属性通常用于简化属性
  2).当属性如this.searchParmas.categoryId = undefined,则不会给服务器发送请求
  3).Pagination分页页码写出逻辑，从简单到复杂一步一步拆解出来(pageNo、total、pagerCount)








