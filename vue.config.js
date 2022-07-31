const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: './',

  //关闭eslint校验
  lintOnSave: false,
})
