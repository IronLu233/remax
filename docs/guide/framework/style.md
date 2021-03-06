---
title: 样式
order: 6
---

# 样式

## 预处理器

Remax 支持通过插件的方式添加 CSS 预处理器，以 Less 为例：

```js
// remax.config.js
const less = require('@remax/plugin-less');

module.exports = {
  plugins: [less()],
};
```

更多插件的用法可以参考[《使用插件》](https://remaxjs.org/guide/advanced/plugin)。

## px 转换

Remax 会自动把 `px` 转换成小程序 `rpx`，（如果编译到 web，`px` 则会变成 `rem`，转换比例是 100 : 1）。

比如：

```css
.foo {
  height: 16px;
}
```

编译到小程序时：

```css
.foo {
  height: 16rpx;
}
```

编译到 Web 时：

```css
.foo {
  height: 0.16rem;
}
```

如果你不想转换 `px` ，就写成 `PX`，如：

```css
.foo {
  height: 16PX:
}
```

如果整个项目都不想转换 `px` 则可以在配置中将 `pxToRpx` 选项置为 `false`。

## CSS Modules

Remax 会自动识别 CSS Modules，当你把一个 css 文件当成 CSS Modules 来用时这个文件就会自动被作为 CSS Modules 处理。

比如：

```js
// 会自动识别 foo.css 为 CSS Modules
import styles from './foo.css';

// 会自动识 bar.css 别为全局样式
import './bar.css';
```

## 引用图片

css 中图片引用问题

[遵循 css-loader 的规则](https://github.com/webpack-contrib/css-loader#url)

1. `/path/to/image.png` 绝对路径表示对应输出目录中的 `/path/to` 路径位置，归类为 global assets，需要开发者自己 copy 文件到输出目录中对应的位置。

2. `~@/assets/image.png` `~` 开头表示引入的是 module，可以是 src 下的图片， webpack 可以 resolve。

3. `../../assets/image.png` 相对路径也会被识别为 module，webpack 会处理。

global assets 配置 copy 的参考

```js
// remax.config.js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  configWebpack({ config }) {
    // copy-webpack-plugin v5.x
    config.plugin('copy').use(CopyPlugin, [[{ from: 'src/path/to/assets', to: 'path/to/assets' }]]);
    // copy-webpack-plugin v6.0.0 入参修改了
    config.plugin('copy').use(CopyPlugin, [{ patterns: [{ from: 'src/path/to/assets', to: 'path/to/assets' }] }]);
  },
};
```

## 样式补全

Remax 没有对样式做补全，在上传代码时，记得开启小程序 **样式补全** 选项
