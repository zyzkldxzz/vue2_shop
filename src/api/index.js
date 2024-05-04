// 对所有api接口进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'

export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

export const reqGetBannerList = () => mockRequests.get('/banner')

export const reqGetFloorList = () => mockRequests.get('/floor')

export const reqGetSearchInfo = (params) => requests({
    url:'/list',
    method:'post',
    data:params,
})

export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

export const reqAddUpdateShopCart = (skuId, skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

export const reqGetCartList = ()=>requests({url:'/cart/cartList',method:'get'})

export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

export const reqUpdateCheckedById = (skuId,isChecked)=>({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

export const reqGetCode = (phone) =>requests({url: `/user/passport/sendCode/${phone}`,method:'get'})

export const reqUserRegister = (data) => requests({url:'/user/passport/register',method:'post',data})

export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

export const reqUserLogout = () =>requests({url:'/user/passport/logout',method:'get'})

export const reqGetTrade = () => requests({url:'/order/auth/trade',method:'get'})

export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

export const reqPayInfo = (orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

export const reqMyorderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})