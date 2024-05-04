const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包时是否生成map文件
  productionSourceMap:false,
  lintOnSave:false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {  // 只要前面是/api的请求，都先去找到这台代理服务器处理
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
