### 初始文件夹
1、src下的assets文件夹里通常放多个组件共用的静态资源，webpack打包时会把静态资源当作一个模块打包到js文件里面。
而public文件夹一般放置一些静态资源，打包时原封不动打包到dist文件夹中。
### 项目其他配置
1、浏览器自动打开。在package.json中scripts对应命令后加上--open  
2、关闭eslint校验工具。在vue.config.js文件里加上lintOnSave:false指令  
3、src文件夹简写方式，配置别名@。在jsconfig.json文件中有自动生成的相关配置。
### 项目组件分析
路由组件：home首页、search搜索、login登录、register注册、  
非路由组件：header、footer  
在components文件夹下通常放置非路由组件，以标签形式使用  
在pages或views文件夹下通常放置路由组件，通常在router文件夹中进行注册
### Tips
1、如果某个功能点在很多地方都要使用，可以将其拆分为一个组件，放到components文件夹中，并注册为全局组件
### 面试题
#### 1、路由传参问题
三种传递形式：字符串拼接、模板字符串、对象（最常用
```
this.$router.push("/search/" + this.keyword + "?k=" + this.keyword)
```
```
this.$router.push(`/search/${this.keyword}?k=${this.keyword}`)
```
```
this.$router.push({name: 'search',params: {keyword: this.keyword},query:{k:this.keyword}})
```
params参数在路由配置时必须占位，path:'/search/:keyword' 
params参数属于路径的一部分，query参数不属于路径的一部分，比如可以输出this.$route.path查看到
1、需注意：在对象写法中，params参数必须结合name使用，不能结合path  
2、如何指定params参数可传可不传？在配置路由占位的后面加上问号 path:'/search/:keyword?'  
3、如果传递的是空串，如何解决？使用undefined，keyword: this.keyword || undefined  
4、路由组件能否传递props？可以，但我们很少用，因为可以直接从$route中得到。三种写法：  
①布尔值。在路由配置时加上props:true，这样其携带的params参数可以作为props接收  
②对象。额外地给组件传递一些props，比如在配置路由时写props:{a:100}  
③函数。可以把params参数、query参数通过props传递给路由组件，比如props: ($route) => {return {keyword: $route.params.keyword,q: $route.query.q}}
#### 2、路由跳转问题
路由跳转有两种形式：声明式导航（使用router-link）、编程式导航（绑定事件使用this.$router.push或replace）
1、为什么编程式导航路由跳转时若多次执行会抛出navigationDuplicated的错误？如何解决？
因为编程式导航的返回值是promise对象，需要有成功或失败的回调。再添加两个回调函数的参数即可。
#### 3、axios二次封装
1、为什么要对axios二次封装  
请求拦截器，在发送请求之前可以处理一些业务  
响应拦截器，当服务器数据返回后处理一些事情
2、在项目中API文件夹常常是有关axios请求的
#### 4、防抖节流
1、防抖：前面的所有触发都被取消，最后一次执行在规定时间之后才会触发，也就是说如果连续快速触发，只会执行一次。
   节流：在规定的时间间隔内不会重复触发回调，只有大于这个时间间隔才会触发，把频繁触发变为少量触发。
（使用lodash中的debounce和throttle函数。原理是闭包+延迟器）
#### 5、token、vuex
vuex存储数据不是持久化的，token可以利用localstorage持久化存储，