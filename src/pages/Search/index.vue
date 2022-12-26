<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--params参数-->
            <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!--query参数-->
            <li class="with-x" v-show="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!--品牌参数-->
            <li class="with-x" v-show="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTradeMark">×</i></li>
            <!--属性参数-->
            <li class="with-x" v-for="(popValue, index) in searchParams.props" :key="index">{{ popValue.split(":")[2]
            }}<i @click="removePopValue(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @addTrademarkParams="addTrademarkParams" @addAttrValueParams="addAttrValueParams" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isZongHe }" @click="changeOrder(1)">
                  <a href="#">综合
                    <!-- <span v-show="isZongHe && isAsc">⬆</span><span v-show="isZongHe && isDesc">⬇</span> -->
                    <!--阿里矢量图index.html中要引入样式-->
                    <span v-show="isZongHe" class="iconfont" :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"></span>
                  </a>
                </li>
                <li :class="{ active: isSale }" @click="changeOrder(2)">
                  <a href="#">销量<span v-show="isSale" class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"></span></a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a> -->
                    <router-link :to="`/detail/${good.id}`">
						<!--原来的绑定 <img :src="good.defaultImg" /> -->
						<!--v-lazy全局指令实现图片懒加载-->
						<img v-lazy="good.defaultImg" />
					</router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ good.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--
            pageNo:当前分页页码
            pageSize：每页显示的条数
            total:总的数据
            pagercount:连续页码数
          -->
          <div class="fr page">
            <Pagination 
            :pageNo="this.searchParams.pageNo" 
            :pageSize="this.searchParams.pageSize" 
            :total="total" 
            :pagerCount="5"
            @currentPage = "currentPage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'

import { mapState, mapGetters } from 'vuex';
import router from '@/router';

export default {
  name: 'Search',
  components: { SearchSelector, router },
  data() {
    return {
      //将来Search模块搜索的条件
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 3, //代表当前一页显示几条数据 【默认初始值:10】
      },
    };
  },
  //钩子函数:beforeCreate、created、beforeMount.执行都是在mounted之前
  //整理参数不能在：beforeCreate因为不能获取VC属性、方法
  beforeMount() {
    //在发请求之前:整理用户搜索的参数
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    //组件挂载完毕:发送请求
    this.getSearchData()
  },
  computed: {
    ...mapState({ total: state => state.search.searchLists.total }),
    ...mapGetters(['goodsList']),
    isZongHe() {
      return this.searchParams.order.indexOf("1") != -1
    },
    isSale() {
      return this.searchParams.order.indexOf("2") != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1
    }
  },
  methods: {
    //获取Search组件搜索数据
    getSearchData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //移除面包屑params参数
    removeKeyword() {
      this.searchParams.keyword = ''
      //重新发送请求
      this.$router.push({ name: 'search', params: this.searchParams.keyword, query: this.$route.query })
      //通知header组件中的搜索框清除关键字
      this.$bus.$emit('clearKeyword', this.searchParams.keyword)
    },
    //移除面包屑query参数
    removeCategoryName() {
      //清空query参数
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      this.searchParams.categoryName = ''
      //重新发送请求
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    //移除品牌参数
    removeTradeMark() {
      this.searchParams.trademark = ''
      this.getSearchData()
    },
    //移除属性参数
    removePopValue(index) {
      //删除数组里对应索引的值
      this.searchParams.props.splice(index, 1)
      //重新发请求
      this.getSearchData()
    },
    //自定义事件:
    //品牌查询
    addTrademarkParams(tmId, tmName) {
      //整理品牌相关搜索条件
      this.searchParams.trademark = `${tmId}:${tmName}`
      //重新发请求
      this.getSearchData()
    },
    //属性查询
    addAttrValueParams(attrId, attrName, attrValue) {
      let newPops = `${attrId}:${attrName}:${attrValue}`
      //数组有重复的值不再添加
      if (this.searchParams.props.indexOf(newPops) == -1) {
        this.searchParams.props.push(newPops)
        //再次请求，获取最新数据
        this.getSearchData()
      }

    },
    //商品排序
    changeOrder(flag) {
      let originFlag = this.searchParams.order.split(":")[0]
      let originSortType = this.searchParams.order.split(":")[1]
      let newOrder = ""
      if (flag == originFlag) {
        newOrder = `${flag}:${originSortType == "desc" ? "asc" : "desc"}`
      } else {
        newOrder = `${flag}:desc`
      }
      //重新给order赋予新的数值
      this.searchParams.order = newOrder
      //重新发一次请求
      this.getSearchData()
    },
    //分页
    currentPage(page){
      //获取当前点击的页数,父组件整理参数
      this.searchParams.pageNo = page
      this.getSearchData()
    }

  },
  watch: {
    //监视路由:变化再整理路由参数
    $route() {
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      //路由变化重新派发action请求
      this.getSearchData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        //.sui-pagination样式        
        
      }
    }
  }
}
</style>