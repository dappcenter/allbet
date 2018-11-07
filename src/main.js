import "babel-polyfill"
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios"
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import i18n from "./lang"
import VueParticles from 'vue-particles'
import "./assets/less/base.less"
import someMethods from "./util/extend_methods"


Vue.use(VueParticles)
Vue.use(someMethods)
Vue.use(axios)
Vue.use(MuseUI)
Vue.prototype.$window = window
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
