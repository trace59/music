#### [音乐项目 music app 知识点总结](https://github.com/nanyang24/music-vue/blob/master/conclusion.md)

## 在线演示

<div align=center><a href="http://trace.cool:8080/#/recommend" target=_blank>在线预览戳我</a></div>
<div align=center>为了更好的体验，请用开发者工具模拟移动端体验</div>
<br>
<div align=center>
<img src="http://p5vvvsx56.bkt.clouddn.com/qqCode.png" width="20%">
<div>二维码在手机上查看</div>
</div>
<br>

> 由于服务器身在国外，网络可能会有波动，所以部分的API请求时间会很久

## 主要技术栈

【前端】

- `Vue`：用于构建用户界面的 MVVM 框架。它的核心是**响应的数据绑定**和**组系统件**
- `vue-router`：为单页面应用提供的路由系统，项目上线前使用 `Lazy Loading Routes` 来实现异步加载优化性能
- `vuex`：Vue 的集中状态管理，在多个组件共享某些状态时非常便捷，适用于中大型项目
- `vue-lazyload`：第三方图片懒加载库，优化页面加载速度
- `better-scroll`：iscroll 的优化版，使移动端滑动体验更加流畅，轮播图也是利用此制作
- `Stylus`：css 预编译处理器
- `ES6`：项目中用到的模块化、解构赋值、Promise、Class 等方法非常好用

【后端】

- `Node.js`：利用 Express 起一个本地数据抓取服务器
- `jsonp`：服务端通讯。抓取 QQ音乐(移动端)数据（后面数据改为全部用axios实现抓取）
- `axios`：服务端通讯。结合 Node.js 代理后端请求，抓取 QQ音乐(PC端)数据

【自动化构建及其他工具】

- `vue-cli`：Vue 脚手架工具，快速初始化项目代码，以及 webpack 的配置
- `eslint`：代码风格检查工具，规范代码书写
- `vConsole`：移动端调试工具，在移动端输出日志
- `Charles`：方便查看移动端网络请求数据

## 实现细节
主要页面：播放器内核页、推荐页、歌单详情页、歌手页、歌手详情页、排行页、搜索页、添加歌曲页、个人中心页等。
核心页面：播放器内核页



# vue-music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
