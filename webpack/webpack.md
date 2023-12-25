### 模块化

浏览器不知道node_modules,所以导入第三方包无法识别，需要使用构建工具进行打包

构建工具干了什么

1. 模块化支持
2. 集成语法处理工具处理代码兼容性问题

> node_modules目录下的.bin下的命令可以直接使用

### npx
1. `npx webpack` 首先从本地工程的`node_modules/.bin`目录中寻找是否有对应的命令，如果将命令写在`package.json`中，可以省略`npx`
2. 临时安装模块，不会将模块下载到`node_modules`中，下载完成后执行，执行完后删除

### webpack5的优化
1. 无需安装`clean-webpack-plugin`，直接在`output`中配置`clean: true`
2. `top-level await`，可以在模块顶层使用`await`，不需要包裹在`async`函数中,需要`experimental-top-level-await`配置
3. 打包体积优化，`tree shaking`，打包出实际使用的代码
4. 打包缓存开箱即用，不需要使用`cache-loader`,默认缓存到内存里，可以通过`cache: {type: 'filesystem'}`，设置缓存到`node_modules/.cache/webpack`中
5.内置资源模块类型，不需要使用`url-loader`,`file-loader`,`raw-loader`，直接使用`type: 'asset/resource'`，`type: 'asset/inline'`，`type: 'asset/source'`，`type: 'asset'`

### npm模块安装机制
先从`node_modules`中查找，如果已经安装，则不再重复安装，如果没有，再去缓存中找，如果有，则从缓存中读取安装，如果均不存在，则从`registry`中下载安装,写入到本地的`node_modules`和缓存中 

### npm的缓存相关命令
1. `npm cache clean --force` 清除缓存
2. 获取缓存位置 `npm config get cache`
3. 设置缓存位置 `npm config set cache "D:\cache"`

### 模块联邦

微前端`bootstrap`文件，需要在一个异步的环境中执行

`exposes`暴露自身模块，`remotes`使用远程模块，`shared`共享重复模块
