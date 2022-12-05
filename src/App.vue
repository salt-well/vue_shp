<template>
  <div id="app">
    <Header />

    <!--路由组件出口的地方-->
    <router-view></router-view>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    //派发一个actions||获取商品分类的三级数据(这里移到APP.vue中，只挂载一次)
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
