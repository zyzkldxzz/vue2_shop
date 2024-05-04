<template lang="">
<div class="detail">
    <TypeNav />
    <section class="con">
        <!-- 导航路径区域 -->
        <div class="conPoin">
            <span v-show='categoryView.category1Name'>{{ categoryView.category1Name }}</span>/
            <span v-show='categoryView.category2Name'>{{ categoryView.category2Name }}</span>/
            <span v-show='categoryView.category3Name'>{{ categoryView.category3Name }}</span>
        </div>
        <!-- 主要内容区域 -->
        <div class="mainCon">
            <!-- 左侧放大镜区域 -->
            <div class="previewWrap">
                <!--放大镜效果-->
                <Zoom :skuImageList='skuImageList'/>
                <!--下方的缩略图-->
                <ImageList :skuImageList='skuImageList'/>
            </div>
            <!-- 右侧选择区域布局 -->
            <div class="InfoWrap">
                <div class="goodsDetail">
                    <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
                    <p class="news">{{ skuInfo.skuDesc }}</p>
                    <div class="priceArea">
                    <div class="priceArea1">
                        <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                        <div class="price">
                        <i>¥</i>
                        <em>{{ skuInfo.price }}</em>
                        <span>降价通知</span>
                        </div>
                        <div class="remark">
                        <i>累计评价</i>
                        <em>65545</em>
                        </div>
                    </div>
                    <div class="priceArea2">
                        <div class="title">
                        <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                        </div>
                        <div class="fixWidth">
                        <i class="red-bg">加价购</i>
                        <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                        </div>
                    </div>
                    </div>
                    <div class="support">
                    <div class="supportArea">
                        <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                        <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
                    </div>
                    <div class="supportArea">
                        <div class="title">配 送 至</div>
                        <div class="fixWidth">广东省 深圳市 宝安区</div>
                    </div>
                    </div>
                </div>

                <div class="choose">
                    <div class="chooseArea">
                        <div class="choosed"></div>
                        <dl v-for="item in spuSaleAttrList" :key="item.id">
                            <dt class="title">选择{{ item.saleAttrName }}</dt>
                            <dd 
                                changepirce="0" 
                                :class="{active:spuValue.isChecked==1}" 
                                v-for="spuValue in item.spuSaleAttrValueList" 
                                :key="spuValue.id"
                                @click="changeActive(spuValue, item.spuSaleAttrValueList)"
                                >
                                {{ spuValue.saleAttrValueName }}
                            </dd>
                        </dl>
                    </div>

                    <div class="cartWrap">
                        <div class="controls">
                            <input autocomplete="off" v-model="skuNum" class="itxt" @change="checkNumber"/>
                            <a href="javascript:" class="plus" @click="plus">+</a>
                            <a href="javascript:" class="mins" @click="mins">-</a>
                        </div>
                        <div class="add">
                            <a @click="addShopcart">加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    </section>
  </div>
