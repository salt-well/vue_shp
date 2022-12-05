<template>
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播图-->
                <Carousel :lists="bannerLists" />
                <!-- <div class="swiper-container" ref="mySwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="carsouel in bannerLists" :key="carsouel.id">
                            <img :src="carsouel.imgUrl" />
                        </div>
                        <div class="swiper-slide">
                            <img src="./images/banner2.jpg" />
                        </div>
                        <div class="swiper-slide">
                            <img src="./images/banner3.jpg" />
                        </div>
                        <div class="swiper-slide">
                            <img src="./images/banner4.jpg" />
                        </div> 
                    </div>
                     如果需要分页器 
                    <div class="swiper-pagination"></div>

                     如果需要导航按钮 
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>

                     如果需要滚动条 
                     <div class="swiper-scrollbar"></div> 
                </div> -->
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

//import Swiper from "swiper"

export default {
    name: 'ListContainer',
    computed: {
        //通过vuex中mapState获取轮播图数据
        ...mapState({ bannerLists: state => state.home.bannerLists })
    },
    mounted() {
        //派发一个action，获取轮播图数据
        this.$store.dispatch('getBannerList')

        //setTimeout实现轮播图：添加实例化
        /* setTimeout(() => {
            console.log('swiper')
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    //分页器类型
                    type: "bullets",
                    //点击分页器，切换轮播
                    clickable: true,
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                    snapOnRelease: false,
                    dragSize: false
                },
            })

        }, 2000) */

    },
    watch: {
        /* //监听bannerLists数据变化：由空数组变为数组执行
        bannerLists: {
            handler() {
                //当前这个函数执行，只能代表数据bannerLists有了，但v-for里面的DOM结构可能没执行完全，所以这里要用nextTick
                //nextTick:在下次更新循环之后执行延迟回调,在  修改数据 之后  立即使用这个方法，获取更新后的 DOM
                this.$nextTick(() => {
                    //初始化Swiper类的实例
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                        //设置轮播图防线
                        direction: "horizontal",
                        //开启循环模式
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            //分页器类型
                            type: "bullets",
                            //点击分页器，切换轮播
                            clickable: true,
                        },
                        //自动轮播
                        autoplay: {
                            delay: 1000,
                            //新版本的写法：目前是5版本
                            // pauseOnMouseEnter: true,
                            //如果设置为true，当切换到最后一个slide时停止自动切换
                            stopOnLastSlide: true,
                            //用户操作swiper之后，是否禁止autoplay
                            disableOnInteraction: false,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        //切换效果
                         effect: "cube",
                    });

                    //1:swiper插件,对外暴露一个Swiper构造函数
                    //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
                    //鼠标进入停止轮播
                    mySwiper.el.onmouseover = function () {
                        mySwiper.autoplay.stop();
                    };
                    //鼠标离开开始轮播
                    mySwiper.el.onmouseout = function () {
                        mySwiper.autoplay.start();
                    };
                });

            }
        } */
    }
}
</script>

<style scoped lang="less">
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(~@/assets/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>