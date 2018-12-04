import store from "../store.js"
import * as types from "../vuex/mutation_types"
import {axios} from "../axios"

const pollTronWeb = function(tronWeb) {
    clearInterval(window.pollTronWebTimer)
    let address = tronWeb.defaultAddress.base58
    window.pollTronWebTimer = setInterval(() => {
        address = tronWeb.defaultAddress.base58
        if(store.state.user.coinType !== 'TRX') {
            clearInterval(window.pollTronWebTimer)
            return
        }
        tronWeb.trx.getBalance((err, balance) => {
            if(err) {
                console.log(err)
            }else if(address){
                store.commit(types.UPDATE_TRON_ASSET, { 
                    coinbase: address,
                    balance: Math.floor(balance/1000)/1000,
                })
            }
        })
        if(address && address === store.state.tronHandler.tronWeb.coinbase) {
            return
        }

        
        if(rootState.user.userInfo.accounts && rootState.user.userInfo.accounts.length > 0) {
            // 有登录态
            let haveHD = false
            rootState.user.userInfo.accounts.forEach((val, idx) => {
                console.log(val)
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
            if(rootState.user.coinType == "TRX") {
                coinLogin(address)
            }
        }
        
    }, 1000)
}

function coinLogin(address) {
    if(!address) return
    axios.post("/open/plugin_login", {
        "chainType": "TRX",
        "publicAddress": address,
    }).then(res => {
        if(res.code == 200) {
            store.commit(types.SET_USERINFO, res.result)
        }
    }).catch(err => {

    })
}

export default pollTronWeb