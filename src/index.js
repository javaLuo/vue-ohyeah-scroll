import Ohyeah from './packages/ohyeah';

const components = [Ohyeah];
const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};

export { Ohyeah };
