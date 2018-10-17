import * as types from "../mutation_types"

const state = {
    userInfo: {},
    addressList: [],
    currentAddr: {}
}

const getters = {
    /**
     * 获取用户地址列表
     * @author shanks
     */
    getUserAddress(state, getters, rootState) {
        let list = state.userInfo.assets || []
        let b = false
        if(rootState.web3Handler.web3.coinbase) {
            if(list.length > 0) {
                list.forEach(value => {
                    b = value.coinAddress == rootState.web3Handler.web3.coinbase
                })
                if(!b) {
                    list.push({
                        coinAddress: rootState.web3Handler.web3.coinbase,
                        eth: rootState.web3Handler.web3.balance,
                        at: 10
                    })
                }
            }else {
                list.push({
                    coinAddress: rootState.web3Handler.web3.coinbase,
                    eth: rootState.web3Handler.web3.balance,
                    at: 10
                })
            }
            
        }
        return list
    }
}

const mutations = {
    /**
     * 设置用户信息
     * @author shanks
     */
    [types.SET_USERINFO](state, payload) {
        state.userInfo = Object.assign({}, state.userInfo, payload)
    },
    /**
     * 清除用户信息
     * @author shanks
     */
    [types.REMOVE_USERINFO](state) {
        state.userInfo = {}
    },
    /**
     * 设置当前启用地址
     * @author shanks
     */
    [types.SET_CURRENTADDR](state, payload) {
        state.currentAddr = payload
    }
}

export default {
    state,
    getters,
    mutations
}