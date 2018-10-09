import Vue from "vue";
import Vuex from "vuex";
import mutations from "./vuex/mutations"
import actions from "./vuex/actions"
import getters from "./vuex/getters"

import dice from "./vuex/modules/dice"
import roller from "./vuex/modules/roller"
import web3Handler from "./vuex/modules/web3Handler"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    dice,
    roller,
    web3Handler
  }
});
