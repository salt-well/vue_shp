<template>
    <div class="type-nav" @mouseleave="leaveHandler" @click="goSearch">
        <div class="container">
            <h2 class="all" @mouseenter="enterHandler">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <Transition name="sort" >
                <div class="sort" v-show="show">
                    <div class="all-sort-list2">
                        <div class="item" v-for="(c1, index) in categoryLists" :key="c1.categoryId">
                            <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex == index }">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                    {{ c1.categoryName }}
                                </a>
                            </h3>
                            <!--控制二级菜单显示与否-->
                            <div class="item-list clearfix"
                                :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                                {{ c2.categoryName }}
                                            </a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName"
                                                    :data-category3Id="c3.categoryId">
                                                    {{ c3.categoryName }}
                                                </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script>

//利用辅助函数获取仓库state数据  ---mapState
import { mapState } from 'vuex'

//底下的这种写法:是将lodash全部API引入,将来项目打包的时候，体积会大一些
//import _ from "lodash";
//按需引入
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    data() {
        return {
            //设置标签a的背景色
            currentIndex: -1,
            //设置三级联运展开或关闭
            show: true
        }
    },
    mounted() {
        //派发一个actions||获取商品分类的三级数据(这里移到APP.vue中，只挂载一次)
        //this.$store.dispatch('categoryList')
        //console.log('TypeNav中的store:',this.$store)
        //路由切换的时候,路由组件会被销毁重建【子组件不也是】

        //不是home组件页，三级联动进入隐藏
        if (this.$route.path != '/home') {
            this.show = false
        }

    },
    computed: {
        //1.原始写法:
        /* categoryLists(){                
            return this.$store.state.home.categoryLists
        } */
        //2.数组写法:只能获取到大仓库state下的home小仓库,dom获取再用{{home.categoryLists}}
        //...mapState(['home']),
        //3.对象写法:通过大仓库state中获取小仓库home的数据
        ...mapState({
            categoryLists: (state) => {
                return state.home.categoryLists.filter((categoryList) => {
                    //太长了，少显示些种类，过滤掉'钟表'、'厨具'种类
                    return categoryList.categoryName != '钟表' && categoryList.categoryName != '厨具'
                })
            }
            // categoryLists:state => state.home.categoryLists  //对象简写形式             
        })
    },
    methods: {
        //鼠标进入时
        //1.全部引入写法
        //changeIndex: _.throttle(function (index) {
        //2.按需要引入写法,这是节流,防抖用_.debounce
        changeIndex: throttle(function (index) {
            this.currentIndex = index
            //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
            //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
            //函数的防抖与节流技术
            // console.log("处理业务" + index);
        }, 50),
        //鼠标离开'全部商品种类'时
        leaveHandler() {
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        enterHandler() {
            if (this.$route.path != '/home') {
                this.show = true
            }
        },
        goSearch(event) {
            //获取当前点击的dom元素
            let targetNode = event.target
            //console.log(target, target.dataset)
            //target.dataset获取属性的数组对象,vue设置data-categoryName
            let {
                categoryname,
                category1id,
                category2id,
                category3id
            } = targetNode.dataset  //targetNode对象赋值给对象

            //判断点击的是a标签才处理路由，判断categoryname属性是否有值
            if (categoryname) {

                var locations = {
                    name: 'search',
                    query: { categoryName: categoryname }
                }

                //一级分类ID
                if (category1id) {
                    locations.query.category1Id = category1id
                    //二级分类id
                } else if (category2id) {
                    locations.query.category2Id = category2id
                    //三级分类id
                } else {
                    locations.query.category3Id = category3id
                }

                //1.点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
                if (this.$route.params) {
                    locations.params = this.$route.params
                }
                //2.有query参数时
                /* if(this.$route.query.k){
                    locations.query.k = this.$route.query.k
                } */


                //目前商品分类这里携带参数只有query参数
                this.$router.push(locations)

            }

        }




    }
}

</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }

                    }

                    h3:hover {
                        a {
                            color: #e1251b;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;

                                    a:hover {
                                        color: #e1251b;
                                        text-decoration: none;
                                    }
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;

                                        a:hover {
                                            color: #e1251b;
                                            text-decoration: none;
                                        }
                                    }
                                }

                            }
                        }
                    }

                    //不用样式进行三级分类显示与隐藏
                    /* &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }
            }

            .cur {
                background-color: #e2dfde;
            }
        }
    }
}

/*过渡动画:商品分类 */
.sort-enter-active {
    animation: vue_shp 0.5s linear;
}

.sort-leave-active {
    animation: vue_shp 0.5s linear reverse;
}

@keyframes vue_shp {
    from {
        //transform: translateY(461px);
        height: 461;
    }

    to {
        //transform: translateY(0px);
        height: 0px;
    }
}
</style>