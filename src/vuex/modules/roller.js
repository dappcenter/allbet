import * as types from "../mutation_types"

const state = {
    betInfo: {
        odds: 1,
        amount: 0.12
    }
}

const mutations = {
    [types.SET_ROLLER_BET_INFO](state, betInfo) {
        let obj = {}
        for(let j in state.betInfo) {
            obj[j] = state.betInfo[j]
        }
        for(let i in betInfo) {
            obj[i] = null
            obj[i] = betInfo[i]
        }
        state.betInfo = null
        state.betInfo = obj
    }
}

export default {
    state,
    mutations
}