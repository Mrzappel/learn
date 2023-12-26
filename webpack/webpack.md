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

### Tree Shaking 
一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化²。

在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件²：
1. 使用 ESM 规范编写模块代码
2. 配置 optimization.usedExports 为 true，启动标记功能
3. 启动代码优化功能，可以通过如下方式实现：
    - 配置 mode = production
    - 配置 optimization.minimize = true
    - 提供 optimization.minimizer 数组

例如：
```javascript
// webpack.config.js
module.exports = {
  entry: "./src/index",
  mode: "production",
  devtool: false,
  optimization: {
    usedExports: true,
  },
};
```
在 ESM 方案下模块之间的依赖关系是高度确定的，与运行状态无关，编译工具只需要对 ESM 模块做静态分析，就可以从代码字面量中推断出哪些模块值未曾被其它模块使用，这是实现 Tree Shaking 技术的必要条件²。

例如，对于下述代码：
```javascript
// index.js
import {bar} from './bar';
console.log (bar);

// bar.js
export const bar = 'bar';
export const foo = 'foo';
```
示例中，`bar.js` 模块导出了 `bar`、`foo`，但只有 `bar` 导出值被其它模块使用，经过 Tree Shaking 处理后，`foo` 变量会被视作无用代码删除²。这样就达到了删除无用代码的目的⁴。

源: 与必应的对话， 2023/12/25
(1) Webpack 原理系列九：Tree-Shaking 实现原理 - 知乎 - 知乎专栏. https://zhuanlan.zhihu.com/p/403901557.
(2) tree-shaking 的概念及其工作原理_简述tree-shaking的用途和原理_淘淘是只狗的博客-CSDN博客. https://blog.csdn.net/qq_43477721/article/details/119222634.
(3) 面试官：tree-shaking的原理是什么？ - 掘金. https://juejin.cn/post/7265125368553685050.
(4) tree shaking的原理是什么?_treeshaking原理-CSDN博客. https://blog.csdn.net/weixin_44730897/article/details/125783898.

### webpack路由懒加载原理

Webpack 生成阶段中，遇到异步引入语句时会为该模块单独生成一个 chunk 对象，并将其子模块都加入这个 chunk 中，需要的时候再动态加载，动态加载，是通过动态生成script的方式来实现的，类似于jsonp的方式，通过script标签来加载js文件，然后执行，这样就实现了按需加载。

Webpack的路由懒加载原理主要基于两个核心概念：动态导入（Dynamic Imports）和代码分割（Code Splitting）。

1. **动态导入**：JavaScript有一个提案添加了`import()`函数，允许你在需要的时候动态加载模块。`import()`返回一个Promise，这意味着你可以使用Promise的API，如`.then()`和`async/await`来处理结果。

2. **代码分割**：Webpack有一个功能叫做代码分割，允许你将代码分割成各种小块（chunks），这些小块可以在初次加载页面时延迟加载，或者在需要的时候动态加载。

当你在路由配置中使用动态导入时，Webpack会自动将你的代码分割成不同的小块。然后，当用户导航到一个新的路由时，对应的小块会被动态加载。

这是一个使用Vue.js的例子：

```javascript
const Foo = () => import('./Foo.vue')

new Vue({
  router: new VueRouter({
    routes: [
      { path: '/foo', component: Foo }
    ]
  })
})
```

在这个例子中，`Foo.vue`模块会被Webpack分割成一个单独的小块，并且只有当用户导航到`/foo`路由时，才会被加载。

动态加载通常是通过动态生成`<script>`标签的方式来实现的。当你使用Webpack的`import()`函数动态加载模块时，Webpack会生成一个新的JavaScript文件（也就是一个代码块或chunk）。然后，当`import()`函数被调用时，会动态创建一个`<script>`标签来加载这个新的JavaScript文件。

这是一个简单的例子：

```javascript
// 假设我们有一个名为 "moduleA" 的模块
import(/* webpackChunkName: "moduleA" */ './moduleA').then(moduleA => {
  // 使用 moduleA...
});
```

在这个例子中，`moduleA`模块会被Webpack分割成一个单独的代码块，并且只有当`import()`函数被调用时，才会被加载。加载的过程就是动态创建一个`<script>`标签，然后加载生成的JavaScript文件。


 在JavaScript中，可以使用`AbortController`接口来取消一个fetch请求。`AbortController`是一个可以用来中断一个或多个DOM请求的对象。

以下是一个使用`AbortController`取消fetch请求的例子：

```javascript
let controller = new AbortController();
let signal = controller.signal;

// 发起一个请求
fetch('/some/api', { signal }).then(response => {
  // 处理响应
}).catch(e => {
  if (e.name === 'AbortError') {
    console.log('Fetch operation was aborted');
  } else {
    // 处理其他错误
  }
});

// 在需要取消请求的时候
controller.abort();
```

在这个例子中，我们首先创建了一个`AbortController`实例，并从中获取了一个`AbortSignal`。然后，我们将这个`AbortSignal`传递给fetch函数。当我们需要取消请求时，只需要调用`AbortController`的`abort`方法即可。

需要注意的是，`AbortController`和`AbortSignal`是比较新的API，不是所有的浏览器都支持。

用XHR（XMLHttpRequest）并调用其abort方法

使用`XMLHttpRequest`（XHR）对象，你可以在请求发送后取消它。这是通过调用XHR对象的`abort()`方法实现的。以下是一个示例：

```javascript
// 创建一个新的XHR对象
let xhr = new XMLHttpRequest();

// 初始化一个请求
xhr.open('GET', '/some/api', true);

// 发送请求
xhr.send();

// 在需要取消请求的时候
xhr.abort();
```

在这个例子中，我们首先创建了一个新的XHR对象，然后使用`open`方法初始化了一个GET请求。然后，我们使用`send`方法发送了请求。当我们需要取消请求时，只需要调用XHR对象的`abort`方法即可。

需要注意的是，如果请求已经被接收，那么`abort`方法将无法取消请求。此外，即使请求被取消，`readystatechange`事件也可能仍然被触发。因此，你可能需要在你的事件处理函数中检查`xhr.status`，以确定请求是否成功。

axios是如何取消请求的

在Axios中，你可以使用`CancelToken`来取消一个请求。以下是一个使用`CancelToken`取消Axios请求的例子：

```javascript
// 创建一个CancelToken的源
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

// 发起一个请求
axios.get('/some/api', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理其他错误
  }
});

// 在需要取消请求的时候
source.cancel('Operation canceled by the user.');
```
