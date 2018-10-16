import * as types from "../mutation_types"

const state = {
    userInfo: {},
    addressList: [],
    currentAddr: null
}

const getters = {
    /**
     * 获取用户地址列表
     * @author shanks
     */
    getUserAddress(state, getters, rootState) {
        let list = state.userInfo.address || []
        let b = false
        if(rootState.web3Handler.web3.coinbase) {
            if(list.length > 0) {
                list.forEach(value => {
                    b = value.coinAddr == rootState.web3Handler.web3.coinbase
                })
                if(!b) {
                    list.push({
                        coinAddr: rootState.web3Handler.web3.coinbase
                    })
                }
                
            }else {
                list.push({
                    coinAddr: rootState.web3Handler.web3.coinbase
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