</template>
<script>
import Zoom from './Zoom.vue'
import ImageList from './ImageList.vue';
import { mapGetters } from 'vuex';
export default {
    name:'Detail',
    components: {Zoom, ImageList},
    data() {
        return {
            skuNum: 1,
        }
    },
    computed: {
        ...mapGetters(['categoryView','skuInfo','spuSaleAttrList']),
        skuImageList(){
            return this.skuInfo.skuImageList||[]
        }
    },
    mounted(){
        this.$store.dispatch('getGoodsInfo',this.$route.params.skuId)
    },
    methods:{
        changeActive(spuValue,arr){
            // 排他，先把所有的高亮都去掉
            arr.forEach(item=>{
                item.isChecked = 0
            })
            // 再把所点击的高亮
            spuValue.isChecked=1
        },
        plus(){
            this.skuNum++
        },
        mins(){
            if(this.skuNum>1){
                this.skuNum--
            }else{
                this.skuNum = 1
            }
            
        },
        checkNumber(){
            if(this.skuNum<1|| isNaN(this.skuNum)){
                this.skuNum=1
            }else{
                this.skuNum = parseInt(this.skuNum)
            }
        },
        async addShopcart(){
            try{
                await this.$store.dispatch('addUpdateShopCart',{skuId:this.$route.params.skuId, skuNum:this.skuNum})
                sessionStorage.setItem('skuInfo',JSON.stringify(this.skuInfo))
                this.$router.push({path:'/addcartsuccess', query:{skuNum:this.skuNum}})

            }catch(error){
                alert(error.message)
            }
            
        }
    }

}
</script>
<style lang="less" scoped>
  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        &>span+span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            color: #e12228;
            margin-top: 15px;
          }

          .priceArea {
            background: #fee9eb;
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

              .remark {
                float: right;
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }


          }

          .support {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  float: left;
                }

                dd {
                  cursor: pointer;
                  float: left;
                  margin-right: 5px;
                  color: #666;
                  line-height: 24px;
                  padding: 2px 14px;
                  border-top: 1px solid #eee;
                  border-right: 1px solid #bbb;
                  border-bottom: 1px solid #bbb;
                  border-left: 1px solid #eee;

                  &.active {
                    color: green;
                    border: 1px solid green;
                  }
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }

                .plus,
                .mins {
                  text-decoration: none;
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .product-detail {
      width: 1200px;
      margin: 30px auto 0;
      overflow: hidden;

      .aside {
        width: 210px;
        float: left;
        border: 1px solid #ccc;

        .tabWraped {
          height: 40px;

          h4 {
            border-top: 3px solid #fff;
            float: left;
            line-height: 37px;
            width: 105px;
            text-align: center;
            border-bottom: 1px solid #ccc;

            &.active {
              border-top: 3px solid #e1251b;
              border-bottom: 0;
              font-weight: normal;
            }
          }
        }

        .tabContent {
          padding: 10px;

          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .partList {
                overflow: hidden;

                li {
                  width: 50%;
                  float: left;
                  border-bottom: 1px dashed #ededed;
                  line-height: 28px;
                }
              }

              .goodsList {
                &>li {
                  margin: 5px 0 15px;
                  border-bottom: 1px solid #ededed;
                  padding-bottom: 5px;

                  .list-wrap {
                    .p-img {
                      text-align: center;

                      img {
                        width: 152px;
                      }
                    }

                    .price {
                      font-size: 16px;
                      color: #c81623;
                    }

                    .operate {
                      text-align: center;
                      margin: 5px 0;

                      a {
                        background-color: transparent;
                        border: 1px solid #8c8c8c;
                        color: #8c8c8c;
                        display: inline-block;
                        padding: 2px 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .detail {
        width: 980px;
        float: right;

        .fitting {
          border: 1px solid #ddd;
          margin-bottom: 15px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #333;
            padding: 5px 0 5px 15px;
          }

          .good-suits {
            height: 170px;
            padding-top: 10px;

            .master {
              width: 127px;
              height: 165px;
              text-align: center;
              position: relative;
              float: left;

              img {
                width: 87px;
              }

              p {
                color: #c81623;
                font-size: 16px;
                font-weight: 700;
              }

              i {
                position: absolute;
                top: 48px;
                right: -25px;
                font-size: 16px;
              }
            }

            .suits {
              width: 668px;
              height: 165px;
              float: left;

              .suitsItem {
                float: left;
                width: 127px;
                padding: 0 20px;
                text-align: center;

                img {
                  width: 120px;
                  height: 130px;
                }

                p {
                  font-size: 12px;
                }

                label {
                  display: block;
                  position: relative;

                  input {
                    vertical-align: middle;
                  }

                  span {
                    vertical-align: middle;
                  }
                }
              }
            }

            .result {
              border-left: 1px solid #ddd;
              width: 153px;
              height: 165px;
              padding-left: 20px;
              float: left;

              .num {
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .price-tit {
                font-weight: bold;
                margin-bottom: 10px;
              }

              .price {
                color: #B1191A;
                font-size: 16px;
                margin-bottom: 10px;
              }

              .addshopcar {
                background-color: #e1251b;
                border: 1px solid #e1251b;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                box-sizing: border-box;
              }
            }
          }
        }

        .intro {
          .tab-wraped {
            background: #ededed;
            // border: 1px solid #ddd;
            overflow: hidden;

            li {
              float: left;

              &+li>a {
                border-left: 1px solid #ddd;
              }

              &.active {
                a {
                  // border: 0;
                  background: #e1251b;
                  color: #fff;
                }
              }

              a {
                display: block;
                height: 40px;
                line-height: 40px;
                padding: 0 11px;
                text-align: center;
                color: #666;
                background: #fcfcfc;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
              }
            }
          }

          .tab-content {
            .tab-pane {
              display: none;

              &.active {
                display: block;
              }

              &:nth-child(1) {
                .goods-intro {
                  padding-left: 10px;

                  li {
                    margin: 10px 0;
                  }
                }

                .intro-detail {
                  img {
                    width: 100%;
                  }
                }
              }
            }

          }
        }
      }
    }
  }
</style>