// 对axios进行二次封装
import axios from "axios";
// 请求资源进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

// 创建axios实例
const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config，配置对象，里面包含headers请求头
    // nprogress进度条开始
    nProgress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // nprogress进度条结束
    nProgress.done()
    return res.data;
},(error) => {
    return Promise.reject(new error('fail'))
})

export default requests