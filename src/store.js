import "babel-polyfill"
import Vue from "vue"
import Vuex from "vuex"
import {getLanguage} from "./util/extend_methods"
import VuexPersistence from 'vuex-persist'
import mutations from "./vuex/mutations"
import actions from "./vuex/actions"
import getters from "./vuex/getters"

import dice from "./vuex/modules/dice"
import roller from "./vuex/modules/roller"
import web3Handler from "./vuex/modules/web3Handler"
import dialogs from "./vuex/modules/dialogs"
import user from "./vuex/modules/user"


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ["user"]
})

export default new Vuex.Store({
    state: {
        locale: localStorage.getItem('locale') || getLanguage()
    },
    mutations,
    actions,
    getters,
    modules: {
        dice,
        roller,
        web3Handler,
        dialogs,
        user
    },
    plugins: [vuexLocal.plugin]
});
