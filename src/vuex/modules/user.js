import * as types from "../mutation_types"
import {axios} from "../../axios"

// 筛选平台地址
const filterAddr = function(addrList) {
    let list = []
    if(addrList) {
        addrList.forEach(val => {
            if(val.platform == "DISPATCHER") {
                list.push(val)
            } 
        })
    }
    return list
}

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
        let list = filterAddr(state.userInfo.assets)
        let b = false
        if(rootState.web3Handler.web3.coinbase) {
            if(state.userInfo.assets && state.userInfo.assets.length > 1) {
                state.userInfo.assets.forEach(value => {
                    b = value.coinAddress == rootState.web3Handler.web3.coinbase
                })
                if(!b) {
                    list.push({
                        coinAddress: rootState.web3Handler.web3.coinbase,
                        eth: rootState.web3Handler.web3.balance,
                        at: rootState.web3Handler.web3.at,
                        userName: list[0].userName,
                        token: list[0].token,
                        platform: rootState.web3Handler.web3.platform,
                    })
                }
            }else {
                list.push({
                    coinAddress: rootState.web3Handler.web3.coinbase,
                    eth: rootState.web3Handler.web3.balance,
                    at: rootState.web3Handler.web3.at,
                    userName: rootState.web3Handler.web3.userName,
                    token: rootState.web3Handler.web3.token,
                    platform: rootState.web3Handler.web3.platform
                })
            }
            
        }
        if(list.length == 0) {
            state.currentAddr = {}
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
    },
    /**
     * 更新我的（userinfo）资产
     * @author shanks
     */
    [types.UPDATE_USERINFO_PROPERTY](state, payload) {
        if(!state.userInfo.assets) return
        payload.forEach((val,idx) => {
            state.userInfo.assets.forEach((val2,idx2) => {
                if(val.coinAddress == val2.coinAddress) {
                    state.userInfo.assets[idx2].at = val.at
                    state.userInfo.assets[idx2].eth = val.eth
                }
            })
        })
    }
}

const actions = {
    /**
     * 更新我的资产
     * @author shanks
     */
    updateProperty({commit, rootState}) {
        axios.get("/app/user/assets").then(res => {
            if(res.code == 200) {
                commit(types.UPDATE_USERINFO_PROPERTY, res.result.assets)
                res.result.assets.forEach(val => {
                    if(val.coinAddress == rootState.web3Handler.web3.coinbase) {
                        commit(types.UPDATE_WEB3_AT, {at: val.at})
                    }
                })
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}