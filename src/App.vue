<template>
  <div id="app">
    <p>a</p>
    <p>a</p>
    <div ref="box"
         class="demo-div">
      <ohyeah-scroll ref="scroll1"
                     no-hor
                     :no-ver="noV"
                     @onVerStart="onVerStart"
                     @onVerEnd="onVerEnd"
                     @onScroll="onScroll"
                     trackColor="transparent">
        <ul>
          <li v-for="(item,index) in arr"
              :key="index">{{`${item}-${index}`}}</li>
        </ul>
      </ohyeah-scroll>
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
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: new Array(20).fill("a"),
      noV: false
    };
  },
  mounted() {},
  methods: {
    add() {
      this.arr.push(this.arr.length + 1);
    },
    plus() {
      this.arr.splice(-1, 1);
    },
    changeBox() {
      this.$refs.box.style.height = Math.random() * 200 + 300 + "px";
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
      this.$refs.scroll1.scrollTo("end", "end", 0);
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