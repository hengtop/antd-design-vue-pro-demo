
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* 'primary-color': '#002251', */
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: []
  },
  //这里处理后引入的svg会处理成函数式组件
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          } else if (process.env.MOCK !== "none") {
            const name = req.path.split('/api/')[1].split('/').join('_');
            const mock = require(`./src/mock/${name}`);
            const result = mock(req.method);
            //清除缓存,修改后保证数据是最新的
            delete require.cache[require.resolve(`./src/mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  
  },
    //设置elsint关闭
    lintOnSave: false
}