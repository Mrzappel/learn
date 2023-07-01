## 1.为什么要做前端监控 [#](#t01.为什么要做前端监控)

+ 更快发现问题和解决问题
+ 做产品的决策依据
+ 提升前端工程师的技术深度和广度,打造简历亮点
+ 为业务扩展提供了更多可能性

## 2.前端监控目标 [#](#t12.前端监控目标)

### 2.1 稳定性(stability) [#](#t22.1 稳定性(stability))

| 错误名称 | 备注                       |
| -------- | -------------------------- |
| JS错误   | JS执行错误或者promise异常  |
| 资源异常 | script、link等资源加载异常 |
| 接口错误 | ajax或fetch请求接口异常    |
| 白屏     | 页面空白                   |

### 2.2 用户体验(experience) [#](#t32.2 用户体验(experience))

| 错误名称                                    | 备注                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 加载时间                                    | 各个阶段的加载时间                                                                                 |
| TTFB(time to first byte)(首字节时间)        | 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间 |
| FP(First Paint)(首次绘制)                   | 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻                         |
| FCP(First Content Paint)(首次内容绘制)      | 首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间,可以是任何文本、图像、SVG等的时间                  |
| FMP(First Meaningful paint)(首次有意义绘制) | 首次有意义绘制是页面可用性的量度标准                                                               |
| FID(First Input Delay)(首次输入延迟)        | 用户首次和页面交互到页面响应交互的时间                                                             |
| 卡顿                                        | 超过50ms的长任务                                                                                   |

### 2.3 业务(business) [#](#t42.3 业务(business))

| 错误名称       | 备注                             |
| -------------- | -------------------------------- |
| PV             | page view 即页面浏览量或点击量   |
| UV             | 指访问某个站点的不同IP地址的人数 |
| 页面的停留时间 | 用户在每一个页面的停留时间       |

## 3.前端监控流程 [#](#t53.前端监控流程)

+ 前端埋点
+ 数据上报
+ 分析和计算 将采集到的数据进行加工汇总
+ 可视化展示 将数据按各种维度进行展示
+ 监控报警 发现问题后按一定的条件触发报警

![monitorplatform](https://zhufeng-2021-doc.vercel.app/imgProxy/monitorplatform.jpg)

### 3.1 常见的埋点方案 [#](#t63.1 常见的埋点方案)

##### 3.1.1 代码埋点 [#](#t73.1.1 代码埋点)

+ 代码埋点，就是以嵌入代码的形式进行埋点,比如需要监控用户的点击事件,会选择在用户点击时,插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务器端
+ 优点是可以在任意时刻，精确的发送或保存所需要的数据信息
+ 缺点是工作量较大

##### 3.1.2 可视化埋点 [#](#t83.1.2 可视化埋点)

+ 通过可视化交互的手段，代替代码埋点
+ 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等,最后输出的代码耦合了业务代码和埋点代码
+ 可视化埋点其实是用系统来代替手工插入埋点代码

##### 3.1.3 无痕埋点 [#](#t93.1.3 无痕埋点)

+ 前端的任意一个事件都被绑定一个标识，所有的事件都别记录下来
+ 通过定期上传记录文件,配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
+ 无痕埋点的优点是采集全量数据,不会出现漏埋和误埋等现象
+ 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

## 4.编写监控采集脚本 [#](#t104.编写监控采集脚本)

### 4.1 开通日志服务 [#](#t114.1 开通日志服务)

+ [日志服务(Log Service,简称 SLS)](https://sls.console.aliyun.com/lognext/profile)是针对日志类数据一站式服务，用户无需开发就能快捷完成数据采集、消费、投递以及查询分析等功能，帮助提升运维、运营效率，建立 DT 时代海量日志处理能力
+ [日志服务帮助文档](https://help.aliyun.com/product/28958.html)
+ [Web Tracking](https://help.aliyun.com/document_detail/31752.html)

### 4.2 监控错误 [#](#t124.2 监控错误)

#### 4.2.1 错误分类 [#](#t134.2.1  错误分类)

+ JS错误
  + JS错误
  + Promise异常
+ 资源异常
  + 监听error

#### 4.2.2 数据结构设计 [#](#t144.2.2 数据结构设计)

##### 1\. jsError [#](#t151. jsError)

```auto
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590815288710",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "jsError",//错误类型
  "message": "Uncaught TypeError: Cannot set property 'error' of undefined",//类型详情
  "filename": "http://localhost:8080/",//访问的文件名
  "position": "0:0",//行列信息
  "stack": "btnClick (http://localhost:8080/:20:39)^HTMLInputElement.onclick (http://localhost:8080/:14:72)",//堆栈信息
  "selector": "HTML BODY #container .content INPUT"//选择器
}
```

##### 2\. promiseError [#](#t162. promiseError)

```auto
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590815290600",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "promiseError",//错误类型
  "message": "someVar is not defined",//类型详情
  "filename": "http://localhost:8080/",//访问的文件名
  "position": "24:29",//行列信息
  "stack": "http://localhost:8080/:24:29^new Promise (<anonymous>)^btnPromiseClick (http://localhost:8080/:23:13)^HTMLInputElement.onclick (http://localhost:8080/:15:86)",//堆栈信息
  "selector": "HTML BODY #container .content INPUT"//选择器
}
```

##### 3\. resourceError [#](#t173. resourceError)

```auto
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590816168643",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "resourceError",//错误类型
  "filename": "http://localhost:8080/error.js",//访问的文件名
  "tagName": "SCRIPT",//标签名
  "timeStamp": "76",//时间
  "selector": "HTML BODY SCRIPT"//选择器
}
```

#### 4.2.3 报表 [#](#t184.2.3 报表)

+ [查询语句](https://help.aliyun.com/document_detail/29060.html?spm=5176.2020520112.0.0.636c34c07HzVho)

```js
* | SELECT kind,count(*) as number GROUP BY kind
```

#### 4.2.4 实现 [#](#t194.2.4 实现)

##### 1\. webpack.config.js [#](#t201. webpack.config.js)

webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
}
```

##### 2\. index.html [#](#t212. index.html)

src\\index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body>
    <div id="container">
        <div class="content">
            <input type="button" value="点击抛出错误" onclick="btnClick()" />
            <input type="button" value="点击抛出promise错误" onclick="btnPromiseClick()" />
        </div>
    </div>

    <script>
        function btnClick() {
            window.someVariable.error = 'someVariable';
        }
        function btnPromiseClick() {
            new Promise(function (resolve, reject) {
                console.log(someVar.some);
            });
        }
    </script>
    <script src="error.js"></script>
</body>
</html>
```

##### 3\. src\\index.js [#](#t223. src\index.js)

src\\index.js

```js
import './monitor'
```

##### 4\. monitor\\index.js [#](#t234. monitor\index.js)

src\\monitor\\index.js

```js
import { injectJsError } from './lib/jsError';
injectJsError();
```

##### 5\. jsError.js [#](#t245. jsError.js)

src\\monitor\\lib\\jsError.js

```js
import tracker from '../util/tracker';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
import formatTime from '../util/formatTime';
export function injectJsError() {
    //一般JS运行时错误使用window.onerror捕获处理
    window.addEventListener('error', function (event) {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({//资源加载错误
                kind: 'stability',//稳定性指标
                type: 'error',//resource
                errorType: 'resourceError',
                filename: event.target.src || event.target.href,//加载失败的资源
                tagName: event.target.tagName,//标签名
                timeStamp: formatTime(event.timeStamp),//时间
                selector: getSelector(event.path || event.target),//选择器
            })
        } else {
            tracker.send({
                kind: 'stability',//稳定性指标
                type: 'error',//error
                errorType: 'jsError',//jsError
                message: event.message,//报错信息
                filename: event.filename,//报错链接
                position: (event.lineNo || 0) + ":" + (event.columnNo || 0),//行列号
                stack: getLines(event.error.stack),//错误堆栈
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''//CSS选择器
            })
        }
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

    //当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
    window.addEventListener('unhandledrejection', function (event) {
        let lastEvent = getLastEvent();
        let message = '';
        let line = 0;
        let column = 0;
        let file = '';
        let stack = '';
        if (typeof event.reason === 'string') {
            message = event.reason;
        } else if (typeof event.reason === 'object') {
            message = event.reason.message;
        }
        let reason = event.reason;
        if (typeof reason === 'object') {
            if (reason.stack) {
                var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                if (matchResult) {
                    file = matchResult[1];
                    line = matchResult[2];
                    column = matchResult[3];
                }
                stack = getLines(reason.stack);
            }
        }
        tracker.send({//未捕获的promise错误
            kind: 'stability',//稳定性指标
            type: 'error',//jsError
            errorType: 'promiseError',//unhandledrejection
            message: message,//标签名
            filename: file,
            position: line + ':' + column,//行列
            stack,
            selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
        })
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
}
function getLines(stack) {
    if (!stack) {
        return '';
    }
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
}
```

##### 6\. formatTime.js [#](#t256. formatTime.js)

src\\monitor\\util\\formatTime.js

```js
export default (time) => {
    return `${time}`.split(".")[0]
}
```

##### 7\. getLastEvent.js [#](#t267. getLastEvent.js)

src\\monitor\\util\\getLastEvent.js

```js
let lastEvent;
['click','pointerdown', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(event => {
    document.addEventListener(event, (event) => {
        lastEvent = event;
    }, {
        capture: true,//capture 控制监听器是在捕获阶段执行还是在冒泡阶段执行 
        passive: true //passive 的意思是顺从的，表示它不会对事件的默认行为说 no
    });
});
export default function () {
    return lastEvent;
};
```

##### 8\. getSelector.js [#](#t278. getSelector.js)

src\\monitor\\util\\getSelector.js

```js
const getSelector = function (path) {
    return path.reverse().filter(function (element) {
        return element !== window && element !== document;
    }).map(function (element) {
        var selector;
        if (element.id) {
            selector = `#${element.id}`;
        } else if (element.className && typeof element.className === 'string') {
            selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
        } else {
            selector = element.nodeName;
        }
        return selector;
    }).join(' ');
}
export default function (pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        return getSelector(pathsOrTarget);
    } else {
        var paths = [];
        var element = pathsOrTarget;
        while (element) {
            paths.push(element);
            element = element.parentNode;
        }
        return getSelector(paths);
    }
}
```

##### 9\. tracker.js [#](#t289. tracker.js)

src\\monitor\\util\\tracker.js

+ [PutWebtracking](https://help.aliyun.com/document_detail/120218.html)

```js
let host = 'cn-beijing.log.aliyuncs.com';
let project = 'zhufengmonitor';
let logstore = 'zhufengmonitor-store';
var userAgent = require('user-agent')
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent).name
    };
}

class SendTracker {
    constructor() {
        this.url = `http://${project}.${host}/logstores/${logstore}/track`;
        this.xhr = new XMLHttpRequest();
    }
    send(data = {}, callback) {
        let extraData = getExtraData();
        let logs = { ...extraData, ...data };
        for (let key in logs) {
            if (typeof logs[key] === 'number') {
                logs[key] = "" + logs[key];
            }
        }
        console.log(logs);
        console.log(JSON.stringify(logs, null, 2));
        let body = JSON.stringify({
            __logs__: [logs]
        });
        this.xhr.open("POST", this.url, true);
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
        this.xhr.onload = function () {
            if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
                callback && callback();
            }
        }
        this.xhr.onerror = function (error) {
            console.log('error', error);
        }
        this.xhr.send(body);
    }
}

