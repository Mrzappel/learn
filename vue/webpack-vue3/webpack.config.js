const { Configuration } = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
/**
 * @type {Configuration}
 */
const config = {
  mode: "development",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use:["style-loader","css-loader"]//use里的后面的先执行，有顺序
      },
      {
        test: /\.less$/,
        use:["style-loader","css-loader","less-loader"]//use里的后面的先执行，有顺序
      },
      {
        test: /\.ts$/,//解析ts
        loader: "ts-loader",
        options: {
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          appendTsSuffixTo:[/\.vue$/]
        }
      }
    ]
  },
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname,'dist')
  },
  resolve: {
    alias: {
      '@':path.resolve(__dirname, 'src')
    },
    extensions:['.vue','.ts','.js']
  },
  stats: "errors-only",
  devServer: {
    port: 9090,
    proxy: {
      
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template:"./public/index.html"
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages:['You appliaction is running here: http://localhost:9090']
      }
    })
  ],
  externals: {
    vue:"Vue"
  }
}

module.exports = config
