import * as types from "../mutation_types"

const state = {
    bonusPools: {
        ethPool: 0,
        trxPool: 0,
        ab: 0,
        available: 0,
        balance: {},
        pledgeAb: 0,
        profitPool: {},
        profitPredict: {},
        profitTime: 0,
        progressDig: 0,
        recoverAb: 0,
        recoverAbTime: 0,
        totalDig: 0,
        totalPledge: 0,
        transferred: 0,
        
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