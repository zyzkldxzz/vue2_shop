import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo, reqUserLogout} from '@/api/index'
import {getToken,setToken,removeToken} from '@/utils/token'

const state ={
    code: '',
    // token:localStorage.getItem('TOKEN'),
    token: getToken(),
    userInfo: {}
}
const actions={
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        // console.log(result);
        // 此处为模拟验证码，真实情况则不需要result.data了
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({commit},data){
        let result = await reqUserRegister(data)
        // console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // console.log(result);
        // 服务器下发token，常常通过token找服务器要用户信息进行展示
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            alert('用户名或密码错误')
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        // console.log(result);
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogout({commit}){
        let result = await reqUserLogout()
        console.log(result);
        if(result.code==200){
            commit('USERLOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations ={
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    USERLOGOUT(state){
        state.token = ''
        state.userInfo = {}
        // localStorage.removeItem('TOKEN')
        removeToken()
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