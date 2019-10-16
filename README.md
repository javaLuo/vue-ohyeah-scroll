# vue-ohyeah-scroll

[![npm](https://img.shields.io/npm/v/vue-ohyeah-scroll.svg)](https://www.npmjs.com/package/vue-ohyeah-scroll) ![NPM](https://img.shields.io/npm/l/vue-ohyeah-scroll.svg?style=popout) ![GitHub last commit](https://img.shields.io/github/last-commit/javaLuo/vue-ohyeah-scroll.svg?style=popout) [![npm downloads](https://img.shields.io/npm/dt/vue-ohyeah-scroll.svg)](https://www.npmjs.com/package/vue-ohyeah-scroll)

仿 MAC 系统的滚动条

> 主要在 PC 端使用，如果检测到是移动端，会直接使用原生滚动条，ohyeah-scroll 不会进行初始化

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

### 重构待测
1. 测嵌套 👌
2. 触发各事件 👌
3. 平滑滚动 👌
4. 锚点跳转 👌
5. 键盘事件 👌
6. 变颜色，换位置，随机改变大小 👌
7. 各方法测试 👌
8. safari 多次触发触底触顶事件 👌
9. 整理代码 👌
10. padding 2px 👌
11. firefox scrollTo滚动到顶部 模拟滚动条没动 👌 firefox不触发scroll事件
12. IE11 轨道上点击，位置没对 👌 IE11不支持Number.isFinite
13. 轨道上点击 needSmooth问题 👌

### 特性

- [x] 默认是 MAC 系统的主题，也可以自定义轨道和滑块颜色
- [x] 可以设置滚动条显示在左边或上面
- [x] 自动显隐滚动条
- [x] 动态手动设置滚动条的 scrollTop 和 scrollLeft
- [x] 支持一键滚动到底部
- [x] 内容随意增减，父级容器随便改变大小
- [x] 支持嵌套

### 效果预览

<a href="https://isluo.com/work/vue-ohyeah-scroll" target="_blank" rel="nofollow me noopener noreferrer">https://isluo.com/work/vue-ohyeah-scroll/</a>

### 安装

```js
  yarn add vue-ohyeah-scroll
```

### 使用

全局注册

```js
import { Ohyeah } from 'vue-ohyeah-scroll';
Vue.use(Ohyeah);
```

局部注册

```js
import { Ohyeah } from 'vue-ohyeah-scroll';

export default {
  components: {
    Ohyeah,
  },
};
```

组件中使用

```js
<template>
  <Ohyeah width="100vw" height="100vh">
    ...
  </Ohyeah>
</template>
```

### 自定义属性

| 属性名       | 类型          | 默认值      | 描述                                                                                               |
| ------------ | ------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| id           | String        | 随机数      | 一个唯一的ID，可以不填                                                                             |
| width        | Number,String | 100%        | 容器宽度，默认贴合父级(父级需要有宽度)，也可自己设置，接受合法的CSS值，传数字会转换成px            |
| height       | Number,String | 100%        | 容器高度，默认贴合父级(父级需要有高度)，也可自己设置，接受合法的CSS值，传数字会转换成px            |
| breadth      | Number        | 6           | 滑块的粗细，单位: px                                                                               |
| thumbColor   | String        | #7f7f7f     | 滑块的颜色，接受 CSS 颜色值                                                                        |
| trackColor   | String        | transparent | 轨道的颜色，接受 CSS 颜色值                                                                        |
| autoHide     | Boolean       | true        | 是否自动隐藏滚动条，鼠标在区域内才显示                                                             |
| left         | Boolean       | false       | 是否把垂直滚动条放在容器的左边                                                                     |
| top          | Boolean       | false       | 是否把水平滚动条放在容器的顶端                                                                     |
| noVer        | Boolean       | false       | 是否禁用垂直滚动条(overflow-y:hidden)                                                              |
| noHor        | Boolean       | false       | 是否禁用水平滚动条(overflow-x:hidden)                                                              |
| minLength    | Number        | 20          | 当内容无限多的时候，滑块最短不得低于此值，单位: px                                                 |
| resizeObject | Boolean       | false       | 如果存在监听不到内容高度变化的情况可以把这个值改为true试试，（nuxt.js打包后firefox发现有这种情况） |

### 自定义事件

<table>
<thead>
  <tr>
    <th>事件名</th>
    <th>描述</th>
    <th>返回值</th>
  </tr>
  <thead>
  <tbody>
    <tr>
      <td>onVerStart</td>
      <td>每次垂直滚动条抵达顶部时将触发一次</td>
      <td>
        <pre>
{
  offsetHeight: 内容区的总高度,
  offsetWidth: 内容区的总宽度,
  height: 容器的高度,
  width: 容器的宽度,
  scrollTop: 内容区已被滚到上边去的距离,
  scrollLeft: 内容区已被滚到左边去的距离
}
        </pre>
      </td>
    </tr>
    <tr>
      <td>onVerEnd</td>
      <td>每次垂直滚动条抵达底部时将触发一次</td>
      <td>同上</td>
    </tr>
    <tr>
      <td>onHorStart</td>
      <td>每次水平滚动条抵达最左边时将触发一次</td>
      <td>同上</td>
    </tr>
    <tr>
      <td>onHorEnd</td>
      <td>每次水平滚动条抵达最右边时将触发一次</td>
      <td>同上</td>
    </tr>
    <tr>
      <td>onScroll</td>
      <td>当滚动条的位置变化时就会触发一次，无论是垂直滚动条还是水平滚动条</td>
      <td>同上</td>
    </tr>
  </tbody>
</table>

### 自身方法

| 方法名        | 参数                                 | 描述                                                |
| ------------- | ------------------------------------ | --------------------------------------------------- |
| scrollTo      | (x:number,y:number,isSmooth:boolean) | 滚动到指定的位置,x水平，y垂直, isSmooth是否平滑过度 |
| getScrollInfo | 无                                   | 获取当前滚动条各种信息                              |


如何使用自身方法：

```vue
  <template>
    <!-- 需要定义一个ref -->
    <Ohyeah ref="oh1">
      ...
    </Ohyeah>
  </template>

  <script>
    export default {
      methods:{
        scrollTo(){
          // 水平保持原位，垂直滚到100px处，平滑过度
          this.$refs.oh1.scrollTo(null, 100, true);
        },
        scrollToEnd(){
          // 水平滚到最左边，垂直滚到底，瞬间完成
          this.$refs.oh1.scrollTo(0, 'end', false);
        },
        getScrollInfo(){
          // 获取当前滚动条各种信息
          const msg = this.$refs.oh1.getScrollInfo();
          /**
           * height: 内容区可见高度,不包括边框
           * width: 内容区可见宽度,不包括边框
           * clientHeight: 同height,
           * clientWidth: 同width,
           * offsetHeight: 内容区高度,包括边框
           * offsetWidth: 内容区宽度，包括边框,
           * scrollTop: 内容区已被滚到上边去的距离,
           * scrollLeft: 内容区已被滚到左边去的距离,
           * scrollHeight: 内容区真实总高度,包括看不见的区域
           * scrollWidth: 内容区真实总宽度,包括看不见的区域
           * */
        }
      }
    }
  </script>
```

### 完整例子

```vue
  <template>
    <!-- 若不设置ohyeah的width和height, 则需要一个具有高度和宽度的容器来包裹ohyeah -->
    <div style="height:100vh; width:50%;">
      <Ohyeah>
        <p v-for="(item,index) in testData" :key="index">{{index}}</p>
      </Ohyeah>
    </div>
  </template>

  <script>
    import { Ohyeah } from "vue-ohyeah-scroll";
    export default {
      data(){
        return {
          testData: new Array(100).fill("")
        }
      }
      components:{
        Ohyeah
      }
    }
  </script>
```

### 注意事项

1.
> **scrollTo(x,y,isSmooth)** 方法<br/>
> 平滑滚动使用的是`scroll-behavior: smooth;`,目前`chrome`,`firefox`,`opera`支持<br/>
> **但是**：浏览器水平滚动条和垂直滚动条是互斥的，当水平正在滚时，垂直滚不动，反之亦然。浏览器始终只会有一个方向处于滚动中<br/>
> **所以**：如果设置了`isSmooth`为`true`,那么不要同时设置x和y,至少有一个应该为`null`<br/>

2.
> 如果你不设置ohyeah的width和height属性，或者设置为百分比，那么就需要一个具有高度和宽度的父级元素来包裹ohyeah


### 更新
- 0.5.x 重构了,现在基于原生滚动条的默认行为
- 0.4.0 增加了键盘方向键控制
- 0.3.0 this.$refs.ohyeah.scrollTo(null, 100); 传递null表示保持原位不动
- 0.2.9 处理了一下nuxt.js中使用的情况。修复了卸载组件时没有正确卸载容器监听的方法
- 2019/05/09 处理了嵌套滚动条的事件冒泡问题
> 原生滚动条（子）和ohyeah（父）嵌套时，原生滚动条需要设置@wheel.stop, todo: 目前的方案不完美，待升级
