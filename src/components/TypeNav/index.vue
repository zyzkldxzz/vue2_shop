<template lang="">
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派/委托，委托给其父元素 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <!-- 三级商品分类路由跳转 事件委派 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 不使用router-link而是绑定事件，因为router-link是一个组件，因为快速划过商品分类时不断地创建、销毁组件实例，易造成卡顿 -->
                                    <!-- 直接在每个a标签上绑定事件的话会产生非常多的回调，最好的方法是利用事件委派写到其父元素上 -->
                                    <!-- 事件委派后给a标签添加该属性以区分a标签与其他节点 -->
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
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
            
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 鼠标当前在的一级分类索引
            currentIndex: -1,
            isShow: true,
        }
    },
    mounted(){
        if(this.$route.path != '/home'){
            this.isShow = false
        }
    },
    computed: {
        ...mapState({categoryList: state => state.home.categoryList})
    },
    methods: {
        /* changeIndex(index){
            this.currentIndex = index
        }, */
        // 使用lodash进行节流
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        leaveShow(){
            if(this.$route.path != '/home'){
                this.isShow = false
            }
            this.currentIndex = -1
        },
        goSearch(e){
            let element = e.target
            // console.dir(element);
            // dataset可以得到该标签的自定义属性
            let {categoryname, category1id, category2id, category3id} = element.dataset
            // console.log(element.dataset);
            if(categoryname){
                let location = {name:'search'}
                let query = {categoryName: categoryname}
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }
                location.query = query
                if(this.$route.params){
                    location.params = this.$route.params
                }
                this.$router.push(location,() => {}, (err) => {console.log(err);})
            }
        },
        enterShow(){
            this.isShow = true
        }
    }

}
</script>
<style lang="less" scoped>
    a {
        cursor: pointer;
    }
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
                                        }
                                    }
                                }
                            }
                        }

                        /* &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                    }
                    /* .item:hover {
                        background-color: rgba(0, 128, 0, 0.579);
                    } */
                    .cur {
                        background-color: skyblue;
                    }
                }
            }
            .sort-enter,.sort-leave-to {
                opacity: 0;
                height: 0;
            }
            .sort-enter-to,.sort-leave {
                opacity: 1;
                height: 461px;
            }
            .sort-enter-active,.sort-leave-active {
                transition: all 0.5s;
            }
        }
    }
</style>