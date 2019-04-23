<template>
  <div id="app">
    <p>a</p>
    <p>a</p>
    <div ref="box"
         class="demo-div">
      <OhyeahScroll ref="scroll1"
                    :no-hor="noV"
                    @onVerStart="onVerStart"
                    @onVerEnd="onVerEnd"
                    @onScroll="onScroll"
                    trackColor="transparent">
        <ul>
          <li v-for="(item,index) in arr"
              :style="`width:${width}px`"
              :key="index">{{`${item}-${index}`}}</li>
        </ul>
        <div>333</div>
      </OhyeahScroll>
    </div>
    <div class="demo-div2">
      <div v-for="(item,index) in arr"
           :key="index">
        {{`${item}-${index}`}}
      </div>
    </div>
    <button @click="add">add</button>
    <button @click="plus">plus</button>
    <button @click="noV = !noV">noV</button>
    <button @click="changeBox">changeBox</button>
    <button @click="onScrollTo">onScrollTo</button>
  </div>
</template>

<script>
import { OhyeahScroll } from "../dist/ohyeah-scroll";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: new Array(20).fill("a"),
      noV: false,
      width: 200
    };
  },
  components: {
    OhyeahScroll
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
      this.width = this.width - 100;
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
      console.log("正在滚动：", obj);
    },
    onScrollTo() {
      this.$refs.scroll1.scrollTo("end", "end", 300);
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
</style>