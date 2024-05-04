<template lang="">
    <div class="fr page">
        <div class="sui-pagination">
            <ul>
                <li class="prev" :class="{disabled:pageNo==1}" @click="lastPage"><a>«上一页</a></li>
                <li v-if="startAndEnd.start > 1" @click="$emit('getPageNo',1)"><a>1</a></li>
                <li class="dotted" v-if="startAndEnd.start > 2"><span>...</span></li>

                <!-- 中间结构 -->
                <li v-for="(page,index) in startAndEnd.end" :key="index" 
                    v-if="page>=startAndEnd.start" 
                    @click="$emit('getPageNo',page)" 
                    :class="{active:pageNo==page}">
                        <a href="#">{{ page }}</a>
                </li>

                <li class="dotted" v-if="startAndEnd.end < totalPage-1"><span>...</span></li>
                <li v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)"><a href="#">{{ totalPage }}</a></li>
                <li class="next" :class="{disabled:pageNo==totalPage}" @click="nextPage"><a href="#">下一页»</a></li>
            </ul>
            <div><span>共 {{ total }} 条</span></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: ['pageNo','pageSize','total','continues'],
    computed: {
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        startAndEnd(){
            const {continues, pageNo, totalPage} = this;
            let start = 0
            let end = 0
            if(continues > totalPage){
                start = 1
                end = totalPage
            }else{
                start = pageNo - Math.floor(continues / 2)
                end = pageNo + Math.floor(continues / 2)
                if(start < 1){
                    start = 1
                    end = continues
                }
                if(end > totalPage){
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return {start, end}
        }
    },
    methods:{
        lastPage(){
            if(this.pageNo>1){
                this.$emit('getPageNo',this.pageNo-1)
            }
        },
        nextPage(){
            if(this.pageNo<this.totalPage){
                this.$emit('getPageNo',this.pageNo+1)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .page{
        width: 800px;
        // height: 66px;
        overflow: hidden;
        margin: auto;
        padding: 10px 0;
        .sui-pagination{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            ul{
                margin-left: 0;
                margin-bottom: 0;
                vertical-align: middle;
                // width: 480px;
                li{
                    line-height: 18px;
                    display: inline-block;
                    a{
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        border: 1px solid #e0e9ee;
                        margin-left: 0px;
                        font-size: 14px;
                        padding: 9px 18px;
                        color: #333;
                    }
                    &.active{
                        a{
                            background-color: #fff;
                            color: #e1251b;
                            // border-color: #fff;
                            cursor: default;
                        }
                    }
                    &.prev{
                        a{
                            background-color: #fafafa;
                        }
                    }
                    &.disabled{
                        a{
                            color: #999;
                            cursor: default;
                        }
                    }
                    &.dotted{
                        span{
                            margin-left: 0px;
                            position: relative;
                            float: left;
                            line-height: 18px;
                            text-decoration: none;
                            background-color: #fff;
                            font-size: 14px;
                            border: 0;
                            padding: 9px 18px;
                            color: #333;
                        }
                    }
                    &.next{
                        a{
                            background-color: #fafafa;
                        }
                    }
                }
            }
            div{
                color: #333;
                font-size: 14px;
                width: 100px;
            }
        }
    }
</style>