module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    } 
  },
  // devServer: {    //环境配置
  //   host: 'localhost',
  //   port: 8080,
  //   https: false,      //是否开启https
  //   hotOnly: false, //是否配置热更新
  //   open: true,      //配置自动启动浏览器
  //   proxy: {        //配置多个代理跨域(配置一个 proxy: 'http://localhost:4000' )
  //     '/api': {
  //       target: 'http://127.0.0.1:3000',
  //       ws: true,  //是否跨域
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' }
  //     }
  //   }
  // },
  // pluginOptions: {// 第三方插件配置
  //   // ...
  // }
  // devServer: {
  //   open: true,  // 自动打开浏览器
  //   hot: true, // 实时打包编译
  //   host: '0.0.0.0',
  //   inline: true,  // 表示实时刷新浏览器
  //   port: '8020'   // 指定打开浏览器的端口号
  // }
}
