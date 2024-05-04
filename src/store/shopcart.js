import { reqGetCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state = {
    cartList:[],
}
const actions = {
    async getCartList({commit}){
        let result = await reqGetCartList()
        // console.log(result);
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartListById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = reqUpdateCheckedById(skuId, isChecked)
        // console.log(result);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 参数为context，里面包含commit、dispatch等，
    deleteaAllCheckedCart({dispatch, getters}){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked==1 ? dispatch('deleteCartListById',element.skuId): ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    updateAllChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(element => {
            let promise = dispatch('updateCheckedById',{skuId:element.skuId,isChecked})
            promiseAll.push(promise)
        })
        // console.log(isChecked);
        return promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}
export default {
    state,
    actions,
    mutations,
    getters
}