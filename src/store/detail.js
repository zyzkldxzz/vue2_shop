import { reqGoodsInfo,reqAddUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid'
const state = {
    goodsInfo: {},
    uuid_token:getUUID()
}
const actions = {
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    async addUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddUpdateShopCart(skuId, skuNum)
        // console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}