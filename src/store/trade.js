import {reqGetTrade} from '@/api/index'

const state ={
    tradeInfo: {},
}
const actions={
    async getUserTrade({commit}){
        let result = await reqGetTrade()
        // console.log(result);
        if(result.code == 200){
            commit('GETUSERTRADE',result.data)
        }
    }
}
const mutations ={
    GETUSERTRADE(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}
const getters={

}
export default {
    state,
    actions,
    mutations,
    getters
}