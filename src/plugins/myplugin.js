let myPlugin = {}

myPlugin.install = function(){
    console.log('自定义插件');
    // 在插件里可以自定义指令、在原型上添加实例方法等
    // Vue.prototype
    // Vue.directive('name',{

    // })
}

export default myPlugin