export default new SendTracker();
```

### 4.3.接口异常采集脚本 [#](#t294.3.接口异常采集脚本)

#### 4.3.1 数据设计 [#](#t304.3.1 数据设计)

```auto
{
  "title": "前端监控系统", //标题
  "url": "http://localhost:8080/", //url
  "timestamp": "1590817024490", //timestamp
  "userAgent": "Chrome", //浏览器版本
  "kind": "stability", //大类
  "type": "xhr", //小类
  "eventType": "load", //事件类型
  "pathname": "/success", //路径
  "status": "200-OK", //状态码
  "duration": "7", //持续时间
  "response": "{\"id\":1}", //响应内容
  "params": ""  //参数
}
```

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590817025617",
  "userAgent": "Chrome",
  "kind": "stability",
  "type": "xhr",
  "eventType": "load",
  "pathname": "/error",
  "status": "500-Internal Server Error",
  "duration": "7",
  "response": "",
  "params": "name=zhufeng"
}
```

#### 4.3.2 实现 [#](#t314.3.2 实现)

##### 1\. src\\index.html [#](#t321. src\index.html)

src\\index.html

```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body>
    <div id="container">
        <div class="content">
+            <input type="button" value="发起ajax成功请求" onclick="sendAjaxSuccess()" />
+            <input type="button" value="发起ajax失败请求" onclick="sendAjaxError()" />
        </div>
    </div>

    <script>
+        function sendAjaxSuccess() {
+            let xhr = new XMLHttpRequest;
+            xhr.open('GET', '/success', true);
+            xhr.responseType = 'json';
+            xhr.onload = function () {
+                console.log(xhr.response);
+            }
+            xhr.send();
+        }
+        function sendAjaxError() {
+            let xhr = new XMLHttpRequest;
+            xhr.open('POST', '/error', true);
+            xhr.responseType = 'json';
+            xhr.onload = function () {
+                console.log(xhr.response);
+            }
+            xhr.onerror = function (error) {
+                console.log(error);
+            }
+            xhr.send("name=zhufeng");
        }
    </script>
</body>

</html>
```

##### 2\. monitor\\index.js [#](#t332. monitor\index.js)

src\\monitor\\index.js

```diff
import { injectJsError } from './lib/jsError';
+import { injectXHR } from './lib/xhr';
injectJsError();
+injectXHR();
```

##### 3\. webpack.config.js [#](#t343. webpack.config.js)

webpack.config.js

```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
+        before(router) {
+            router.get('/success', function (req, res) {
+                res.json({ id: 1 });
+            });
+            router.post('/error', function (req, res) {
+                res.sendStatus(500);
+            });
+        }
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ],

}
```

##### 4\. xhr.js [#](#t354. xhr.js)

src\\monitor\\lib\\xhr.js

```js

import tracker from '../util/tracker';
export function injectXHR() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async, username, password) {
        if (!url.match(/logstores/) && !url.match(/sockjs/)) {
            this.logData = {
                method, url, async, username, password
            }
        }
        return oldOpen.apply(this, arguments);
    }
    let oldSend = XMLHttpRequest.prototype.send;
    let start;
    XMLHttpRequest.prototype.send = function (body) {
        if (this.logData) {
            start = Date.now();
            let handler = (type) => (event) => {
                let duration = Date.now() - start;
                let status = this.status;
                let statusText = this.statusText;
                tracker.send({//未捕获的promise错误
                    kind: 'stability',//稳定性指标
                    type: 'xhr',//xhr
                    eventType: type,//load error abort
                    pathname: this.logData.url,//接口的url地址
                    status: status + "-" + statusText,
                    duration: "" + duration,//接口耗时
                    response: this.response ? JSON.stringify(this.response) : "",
                    params: body || ''
                })
            }
            this.addEventListener('load', handler('load'), false);
            this.addEventListener('error', handler('error'), false);
            this.addEventListener('abort', handler('abort'), false);
        }
        oldSend.apply(this, arguments);
    };
}
```

### 4.4 白屏 [#](#t364.4 白屏)

+ 白屏就是页面上什么都没有

#### 4.4.1 数据设计 [#](#t374.4.1 数据设计)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590822618759",
  "userAgent": "chrome",
  "kind": "stability",      //大类
  "type": "blank",          //小类
  "emptyPoints": "0",       //空白点
  "screen": "2049x1152",    //分辨率
  "viewPoint": "2048x994",  //视口
  "selector": "HTML BODY #container" //选择器
}
```

#### 4.4.2 实现 [#](#t384.4.2 实现)

+ [screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screen) 返回当前window的screen对象,返回当前渲染窗口中和屏幕有关的属性
+ [innerWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth) 只读的 Window 属性 innerWidth 返回以像素为单位的窗口的内部宽度
+ [innerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight) 窗口的内部高度(布局视口)的高度
+ [layout\_viewport](https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport)
+ [elementsFromPoint](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementsFromPoint)方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素

##### 1\. src\\index.html [#](#t391. src\index.html)

```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>
<body>
    <div id="container">
        <div class="content" style="width:600px;word-wrap:break-word;">

        </div>
    </div>

    <script>
+        let content = document.getElementsByClassName('content')[0];
+        content.innerHTML = '@'.repeat(10000);
    </script>
</body>
</html>
```

##### 2\. monitor\\index.js [#](#t402. monitor\index.js)

src\\monitor\\index.js

```diff
import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
+import { blankScreen } from './lib/blankScreen';
injectJsError();
injectXHR();
+blankScreen();
```

##### 3\. onload.js [#](#t413. onload.js)

src\\monitor\\util\\onload.js

```js
export default function (callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
};
```

##### 4\. blankScreen.js [#](#t424. blankScreen.js)

src\\monitor\\lib\\blankScreen.js

```js

