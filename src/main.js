import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios"
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import i18n from "./lang"
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(axios)
Vue.use(MuseUI)
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
