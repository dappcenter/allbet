import store from "../store.js"
import * as types from "../vuex/mutation_types"
import {axios} from "../axios"

const getBonusPools = () => {
    axios.get("/app/profit/profit", {
        params: {
            noLoading: true,
            coinType: "TRX"
        }
    }).then(res => {
        if(res.code == 200) {
            store.commit(types.UPDATE_BP_DATA, {
                ethPool: res.result.ethPool || 0,
                trxPool: res.result.trxPool || 0
            })
        }
    }).catch(err => {
    })
    setTimeout(() => {
        getBonusPools()
    }, 2000)
}

export {getBonusPools}