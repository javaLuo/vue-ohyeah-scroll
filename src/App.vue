<template>
  <div class="app-box"
       id="app">
    <ohyeah>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <div style="width:300px;height:500px;">
        <ohyeah ref="scroll1"
                :no-hor="noV"
                :autoHide="false"
                @onVerStart="onVerStart"
                @onVerEnd="onVerEnd"
                @onHorStart="onHorStart"
                @onHorEnd="onHorEnd"
                @onScroll="onScroll"
                trackColor="transparent">
          <ul>
            <li v-for="(item,index) in arr"
                :style="`width:${width}px`"
                :key="index">
              <p>{{`${item}-${index}`}}</p>
            </li>
          </ul>
        </ohyeah>
      </div>
      <div class="demo-div2">
        <div v-for="(item,index) in arr"
             :key="index">
          {{index}}
        </div>
      </div>
      <button @click="add">add</button>
      <button @click="plus">plus</button>
      <button @click="noV = !noV">noV</button>
      <button @click="changeBox">changeBox</button>
      <button @click="onScrollTo">onScrollTo</button>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
    </ohyeah>
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
      arr: new Array(100).fill("a"),
      noV: false,
      width: 200
    };
  },
  components: {
    Ohyeah
  },
  mounted() {
    // console.log("什么情况：", OhyeahScroll);
  },
  methods: {
    add() {
      this.arr.push(this.arr.length + 1);
      this.width = this.width + 100;
    },
    plus() {
      this.arr.splice(-1, 1);
      //this.width = this.width - 100;
    },
    changeBox() {
      console.log("change?");
      // this.$refs.box.style.height = Math.random() * 200 + 300 + "px";
      // this.$refs.box.style.width = Math.random() * 200 + 300 + "px";
      this.$refs.box.style.height = 25 + "px";
    },
    onVerStart(obj) {
      console.log("到顶了：", obj);
    },
    onVerEnd(obj) {
      console.log("到底了：", obj);
    },
    onScroll(obj) {
      //console.log("正在滚动：", obj);
    },
    onScrollTo() {
      this.$refs.scroll1.scrollTo("end", null, 300);
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
<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
}
.app-box {
  position: relative;
  height: 500px;
  width: 800px;
  border: solid 1px #ccc;
  padding: 20px;
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