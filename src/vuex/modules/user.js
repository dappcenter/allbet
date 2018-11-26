import * as types from "../mutation_types"
import {axios} from "../../axios"
import router from "../../router"

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
    currentAddr: {},
    hdUserInfo: {},
    lastCurAddrPf: "" 
}

const getters = {
    /**
     * 获取用户地址列表
     * @author shanks
     */
    getUserAddress(state, getters, rootState) {
        let list = filterAddr(state.userInfo.assets)
        if(state.userInfo.assets) {   //是否有登录态
            const token = state.userInfo.token
            if(rootState.web3Handler.web3.coinbase) { //是否有HD钱包登录
                console.log("有HD钱包登录")
                if(list.length > 0) {  //是否有平台账号登录态
                    list[0].token = state.userInfo.token
                    // 有平台账号登录态
                    if(state.userInfo.assets.length > 1) {  //平台账号是否有绑定HD钱包地址
                        // 平台账号有绑定HD钱包地址
                        state.userInfo.assets.forEach(value => {
                            if(value.coinAddress == rootState.web3Handler.web3.coinbase) {  //是否有绑定当前登录的HD钱包地址
                                list.push({
                                    coinAddress: rootState.web3Handler.web3.coinbase,
                                    eth: rootState.web3Handler.web3.balance,
                                    bet: value.bet,
                                    at: Math.floor(value.at*1000) /1000,
                                    userName: list[0].userName, //使用平台账号用户名
                                    token: token,
                                    platform: value.platform,
                                    inviteCode: list[0].inviteCode   //使用平台账号邀请码
                                })
                            }else {
                                // 平台账号没有绑定当前HD钱包地址 （不启用示任何无关的HD钱包地址）
                            }
                        })
                    }else {
                        // 平台账号没有绑定HD钱包地址
                    }
                }else {
                    // 没有平台账号登录态
                    let b = false
                    console.log("没有平台账号登录态")
                    state.userInfo.assets.forEach(value => {
                        if(value.coinAddress == rootState.web3Handler.web3.coinbase) {
                            b = true
                            list.push({
                                coinAddress: rootState.web3Handler.web3.coinbase,
                                eth: rootState.web3Handler.web3.balance,
                                bet: value.bet,
                                at: Math.floor(value.at*1000) /1000,
                                userName: value.userName, //使用平台账号用户名
                                token: token,
                                platform: value.platform,
                                inviteCode: ""   //使用平台账号邀请码
                            })
                        }else {
                            // 平台账号没有绑定当前HD钱包地址 （不启用示任何无关的HD钱包地址）
                        }
                    })
                }
                
            }else if(list.length == 0){
                // 未检测到HD钱包地址
                // console.log("未检测到HD钱包地址, 清除登录态")
                // state.userInfo = {}
                // router.replace("dice")
            }
        }else {
            // 没有任何登录态

        }

        if(list.length == 0) {
            // 可用地址列表为空清除当前地址状态
            console.log("可用地址列表为空清除当前地址状态")
            state.currentAddr = {}
        }
        console.log(list)
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
    [types.REMOVE_USERINFO](state, payload) {
        let b = false
        if(payload) {
            state.userInfo.assets.forEach((val,idx) => {
                if(val.platform == "DISPATCHER") {
                    state.userInfo.assets.splice(idx, 1)
                }
            })
            state.userInfo.assets.forEach((val2, idx2) => {
                if(val2.coinAddress == this.state.web3Handler.web3.coinbase) {
                    b = true
                }
            })
            if(state.userInfo.assets.length == 0 || !this.state.web3Handler.web3.coinbase) {
                state.userInfo = {}
                router.replace("dice")
            }
            if(this.state.web3Handler.web3.coinbase && !b) {
                console.log("当前登录态HD钱包登录账户（重新获取登录态和HD钱包保持一致）")
                this.dispatch("coinLogin", this.state.web3Handler.web3.coinbase)
            }
        }else {
            state.userInfo = {}
            router.replace("dice")
        }
    },
    /**
     * 设置当前启用地址
     * @author shanks
     */
    [types.SET_CURRENTADDR](state, payload) {
        state.currentAddr = payload
        state.lastCurAddrPf = payload.platform
        // HD钱包网络环境检测
        if(state.currentAddr.platform == "IMPORT" && this.state.web3Handler.web3.networkId !== 1 && window.NETWORK == 1) {
            this.state.dialogs.noMainNetwork = true
        }else {
            this.state.dialogs.noMainNetwork = false
        }
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
    },
    /**
     * 获取登录态
     * @author shanks
     */
    coinLogin({commit, rootState}, coinbase) {
        const newCoinbase = coinbase
        axios.post("/open/login/coin", {
            type: "ETH",
            addr: newCoinbase
        }).then(res => {
            if(res.code == 200) {
                // 存储新的登录态
                commit(types.SET_USERINFO, res.result)
                // 未绑定平台账号
                if(res.result.assets.length <= 1) {
                    if(rootState.user.currentAddr.coinAddress == newCoinbase) {
                        // 当前选中地址为此登录地址（提示绑定）
                        commit(types.OPEN_CONFIRM, {
                            content: "绑定账号，赢取邀请奖励分ETH",
                            btn: [
                                {
                                    text: "关闭"
                                },
                                {
                                    type: "high",
                                    text: "去绑定",
                                    cb: () => {
                                        router.push('account-security')
                                    }
                                }
                            ]
                        })
                    }
                    commit(types.UPDATE_WEB3_AT, {
                        at: res.result.assets[0].at,
                        bet: res.result.assets[0].bet,
                        userName: res.result.assets[0].userName,
                        token: res.result.assets[0].token,
                        inviteCode: res.result.assets[0].inviteCode || ""
                    })
                }else {
                    // 已绑定平台账号
                    res.result.assets.forEach(val => {
                        if(val.coinAddress == newCoinbase) {  
                            commit(types.UPDATE_WEB3_AT, {
                                at: val.at,
                                bet: val.bet,
                                userName: res.result.assets[0].userName,
                                token: val.token,
                                inviteCode: res.result.assets[0].inviteCode
                            })
                        }
                    })
                }
            }
        }).catch(err => {

        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}