import * as types from "../mutation_types"
import getWeb3 from "../../util/getWeb3"
import pollWeb3 from "../../util/pollWeb3"
import {axios} from "../../axios"
import router from "../../router"

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
        web3Copy.balance = payload.web3.fromWei(parseInt(payload.balance, 10), "ether")
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
        state.web3.coinbase = payload.coinbase
        state.web3.balance = state.web3.web3Instance.fromWei(payload.balance, "ether")
    }
}

const actions = {
    registerWeb3({commit}) {
        getWeb3.then(result => {
            commit(types.REGISTER_WEB3_INSTANCE, result)
            //外部地址登录 首次将注册到平台，再检测是否绑定，已绑定返回平台账号信息
            axios.post("/open/login/coin", {
                type: "ETH",
                addr: result.coinbase
            }).then(res => {
                console.log(res)
                if(res.code == 200) {
                    // 未绑定平台账号
                    if(res.result.assets.length <= 1) {
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