import Vue from "vue";
import VueResize from "vue-resize";
import App from "./App.vue";

import "vue-resize/dist/vue-resize.css";
import "./assets/custom-element.css";

Vue.use(VueResize);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
