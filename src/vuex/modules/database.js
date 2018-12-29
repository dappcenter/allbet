import * as types from "../mutation_types"

const state = {
    bonusPools: {
        ethPool: 0,
        trxPool: 0
    }
}

const mutations = {
    [types.UPDATE_BP_DATA](state, payload) {
        state.bonusPools = Object.assign(state.bonusPools, payload)
    }
}

export default {
    state,
    mutations
}