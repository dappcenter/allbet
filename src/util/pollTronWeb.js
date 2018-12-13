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
            if(tronWeb.eventServer.host.indexOf('api.trongrid.io') < 0 && window.NETWORK == 1) {
                store.state.dialogs.noMainNetwork = true
            }else {
                store.state.dialogs.noMainNetwork = false
            }
            if(err) {
                console.log(err)
            }else if(address){
                store.commit(types.UPDATE_TRON_ASSET, {
                    coinbase: address,
                    balance: Math.floor(balance/1000)/1000,
                })
                // 获取账号信息
                tronWeb.trx.getAccount((err, account) => {
                    store.commit(types.UPDATE_TRON_ASSET, {
                        usageBandwidth: account.free_net_usage
                    })
                })
                tronWeb.trx.getBandwidth((err, bandwidth) => {
                    store.commit(types.UPDATE_TRON_ASSET, {
                        surplusBandwidth: bandwidth
                    })
                })
                // tronWeb.trx.getAccountResources("TPGpTQSuUYDmvfn2NKRL6jVxFduN3UBMmb").then(res => {
                //     console.log("getAccountResources",res)
                // })
            }
        })
        
        if(address && address === store.state.tronHandler.tronWeb.coinbase) {
            return
        }


        if(store.state.user.userInfo.accounts && store.state.user.userInfo.accounts.length > 0) {
            // 有登录态
            let haveHD = false
            store.state.user.userInfo.accounts.forEach((val, idx) => {
                if(val.userAddress == address) {
                    // 登录态中包含插件地址
                    haveHD = true
                }
            })
            if(!haveHD) {
                // 当前选中的HD钱包地址跟插件不一致
                coinLogin(address)
            }
        }else {
            // 没有登录态
            //外部地址登录 首次将注册到平台，再检测是否绑定，已绑定返回平台账号信息
            if(store.state.user.coinType == "TRX") {
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
        "inviteCode": sessionStorage.getItem('inviteCode')
    }).then(res => {
        if(res.code == 200) {
            store.commit(types.SET_USERINFO, res.result)
        }
    }).catch(err => {

    })
}

export default pollTronWeb
