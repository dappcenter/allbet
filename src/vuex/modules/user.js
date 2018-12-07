import * as types from "../mutation_types"
import {axios} from "../../axios"
import router from "../../router"

// 筛选平台地址
const filterAddr = function(userInfo) {
    let list = []
    if(userInfo && userInfo.accounts) {
        userInfo.accounts.forEach(val => {
            if(val.platform == "DISPATCHER") {
                list.push({
                    coinAddress: val.userAddress,
                    eth: val.assets.ETH.amount,
                    assets: val.assets,
                    bet: val.assets.AB.amount,
                    at: Math.floor(val.assets.AT.amount*1000) /1000,
                    userName: userInfo.userName, //使用平台账号用户名
                    token: userInfo.token,
                    platform: val.platform,
                    mainCoin: val.mainCoin,
                    inviteCode: userInfo.inviteCode || null   //使用平台账号邀请码
                })
            } 
        })
    }
    return list
}

const state = {
    userInfo: {},
    // addressList: [],
    currentAddr: {},
    hdUserInfo: {},
    lastCurAddrPf: "",
    coinType: "TRX",   //当前启用的币种 
}

const getters = {
    /**
     * 获取用户地址列表
     * @author shanks
     */
    getUserAddress(state, getters, rootState) {
        let list = filterAddr(state.userInfo)
        //是否有登录态
        if(!state.userInfo.token) {
            console.log("没有登录态state.userInfo.token")
            state.currentAddr = {}
            return []
        }
        let walletAddress = null
        switch(state.coinType) {
            case "ETH":
                walletAddress = rootState.web3Handler.web3.coinbase
                break;
            case "TRX":
                walletAddress = rootState.tronHandler.tronWeb.coinbase
                break;
            defautl: 
                break;
        }

        if(!walletAddress) {
            console.log("无钱包登录")
            if(!walletAddress) {
                state.currentAddr = list[0] || {}
            }
            return list
        }
        state.userInfo.accounts.forEach((val, idx) => {
            if(val.userAddress == walletAddress) {
                if(val.assets.ETH) {
                    val.assets.ETH.amount = rootState.web3Handler.web3.balance
                }
                if(val.assets.TRX) {
                    val.assets.TRX.amount = rootState.tronHandler.tronWeb.balance
                }
                list.push({
                    coinAddress: val.userAddress,
                    eth: rootState.web3Handler.web3.balance,
                    assets: val.assets,
                    bet: val.assets.AB.amount,
                    at: Math.floor(val.assets.AT.amount*1000) /1000,
                    userName: state.userInfo.userName || "", //使用平台账号用户名
                    token: state.userInfo.token,
                    mainCoin: val.mainCoin,
                    platform: val.platform,
                    inviteCode: state.userInfo.inviteCode || null   //使用平台账号邀请码
                })
            }
        })
        

        if(list.length == 0) {
            // 可用地址列表为空清除当前地址状态
            console.log("可用地址列表为空清除当前地址状态")
            
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
    [types.REMOVE_USERINFO](state, payload) {
        let b = false
        if(payload) {
            state.userInfo.accounts.forEach((val,idx) => {
                if(val.platform == "DISPATCHER") {
                    state.userInfo.accounts.splice(idx, 1)
                }
            })
            state.userInfo.accounts.forEach((val2, idx2) => {
                if(val2.userAddress == this.state.web3Handler.web3.coinbase) {
                    b = true
                }
            })
            if(state.userInfo.accounts.length == 0 || !this.state.web3Handler.web3.coinbase) {
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
        if(state.currentAddr.platform == "IMPORT" && this.state.web3Handler.web3.networkId !== 1 && window.NETWORK == 1 && state.coinType == "ETH") {
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
        if(!state.userInfo.accounts) return
        payload.forEach((val,idx) => {
            state.userInfo.accounts.forEach((val2,idx2) => {
                if(val.userAddress == val2.userAddress) {
                    state.userInfo.accounts[idx2].assets = val.assets
                }
            })
        })
    },
    /**
     * 切换币种
     * @author shanks
     */
    [types.CHANGE_COINTYPE](state, payload) {
        state.coinType = payload
        let haveCoinType = false
        if(state.userInfo.accounts) {
            state.userInfo.accounts.forEach((val, idx) => {
                console.log()
                if(val.mainCoin == payload || val.platform == 'DISPATCHER') {
                    haveCoinType = true
                }
            })
        }
        if(!haveCoinType) {
            state.userInfo = {}
            switch(payload) {
                case "ETH":
                    this.dispatch("registerWeb3")
                    break;
                case "TRX":
                    this.dispatch("registerTron")
                    break;
                default: 
                    break;
            }
        }
    }
}

const actions = {
    /**
     * 更新我的资产
     * @author shanks
     */
    updateProperty({commit, rootState}) {
        axios.get("/app/user/assets", {
            params: {
                coinAddress: rootState.user.currentAddr.coinAddress
            }
        }).then(res => {
            if(res.code == 200) {
                commit(types.UPDATE_USERINFO_PROPERTY, res.result)
                res.result.forEach(val => {
                    if(val.userAddress == rootState.web3Handler.web3.coinbase) {
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
        getNonce(newCoinbase, rootState.web3Handler.web3.web3Instance)

        function getNonce(address, web3) {

            axios.get("/open/metamask", {
                params: {
                    address: address,
                    type: "user" 
                }
            }).then(res => {
                console.log(res)
                if(res.code == 200) {
                    coinLogin("123456", address, res.result)
                }
            })
        }
        
        function coinLogin(signature, address, nonce) {
            axios.post("/open/plugin_login", {
                "chainType": "ETH",
                "message": nonce,
                "publicAddress": address,
                "signature": signature
            }).then(res => {
                if(res.code == 200) {
                    // 存储新的登录态
                    commit(types.SET_USERINFO, res.result)
                    // 未绑定平台账号
                    if(res.result.assets.length <= 1) {
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
}

export default {
    state,
    getters,
    mutations,
    actions
}