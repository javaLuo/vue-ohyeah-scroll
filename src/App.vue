<template>
  <div class="app-box"
       id="app"
       :style="`width:${width}px;height:${height}px`">
    <ohyeah ref="scroll1"
            :autoHide="autoHide"
            :breadth="6"
            :left="leftTop"
            :top="leftTop"
            :noVer="noVer"
            :noHor="noHor"
            @onVerStart="onVerStart"
            @onVerEnd="onVerEnd"
            @onHorStart="onHorStart"
            @onHorEnd="onHorEnd"
            @onScroll="onScroll">
      <div style="height: 51px;background-color: #f00">height: 51px;</div>
      <a href="#a1">页内锚点</a>
      <!-- <div style="width:300px;height:500px;background-color: #f0f0f0;border:solid 1px #ccc">
        <ohyeah ref="scroll2"
                :autoHide="false"
                trackColor="transparent">
          <ul>
            <li v-for="(item,index) in arr"
                :style="`width:${width}px`"
                :key="index">
              <p>{{`${item}-${index}`}}</p>
            </li>
          </ul>
        </ohyeah>
      </div> -->
      <div class="demo-div2">
        <div v-for="(item,index) in arr"
             :key="index">
          {{index}}
        </div>
      </div>
      <p><select>
          <option value="1">1</option>
          <option value="2">2</option>
        </select></p>
      <p><input /></p>
      <p><span v-for="(item,index) in arr"
              :key="index">aa{{index}}</span></p>
      <p v-for="(item,index) in arr"
         :key="index">cccc{{index}}</p>
      -
      <div id="a1">a1</div>
    </ohyeah>
    <button @click="onScrollTo">scrollTo</button>
    <button @click="ongetScrollInfo">手动获取信息</button>
    <button @click="onToTop">移动到顶部</button>
    <button @click="autoHide=!autoHide">是否自动隐藏</button>
    <button @click="onChangeSize">随机改变容器大小</button>
    <button @click="leftTop=!leftTop">改变位置</button>
    <button @click="noVer=!noVer">禁用垂直</button>
    <button @click="noHor=!noHor">禁用水平</button>
    <button @click="onAdd">加50条</button>
    <button @click="onPlus">减20条</button>
  </div>
</template>

<script>
import Ohyeah from "./packages/ohyeah";
// import { Ohyeah } from "../dist/ohyeah-scroll";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      noVer: false,
      noHor: false,
      leftTop: false,
      width: 800,
      height: 600,
      autoHide: false
    };
  },
  components: {
    Ohyeah
  },
  mounted() {
    // console.log("什么情况：", OhyeahScroll);
  },
  methods: {
    onAdd() {
      this.arr = [...this.arr, ...new Array(20).fill("b")];
    },
    onPlus() {
      this.arr.splice(-20, 20);
      this.arr = this.arr;
      //this.width = this.width - 100;
    },
    ongetScrollInfo() {
      console.log(this.$refs.scroll1.getScrollInfo());
    },

    changeBox() {
      console.log("change?");
      // this.$refs.box.style.height = Math.random() * 200 + 300 + "px";
      // this.$refs.box.style.width = Math.random() * 200 + 300 + "px";
      this.$refs.box.style.height = 25 + "px";
    },
    onVerStart(obj) {
      console.log("到顶了：", { obj });
    },
    onVerEnd(obj) {
      console.log("到底了：", { obj });
    },
    onScroll(obj) {
      // console.log("正在滚动：", { obj });
    },
    onChangeSize() {
      this.width = Math.random() * 300 + 500;
      this.height = Math.random() * 300 + 500;
    },
    onToTop() {
      this.$refs.scroll1.scrollTo(0, 0, true);
    },
    onScrollTo() {
      this.$refs.scroll1.scrollTo(100, 50, 300);
    },
    onHorStart(obj) {
      console.log("到左了：", obj);
    },
    onHorEnd(obj) {
      console.log("到右了：", obj);
    }
  }
};
</script>
<style lang="less">
body {
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
}
.app-box {
  position: relative;
  border: solid 1px #ccc;
}
.demo-div {
  width: 300px;
  height: 500px;
  border: solid 1px #ccc;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100px;
    width: 800px;
    border: solid 1px #ccc;
    box-sizing: border-box;
    p {
      display: block;
      height: 600px;
    }
  }
}
.demo-div2 {
  position: absolute;
  left: 350px;
  top: 50px;
  width: 300px;
  height: 500px;
  border: solid 1px #ccc;
  overflow: scroll;
  & > div {
    height: 100px;
    width: 800px;
    border: solid 1px #ccc;
    box-sizing: border-box;
  }
}
.demo-div3 {
  position: absolute;
  left: 770px;
  top: 50px;
  width: 300px;
  height: 500px;
  border: solid 1px #ccc;
  overflow: scroll;
  & > div {
    height: 100px;
    width: 800px;
    border: solid 1px #ccc;
    box-sizing: border-box;
  }
}
</style>