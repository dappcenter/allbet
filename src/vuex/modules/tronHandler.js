import * as types from "../mutation_types"
import getTronWeb from "../../util/getTronWeb"
import {axios} from "../../axios"


const state = {
    tron: {
        isInjected: false,
        tronInstance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null,
        apiHandle: null,
        at: 0,   //平台游戏币
        bet: 0,
        userName: "",  //平台账号名
        token: "",  //平台账号token
        platform: "IMPORT", //账号标识（平台or mateMask）
        inviteCode: ""  //邀请码
    },
    contractInstance: null
}

const mutations = {
    /**
     * 注册tron实例
     * @author shanks
     */
    [types.REGISTER_TRON_INSTANCE](state, payload) {
        console.log("注册tron实例", payload)
        state.tron.coinbase = payload.coinbase
        state.tron.balance = payload.balance
        state.tron.tronInstance = payload.tronWeb
        // 轮询
    },
}

const actions = {
    registerTron({commit, rootState}) {
        getTronWeb.setTronWeb(window.tronWeb)
        const address = getTronWeb.tronWeb.defaultAddress.base58
        getTronWeb.tronWeb.trx.getBalance((err, balance) => {
            console.log("getBalance", balance)
            if(err) {
                console.log(err)
            }else if(address){
                commit(types.REGISTER_TRON_INSTANCE, {
                    coinbase: address,
                    balance: Math.floor(balance/1000000),
                    tronWeb: getTronWeb
                })
                

            }
        });
        coinLogin(address)

        function coinLogin(address) {
            axios.post("/open/plugin_login", {
                "chainType": "TRX",
                "publicAddress": address,
            }).then(res => {
                if(res.code == 200) {
                    commit(types.SET_USERINFO, res.result)
                }
            }).catch(err => {
    
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}