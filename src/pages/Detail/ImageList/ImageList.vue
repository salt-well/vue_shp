<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuInfo.skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{ active: curentIndex == index }" @click="handler(index)">
      </div>
    </div>
    <div class="swiper-button-next" @click="loopHandler(1)"></div>
    <div class="swiper-button-prev" @click="loopHandler(-1)"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
import { mapGetters } from 'vuex'
export default {
  name: "ImageList",
  data() {
    return {
       //控制小图类名的索引值
      curentIndex: 0
    }
  },
  computed: {
    ...mapGetters(['skuInfo'])
  },
  
  methods: {
    loopHandler(number) {
      this.curentIndex += number
      //当循环到第个后从最后个元素元素再开始看
      if(this.curentIndex <0){
        this.curentIndex = this.skuInfo.skuImageList.length -1
      }
      //当循环到结尾后从第一个元素再开始看
      if (this.curentIndex >= this.skuInfo.skuImageList.length){
        this.curentIndex = 0
      }
      //console.log(this.curentIndex)
      this.handler(this.curentIndex)
    },
    //改变显示的大图
    handler(index) {
      //选中的图片
      this.curentIndex = index
      //全局事件总线，通知兄弟当前图片的索引值
      this.$bus.$emit('changeCurrentIndex', index)
    }
  },
  watch: {
    skuInfo() {
      //保证数据发生修改,页面结构再次渲染完毕。在初始化Swiper实例
      this.$nextTick(() => {
        //初始化Swiper类的实例
        var mySwiper = new Swiper(this.$refs.cur, {
          //设置轮播图防线
          direction: "horizontal",
          //loop:true,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //展示区域同时展示三张图片
          slidesPerView: 3,
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 400px;
  box-sizing: border-box;
  margin-top: 5px;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    padding: 0 2px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 1px solid #c81623;
        padding: 1px;
      }

      &:hover {
        border: 1px solid #c81623;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>