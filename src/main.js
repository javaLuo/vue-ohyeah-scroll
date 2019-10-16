import Vue from "vue";
import App from "./App.vue";

// import OhyeahScroll from './packages/ohyeah';
//import OhyeahScroll from '../dist/ohyeah-scroll';
// Vue.use(OhyeahScroll);
import Ohyeah from "../dist/ohyeah-scroll";
Vue.use(Ohyeah);
new Vue({
  el: "#app",
  render: h => h(App),
});