import tracker from '../util/tracker';
import onload from '../util/onload';
function getSelector(element) {
    var selector;
    if (element.id) {
        selector = `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
        selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
    } else {
        selector = element.nodeName.toLowerCase();
    }
    return selector;
}
export function blankScreen() {
    const wrapperSelectors = ['body', 'html', '#container', '.content'];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelector(element);
        if (wrapperSelectors.indexOf(selector) >= 0) {
            emptyPoints++;
        }
    }
    onload(function () {
        let xElements, yElements;
        debugger
        for (let i = 1; i <= 9; i++) {
            xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2)
            yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10)
            isWrapper(xElements[0]);
            isWrapper(yElements[0]);
        }
        if (emptyPoints >= 0) {
            let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
            tracker.send({
                kind: 'stability',
                type: 'blank',
                emptyPoints: "" + emptyPoints,
                screen: window.screen.width + "x" + window.screen.height,
                viewPoint: window.innerWidth + 'x' + window.innerHeight,
                selector: getSelector(centerElements[0]),
            })
        }
    });
}
//screen.width  屏幕的宽度   screen.height 屏幕的高度
//window.innerWidth 去除工具条与滚动条的窗口宽度 window.innerHeight 去除工具条与滚动条的窗口高度
```

### 4.5 加载时间 [#](#t434.5 加载时间)

+ [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
+ [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
+ [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#)

#### 4.5.1 阶段含义 [#](#t444.5.1 阶段含义)

| 字段                       | 含义                                                                                                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| navigationStart            | 初始化页面，在同一个浏览器上下文中前一个页面unload的时间戳，如果没有前一个页面的unload,则与fetchStart值相等                                                                                   |
| redirectStart              | 第一个HTTP重定向发生的时间,有跳转且是同域的重定向,否则为0                                                                                                                                     |
| redirectEnd                | 最后一个重定向完成时的时间,否则为0                                                                                                                                                            |
| fetchStart                 | 浏览器准备好使用http请求获取文档的时间,这发生在检查缓存之前                                                                                                                                   |
| domainLookupStart          | DNS域名开始查询的时间,如果有本地的缓存或keep-alive则时间为0                                                                                                                                   |
| domainLookupEnd            | DNS域名结束查询的时间                                                                                                                                                                         |
| connectStart               | TCP开始建立连接的时间,如果是持久连接,则与 `fetchStart`值相等                                                                                                                                |
| secureConnectionStart      | https 连接开始的时间,如果不是安全连接则为0                                                                                                                                                    |
| connectEnd                 | TCP完成握手的时间，如果是持久连接则与 `fetchStart`值相等                                                                                                                                    |
| requestStart               | HTTP请求读取真实文档开始的时间,包括从本地缓存读取                                                                                                                                             |
| requestEnd                 | HTTP请求读取真实文档结束的时间,包括从本地缓存读取                                                                                                                                             |
| responseStart              | 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳                                                                                                                        |
| responseEnd                | 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳                                                                                                    |
| unloadEventStart           | 前一个页面的unload的时间戳 如果没有则为0                                                                                                                                                      |
| unloadEventEnd             | 与 `unloadEventStart`相对应，返回的是 `unload`函数执行完成的时间戳                                                                                                                        |
| domLoading                 | 返回当前网页DOM结构开始解析时的时间戳,此时 `document.readyState`变成loading,并将抛出 `readyStateChange`事件                                                                               |
| domInteractive             | 返回当前网页DOM结构结束解析、开始加载内嵌资源时时间戳,`document.readyState` 变成 `interactive`，并将抛出 `readyStateChange`事件(注意只是DOM树解析完成,这时候并没有开始加载网页内的资源) |
| domContentLoadedEventStart | 网页domContentLoaded事件发生的时间                                                                                                                                                            |
| domContentLoadedEventEnd   | 网页domContentLoaded事件脚本执行完毕的时间,domReady的时间                                                                                                                                     |
| domComplete                | DOM树解析完成,且资源也准备就绪的时间,`document.readyState`变成 `complete`.并将抛出 `readystatechange`事件                                                                               |
| loadEventStart             | load 事件发送给文档，也即load回调函数开始执行的时间                                                                                                                                           |
| loadEventEnd               | load回调函数执行完成的时间                                                                                                                                                                    |

#### 4.5.2 阶段计算 [#](#t454.5.2 阶段计算)

| 字段             | 描述                                 | 计算方式                                               | 意义                                                                                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| unload           | 前一个页面卸载耗时                   | unloadEventEnd – unloadEventStart                     | \-                                                                                                        |
| redirect         | 重定向耗时                           | redirectEnd – redirectStart                           | 重定向的时间                                                                                              |
| appCache         | 缓存耗时                             | domainLookupStart – fetchStart                        | 读取缓存的时间                                                                                            |
| dns              | DNS 解析耗时                         | domainLookupEnd – domainLookupStart                   | 可观察域名解析服务是否正常                                                                                |
| tcp              | TCP 连接耗时                         | connectEnd – connectStart                             | 建立连接的耗时                                                                                            |
| ssl              | SSL 安全连接耗时                     | connectEnd – secureConnectionStart                    | 反映数据安全连接建立耗时                                                                                  |
| ttfb             | Time to First Byte(TTFB)网络请求耗时 | responseStart – requestStart                          | TTFB是发出页面请求到接收到应答数据第一个字节所花费的毫秒数                                                |
| response         | 响应数据传输耗时                     | responseEnd – responseStart                           | 观察网络是否正常                                                                                          |
| dom              | DOM解析耗时                          | domInteractive – responseEnd                          | 观察DOM结构是否合理，是否有JS阻塞页面解析                                                                 |
| dcl              | DOMContentLoaded 事件耗时            | domContentLoadedEventEnd – domContentLoadedEventStart | 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载 |
| resources        | 资源加载耗时                         | domComplete – domContentLoadedEventEnd                | 可观察文档流是否过大                                                                                      |
| domReady         | DOM阶段渲染耗时                      | domContentLoadedEventEnd – fetchStart                 | DOM树和页面资源加载完成时间，会触发 `domContentLoaded`事件                                              |
| 首次渲染耗时     | 首次渲染耗时                         | responseEnd-fetchStart                                 | 加载文档到看到第一帧非空图像的时间，也叫白屏时间                                                          |
| 首次可交互时间   | 首次可交互时间                       | domInteractive-fetchStart                              | DOM树解析完成时间，此时document.readyState为interactive                                                   |
| 首包时间耗时     | 首包时间                             | responseStart-domainLookupStart                        | DNS解析到响应返回给浏览器第一个字节的时间                                                                 |
| 页面完全加载时间 | 页面完全加载时间                     | loadEventStart - fetchStart                            | \-                                                                                                        |
| onLoad           | onLoad事件耗时                       | loadEventEnd – loadEventStart                         |                                                                                                           |

![renderscope3](https://zhufeng-2021-doc.vercel.app/imgProxy/renderscope3.jpg)

![browerrender](https://zhufeng-2021-doc.vercel.app/imgProxy/browerrender.jpg)

#### 4.5.3 数据结构 [#](#t464.5.3 数据结构)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364183",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "timing",
  "connectTime": "0",
  "ttfbTime": "1",
  "responseTime": "1",
  "parseDOMTime": "80",
  "domContentLoadedTime": "0",
  "timeToInteractive": "88",
  "loadTime": "89"
}
```

#### 4.5.4 实现 [#](#t474.5.4 实现)

##### 1\. src\\index.html [#](#t481. src\index.html)

src\\index.html

```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body>
    <div id="container">
        <div class="content" style="width:600px;word-wrap:break-word;">

        </div>
    </div>

    <script>
        let content = document.getElementsByClassName('content')[0];
        //content.innerHTML = '@'.repeat(10000);
        document.addEventListener('DOMContentLoaded', function () {
+            let start = Date.now();
+            while ((Date.now() - start) < 1000) {}
+        });
    </script>
</body>

</html>
```

##### 2\. monitor\\index.js [#](#t492. monitor\index.js)

src\\monitor\\index.js

```diff
import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { blankScreen } from './lib/blankScreen';
+import { timing } from './lib/timing';
injectJsError();
injectXHR();
blankScreen();
+timing();
```

##### 3\. timing.js [#](#t503. timing.js)

src\\monitor\\lib\\timing.js

```js
import onload from '../util/onload';
import tracker from '../util/tracker';
import formatTime from '../util/formatTime';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
export function timing() {
    onload(function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart } = performance.timing;
            tracker.send({
                kind: 'experience',
                type: 'timing',
                connectTime: connectEnd - connectStart,//TCP连接耗时
                ttfbTime: responseStart - requestStart,//ttfb
                responseTime: responseEnd - responseStart,//Response响应耗时
                parseDOMTime: loadEventStart - domLoading,//DOM解析渲染耗时
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,//DOMContentLoaded事件回调耗时
                timeToInteractive: domInteractive - fetchStart,//首次可交互时间
                loadTime: loadEventStart - fetchStart//完整的加载时间
            });

        }, 3000);
    });
}
```

### 4.6 性能指标 [#](#t514.6 性能指标)

+ [PerformanceObserver.observe](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)方法用于观察传入的参数中指定的性能条目类型的集合。当记录一个指定类型的性能条目时，性能监测对象的回调函数将会被调用
+ [entryType](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType)
+ [paint-timing](https://w3c.github.io/paint-timing/)
+ [event-timing](https://wicg.github.io/event-timing/)
+ [LCP](https://wicg.github.io/largest-contentful-paint/)
+ [FMP](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)
+ [time-to-interactive](https://github.com/WICG/time-to-interactive)

| 字段 | 描述                                     | 备注                                                                                                         | 计算方式 |
| ---- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| FP   | First Paint(首次绘制)                    | 包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻                                               |          |
| FCP  | First Content Paint(首次内容绘制)        | 是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG等,这其实就是白屏时间                             |          |
| FMP  | First Meaningful Paint(首次有意义绘制)   | 页面有意义的内容渲染的时间                                                                                   |          |
| LCP  | (Largest Contentful Paint)(最大内容渲染) | 代表在viewport中最大的页面元素加载的时间                                                                     |          |
| DCL  | (DomContentLoaded)(DOM加载完成)          | 当 HTML 文档被完全加载和解析完成之后,`DOMContentLoaded` 事件被触发，无需等待样式表、图像和子框架的完成加载 |          |
| L    | (onLoad)                                 | 当依赖的资源全部加载完毕之后才会触发                                                                         |          |
| TTI  | (Time to Interactive) 可交互时间         | 用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点                                                       |          |
| FID  | First Input Delay(首次输入延迟)          | 用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间                                                 |          |

![baidurender](https://zhufeng-2021-doc.vercel.app/imgProxy/baidurender.png)

![lcp](https://zhufeng-2021-doc.vercel.app/imgProxy/lcp.jpg)

#### 4.6.1 数据结构设计 [#](#t524.6.1 数据结构设计)

##### 1\. paint [#](#t531. paint)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364186",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "paint",
  "firstPaint": "102",
  "firstContentPaint": "2130",
  "firstMeaningfulPaint": "2130",
  "largestContentfulPaint": "2130"
}
```

##### 2\. firstInputDelay [#](#t542. firstInputDelay)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828477284",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "firstInputDelay",
  "inputDelay": "3",
  "duration": "8",
  "startTime": "4812.344999983907",
  "selector": "HTML BODY #container .content H1"
}
```

#### 4.6.2 实现 [#](#t554.6.2  实现)

##### 1\. src\\index.html [#](#t561. src\index.html)

src\\index.html

```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body style="background-color: green;">
    <div id="container">
        <div class="content" style="width:600px;height:600px;word-wrap:break-word;">
            <input />
        </div>
    </div>

    <script>
        let content = document.getElementsByClassName('content')[0];
        //content.innerHTML = '@'.repeat(10000);
+        setTimeout(() => {
+            let h1 = document.createElement('h1');
+            h1.innerHTML = '我是最有重要的内容';
+            h1.setAttribute('elementtiming', 'meaningful');
+            content.appendChild(h1);
+        }, 2000);
    </script>
</body>

</html>
```

##### 2\. timing.js [#](#t572. timing.js)

src\\monitor\\lib\\timing.js

```diff
import onload from '../util/onload';
import tracker from '../util/tracker';
import formatTime from '../util/formatTime';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
export function timing() {
+    let FMP, LCP;
+    new PerformanceObserver((entryList, observer) => {
+        let perfEntries = entryList.getEntries();
+        FMP = perfEntries[0];
+        observer.disconnect();
+    }).observe({ entryTypes: ['element'] });

+    new PerformanceObserver((entryList, observer) => {
+        const perfEntries = entryList.getEntries();
+        const lastEntry = perfEntries[perfEntries.length - 1];
+        LCP = lastEntry;
+        observer.disconnect();
+    }).observe({ entryTypes: ['largest-contentful-paint'] });

+    new PerformanceObserver(function (entryList, observer) {
+        let lastEvent = getLastEvent();
+        const firstInput = entryList.getEntries()[0];
+        if (firstInput) {
+            let inputDelay = firstInput.processingStart - firstInput.startTime;//处理延迟
+            let duration = firstInput.duration;//处理耗时
+            if (firstInput > 0 || duration > 0) {
+                tracker.send({
+                    kind: 'experience',
+                    type: 'firstInputDelay',
+                    inputDelay: inputDelay ? formatTime(inputDelay) : 0,
+                    duration: duration ? formatTime(duration) : 0,
+                    startTime: firstInput.startTime,
+                    selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
+                });
+            }
+        }
+        observer.disconnect();
+    }).observe({ type: 'first-input', buffered: true });


    onload(function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart } = performance.timing;
            tracker.send({
                kind: 'experience',
                type: 'timing',
                connectTime: connectEnd - connectStart,//TCP连接耗时
                ttfbTime: responseStart - requestStart,//ttfb
                responseTime: responseEnd - responseStart,//Response响应耗时
                parseDOMTime: loadEventStart - domLoading,//DOM解析渲染耗时
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,//DOMContentLoaded事件回调耗时
                timeToInteractive: domInteractive - fetchStart,//首次可交互时间
                loadTime: loadEventStart - fetchStart//完整的加载时间
            });
+            const FP = performance.getEntriesByName('first-paint')[0];
+            const FCP = performance.getEntriesByName('first-contentful-paint')[0];
+            console.log('FP', FP);
+            console.log('FCP', FCP);
+            console.log('FMP', FMP);
+            console.log('LCP', LCP);
+            tracker.send({
+                kind: 'experience',
+                type: 'paint',
+                firstPaint: FP ? formatTime(FP.startTime) : 0,
+                firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
+                firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
+                largestContentfulPaint: LCP ? formatTime(LCP.renderTime || LCP.loadTime) : 0
+            });
        }, 3000);
    });
}
```

### 4.7 卡顿 [#](#t584.7 卡顿)

+ 响应用户交互的响应时间如果大于100ms,用户就会感觉卡顿

#### 4.7.1 数据设计 [#](#t594.7.1 数据设计)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828656781",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "longTask",
  "eventType": "mouseover",
  "startTime": "9331",
  "duration": "200",
  "selector": "HTML BODY #container .content"
}
```

#### 4.7.2 实现 [#](#t604.7.2 实现)

##### 1\. src\\index.html [#](#t611.  src\index.html)

src\\index.html

```diff
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body style="background-color: green;">
    <div id="container">
        <div class="content" style="width:600px;height:600px;word-wrap:break-word;">
+            <button id="longTaskBtn">执行longTask</button>
        </div>
    </div>

    <script>
        let content = document.getElementsByClassName('content')[0];
+        let longTaskBtn = document.getElementById('longTaskBtn');
+        longTaskBtn.addEventListener('click', longTask);
+        function longTask() {
+            let start = Date.now();
+            console.log('longTask开始 start', start);
+            while (Date.now() < (200 + start)) { }
+            console.log('longTask结束 end', (Date.now() - start));
+        }
    </script>
</body>

</html>
```

##### 2\. monitor\\index.js [#](#t622. monitor\index.js)

src\\monitor\\index.js

```diff
import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { blankScreen } from './lib/blankScreen';
import { timing } from './lib/timing';
+import { longTask } from './lib/longTask';
injectJsError();
injectXHR();
blankScreen();
timing();
+longTask();
```

##### 3\. longTask.js [#](#t633. longTask.js)

src\\monitor\\lib\\longTask.js

```js
import tracker from '../util/tracker';
import formatTime from '../util/formatTime';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
export function longTask() {
    new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
            if (entry.duration > 100) {
                let lastEvent = getLastEvent();
                requestIdleCallback(() => {
                    tracker.send({
                        kind: 'experience',
                        type: 'longTask',
                        eventType: lastEvent.type,
                        startTime: formatTime(entry.startTime),// 开始时间
                        duration: formatTime(entry.duration),// 持续时间
                        selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
                    });
                });
            }
        });
    }).observe({ entryTypes: ["longtask"] });
}
```

### 4.8 pv [#](#t644.8 pv)

