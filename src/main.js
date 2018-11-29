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

// import getTronWeb from "./util/getTronWeb"
// getTronWeb.setTronWeb(window.tronWeb)
// getTronWeb.contract.postMessage("666").send({
//     shouldPollResponse: true,
//     callValue: 0
// }).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// }).then(() => {
//     console.log(123)
// });
// var feeLimit  = trxClient.toSun(10);
// var callValue = trxClient.toSun(amount);

// getTronWeb.contract.placeBetV1(rollUnder,modulo,orderId).send({
//     feeLimit:feeLimit,
//     callValue:callValue,
//     shouldPollResponse:false
// }


// window.addEventListener('storage',function(e){
//     if(e.key === "vuex" && e.newValue !== e.oldValue) {
//         console.log(JSON.parse(e.newValue).userInfo)
//         localStorage.setItem(e.key, e.newValue)

//     }
// })

Vue.use(someMethods)
Vue.use(axios)
Vue.use(MuseUI)
Vue.prototype.$window = window
Vue.prototype.$goBack = () => {
    if (window.history.length <= 1) {
        router.push({path:'/'})
        return false
    } else {
        router.go(-1)
    }
    // setTimeout(() => {
    //     router.push({path:'/'})      
    // },500)
}

Vue.config.productionTip = false;

Vue.component("MBheaderBar", MBheaderBar)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
