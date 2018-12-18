import "babel-polyfill"
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios"
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import i18n from "./lang"
import "./assets/less/base.less"
import someMethods from "./util/extend_methods"
import MBheaderBar from "@/components/common/mobile/mb_header_bar"
import {getBrowser} from "./util/extend_methods"
import FastClick from "fastclick"


FastClick.attach(document.body)

Vue.use(someMethods)
Vue.use(axios)
Vue.use(MuseUI)
Vue.prototype.$window = window
Vue.prototype.$browser = getBrowser()
Vue.prototype.$goBack = () => {
    if (window.history.length <= 1) {
        router.push({path:'/'})
        return false
    } else {
        router.go(-1)
    }
}

Vue.config.productionTip = false;

Vue.component("MBheaderBar", MBheaderBar)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
