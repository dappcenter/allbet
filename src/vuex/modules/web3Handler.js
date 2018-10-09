import * as types from "../mutation_types"
import getWeb3 from "../../util/getWeb3"
import pollWeb3 from "../../util/pollWeb3"

const state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: null
}

const mutations = {
    /**
     * 注册web3实例
     * @author shanks
     */
    [types.REGISTER_WEB3_INSTANCE](state, payload) {
        let web3Copy = state.web3
        web3Copy.coinbase = payload.coinbase
        web3Copy.networkId = payload.networkId
        web3Copy.balance = parseInt(payload.balance, 10)
        web3Copy.isInjected = payload.injectedWeb3
        web3Copy.web3Instance = payload.web3
        state.web3 = web3Copy
        // 轮询
        pollWeb3()
    },
    /**
     * 更新web3实例
     * @author shanks
     */
    [types.UPDATE_WEB3_INSTANCE](state, payload) {

    }
}

const actions = {
    registerWeb3({commit}) {
        getWeb3.then(result => {
            console.log(result)
            commit(types.REGISTER_WEB3_INSTANCE, result)
        }).catch(e => {
            console.log('error in action registerWeb3', e)
        })
    },
    updateWeb3({commit}, playload) {
        commit(types.UPDATE_WEB3_INSTANCE, playload)
    }
}

export default {
    state,
    mutations,
    actions
}