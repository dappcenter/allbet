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
        if(rootState.web3Handler.web3.coinbase) { //是否有HD钱包登录
            if(state.userInfo.assets && state.userInfo.assets.length > 1) {  //平台账号是否有绑定HD钱包地址
                state.userInfo.assets.forEach(value => {
                    if(value.coinAddress == rootState.web3Handler.web3.coinbase) {  //是否有绑定当前登录的HD钱包地址
                        b = true
                    }
                })
                if(b) {  //有绑定当前HD钱包地址
                    list.push({
                        coinAddress: rootState.web3Handler.web3.coinbase,
                        eth: rootState.web3Handler.web3.balance,
                        bet: rootState.web3Handler.web3.bet,
                        at: Math.floor(rootState.web3Handler.web3.at*1000) /1000,
                        userName: list[0].userName,
                        token: rootState.web3Handler.web3.token,
                        platform: rootState.web3Handler.web3.platform,
                        inviteCode: list[0].inviteCode   //优先给平台账号邀请码
                    })
                }else { //没有绑定当前HD钱包地址
                    list.push({
                        coinAddress: rootState.web3Handler.web3.coinbase,
                        eth: rootState.web3Handler.web3.balance,
                        at: Math.floor(rootState.web3Handler.web3.at*1000) /1000,
                        bet: rootState.web3Handler.web3.bet,
                        userName: rootState.web3Handler.web3.userName,
                        token: rootState.web3Handler.web3.token,
                        platform: rootState.web3Handler.web3.platform,
                        inviteCode: rootState.web3Handler.web3.inviteCode
                    })
                }
            }else {
                list.push({
                    coinAddress: rootState.web3Handler.web3.coinbase,
                    eth: rootState.web3Handler.web3.balance,
                    at: Math.floor(rootState.web3Handler.web3.at*1000) /1000,
                    bet: rootState.web3Handler.web3.bet,
                    userName: rootState.web3Handler.web3.userName,
                    token: rootState.web3Handler.web3.token,
                    platform: rootState.web3Handler.web3.platform,
                    inviteCode: rootState.web3Handler.web3.inviteCode
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
                    state.userInfo.assets[idx2].bet = val.bet
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
                        commit(types.UPDATE_WEB3_AT, {at: val.at, bet: val.bet})
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