+ [netinfo](http://wicg.github.io/netinfo)
+ RTT(Round Trip Time)一个连接的往返时间，即数据发送时刻到接收到确认的时刻的差值
+ [navigator.sendBeacon()](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon) 方法可用于通过HTTP将少量数据异步传输到Web服务器。

![rtttime2](https://zhufeng-2021-doc.vercel.app/imgProxy/rtttime2.jpg)

#### 4.8.1 数据结构 [#](#t654.8.1 数据结构)

```auto
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590829304423",
  "userAgent": "chrome",
  "kind": "business",
  "type": "pv",
  "effectiveType": "4g",
  "rtt": "50",
  "screen": "2049x1152"
}
```

#### 4.8.2 实现 [#](#t664.8.2 实现)

##### 1\. src\\index.html [#](#t671. src\index.html)

src\\index.html

```diff
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>前端监控SDK</title>
</head>
```

##### 2\. src\\monitor\\index.js [#](#t682. src\monitor\index.js)

src\\monitor\\index.js

```diff
import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { blankScreen } from './lib/blankScreen';
import { timing } from './lib/timing';
import { longTask } from './lib/longTask';
+import { pv } from './lib/pv';
injectJsError();
injectXHR();
blankScreen();
timing();
longTask();
+pv();
```

##### 3\. pv.js [#](#t693. pv.js)

src\\monitor\\lib\\pv.js

```js
import tracker from '../util/tracker';
export function pv() {
    var connection = navigator.connection;
    tracker.send({
        kind: 'business',
        type: 'pv',
        effectiveType: connection.effectiveType, //网络环境
        rtt: connection.rtt,//往返时间
        screen: `${window.screen.width}x${window.screen.height}`//设备分辨率
    });
    let startTime = Date.now();
    window.addEventListener('unload', () => {
        let stayTime = Date.now() - startTime;
        tracker.send({
            kind: 'business',
            type: 'stayTime',
            stayTime
        });
    }, false);

}
```

## 5.查询报表 [#](#t705.查询报表)

+ [图表说明](https://help.aliyun.com/document_detail/69313.html)
+ 查询日志数据
+ 聚类分析
+ 数据可视化
  + 趋势 柱状图、拆线图、曲线图
  + 比例 饼图、环状图、面积图
+ 仪表盘

### 5.1 监控项分布 [#](#t715.1 监控项分布)

```js
* | SELECT type, COUNT(*) as number GROUP BY type LIMIT 10
```

### 5.2 浏览器分布 [#](#t725.2 浏览器分布)

```js
* | SELECT userAgent, COUNT(*) as number GROUP BY userAgent LIMIT 10
```

### 5.3 页面分辨率分布 [#](#t735.3 页面分辨率分布)

```js
* | SELECT screen, COUNT(*) as number GROUP BY screen LIMIT 10
```

## 6.参考 [#](#t746.参考)

### 6.1 第三方 [#](#t756.1 第三方)

#### 6.1.1 商业产品 [#](#t766.1.1 商业产品)

+ [神策数据](https://www.sensorsdata.cn/)
+ [GrowingIO](https://www.growingio.com/)

#### 6.1.2 开源产品 [#](#t776.1.2 开源产品)

+ [fundebug](https://www.fundebug.com/)
+ [BetterJS](https://github.com/BetterJS/doc)
+ [Sentry](https://sentry.io/)
+ [@sentry/browser](https://sentry.io/onboarding/zhufeng/get-started/)

### 6.2 defer 和 async [#](#t786.2 defer 和 async)

+ defer异步下载JavaScript文件,会在HTML解析完成之后 `DOMContentLoaded`事件调用前执行,不会阻塞页面渲染
  + 如果script标签设置了该属性，则浏览器会异步的下载该文件并且不会影响到后续DOM的渲染
  + 如果有多个设置了defer的script标签存在，则会按照顺序执行所有的script
  + defer脚本会在文档渲染完毕后，`DOMContentLoaded`事件调用前执行
+ async异步下载JavaScript文件，下载完成之后会立即执行，有可能会阻塞页面渲染
  + async的设置,会使得script脚本异步的加载并在允许的情况下执行
  + async的执行,并不会按着script在页面中的顺序来执行，而是谁先加载完谁执行
## 1.安装 [#](#t01.安装)

### 1.1.安装mysql [#](#t11.1.安装mysql)

+   [mysql](https://dev.mysql.com/downloads/mysql/)

### 1.2.安装redis [#](#t21.2.安装redis)

+   [redis](https://redis.io/)

### 1.3.安装nginx [#](#t31.3.安装nginx)

+   [nginx](http://nginx.org/en/download.html)

## 2\. 配置nginx [#](#t42. 配置nginx)

### 2.1 nginx.conf [#](#t52.1 nginx.conf)

```js
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main '$time_iso8601    -    -    $remote_addr    $http_host    $status    $request_time    $request_length    $body_bytes_sent    15d04347-be16-b9ab-0029-24e4b6645950    -    -    9689c3ea-5155-2df7-a719-e90d2dedeb2c 937ba755-116a-18e6-0735-312cba23b00c    -    -    $request_uri    $http_user_agent    -    sample=-&_UC_agent=-&device_id=-&-    -    -    -';
    access_log  logs/access.log  main;
    server {
        listen       80;
        server_name  localhost;
        if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})") {
         set $year $1;
         set $month $2;
         set $day $3;
         set $hour $4;
         set $minute $5;
        }
        access_log  logs/$year$month-$day-$hour-$minute.log  main;
        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

| 字段 | 含义 |
| --- | --- |
| $time\_iso8601 | 服务器时间的ISO 8610格式 |
| $remote\_addr | 客户端地址 |
| $http\_host | 主机名 |
| $status | HTTP响应代码 |
| $request\_time | 处理客户端请求使用的时间 |
| $request\_length | 请求的长度 |
| $body\_bytes\_sent | 传输给客户端的字节数 |
| $request\_uri | 包含一些客户端请求参数的原始URI |
| $http\_user\_agent | 客户端用户代理 |

## 3\. 下载项目 [#](#t63. 下载项目)

```js
git clone https://gitee.com/zhufengpeixun/monitor.git
```

## 4.埋点上报 [#](#t74.埋点上报)

### 4.1 安装 [#](#t84.1 安装)

```js
cd monitor/sdk
cnpm install
```

### 4.2 配置 [#](#t94.2 配置)

```js
window.dt && dt.set({
  pid: 'template', // [必填]项目id,
  uuid: 'uuid', // [可选]设备唯一id, 用于计算uv数&设备分布. 一般在cookie中可以取到, 没有uuid可用设备macidfa/imei替代. 或者在storage的key中存入随机数字, 模拟设备唯一id.
  ucid: 'ucid', // [可选]用户ucid, 用于发生异常时追踪用户信息, 一般在cookie中可以取到, 没有可传空字符串
  is_test: true, // 是否为测试数据, 默认为false(测试模式下打点数据仅供浏览, 不会展示在系统中)
  record: {
    time_on_page: true, // 是否监控用户在线时长数据, 默认为true
    performance: true, // 是否监控页面载入性能, 默认为true
    js_error: true, //  是否监控页面报错信息, 默认为true
    // 配置需要监控的页面报错类别, 仅在js_error为true时生效, 默认均为true(可以将配置改为false, 以屏蔽不需要报的错误类别)
    js_error_report_config: {
      ERROR_RUNTIME: true, // js运行时报错
      ERROR_SCRIPT: true, // js资源加载失败
      ERROR_STYLE: true, // css资源加载失败
      ERROR_IMAGE: true, // 图片资源加载失败
      ERROR_AUDIO: true, // 音频资源加载失败
      ERROR_VIDEO: true, // 视频资源加载失败
      ERROR_CONSOLE: true, // vue运行时报错
      ERROR_TRY_CATCH: true, // 未catch错误
      // 自定义检测函数, 上报前最后判断是否需要报告该错误
      // 回调函数说明
      // 传入参数 => 
      //            desc:  字符串, 错误描述
      //            stack: 字符串, 错误堆栈信息
      // 返回值 =>  
      //            true  : 上报打点请求
      //            false : 不需要上报
      checkErrrorNeedReport: function(desc, stack){
        return true
      }
    }
  },
  // 业务方的js版本号, 会随着打点数据一起上传, 方便区分数据来源
  // 可以不填, 默认为1.0.0
  version: '1.0.0',
  // test.com/detail/1.html
  // test.com/detail/2.html
  // test.com/detail/3.html
  // 这种页面来说, 虽然url不同, 但他们本质上是同一个页面
  // 因此需要业务方传入一个处理函数, 根据当前url解析出真实的页面类型
  getPageType: function(location){ return `${location.host}${location.pathname}` }
})
```

### 4.3 监控类型 [#](#t104.3 监控类型)

#### 4.3.1 time\_on\_page(用户在线时长统计) [#](#t114.3.1 time_on_page(用户在线时长统计))

+   t\_r\_duration\_distribution

```js
// 用户在线时长统计
const OFFLINE_MILL = 15 * 60 * 1000 // 15分钟不操作认为不在线
const SEND_MILL = 5 * 1000 // 每5s打点一次

let lastTime = Date.now()
window.addEventListener('click', () => {
  // 检查是否监控用户在线时长
  const isTimeOnPageFlagOn = _.get(
    commonConfig,
    ['record', 'time_on_page'],
    _.get(DEFAULT_CONFIG, ['record', 'time_on_page'])
  )
  const isOldTimeOnPageFlagOn = _.get(commonConfig, ['online'], false)
  const needRecordTimeOnPage = isTimeOnPageFlagOn || isOldTimeOnPageFlagOn
  if (needRecordTimeOnPage === false) {
    debugLogger(`config.record.time_on_page值为false, 跳过停留时长打点`)
    return
  }

  const now = Date.now();
  const duration = now - lastTime;
  if (duration > OFFLINE_MILL) {
    lastTime = Date.now()
  } else if (duration > SEND_MILL) {
    lastTime = Date.now()
    debugLogger('发送用户留存时间埋点, 埋点内容 => ', { duration_ms: duration })
    // 用户在线时长
    log.product(10001, { duration_ms: duration });
  }
}, false)
```

```auto
{
    "d": {
        "type": "product",
        "code": 10001,
        "detail": {
            "duration_ms": 21553
        },
        "extra": {}
    }
}
```

#### 4.3.2 performance(页面载入性能) [#](#t124.3.2 performance(页面载入性能))

![renderscope3](https://zhufeng-2021-doc.vercel.app/imgProxy/renderscope3.jpg)

#### 4.3.2.1 sdk\\src\\index.js [#](#t134.3.2.1 sdk\src\index.js)

sdk\\src\\index.js

```js
window.onload = () => {
  // 检查是否监控性能指标
  const isPerformanceFlagOn = _.get(
    commonConfig,
    ['record', 'performance'],
    _.get(DEFAULT_CONFIG, ['record', 'performance'])
  )
  const isOldPerformanceFlagOn = _.get(commonConfig, ['performance'], false)
  const needRecordPerformance = isPerformanceFlagOn || isOldPerformanceFlagOn
  if (needRecordPerformance === false) {
    debugLogger(`config.record.performance值为false, 跳过性能指标打点`)
    return
  }

  const performance = window.performance
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口')
    return
  }
  const times = performance.timing.toJSON()

  debugLogger('发送页面性能指标数据, 上报内容 => ', {
    ...times,
    url: `${window.location.host}${window.location.pathname}`
  })

  log('perf', 20001, {
    ...times,
    url: `${window.location.host}${window.location.pathname}`
  })
}
```

```auto
{
    "d": {
        "type": "perf",
        "code": 20001,
        "detail": {
            "connectStart": 1592020165386,
            "navigationStart": 1592020165383,
            "loadEventEnd": 0,
            "domLoading": 1592020165401,
            "secureConnectionStart": 0,
            "fetchStart": 1592020165386,
            "domContentLoadedEventStart": 1592020165630,
            "responseStart": 1592020165393,
            "responseEnd": 1592020165394,
            "domInteractive": 1592020165630,
            "domainLookupEnd": 1592020165386,
            "redirectStart": 0,
            "requestStart": 1592020165387,
            "unloadEventEnd": 1592020165398,
            "unloadEventStart": 1592020165397,
            "domComplete": 1592020165630,
            "domainLookupStart": 1592020165386,
            "loadEventStart": 1592020165630,
            "domContentLoadedEventEnd": 1592020165630,
            "redirectEnd": 0,
            "connectEnd": 1592020165386,
            "url": "localhost:9000/"
        },
        "extra": {}
    }
}
```

#### 4.3.3 js\_error(页面报错) [#](#t144.3.3 js_error(页面报错))

| 错误类型 | 含义 |
| --- | --- |
| ERROR\_RUNTIME | js运行时报错 |
| ERROR\_SCRIPT | js资源加载失败 |
| ERROR\_IMAGE | 图片资源加载失败 |
| ERROR\_AUDIO | 音频资源加载失败 |
| ERROR\_VIDEO | 视频资源加载失败 |
| ERROR\_CONSOLE | vue运行时报错 |
| ERROR\_TRY\_CATCH | 未catch错误 |

##### 4.3.3.1 ERROR\_RUNTIME [#](#t154.3.3.1 ERROR_RUNTIME)

```js
window.addEventListener('error', function (event) {
    // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
    var errorTarget = event.target
    if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
      handleError(formatLoadError(errorTarget))
    } else {
      // onerror会被覆盖, 因此转为使用Listener进行监控
      let { message, filename, lineno, colno, error } = event
      handleError(formatRuntimerError(message, filename, lineno, colno, error))
    }
}, true)

function formatRuntimerError (message, source, lineno, colno, error) {
  return {
    type: ERROR_RUNTIME,
    desc: message + ' at ' + source + ':' + lineno + ':' + colno,
    stack: error && error.stack ? error.stack : 'no stack' 
  }
}
```

```js
console.log(a.b);
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_JS_RUNTIME_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "Uncaught ReferenceError: a is not defined at http://localhost:9000/:53:21",
            "stack": "ReferenceError: a is not defined\n    at http://localhost:9000/:53:21"
        }
    }
}
```

##### 4.3.3.2 LOAD\_ERROR [#](#t164.3.3.2 LOAD_ERROR)

```html
      <script src="/error.js"></script>
      <link rel="stylesheet" href="/error.css">
      <img src="/error.gif" alt="">
      <audio src="/error.mp3"></audio>
      <video src="/error.mp4"></video>
```

```js
function formatLoadError (errorTarget) {
  return {
    type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
    desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
    stack: 'no stack'
  }
}
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_SCRIPT_LOAD_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "http://localhost:9000/@http://localhost:9000/error.js",
            "stack": "no stack"
        }
    }
}
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_CSS_LOAD_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "http://localhost:9000/@http://localhost:9000/error.css",
            "stack": "no stack"
        }
    }
}
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_IMAGE_LOAD_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "http://localhost:9000/@http://localhost:9000/error.gif",
            "stack": "no stack"
        }
    }
}
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_VIDEO_LOAD_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "http://localhost:9000/@http://localhost:9000/error.mp4",
            "stack": "no stack"
        }
    }
}
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_AUDIO_LOAD_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "http://localhost:9000/@http://localhost:9000/error.mp3",
            "stack": "no stack"
        }
    }
}
```

##### 4.3.3.2 LOAD\_ERROR [#](#t174.3.3.2 LOAD_ERROR)

```js
 console.error('vue error');
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_CONSOLE_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "vue error"
        }
    }
}
```

##### 4.3.3.3 ERROR\_TRY\_CATCH [#](#t184.3.3.3 ERROR_TRY_CATCH)

```js
function exec(){
    throw new Error('未捕获错误');
}
window.dt.tryJS.wrap(exec);
exec._wrapped();
```

```auto
{
    "d": {
        "type": "error",
        "code": 7,
        "detail": {
            "error_no": "页面报错_TRY_CATCH_ERROR",
            "url": "localhost:9000/"
        },
        "extra": {
            "desc": "未捕获错误",
            "stack": "Error: 未捕获错误\n    at Function.exec (http://localhost:9000/:56:17)\n    at Function.func._wrapped (webpack-internal:///./src/js-tracker/try.js:31:21)\n    at http://localhost:9000/:59:14"
        }
    }
}
```

#### 4.3.4 手工上报 [#](#t194.3.4 手工上报)

```js
//错误上报
export const Elog = log.error = (code, detail, extra) => {
  return log('error', code, detail, extra)
}
//产品数据上报
export const Plog = log.product = (code, detail, extra) => {
  return log('product', code, detail, extra)
}
//普通信息上报
export const Ilog = log.info = (code, detail, extra) => {
  return log('info', code, detail, extra)
}
```

```js
window.dt.product(19999, {}, {})
```

```auto
{
    "d": {
        "type": "product",
        "code": 19999,
        "detail": {},
        "extra": {}
    }
}
```

## 5.数据处理 [#](#t205.数据处理)

### 5.1 安装server [#](#t215.1 安装server)

```js
cd server 
npm install
```

### 5.2 配置 [#](#t225.2 配置)

#### 5.2.1 配置mysql [#](#t235.2.1 配置mysql)

server\\src\\configs\\mysql.js

```js
const development = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '5f8b8a5d650637f8',
  database: 'platform'
}
```

#### 5.2.2 配置redis [#](#t245.2.2  配置redis)

server\\src\\configs\\redis.js

```js
const development = {
  host: '127.0.0.1',
  port: '6379'
}
```

### 5.3 数据解析 [#](#t255.3 数据解析)

### 5.3.1 数据存储 [#](#t265.3.1 数据存储)

### 5.3.1.1 表名说明 [#](#t275.3.1.1 表名说明)

+   所有表都以`t_`开头
+   原始表添加`_o`后缀，即`t_o_`
+   结果表添加`-r`后续，即`t_r_`
+   表名、字段名默认使用下划线方式命名，不区分大小写
+   数据库编码字符集为`utf8mb4`
+   记录ID用`unsigned bigint`
+   如果字段名有关键字，需要加`_c`前缀
+   所有表中必须有`update_time` 和`create_time`字段

### 5.3.1.2 数据库表 [#](#t285.3.1.2 数据库表)

t\_o\_project 项目名

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '项目id' |  |
| `display_name` varchar(50) NOT NULL DEFAULT '' COMMENT '项目名称' |  |
| `project_name` varchar(50) NOT NULL DEFAULT '' COMMENT '项目代号(替代项目id, 方便debug)' |  |
| `c_desc` varchar(100) NOT NULL DEFAULT '' COMMENT '备注信息' |  |
| `rate` int(10) NOT NULL DEFAULT '10000' COMMENT '数据抽样比率' |  |
| `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已删除(1 => 是, 0 => 否)' |  |
| `create_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '创建人ucid' |  |
| `update_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '更新人ucid' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_behavior\_distribution

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `code` varchar(50) NOT NULL DEFAULT '' COMMENT '用户行为标识' |  |
| `name` varchar(50) NOT NULL DEFAULT '' COMMENT '用户点击名称' |  |
| `url` varchar(200) NOT NULL DEFAULT '' COMMENT '用户点击页面' |  |
| `total_count` int(10) NOT NULL DEFAULT '0' COMMENT '点击总量' |  |
| `count_at_time` varchar(30) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有三种可能, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(20) NOT NULL DEFAULT 'day' COMMENT '统计尺度(hour/day/month)' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布详情记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_duration\_distribution 用户停留时间表

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `total_stay_ms` bigint(20) NOT NULL DEFAULT '0' COMMENT '总停留毫秒数' |  |
| `total_uv` int(10) NOT NULL DEFAULT '0' COMMENT '总uv数(从uv表中获取)' |  |
| `count_at_time` varchar(30) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有两种可能, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(20) NOT NULL DEFAULT 'day' COMMENT '统计尺度(day/month)' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布详情记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_http\_error\_distribution

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `total_count` int(10) NOT NULL DEFAULT '0' COMMENT 'http响应码总数' |  |
| `http_code_2xx_count` int(10) NOT NULL DEFAULT '0' COMMENT 'http响应码2xx总数' |  |
| `http_code_3xx_count` int(10) NOT NULL DEFAULT '0' COMMENT 'http响应码3xx总数' |  |
| `http_code_4xx_count` int(10) NOT NULL DEFAULT '0' COMMENT 'http响应码4xx总数' |  |
| `http_code_5xx_count` int(10) NOT NULL DEFAULT '0' COMMENT 'http响应码5xx总数' |  |
| `http_code_other_count` int(10) NOT NULL DEFAULT '0' COMMENT '其他http响应码总数' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布详情记录id' |  |
| `count_at_time` varchar(30) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有三种可能, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(20) NOT NULL DEFAULT 'hour' COMMENT '统计尺度(hour/day/month)' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |

