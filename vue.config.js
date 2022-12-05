const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //代理服务器配置
  devServer: {
    proxy: {
      //'/api'表示请求路径中出现这个就转到 http://gmall-h5-api.atguigu.cn服务器
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        //pathRewrite重写路径
        //pathRewrite: { '^/api': '' },
      },
    },
  },
})
