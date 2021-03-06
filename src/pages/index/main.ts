import Vue from "vue";
import App from "./App.vue";
import store from "../../store";

import common from '../common'
common.register(Vue)

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