t\_r\_page\_view

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `total_count` int(10) NOT NULL DEFAULT '0' COMMENT 'pv数' |  |
| `count_at_time` varchar(30) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有三种可能, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(20) NOT NULL DEFAULT 'hour' COMMENT '统计尺度(hour/day/month)' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_system\_browser

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `browser` varchar(20) NOT NULL DEFAULT '' COMMENT '浏览器品牌' |  |
| `browser_version` varchar(50) NOT NULL DEFAULT '' COMMENT '浏览器详情' |  |
| `total_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `count_at_month` varchar(15) NOT NULL DEFAULT '' COMMENT '统计时间段, YYYY-MM格式 => 2018-09' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_system\_runtime\_version

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `runtime_version` varchar(50) NOT NULL DEFAULT '' COMMENT '应用版本号' |  |
| `total_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `count_at_month` varchar(15) NOT NULL DEFAULT '' COMMENT '统计时间段, YYYY-MM格式 => 2018-09' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_system\_device

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `device_vendor` varchar(50) NOT NULL DEFAULT '' COMMENT '设备制造商' |  |
| `device_model` varchar(50) NOT NULL DEFAULT '' COMMENT '设备详情' |  |
| `total_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `count_at_month` varchar(15) NOT NULL DEFAULT '' COMMENT '统计时间段, YYYY-MM格式 => 2018-09' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_system\_os

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `os` varchar(50) NOT NULL DEFAULT '' COMMENT '操作系统名' |  |
| `os_version` varchar(50) NOT NULL DEFAULT '' COMMENT '操作系统版本' |  |
| `total_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `count_at_month` varchar(15) NOT NULL DEFAULT '' COMMENT '统计时间段, YYYY-MM格式 => 2018-09' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_unique\_view

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `total_count` int(10) NOT NULL DEFAULT '0' COMMENT 'uv数' |  |
| `count_at_time` varchar(30) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有三种可能, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(20) NOT NULL DEFAULT 'hour' COMMENT '统计尺度(hour/day/month)' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_o\_alarm\_config

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT |  |
| `project_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '要报警项目id' |  |
| `owner_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '项目所有人id' |  |
| `error_type` varchar(20) NOT NULL DEFAULT '' COMMENT '报警错误类型' |  |
| `error_name` varchar(255) NOT NULL DEFAULT '' COMMENT '要报警错误名字' |  |
| `time_range_s` int(20) unsigned NOT NULL DEFAULT '0' COMMENT '报警时间范围\_秒' |  |
| `max_error_count` int(20) unsigned NOT NULL DEFAULT '0' COMMENT '报警错误数阈值' |  |
| `alarm_interval_s` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '报警时间间隔\_秒' |  |
| `is_enable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启本条报警配置1：是0：否' |  |
| `note` varchar(255) NOT NULL DEFAULT '' COMMENT '配置说明' |  |
| `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除(1 => 是, 0 => 否)' |  |
| `create_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '创建此记录的人' |  |
| `update_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '更新此记录的人' |  |
| `create_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '创建此记录的时间' |  |
| `update_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新此记录的时间' |

