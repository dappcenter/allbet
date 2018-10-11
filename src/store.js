import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import mutations from "./vuex/mutations"
import actions from "./vuex/actions"
import getters from "./vuex/getters"

import dice from "./vuex/modules/dice"
import roller from "./vuex/modules/roller"
import web3Handler from "./vuex/modules/web3Handler"

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})

export default new Vuex.Store({
    state: {},
    mutations,
    actions,
    getters,
    modules: {
        dice,
        roller,
        web3Handler
    },
    // plugins: [vuexLocal.plugin]
});
