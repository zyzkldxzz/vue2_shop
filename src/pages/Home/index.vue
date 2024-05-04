<template lang="">
    <div>
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Like from '@/pages/Home/Like'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Rank from '@/pages/Home/Rank'
import { mapState } from 'vuex'
export default {
    name: 'Home',
    components: {ListContainer,TodayRecommend,Like, Brand, Floor, Rank},
    mounted(){
        this.$store.dispatch('getFloorList')
    },
    computed:{
        ...mapState({floorList:state=>state.home.floorList})
    }
}
</script>
<style lang="" scoped>
    
</style>