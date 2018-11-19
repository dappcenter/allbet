/**
 * 轮询检索metamask状态
 * @author shanks
 * @date 2018/10/9
 * @version 1.0.0
 */
import store from "../store.js"
import {axios} from "../axios"
import * as types from "../vuex/mutation_types"
import LangZh from "../lang/language_packs/zh"
import LangEn from "../lang/language_packs/en"

const language = {
    "zh-CN": LangZh,
    "en-US": LangEn
}
let pollWeb3 = function() {
    let web3 = window.web3
    web3 = new Web3(web3.currentProvider)
    let storeWeb3 = {}
    setInterval(() => {
        storeWeb3 = store.state.web3Handler.web3
        if(web3 && storeWeb3.web3Instance) {
            // 检测地址变化
            web3.eth.getCoinbase().then((coinbase) => {
                if(!coinbase) { // 未获取到eth地址
                    store.dispatch("updateWeb3", {
                        coinbase: null,
                        balance: null
                    })
                }else {
                    if (coinbase !== storeWeb3.coinbase) {
                        // 地址发生变化
                        console.log("地址发生变化")
                        let newCoinbase = coinbase
                        console.log(coinbase)
                        web3.eth.getBalance(coinbase, (err, newBalance) => {
                            if(err) {
                                console.log(err)
                            }else { 
                                store.dispatch("updateWeb3", {
                                    coinbase: newCoinbase,
                                    balance: newBalance
                                })
                                if(store.state.user.currentAddr.platform != "DISPATCHER") { 
                                    //当前选中地址为HD钱包地址（踢掉平台账户启用新的HD钱包地址）
                                    // store.commit(types.REMOVE_USERINFO)  //清除账户登录信息
                                    //获取新地址的登录态
                                    //外部地址登录 首次将注册到平台，再检测是否绑定，已绑定返回平台账号信息
                                    axios.post("/open/login/coin", {
                                        type: "ETH",
                                        addr: newCoinbase
                                    }).then(res => {
                                        if(res.code == 200) {
                                            // 存储新的登录态
                                            store.commit(types.SET_USERINFO, res.result)
                                            // 未绑定平台账号
                                            if(res.result.assets.length <= 1) {
                                                store.commit(types.OPEN_CONFIRM, {
                                                    content: language[store.state.locale].message.PopBindDesc2,
                                                    btn: [
                                                        {
                                                            text: language[store.state.locale].message.PopClose
                                                        },
                                                        {
                                                            type: "high",
                                                            text: language[store.state.locale].message.accountToBound,
                                                            cb: () => {
                                                                router.push('account-security')
                                                            }
                                                        }
                                                    ]
                                                })
                                                store.commit(types.UPDATE_WEB3_AT, {
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
                                                        store.commit(types.UPDATE_WEB3_AT, {
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
                        })
                    }else {
                        web3.eth.getBalance(storeWeb3.coinbase, (err, newBalance) => {
                            if(err) {
                                console.log(err)
                            }else if(newBalance !== storeWeb3.balance) {
                                store.dispatch("updateWeb3", {
                                    coinbase: storeWeb3.coinbase,
                                    balance: newBalance
                                })
                            }
                        })
                    }
                }
            })
        }
    }, 500)
}

export default pollWeb3