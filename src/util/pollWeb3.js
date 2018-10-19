/**
 * 轮询检索metamask状态
 * @author shanks
 * @date 2018/10/9
 * @version 1.0.0
 */
import store from "../store.js"
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
                        let newCoinbase = coinbase
                        web3.eth.getBalance(coinbase, (err, newBalance) => {
                            if(err) {
                                console.log(err)
                            }else { 
                                store.dispatch("updateWeb3", {
                                    coinbase: newCoinbase,
                                    balance: newBalance
                                })
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