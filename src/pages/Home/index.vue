<template>
   <div>
      <TypeNav></TypeNav>
      <!-- <TypeNav></TypeNav> 换成全局组件-->
      <ListContainer></ListContainer>
      <TodayRecommend></TodayRecommend>
      <Rank></Rank>
      <Like></Like>
      <Floor v-for="floorList in floorLists" :key="floorList.id" :floorList="floorList"></Floor>
      <Brand></Brand>

   </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapState } from 'vuex'

export default {
   name: '',
   components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
   mounted() {
      //派发floor组件action
      this.$store.dispatch('getFloorList')
   },
   computed: {
      //获取vuex中state中的floorLists数据
      ...mapState({
         floorLists: (state) => {
            return state.home.floorLists
         }
      })
   }
} 
</script>

<style>

</style>