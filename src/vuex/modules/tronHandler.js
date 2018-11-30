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
        state.tron.coinbase = payload.coinbase
        state.tron.balance = payload.balance
        state.tron.tronInstance = payload.tronWeb
        // 轮询
    },
}

const actions = {
    registerTron({commit, rootState}) {
        new Promise((reselve, reject) => {
            let installed = !!window.tronWeb
            if(installed) {
                reselve(window.tronWeb)
            }
            let tries = 0;
            const timer = setInterval(() => {
                if(tries >= 10) {
                    clearInterval(timer)
                }

                installed = !!window.tronWeb

                if(!installed)
                    return tries++;
                clearInterval(timer)
                reselve(window.tronWeb)
            }, 100);
        }).then(tronWeb => {
            getTronWeb.setTronWeb(tronWeb)
            console.log("TRX对象",getTronWeb.tronWeb.defaultAddress)
            const address = getTronWeb.tronWeb.defaultAddress.base58
            console.log("TRX钱包地址", address)
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

            if(rootState.user.userInfo.accounts && rootState.user.userInfo.accounts.length > 0) {
                // 有登录态
                console.log("有登录态registerWeb3")
                let haveHD = false
                rootState.user.userInfo.accounts.forEach((val, idx) => {
                    if(val.userAddress == address) {
                        // 登录态中包含插件地址
                        haveHD = true
                    }
                })
                if(rootState.user.currentAddr.platform != "DISPATCHER" && !haveHD) {
                    // 当前选中的HD钱包地址跟插件不一致
                    coinLogin(address)
                }
            }else {
                // 没有登录态
                //外部地址登录 首次将注册到平台，再检测是否绑定，已绑定返回平台账号信息
                console.log("没有登录态registerTron")
                if(rootState.user.coinType == "TRX") {
                    coinLogin(address)
                }
            }
            
        })

        
        function coinLogin(address) {
            if(address) return
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