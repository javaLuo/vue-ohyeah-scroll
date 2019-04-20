import Vue from 'vue';
import App from './App.vue';

import OhyeahScroll from './packages/ohyeah';
Vue.use(OhyeahScroll);

new Vue({
  el: '#app',
  render: h => h(App),
});
