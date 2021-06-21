const path = require('path');
const webpack = require('webpack');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, "./src/styles/theme"), //主题文件所在文件夹
  varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
  mainLessFile: "",
  outputFilePath: path.join(__dirname, "./public/color.less"), //提取的less文件输出到什么地方
  themeVariables: ["@primary-color"], //要改变的主题变量
  indexFileName: "./public/index.html", // index.html所在位置
  generateOnce: false
}

const themePlugin = new AntDesignThemePlugin(options);

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
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),]
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
}