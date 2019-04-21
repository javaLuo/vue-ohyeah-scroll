<template>
  <div id="app">
    <p>a</p>
    <p>a</p>
    <div ref="box"
         class="demo-div">
      <ohyeah-scroll trackColor="transparent">
        <ul>
          <li v-for="(item,index) in arr"
              :key="index">{{`${item}-${index}`}}</li>
        </ul>
      </ohyeah-scroll>
    </div>
    <button @click="add">add</button>
    <button @click="changeBox">changeBox</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: new Array(50).fill("a")
    };
  },
  methods: {
    add() {
      this.arr.push(this.arr.length + 1);
    },
    changeBox() {
      this.$refs.box.style.height = Math.random() * 200 + 300 + "px";
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
  li {
    height: 100px;
    width: 800px;
    border: solid 1px #ccc;
    box-sizing: border-box;
  }
}
</style>