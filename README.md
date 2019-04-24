# vue-ohyeah-scroll

[![npm](https://img.shields.io/npm/v/vue-ohyeah-scroll.svg)](https://www.npmjs.com/package/vue-ohyeah-scroll) ![NPM](https://img.shields.io/npm/l/vue-ohyeah-scroll.svg?style=popout) ![GitHub last commit](https://img.shields.io/github/last-commit/javaLuo/vue-ohyeah-scroll.svg?style=popout)

仿 MAC 系统的滚动条

> 主要在 PC 端使用，如果检测到是移动端，会直接使用原生滚动条，ohyeah-scroll 不会进行初始化

| Chrome | Firefox | Safari | Opera | Edge | IE                |
| ------ | ------- | ------ | ----- | ---- | ----------------- |
| √      | √       | √      | √     | √    | `10` √<br/>`11` √ |

### 特性

- [x] 默认是 MAC 系统的主题，也可以自定义轨道和滑块颜色
- [x] 可以设置滚动条显示在左边或上面
- [x] 自动显隐滚动条
- [x] 动态手动设置滚动条的 scrollTop 和 scrollLeft
- [x] 支持一键滚动到底部
- [x] 内容随意增减，父级容器随便改变大小

### DEMO

<a href="https://isluo.com/work/vue-ohyeah-scroll" target="_blank" rel="nofollow me noopener noreferrer">https://isluo.com/work/vue-ohyeah-scroll</a>

### 安装

```js
  yarn add vue-ohyeah-scroll
```

### 使用

全局注册

```js
import OhyeahScroll from './packages/ohyeah';
Vue.use(OhyeahScroll);
```

局部注册

```js
import { OhyeahScroll } from './packages/ohyeah';

export default {
  components: {
    OhyeahScroll,
  },
};
```

组件中使用

```js
<template>
  <ohyeah-scroll>...</ohyeah-scroll>
</template>
```

### 自定义属性

| 属性名     | 类型    | 默认值      | 描述                                     |
| ---------- | ------- | ----------- | ---------------------------------------- |
| breadth    | Number  | 6           | 滑块的粗细                               |
| thumbColor | String  | #7f7f7f     | 滑块的颜色，接受 CSS 颜色值              |
| trackColor | String  | transparent | 轨道的颜色，接受 CSS 颜色值              |
| autoHide   | Boolean | true        | 是否自动隐藏滚动条，鼠标在区域内才显示   |
| left       | Boolean | false       | 是否把垂直滚动条放在容器的左边           |
| top        | Boolean | false       | 是否把水平滚动条放在容器的顶端           |
| noVer      | Boolean | false       | 是否禁用垂直滚动条(overflow-y:hidden)    |
| noHor      | Boolean | false       | 是否禁用水平滚动条(overflow-x:hidden)    |
| minLength  | Number  | 20          | 当内容无限多的时候，滑块最短不得低于此值 |

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
      <td>每次水平滚动条抵达最左边时将触发一次</td>
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

| 方法名        | 参数       | 描述                     |
| ------------- | ---------- | ------------------------ |
| scrollTo      | (x,y,time) | 将滚动条滚动到指定的位置 |
| getScrollInfo | 无         | 获取当前滚动条各种信息   |

用法：

```js
  <template>
    <!-- 需要定义一个ref -->
    <ohyeah-scroll ref="ohyeah">
      ...
    </ohyeah-scroll>
  </template>

  <script>
    export default {
      methods:{
        scrollTo(){
          // 水平滚50个像素，垂直滚100个像素，在300ms内完成
          this.$refs.ohyeah.scrollTo(50, 100, 300);
        },
        scrollToEnd(){
          // 水平滚到最左边，垂直滚到底，瞬间完成
          this.$refs.ohyeah.scrollTo(0, 'end', 0);
        },
        getScrollInfo(){
          // 获取当前滚动条各种信息
          const msg = this.$refs.ohyeah.getScrollInfo();
          /**
           * offsetHeight: 内容区的总高度,
           * offsetWidth: 内容区的总宽度,
           * height: 容器的高度,
           * width: 容器的宽度,
           * scrollTop: 内容区已被滚到上边去的距离,
           * scrollLeft: 内容区已被滚到左边去的距离
           * */
        }
      }
    }
  </script>
```

### 完整例子

```js
  <template>
    <!-- 需要一个具有定位的 且 具有高度或宽度 的容器来包裹ohyeah-scroll -->
    <div style="position:relative; height:100vh; width:50%;">
      <ohyeah-scroll>
        <div v-for="(item,index) in testData">{{index}}</div>
      </ohyeah-scroll>
    </div>
  </template>

  <script>
    import { OhyeahScroll } from "vue-ohyeah-scroll";
    export default {
      data(){
        return {
          testData: new Array(100).fill("")
        }
      }
      components:{
        OhyeahScroll
      }
    }
  </script>
```

### 注意事项

- 需要一个非 static 定位的容器包裹 ohyeah-scroll，并且容器应该具有高度或宽度
- 你也可以直接把 src/package/ohyeah.vue 拷贝出来用，这样有利于减小一点体积，毕竟我把 CSS 和其他东西都打包到一个 js 里了。
- 直接使用的话，需要自己安装`element-resize-detector`,这个用于检测容器大小变化
