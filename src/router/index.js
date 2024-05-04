import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
import store from '@/store'

// 路由懒加载，当路由被访问时才加载对应组件
// const test = ()=> import('@/pages/Home') （直接写到router里

let router = new VueRouter({
    routes: [
        {
            path: '/home',
            meta: {isShow: true},
            component: ()=>import('@/pages/Home')
        },
        {
            name: 'search',
            path: '/Search/:keyword?',
            meta: {isShow: true},
            component: ()=>import('@/pages/Search'),
            // props: true,
        },
        {
            path: '/login',
            meta: {isShow: false},
            component: ()=>import('@/pages/Login')
        },
        {
            path: '/register',
            meta: {isShow: false},
            component: ()=>import('@/pages/Register')
        },
        {
            path: '/detail/:skuId',
            meta: {isShow: true},
            component: Detail
        },
        {
            path:'/addcartsuccess',
            name: 'cartsuccess',
            meta: {isShow:true},
            component:AddCartSuccess
        },
        {
            path:'/shopcart',
            component: ShopCart,
            meta: {isShow:true}
        },
        {
            path:'/trade',
            component:Trade,
            meta:{isShow:true},
            // 路由独享守卫，trade必须由shopcart去到
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopcart'){
                    next()
                }else{
                    // 重置到from的地址
                    next(false)
                }
            }
        },
        {
            path:'/pay',
            component:Pay,
            meta:{isShow:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path:'/paysuccess',
            component:PaySuccess,
            meta:{isShow:true}
        },
        {
            path:'/center',
            component:Center,
            meta:{isShow:true},
            // 二级路由
            children:[
                {
                    path:'myorder',
                    component:myOrder,
                },
                {
                    path:'grouporder',
                    component:groupOrder,
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
// 全局前置守卫
router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        // 已经登录的话就不能去login
        if(to.path == '/login'){
            next('/')
            console.log('已登录去login');
        }else{
            // 已经登录，去的不是login
            // 如果已经有用户名
            if(name){
                next()
                console.log('已登录，已有用户名');
            }else{
                // 获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                    console.log('已登录，获取用户名');
                } catch (error) {
                    // token失效了，清除token
                    store.dispatch('userLogout')
                    next('/login')
                    console.log('已登录，token失效');
                }
            }
        }
    }else{
        // 未登录，不能去交易、支付、个人中心等
        if(to.path.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1 || to.path.indexOf('/center')!=-1){
            // 不直接去到login，而是将其原本要去的路径添加到query参数里，
            // 在login路由跳转那里作处理，这种情况下登录后不跳到home，而是跳到query对应路径
            next('/login?redirect=' + to.path)
        }else{
            next()
        }
    }
})
export default router