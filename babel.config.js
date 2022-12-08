module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //element-ui按需引入配置
  "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
}