t\_o\_user

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `ucid` varchar(50) NOT NULL DEFAULT '' COMMENT '贝壳ucid' |  |
| `account` varchar(50) NOT NULL DEFAULT '' COMMENT '账户名,不能重复' |  |
| `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱' |  |
| `password_md5` varchar(32) NOT NULL DEFAULT '' COMMENT 'md5后的password' |  |
| `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称' |  |
| `role` varchar(50) NOT NULL DEFAULT 'dev' COMMENT '角色(dev => 开发者,admin => 管理员)' |  |
| `register_type` varchar(20) NOT NULL DEFAULT 'site' COMMENT '注册类型(site => 网站注册, third => 第三方登录)' |  |
| `avatar_url` varchar(200) NOT NULL DEFAULT '[http://ww1.sinaimg.cn/large/00749HCsly1fwofq2t1kaj30qn0qnaai.jpg'](http://ww1.sinaimg.cn/large/00749HCsly1fwofq2t1kaj30qn0qnaai.jpg') COMMENT '头像地址, 默认使用贝壳logo' |  |
| `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号' |  |
| `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除(1 => 是, 0 => 否)' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_o\_project\_member

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT |  |
| `project_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '项目参与者ucid' |  |
| `role` varchar(20) NOT NULL DEFAULT '' COMMENT '参与者角色(owner => 组长, dev => 成员)' |  |
| `need_alarm` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否需要报警(0 => 不需要, 1 => 需要)' |  |
| `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否已删除(0 => 未删除, 1 => 已删除)' |  |
| `create_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '创建者ucid' |  |
| `update_ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '更新者ucid' |  |
| `create_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '创建此记录的时间' |  |
| `update_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新此记录的时间' |

t\_r\_new\_user\_summary

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '项目id' |  |
| `total_count` int(10) NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `count_at_time` varchar(20) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同三两种可能, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(10) NOT NULL DEFAULT 'day' COMMENT '统计尺度(hour/day/month)' |  |
| `city_distribute_id` bigint(10) NOT NULL DEFAULT 0 COMMENT '城市分布详情记录id' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '更新时间' |

t\_r\_alarm\_log

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `project_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '要报警项目id' |  |
| `config_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '报警配置id' |  |
| `send_at` bigint(20) NOT NULL DEFAULT '0' COMMENT '报警时间戳' |  |
| `error_type` varchar(20) NOT NULL DEFAULT '' COMMENT '错误类型' |  |
| `error_name` varchar(255) NOT NULL DEFAULT '' COMMENT '错误名字' |  |
| `message` varchar(500) NOT NULL DEFAULT '' COMMENT '报警信息' |  |
| `create_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间' |  |
| `update_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间' |

t\_o\_monitor\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `error_type` varchar(20) NOT NULL DEFAULT '' COMMENT '异常类型(目前是四种,分别对应前端的四种报错类型: api\_data =>前端数据结构报警, start\_process => 启动过程异常, load\_wv => Url加载空服务报警, api\_code => 请求接口异常报警)' |  |
| `error_name` varchar(255) NOT NULL DEFAULT '' COMMENT '错误名/错误代码,用于细分错误类别' |  |
| `http_code` int(10) NOT NULL DEFAULT '0' COMMENT 'http状态码, 没有则为0' |  |
| `monitor_ext_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '详情id' |  |
| `during_ms` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口请求时长, 单位毫秒' |  |
| `request_size_b` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口请求体积, 单位b' |  |
| `response_size_b` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '接口响应体积, 单位b' |  |
| `url` varchar(255) NOT NULL DEFAULT '' COMMENT '发生异常的url' |  |
| `country` varchar(10) NOT NULL DEFAULT '' COMMENT '所属国家' |  |
| `province` varchar(15) NOT NULL DEFAULT '' COMMENT '所属省份' |  |
| `city` varchar(15) NOT NULL DEFAULT '' COMMENT '所属城市' |  |
| `log_at` bigint(20) NOT NULL DEFAULT '0' COMMENT '日志记录时间' |  |
| `md5` char(32) NOT NULL DEFAULT '' COMMENT '记录生成MD5' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_o\_monitor\_ext\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `ext_json` text COMMENT '异常记录扩展信息' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_o\_uv\_record\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '项目id' |  |
| `uuid` varchar(50) NOT NULL DEFAULT '' COMMENT '设备唯一标识' |  |
| `country` varchar(10) NOT NULL DEFAULT '' COMMENT '所属国家' |  |
| `province` varchar(15) NOT NULL DEFAULT '' COMMENT '所属省份' |  |
| `city` varchar(15) NOT NULL DEFAULT '' COMMENT '所属城市' |  |
| `visit_at_hour` varchar(20) NOT NULL DEFAULT '' COMMENT '访问日期, 数据格式为 YYYY-MM-DD\_HH demo => 2018-08-02\_23' |  |
| `pv_count` int(10) NOT NULL DEFAULT '0' COMMENT '时间段内同一uuid访问次数, 用于计算总pv' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_city\_distribution\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `city_distribute_json` text COMMENT '扩展字段' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_r\_performance\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `sum_indicator_value` bigInt(10) NOT NULL DEFAULT '0' COMMENT '性能指标求和' |  |
| `pv` bigInt(10) NOT NULL DEFAULT '0' COMMENT '性能指标pv数,用于计算平均时长' |  |
| `indicator` varchar(50) NOT NULL DEFAULT '' COMMENT '性能指标:DNS响应时间/TCP时间/404数量/etc' |  |
| `url` varchar(255) NOT NULL DEFAULT '' COMMENT '页面url' |  |
| `city_distribute_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '城市分布详情记录id' |  |
| `count_at_time` varchar(20) NOT NULL DEFAULT '' COMMENT '统计日期,格式根据统计尺度不同有四种可能, minute => YYYY-MM-DD\_HH:mm, hour => YYYY-MM-DD\_HH, day => YYYY-MM-DD, month => YYYY-MM' |  |
| `count_type` varchar(10) NOT NULL DEFAULT 'minute' COMMENT '统计尺度(minute/hour/day/month)' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '更新时间' |

t\_o\_system\_collection\_1

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `uuid` varchar(50) NOT NULL DEFAULT '' COMMENT '设备唯一标识' |  |
| `browser` varchar(50) NOT NULL DEFAULT '' COMMENT '浏览器品牌' |  |
| `browser_version` varchar(100) NOT NULL DEFAULT '' COMMENT '浏览器版本详情' |  |
| `engine` varchar(100) NOT NULL DEFAULT '' COMMENT '内核名称' |  |
| `engine_version` varchar(100) NOT NULL DEFAULT '' COMMENT '内核版本详情' |  |
| `device_vendor` varchar(100) NOT NULL DEFAULT '' COMMENT '手机品牌' |  |
| `device_model` varchar(100) NOT NULL DEFAULT '' COMMENT '手机型号' |  |
| `os` varchar(50) NOT NULL DEFAULT '' COMMENT '操作系统' |  |
| `os_version` varchar(50) NOT NULL DEFAULT '' COMMENT '操作系统详情' |  |
| `country` varchar(10) NOT NULL DEFAULT '' COMMENT '所属国家' |  |
| `province` varchar(15) NOT NULL DEFAULT '' COMMENT '所属省份' |  |
| `city` varchar(15) NOT NULL DEFAULT '' COMMENT '所属城市' |  |
| `runtime_version` varchar(50) NOT NULL DEFAULT '' COMMENT '应用版本' |  |
| `visit_at_month` varchar(20) NOT NULL DEFAULT '' COMMENT '访问日期, 数据格式为 YYYY-MM demo => 2018-09' |  |
| `log_at` bigint(20) NOT NULL DEFAULT '0' COMMENT '日志记录时间' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '数据库更新时间' |

t\_o\_user\_first\_login\_at\_1

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `ucid` varchar(20) NOT NULL DEFAULT '' COMMENT '用户id' |  |
| `first_visit_at` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户首次访问时间' |  |
| `country` varchar(10) NOT NULL DEFAULT '' COMMENT '所属国家' |  |
| `province` varchar(15) NOT NULL DEFAULT '' COMMENT '所属省份' |  |
| `city` varchar(15) NOT NULL DEFAULT '' COMMENT '所属城市' |  |
| `create_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '创建时间' |  |
| `update_time` bigint(20) NOT NULL DEFAULT '0' COMMENT '更新时间' |

t\_r\_error\_summary\_1\_202005

| 字段 | 备注 |
| --- | --- |
| `id` bigint(20) unsigned NOT NULL AUTO\_INCREMENT COMMENT '记录id' |  |
| `error_type` varchar(20) NOT NULL DEFAULT '' COMMENT '错误类型' |  |
| `error_name` varchar(255) NOT NULL DEFAULT '' COMMENT '错误名字' |  |
| `url_path` varchar(255) NOT NULL DEFAULT '' COMMENT '错误URL\_PATH' |  |
| `city_distribution_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '城市分布详情id' |  |
| `count_at_time` varchar(20) NOT NULL DEFAULT '' COMMENT '统计时间(按类型不同,day:YYYY-MM-DD;hour:YYYY-MM-DD\_HH;minute:YYYY-MM-DD\_HH:mm)' |  |
| `count_type` varchar(10) NOT NULL DEFAULT 'day' COMMENT '统计类型(day天,hour小时,minute分)' |  |
| `error_count` int(10) NOT NULL DEFAULT '0' COMMENT '数量总和' |  |
| `create_time` int(20) NOT NULL DEFAULT '0' COMMENT '创建时间' |  |
| `update_time` int(20) NOT NULL DEFAULT '0' COMMENT '更新时间' |

### 5.3.2 指令 [#](#t295.3.2 指令)

#### 5.3.2.1 指令帮助 [#](#t305.3.2.1 指令帮助)

```js
node dist/fee.js -h
Usage:
  command [arguments] [options]

Global Options:
  --env                            Set NODE_ENV before running the commands
  --no-ansi                        Disable colored output

Available Commands:
 Command
  Command:Demo                     解析nginx日志, 分析pv
 CreateCache
  CreateCache:UpdatePerOneMinute   [每10分钟执行一次] 主动调用方法, 更新Redis缓存, 每10分钟更新一次
 Parse
  Parse:Device                     [按天] 解析nginx日志, 分析指定时间范围Device
  Parse:MenuClick                  [按天] 解析nginx日志, 用户点击情况
  Parse:Monitor                    [按分钟] 解析nginx日志, 分析Monitor
  Parse:Performance                [按小时] 解析nginx日志, 分析分钟级别的指定时间范围内的性能指标
  Parse:TimeOnSiteByHour           [按小时] 解析nginx日志, 分析记录指定时间范围内用户停留时长
  Parse:UV                         [按小时] 解析nginx日志, 分析记录指定时间范围内的uv
  Parse:UserFirstLoginAt           [按天] 解析nginx日志, 记录用户首次登陆时间
 SaveLog
  SaveLog:Nginx                    每一分钟读取Nginx日志文件，并解析
 Summary
  Summary:Error                    [按分钟/按小时/按天] 根据历史数据, 汇总分析错误数
  Summary:HttpError                [按天/按月] 基于数据表做统计, 统计http error分布情况
  Summary:NewUser                  [按小时/按天/按月] 根据历史数据, 汇总分析记录指定时间范围内的新增用户数
  Summary:Performance              [按小时/按天/按月] 根据历史数据, 汇总分析记录指定时间范围内的性能指标数据
  Summary:SystemBrowser            [按月] 基于数据库统计浏览器占比
  Summary:SystemDevice             [按月] 基于数据库统计设备占比
  Summary:SystemOS                 [按月]基于数据库统计操作系统占比
  Summary:SystemRuntimeVersion     [按月] 基于数据库统计浏览器占比
  Summary:TimeOnSite               [按天/按月] 根据历史数据, 汇总分析记录指定时间范围内用户停留时长
  Summary:UV                       [按小时/按天/按月] 根据历史数据, 汇总分析记录指定时间范围内的uv
 Task
  Task:Manager                     任务调度主进程, 只能启动一次
 Utils
  Utils:CleanOldLog                只保留当前月内数据, 每月20号之后自动删除上个月数据
  Utils:GenerateSQL                生成项目在指定日期范围内的建表SQL
  Utils:TemplateSQL                生成项目在指定日期范围内的建表SQL
  Utils:Test                       专业粘贴调试代码
  Utils:TestUC                     测试UC接口
 WatchDog
  WatchDog:Alarm                   [根据报警配置] 监测每一条报警配置对应的项目错误
  WatchDog:Saas                    [按分钟] 检查最近5分钟内错误数是否超出阈值, 自动报警
```

#### 5.3.2.2 初始化数据库 [#](#t315.3.2.2 初始化数据库)

+   创建`platform`数据库
+   `npm run watch`
+   `node dist/fee.js Utils:GenerateSQL 1 '2020-06' '2020-06' > init.sql`

```js
//id, 抽样比率, 项目名(展示), 项目id, 负责人信息
REPLACE INTO `t_o_project` (`id`, `rate`, `display_name`, `project_name`, `c_desc`, `is_delete`, `create_ucid`, `update_ucid`, `create_time`, `update_time`) VALUES (1, 100, '示例项目', 'template', '负责人', 0, '', '', 0, 0);
```

#### 5.3.2.3 SaveLog:Nginx [#](#t325.3.2.3 SaveLog:Nginx)

+   每一分钟读取Nginx日志文件，并解析

server\\src\\library\\nginx\\index.js

```js
let logPath = appConfig.absoluteLogPath
```

server\\src\\configs\\app.js

```js
const development = {
  name: 'fee监控平台开发环境',
  port: 3000,
  proxy: false,
  absoluteLogPath: path.resolve(__dirname, '../../', 'log')
}
```

```js
node dist/fee.js SaveLog:Nginx
```

```js
收到数据, 当前共记录1/1条数据
清洗后的日志路径 C:\afirst\monitor\server\log\nginx\raw\month_202006\day_13\16\14.log

清洗后的日志路径 C:\afirst\monitor\server\log\nginx\json\month_202006\day_13\16\14.log
```

```auto
{
    "type": "perf",
    "code": 20001,
    "detail": {
        "connectStart": 1592036791666,
        "navigationStart": 1592036791361,
        "loadEventEnd": 0,
        "domLoading": 1592036791677,
        "secureConnectionStart": 0,
        "fetchStart": 1592036791362,
        "domContentLoadedEventStart": 1592036791976,
        "responseStart": 1592036791669,
        "responseEnd": 1592036791670,
        "domInteractive": 1592036791976,
        "domainLookupEnd": 1592036791365,
        "redirectStart": 0,
        "requestStart": 1592036791667,
        "unloadEventEnd": 1592036791674,
        "unloadEventStart": 1592036791674,
        "domComplete": 1592036791976,
        "domainLookupStart": 1592036791365,
        "loadEventStart": 1592036791976,
        "domContentLoadedEventEnd": 1592036791976,
        "redirectEnd": 0,
        "connectEnd": 1592036791667,
        "url": "localhost:9000/"
    },
    "extra": {},
    "common": {
        "pid": "template",
        "uuid": "uuid2",
        "ucid": "ucid",
        "is_test": true,
        "record": {
            "time_on_page": true,
            "performance": true,
            "js_error": true,
            "js_error_report_config": {
                "ERROR_RUNTIME": true,
                "ERROR_SCRIPT": true,
                "ERROR_STYLE": true,
                "ERROR_IMAGE": true,
                "ERROR_AUDIO": true,
                "ERROR_VIDEO": true,
                "ERROR_CONSOLE": true,
                "ERROR_TRY_CATCH": true
            }
        },
        "version": "1.0.0",
        "test": "b47ca710747e96f1c523ebab8022c19e9abaa56b",
        "timestamp": 1592036791977,
        "runtime_version": "1.0.0",
        "sdk_version": "1.0.40",
        "page_type": "localhost:9000/"
    },
    "md5": "382eecc357bb7c6629e139eb7eb6509e",
    "project_id": 1,
    "project_name": "template",
    "time": 1592036792,
    "ua": {
        "ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        "browser": {
            "name": "Mobile Safari",
            "version": "13.0.3",
            "major": "13"
        },
        "engine": {
            "name": "WebKit",
            "version": "605.1.15"
        },
        "os": {
            "name": "iOS",
            "version": "13.2.3"
        },
        "device": {
            "vendor": "Apple",
            "model": "iPhone",
            "type": "mobile"
        },
        "cpu": {}
    },
    "ip": "59.109.146.215",
    "country": "中国",
    "province": "北京",
    "city": "北京"
}
```

#### 5.3.2.4 Parse:Performance [#](#t335.3.2.4 Parse:Performance)

+   \[按小时\] 解析nginx日志, 分析分钟级别的指定时间范围内的性能指标

```js
node dist/fee.js Parse:Performance 2020-06-13_16:26  2020-06-13_16:26
```

```js
{
  [项目ID,url,指标,汇总的时间]:{
    [国家,省,市],value：{指标和:614,pv和:1}
  }
}
```

```js
{
  [1,"localhost:9000/","tcp_connect_ms","2020-06-13_16:26"]:{
    ["中国","北京","北京"],value：{"sum_indicator_value":614,"pv":1}
  }
}
```

#### 5.3.2.5 Summary:Performance [#](#t345.3.2.5  Summary:Performance)

+   \[按小时/按天/按月\] 根据历史数据, 汇总分析记录指定时间范围内的性能指标数据

```js
node dist/fee.js Summary:Performance "2020-06-13 16" hour
node dist/fee.js Summary:Performance 2020-06-13 day
node dist/fee.js Summary:Performance 2020-06 month
```

#### 5.3.2.5 Parse:TimeOnSiteByHour [#](#t355.3.2.5 Parse:TimeOnSiteByHour)

+   \[按小时\] 解析nginx日志, 分析记录指定时间范围内用户停留时长
+   t\_r\_city\_distribution\_1\_202006
+   t\_r\_duration\_distribution

```js
node dist/fee.js SaveLog:Nginx
node dist/fee.js Parse:TimeOnSiteByHour "2020-06-13 22:30"  "2020-06-13 22:30"
```

#### 5.3.2.6 Summary:TimeOnSite [#](#t365.3.2.6 Summary:TimeOnSite)

+   \[按小时\] 解析nginx日志, 分析记录指定时间范围内用户停留时长
+   t\_r\_duration\_distribution

```js
node dist/fee.js Summary:TimeOnSite "2020-06 13"  day
node dist/fee.js Summary:TimeOnSite "2020-06"  month
```

#### 5.3.2.7 Parse:Monitor [#](#t375.3.2.7 Parse:Monitor)

+   \[按分钟\] 解析nginx日志, 分析Monitor
+   t\_o\_monitor\_1\_202006
+   t\_o\_monitor\_ext\_1\_202006

```js
node dist/fee.js Parse:Monitor "2020-06-13 22:35"  "2020-06-13 22:35"
```

#### 5.3.2.8 Summary:Error [#](#t385.3.2.8 Summary:Error)

+   \[按分钟/按小时/按天\] 根据历史数据, 汇总分析错误数
+   t\_r\_error\_summary\_1\_202006
    
    ```js
    node dist/fee.js Summary:Error "2020-06-13 22:35"  minute
    node dist/fee.js Summary:Error "2020-06-13 22" hour
    node dist/fee.js Summary:Error "2020-06-13" day
    ```
    

#### 5.3.2.9 Parse:Device [#](#t395.3.2.9 Parse:Device)

+   \[按天\] 解析nginx日志, 分析指定时间范围Device
+   t\_o\_system\_collection\_1

```js
node dist/fee.js Parse:Device "2020-06-13 22:58"  "2020-06-13 22:58"
```

```js
projectMap={
  1:{
    "2020-06":{
      "uuid":{
        "browser":"Mobile Safari"
      }
    }
  }
}
```

#### 5.3.2.10 Summary [#](#t405.3.2.10 Summary)

+   Summary:SystemBrowser \[按月\] 基于数据库统计浏览器占比
+   Summary:SystemDevice \[按月\] 基于数据库统计设备占比
+   Summary:SystemOS \[按月\]基于数据库统计操作系统占比
+   Summary:SystemRuntimeVersion \[按月\] 基于数据库统计浏览器占比
    
+   t\_r\_system\_browser
    
+   t\_r\_system\_device
+   t\_r\_system\_os
+   t\_r\_system\_runtime\_version

```js
node dist/fee.js Summary:SystemBrowser "2020-06"  month
node dist/fee.js Summary:SystemDevice "2020-06"  month
node dist/fee.js Summary:SystemOS "2020-06"  month
node dist/fee.js Summary:SystemRuntimeVersion "2020-06"  month
```

## 6.计划任务 [#](#t416.计划任务)

+   server\\src\\commands\\task\\manage.js

### 6.1 任务执行周期 [#](#t426.1 任务执行周期)

```js
1.  每分钟一次(准实时)
    1.  原始数据入库
        1.  错误数据入库(延迟2分钟)
    2.  按分钟统计
        1.  错误数据统计(延迟2分钟)
2.  每10分钟一次
    1.  原始数据入库
        1.  uv
        2.  页面性能指标
        3.  用户停留时长
    2.  按小时统计
        1.  uv
        2.  新用户数
        3.  页面性能指标
        4.  错误数据统计
3.  每小时一次
    1.  原始数据入库
        1.  设备数据
        2.  用户点击
        3.  首次登陆用户
    2.  按天统计(当天)
        1.  uv
        2.  新用户数
        3.  页面性能指标
        4.  错误数据统计
        5.  用户停留时长
4.  每六小时一次
    1.  按天统计(昨日)
        1.  uv
        2.  新用户数
        3.  页面性能指标
        4.  错误数据统计
        5.  用户停留时长
    2.  按月统计
        1.  uv
        2.  新用户数
        3.  页面性能指标
        4.  错误数据统计
        5.  用户停留时长
        6.  操作系统分布
        7.  设备分布
        8.  浏览器分布
```

### 6.2 执行任务 [#](#t436.2 执行任务)

+   [cron](https://cron.qqe2.com/)

```js
node dist/fee.js Task:saveLog
```

```js
async handle (args, options) {
    let that = this
    schedule.scheduleJob('0 */1 * * * * *', function () {
      that.log('registerTaskRepeatPer1Minute 开始执行')
      that.execCommand('SaveLog:Nginx', []);
    })
  }
```

```js
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

## 7.前台展示 [#](#t447.前台展示)

### 7.1 启动接口 [#](#t457.1 启动接口)

```js
node dist/app.js
```

```js
需要登录,也需要检验项目权限(Method: get) =>/api/behavior/menu
需要登录,也需要检验项目权限(Method: get) =>/api/behavior/online
需要登录,也需要检验项目权限(Method: get) =>/api/os
需要登录,也需要检验项目权限(Method: get) =>/api/browser/list
需要登录,也需要检验项目权限(Method: get) =>/api/browser
需要登录,也需要检验项目权限(Method: get) =>/api/browser/
需要登录,也需要检验项目权限(Method: get) =>/api/runtimeVersion
需要登录,也需要检验项目权限(Method: get) =>/api/error/viser/area/
需要登录,也需要检验项目权限(Method: get) =>/api/error/log/list
需要登录,也需要检验项目权限(Method: get) =>/api/error/distribution/url
需要登录,也需要检验项目权限(Method: get) =>/api/error/distribution/
需要登录,也需要检验项目权限(Method: get) =>/api/error/distribution/
需要登录,也需要检验项目权限(Method: get) =>/api/error/distribution/
不需要登录(Method: get) =>/api/log/content/test
需要登录,也需要检验项目权限(Method: post) =>/api/alarm/config/add
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/config/query
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/config/list
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/config/delete
需要登录,也需要检验项目权限(Method: post) =>/api/alarm/config/update
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/config/error_name_list
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/config/error_type_list
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/log
需要登录,也需要检验项目权限(Method: get) =>/api/alarm/log/line
需要登录,但不需要检验项目权限(Method: get) =>/api/user/detail
需要登录,但不需要检验项目权限(Method: get) =>/api/user/search
需要登录,但不需要检验项目权限(Method: post) =>/api/user/update
需要登录,但不需要检验项目权限(Method: get) =>/api/user/delete
需要登录,但不需要检验项目权限(Method: get) =>/api/user/search_uc
不需要登录(Method: post) =>/api/user/register
需要登录,但不需要检验项目权限(Method: post) =>/api/user/modify/password
需要登录,但不需要检验项目权限(Method: post) =>/api/user/modify/msg
需要登录,但不需要检验项目权限(Method: get) =>/api/user/destroy
不需要登录(Method: post) =>/api/login/site
不需要登录(Method: post) =>/api/login/uc
不需要登录(Method: get) =>/api/logout
不需要登录(Method: post) =>/api/login/normal
不需要登录(Method: get) =>/api/login/type
不需要登录(Method: post) =>/api/login
需要登录,但不需要检验项目权限(Method: get) =>/api/project/item/detail
需要登录,但不需要检验项目权限(Method: post) =>/api/project/item/add
需要登录,但不需要检验项目权限(Method: get) =>/api/project/item/list
需要登录,但不需要检验项目权限(Method: get) =>/api/project/item/delete
需要登录,但不需要检验项目权限(Method: post) =>/api/project/item/update
需要登录,也需要检验项目权限(Method: post) =>/api/project/member/add
需要登录,也需要检验项目权限(Method: get) =>/api/project/member/list
需要登录,也需要检验项目权限(Method: get) =>/api/project/member/delete
需要登录,也需要检验项目权限(Method: post) =>/api/project/member/update
需要登录,也需要检验项目权限(Method: get) =>/api/project/summary/new_user/distribution_line
需要登录,也需要检验项目权限(Method: get) =>/api/project/summary/new_user/distribution_map
需要登录,也需要检验项目权限(Method: get) =>/api/performance/url_list
需要登录,也需要检验项目权限(Method: get) =>/api/performance/url/overview
需要登录,也需要检验项目权限(Method: get) =>/api/performance/project/overview
需要登录,也需要检验项目权限(Method: get) =>/api/performance/url/line_chart
需要登录,也需要检验项目权限(Method: get) =>/api/uv/count
```

### 7.2 启动前台 [#](#t467.2 启动前台)

```js
cd client
cnpm i 
npm run start
```

### 7.3 前端应用 [#](#t477.3 前端应用)

client\\src\\router\\index.js

```js
const token = getToken();
if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
}
```

server\\src\\routes\\api\\user\\index.js

```js
const register = RouterConfigBuilder.routerConfigBuilder('/api/user/register', RouterConfigBuilder.METHOD_TYPE_POST, async (req, res) => {
  const body = _.get(req, ['body'], {})
}
```

server\\src\\model\\project\\user.js

```js
async function register (account, userInfo) {
  const tableName = getTableName();  // t_o_user
}
```

### 7.4 页面性能 [#](#t487.4 页面性能)

[http://localhost:8080/project/1/monitor/performance](http://localhost:8080/project/1/monitor/performance)

#### 7.4.1 urlList [#](#t497.4.1 urlList)

+   用来提供某时间范围内的URL性能列表，因为在查看性能指标的时候会按页面的URL来进行，所以在页面的初始阶段会提供一个接口函数来获取 这些性能指标对应的URL列表

client\\src\\view\\performance\\index.vue

```js
    async getUrlList (params = {}) {
      const {
        st,
        et,
        summaryBy
      } = params
      const res = await fetchUrlList({
        st: st || +this.dateRange[0],
        et: et || +this.dateRange[1],
        summaryBy: summaryBy || 'minute'
      })
      this.urlData = (res.data || []).map((item, index) => ({
        name: item
      }))
      this.url = _.get(this, ['urlData', 0, 'name'], '')
      this.getTimeDetail()
      this.getTimeLine()
      if (this.urlColumns) {
        this.urlLoading = false
      }
    },
```

client\\src\\api\\performance\\index.js

```js
export const fetchUrlList = (params) => {
  return axios.request({
    url: `project/${getProjectId()}/api/performance/url_list`,
    method: 'get',
    params: {
      ...params
    }
  })
}
```

```js
Request URL: http://localhost:3000/project/1/api/performance/url_list?st=1591977600000&et=1592051809707&summaryBy=minute
```

server\\src\\routes\\api\\performance\\index.js

```js
let urlList = RouterConfigBuilder.routerConfigBuilder('/api/performance/url_list', RouterConfigBuilder.METHOD_TYPE_GET, async (req, res) => {
  let projectId = _.get(req, ['fee', 'project', 'projectId'], 0);
  console.log('projectId ',projectId);
  let request = _.get(req, ['query'], {})
  // 获取开始&结束时间
  let startAt = _.get(request, ['st'], 0)
  let endAt = _.get(request, ['et'], 0)
  const summaryBy = _.get(request, 'summaryBy', '')
  if (_.includes([DATE_FORMAT.UNIT.DAY, DATE_FORMAT.UNIT.HOUR, DATE_FORMAT.UNIT.MINUTE], summaryBy) === false) {
    res.send(API_RES.showError(`summaryBy参数不正确`))
    return
  }

  const currentStamp = moment().unix()

  if (startAt) {
    startAt = _.floor(startAt / 1000)
  } else {
    startAt = currentStamp
  }
  if (endAt) {
    endAt = _.ceil(endAt / 1000)
  } else {
    endAt = currentStamp
  }
  let urlList = await MPerformance.getDistinctUrlListInRange(projectId, MPerformance.INDICATOR_TYPE_LIST, startAt, endAt, summaryBy)
  res.send(API_RES.showResult(urlList))
}
)
```

server\\src\\model\\parse\\performance.js

```js
async function getDistinctUrlListInRange (projectId, indicatorList, startAt, endAt, countType = DATE_FORMAT.UNIT.MINUTE) {
   for (let tableName of tableNameList) {
    console.log('tableName,countType,indicatorList,countAtTimeList',tableName,countType,indicatorList,countAtTimeList);
    let rawRecordList = await Knex
      .distinct(['url'])
      .from(tableName)
      .where({
        count_type: countType
      })
      .whereIn('indicator', indicatorList)
      .whereIn('count_at_time', countAtTimeList)
      .catch((e) => {
        Logger.warn('查询失败, 错误原因 =>', e)
        return []
      })
    for (let rawRecord of rawRecordList) {
      if (_.has(rawRecord, ['url'])) {
        let url = _.get(rawRecord, ['url'])
        urlList.push(url)
      }
    }
  }
}
// performance distinctUrlList["localhost:9000/"]
```

#### 7.4.2 lineChartData [#](#t507.4.2 lineChartData)

+   在获取 URL之后，根据对应的时间参数提供参数时间范围内的提定URL下面的所有指标折线图

client\\src\\view\\performance\\index.vue

```js
async getTimeDetail (params = {}) {
      const {
        st,
        et,
        url,
        summaryBy
      } = params
      const res = await fetchTimeDetail({
        st: st || +this.dateRange[0],
        et: et || +this.dateRange[1],
        url: url || this.url,
        summaryBy: summaryBy || 'hour'
      })
      const dv = new DataSet.View().source(res.data)
      dv.transform({
        type: 'rename',
        map: {
          dns_lookup_ms: 'DNS查询耗时',
          response_request_ms: '请求响应耗时',
          dom_parse_ms: 'DOM解析耗时',
          response_transfer_ms: '内容传输耗时',
          load_resource_ms: '资源加载耗时',
          dom_ready_ms: 'DOM_READY_耗时',
          first_render_ms: '首次渲染耗',
          first_response_ms: '首次可交互耗时',
          first_tcp_ms: '首包时间耗时',
          load_complete_ms: '页面完全加载耗时',
          ssl_connect_ms: 'SSL连接耗时',
          tcp_connect_ms: 'TCP链接耗时'
        }
      })
      dv.transform({
        type: 'fold',
        fields: [
          'DNS查询耗时',
          '请求响应耗时',
          'DOM解析耗时',
          '内容传输耗时',
          '资源加载耗时',
          'DOM_READY_耗时',
          '首次渲染耗',
          '首次可交互耗时',
          '首包时间耗时',
          '页面完全加载耗时',
          'SSL连接耗时',
          'TCP链接耗时'
        ],
        key: 'type',
        value: 'ms'
      })
      const data = dv.rows
      this.lineData = data
      const scale = [{
        dataKey: 'ms',
        sync: true,
        alias: 'ms',
        formatter: (value) => value + ' ms'
      }, {
        dataKey: 'index_timestamp_ms',
        type: 'time',
        tickCount: 10,
        mask: 'MM-DD HH:mm'
      }]
      this.lineScale = scale
      if (this.lineData && this.lineScale) {
        this.isSpinShowDetail = false
      }
    },
```

```js
export const fetchTimeDetail = (params) => {
  return axios.request({
    url: `project/${getProjectId()}/api/performance/url/line_chart`,
    method: 'get',
    params: {
      ...params
    }
  })
}
```

```js
http://localhost:3000/project/1/api/performance/url/line_chart?st=1591977600000&et=1592053122452&url=localhost:9000%2F&summaryBy=hour
```

server\\src\\routes\\api\\performance\\index.js

```js
let lineChartData = RouterConfigBuilder.routerConfigBuilder('/api/performance/url/line_chart', RouterConfigBuilder.METHOD_TYPE_GET, async (req, res) => {
  let projectId = _.get(req, ['fee', 'project', 'projectId'], 0)
  let request = _.get(req, ['query'], {})
  res.send(API_RES.showResult(resultList))
}
)
```

server\\src\\model\\parse\\performance.js

```js
async function getDistinctUrlListInRange (projectId, indicatorList, startAt, endAt, countType = DATE_FORMAT.UNIT.MINUTE) {

```

#### 7.4.3 urlOverview [#](#t517.4.3 urlOverview)

+   在获取 URL之后，可以根据此接口提供的时间范围指定的URL的各项指标平均值

client\\src\\view\\performance\\index.vue

```js
async getTimeLine (params = {}) {
      const {st,et} = params
      const res = await fetchTimeLine({
        st: st || +this.dateRange[0],
        et: et || +this.dateRange[1],
        url: this.url,
        summaryBy: 'minute'
      })
```

client\\src\\api\\performance\\index.js

```js
export const fetchTimeLine = (params) => {
  return axios.request({
    url: `project/${getProjectId()}/api/performance/url/overview`,
    method: 'get',
    params: {
      ...params
    }
  })
}
```

```js
http://localhost:3000/project/1/api/performance/url/overview?st=1591977600000&et=1592054332424&url=localhost:9000%2F&summaryBy=minute
```

server\\src\\routes\\api\\performance\\index.js

```js
let urlOverview = RouterConfigBuilder.routerConfigBuilder('/api/performance/url/overview', RouterConfigBuilder.METHOD_TYPE_GET, async (req, res) => {
  let projectId = _.get(req, ['fee', 'project', 'projectId'], 0)
  let request = _.get(req, ['query'], {});
}
```

```js
async function getUrlOverviewInSameMonth (projectId, urlList, startAt, endAt, countType) {
}
```

+   [front-monitor](https://gitee.com/zhufengpeixun/front-monitor)
+   `node dist/fee.js Utils:TemplateSQL`