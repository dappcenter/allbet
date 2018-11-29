/**
 * 获取Metamask数据
 * @author shanks
 * @date 2018/10/9
 */
// import Web3 from "web3"

/*
* 1. 检查注入web3
* 2. 创建web3实例
* 3. 获得networkId（我们可以检查用户是否连接到正确的网络来使用我们的dApp）
* 4. 从metamask获取用户账户
* 5. 获取用户余额
*/


let getWeb3 = function() { 
    return new Promise(function(resolve, reject) {
        //检查注入web3
        let web3js = null
        let haveEthereum = false
        if(window.ethereum) {
            web3js = window.ethereum
            haveEthereum = true
        }else {
            web3js = window.web3
        }
        if(typeof web3js !== "undefined") {
            let web3 = null
            if(haveEthereum) {
                web3 = new Web3(window.ethereum)
                try {
                    ethereum.enable().then(res => {
                        resolve({
                            web3
                        })
                    }).catch(err => {
                    })
                } catch (error) {
                    reject(new Error("无法连接到Metamask"))
                }
            }else {
                web3 = new Web3(web3js.currentProvider)
                resolve({
                    web3
                })
            }
        }else {
            reject(new Error("无法连接到Metamask"))
        }
    }).then(result => {
        return new Promise(function(resolve, reject) {
            // 检测networkID
            result.web3.eth.net.getId((err, networkId) => {
                console.log("网络ID网络ID网络ID网络ID网络ID网络ID", networkId)
                if(err) {
                    reject(new Error("无法检索网络ID"))
                }else {
                    result = Object.assign({}, result, {networkId})
                    resolve(result)
                }
            })
        })
    }).then(result => {
        return new Promise(function(resolve, reject) {
            result.web3.eth.getCoinbase((err, coinbase) => {
                if(err) {
                    reject(new Error("无法检索到地址"))
                }else if(coinbase && coinbase.indexOf('0x0000000000') < 0){
                    result = Object.assign({}, result, {coinbase})
                    resolve(result)
                }else {
                    reject(new Error("无法检索到地址"))
                }
            })
        })
    }).then(result => {
        return new Promise(function(resolve, reject) {
            result.web3.eth.getBalance(result.coinbase, (err, balance) => {
                console.log("地址的余额",result.coinbase,balance)
                if(err) {
                    reject(new Error("无法检索地址的余额:" + result.coinbase))
                }else {
                    result = Object.assign({}, result, {balance})
                    resolve(result)
                }
            })
        })
    })
}

export default getWeb3
