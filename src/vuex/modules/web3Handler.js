import * as types from "../mutation_types"
import getWeb3 from "../../util/getWeb3"
import pollWeb3 from "../../util/pollWeb3"
import {axios} from "../../axios"
import router from "../../router"
import {DappABI} from "../../util/constants/dapp.abi"

const state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null,
        apiHandle: null,
        at: 0,   //平台游戏币
        userName: "",  //平台账号名
        token: "",  //平台账号token
        platform: "IMPORT" //账号标识（平台or mateMask）
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
        web3Copy.balance = payload.web3.utils.fromWei(payload.balance, "ether")
        web3Copy.isInjected = payload.injectedWeb3
        web3Copy.web3Instance = payload.web3
        web3Copy.apiHandle = new payload.web3.eth.Contract(DappABI, "0xce90d20306a9426c6447a01bf70062da32a4c802");
        state.web3 = web3Copy
        // 轮询
        pollWeb3()
    },
    /**
     * 更新web3实例
     * @author shanks
     */
    [types.UPDATE_WEB3_INSTANCE](state, payload) {
        state.web3.coinbase = payload.coinbase
        state.web3.balance = state.web3.web3Instance.utils.fromWei(payload.balance || "0", "ether")
    },
    /**
     * 更新web3平台币以及账户名
     * @author shanks
     */
    [types.UPDATE_WEB3_AT](state, playload) {
        state.web3 = Object.assign(state.web3, playload)
        console.log(state.web3)
    }
}

const actions = {
    registerWeb3({commit, rootState}) {
        getWeb3.then(result => {
            commit(types.REGISTER_WEB3_INSTANCE, result)
            //外部地址登录 首次将注册到平台，再检测是否绑定，已绑定返回平台账号信息
            axios.post("/open/login/coin", {
                type: "ETH",
                addr: result.coinbase
            }).then(res => {
                if(res.code == 200) {
                    // 未绑定平台账号
                    if(res.result.assets.length <= 1) {
                        if(rootState.user.currentAddr.coinAddress == result.coinbase) {
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
                            userName: res.result.assets[0].userName,
                            token: res.result.token
                        })
                    }else {
                        // 已绑定平台账号
                        commit(types.SET_USERINFO, res.result)
                    }
                }
            }).catch(err => {
    
            })
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